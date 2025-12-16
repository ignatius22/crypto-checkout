/**
 * Checkout Page Configuration
 *
 * Centralized configuration for currency options, wallet providers,
 * and tab navigation. Extracted for reusability and maintainability.
 */

import { FaBitcoin, FaEthereum } from "react-icons/fa";
import type { CryptoCurrency, FiatCurrency } from "../lib/utils";

/**
 * Tab options for conversion types
 */
export const CHECKOUT_TABS = [
  "Crypto to cash",
  "Cash to crypto",
  "Crypto to fiat loan"
] as const;

/**
 * Cryptocurrency options with icons and metadata
 */
export const CRYPTO_CURRENCY_OPTIONS = [
  {
    label: "ETH" as CryptoCurrency,
    icon: <FaEthereum className="text-gray-700" />,
    name: "Ethereum"
  },
  {
    label: "BTC" as CryptoCurrency,
    icon: <FaBitcoin className="text-orange-500" />,
    name: "Bitcoin"
  },
  {
    label: "USDT" as CryptoCurrency,
    icon: <span className="text-green-500">₮</span>,
    name: "Tether"
  },
] as const;

/**
 * Fiat currency options with country flags
 */
export const FIAT_CURRENCY_OPTIONS = [
  {
    label: "NGN" as FiatCurrency,
    icon: <span className="text-lg">🇳🇬</span>,
    name: "Nigerian Naira"
  },
  {
    label: "USD" as FiatCurrency,
    icon: <span className="text-lg">🇺🇸</span>,
    name: "US Dollar"
  },
  {
    label: "EUR" as FiatCurrency,
    icon: <span className="text-lg">🇪🇺</span>,
    name: "Euro"
  },
] as const;

/**
 * Supported wallet providers
 */
export const WALLET_OPTIONS = [
  {
    label: "Metamask",
    icon: <span>🦊</span>,
    description: "Browser extension wallet"
  },
  {
    label: "Rainbow",
    icon: <span>🌈</span>,
    description: "Mobile-first wallet"
  },
  {
    label: "WalletConnect",
    icon: <span>🔗</span>,
    description: "Multi-wallet connection"
  },
  {
    label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    icon: <span>💼</span>,
    description: "Exchange wallets"
  },
] as const;

/**
 * Default currency pair for new sessions
 */
export const DEFAULT_CURRENCIES = {
  crypto: "ETH" as CryptoCurrency,
  fiat: "NGN" as FiatCurrency,
} as const;

/**
 * Default values for initial calculation
 */
export const DEFAULT_VALUES = {
  pay: "1.00",
  // Note: receive value will be calculated on mount
} as const;
