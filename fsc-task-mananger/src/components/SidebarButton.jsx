import PropTypes from 'prop-types';
import React from 'react';
import { tv } from 'tailwind-variants';

export default function SidebarButton({ children, color }) {
  const sidebar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        selected: 'bg-brand-primary bg-opacity-10 text-brand-primary',
        unselected: 'text-brand-dark-blue',
      },
    },
  });

  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  );
}

SidebarButton.PropTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
};
