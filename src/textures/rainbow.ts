import { abs, Fn, positionGeometry, vec3, vec4 } from "three/tsl"

const rainbow = Fn(() => {
  const pos = positionGeometry.toVar()
  
  const color = vec3(abs(pos.x), abs(pos.y), abs(pos.z))

  return vec4(color, 1)
})

export default rainbow
