"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { DownloadSimple } from "@phosphor-icons/react";
import { buildDownloadFilename, shareOrDownload } from "@/app/lib/share";

type Status = "idle" | "loading" | "valid" | "invalid" | "missing";

type VerifyOk = {
  ok: true;
  attendee: {
    name: string;
    submitter: string;
    image: string;
  };
};

type VerifyFail = {
  ok: false;
  message: string;
};

type VerifyResponse = VerifyOk | VerifyFail;

export default function TicketClient() {
  const searchParams = useSearchParams();
  const name = useMemo(
    () => searchParams.get("name")?.trim() || "",
    [searchParams]
  );
  const submitter = useMemo(
    () => searchParams.get("submitter")?.trim() || "",
    [searchParams]
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [downloadHint, setDownloadHint] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyOk["attendee"] | null>(null);
  const hasRequiredParams = Boolean(name && submitter);

  useEffect(() => {
    if (!hasRequiredParams) {
      return;
    }

    const run = async () => {
      setStatus("loading");
      try {
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, submitter }),
        });
        const data = (await response.json()) as VerifyResponse;
        if (!response.ok || !data.ok) {
          setStatus("invalid");
          setMessage(data.ok ? "未找到匹配记录" : data.message);
          return;
        }
        setStatus("valid");
        setResult(data.attendee);
        setMessage("此页面可长期收藏或转存为快捷入口");
      } catch {
        setStatus("invalid");
        setMessage("网络异常，请稍后再试");
      }
    };

    run();
  }, [hasRequiredParams, name, submitter]);

  const displayStatus = hasRequiredParams ? status : "missing";
  const displayMessage = hasRequiredParams ? message : "凭证参数缺失或无效";

  if (displayStatus === "loading") {
    return (
      <section className="verify-card ticket-state" aria-live="polite">
        <div className="verify-icon verify-loading">···</div>
        <div className="verify-title">加载中</div>
        <div className="verify-sub">请稍候</div>
      </section>
    );
  }

  if (displayStatus === "missing" || displayStatus === "invalid" || !result) {
    return (
      <section className="verify-card ticket-state" aria-live="polite">
        <div className="verify-icon verify-bad">!</div>
        <div className="verify-title">无法获取凭证</div>
        <div className="verify-sub">{displayMessage}</div>
      </section>
    );
  }

  const safeFilename = buildDownloadFilename(result.name, result.image);

  return (
    <section className="ticket-panel ticket-panel-reverse">
      <div className="ticket-preview">
        <div className="ticket" aria-label="入场凭证预览">
          <Image
            src={result.image}
            alt={`${result.name} 入场凭证`}
            fill
            sizes="(max-width: 768px) 80vw, 360px"
            priority
          />
        </div>
      </div>

      <div className="ticket-info">
        <div className="ticket-info-title">凭证信息</div>
        <div className="ticket-meta">
          <span className="name-pill">姓名：{result.name}</span>
        </div>
        <button
          type="button"
          className="btn btn-primary ticket-action"
          onClick={async () => {
            const outcome = await shareOrDownload({
              url: result.image,
              filename: safeFilename,
              onFallback: (hint) => setDownloadHint(hint),
            });
            if (outcome === "downloaded") {
              window.setTimeout(() => setDownloadHint(null), 3200);
            }
          }}
        >
          <DownloadSimple size={16} /> 下载凭证图片
        </button>
        {downloadHint ? (
          <div className="download-hint">{downloadHint}</div>
        ) : null}
      </div>
    </section>
  );
}
