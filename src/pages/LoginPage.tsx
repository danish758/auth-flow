import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from '../components/ui/FormInput'
import Checkbox from '../components/ui/Checkbox'
import Button from '../components/ui/Button'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', remember: false },
  })

  async function onSubmit() {
    // Stub: no real authentication, just simulate a request.
    await new Promise((resolve) => setTimeout(resolve, 1200))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-zinc-200 sm:p-10 dark:bg-zinc-900 dark:ring-zinc-800"
    >
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to your account to continue.
        </p>
      </div>

      <div className="space-y-5">
        <FormInput
          label="Email"
          type="email"
          placeholder="hello@segmentui.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        <Checkbox {...register('remember')}>Remember me</Checkbox>
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        loadingText="Signing in..."
        className="mt-7"
      >
        Sign in
      </Button>

      <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Create one
        </Link>
      </p>
    </form>
  )
}
