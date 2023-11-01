import '../xterm.css'

export default function TestLayout({ children }) {
  return (
    <div className="m-10 bg-base-200 dark:bg-base-900">
      {children}
    </div>
  )
}