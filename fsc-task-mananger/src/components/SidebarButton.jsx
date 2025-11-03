import React from 'react';

export default function SidebarButton({ children, variant = 'primary' }) {
  const getVariantClasses = () => {
    if (variant == 'unselected') {
      return 'text-[#35383e]';
    }

    if (variant == 'selected') {
      return 'bg-[#E6F7F8] text-[#00ADB5]';
    }
  };

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
}
