import React from 'react';
import NumberInput from './NumberInput';

function NumberInputGroup({ inputs, formData, onInputChange }) {
  return (
    <div className="flex flex-col w-full">
      {inputs.map((input, index) => (
        <NumberInput
          key={index}
          label={input.label}
          name={input.name}
          value={formData[input.name]} // Link form data
          onChange={onInputChange} // Handle input change
          placeholder={input.placeholder}
        />
      ))}
    </div>
  );
}

export default NumberInputGroup;
