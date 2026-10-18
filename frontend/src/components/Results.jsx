export default function Results({ recommendations }) {
     if (recommendations.length === 0) {
     return null;
     }

     return (
     <section>
          <h2>Tes recommandations</h2>

          {recommendations.map((item, index) => (
          <article key={item.family}>
               <h3>
               {index + 1}. {item.family} ({Math.round(item.probability * 100)}%)
               </h3>
               <ul>
               {item.careers.map((career) => (
               <li key={career}>{career}</li>
               ))}
               </ul>
          </article>
          ))}
     </section>
     );
}