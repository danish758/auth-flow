import SignupForm from './components/signup/SignupForm'
import ThemeToggle from './components/ui/ThemeToggle'

function App() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10 dark:bg-zinc-950">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      <SignupForm />
    </main>
  )
}

export default App
