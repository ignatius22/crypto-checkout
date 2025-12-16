# Crypto Checkout Widget

A responsive, accessible crypto payment checkout experience built with Next.js and TypeScript. This widget can be embedded on any website to facilitate crypto-to-fiat conversions.

## Project Overview

This project demonstrates a production-ready frontend implementation of a crypto checkout flow, similar to Stripe Checkout but for cryptocurrency payments. The implementation follows industry best practices for UI accuracy, component structure, state handling, and code quality.

## Features Implemented

### Pages Submitted (2 as requested)
1. **Home/Checkout Page** - Currency selection and payment details with advanced state management
2. **Recipient Details Page** - Multi-step form with comprehensive validation and error handling

### Technical Requirements Met

#### Framework & Language
- **Next.js 14** with App Router
- **TypeScript** throughout entire codebase
- Type-safe component props with dedicated `types/checkout.ts`

#### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Breakpoints**:
  - `sm:` (640px+) - Tablet and up
  - `md:` (768px+) - Desktop
  - `lg:` (1024px+) - Large desktop
- **Adaptive spacing**:
  - Padding: `p-4 sm:p-6 md:p-8`
  - Margins: `py-4 sm:py-8`
- **Responsive typography**:
  - Headers: `text-lg sm:text-xl`
  - Values: `text-2xl sm:text-3xl md:text-4xl`
  - Tabs: `text-xs sm:text-sm`
- **Touch-friendly sizes**:
  - Buttons: `h-14` (56px minimum)
  - Touch targets: 44px+ on mobile
- **Flexible layouts**:
  - Tabs scroll horizontally on mobile
  - Full-width containers on mobile → centered on desktop
  - Consistent `max-w-xl mx-auto` centering

#### Clean Component Structure
Reusable, well-organized components:
- `Button` - Enhanced with loading states, disabled states, and accessibility
- `TextInput` - With validation, error states, and required field indicators
- `Select` - Custom dropdown with icons
- `PhoneInput` - International phone number input with country selector
- `ValueCard` - Currency value display with dropdown selector
- `Tabs` - Tab navigation component

#### Form State Handling
- React `useState` for local state management
- Form validation with error messages
- Multi-step form logic (bank → email in recipient details)
- Proper state reset on navigation

#### Accessibility Practices
- Semantic HTML elements (`<label>`, `<button>`, `<input>`)
- ARIA attributes: `aria-label`, `aria-invalid`, `aria-describedby`, `aria-busy`
- Keyboard navigation support
- Focus states with `focus:ring-2`
- Required field indicators with `*`
- Error messages with `role="alert"`
- Proper label-input associations with `htmlFor` and `id`

### Bonus Features Implemented

#### Reusable Components
All components accept customizable props:
- Width, height, padding, border radius, colors
- Consistent API across similar components
- TypeScript interfaces for type safety

#### Form Validation
Comprehensive validation on Recipient Details page:
- **Bank Form**: Required bank selection, account number validation (min 10 digits)
- **Email Form**: Email format validation, phone number validation
- Real-time error display with red borders and error messages
- Validation runs before allowing navigation to next step

#### Loading & Error States
- **Button Component**:
  - Loading spinner animation
  - Disabled state during loading
  - `aria-busy` for screen readers
- **TextInput Component**:
  - Error state with red border
  - Error message display
  - `aria-invalid` for accessibility

#### Thoughtful Folder Structure
```
src/app/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Button with loading states
│   ├── TextInput.tsx    # Text input with validation
│   ├── Select.tsx       # Dropdown selector
│   ├── Input.tsx        # Phone input component
│   ├── ValueCard.tsx    # Currency value card
│   └── Tabs.tsx         # Tab navigation
├── types/
│   └── checkout.ts      # TypeScript interfaces
├── page.tsx             # Home/Checkout page
└── recipient-details/
    └── page.tsx         # Recipient details form
```

## Design System

### Colors
- Primary: `#134E4A` (Dark teal for buttons and active states)
- Background: `#F5F5F0` (Warm off-white)
- Card: `#FFFFFF` (White for main content)
- Success: `#16A34A` (Green for confirmations)
- Error: `#EF4444` (Red for validation errors)

### Border Radius
- Inputs/Buttons: `rounded-full` (fully rounded pill shape)
- Cards: `rounded-3xl` (large rounded corners)
- Dropdowns: `rounded-md` (subtle curve)

### Typography
- Headings: `text-xl font-semibold`
- Labels: `text-sm font-medium`
- Body: `text-gray-900`
- Placeholders: `text-gray-400`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
# or
yarn build
```

## User Flow

1. **Home/Checkout Page**
   - Select currency to pay (ETH, BTC, USDT)
   - Select currency to receive (NGN, USD, EUR)
   - Real-time exchange rate calculation
   - Select "Pay from" and "Pay to" wallets
   - Click "Convert now" to proceed

2. **Recipient Details Page - Step 1 (Bank Details)**
   - Select bank from dropdown
   - Enter 10-digit account number
   - Account name auto-fetches with verification
   - Click "Next" to continue

3. **Recipient Details Page - Step 2 (Email/Phone)**
   - Enter recipient email with validation
   - Enter phone number with country selector
   - Click "Next" to submit

## Component Examples

### Button with Loading State
```tsx
<Button
  title="Submit"
  onClick={handleSubmit}
  loading={isSubmitting}
  disabled={!isValid}
  bgColor="bg-[#134E4A]"
  textColor="text-white"
