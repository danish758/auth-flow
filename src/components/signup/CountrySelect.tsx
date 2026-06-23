import { useMemo } from 'react'
import SearchableSelect, {
  type SelectOption,
} from '../ui/SearchableSelect'
import { COUNTRIES } from '../../lib/countries'

interface CountrySelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
}

/**
 * Searchable country picker. Feeds the full world country list (with flags)
 * into the reusable {@link SearchableSelect}.
 */
export default function CountrySelect({
  label,
  value,
  onChange,
  onBlur,
  error,
}: CountrySelectProps) {
  const options = useMemo<SelectOption[]>(
    () =>
      COUNTRIES.map((c) => ({ value: c.name, label: c.name, icon: c.flag })),
    [],
  )

  return (
    <SearchableSelect
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      placeholder="Select country"
      searchPlaceholder="Search countries..."
      id="country"
    />
  )
}
