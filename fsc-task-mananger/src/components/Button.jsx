import React from 'react';

export default function Button({ children, variant = 'primary' }) {
  const getVariantClasses = () => {
    if (variant == 'primary') {
      return 'bg-[#00ADB5] text-white';
    }

    if (variant == 'secondary') {
      return 'bg-transparent text-[#818181]';
    }
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-4 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
}
