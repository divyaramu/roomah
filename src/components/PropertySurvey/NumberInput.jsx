import React from 'react';

function NumberInput({ label, name, value, onChange, placeholder, min = 0, max = 20 }) {
  const id = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="mb-3">
      <label htmlFor={id} className="self-start text-xl text-black">{label}</label>
      <input
        type="number"
        id={id}
        name={name} // Pass name to link to the form state
        value={value} // Control value from parent
        onChange={(e) => onChange(name, e.target.value)} // Pass change event to parent
        placeholder={placeholder}
        min={min}
        max={max}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
      />
    </div>
  );
}

export default NumberInput;