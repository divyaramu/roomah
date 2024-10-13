import React from 'react';

function YesNoSelect({ label, name, value, onChange }) {
  const id = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="w-full">
      <label htmlFor={id} className="self-start text-xl text-black">{label}</label>
      <div className="flex overflow-hidden gap-5 justify-between py-4 px-6 mt-4 text-base text-center rounded-3xl border border-black border-solid text-zinc-400">
        <div className="relative w-full flex items-center">
          <select
            id={id}
            name={name} // Link the select field to the form state
            value={value} // Control the value from parent
            onChange={onChange}
            className="bg-transparent appearance-none w-full cursor-pointer"
          >
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/80186d5d4926e70bcab3ece4299370e603c7bc0fe32d364cfaa15e7c0780c492?placeholderIfAbsent=true&apiKey=e9d05e023b1f48188dc40737b45bf129"
            alt="dropdown arrow"
            className="absolute right-0 object-contain shrink-0 w-10 aspect-square pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

export default YesNoSelect;
