import { useState } from "react";

function SparklesIcon() {
     return (
     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
     </svg>
     );
}

function SpinnerIcon() {
     return (
     <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.2-8.55" />
     </svg>
     );
     }
const DOMAINS = [
     "Artificial Intelligence",
     "Web Development",
     "Cybersecurity",
     "Mobile App Development",
     "Database Management",
     "Cloud Computing",
     "Data Science",
     "Machine Learning",
     "Computer Graphics",
     "Software Development",
     "Software Engineering",
];

const LEVELS = ["Weak", "Average", "Strong"];
const SKILLS = [
     { key: "python", label: "Python" },
     { key: "sql", label: "SQL" },
     { key: "java", label: "Java" },
];

function LevelPicker({ label, value, onChange }) {
     return (
     <fieldset>
          <legend className="mb-2 text-sm font-semibold text-slate-700">
          {label}
          </legend>
          <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((level) => (
               <button
               key={level}
               type="button"
               onClick={() => onChange(level)}
               aria-pressed={value === level}
               className={`rounded-xl border px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
               value === level
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
               }`}
               >
               {level}
               </button>
          ))}
          </div>
     </fieldset>
     );
}

export default function ProfileForm({ onSubmit, loading }) {
     const [profile, setProfile] = useState({
     gpa: 3.0,
     interested_domain: DOMAINS[0],
     python: "Average",
     sql: "Average",
     java: "Average",
     });

     function update(name, value) {
     setProfile((current) => ({ ...current, [name]: value }));
     }

     function handleSubmit(event) {
     event.preventDefault();
     onSubmit(profile);
     }

     return (
     <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100"
     >
          <div>
          <div className="mb-2 flex items-baseline justify-between">
               <label htmlFor="gpa" className="text-sm font-semibold text-slate-700">
               GPA
               </label>
               <span className="text-2xl font-bold text-indigo-600">
               {profile.gpa.toFixed(1)}
               <span className="text-sm font-medium text-slate-400"> / 4</span>
               </span>
          </div>
          <input
               id="gpa"
               type="range"
               min="0"
               max="4"
               step="0.1"
               value={profile.gpa}
               onChange={(e) => update("gpa", Number(e.target.value))}
               className="w-full accent-indigo-600"
          />
          </div>

          <div>
          <label
               htmlFor="domain"
               className="mb-2 block text-sm font-semibold text-slate-700"
          >
               Domaine d'intérêt
          </label>
          <select
               id="domain"
               value={profile.interested_domain}
               onChange={(e) => update("interested_domain", e.target.value)}
               className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
               {DOMAINS.map((domain) => (
               <option key={domain} value={domain}>
               {domain}
               </option>
               ))}
          </select>
          </div>

          {SKILLS.map((skill) => (
          <LevelPicker
               key={skill.key}
               label={`Niveau ${skill.label}`}
               value={profile[skill.key]}
               onChange={(level) => update(skill.key, level)}
          />
          ))}

          <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
          >
          {loading ? (
               <>
               <SpinnerIcon /> Analyse en cours...
               </>
          ) : (
               <>
               <SparklesIcon /> Obtenir mes recommandations
               </>
          )}
          </button>
     </form>
     );
}