import React, { useState } from 'react';
import { db } from '../../firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';
import InputField from './InputField';
import NumberInputGroup from './NumberInputGroup';
import YesNoSelect from './YesNoSelect';

function AddProperty({ closeModal }) {
  // Define form state
  const [formData, setFormData] = useState({
    propertyName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    floors: '',
    publicSpaces: '',
    bedrooms: '',
    bathrooms: '',
    kitchens: '',
    garage: 'NO',
    fireplace: 'NO',
  });

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Ensure we destructure name and value
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the property data to Firestore
      const docRef = await addDoc(collection(db, "properties"), formData);
      const newDocId = docRef.id; // This is the generated document ID
      console.log("Document ID: ", newDocId);

      alert('Property added successfully!');
      closeModal(); // Close the modal after submission
    } catch (err) {
      console.error("Error adding property: ", err);
    }
  };

  const publicSpaceInputs = [
    { label: '# of Floors', placeholder: '', name: 'floors' },
    { label: '# of Public Space', placeholder: 'e.g. living room, garden', name: 'publicSpaces' },
  ];

  const bedroomInputs = [
    { label: '# of Bedrooms', placeholder: '', name: 'bedrooms' },
    { label: '# of Bathrooms', placeholder: '', name: 'bathrooms' },
    { label: '# of Kitchens', placeholder: '', name: 'kitchens' },
  ];

  const stateOptions = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <main className="bg-white p-10 rounded-lg shadow-lg max-w-[1000px] max-h-[88vh] overflow-auto">
        <h1 className="text-6xl text-center tracking-wider mb-10 mt-0">ADD PROPERTY</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Property Name"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleInputChange}
          />

          <InputField
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
          />

          <InputField
            label="Address Line 2 (Optional)"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
          />

          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />

          <div className="mb-3">
            <label htmlFor="state" className="self-start text-xl text-black">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="flex shrink-0 max-w-full rounded-3xl border border-black h-[40px] pl-3 pr-10 w-full text-xl appearance-none"
            >
              {stateOptions.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <InputField
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
          />


          {/* Use NumberInputGroup for Public Space Inputs */}
          <section className="mt-8">
            <NumberInputGroup
              inputs={publicSpaceInputs}
              formData={formData}
              onInputChange={handleNumberInputChange}
            />
          </section>

          {/* Use NumberInputGroup for Bedroom and Bathroom Inputs */}
          <section className="mt-8">
            <NumberInputGroup
              inputs={bedroomInputs}
              formData={formData}
              onInputChange={handleNumberInputChange}
            />
          </section>

          <section className="mt-2">
            <div className="flex gap-x-5 w-full">
              <YesNoSelect
                label="Garage?"
                name="garage"
                value={formData.garage}
                onChange={handleInputChange}
              />
              <YesNoSelect
                label="Fireplace?"
                name="fireplace"
                value={formData.fireplace}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <div className="flex justify-between mt-8">
            <button type="submit" className="px-6 py-3 bg-indigo-500 text-white rounded-full">ADD PROPERTY</button>
            <button type="button" onClick={closeModal} className="px-6 py-3 bg-[#FF663D] text-white rounded-full">CLOSE</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddProperty;