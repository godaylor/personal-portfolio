import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { chromium } from "@playwright/test";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const output = "docs/rebrand-20261110";
await mkdir(`${output}/raw`, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const run = promisify(execFile);
const jobs = [
  {
    name: "mayak", url: "https://relayops-godaylor.onrender.com/", brand: "Маяк", film: true,
    async flow(page, capture) {
      await page.getByRole("button", { name: /^Попробовать без регистрации/ }).first().click();
      await page.waitForURL("**/relayops/**", { timeout: 60000 });
      await page.getByRole("heading", { name: /Видим проблему/ }).waitFor();
      await page.getByRole("link", { name: "Сводка", exact: true }).waitFor();
      await page.waitForTimeout(3500);
      await capture("overview");
      await page.getByRole("link", { name: /Открыть INC-1:/ }).first().click();
      await page.getByRole("heading", { name: "Оплата картой проходит с задержкой", exact: true }).waitFor();
      await capture("room");
      await page.getByRole("link", { name: "Доска", exact: true }).click();
      await capture("board");
      await page.getByRole("link", { name: "Сводка", exact: true }).click();
    },
  },
  {
    name: "rakurs", url: "https://signal-studio-smoky.vercel.app/demo", brand: "Ракурс", film: true,
    async flow(page, capture) {
      await capture("home");
      await page.getByRole("button", { name: /^Попробовать без регистрации/ }).first().click();
      await page.waitForURL("**/studio/**", { timeout: 60000 });
      await page.getByText("Актуальный результат", { exact: true }).waitFor();
      await capture("explore");
      await page.getByRole("button", { name: "Динамика", exact: true }).click();
      await page.waitForFunction(() => document.body.innerText.includes("945"), undefined, { timeout: 45000 });
      await capture("dynamics");
    },
  },
  {
    name: "po-shagam", url: "https://opsweave.onrender.com/", brand: "По шагам", film: false,
    async flow(page, capture) {
      await capture("home");
      await page.getByRole("button", { name: /^Попробовать без регистрации/ }).click();
      await page.getByRole("link", { name: "Инструкции", exact: true }).waitFor();
      await page.getByRole("link", { name: "Инструкции", exact: true }).click();
      await page.getByRole("button", { name: "Создать первую инструкцию" }).click();
      await page.getByRole("button", { name: "Взять за основу: восстановление" }).click();
      await page.getByLabel("Название инструкции", { exact: true }).fill("Учебное восстановление платёжного сервиса");
      await page.getByRole("button", { name: "Сохранить", exact: true }).click();
      await page.getByText("Черновик сохранён", { exact: true }).waitFor();
      await page.getByRole("button", { name: "Опубликовать", exact: true }).click();
      await page.getByText("Инструкция готова к запуску.").waitFor();
      await capture("editor");
      await page.getByRole("link", { name: /^Главная/ }).click();
      await page.getByRole("heading", { name: "В работе", exact: true }).waitFor();
      await capture("workspace");
      const start = page.getByRole("button", { name: /Начать выполнение|Запустить инструкцию/ }).first();
      await start.click();
      await page.getByLabel("Название инцидента").fill("Учебная проверка оплаты");
      await page.getByLabel("Сервис", { exact: true }).fill("Учебный магазин");
      await page.getByRole("button", { name: "Создать и запустить" }).click();
      await page.getByRole("heading", { name: "Текущий шаг" }).waitFor();
      await capture("run");
    },
  },
].filter(job => !process.env.CAPTURE_ONLY || job.name === process.env.CAPTURE_ONLY);

async function execute(job) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }, colorScheme: "light", reducedMotion: job.film ? "no-preference" : "reduce",
    ...(job.film ? { recordVideo: { dir: `${output}/raw`, size: { width: 1440, height: 1000 } } } : {}),
  });
  const page = await context.newPage();
  const started = Date.now(), clips = [], errors = [], captures = [];
  page.on("pageerror", error => errors.push(error.message));
  try {
    await page.goto(job.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.getByText(job.brand, { exact: true }).first().waitFor({ timeout: 45000 });
    async function capture(scene) {
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(2000);
      const body = await page.locator("body").innerText();
      assert.ok(!/Сборитм|Кинорит|Дежурно/.test(body), `${job.name}: stale product name`);
      const file = `public/projects/presentation/v7-${job.name}-${scene}.jpg`;
      await page.screenshot({ path: file, type: "jpeg", quality: 91 });
      captures.push({ scene, file, url: page.url(), title: await page.title() });
      if (job.film) {
        const start = (Date.now() - started) / 1000;
        await page.waitForTimeout(3000);
        clips.push({ start, end: (Date.now() - started) / 1000 });
      }
      console.log("CAPTURE", job.name, scene);
    }
    await job.flow(page, capture);
    await page.setViewportSize({ width: 390, height: 844 });
    await capture("mobile");
    assert.deepEqual(errors, [], "No JavaScript errors while capturing " + job.name);
    const video = page.video();
    await context.close();
    if (job.film) {
      const desktop = clips.slice(0, -1);
      const filter = desktop.map((clip, i) => `[0:v]trim=start=${clip.start}:end=${clip.end},setpts=PTS-STARTPTS[v${i}]`).join(";") + ";" + desktop.map((_, i) => `[v${i}]`).join("") + `concat=n=${desktop.length}:v=1:a=0,fps=24,scale=1280:888,format=yuv420p[out]`;
      await run(ffmpeg.path, ["-y", "-i", await video.path(), "-filter_complex", filter, "-map", "[out]", "-c:v", "libx264", "-preset", "medium", "-crf", "25", "-movflags", "+faststart", "-an", `public/projects/reels/v7-${job.name}.mp4`]);
    }
    await writeFile(`${output}/${job.name}.json`, JSON.stringify({ source: "public", brand: job.brand, captures, errors }, null, 2));
    console.log("PASS", job.name);
  } catch (error) {
    await page.screenshot({ path: `${output}/${job.name}-failure.jpg` }).catch(() => {});
    await writeFile(`${output}/${job.name}-failure.json`, JSON.stringify({ error: error.message, url: page.url(), body: await page.locator("body").innerText(), errors }, null, 2));
    await context.close();
    throw error;
  }
}

try {
  const results = await Promise.allSettled(jobs.map(execute));
  for (let i = 0; i < results.length; i++) if (results[i].status === "rejected") {
    console.error("FAIL", jobs[i].name, results[i].reason.message);
    process.exitCode = 1;
  }
} finally { await browser.close(); }
