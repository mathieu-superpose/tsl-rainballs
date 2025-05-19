import type MathNode from "three/src/nodes/math/MathNode.js"
import type OperatorNode from "three/src/nodes/math/OperatorNode.js"
import {
  max,
  sub,
  min,
  floor,
  Fn,
  positionLocal,
  vec3,
  time,
  type ShaderNodeObject,
} from "three/tsl"

const hslHelper = Fn(
  ([h, s, l, n]: [
    ShaderNodeObject<OperatorNode>,
    ShaderNodeObject<OperatorNode>,
    ShaderNodeObject<OperatorNode>,
    ShaderNodeObject<OperatorNode>
  ]) => {
    const k = n.add(h.mul(12)).mod(12)
    const a = s.mul(min(l, sub(1, l)))
    return l.sub(a.mul(max(-1, min(min(k.sub(3), sub(9, k)), 1))))
  }
)

const hsl = Fn(
  ([h, s, l]: [
    ShaderNodeObject<MathNode>,
    ShaderNodeObject<MathNode>,
    ShaderNodeObject<MathNode>
  ]) => {
    h = h.fract().add(1).fract()
    s = s.clamp(0, 1)
    l = l.clamp(0, 1)
    const r = hslHelper(h, s, l, 0)
    const g = hslHelper(h, s, l, 8)
    const b = hslHelper(h, s, l, 4)
    return vec3(r, g, b)
  }
)

const rainbow = Fn(() => {
  const t = time.mul(0.2).fract()
  const p = positionLocal.mul(0.2).add(0.5).toVar().sub(t)
  const hue = floor(p.y.mul(10)).mul(0.1)
  const sat = hue.mod(1).oneMinus().mul(0.5)
  const col = hsl(hue, 1, sat)
  return col
})

export default rainbow
