import { floor, Fn, positionLocal, vec3, vec4 } from "three/tsl"

const eye = Fn(() => {
  const p = vec3(positionLocal.x.add(1))

  let color = floor(p.mul(10))

  return vec4(color, 1)
})

export default eye
