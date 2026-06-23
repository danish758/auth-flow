import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/** Reads the theme the no-flash inline script already applied to <html>. */
function isDark(): boolean {
  return document.documentElement.classList.contains('dark')
}

/**
 * Toggles between light and dark themes by switching the `.dark` class on
 * <html> and persisting the choice to localStorage.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark)

  function toggle() {
    const next = !dark
    setDark(next)
    const root = document.documentElement
    root.classList.toggle('dark', next)
    root.style.colorScheme = next ? 'dark' : 'light'
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {dark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}
