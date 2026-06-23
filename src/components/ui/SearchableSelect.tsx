import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  /** Optional leading glyph, e.g. a flag emoji. */
  icon?: string
}

interface SearchableSelectProps {
  label: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  placeholder?: string
  searchPlaceholder?: string
  id?: string
}

/**
 * Reusable searchable single-select combobox. Tailwind-only, fully controlled,
 * keyboard-accessible (↑/↓/Enter/Esc) and theme-aware.
 */
export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  id,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const errorId = error ? `${selectId}-error` : undefined
  const selected = options.find((o) => o.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  function openMenu() {
    setQuery('')
    const idx = options.findIndex((o) => o.value === value)
    setHighlight(idx >= 0 ? idx : 0)
    setOpen(true)
  }

  function closeMenu() {
    setOpen(false)
    onBlur?.()
  }

  // Close on outside click; treat it as a blur for validation.
  useEffect(() => {
    if (!open) return
    function handlePointer(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        onBlur?.()
      }
    }
    document.addEventListener('mousedown', handlePointer)
    return () => document.removeEventListener('mousedown', handlePointer)
  }, [open, onBlur])

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    if (!open) return
    const node = listRef.current?.children[highlight] as HTMLElement | undefined
    node?.scrollIntoView({ block: 'nearest' })
  }, [highlight, open])

  function commit(option: SelectOption) {
    onChange(option.value)
    closeMenu()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      openMenu()
      return
    }
    if (!open) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlight((h) => Math.min(h + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlight((h) => Math.max(h - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[highlight]) commit(filtered[highlight])
        break
      case 'Escape':
        e.preventDefault()
        closeMenu()
        break
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={selectId}
        className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>

      <button
        type="button"
        id={selectId}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        className={`mt-2 flex w-full items-center justify-between rounded-xl border bg-white py-2.5 pl-4 pr-3.5 text-left shadow-sm transition-colors focus:outline-none focus:ring-2 dark:bg-zinc-900 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30'
            : 'border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500/30 dark:border-zinc-700'
        }`}
      >
        <span
          className={`flex items-center gap-2 truncate ${
            selected
              ? 'text-zinc-900 dark:text-zinc-100'
              : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          {selected ? (
            <>
              <span className="text-base leading-none">{selected.icon}</span>
              <span className="truncate">{selected.label}</span>
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-100 px-3 dark:border-zinc-800">
            <Search className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlight(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100"
            />
          </div>

          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-zinc-400">
                No countries found
              </li>
            ) : (
              filtered.map((option, i) => {
                const isSelected = option.value === value
                const isActive = i === highlight
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => commit(option)}
                    className={`flex cursor-pointer items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                        : 'text-zinc-700 dark:text-zinc-200'
                    }`}
                  >
                    {option.icon && (
                      <span className="text-base leading-none">
                        {option.icon}
                      </span>
                    )}
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <Check
                        className="ml-auto h-4 w-4 shrink-0 text-indigo-500"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
