import * as THREE from "three"

import { useMemo } from "react"

import Ball from "./Ball"

const HEIGHT = 10
const WIDTH = 10

function Rainballs() {
  const balls = useMemo(() => {
    const b = []

    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        const initialPosition = new THREE.Vector3(
          col - WIDTH / 2,
          row - HEIGHT / 2,
          0
        )
        b.push(
          <Ball
            key={`${row}-${col}`}
            initialPosition={initialPosition}
            index={row + col}
          />
        )
      }
    }
    return b
  }, [])

  return <group>{balls}</group>
}

export default Rainballs
