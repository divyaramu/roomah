import React from 'react';
import { Link } from 'react-router-dom';

function PropertyCard({ id, title, imageSrc }) {
  return (
    <article className="w-[400px] h-[400px] bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <Link to={`/property/${id}`}>
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="h-3/4 w-full overflow-hidden">
            <img 
              loading="lazy" 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Title and Icon Section */}
          <div className="flex justify-between items-center bg-gray-900 bg-opacity-60 text-white p-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a78e4eca062d5f970f3efc408e5510898c565f2fdc26bf03d15ec8cb4a89e5c?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" 
              alt="" 
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PropertyCard;