import axios from "axios";
import { performance } from "perf_hooks";

const PYTHON_ENGINE_URL = process.env.PYTHON_ENGINE_URL || "http://engine-service:8000";

export const callPythonAI = async (prompt: string, userId: string) => {
  const startTime = performance.now();

  const response = await axios.post(`${PYTHON_ENGINE_URL}/process`, {
    prompt,
    user_id: userId,
  }, { timeout: 30000 });

  const endTime = performance.now();
  const durationMs = Math.round(endTime - startTime);

  return {
    ...response.data,
    latency: durationMs
  };
};
