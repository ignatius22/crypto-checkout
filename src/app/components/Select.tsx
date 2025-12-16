/**
 * Select Component
 *
 * A custom dropdown select component with icons, smooth animations,
 * and click-outside detection. Provides better styling control than
 * native HTML select elements.
 *
 * @component
 * @example
 * ```tsx
 * const walletOptions = [
 *   { label: "Metamask", icon: <span>🦊</span> },
 *   { label: "Rainbow", icon: <span>🌈</span> },
 * ];
 *
 * <Select
 *   label="Pay from"
 *   options={walletOptions}
 *   defaultValue=""
 *   onChange={handleWalletChange}
 * />
 * ```
 */

import React, { useState, useRef, useEffect, memo } from "react";
import { FaChevronDown } from "react-icons/fa";
import { SelectProps } from "../types/checkout";

/**
 * Enhanced Select component with dropdown functionality
 *
 * Features:
 * - Custom dropdown with icons
 * - Click-outside detection to close dropdown
 * - Smooth open/close animations
 * - Keyboard-friendly (can be enhanced further)
 * - Selected state visual feedback
 * - Touch-friendly tap targets
 * - Customizable styling via props
 * - Memoized for performance
 */
const Select: React.FC<SelectProps> = ({
  label,
  options,
  defaultValue,
  onChange,
  width = "w-full",
  height = "h-14",
  padding = "px-5 py-4",
  borderRadius = "rounded-full",
  borderColor = "border-gray-200",
  className = "",
}) => {
  const [selected, setSelected] = useState<string | null>(defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Handles option selection
   * Closes dropdown and triggers onChange callback
   */
  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

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

  // Find the currently selected option to display its icon
  const selectedOption = options.find((o) => o.label === selected);

  return (
    <div className={`${width} ${className}`}>
      {/* Label */}
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>

      {/* Select Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={`
            flex items-center justify-between w-full
            ${height} ${padding} ${borderRadius}
            border ${borderColor}
            bg-white hover:bg-gray-50
            cursor-pointer
            transition-all duration-200
            focus:outline-none focus:ring-0
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Selected Value */}
          <div className="flex items-center gap-3">
            {selectedOption?.icon && (
              <div className="text-lg">{selectedOption.icon}</div>
            )}
            <span
              className={`${
                selected ? "text-gray-900 font-normal" : "text-gray-400"
              }`}
            >
              {selected || "Select an option"}
            </span>
          </div>

          {/* Dropdown Icon - rotates when dropdown is open */}
          <FaChevronDown
            className={`text-gray-400 text-sm transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            role="listbox"
            className={`
              absolute left-0 right-0 mt-2
              bg-white border ${borderColor} rounded-md
              shadow-lg z-50
              animate-in fade-in slide-in-from-top-2 duration-200
            `}
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <div
                  key={option.label}
                  role="option"
                  aria-selected={selected === option.label}
                  className={`
                    flex items-center gap-3
                    px-5 py-3.5
                    hover:bg-gray-50
                    cursor-pointer
                    transition-colors duration-150
                    ${index !== options.length - 1 ? "border-b border-gray-100" : ""}
                    ${selected === option.label ? "bg-gray-50" : ""}
                  `}
                  onClick={() => handleSelect(option.label)}
                >
                  {option.icon && <div className="text-lg">{option.icon}</div>}
                  <span className="text-gray-900">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Memoize to prevent re-renders when props haven't changed
export default memo(Select);
