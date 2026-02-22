from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import time
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("API_KEY tidak di temukan! Pastikan file .env sudah benar.")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(model_name='gemini-1.5-flash')

try:
    available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
    print(f"Model yang tersedia: {available_models}")

    selected_model = available_models[0] if available_models else 'gemini-pro'
    model = genai.GenerativeModel(selected_model)
    print(f"Menggunakan model: {selected_model}")
except Exception as e:
    print(f"Gagal mendeteksi model: {e}")
    model = genai.GenerativeModel('gemini-pro')

# struktur data yang akan dikirim dari Node.js
class AIRequest(BaseModel):
    prompt: str
    user_id: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "engine": "Gemini LLM Integreted"
    }

@app.post("/process")
async def process_ai(request: AIRequest):
    try:
        response = model.generate_content(request.prompt)

        return {
            "status": "success",
            "user_id": request.user_id,
            "ai_response": response.text.strip(),
            "model_used": model.model_name,
            "processed_at": time.strftime("%Y-%m-%d %H:%M:%S")
        }
    except Exception as e:
        print(f"--- DETAIL ERROR GEMINI ---")
        print(str(e))
        print(f"---------------------------")
        raise HTTPException(status_code=500, detail=str(e))