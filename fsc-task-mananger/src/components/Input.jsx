import React from 'react';

import InputLabel from './InputLabel';

export default function Input({ label, errorMessage, ...rest }) {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
