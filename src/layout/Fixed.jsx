export const BottomRight = ({ children }) => {
  return (
    <div id="scale-down" className="absolute bottom-10 right-2 flex flex-col items-end justify-end">
      {children}
    </div>
  )
}

export const BottomLeft = ({ children }) => {
  return (
    <div id="scale-down" className="absolute bottom-2 left-2 flex flex-col items-start justify-end">
      {children}
    </div>
  )
}
