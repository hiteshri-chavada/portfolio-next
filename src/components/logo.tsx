export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className ?? "size-11"}
      aria-hidden="true"
    >
      <path
        d="M11,4 C9.5,4 9,5 8.8,7 L6.5,33 C6.3,35 6.8,36 8.3,36 C9.8,36 10.3,35 10.6,33 L13,7 C13.2,5 12.7,4 11,4 Z"
        fill="var(--color-foreground)"
      />
      <path
        d="M29,4 C27.5,4 27,5 26.8,7 L24.5,33 C24.3,35 24.8,36 26.3,36 C27.8,36 28.3,35 28.6,33 L31,7 C31.2,5 30.7,4 29,4 Z"
        fill="var(--color-foreground)"
      />
      <path
        d="M9,19 C9,17.5 9.8,16.8 11.2,17.1 L26.8,19.9 C28.2,20.2 29,20.9 29,22.4 C29,23.9 28.2,24.6 26.8,24.3 L11.2,21.5 C9.8,21.2 9,20.5 9,19 Z"
        fill="var(--color-foreground)"
      />
    </svg>
  );
}
