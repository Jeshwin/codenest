export default function TestLayout({ children }) {
  return (
    <div className="m-10 bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-1)]">
      {children}
    </div>
  )
}