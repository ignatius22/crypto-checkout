import { FaEthereum, FaBitcoin } from "react-icons/fa";
import { useState } from "react";

export function useTransactionOptions() {
  const [tabs] = useState(["Crypto to cash", "Cash to crypto", "Crypto to fiat loan"]);

  const [payCurrencyOptions] = useState([
    { label: "ETH", icon: <FaEthereum className="text-gray-700" /> },
    { label: "BTC", icon: <FaBitcoin className="text-orange-500" /> },
    { label: "USDT", icon: <span className="text-green-500">₮</span> },
  ]);

  const [receiveCurrencyOptions] = useState([
    { label: "NGN", icon: <span className="text-lg">🇳🇬</span> },
    { label: "USD", icon: <span className="text-lg">🇺🇸</span> },
    { label: "EUR", icon: <span className="text-lg">🇪🇺</span> },
  ]);

  const [walletOptions] = useState([
    { label: "Metamask", icon: <span>🦊</span> },
    { label: "Rainbow", icon: <span>🌈</span> },
    { label: "WalletConnect", icon: <span>🔗</span> },
    {
      label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
      icon: <span>💼</span>,
    },
  ]);

  return {
    tabs,
    payCurrencyOptions,
    receiveCurrencyOptions,
    walletOptions,
  };
}
