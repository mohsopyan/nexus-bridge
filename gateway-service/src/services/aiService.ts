import axios from 'axios';

const PYTHON_ENGINE_URL = 'http://localhost:8000';

export const callPythonAI = async (prompt: string, userId: string) => {
    try {
        const response = await axios.post(`${PYTHON_ENGINE_URL}/process`, {
            prompt: prompt,
            user_id: userId
        });

        return response.data;
    } catch (error: any) {
        console.error("Gagal menghubungi Python Engine:", error.message);
        throw new Error("AI Engine sedang tidak tersedia");
    }
}