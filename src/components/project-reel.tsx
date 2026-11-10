"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { localizedPath, translate, type Locale } from "@/lib/i18n";
import { ProductFilm } from "@/components/product-film";
import { useExperienceMotion } from "@/components/experience-motion";
import { projectVisuals } from "@/data/project-visuals";

const projects = [
  {
    slug: "signal-studio",
    title: ["Ракурс", "Rakurs"],
    kind: ["Продуктовая аналитика", "Product analytics"],
    detail: [
      "Воронка активации и разбор конверсии",
      "Activation funnel and conversion analysis",
    ],
    image: "/projects/presentation/v3-yasnosled-funnel.jpg",
    mobile: "/projects/presentation/v3-yasnosled-mobile.jpg",
    video: "/projects/reels/yasnosled.mp4",
    color: "analytics",
  },
  {
    slug: "napoli",
    title: ["Napoli", "Napoli"],
    kind: ["Демо интернет-магазина", "E-commerce demo"],
    detail: ["Меню → настройка пиццы → корзина", "Menu → pizza options → cart"],
    image: "/projects/presentation/v3-napoli-product.jpg",
    mobile: "/projects/presentation/v3-napoli-mobile.jpg",
    video: "/projects/reels/napoli.mp4",
    color: "commerce",
  },
  {
    slug: "relayops",
    title: ["Маяк", "Mayak"],
    kind: ["Инструмент для ИТ-команд", "IT team workspace"],
    detail: [
      "Инцидент → задачи → журнал действий",
      "Incident → tasks → event history",
    ],
    image: "/projects/presentation/relayops-board.jpg",
    mobile: null,
    video: null,
    color: "operations",
  },
]
  .sort(
    (a, b) =>
      ["napoli", "signal-studio", "relayops"].indexOf(a.slug) -
      ["napoli", "signal-studio", "relayops"].indexOf(b.slug),
  )
  .map((project) => {
    const visual = projectVisuals[project.slug];
    return {
      ...project,
      title: visual.title,
      image: visual.cover,
      mobile: visual.mobile ?? null,
      video: visual.film ?? null,
      sourceLabel: visual.sourceLabel,
    };
  });

export function ProjectReel({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [failed, setFailed] = useState<string>();
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const { enabled } = useExperienceMotion();
  const index = locale === "ru" ? 0 : 1;
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const project = projects[active];
  const displayImage = project.image;
  const auto = enabled && !interacted && !hovering && visible && tabVisible;
  useEffect(() => {
    if (!auto) return;
    const timer = window.setTimeout(
      () => setActive((value) => (value + 1) % projects.length),
      12000,
    );
    return () => clearTimeout(timer);
  }, [active, auto]);
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(root.current);
    const visibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  function select(value: number) {
    setInteracted(true);
    setActive((value + projects.length) % projects.length);
    root.current?.scrollIntoView({
      block: "start",
      behavior: enabled ? "smooth" : "instant",
    });
  }
  return (
    <div
      className="project-reel"
      ref={root}
      data-project={project.slug}
      data-scene={project.color}
      data-auto={auto}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        root.current?.style.setProperty("--pointer-x", "0");
        root.current?.style.setProperty("--pointer-y", "0");
      }}
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--pointer-x",
          String((event.clientX - box.left) / box.width - 0.5),
        );
        event.currentTarget.style.setProperty(
          "--pointer-y",
          String((event.clientY - box.top) / box.height - 0.5),
        );
      }}
    >
      <div className="project-reel__stage">
        <div className="project-reel__backdrop" aria-hidden="true">
          <span key={project.slug}>{project.title[index]}</span>
        </div>
        <div className="project-reel__edition">
          <span className="reel-dot" />
          {t("ПРОЕКТЫ MAXEEM", "PROJECTS BY MAXEEM")}
          <span>{t("ИНТЕРФЕЙСЫ В РАБОТЕ", "INTERFACES IN ACTION")}</span>
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            className="project-reel__composition"
            key={project.slug}
            initial={
              enabled
                ? { opacity: 0, y: 65, scale: 1.06, filter: "blur(8px)" }
                : false
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: enabled ? -50 : 0,
              scale: 0.96,
              filter: enabled ? "blur(6px)" : "none",
            }}
            transition={{
              duration: enabled ? 0.85 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={localizedPath(locale, `/work/${project.slug}`)}
              className="project-reel__screen"
              aria-label={`${t("О проекте", "Read about")} ${project.title[index]}`}
            >
              {failed === displayImage ? (
                <div className="reel-fallback">
                  {project.title[index]}
                  <span>
                    {t("Открыть описание проекта", "Read the case study")} ↗
                  </span>
                </div>
              ) : (
                <Image
                  key={displayImage}
                  src={displayImage}
                  alt={`${project.title[index]}: ${project.detail[index]}`}
                  fill
                  loading={active === 0 ? "eager" : "lazy"}
                  fetchPriority={active === 0 ? "high" : "auto"}
                  sizes="(max-width:760px) 100vw, 80vw"
                  onError={() => setFailed(displayImage)}
                />
              )}
              {project.video ? <ProductFilm src={project.video} /> : null}
              <span className="project-reel__open" aria-hidden="true">
                <ArrowUpRight size={30} />
              </span>
            </Link>
            {project.mobile ? (
              <div className="project-reel__mobile" aria-hidden="true">
                <Image
                  src={project.mobile}
                  alt=""
                  fill
                  sizes="(max-width:760px) 20vw, 16vw"
                />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
        <div className="project-reel__description">
          <span>{project.kind[index]}</span>
          <p>{project.detail[index]}</p>
          <small>{project.sourceLabel[index]}</small>
        </div>
        <Link
          className="project-reel__case-link"
          href={localizedPath(locale, `/work/${project.slug}`)}
        >
          {t("Разобрать проект", "Explore the case")}
          <ArrowUpRight size={21} />
        </Link>
      </div>
      <div
        className="project-reel__rail"
        onFocusCapture={() => setInteracted(true)}
      >
        <div
          className="project-reel__tabs"
          role="group"
          aria-label={t(
            "Выбрать проект в презентации",
            "Choose a project in the presentation",
          )}
        >
          {projects.map((item, i) => (
            <button
              type="button"
              aria-pressed={i === active}
              onClick={() => select(i)}
              key={item.slug}
            >
              <span>{item.title[index]}</span>
              <small>{item.kind[index]}</small>
              <i key={`${active}-${auto}`} />
            </button>
          ))}
        </div>
        <div className="project-reel__arrows">
          <button
            type="button"
            aria-label={t("Предыдущий проект", "Previous project")}
            onClick={() => select(active - 1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label={t("Следующий проект", "Next project")}
            onClick={() => select(active + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <a className="project-reel__scroll" href="#selected-work">
          {t("Все проекты", "All projects")}
          <ArrowDownRight size={20} />
        </a>
      </div>
    </div>
  );
}
