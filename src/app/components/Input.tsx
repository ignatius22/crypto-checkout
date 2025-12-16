/**
 * PhoneInput Component
 *
 * An international phone number input component with country code selector.
 * Displays country flag, calling code, and allows users to select from
 * a searchable list of countries.
 *
 * @component
 * @example
 * ```tsx
 * const countries = [
 *   { name: "Nigeria", code: "+234", flag: "🇳🇬" },
 *   { name: "United States", code: "+1", flag: "🇺🇸" },
 * ];
 *
 * <PhoneInput
 *   label="Phone number"
 *   countries={countries}
 *   selectedCountry={selectedCountry}
 *   number={phoneNumber}
 *   onChangeCountry={setCountry}
 *   onChangeNumber={setPhoneNumber}
 * />
 * ```
 */

import React, { useState, useRef, useEffect, memo } from "react";
import { PhoneInputProps } from "../types/checkout";

/**
 * Enhanced PhoneInput component for international phone numbers
 *
 * Features:
 * - Country code dropdown with flags
 * - Click-outside detection
 * - Focus ring on phone number input
 * - Country format: Code → Flag → Dropdown Icon
 * - Smooth animations
 * - Touch-friendly tap targets
 * - Customizable styling via props
 * - Memoized for performance
 */
const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  countries,
  selectedCountry,
  number = "",
  onChangeCountry,
  onChangeNumber,
  width = "w-full",
  height = "h-14",
  padding = "px-4 py-3",
  borderRadius = "rounded-full",
  borderColor = "border-gray-200",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Click-outside detection effect
   * Closes country dropdown when user clicks anywhere outside the component
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`flex flex-col ${width}`}>
      {/* Label */}
      <label className="mb-2 text-sm font-semibold text-gray-800">{label}</label>

      {/* Input Container - combines country selector and phone input */}
      <div
        className={`
          flex
          ${borderRadius}
          overflow-hidden
          shadow-sm hover:shadow-md
          transition-all duration-200
          ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        `}
      >
        {/* Country Code Selector - Order: Code → Flag → Dropdown Icon */}
        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label="Select country code"
            className={`
              relative flex items-center gap-2
              ${height} px-4
              bg-gray-50 border ${borderColor}
              hover:bg-gray-100 active:bg-gray-200
              transition-all duration-200
              ${borderRadius.replace('rounded-full', 'rounded-l-full')}
              ${isOpen ? 'bg-gray-100' : ''}
              focus:outline-none
            `}
          >
            <span className="text-sm font-medium text-gray-700">{selectedCountry?.code}</span>
            <span className="text-xl">{selectedCountry?.flag}</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Country Dropdown List */}
          {isOpen && (
            <div
              role="listbox"
              className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {countries.map((country, index) => (
                <div
                  key={country.code}
                  role="option"
                  aria-selected={selectedCountry?.code === country.code}
                  className={`
                    px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer
                    flex items-center gap-3 transition-colors duration-150
                    ${index !== countries.length - 1 ? 'border-b border-gray-100' : ''}
                    ${selectedCountry?.code === country.code ? 'bg-blue-50' : ''}
                  `}
                  onClick={() => {
                    onChangeCountry?.(country);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="font-semibold text-gray-800 min-w-12">{country.code}</span>
                  <span className="text-gray-600 text-sm truncate">{country.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input Field */}
        <input
          type="tel"
          value={number}
          onChange={(e) => onChangeNumber?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter phone number"
          aria-label="Phone number"
          className={`
            flex-1 ${height} ${padding}
            border ${borderColor} border-l-0
            ${borderRadius.replace('rounded-full', 'rounded-r-full')}
            bg-white
            text-gray-900 font-medium placeholder-gray-400
            focus:outline-none
            transition-all duration-200
          `}
        />
      </div>
    </div>
  );
};

// Memoize to prevent re-renders when props haven't changed
export default memo(PhoneInput);
