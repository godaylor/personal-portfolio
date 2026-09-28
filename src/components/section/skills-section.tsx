import { translate, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { getData } from "@/data/resume";

export default function SkillsSection({ locale }: { locale: Locale }) {
  const DATA = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <div className="skills-section">
      <SectionHeading
        title={t("Стек моих проектов.", "The tools behind my projects.")}
        titleId="stack-title"
        description={t("Технологии, которые используются в представленных приложениях.", "Technologies used in the applications presented here.")}
      />

      <div className="skill-groups">
        {DATA.skillGroups.map((group) => (
          <article className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            {group.note ? <p>{group.note}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