/>
```

### TextInput with Validation
```tsx
<TextInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  type="email"
  error={errors.email}
  required
/>
```

### Phone Input
```tsx
<PhoneInput
  label="Phone number"
  countries={countries}
  selectedCountry={country}
  number={phoneNumber}
  onChangeCountry={setCountry}
  onChangeNumber={setPhoneNumber}
/>
```

## 📱 Responsive Design

All pages are fully responsive with mobile-first design:

### Breakpoint Strategy
- **Mobile (< 640px)**: Optimized for small screens
  - Full-width layouts
  - Compact spacing (`p-4`, `py-4`)
  - Smaller font sizes (`text-xs`, `text-2xl`)
  - Horizontal scrolling tabs

- **Tablet (640px+)**: Improved spacing
  - Medium padding (`p-6`, `py-8`)
  - Larger fonts (`text-sm`, `text-3xl`)
  - Better touch targets

- **Desktop (768px+)**: Maximum comfort
  - Generous padding (`p-8`)
  - Largest fonts (`text-4xl`)
  - Centered content with `max-w-xl mx-auto`

### Responsive Components
1. **Tabs**: Scroll horizontally on mobile, centered on desktop
2. **Value Cards**: Font sizes scale from `text-2xl` → `text-4xl`
3. **Currency Selectors**: Compact on mobile, spacious on desktop
4. **Main Container**: Full-width mobile → centered desktop
5. **All Inputs**: Touch-friendly minimum height (56px)

### Key Utilities
- `w-full sm:w-fit` - Full width mobile, auto desktop
- `text-2xl sm:text-3xl md:text-4xl` - Progressive font scaling
- `p-4 sm:p-6 md:p-8` - Progressive spacing
- `scrollbar-hide` - Clean horizontal scrolling
- `shrink-0` - Prevent flex item shrinking

## ♿ Accessibility Features

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **Screen Readers**: Proper ARIA labels and descriptions
3. **Focus Management**: Clear focus indicators with ring styles
4. **Error Handling**: Errors announced with `role="alert"`
5. **Labels**: All inputs have associated labels
6. **Color Contrast**: WCAG AA compliant color combinations

## 🎯 Code Quality

- **TypeScript**: Full type safety with interfaces
- **ESLint**: Code linting for consistency
- **Component Reusability**: DRY principles followed
- **Prop Drilling Avoidance**: Local state management where appropriate
- **Naming Conventions**: Clear, descriptive names
- **Comments**: Strategic comments for complex logic

## 📝 Assessment Requirements Checklist

### Technical Requirements
- [x] React.js/Next.js ✅
- [x] TypeScript ✅
- [x] Responsive design (desktop + mobile) ✅
- [x] Clean component structure ✅
- [x] Basic form state handling ✅
- [x] Reasonable accessibility practices ✅

### Functional Expectations
- [x] Components reflect design closely ✅
- [x] Forms capture input and manage state ✅
- [x] Buttons and interactions behave logically ✅
- [x] No backend required (mock data used) ✅

### Nice-to-Have (All Implemented!)
- [x] Reusable components ✅
- [x] Basic form validation ✅
- [x] Simple loading or error states ✅
- [x] Thoughtful folder structure ✅

## 🏆 Above and Beyond

### Page 1: Home/Checkout - Maximum Polish
- ✨ **Real-time exchange rate calculation** with animations
- ✨ **Bidirectional currency conversion** (update either field)
- ✨ **Form validation** with real-time error clearing
- ✨ **Loading states** during processing with spinner
- ✨ **Calculating indicator** shows when fetching exchange rates
- ✨ **Opacity transitions** on value cards during calculations
- ✨ **Smart validation** prevents submission without wallet selection

### Page 2: Recipient Details - Maximum Polish
- ✨ **Live account verification** (simulated API call)
- ✨ **Multi-step form** with smooth transitions (Bank → Email)
- ✨ **Account name auto-fetch** with success indicator
- ✨ **Comprehensive validation** for both steps
- ✨ **Smart button states** (disabled during verification)
- ✨ **Progressive error clearing** as user types
- ✨ **Green checkmark** on successful account verification
- ✨ **Loading states** between step transitions

### Additional Excellence
- **Click-outside detection** for all dropdowns
- **Auto-generated input IDs** for accessibility
- **Comprehensive TypeScript types** throughout
- **Visual feedback** for all interactions
- **Micro-interactions** on hover, focus, active states
- **ARIA attributes** for screen readers
- **Error announcements** with role="alert"
- **Disabled states** prevent double-submission


## 📦 Dependencies

```json
{
  "next": "^14.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "react-icons": "^4.x"
}
```


Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
