# app.py

# Import Dependencies
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from api.chatbot import ask

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/ask', methods=['POST'])
@cross_origin()  # This will enable CORS for this route
def get_response():
    data = request.get_json()
    
    if 'query' not in data:
        return jsonify({'error': 'No query provided'}), 400
    
    query = data['query']
    response = ask(query)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True, port=8000)
