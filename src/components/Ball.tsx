import * as THREE from "three"

function Ball({ initialPosition }: { initialPosition: THREE.Vector3 }) {
  return (
    <mesh position={initialPosition} scale={0.45}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default Ball
