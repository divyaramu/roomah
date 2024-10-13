import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Import Firebase Firestore
import { doc, getDoc } from 'firebase/firestore';
import InspectionGrid from './InspectionProcess/InspectionGrid';

function PropertyDetails() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // State to hold property data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log('Fetching property with ID:', id);
        // Reference to the specific document (property) in Firestore
        const propertyDoc = await getDoc(doc(db, 'properties', id));
        if (propertyDoc.exists()) {
          console.log('Property data:', propertyDoc.data()); // Log the fetched data
          setProperty(propertyDoc.data()); // Set the property data if it exists
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProperty();
  }, [id]); // Re-run the effect when the `id` changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  if (!property) {
    return <div>Property not found</div>; // Show if no property data is available
  }

  // Function to generate a grid based on number of bedrooms and bathrooms
  const renderGrid = (label, count) => {
    const grids = [];
    for (let i = 0; i < count; i++) {
      grids.push(
        <div key={`${label}-${i}`} className="bg-gray-200 rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-bold">{label} {i + 1}</h3>
        </div>
      );
    }
    return grids;
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">{property.propertyName}</h1>
      <p className="text-lg mb-4">Address: {property.addressLine1}, {property.city}, {property.state}, {property.zipCode}</p>

      <div className="grid grid-cols-2 gap-4">
        <p># of Floors: {property.floors}</p>
        <p># of Bedrooms: {property.bedrooms}</p>
        <p># of Bathrooms: {property.bathrooms}</p>
        <p># of Public Spaces: {property.publicSpaces}</p>
        <p># of Kitchens: {property.kitchens}</p>
        {/* <p># of Service Areas: {property.serviceAreas}</p> */}
        <p>Garage: {property.garage}</p>
        <p>Fireplace: {property.fireplace}</p>
      </div>

      {/* Property Image */}
      {property.image && (
        <div className="mt-8">
          <img
            src={property.image}
            alt={property.propertyName}
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Dynamic Grids for Bedrooms and Bathrooms */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Bedrooms and Bathrooms</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderGrid('Bedroom', Number(property.bedrooms))}
          {renderGrid('Bathroom', Number(property.bathrooms))}
        </div>
      </div>

      {/* Inspection Grid */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Inspection Items</h2>
        {/* Pass the propertyId (which is id from the URL) to InspectionGrid */}
        <InspectionGrid propertyId={id} />
      </div>
    </div>
    
  );
}

export default PropertyDetails;
