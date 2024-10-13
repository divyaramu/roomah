import React, { useState } from 'react';
import { storage, db } from '../../firebase'; // Import Firestore and Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions
import InspectionItem from './InspectionItem';
import Modal from 'react-modal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import X and plus icons

const initialInspectionItems = [
    { id: 1, title: "Re-Roof", description: "Roof, windows, doors, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a207e6b93c1d19dad8e11c149315ca4544c225a3f030eb6772ea1c3af42ecc04?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 2, title: "Insulation", description: "Roof, windows, doors, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f48cdc5364231e341c189434838cedd6deda1dc46c24001a70db7a526f2ba2e5?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 3, title: "Plumbing", description: "Roof, windows, doors, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/779eb080af4ac267e00fe2f2455ef4be068d8756446ca5f6ad4b29759ef294ee?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 4, title: "Underfloor", description: "Roof, windows, doors, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/18498d7754d3e3be183328ee5b71fa5a6ca84e652b50b46f2545b3ea8235da00?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 5, title: "Fuel & Gas", description: "Roof, windows, doors, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/24bda5372d6cacc26b10e45ef6b58c57ce062a1d239760f079a317c1bcb3c6f6?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 6, title: "Foundation", description: "Roof, windows, doors, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a77153e78b4e0f184dcaa058a308452a4144ed8b073a8cd1158626cc09e62f5c?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 7, title: "Mechanical", description: "Furnace, ventilation, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f296d7d285a930d2522f72f2705023b616a764dfa917d061618ca2199130a159?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 8, title: "Framing", description: "Stairs, walls, floor joists, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b815106a7dc02b010480589d903180140adc8ba82ed13a189ad0e1c79f391e11?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 9, title: "Drywall", description: "Nailing, screwing, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/320b4d5e910564967411939ee0b211ec21d8670251ecb5df0eabd9cd4b90f85d?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 10, title: "Building", description: "Glazing, alarms, attics, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/749ce0e3346abf88def0c9a879f8921d1d0b982941029ddc49019982da404c87?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" },
    { id: 11, title: "Sheathing", description: "Exterior wall sheathing, ...", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/32bdaab730cdc9d4cfe76c9d8edf53b74fdf0ee9fe71e1a39e1a75792e7f7fbb?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56" }
];


Modal.setAppElement('#root');

function InspectionGrid() {
    const [inspectionItems, setInspectionItems] = useState(initialInspectionItems);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageInputs, setImageInputs] = useState([0]); // Manage multiple inputs
    const [uploadSuccess, setUploadSuccess] = useState(""); // New state to track success message

    // Handle opening the modal when an item is clicked
    const handleItemClick = (id) => {
        setSelectedItemId(id);
        setIsModalOpen(true);
        setUploadSuccess(""); // Clear success message when opening modal
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setUploadedImages([]); // Clear images after closing
        setImageInputs([0]); // Reset inputs when modal closes
    };

    // Handle image uploads to Firebase Storage
    const handleImageUpload = (event, index) => {
        const files = Array.from(event.target.files);
        const newUploadedImages = [...uploadedImages];
        newUploadedImages[index] = files;
        setUploadedImages(newUploadedImages);
    };

    // Function to upload images and save them to Firestore
    const handleUploadImages = async () => {
        if (uploadedImages.length > 0 && selectedItemId) {
            console.log("Starting image upload...");
            let uploadCounter = 0;
            const totalImages = uploadedImages.flat().length;

            for (const images of uploadedImages) {
                for (const image of images) {
                    const storageRef = ref(storage, `inspection-items/${selectedItemId}/${image.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, image);

                    uploadTask.on('state_changed', 
                        (snapshot) => {
                            // Optional: Handle progress, pause, and resume
                        }, 
                        (error) => {
                            console.error("Upload error:", error);
                        }, 
                        async () => {
                            try {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                console.log("Image uploaded. Download URL:", downloadURL);
                                
                                // Save download URL to Firestore
                                await saveToFirestore(downloadURL);
                                
                                uploadCounter += 1;
                                if (uploadCounter === totalImages) {
                                    setUploadSuccess("All images have been uploaded successfully!");
                                }
                            } catch (error) {
                                console.error("Error getting download URL:", error);
                            }
                        }
                    );
                }
            }
        } else {
            console.error("No images selected or item not selected");
        }
    };

    // Save image URL to Firestore
    const saveToFirestore = async (imageUrl) => {
        try {
            const docRef = doc(db, 'inspection-items', selectedItemId.toString());
            await setDoc(docRef, {
                title: inspectionItems.find(item => item.id === selectedItemId)?.title || 'Untitled',
                imageUrl: imageUrl,
                timestamp: new Date(),
            }, { merge: true }); // Merging data, not overwriting

            console.log('Image URL saved to Firestore');
        } catch (error) {
            console.error("Error saving to Firestore:", error);
        }
    };

    // Add a new input field for uploading images
    const addImageInput = () => {
        setImageInputs([...imageInputs, imageInputs.length]);
    };

    return (
        <section className="mt-20 max-md:mt-10">
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-20 max-md:grid-cols-1">
                    {inspectionItems.map((item) => (
                        <div key={item.id} className="relative cursor-pointer" onClick={() => handleItemClick(item.id)}>
                            <InspectionItem {...item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for image upload */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="bg-white p-5 rounded-lg max-w-lg mx-auto shadow-lg relative z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Upload Images</h2>
                    <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} className="text-red-500 text-xl" />
                    </button>
                </div>
                <div className="mt-5">
                    {imageInputs.map((input, index) => (
                        <div key={index} className="mb-3">
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleImageUpload(e, index)}
                                className="mb-2"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={addImageInput}
                        className="text-blue-500 bg-transparent border border-blue-500 p-2 rounded flex items-center"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add More Images
                    </button>
                </div>
                
                {/* Success message */}
                {uploadSuccess && <div className="mt-4 text-[#79A0FF] text-center">{uploadSuccess}</div>}
                
                {/* Upload button */}
                <div className="flex justify-between mt-5">
                    <button
                        onClick={handleUploadImages}
                        className="bg-[#79A0FF] text-white py-2 px-4 rounded"
                    >
                        Upload
                    </button>
                </div>
            </Modal>
        </section>
    );
}

export default InspectionGrid;
