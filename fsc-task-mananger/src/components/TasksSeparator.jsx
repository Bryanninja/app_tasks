import React from 'react';
import PropTypes from 'prop-types';

export default function TasksSeparator({ title, icon }) {
  return (
    <div className="border-brand-border flex gap-2 border-b border-solid pb-1">
      {icon}
      <p className="text-brand-text-gray text-sm">{title}</p>
    </div>
  );
}

TasksSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
