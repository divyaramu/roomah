import React from 'react';

// function InputField({ label, placeholder = '', className = '' }) {
//   return (
//     <div className={`mb-3 ${className}`}>
//       <label htmlFor={label.toLowerCase().replace(/\s/g, '-')} className="self-start text-xl text-black">
//         {label}
//       </label>
//       <input
//         type="text"
//         id={label.toLowerCase().replace(/\s/g, '-')}
//         placeholder={placeholder}  
//         className="flex shrink-0 mt-2 max-w-full rounded-3xl border border-black border-solid h-[40px] px-3 w-full"
//       />
//     </div>
//   );
// }

function InputField({ label, name, value, onChange, placeholder = '', className = '' }) {
  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={name} className="self-start text-xl text-black">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value} // Link value to the state
        onChange={onChange} // Handle input changes
        placeholder={placeholder}
        className="flex shrink-0 mt-2 max-w-full rounded-3xl border border-black border-solid h-[40px] px-3 w-full"
      />
    </div>
  );
}

export default InputField;
