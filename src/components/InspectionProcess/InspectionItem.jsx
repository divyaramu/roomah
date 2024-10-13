import React from 'react';

function InspectionItem({ title, description, imageSrc, onClick }) {
  return (
    <article className="relative flex flex-col items-center bg-zinc-300 rounded-lg w-full aspect-square max-w-[350px] p-6 hover:bg-zinc-400 transition-colors duration-200">
      {/* Delete button - positioned inside the box */}
      <button
        onClick={onClick}
        className="absolute top-2 right-2 text-[#FF663D] hover:text-[#FF663D] z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          loading="lazy"
          src={imageSrc}
          alt={title}
          className="object-contain w-full h-48"
        />
      </div>
      {/* Title and Description */}
      <h3 className="mt-4 text-2xl text-black">{title}</h3>
      <p className="text-lg text-indigo-400">{description}</p>
    </article>
  );
}

export default InspectionItem;