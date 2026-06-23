import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  /** Optional fixed addon shown inside the field, e.g. an "@" for usernames. */
  addon?: ReactNode
}

/**
 * Reusable labelled text input with error styling.
 * Shared across the signup and (upcoming) login forms.
 */
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, addon, id, className, ...props }, ref) => {
    const inputId = id ?? props.name
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {label}
        </label>

        <div
          className={`mt-2 flex items-stretch overflow-hidden rounded-xl border bg-white shadow-sm transition-colors focus-within:ring-2 dark:bg-zinc-900 ${
            error
              ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/30'
              : 'border-zinc-300 focus-within:border-indigo-500 focus-within:ring-indigo-500/30 dark:border-zinc-700'
          }`}
        >
          {addon != null && (
            <span className="flex select-none items-center border-r border-zinc-200 px-3 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
              {addon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={`w-full bg-transparent px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 ${
              className ?? ''
            }`}
            {...props}
          />
        </div>

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'

export default FormInput
