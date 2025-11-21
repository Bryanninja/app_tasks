import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { tv } from 'tailwind-variants';

export default function SidebarButton({ children, to }) {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? 'selected' : 'unselected' })
      }
    >
      {children}
    </NavLink>
  );
}

SidebarButton.PropTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
};
