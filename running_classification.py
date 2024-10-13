import torch
from torchvision import transforms
from PIL import Image
import firebase_admin
from firebase_admin import credentials, firestore
import resnet_model_code

class ImageClassification:
    def __init__(self, model_path, service_account_key_path):
        # Load your trained model
        self.model = self.load_model(model_path)
        self.model.eval()  # Set to evaluation mode

        # Initialize Firebase
        cred = credentials.Certificate(service_account_key_path)
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

        # Define preprocessing steps
        self.transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.RandomCrop((224, 224)),
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize(mean=torch.tensor([0.485, 0.456, 0.406]), 
                                 std=torch.tensor([0.229, 0.224, 0.225]))
        ])
        
        self.class_names = ['Damage', 'No Damage']

    def load_model(self, model_path):
        # Replace with the class of your trained model
        model = resnet_model_code()  
        model.load_state_dict(torch.load(model_path))  # Load model weights
        return model

    def check_damage_status(self, user, house_code, room):
        # Get document reference from Firestore
        document_reference_firebase = self.db.collection(user).document(house_code)
        document = document_reference_firebase.get()

        # Pull image from Firebase
        image_path = ""
        if document.exists:
            data = document.to_dict()
            room_data = data.get(room, [])
            image_path = room_data[3] if len(room_data) > 3 else None
        
        if image_path is None:
            return "No image found for the specified room."

        # Load and preprocess the image
        img = Image.open(image_path)  # Open the image from the path
        img_tensor = self.transform(img).unsqueeze(0)  # Add a batch dimension

        # Perform inference
        with torch.no_grad():  # No need to track gradients for testing
            output = self.model(img_tensor)

        # Get the predicted class (assuming the output is logits)
        _, predicted_class = torch.max(output, 1)

        # Return the predicted class name
        return self.class_names[predicted_class.item()]

# Example usage
# detector = HouseDamageDetector(model_path="resnet_model_code.py", service_account_key_path="path_to_service_account_key")
# damage_status = detector.check_damage_status(user="user1", house_code="family_house", room="room_1")
# print(damage_status)
