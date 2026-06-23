export interface PasswordCheck {
  label: string
  test: (value: string) => boolean
}

export const passwordChecks: PasswordCheck[] = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { label: 'One number', test: (v) => /[0-9]/.test(v) },
  { label: 'One special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

export type StrengthLevel = 'Weak' | 'Medium' | 'Strong'

export interface PasswordStrength {
  /** Number of satisfied conditions, 0–5. */
  score: number
  level: StrengthLevel
}

/**
 * Scores a password against {@link passwordChecks}.
 * Weak: 0–1 met · Medium: 2–3 met · Strong: 4–5 met.
 */
export function getPasswordStrength(value: string): PasswordStrength {
  const score = passwordChecks.reduce(
    (count, check) => (check.test(value) ? count + 1 : count),
    0,
  )

  let level: StrengthLevel = 'Weak'
  if (score >= 4) level = 'Strong'
  else if (score >= 2) level = 'Medium'

  return { score, level }
}

/** True only when every rule passes — used to gate form validity. */
export function isPasswordValid(value: string): boolean {
  return passwordChecks.every((check) => check.test(value))
}
