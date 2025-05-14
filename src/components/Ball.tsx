import { useMemo, useRef } from "react"
import * as THREE from "three/webgpu"

import rainbow from "../textures/rainbow"
import { useFrame } from "@react-three/fiber"

function Ball({
  initialPosition,
  index,
}: {
  initialPosition: THREE.Vector3
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardNodeMaterial()

    // add uTime to the shader
    mat.colorNode = rainbow()

    return mat
  }, [])

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1 + ((index * 0.001) % 0.05)
      meshRef.current.rotation.y += delta * 0.05 + ((index * 0.001) % 0.05)
    }
  })

  return (
    <mesh
      ref={meshRef}
      material={material}
      position={initialPosition}
      scale={0.45}
    >
      <icosahedronGeometry args={[1, 4]} />
    </mesh>
  )
}

export default Ball
