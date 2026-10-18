import { useState } from "react";

import "./App.css";
import { fetchRecommendations } from "./api/recommendApi";
import ProfileForm from "./components/ProfileForm";
import Results from "./components/Results";

export default function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(profile) {
    setLoading(true);
    setError("");

    try {
      const data = await fetchRecommendations(profile);
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>PathFinder</h1>
      <p>Découvre les carrières informatiques adaptées à ton profil.</p>

      <ProfileForm onSubmit={handleSubmit} loading={loading} />

      {error && <p role="alert">{error}</p>}

      <Results recommendations={recommendations} />
    </main>
  );
}