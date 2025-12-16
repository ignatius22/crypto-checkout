/**
 * Utility Functions
 *
 * Common helper functions used throughout the application.
 * These functions are pure and have no side effects.
 */

import { EXCHANGE_RATES } from '../constants/design-tokens';

/**
 * Currency types supported in the application
 */
export type CryptoCurrency = 'ETH' | 'BTC' | 'USDT';
export type FiatCurrency = 'NGN' | 'USD' | 'EUR';

/**
 * Calculates the exchange rate between two currencies
 *
 * @param amount - The amount to convert
 * @param fromCurrency - Source cryptocurrency
 * @param toCurrency - Target fiat currency
 * @returns Converted amount with 2 decimal places
 *
 * @example
 * ```ts
 * const converted = calculateExchangeRate(1, 'ETH', 'NGN');
 * // Returns: "3500000.00"
 * ```
 */
export function calculateExchangeRate(
  amount: number,
  fromCurrency: CryptoCurrency,
  toCurrency: FiatCurrency
): string {
  const key = `${fromCurrency}_TO_${toCurrency}` as keyof typeof EXCHANGE_RATES;
  const rate = EXCHANGE_RATES[key] || 0;
  const result = amount * rate;

  return result.toFixed(2);
}

/**
 * Calculates the inverse exchange rate (from fiat to crypto)
 *
 * @param amount - The fiat amount
 * @param fromCurrency - Source cryptocurrency (for rate lookup)
 * @param toCurrency - Target fiat currency (for rate lookup)
 * @returns Converted crypto amount with 4 decimal places
 *
 * @example
 * ```ts
 * const crypto = calculateInverseRate(3500000, 'ETH', 'NGN');
 * // Returns: "1.0000"
 * ```
 */
export function calculateInverseRate(
  amount: number,
  fromCurrency: CryptoCurrency,
  toCurrency: FiatCurrency
): string {
  const key = `${fromCurrency}_TO_${toCurrency}` as keyof typeof EXCHANGE_RATES;
  const rate = EXCHANGE_RATES[key] || 1;
  const result = amount / rate;

  return result.toFixed(4);
}

/**
 * Formats a number as currency with proper separators
 *
 * @param value - The number to format
 * @param currency - Currency code (for symbol)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234567.89, 'NGN');
 * // Returns: "₦1,234,567.89"
 *
 * formatCurrency(1.234567, 'ETH', 4);
 * // Returns: "1.2346 ETH"
 * ```
 */
export function formatCurrency(
  value: number,
  currency: CryptoCurrency | FiatCurrency,
  decimals = 2
): string {
  const symbols: Record<string, string> = {
    NGN: '₦',
    USD: '$',
    EUR: '€',
    BTC: '₿',
    ETH: 'Ξ',
    USDT: '₮',
  };

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  const symbol = symbols[currency] || currency;

  // For crypto, append symbol; for fiat, prepend
  if (['BTC', 'ETH', 'USDT'].includes(currency)) {
    return `${formatted} ${symbol}`;
  }

  return `${symbol}${formatted}`;
}

/**
 * Validates if a string is a valid email format
 *
 * @param email - Email string to validate
 * @returns True if email is valid
 *
 * @example
 * ```ts
 * isValidEmail('user@example.com'); // true
 * isValidEmail('invalid.email'); // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is a valid phone number format
 *
 * @param phone - Phone number to validate
 * @returns True if phone number is valid (7-15 digits)
 *
 * @example
 * ```ts
 * isValidPhone('2348012345678'); // true
 * isValidPhone('123'); // false
 * ```
 */
export function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * Formats a phone number with country code
 *
 * @param countryCode - Country calling code (e.g., '+234')
 * @param number - Phone number
 * @returns Formatted phone number
 *
 * @example
 * ```ts
 * formatPhoneNumber('+234', '8012345678');
 * // Returns: "+234 8012345678"
 * ```
 */
export function formatPhoneNumber(countryCode: string, number: string): string {
  return `${countryCode} ${number}`;
}

/**
 * Generates a unique ID for form inputs
 *
 * @param prefix - Prefix for the ID
 * @param label - Label text to slugify
 * @returns Unique ID string
 *
 * @example
 * ```ts
 * generateInputId('input', 'Email Address');
 * // Returns: "input-email-address"
 * ```
 */
export function generateInputId(prefix: string, label: string): string {
  const slug = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${prefix}-${slug}`;
}

/**
 * Delays execution for a specified time (useful for simulating API calls)
 *
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 *
 * @example
 * ```ts
 * await delay(1000); // Wait 1 second
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Simulates an API call with a delay
 *
 * @param ms - Delay in milliseconds
 * @param data - Data to return
 * @returns Promise with the data after delay
 *
 * @example
 * ```ts
 * const result = await mockApiCall(500, { success: true });
 * ```
 */
export async function mockApiCall<T>(ms: number, data: T): Promise<T> {
  await delay(ms);
  return data;
}

/**
 * Safely parses a float from a string, returning 0 if invalid
 *
 * @param value - String to parse
 * @param defaultValue - Default value if parsing fails (default: 0)
 * @returns Parsed number or default
 *
 * @example
 * ```ts
 * safeParseFloat('123.45'); // 123.45
 * safeParseFloat('invalid', 10); // 10
 * ```
 */
export function safeParseFloat(value: string, defaultValue = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Truncates text to a maximum length with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 *
 * @example
 * ```ts
 * truncateText('This is a long text', 10);
 * // Returns: "This is a..."
 * ```
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Combines class names, filtering out falsy values
 *
 * @param classes - Class names to combine
 * @returns Combined class string
 *
 * @example
 * ```ts
 * cn('btn', isActive && 'active', 'primary');
 * // Returns: "btn active primary" (if isActive is true)
 * // Returns: "btn primary" (if isActive is false)
 * ```
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Debounces a function call
 *
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait
 * @returns Debounced function
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((query) => {
 *   searchAPI(query);
 * }, 300);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
