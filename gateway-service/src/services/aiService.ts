import axios from "axios";

const PYTHON_ENGINE_URL = process.env.PYTHON_ENGINE_URL || "http://engine-service:8000";

export const callPythonAI = async (prompt: string, userId: string) => {
  const response = await axios.post(`${PYTHON_ENGINE_URL}/process`, {
    prompt,
    user_id: userId,
  }, { timeout: 30000 });

  return response.data;
};
