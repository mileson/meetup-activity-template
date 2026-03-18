import Link from "next/link";
import { Suspense } from "react";
import { CaretLeft } from "@phosphor-icons/react/ssr";
import { event } from "@/data/event";
import TicketClient from "./TicketClient";

export default function TicketPage() {
  return (
    <div className="page ticket-page">
      <div className="ticket-top">
        <Link className="back-link" href="/">
          <span className="back-icon">
            <CaretLeft size={16} />
          </span>
          <span>返回首页</span>
        </Link>
      </div>
      <header className="ticket-head">
        <div className="ticket-badge">{event.title}</div>
        <p className="ticket-sub">此页面可长期收藏或转发给自己，入场时出示即可。</p>
      </header>

      <Suspense
        fallback={
          <section className="verify-card" aria-live="polite">
            <div className="verify-icon verify-loading">···</div>
            <div className="verify-title">加载中</div>
            <div className="verify-sub">请稍候</div>
          </section>
        }
      >
        <TicketClient />
      </Suspense>
    </div>
  );
}
