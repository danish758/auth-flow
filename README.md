# auth-flow

A modern, responsive SaaS-style signup form built with React, TypeScript,
react-hook-form, and Tailwind CSS. Frontend only — no backend.

## Features

- **Validated signup form** powered by [react-hook-form](https://react-hook-form.com/)
  with inline, real-time error messages and a submit button that stays disabled
  until the form is valid.
  - **Email** — required, validated against an email pattern.
  - **Username** — required, 3–20 characters, no spaces.
  - **Password** — required; must include 8+ characters, an uppercase letter, a
    lowercase letter, a number, and a special character.
  - **Country of residence** — searchable dropdown listing every country, each
    with its flag.
  - **Gender** — radio group (Male / Female / Other / Prefer not to say).
  - **Terms** — must be accepted before submitting.
- **Live password strength indicator** — a checklist of the five rules plus a
  five-segment Weak / Medium / Strong bar that updates as you type.
- **Searchable country select** — type-to-filter combobox with full keyboard
  support (↑/↓/Enter/Esc), built with Tailwind only (no UI library). The full
  country list is derived locally from ISO-3166 codes via `Intl.DisplayNames`,
  with flag emojis generated from the codes.
- **Light / dark mode** — toggle in the top-right corner, persisted to
  `localStorage` and applied before paint to avoid a flash. Defaults to the
  system preference.
- **Simulated submit** — a 1.5s fake API call shows a loading state
  ("Creating account...") and then an in-UI success screen.
- Styled entirely with Tailwind CSS, icons from
  [lucide-react](https://lucide.dev/), and the [Inter](https://rsms.me/inter/)
  typeface.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- react-hook-form
- lucide-react

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR.  |
| `npm run build`   | Type-check and build for production. |
| `npm run preview` | Preview the production build.        |
| `npm run lint`    | Run ESLint.                          |

## Project structure

```
src/
  components/
    ui/                    Reusable primitives (shared across forms)
      Button.tsx           Primary button with loading state
      Checkbox.tsx         Custom checkbox with a lucide check mark
      FormInput.tsx        Labelled text input with error styling
      SearchableSelect.tsx Searchable, keyboard-accessible combobox
      ThemeToggle.tsx      Light/dark mode switch
    signup/                Signup-specific components
      SignupForm.tsx       Main form (state + validation)
      CountrySelect.tsx    Country picker built on SearchableSelect
      GenderSelect.tsx     Gender radio group
      PasswordStrengthBar.tsx
  lib/
    countries.ts           Country list, names, and flags
    password.ts            Password rules + strength scoring
  App.tsx
  main.tsx
  index.css                Tailwind import, theme, and dark-mode variant
```

The `ui/` components are intentionally generic so they can be reused by an
upcoming login form.
