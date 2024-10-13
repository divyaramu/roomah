from language_based_analysis import run_inspection_for_room
from running_classification import ImageClassification


def inspectionReport (user_id, property_id, room_id, API_KEY, accountServiceKey):
    detector = ImageClassification(
        model_path="resnet_model_code.py", 
        service_account_key_path=accountServiceKey
    )
    damage_status = detector.check_damage_status(
        user = user_id, 
        house_code = property_id, 
        room = room_id
    )

    if damage_status == 'Damage':
        damage_status = 'No Damage'
    else:
        damage_status = 'Damage'
        
    response = ""
    try:
        response = run_inspection_for_room(user_id, property_id, room_id)
        print("Inspection Response:", response)
    except Exception as e:
        print(f"Error: {str(e)}")

    response_parts = []
    if response != "":
        response_parts = response.split(";")
    
    if response_parts.len() > 0:
        if damage_status == response_parts[0]:
            return damage_status
        elif float(response_parts[1].strip()) > 0.4:
            return response_parts[0]
    else:
        return damage_status