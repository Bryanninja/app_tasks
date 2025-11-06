import React from 'react';

export default function InputErrorMessage({ children }) {
  return <p className="text-left text-xs text-red-400">{children}</p>;
}
