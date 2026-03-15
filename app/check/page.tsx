import { Suspense } from "react";
import { event } from "@/data/event";
import CheckClient from "./CheckClient";

export default function CheckPage() {
  return (
    <div className="page">
      <header className="hero compact">
        <div className="hero-content">
          <div className="hero-head">
            <div className="hero-pill">{event.title}</div>
          </div>
          <h1 className="hero-title">入场凭证核验</h1>
          <p className="hero-sub">
            扫码后系统将根据「填写姓名 + 提交人」进行匹配，仅完全一致才视为有效。
          </p>
        </div>
      </header>

      <Suspense
        fallback={
          <section className="verify-card" aria-live="polite">
            <div className="verify-icon verify-loading">···</div>
            <div className="verify-title">核验中</div>
            <div className="verify-sub">请稍候</div>
            <div className="verify-detail">
              <div>姓名：-</div>
            </div>
          </section>
        }
      >
        <CheckClient />
      </Suspense>
    </div>
  );
}
