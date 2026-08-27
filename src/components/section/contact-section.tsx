import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function ContactSection() {
  return (
    <div className="relative rounded-xl border p-10 text-center">
      <div className="absolute inset-0 h-1/2 overflow-hidden rounded-xl">
        <FlickeringGrid className="h-full w-full" squareSize={2} gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }} />
      </div>
      <div className="relative flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact</h2>
        <p className="text-muted-foreground">Contact details coming soon.</p>
      </div>
    </div>
  );
}
