import google.generativeai as genai
import PyPDF2
import os
import firebase_admin
from firebase_admin import credentials, firestore

# cred = credentials.Certificate("<fill with path to service account key>")
# firebase_admin.initialize_app(cred)

# db = firestore.client()

# api_key = os.getenv('API_KEY')
# client = genai.Client(api_key=api_key)

example_response = "Inspection_status; degree_of_confidence"

prompt_template = f"""\
    You are an AI model who is an expert on residential properties. You are an expert on the building \
    codes for the city of Seattle, as well as the criteria considered when a certain part of a residential \
    property is being inspected. Your goal is to take in a text summary and an image of a part of a room, \
    and determine whether or not that part of the room passes the inspection criteria or fails it. In the \
    text summary, you are given the purpose of the room, as well as the user's observations. Be sure to \
    synthesize the text information with the image when making your assessment. Give your final response \
    in the given format. The inspection status should read either 'Damage' or 'No Damage'. \
    The degree of confidence should be a decimal number between 0 and 1, inclusive\
    The response should also be a String: {example_response}
"""

model = genai.GenerativeModel(
    'gemini-1.5-flash-latest',
    system_instruction=prompt_template,
    generation_config=genai.types.GenerationConfig(
        temperature=0.3
    )
)

def run_inspection_for_room(user_id, property_id, room_id, API_Key, accountKeyPath):

    cred = credentials.Certificate(accountKeyPath)
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    # api_key = os.getenv('API_KEY')
    client = genai.Client(api_key=API_Key)

    # Prepare inputs for the model
    inputs_for_response = [prompt_template]

    # Add Seattle building codes data
    seattle_building_codes = "SeattleBuildingCodes/"
    seattle_building_code_files = os.listdir(seattle_building_codes)
    for file in seattle_building_code_files:
        file_path = os.path.join(seattle_building_codes, file)
        if os.path.isfile(file_path):
            inputs_for_response.append(file_path)

    # Add inspection checklist data
    inspection_checklists = "InspectionChecklists/"
    inspection_checklist_files = os.listdir(inspection_checklists)
    for file in inspection_checklist_files:
        file_path = os.path.join(inspection_checklists, file)
        if os.path.isfile(file_path):
            inputs_for_response.append(file_path)

    # Pull room data from Firestore
    document_reference_firebase = db.collection(user_id).document(property_id)
    document = document_reference_firebase.get()

    if document.exists:
        data = document.to_dict()
        room_data = data.get(room_id, [])
        if len(room_data) >= 2:
            room_type = room_data[0]
            user_observations = room_data[1]
        else:
            raise ValueError("Room data is incomplete.")
    else:
        raise ValueError(f"No document found for user {user_id} and property {property_id}")

    # Add room data to inputs
    inputs_for_response.append(room_type)
    inputs_for_response.append(user_observations)

    # Call the generative model
    response = model.generate_content(inputs_for_response)

    return response
