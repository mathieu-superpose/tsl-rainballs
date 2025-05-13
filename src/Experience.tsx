import * as THREE from "three/webgpu"
import { Canvas } from "@react-three/fiber"
import { type WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.js"

import "./Experience.css"

import RainBalls from "./components/Rainballs"
import Environment from "./components/Environment"

function Experience() {
  return (
    <div className="experience">
      <div className="canvas-container">
        <Canvas
          className="!fixed inset-0"
          performance={{ min: 0.5, debounce: 300 }}
          camera={{ position: [0, 0, 5], far: 20 }}
          gl={async (props) => {
            console.warn("WebGPU is supported")
            const renderer = new THREE.WebGPURenderer(
              props as WebGPURendererParameters
            )
            await renderer.init()
            return renderer
          }}
        >
          <RainBalls />
          <Environment />
        </Canvas>
      </div>
    </div>
  )
}
export default Experience
