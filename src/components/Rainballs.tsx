import { Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { type FC, useMemo, useState } from "react"
import { MathUtils } from "three"
import { color, mix, uv, positionWorld, uniform, vec3 } from "three/tsl"
import { MeshPhongNodeMaterial } from "three/webgpu"

// Basic component showing how to add smooth hover interactivity with TSL

const RainBalls: FC = () => {
  const [isPointerOver, setIsPointerOver] = useState(false)

  const { colorNode, positionNode, uHovered } = useMemo(() => {
    // Define a uniform for the hover value
    const uHovered = uniform(0.0)

    // Create color gradients on the Y axis (bottom to top of the sphere)
    const defaultColor = mix(color("#3F4A4B"), color("#1A2526"), uv().y)
    const hoverColor = mix(color("#14DCE9"), color("#B462D1"), uv().y)

    // Mix between two default and hovered colors based on the hover value
    const colorNode = mix(defaultColor, hoverColor, uHovered)

    // Translate the sphere along the Z axis based on the hover value (0 - 1)
    const positionNode = positionWorld.sub(vec3(0, 0, uHovered))

    // Generate a key for the material so that it updates when this data changes
    // (it won't in this scenario because useMemo has no dependencies)
    const key = colorNode.uuid
    return { key, colorNode, positionNode, uHovered }
  }, [])

  // When hovered, smoothly transition to 1.0, otherwise back to 0.0
  useFrame((_, delta) => {
    uHovered.value = MathUtils.damp(
      uHovered.value,
      isPointerOver ? 1.0 : 0.0,
      5,
      delta
    )
  })

  const material = useMemo(
    () =>
      new MeshPhongNodeMaterial({
        colorNode,
        positionNode,
        shininess: 20,
      }),
    [colorNode, positionNode]
  )

  return (
    <Sphere
      position={[0, 0, 0]}
      args={[1, 40, 40]}
      onPointerEnter={() => {
        document.body.style.cursor = "pointer"
        setIsPointerOver(true)
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "auto"
        setIsPointerOver(false)
      }}
      material={material}
    ></Sphere>
  )
}

export default RainBalls
