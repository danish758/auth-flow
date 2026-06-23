import type { UseFormRegisterReturn } from 'react-hook-form'

interface GenderSelectProps {
  label: string
  options: readonly string[]
  registration: UseFormRegisterReturn
  error?: string
}

/**
 * Radio-button group. Each option is a card that highlights when selected
 * via the `has-[:checked]` variant.
 */
export default function GenderSelect({
  label,
  options,
  registration,
  error,
}: GenderSelectProps) {
  return (
    <div>
      <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {label}
      </span>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm text-zinc-700 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-700 dark:border-zinc-700 dark:text-zinc-300 dark:has-[:checked]:bg-indigo-500/10 dark:has-[:checked]:text-indigo-300"
          >
            <input
              type="radio"
              value={option}
              className="h-4 w-4 accent-indigo-600"
              {...registration}
            />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
