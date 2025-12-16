"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Select from "../components/Select";
import TextInput from "../components/TextInput";
import PhoneInput from "../components/Input";
import { countries } from "../data";


export default function RecipientDetails() {
  const router = useRouter();
  const [formType, setFormType] = useState<"bank" | "email">("bank");

  // Bank form state
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("ODUTUGA GBEKE");

  // Email form state
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{
    bank?: string;
    accountNumber?: string;
    email?: string;
    phoneNumber?: string;
  }>({});

  // Simulate account verification when account number is entered
  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    setErrors({ ...errors, accountNumber: undefined });

    // Simulate API call to verify account number
    if (value.length === 10) {
      setIsVerifying(true);
      setAccountName(""); // Clear previous name
      setTimeout(() => {
        setAccountName("ODUTUGA GBEKE"); // Simulated fetched name
        setIsVerifying(false);
      }, 600);
    } else {
      setAccountName("");
    }
  };

  const bankOptions = [
    { label: "Access Bank", icon: <span>🏦</span> },
    { label: "GTBank", icon: <span>🏦</span> },
    { label: "First Bank", icon: <span>🏦</span> },
    { label: "UBA", icon: <span>🏦</span> },
    { label: "Zenith Bank", icon: <span>🏦</span> },
  ];

  const validateBankForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!selectedBank) {
      newErrors.bank = "Please select a bank";
    }
    if (!accountNumber) {
      newErrors.accountNumber = "Account number is required";
    } else if (accountNumber.length < 10) {
      newErrors.accountNumber = "Account number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmailForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (phoneNumber.length < 7) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (formType === "bank") {
      if (validateBankForm()) {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
          setFormType("email");
          setErrors({}); // Clear errors when moving to next step
          setIsProcessing(false);
        }, 500);
      }
    } else {
      if (validateEmailForm()) {
        setIsProcessing(true);
        // Simulate form submission
        setTimeout(() => {
          router.push("/payment");
        }, 800);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto w-full">
       
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center mb-6 sm:mb-8">
            <button
              onClick={() => {
                if (formType === "email") {
                  setFormType("bank");
                } else {
                  router.back();
                }
              }}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Recipient details
            </h1>
          </div>

          {/* Form Type Toggle (Hidden - you can add tabs here if needed) */}
          <div className="space-y-6">
            {formType === "bank" ? (
              <>
                {/* Bank Selector */}
                <Select
                  label="Bank"
                  options={bankOptions}
                  defaultValue=""
                  onChange={(val) => {
                    setSelectedBank(val);
                    setErrors({ ...errors, bank: undefined });
                  }}
                />
                {errors.bank && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.bank}
                  </p>
                )}

                {/* Account Number Input */}
                <div>
                  <TextInput
                    label="Account number"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    error={errors.accountNumber}
                    required
                  />
                  {isVerifying && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Verifying account...
                    </div>
                  )}
                </div>

                {/* Account Name (Disabled/Read-only) */}
                <div className="relative">
                  <TextInput
                    label="Account name"
                    placeholder={isVerifying ? "Fetching..." : accountName ? "" : "Will appear after verification"}
                    value={accountName}
                    onChange={setAccountName}
                    disabled
                  />
                  {accountName && !isVerifying && (
                    <div className="absolute right-4 top-[42px] text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Recipient Email */}
                <TextInput
                  label="Recipient email"
                  placeholder="Enter recipient email"
                  value={email}
                  onChange={(value) => {
                    setEmail(value);
                    setErrors({ ...errors, email: undefined });
                  }}
                  type="email"
                  error={errors.email}
                  required
                />

                {/* Phone Number */}
                <div>
                  <PhoneInput
                    label="Recipient phone number"
                    countries={countries}
                    selectedCountry={country}
                    number={phoneNumber}
                    onChangeCountry={setCountry}
                    onChangeNumber={(value) => {
                      setPhoneNumber(value);
                      setErrors({ ...errors, phoneNumber: undefined });
                    }}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Next Button */}
          <div className="mt-8">
            <Button
              title={isProcessing ? "Processing..." : "Next"}
              width="w-full"
              height="h-14"
              borderRadius="rounded-full"
              bgColor="bg-[#134E4A]"
              textColor="text-white"
              onClick={handleNext}
              loading={isProcessing}
              disabled={isProcessing || (formType === "bank" && isVerifying)}
              ariaLabel={formType === "bank" ? "Proceed to email form" : "Submit recipient details"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
