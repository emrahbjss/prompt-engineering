# Prompt Engineering

This project consists of a backend (`prompt-generator`) and a frontend (`ui-form`) designed to interact with the OpenAI API to generate a high-quality prompts based on user input.

## Getting Started

### Prerequisites

- Python 3.7 or higher for the backend.
- Node.js and npm for the frontend.

### Setting Up and Running the Backend

1. **Navigate to the Backend Directory:**

   ```bash
   cd prompt-generator
2. **Create a Virtual Environment (optional but recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate
3. **Install Dependencies:**

    ```bash
    pip install Flask flask-cors openai
4. **Set Up Environment Variables:**

    ```bash
    OPENAI_API_KEY='your-openai-api-key-here'
5. **Run the Backend:**

    ```bash
    python3 app.py
    
This will start the backend on http://localhost:5000. The backend can handle POST requests to generate prompts based on user input.

