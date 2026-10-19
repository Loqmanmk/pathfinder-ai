export default function Results({ recommendations }) {
     if (recommendations.length === 0) {
     return null;
     }

     return (
     <section className="space-y-4" aria-live="polite">
          <h2 className="text-xl font-bold text-slate-900">Tes recommandations</h2>

          {recommendations.map((item, index) => {
          const percent = Math.round(item.probability * 100);
          const isTop = index === 0;

          return (
               <article
               key={item.family}
               className={`rounded-2xl p-5 shadow-lg ring-1 transition ${
               isTop
                    ? "bg-indigo-600 text-white shadow-indigo-200 ring-indigo-600"
                    : "bg-white text-slate-800 shadow-slate-200/60 ring-slate-100"
               }`}
               >
               <div className="mb-2 flex items-baseline justify-between gap-3">
               <h3 className="text-lg font-bold">
                    {index + 1}. {item.family}
               </h3>
               <span className="text-2xl font-extrabold">{percent}%</span>
               </div>

               <div
               className={`mb-4 h-2 overflow-hidden rounded-full ${
                    isTop ? "bg-indigo-400/50" : "bg-slate-100"
               }`}
               >
               <div
                    className={`h-full rounded-full transition-all duration-700 ${
                    isTop ? "bg-white" : "bg-indigo-500"
                    }`}
                    style={{ width: `${percent}%` }}
               />
               </div>

               <ul className="flex flex-wrap gap-2">
               {item.careers.map((career) => (
                    <li
                    key={career}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                         isTop
                         ? "bg-white/20 text-white"
                         : "bg-indigo-50 text-indigo-700"
                    }`}
                    >
                    {career}
                    </li>
               ))}
               </ul>
               </article>
          );
          })}
     </section>
     );
}