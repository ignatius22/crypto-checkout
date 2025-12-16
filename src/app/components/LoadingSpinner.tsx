/**
 * LoadingSpinner Component
 *
 * A reusable animated spinner for loading states.
 * Can be used inline or as a centered indicator.
 *
 * @component
 * @example
 * ```tsx
 * <LoadingSpinner size="sm" />
 * <LoadingSpinner size="md" message="Loading..." />
 * ```
 */

import React, { memo } from "react";

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg";
  /** Optional message to display */
  message?: string;
  /** Additional CSS classes */
  className?: string;
}

const SPINNER_SIZES = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

/**
 * Animated loading spinner component
 *
 * Features:
 * - Multiple sizes (sm, md, lg)
 * - Optional loading message
 * - Accessible with aria-label
 * - Smooth rotation animation
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message,
  className = "",
}) => {
  const sizeClass = SPINNER_SIZES[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className={`animate-spin ${sizeClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
};

export default memo(LoadingSpinner);
