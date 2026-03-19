import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

#Inisialisasi TestClient dari FastAPI
client = TestClient(app)

def test_read_root():
    """Memastikan server Python statusnya Online"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"
    assert "Gemini" in response.json()["engine"]

def test_process_ai_validation_error():
    """Memastikan Pydantic bekerja: Error jika data tidak lengkap"""
    response = client.post("/process", json={"prompt": "Halo AI"})
    assert response.status_code == 422

@patch("google.generativeai.GenerativeModel.generate_content")
def test_process_ai_success(mock_generate):
    """Memastikan alur kirim prompt ke AI berhasil (dengan Mocking)"""
    mock_response = MagicMock()
    mock_response.text = "Ini adalah jawaban AI untuk testing."
    mock_generate.return_value = mock_response

    payload = {
        "prompt": "Siap pencipta Node.js?",
        "user_id": "user-999"
    }
    response = client.post("/process", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["user_id"] == "user-999"
    assert data["ai_response"] == "Ini adalah jawaban AI untuk testing."
    assert "processed_at" in data