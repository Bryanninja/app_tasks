import React from 'react';

import InputLabel from './InputLabel';

export default function TimeSelect(props) {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  );
}
