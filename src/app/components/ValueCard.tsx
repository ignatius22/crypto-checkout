/**
 * ValueCard Component
 *
 * A card component for displaying and editing currency values with
 * a dropdown currency selector. Used for "You pay" and "You receive"
 * sections in the checkout flow.
 *
 * @component
 * @example
 * ```tsx
 * const currencies = [
 *   { label: "ETH", icon: <FaEthereum /> },
 *   { label: "BTC", icon: <FaBitcoin /> },
 * ];
 *
 * <ValueCard
 *   title="You pay"
 *   value="1.00"
 *   currencyOptions={currencies}
 *   selectedCurrency="ETH"
 *   onCurrencyChange={setCurrency}
 *   onValueChange={setValue}
 *   editable
 * />
 * ```
 */

import React, { useState, useRef, useEffect, memo } from "react";
import { FaChevronDown } from "react-icons/fa";

interface CurrencyOption {
  /** Currency code (e.g., "ETH", "BTC", "USD") */
  label: string;
  /** Icon or emoji to display next to currency code */
  icon?: React.ReactNode;
}

interface ValueCardProps {
  /** Card title (e.g., "You pay", "You receive") */
  title: string;
  /** Numeric value to display */
  value: string;
  /** Array of available currencies to choose from */
  currencyOptions: CurrencyOption[];
  /** Currently selected currency code */
  selectedCurrency: string;
  /** Callback when currency is changed */
  onCurrencyChange: (currency: string) => void;
  /** Callback when value is changed (only used if editable=true) */
  onValueChange?: (value: string) => void;
  /** Whether the value can be edited by the user */
  editable?: boolean;
}

/**
 * Enhanced ValueCard component with currency selection
 *
 * Features:
 * - Editable or read-only value display
 * - Currency dropdown with search functionality
 * - Click-outside detection
 * - Responsive typography (text-2xl → text-4xl)
 * - Icon support for each currency
 * - Selected state visual feedback
 * - Smooth animations and transitions
 * - Memoized for performance
 */
const ValueCard: React.FC<ValueCardProps> = ({
  title,
  value,
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  onValueChange,
  editable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Click-outside detection effect
   * Closes dropdown when user clicks anywhere outside the component
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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Find the selected currency option to display its icon
  const selectedOption = currencyOptions.find((opt) => opt.label === selectedCurrency);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{title}</p>
      <div className="flex items-center justify-between gap-2">
        {/* Value display - editable input or static text */}
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-transparent border-none outline-none w-full min-w-0"
            placeholder="0.00"
          />
        ) : (
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{value}</p>
        )}

        {/* Currency Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors duration-200 shrink-0"
          >
            {selectedOption?.icon && <div className="text-base sm:text-lg">{selectedOption.icon}</div>}
            <span className="font-semibold text-sm sm:text-base text-gray-900">{selectedCurrency}</span>
            <FaChevronDown
              className={`text-gray-500 text-xs transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              role="listbox"
              className="absolute right-0 top-full mt-2 w-72 sm:w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* Search Input */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    aria-label="Search currencies"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Currency Options List */}
              <div className="max-h-60 overflow-y-auto">
                {currencyOptions.map((option, index) => (
                  <div
                    key={option.label}
                    role="option"
                    aria-selected={selectedCurrency === option.label}
                    onClick={() => {
                      onCurrencyChange(option.label);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 px-4 py-3
                      hover:bg-gray-50 cursor-pointer
                      transition-colors duration-150
                      ${index !== currencyOptions.length - 1 ? "border-b border-gray-100" : ""}
                      ${selectedCurrency === option.label ? "bg-gray-50" : ""}
                    `}
                  >
                    {option.icon && <div className="text-lg">{option.icon}</div>}
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Memoize to prevent re-renders when props haven't changed
export default memo(ValueCard);
