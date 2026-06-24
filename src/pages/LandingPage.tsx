import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-zinc-200 sm:p-10 dark:bg-zinc-900 dark:ring-zinc-800">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
        <Lock className="h-7 w-7" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Welcome to auth-flow
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        A demo of a polished, accessible authentication experience — with an
        unsaved-changes guard that warns you before you lose your work.
      </p>

      <div className="mt-7 flex flex-col gap-3">
        <Link
          to="/signup"
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          Create an account
        </Link>
        <Link
          to="/login"
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
