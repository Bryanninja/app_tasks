// TimeSelect.jsx
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

// Desestruture errorMessage do restante das props
const TimeSelect = forwardRef(({ errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        // Espalhe apenas as props restantes (sem errorMessage)
        {...rest}
        ref={ref}
      >
        <option value="" disabled>
          Escolha o Horário
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {/* Use errorMessage aqui, onde é relevante para a mensagem de erro */}
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
});

TimeSelect.displayName = 'TimeSelect';
TimeSelect.PropTypes = {
  errorMessage: PropTypes.string,
};

export default TimeSelect;
