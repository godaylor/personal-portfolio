import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

export default function WorkSection() {
  return (
    <div className="background-section">
      <SectionHeading
        eyebrow="Background"
        title="Product craft, grounded in real work."
        titleId="background-title"
        description="Frontend and product development stay central; earlier professional experience remains part of the story without taking over the page."
      />

      <div className="background-grid">
        <div className="background-column">
          <div className="background-column__heading">
            <h3>Experience</h3>
            <span>{DATA.work.length}</span>
          </div>
          <div className="background-list">
            {DATA.work.map((item) => (
              <article className="background-item" key={`${item.company}-${item.title}`}>
                <div>
                  <p className="background-item__company">{item.company}</p>
                  <h4>{item.title}</h4>
                </div>
                <p className="background-item__period">{item.period}</p>
                <p className="background-item__description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="background-column">
          <div className="background-column__heading">
            <h3>Education</h3>
            <span>{DATA.education.length}</span>
          </div>
          {DATA.education.length > 0 ? (
            <div className="background-list">
              {DATA.education.map((item) => (
                <article className="background-item" key={item.school}>
                  <div>
                    <p className="background-item__company">{item.school}</p>
                    <h4>{item.degree}</h4>
                  </div>
                  <p className="background-item__period">{item.period}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="background-empty">
              Verified education details will be added from the final résumé.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
