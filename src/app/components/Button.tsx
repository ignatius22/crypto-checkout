/**
 * Button Component
 *
 * A fully accessible, customizable button component with loading states,
 * disabled states, and smooth animations. Supports all HTML button types
 * and provides visual feedback for user interactions.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Button title="Click me" onClick={handleClick} />
 *
 * // With loading state
 * <Button
 *   title="Submit"
 *   loading={isSubmitting}
 *   onClick={handleSubmit}
 * />
 *
 * // Fully customized
 * <Button
 *   title="Convert"
 *   width="w-full"
 *   height="h-14"
 *   borderRadius="rounded-full"
 *   bgColor="bg-[#134E4A]"
 *   textColor="text-white"
 *   onClick={handleConvert}
 *   disabled={!isValid}
 * />
 * ```
 */

import React, { memo } from "react";
import { ButtonProps } from "../types/checkout";

/**
 * Enhanced Button component with accessibility and loading states
 *
 * Features:
 * - Loading spinner with smooth animation
 * - Disabled state handling (visual + functional)
 * - Accessibility with ARIA attributes
 * - Hover, focus, and active state micro-interactions
 * - Fully customizable appearance via props
 * - Memoized for performance optimization
 *
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} Rendered button element
 */
const Button: React.FC<ButtonProps> = ({
  title,
  width = "w-auto",
  height = "h-12",
  borderWidth = "",
  borderColor = "",
  borderRadius = "rounded-lg",
  bgColor = "bg-green-600",
  textColor = "text-white",
  className = "",
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  ariaLabel,
}) => {
  // Combine disabled and loading states to prevent interaction
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel || title}
      aria-busy={loading}
      className={`
        ${width} ${height} ${borderWidth} ${borderColor} ${borderRadius}
        ${bgColor} ${textColor}
        px-6 font-semibold
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
        }
        transition-all duration-200
        shadow-md hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {/* Loading spinner - only visible during loading state */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      )}
      {title}
    </button>
  );
};

// Memoize component to prevent unnecessary re-renders
// Only re-renders when props actually change
export default memo(Button);
