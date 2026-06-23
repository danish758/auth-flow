import { Check } from 'lucide-react'
import { passwordChecks, getPasswordStrength } from '../../lib/password'

interface PasswordStrengthBarProps {
  value: string
}

const SEGMENTS = 5

const levelStyles = {
  Weak: { text: 'text-red-500', bar: 'bg-red-500' },
  Medium: { text: 'text-yellow-500', bar: 'bg-yellow-500' },
  Strong: { text: 'text-green-600 dark:text-green-500', bar: 'bg-green-500' },
} as const

export default function PasswordStrengthBar({
  value,
}: PasswordStrengthBarProps) {
  const { score, level } = getPasswordStrength(value)
  const styles = levelStyles[level]

  return (
    <div className="mt-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200 transition-colors dark:bg-zinc-800/60 dark:ring-zinc-700">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Your password must include
      </p>

      <ul className="mt-2 space-y-1.5">
        {passwordChecks.map((check) => {
          const met = check.test(value)
          return (
            <li
              key={check.label}
              className="flex items-center gap-2 text-sm transition-colors"
            >
              <Check
                className={`h-4 w-4 shrink-0 transition-colors ${
                  met ? 'text-indigo-500' : 'text-zinc-300 dark:text-zinc-600'
                }`}
                strokeWidth={3}
                aria-hidden="true"
              />
              <span
                className={
                  met
                    ? 'text-zinc-700 dark:text-zinc-200'
                    : 'text-zinc-400 dark:text-zinc-500'
                }
              >
                {check.label}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Password Strength
        </span>
        {value.length > 0 && (
          <span className={`text-sm font-semibold ${styles.text}`}>
            {level}
          </span>
        )}
      </div>

      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < score ? styles.bar : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
