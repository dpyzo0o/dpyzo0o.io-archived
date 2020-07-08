interface CalloutProps {
  background?: string
  emoji?: string
  children?: React.ReactNode
}

function Callout({
  background = 'bg-orange-100',
  emoji = '💡',
  children,
}: CalloutProps) {
  return (
    <p className={`${background} flex rounded-lg`}>
      <span className="pl-3 pr-2 py-2 select-none text-xl">{emoji}</span>
      <span className="pr-4 py-2">{children}</span>
    </p>
  )
}

export default Callout
