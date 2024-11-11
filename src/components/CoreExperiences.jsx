import CoreExperience from "./CoreExperience.jsx";
import { CORE_EXPERIENCE } from "./cv/data.js";

export default function CoreExperiences() {
  return (
    <section id="experiencess">
      <h2>
        What has been <br />
        my journey?
      </h2>
      <div>
        <ul>
          {CORE_EXPERIENCE.map((conceptItem) => (
            <CoreExperience key={conceptItem.title} {...conceptItem} />
          ))}
        </ul>
      </div>
    </section>
  );
}
