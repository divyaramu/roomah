import subprocess
from final_ai_ml_model import inspectionReport
from flask import Flask, jsonify, request
from flask_cors import CORS  # To handle CORS if React is on a different port

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

Gemini_API_KEY = ""
Firebase_account_key = ""

@app.route('/run-script', methods=['POST'])
def run_script():
    try:

        data = request.get_json()
        user = data.get('user')
        property = data.get('property')
        room = data.get('room')

        # This is where you run your Python script
        result = inspectionReport(
            user_id = user, 
            property_id = property, 
            room_id = room, 
            API_KEY = Gemini_API_KEY, 
            accountServiceKey = Firebase_account_key
        )
        # result = subprocess.run(['python3', 'final_ai_ml_model.py'], capture_output=True, text=True)
        
        # Send the script output back to the frontend
        return jsonify({'output': result.stdout, 'error': result.stderr})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
