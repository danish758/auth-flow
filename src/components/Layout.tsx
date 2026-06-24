import { Link, Outlet } from 'react-router-dom'
import { Lock } from 'lucide-react'
import ThemeToggle from './ui/ThemeToggle'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 dark:bg-zinc-950">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Lock className="h-4 w-4" aria-hidden="true" />
          </span>
          auth-flow
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}
