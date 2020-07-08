interface ContainerProps {
  classNames?: string
  children: React.ReactNode
}
function Container({ classNames = '', children }: ContainerProps) {
  return (
    <div className={`${classNames} max-w-2xl mx-auto px-4 xl:px-0`}>
      {children}
    </div>
  )
}

export default Container
