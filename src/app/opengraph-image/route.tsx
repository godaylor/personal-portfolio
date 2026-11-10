import { readFile } from "node:fs/promises";
import path from "node:path";
export const runtime = "nodejs";
export async function GET() {
  const image = await readFile(path.join(process.cwd(), "public/art/portfolio-og.png"));
  return new Response(image, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
}
