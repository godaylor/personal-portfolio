"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { translate, type Locale } from "@/lib/i18n";

export type GalleryImage = { src: string; caption: string };

function Screenshot({ image, sizes, locale, priority = false }: { image: GalleryImage; sizes: string; locale: Locale; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="project-gallery__missing">{translate(locale, "Снимок не загрузился. ", "Screenshot could not load. ")}{image.caption}</span> : (
    <Image src={image.src} alt={image.caption} width={1440} height={1000} sizes={sizes} priority={priority} onError={() => setFailed(true)} />
  );
}

export function ProjectGallery({ images, locale, note }: { images: GalleryImage[]; locale: Locale; note?: string }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const current = images[selected];
  if (!current) return null;

  return (
    <section className="project-gallery" aria-label={t("Экраны приложения", "Application screens")}>
      <figure>
        <button ref={opener} type="button" className="project-gallery__main" aria-haspopup="dialog" aria-label={t("Увеличить снимок: ", "Enlarge screenshot: ") + current.caption} onClick={() => { setExpanded(true); dialog.current?.showModal(); }}>
          <Screenshot key={current.src} image={current} locale={locale} sizes="(min-width: 1240px) 1180px, 100vw" priority />
          <span>{t("Увеличить", "Enlarge")} ↗</span>
        </button>
        <figcaption aria-live="polite">{selected + 1} / {images.length} — {current.caption}</figcaption>
      </figure>
      {images.length > 1 ? <div className="project-gallery__thumbnails" aria-label={t("Выбор экрана", "Choose a screen")}>
        {images.map((image, index) => <button type="button" key={image.src} aria-pressed={selected === index} onClick={() => setSelected(index)}>
          <Screenshot image={image} locale={locale} sizes="160px" />
          <span>{image.caption}</span>
        </button>)}
      </div> : null}
      {note ? <p className="project-gallery__note">{note}</p> : null}
      <dialog ref={dialog} className="project-gallery__dialog" aria-label={t("Увеличенный снимок", "Enlarged screenshot")} onKeyDown={event => {
        // The close button is the only interactive element in this dialog.
        if (event.key === "Tab") { event.preventDefault(); dialog.current?.querySelector("button")?.focus(); }
      }} onClose={() => { setExpanded(false); opener.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {expanded ? <div className="project-gallery__lightbox">
          <div className="project-gallery__toolbar"><p>{current.caption}</p><button autoFocus type="button" onClick={() => dialog.current?.close()}>{t("Закрыть", "Close")} ×</button></div>
          <Screenshot image={current} locale={locale} sizes="(min-width: 1640px) 1600px, 96vw" />
        </div> : null}
      </dialog>
    </section>
  );
}
