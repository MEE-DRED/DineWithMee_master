// ─── Shared Brand Logo ────────────────────────────────────────────────────────
// Lives in its own file (no imports from LandingPage/TeamPage) so it can be
// shared by both without creating a circular import between them.
export function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* rising steam */}
      <path d="M38 6c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#c9a84c" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
      <path d="M50 2c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#d9b962" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M62 6c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#c9a84c" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
      {/* sprouting leaf */}
      <path d="M50 30c-13 4-22 16-16 30 12-3 22-14 16-30z" fill="#2f6b45" />
      <path d="M50 30c9 7 13 17 8 27-6-3-12-10-8-27z" fill="#e8c87d" />
      <path d="M50 30c-6 9-8 18-4 27" fill="none" stroke="#1a3d2e" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      {/* bowl */}
      <path d="M12 58a38 22 0 0076 0v3.5a38 24 0 01-76 0z" fill="#1a3d2e" />
      <path d="M12 58a38 22 0 0176 0" fill="none" stroke="#123024" strokeWidth="1.5" />
    </svg>
  );
}