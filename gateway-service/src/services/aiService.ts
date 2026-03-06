import axios from "axios";

const PYTHON_ENGINE_URL = "http://localhost:8000";

export const callPythonAI = async (prompt: string, userId: string) => {
  const response = await axios.post(`${PYTHON_ENGINE_URL}/process`, {
    prompt,
    user_id: userId,
  });

  return response.data;
};
