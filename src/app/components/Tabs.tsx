/**
 * Tabs Component
 *
 * A responsive tab navigation component with horizontal scrolling on mobile.
 * Provides smooth transitions and clear visual feedback for the active tab.
 *
 * @component
 * @example
 * ```tsx
 * const tabs = ["Crypto to cash", "Cash to crypto", "Crypto to fiat loan"];
 *
 * <Tabs
 *   tabs={tabs}
 *   activeTab={selectedTab}
 *   onTabChange={setSelectedTab}
 * />
 * ```
 */

import React, { memo } from "react";

interface TabProps {
  /** Array of tab labels to display */
  tabs: string[];
  /** Currently active tab label */
  activeTab: string;
  /** Callback fired when a tab is clicked */
  onTabChange: (tab: string) => void;
}

/**
 * Enhanced Tabs component with responsive behavior
 *
 * Features:
 * - Horizontal scrolling on mobile (< 640px)
 * - Centered layout on desktop
 * - Smooth transitions between tabs
 * - Touch-friendly tap targets
 * - Active state with background color
 * - Hover states for inactive tabs
 * - Prevents text wrapping (whitespace-nowrap)
 * - Memoized for performance
 */
const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex mb-6 sm:mb-8 bg-gray-100 rounded-full p-1 w-full sm:w-fit mx-auto overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          aria-current={activeTab === tab ? "page" : undefined}
          className={`
            px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium
            transition-all duration-200
            whitespace-nowrap shrink-0
            ${
              activeTab === tab
                ? "bg-[#134E4A] text-white rounded-full"
                : "text-gray-400 hover:text-gray-500"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Memoize to prevent re-renders unless tabs, activeTab, or onTabChange changes
export default memo(Tabs);
