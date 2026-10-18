import { useState } from "react";

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

export default function ProfileForm({ onSubmit, loading }) {
     const [profile, setProfile] = useState({
     gpa: 3.0,
     interested_domain: DOMAINS[0],
     python: "Average",
     sql: "Average",
     java: "Average",
     });

     function handleChange(event) {
     const { name, value } = event.target;
     setProfile({
          ...profile,
          [name]: name === "gpa" ? Number(value) : value,
     });
     }

     function handleSubmit(event) {
     event.preventDefault();
     onSubmit(profile);
     }

     return (
     <form onSubmit={handleSubmit}>
          <label>
          GPA (0 - 4)
          <input
               type="number"
               name="gpa"
               min="0"
               max="4"
               step="0.1"
               value={profile.gpa}
               onChange={handleChange}
               required
          />
          </label>

          <label>
          Domaine d'intérêt
          <select
               name="interested_domain"
               value={profile.interested_domain}
               onChange={handleChange}
          >
               {DOMAINS.map((domain) => (
               <option key={domain} value={domain}>
               {domain}
               </option>
               ))}
          </select>
          </label>

          {["python", "sql", "java"].map((skill) => (
          <label key={skill}>
               Niveau {skill}
               <select name={skill} value={profile[skill]} onChange={handleChange}>
               {LEVELS.map((level) => (
               <option key={level} value={level}>
                    {level}
               </option>
               ))}
               </select>
          </label>
          ))}

          <button type="submit" disabled={loading}>
          {loading ? "Analyse..." : "Obtenir mes recommandations"}
          </button>
     </form>
     );
}