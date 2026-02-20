from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# struktur data yang akan dikirim dari Node.js
class AIRequest(BaseModel):
    prompt: str
    user_id: str

@app.get("/")
def home():
    return {"message": "Nexus Bridge Engine (Python) is Online"}

@app.post("/process")
def process_ai(request: AIRequest):
    print(f"Menerima request dari User ID: {request.user_id}")

    return {
        "status": "processed",
        "input_received": request.prompt,
        "ai_response": f"AI Engine telah menganalisis data untuk user {request.user_id}: '{request.prompt}'",
        "engine_version": "1.0.0"
    }