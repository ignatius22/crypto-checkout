/**
 * Custom Hooks for Form Validation
 *
 * This module provides reusable form validation hooks that can be used
 * across different forms in the application. Each hook manages its own
 * validation state and provides methods to validate and clear errors.
 */

import { useState, useCallback } from 'react';
import { VALIDATION } from '../constants/design-tokens';

/**
 * Generic error state type for form validation
 */
export type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Hook for validating checkout form (wallet selection)
 *
 * @returns Validation state and methods
 *
 * @example
 * ```tsx
 * const { errors, validateCheckout, clearError } = useCheckoutValidation();
 *
 * const isValid = validateCheckout(payFrom, payTo);
 * if (!isValid) {
 *   // Show errors
 * }
 * ```
 */
export function useCheckoutValidation() {
  const [errors, setErrors] = useState<{
    payFrom?: string;
    payTo?: string;
  }>({});

  /**
   * Validates wallet selection fields
   */
  const validateCheckout = useCallback((payFrom: string, payTo: string): boolean => {
    const newErrors: typeof errors = {};

    if (!payFrom) {
      newErrors.payFrom = 'Please select a wallet to pay from';
    }
    if (!payTo) {
      newErrors.payTo = 'Please select a wallet to pay to';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  /**
   * Clears a specific field error
   */
  const clearError = useCallback((field: 'payFrom' | 'payTo') => {
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  /**
   * Clears all errors
   */
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateCheckout,
    clearError,
    clearAllErrors,
  };
}

/**
 * Hook for validating bank details form
 *
 * @returns Validation state and methods
 *
 * @example
 * ```tsx
 * const { errors, validateBankDetails, clearError } = useBankValidation();
 *
 * const isValid = validateBankDetails(selectedBank, accountNumber);
 * ```
 */
export function useBankValidation() {
  const [errors, setErrors] = useState<{
    bank?: string;
    accountNumber?: string;
  }>({});

  /**
   * Validates bank selection and account number
   */
  const validateBankDetails = useCallback((
    selectedBank: string,
    accountNumber: string
  ): boolean => {
    const newErrors: typeof errors = {};

    if (!selectedBank) {
      newErrors.bank = 'Please select a bank';
    }

    if (!accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (accountNumber.length < VALIDATION.accountNumber.minLength) {
      newErrors.accountNumber = `Account number must be at least ${VALIDATION.accountNumber.minLength} digits`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  /**
   * Clears a specific field error
   */
  const clearError = useCallback((field: 'bank' | 'accountNumber') => {
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  /**
   * Clears all errors
   */
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateBankDetails,
    clearError,
    clearAllErrors,
  };
}

/**
 * Hook for validating email and phone form
 *
 * @returns Validation state and methods
 *
 * @example
 * ```tsx
 * const { errors, validateContact, clearError } = useContactValidation();
 *
 * const isValid = validateContact(email, phoneNumber);
 * ```
 */
export function useContactValidation() {
  const [errors, setErrors] = useState<{
    email?: string;
    phoneNumber?: string;
  }>({});

  /**
   * Validates email format
   */
  const isValidEmail = useCallback((email: string): boolean => {
    return VALIDATION.email.pattern.test(email);
  }, []);

  /**
   * Validates email and phone number
   */
  const validateContact = useCallback((
    email: string,
    phoneNumber: string
  ): boolean => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (phoneNumber.length < VALIDATION.phone.minLength) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [isValidEmail]);

  /**
   * Clears a specific field error
   */
  const clearError = useCallback((field: 'email' | 'phoneNumber') => {
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  /**
   * Clears all errors
   */
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateContact,
    clearError,
    clearAllErrors,
  };
}

/**
 * Hook for managing async loading states
 *
 * Useful for managing loading states during API calls or async operations
 *
 * @returns Loading state and control methods
 *
 * @example
 * ```tsx
 * const { isLoading, startLoading, stopLoading } = useLoadingState();
 *
 * const handleSubmit = async () => {
 *   startLoading();
 *   await submitForm();
 *   stopLoading();
 * };
 * ```
 */
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggleLoading = useCallback(() => {
    setIsLoading(prev => !prev);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    setIsLoading,
  };
}
