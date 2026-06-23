import { useState } from 'react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { CheckCircle2 } from 'lucide-react'
import FormInput from '../ui/FormInput'
import Checkbox from '../ui/Checkbox'
import Button from '../ui/Button'
import PasswordStrengthBar from './PasswordStrengthBar'
import CountrySelect from './CountrySelect'
import GenderSelect from './GenderSelect'
import { isPasswordValid } from '../../lib/password'

interface SignupFormValues {
  email: string
  username: string
  password: string
  country: string
  gender: string
  terms: boolean
}

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const

export default function SignupForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      country: '',
      gender: '',
      terms: false,
    },
  })

  const password = useWatch({ control, name: 'password' })

  async function onSubmit() {
    // Simulate a network request — frontend only, no real API.
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15">
          <CheckCircle2
            className="h-8 w-8 text-green-600 dark:text-green-500"
            aria-hidden="true"
          />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Account created
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Welcome aboard! Your account has been successfully created.
        </p>
        <Button
          type="button"
          onClick={() => {
            reset()
            setSubmitted(false)
          }}
          className="mt-6"
        >
          Create another account
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl ring-1 ring-zinc-200 sm:p-10 dark:bg-zinc-900 dark:ring-zinc-800"
    >
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Sign up to get started - it only takes a minute.
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
          label="Username"
          type="text"
          placeholder="itsnotnabeel"
          autoComplete="username"
          addon="@"
          error={errors.username?.message}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must be at most 20 characters',
            },
            pattern: {
              value: /^\S+$/,
              message: 'Username cannot contain spaces',
            },
          })}
        />

        <div>
          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              validate: (value) =>
                isPasswordValid(value) ||
                'Password does not meet all requirements',
            })}
          />
          <PasswordStrengthBar value={password} />
        </div>

        <Controller
          control={control}
          name="country"
          rules={{ required: 'Please select a country' }}
          render={({ field }) => (
            <CountrySelect
              label="Country of Residence"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.country?.message}
            />
          )}
        />

        <GenderSelect
          label="Gender"
          options={GENDERS}
          registration={register('gender', { required: true })}
          error={errors.gender ? 'Please select a gender' : undefined}
        />

        <div>
          <Checkbox
            {...register('terms', {
              required: 'You must accept the terms to continue',
            })}
          >
            By signing up, I agree to the{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500 dark:text-indigo-400"
            >
              Terms and Conditions
            </a>
          </Checkbox>
          {errors.terms && (
            <p className="mt-1.5 text-sm text-red-500">{errors.terms.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        loading={isSubmitting}
        loadingText="Creating account..."
        className="mt-7"
      >
        Continue
      </Button>
    </form>
  )
}
