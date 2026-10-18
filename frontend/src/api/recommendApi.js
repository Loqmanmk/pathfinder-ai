const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export async function fetchRecommendations(profile) {
     const response = await fetch(`${API_URL}/recommend`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(profile),
     });

     if (!response.ok) {
     throw new Error("Impossible d'obtenir les recommandations.");
     }

     const data = await response.json();
     return data.recommendations;
}