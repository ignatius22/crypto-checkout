import { ReactNode } from "react";

export interface ButtonProps {
  title: string;
  width?: string;
  height?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export interface SelectOption {
  label: string;
  icon?: ReactNode;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
  className?: string;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface PhoneInputProps {
  label: string;
  countries: Country[];
  selectedCountry?: Country;
  number?: string;
  onChangeCountry?: (country: Country) => void;
  onChangeNumber?: (value: string) => void;
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
}