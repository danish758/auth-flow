import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

/**
 * Reusable checkbox with a custom indigo box + lucide check mark.
 * The native input is visually hidden but stays focusable and accessible.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            className={`peer absolute inset-0 z-10 cursor-pointer opacity-0 ${
              className ?? ''
            }`}
            {...props}
          />
          <span className="pointer-events-none absolute inset-0 rounded-md border-2 border-zinc-300 bg-white transition-colors duration-150 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/40 peer-focus-visible:ring-offset-1 dark:border-zinc-600 dark:bg-zinc-900 dark:peer-checked:border-indigo-500 dark:peer-checked:bg-indigo-500" />
          <Check
            className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 scale-50 text-white opacity-0 transition-all duration-150 peer-checked:scale-100 peer-checked:opacity-100"
            strokeWidth={3.5}
          />
        </span>
        <span className="leading-relaxed">{children}</span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
