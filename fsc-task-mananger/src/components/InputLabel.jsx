import React from 'react';

export default function InputLabel(props) {
  return (
    <label className="text-sm font-semibold text-[#35383E]" {...props}>
      {props.children}
    </label>
  );
}
