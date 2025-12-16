"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import Tabs from "./components/Tabs";
import ValueCard from "./components/ValueCard";
import Select from "./components/Select";
import { useTransactionOptions } from "./hooks/useTransactionOptions";

export default function Home() {
  const router = useRouter();
  const { tabs, payCurrencyOptions, receiveCurrencyOptions, walletOptions } = useTransactionOptions();

  const [activeTab, setActiveTab] = useState("Crypto to cash");
  const [isConverting, setIsConverting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<{ payFrom?: string; payTo?: string }>({});
  const [payFrom, setPayFrom] = useState("");
  const [payTo, setPayTo] = useState("");
  const [payCurrency, setPayCurrency] = useState("ETH");
  const [receiveCurrency, setReceiveCurrency] = useState("NGN");
  const [payValue, setPayValue] = useState("1.00");
  const [receiveValue, setReceiveValue] = useState("1.00");

  const handlePayValueChange = (newValue: string) => {
    setPayValue(newValue);
    setIsCalculating(true);
    setTimeout(() => {
      const calculatedValue = (parseFloat(newValue || "0") * 3500).toFixed(2);
      setReceiveValue(calculatedValue);
      setIsCalculating(false);
    }, 300);
  };

  const handleReceiveValueChange = (newValue: string) => {
    setReceiveValue(newValue);
    setIsCalculating(true);
    setTimeout(() => {
      const calculatedValue = (parseFloat(newValue || "0") / 3500).toFixed(4);
      setPayValue(calculatedValue);
      setIsCalculating(false);
    }, 300);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!payFrom) newErrors.payFrom = "Please select a wallet to pay from";
    if (!payTo) newErrors.payTo = "Please select a wallet to pay to";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConvert = () => {
    if (!validateForm()) return;
    setIsConverting(true);
    setTimeout(() => {
      router.push("/recipient-details");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 md:p-8">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mb-6 transition-opacity duration-200" style={{ opacity: isCalculating ? 0.7 : 1 }}>
            <ValueCard
              title="You pay"
              value={payValue}
              currencyOptions={payCurrencyOptions}
              selectedCurrency={payCurrency}
              onCurrencyChange={setPayCurrency}
              onValueChange={handlePayValueChange}
              editable
            />
          </div>

          {isCalculating && (
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Calculating exchange rate...
              </div>
            </div>
          )}

          <div className="mb-6 transition-opacity duration-200" style={{ opacity: isCalculating ? 0.7 : 1 }}>
            <ValueCard
              title="You receive"
              value={receiveValue}
              currencyOptions={receiveCurrencyOptions}
              selectedCurrency={receiveCurrency}
              onCurrencyChange={setReceiveCurrency}
              onValueChange={handleReceiveValueChange}
              editable
            />
          </div>

          <div className="mb-6">
            <Select
              label="Pay from"
              options={walletOptions}
              defaultValue=""
              onChange={(val) => {
                setPayFrom(val);
                setErrors({ ...errors, payFrom: undefined });
              }}
            />
            {errors.payFrom && <p className="mt-1 text-sm text-red-600" role="alert">{errors.payFrom}</p>}
          </div>

          <div className="mb-8">
            <Select
              label="Pay to"
              options={walletOptions}
              defaultValue=""
              onChange={(val) => {
                setPayTo(val);
                setErrors({ ...errors, payTo: undefined });
              }}
            />
            {errors.payTo && <p className="mt-1 text-sm text-red-600" role="alert">{errors.payTo}</p>}
          </div>

          <Button
            title={isConverting ? "Processing..." : "Convert now"}
            width="w-full"
            height="h-14"
            borderRadius="rounded-full"
            bgColor="bg-[#134E4A]"
            textColor="text-white"
            onClick={handleConvert}
            loading={isConverting}
            disabled={isConverting}
          />
        </div>
      </div>
    </main>
  );
}
