type P = { className?: string }

export const Logo = ({ className = 'h-10' }: P) => (
  <svg viewBox="0 0 168 168" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0Zm38.5 121.2a5.2 5.2 0 0 1-7.2 1.7c-19.7-12-44.4-14.7-73.6-8.1a5.2 5.2 0 1 1-2.3-10.2c31.9-7.3 59.3-4.2 81.4 9.3a5.2 5.2 0 0 1 1.7 7.3Zm10.3-22.8a6.5 6.5 0 0 1-9 2.1c-22.5-13.8-56.8-17.8-83.4-9.8a6.5 6.5 0 1 1-3.8-12.5c30.4-9.2 68.2-4.8 94 11.1a6.5 6.5 0 0 1 2.2 9.1Zm.9-23.8C106.7 58.6 62.2 57.1 36.4 65a7.8 7.8 0 1 1-4.5-15c29.6-9 78.8-7.2 109.8 11.2a7.8 7.8 0 0 1-8 13.4Z"
    />
  </svg>
)

export const Wordmark = ({ className = 'h-8' }: P) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <Logo className="h-full" />
    <span className="text-[1.45em] font-extrabold tracking-[-0.04em] leading-none">Spotify</span>
  </span>
)

const base = 'h-7 w-7'
export const IconNoAds = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M3 18V12a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z" />
    <path d="M4 4l16 16" strokeLinecap="round" />
  </svg>
)
export const IconDownload = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v9m0 0-4-4m4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const IconShuffle = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const IconQuality = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0" strokeLinecap="round" />
  </svg>
)
export const IconFriends = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" strokeLinecap="round" />
  </svg>
)
export const IconQueue = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path d="M3 6h13M3 12h9M3 18h9" strokeLinecap="round" />
    <path d="M16 11v8.5a2.5 2.5 0 1 1-2.5-2.5H16M16 11l5-1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const IconCheck = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const IconPlus = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)
export const IconPlay = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
  </svg>
)
export const IconArrow = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <path d="M5 12h14m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
