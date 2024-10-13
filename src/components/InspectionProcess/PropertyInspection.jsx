import React from 'react';
import PropertyTitle from './PropertyTitle';
import InspectionGrid from './InspectionGrid';

function PropertyInspection() {
  return (
    <div className="flex overflow-hidden flex-col pb-16 bg-zinc-100">
      <main className="relative flex flex-col w-full"> {/* Adjusted the layout */}
        <PropertyTitle />
        <div className="flex flex-col px-20 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <InspectionGrid />
        </div>
      </main>
    </div>
  );
}

export default PropertyInspection;