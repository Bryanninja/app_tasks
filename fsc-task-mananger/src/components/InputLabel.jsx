import PropTypes from 'prop-types';
import React from 'react';

export default function InputLabel(props) {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...props}>
      {props.children}
    </label>
  );
}

InputLabel.PropTypes = {
  children: PropTypes.node.isRequired,
};
