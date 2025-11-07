import React from 'react';

export default function SidebarButton({ children, variant = 'primary' }) {
  const getVariantClasses = () => {
    if (variant == 'unselected') {
      return 'text-brand-dark-blue';
    }

    if (variant == 'selected') {
      return 'bg-brand-primary bg-opacity-10 text-brand-primary';
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
