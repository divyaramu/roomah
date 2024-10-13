import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import AddProperty from './PropertySurvey/AddProperty';
// import PropertyForm from './PropertyForm/PropertyForm';
import { db } from '../firebase'; // Import Firebase
import { collection, getDocs } from 'firebase/firestore';

function Properties() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [properties, setProperties] = useState([]); // State for fetched properties

  // Fetch properties from Firestore when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertyList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertyList);
    };

    fetchProperties();
  }, []);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh the properties list after closing the modal
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertyList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertyList);
    };
    fetchProperties();
  };

  return (
    <div className="flex overflow-hidden flex-col bg-zinc-100 pb-[544px] max-md:pb-24">
      <main className="flex overflow-hidden flex-col w-full text-center bg-zinc-100 max-md:max-w-full">
        <section className="flex relative flex-col w-full min-h-[688px] max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae6519b1674674303729182f00b6b5ba286cefab7e5c08f30096da46d7de9e0c?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex overflow-hidden relative flex-col px-20 py-14 w-full bg-slate-900 bg-opacity-40 max-md:px-5 max-md:max-w-full">
            <h1 className="self-start text-8xl text-zinc-300 max-md:max-w-full max-md:text-4xl">
              MY PROPERTIES
            </h1>
            <button
              onClick={openModal} // Open the modal on button click
              className="flex gap-5 justify-between self-end py-2 pr-2 pl-10 mt-96 max-w-full text-xl text-black bg-zinc-300 rounded-[50px] w-[394px] max-md:pl-5 max-md:mt-10"
            >
              <span className="my-auto">ADD PROPERTY</span>
              <div className="flex shrink-0 bg-indigo-400 rounded-full h-[65px] w-[65px]" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Section to display hardcoded and Firebase properties */}
        <section className="self-center mt-14 w-full max-w-[1369px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {/* Hardcoded Properties */}
            <PropertyCard
              title="WEEKEND VILLA"
              imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/00472656883610648b0325885e4e0afc52add6c6e61e7bd7e295d53bd47308f3?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
            />
            <PropertyCard
              title="FAMILY HOUSE"
              imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/1ead9d0af8c81c98c2a6e35bdac942d29ea6bf222cab80258109cc2cead4692d?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
            />

            {/* Dynamically fetched properties from Firebase */}
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                title={property.propertyName}
                imageSrc={property.image || 'https://via.placeholder.com/400'} // Default image if none is provided
              />
            ))}
          </div>
        </section>
      </main>

      {/* Add Property Modal */}
      {isModalOpen && <AddProperty closeModal={closeModal} />} {/* Conditional rendering for the modal */}
    </div>
  );
}

export default Properties;
