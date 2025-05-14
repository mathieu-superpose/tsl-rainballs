import { useMemo } from "react"
import * as THREE from "three/webgpu"

import rainbow from "../textures/rainbow"

function Ball({ initialPosition }: { initialPosition: THREE.Vector3 }) {
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardNodeMaterial()

    // add uTime to the shader
    mat.colorNode = rainbow()

    return mat
  }, [])

  return (
    <mesh material={material} position={initialPosition} scale={0.45}>
      <icosahedronGeometry args={[1, 4]} />
    </mesh>
  )
}

export default Ball
