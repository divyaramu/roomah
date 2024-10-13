import google.generativeai as genai
import PyPDF2
import os
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("<fill with path to service account key")
firebase_admin.initialize_app(cred)

db - firestore.client()

api_key = os.getenv('API_KEY')

client = genai.Client(api_key = api_key)

# response = client.generate(prompt = "Joke")
print(response.text)

example_response = "Inspection_status; degree_of_confidence"


prompt = f"""\
    You are an AI model who is an expert on residential properties. You are an expert on the building \
    codes for the city of Seattle, as well as the citeria considered when a certain part of a residential \
    property is being inspected. Your goal is to take in a text summary and an image of a part of a room, \
    and determine whether or not that part of the room passes the inspection criteria or fails it. In the \
    text summary, you are given the purpose of the room, as well as the user's observations. Be sure to \
    synthesize the text information with the image when making your assessment. Give your final response \
    in the given format. It should also be a String: {example_response}
"""

model = genai.GenerativeModel(
    'gemini-1.5-flash-latest',
    system_instruction = prompt,
    generation_config = genai.types.GenerationConfig(
        temperature = 0.3
    )
)

inputs_for_response = [prompt]

# puts in data from the seattle building codes into the model for consideration
seattle_building_codes = "SeattleBuildingCodes/"
seattle_building_code_files = os.listdir(seattle_building_codes)

for file in seattle_building_code_files:
    file_path = os.path.join(seattle_building_codes, file)
    if os.path.isfile(file_path): 
        inputs_for_response.append(file_path)


# puts in data from the inspection reports into the model for consideration
inspection_checklists = "InspectionChecklists/"
inspection_checklist_files = os.listdir(inspection_checklists)

for file in inspection_checklist_files:
    file_path = os.path.join(inspection_checklists, file)
    if os.path.isfile(file_path): 
        inputs_for_response.append(file_path)


# image and textbased data pulled from firebase
image = ""
room_type = ""
user_observations = ""
# will be updated based on what is the current house
document_reference_firebase = db.collection('user1').document('family_house')
document = document_reference_firebase.get()

if document.exists:
    data = document.to_dict()
    room = data.get('room_1', [])
    room_type = room[0]
    user_observations = room[1]



inputs_for_response.append(room_type)
inputs_for_response.append(user_observations)


response = model.generate_content(inputs_for_response)


