import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex w-full items-center">
          <div className="h-px flex-1 bg-border" />
          <div className="rounded-xl border bg-primary px-4 py-1">
            <span className="text-sm font-medium text-background">Projects</span>
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Selected work</h2>
        <p className="text-muted-foreground">Project details coming soon.</p>
      </div>
      {DATA.projects.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DATA.projects.map((project, index) => (
            <BlurFade key={project.title} delay={0.48 + index * 0.05}>
              <ProjectCard href={project.href} title={project.title}
                description={project.description} dates={project.dates}
                tags={project.technologies} image={project.image}
                video={project.video} links={project.links} />
            </BlurFade>
          ))}
        </div>
      ) : null}
    </div>
  );
}
