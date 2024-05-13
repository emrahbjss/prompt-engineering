import openai
import re
from openai import OpenAI

def get_user_input():
    print("Please provide the following details to generate your prompt:")
    # Required inputs
    role_description = input("Describe your role and specializations (required): ").strip().lower().replace("you are a ", "")
    task_description = input("Describe the task you need the AI to perform (required): ").strip().lower()

    # Optional inputs with expanded examples and default values if skipped
    format = input("What format do you want the output in? (optional, e.g., article, list, dialogue, report, summary): ").strip().lower() or "list"
    tone = input("What tone should the output have? (optional, e.g., professional, casual, humorous, informative): ").strip().lower() or "professional"
    audience = input("Who is the audience for this output? (optional, e.g., general public, specialists, beginners, experts): ").strip().lower() or "beginners"
    scope = input("What is the level of detail required? (optional, e.g., high, intermediate, low, overview, detailed analysis): ").strip().lower() or "intermediate"

    return role_description, task_description, format, tone, audience, scope

def generate_prompts(role_description, task_description, format, tone, audience, scope):
    prompts = []

    base_prompt = f"As a {role_description}, your task is to {task_description}."

    # Generate three variations of prompts
    prompts.append(base_prompt + f" Leverage your expertise to create an effective output. Format this as a {format}, maintain a {tone} tone, suitable for {audience}, with a {scope} level of detail.")
    prompts.append(base_prompt + f" Focus on structuring the course timeline. Format this timeline as a {format}, keep the tone {tone}, tailor it for {audience}, include an {scope} level of detail.")
    prompts.append(base_prompt + f" Combine your expertise and task requirements to create a comprehensive schedule. This should be formatted as a {format}, the tone should be {tone}, aimed at {audience}, the schedule should have a {scope} level of detail.")

    return prompts

def query_openai(prompt):
    api_key = 'OPEN_API_KEY'  # Replace with your actual API key
    client = OpenAI(api_key=api_key)
    
    user_request = "You are a helpful assistant to generate a high-quality and productive prompt by using user's draft prompt with providing details and examples:\n" + prompt
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": user_request}
            ],
            model="gpt-4",
            max_tokens=500,
            temperature=0.5
        )
        # Accessing the first choice's content properly
        return chat_completion.choices[0].message.content.strip()
    except Exception as e:
        return str(e)

def evaluate_and_refine(prompts):
    refined_prompts = []
    for prompt in prompts:
        response = query_openai(prompt)

        if len(response) < 100:
            new_prompt = prompt + " Provide more extensive examples and deeper insights. Rewrite this to include such examples and insights."
            refined_response = query_openai(new_prompt)
            refined_prompts.append(refined_response)
        elif "example" not in response or "detailed" not in response:
            new_prompt = prompt + " Include specific examples and detailed analysis. Rewrite this to enhance clarity and depth."
            refined_response = query_openai(new_prompt)
            refined_prompts.append(refined_response)
        elif not re.search(r"\b(challenges|opportunities|methods)\b", response, re.IGNORECASE):
            new_prompt = prompt + " Discuss potential challenges, opportunities, and innovative methods. Please rewrite to incorporate these elements."
            refined_response = query_openai(new_prompt)
            refined_prompts.append(refined_response)

        else:
            refined_prompts.append(response)

    return refined_prompts


def main():
    role_description, task_description, format, tone, audience, scope = get_user_input()
    initial_prompts = generate_prompts(role_description, task_description, format, tone, audience, scope)
    refined_prompts = evaluate_and_refine(initial_prompts)

    print("AI-generated refined prompts:")
    for idx, prompt in enumerate(refined_prompts):
        print(f"Prompt {idx + 1}: {prompt}")

if __name__ == "__main__":
    main()
