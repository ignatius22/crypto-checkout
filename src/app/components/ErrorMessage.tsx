/**
 * ErrorMessage Component
 *
 * A reusable error message display with consistent styling and accessibility.
 *
 * @component
 * @example
 * ```tsx
 * <ErrorMessage message={errors.email} />
 * <ErrorMessage message="Invalid input" id="custom-error" />
 * ```
 */

import React, { memo } from "react";

interface ErrorMessageProps {
  /** Error message to display */
  message?: string;
  /** Optional custom ID for aria-describedby */
  id?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Accessible error message component
 *
 * Features:
 * - Conditional rendering (only shows if message exists)
 * - role="alert" for screen readers
 * - Consistent styling
 * - Optional custom ID for ARIA associations
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  id,
  className = "",
}) => {
  if (!message) return null;

  return (
    <p
      id={id}
      className={`mt-1 text-sm text-red-600 ${className}`}
      role="alert"
    >
      {message}
    </p>
  );
};

export default memo(ErrorMessage);
