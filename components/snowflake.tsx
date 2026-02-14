export function Snowflake({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`snowflake-decoration ${className}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2L20 38M8.5 8.5L31.5 31.5M2 20L38 20M8.5 31.5L31.5 8.5M14 6L20 2L26 6M34 14L38 20L34 26M26 34L20 38L14 34M6 26L2 20L6 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
