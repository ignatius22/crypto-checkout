/**
 * TextInput Component
 *
 * A fully accessible text input field with validation, error states,
 * required field indicators, and proper ARIA attributes for screen readers.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <TextInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={setEmail}
 * />
 *
 * // With validation
 * <TextInput
 *   label="Account Number"
 *   placeholder="Enter 10-digit account number"
 *   value={accountNumber}
 *   onChange={setAccountNumber}
 *   error={errors.accountNumber}
 *   required
 * />
 * ```
 */

import React, { memo } from "react";

interface TextInputProps {
  /** Label text displayed above the input */
  label: string;
  /** Placeholder text shown when input is empty */
  placeholder: string;
  /** Current input value */
  value?: string;
  /** Callback fired when input value changes */
  onChange?: (value: string) => void;
  /** HTML input type (text, email, number, etc.) */
  type?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message to display (input will show error state if present) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Custom ID for the input (auto-generated from label if not provided) */
  id?: string;
}

/**
 * Enhanced TextInput component with comprehensive accessibility
 *
 * Features:
 * - Auto-generated unique IDs for label-input association
 * - Required field indicator (red asterisk)
 * - Error state with red border and error message
 * - ARIA attributes for screen readers (aria-invalid, aria-describedby)
 * - Disabled state with visual feedback
 * - Touch-friendly height (56px minimum)
 * - Smooth focus transitions
 * - Memoized for performance
 */
const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value = "",
  onChange,
  type = "text",
  disabled = false,
  error,
  required = false,
  id,
}) => {
  // Auto-generate input ID from label if not provided
  // This ensures proper label-input association for accessibility
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      {/* Label with required indicator */}
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input field with error and disabled states */}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`
          w-full px-5 py-4 h-14
          border ${error ? 'border-red-500' : 'border-gray-200'} rounded-full
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
          transition-all duration-200
          ${disabled ? "bg-gray-50 text-gray-600" : "bg-white hover:bg-gray-50"}
        `}
      />

      {/* Error message - only shown when error exists */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Memoize to prevent re-renders when props haven't changed
export default memo(TextInput);
