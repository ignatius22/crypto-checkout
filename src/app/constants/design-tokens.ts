/**
 * Design Tokens - Centralized design system constants
 *
 * This file contains all design tokens used throughout the application.
 * Centralizing these values ensures consistency and makes theme changes easy.
 */

/**
 * Brand Colors
 * Primary colors used throughout the application
 */
export const COLORS = {
  primary: '#134E4A',        // Dark teal - primary brand color
  success: '#16A34A',        // Green - success states
  error: '#EF4444',          // Red - error states
  warning: '#F59E0B',        // Amber - warning states

  background: {
    primary: '#F5F5F0',      // Warm off-white - main background
    card: '#FFFFFF',         // White - card background
    input: '#FFFFFF',        // White - input background
    gray: '#F3F4F6',         // Light gray - secondary background
  },

  text: {
    primary: '#111827',      // Gray-900 - primary text
    secondary: '#6B7280',    // Gray-500 - secondary text
    tertiary: '#9CA3AF',     // Gray-400 - tertiary text/placeholders
    white: '#FFFFFF',        // White text
    error: '#EF4444',        // Error text
  },

  border: {
    default: '#E5E7EB',      // Gray-200 - default borders
    focus: '#134E4A',        // Primary - focus states
    error: '#EF4444',        // Red - error states
  },
} as const;

/**
 * Spacing Scale
 * Consistent spacing values following 8px grid system
 */
export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
} as const;

/**
 * Border Radius Values
 * Consistent border radius for different component types
 */
export const RADIUS = {
  sm: '0.375rem',      // 6px - subtle curves
  md: '0.5rem',        // 8px - medium curves
  lg: '0.75rem',       // 12px - large curves
  xl: '1rem',          // 16px - extra large
  '2xl': '1.5rem',     // 24px - cards
  '3xl': '1.875rem',   // 30px - large cards
  full: '9999px',      // Fully rounded (pills/buttons)
} as const;

/**
 * Responsive Breakpoints
 * Mobile-first breakpoint system
 */
export const BREAKPOINTS = {
  sm: 640,    // Tablet and up
  md: 768,    // Desktop
  lg: 1024,   // Large desktop
  xl: 1280,   // Extra large
  '2xl': 1536, // 2X large
} as const;

/**
 * Typography Scale
 * Font size and weight combinations
 */
export const TYPOGRAPHY = {
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/**
 * Animation Durations
 * Consistent timing for transitions and animations
 */
export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

/**
 * Z-Index Scale
 * Layering system for stacked elements
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;

/**
 * Common Component Heights
 * Standardized heights for interactive elements
 */
export const HEIGHTS = {
  input: '3.5rem',        // 56px - touch-friendly inputs
  button: '3.5rem',       // 56px - touch-friendly buttons
  buttonSmall: '2.5rem',  // 40px - compact buttons
  header: '4rem',         // 64px - page headers
} as const;

/**
 * Form Validation Rules
 * Centralized validation constants
 */
export const VALIDATION = {
  accountNumber: {
    minLength: 10,
    maxLength: 10,
  },

  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  phone: {
    minLength: 7,
    maxLength: 15,
  },
} as const;

/**
 * Exchange Rate Mock Data
 * Simulated exchange rates for demo purposes
 */
export const EXCHANGE_RATES = {
  ETH_TO_NGN: 3500000,
  BTC_TO_NGN: 45000000,
  USDT_TO_NGN: 1600,

  ETH_TO_USD: 2200,
  BTC_TO_USD: 28000,
  USDT_TO_USD: 1,

  ETH_TO_EUR: 2000,
  BTC_TO_EUR: 25500,
  USDT_TO_EUR: 0.92,
} as const;

/**
 * API Simulation Delays
 * Realistic delays for simulated API calls
 */
export const API_DELAYS = {
  exchangeRate: 300,      // 300ms for exchange rate calculation
  accountVerification: 600, // 600ms for account verification
  conversion: 800,        // 800ms for conversion process
} as const;
