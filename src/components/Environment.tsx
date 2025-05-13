function Environment() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 10, 0]} />
    </>
  )
}
export default Environment
