from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import re

app = Flask(__name__)
CORS(app)

from prompt_generator import generate_prompts, evaluate_and_refine

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    role_description = data['role']
    task_description = data['task']
    format = data['format']
    tone = data['tone']
    audience = data['audience']
    scope = data['scope']

    prompts = generate_prompts(role_description, task_description, format, tone, audience, scope)
    refined_prompts = evaluate_and_refine(prompts)

    return jsonify(refined_prompts)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
