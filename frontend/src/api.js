// In production/deployment, set VITE_API_BASE_URL to your remote backend URL.
// Defaults to http://127.0.0.1:5000/api for local development.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return await res.json();
}

export async function fetchCropsCatalog() {
  const res = await fetch(`${API_BASE}/crops`);
  if (!res.ok) throw new Error(`Failed to load crops catalog: ${res.statusText}`);
  return await res.json();
}

export async function requestPrediction(formData) {
  const payload = {
    N: parseFloat(formData.N),
    P: parseFloat(formData.P),
    K: parseFloat(formData.K),
    temperature: parseFloat(formData.temperature),
    humidity: parseFloat(formData.humidity),
    ph: parseFloat(formData.ph),
    rainfall: parseFloat(formData.rainfall)
  };

  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Prediction request could not be completed.");
  }
  return data;
}
