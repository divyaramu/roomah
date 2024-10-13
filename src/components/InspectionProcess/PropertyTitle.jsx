import React from 'react';

function PropertyTitle() {
  return (
    <div className="relative w-full">
      {/* Text for Bedroom 1 and the address */}
      <div className="relative z-10 flex flex-col items-start pl-10 mt-10">
        <h1 className="text-8xl text-left text-[#D9D9D9] max-md:max-w-full max-md:text-4xl">
          BEDROOM 1
        </h1>
        <h2 className="mt-4 text-3xl text-left text-[#79A0FF] max-md:mt-2 max-md:max-w-full">
          WEEKEND VILLA
        </h2>
      </div>

      {/* Gradient banner */}
      <div className="absolute top-0 left-0 w-screen h-[250px] bg-gradient-to-r from-[#052029] via-[#015172] to-[#79A0FF] z-0 max-md:top-8">
        {/* Full width gradient banner */}
      </div>
    </div>
  );
}

export default PropertyTitle;
