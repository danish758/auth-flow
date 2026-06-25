import { useEffect } from 'react'

/**
 * Warns the user before a *hard* browser exit (tab close, refresh, back to a
 * non-app page) while `when` is true. Browsers only allow their own generic
 * dialog here — the text can't be customized. In-app navigation is handled
 * separately via React Router's `useBlocker`.
 */
export function useUnsavedChangesWarning(when: boolean) {
  useEffect(() => {
    if (!when) return

    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault()
      // Required by some browsers to actually trigger the prompt.
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [when])
}
