import React from 'react';

export default function InputLabel(props) {
  return (
    <label className="text-brand-dark-blue text-sm font-semibold" {...props}>
      {props.children}
    </label>
  );
}
