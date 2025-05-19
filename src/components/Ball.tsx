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
    const mat = new THREE.NodeMaterial()

    // add uTime to the shader
    // mat.colorNode = rainbow()
    mat.fragmentNode = rainbow()

    return mat
  }, [])

  useFrame((_state, delta) => {
    if (meshRef.current) {
      // ROTATE THE BALL
      meshRef.current.rotation.x += delta * 0.1 + ((index * 0.001) % 0.05)
      meshRef.current.rotation.y += delta * 0.05 + ((index * 0.001) % 0.05)
      meshRef.current.rotation.z += delta * 0.04 + ((index * 0.001) % 0.05)
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
