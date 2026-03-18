"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, SpinnerGap, XCircle } from "@phosphor-icons/react";

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

export default function CheckClient() {
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
        setMessage("请放行，并引导进入会场");
      } catch {
        setStatus("invalid");
        setMessage("网络异常，请稍后再试");
      }
    };

    run();
  }, [hasRequiredParams, name, submitter]);

  const displayStatus = hasRequiredParams ? status : "missing";
  const displayMessage = hasRequiredParams ? message : "二维码参数缺失或无效";
  const isValid = displayStatus === "valid";

  return (
    <section className="verify-card" aria-live="polite">
      <div
        className={`verify-icon ${
          displayStatus === "loading"
            ? "verify-loading"
            : isValid
            ? "verify-ok"
            : "verify-bad"
        }`}
      >
        {displayStatus === "loading" ? (
          <SpinnerGap size={64} className="spin" />
        ) : isValid ? (
          <CheckCircle size={64} />
        ) : (
          <XCircle size={64} />
        )}
      </div>
      <div className="verify-title">
        {displayStatus === "loading"
          ? "核验中"
          : isValid
          ? "有效凭证"
          : "无效凭证"}
      </div>
      <div className="verify-sub">
        {displayStatus === "loading" ? "请稍候" : displayMessage}
      </div>
      <div className="verify-detail">
        <div>
          姓名：
          <span className="name-pill">{name || "-"}</span>
        </div>
      </div>
    </section>
  );
}
