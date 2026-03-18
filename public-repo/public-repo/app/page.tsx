import Link from "next/link";
import {
  ArrowUp,
  ClipboardText,
  ListChecks,
  Sparkle,
  Star,
} from "@phosphor-icons/react/ssr";
import { agendaBlocks } from "@/data/agenda";
import { event } from "@/data/event";
import MetaCards from "@/app/components/MetaCards";

const timeLines = event.time.split("\n");
const venueLines = event.venue.split("\n");
export default function Home() {
  return (
    <div className="page" id="top">
      <header className="hero">
        <div className="hero-main">
          <div className="hero-left">
            <h1 className="hero-title">{event.title}</h1>
            <p className="hero-sub">{event.summary}</p>
            <div className="hero-cta-stack">
              <Link
                className="btn btn-primary hero-cta hero-cta-inline"
                href="/review"
              >
                查看示例回顾
              </Link>
              <Link className="btn btn-ghost hero-cta-secondary" href="/claim">
                {event.cta}
              </Link>
            </div>
            <MetaCards
              timeLines={timeLines}
              venueLines={venueLines}
              city={event.city}
            />
          </div>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <Sparkle size={72} weight="fill" />
        </div>
      </header>

      <section className="section" id="agenda">
        <div className="section-title">
          <span className="section-index">01</span>
          活动环节
        </div>
        <div className="agenda-list">
          {agendaBlocks.map((block) => (
            <div key={block.title} className="agenda-item">
              <div className="agenda-head">
                <span className="agenda-time">{block.time}</span>
                <strong>{block.title}</strong>
              </div>
              <ul className="agenda-items">
                {block.items.map((item) => {
                  if (item.startsWith("分享｜")) {
                    const payload = item.replace(/^分享｜/, "");
                    const [speaker, topic] = payload.split("：");
                    if (speaker && topic) {
                      return (
                        <li key={item} className="share-item">
                          <span className="share-name">{speaker}</span>
                          <span className="share-sep">·</span>
                          <span className="share-topic">{topic}</span>
                        </li>
                      );
                    }
                  }
                  return <li key={item}>{item}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="notes">
        <div className="section-title">
          <span className="section-index">02</span>
          参会须知
        </div>
        <div className="note-grid">
          {event.notes.map((note) => (
            <div key={note} className="note-card">
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="highlights">
        <div className="section-title">
          <span className="section-index">03</span>
          你将收获
        </div>
        <div className="highlight-list">
          {event.highlights.map((item) => (
            <div key={item} className="highlight-card">
              {item}
            </div>
          ))}
        </div>
      </section>

      <aside className="quick-nav">
        <a href="#agenda">
          <span className="quick-nav-icon">
            <ListChecks size={14} />
          </span>
          <span>活动环节</span>
        </a>
        <a href="#notes">
          <span className="quick-nav-icon">
            <ClipboardText size={14} />
          </span>
          <span>参会须知</span>
        </a>
        <a href="#highlights">
          <span className="quick-nav-icon">
            <Star size={14} />
          </span>
          <span>你将收获</span>
        </a>
        <div className="quick-divider" aria-hidden="true" />
        <a href="#top" className="quick-top" aria-label="回到顶部">
          <span className="quick-top-icon">
            <ArrowUp size={14} weight="bold" />
          </span>
          <span>回到顶部</span>
        </a>
      </aside>

    </div>
  );
}
