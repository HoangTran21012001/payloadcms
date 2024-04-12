export const Scroll: React.FC<{
  name: string
}> = props => {
  const { name } = props
  return (
    <>
    <div>
    <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
    </div>
    </>
  )
}
