import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("section-heading", className)}>
      <p className="section-eyebrow">{eyebrow}</p>
      <div className="section-heading__copy">
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
