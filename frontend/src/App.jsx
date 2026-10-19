import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Path<span className="text-indigo-600">Finder</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Découvre les carrières informatiques adaptées à ton profil.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <ProfileForm onSubmit={handleSubmit} loading={loading} />

          <div>
            {error && (
              <p
                role="alert"
                className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700 ring-1 ring-red-200"
              >
                {error}
              </p>
            )}

            {recommendations.length === 0 && !error && (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-500">
                Remplis ton profil et clique sur le bouton : tes
                recommandations apparaîtront ici.
              </div>
            )}

            <Results recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}