import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";

const DELAY = 0.04;

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="order-2 flex flex-col gap-2 md:order-1">
            <BlurFadeText delay={DELAY} yOffset={8}
              className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
              text={"Hi, I'm " + DATA.name.split(" ")[0]} />
            <BlurFadeText delay={DELAY} text={DATA.description}
              className="text-muted-foreground md:text-lg lg:text-xl" />
          </div>
          <BlurFade delay={DELAY} className="order-1 md:order-2">
            <Avatar className="size-24 border shadow-lg ring-4 ring-muted md:size-32">
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </section>

      <section id="about" className="flex flex-col gap-4">
        <BlurFade delay={DELAY * 3}><h2 className="text-xl font-bold">About</h2></BlurFade>
        <BlurFade delay={DELAY * 4}>
          <div className="prose max-w-full text-muted-foreground dark:prose-invert">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>

      <section id="work" className="flex flex-col gap-6">
        <BlurFade delay={DELAY * 5}><h2 className="text-xl font-bold">Work Experience</h2></BlurFade>
        <BlurFade delay={DELAY * 6}>
          {DATA.work.length ? <WorkSection /> : <EmptyState>Experience details coming soon.</EmptyState>}
        </BlurFade>
      </section>

      <section id="education" className="flex flex-col gap-6">
        <BlurFade delay={DELAY * 7}><h2 className="text-xl font-bold">Education</h2></BlurFade>
        {DATA.education.length ? DATA.education.map((item) => (
          <div key={item.school} className="flex justify-between gap-4">
            <div><p className="font-semibold">{item.school}</p>
              <p className="text-sm text-muted-foreground">{item.degree}</p></div>
            <p className="text-xs text-muted-foreground">{item.start} - {item.end}</p>
          </div>
        )) : <EmptyState>Education details coming soon.</EmptyState>}
      </section>

      <section id="skills" className="flex flex-col gap-4">
        <BlurFade delay={DELAY * 9}><h2 className="text-xl font-bold">Skills</h2></BlurFade>
        {DATA.skills.length ? (
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill) => (
              <div key={skill.name} className="flex h-8 items-center gap-2 rounded-xl border px-4">
                {skill.icon ? <skill.icon className="size-4" /> : null}
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        ) : <EmptyState>Skills will be added after review.</EmptyState>}
      </section>

      <section id="projects"><BlurFade delay={DELAY * 11}><ProjectsSection /></BlurFade></section>
      <section id="contact"><BlurFade delay={DELAY * 13}><ContactSection /></BlurFade></section>
    </main>
  );
}
