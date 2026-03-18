"use client";

import Image from "next/image";
import { DownloadSimple, LinkSimple, X } from "@phosphor-icons/react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { buildDownloadFilename, shareOrDownload } from "@/app/lib/share";
import ClaimForm from "./ClaimForm";

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

const steps = [
  "填写姓名或报名提交人",
  "点击领取生成入场凭证",
  "下载图片或收藏凭证链接",
  "参加现场需通过该凭证入场",
];

export default function ClaimSection() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyOk["attendee"] | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [downloadHint, setDownloadHint] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const safeFilename = useMemo(() => {
    if (!result?.image) {
      return "入场凭证.png";
    }
    return buildDownloadFilename(result.name, result.image);
  }, [result]);

  const handleDownload = async () => {
    if (!result) return;
    setDownloadHint(null);
    const outcome = await shareOrDownload({
      url: result.image,
      filename: safeFilename,
      onFallback: (message) => setDownloadHint(message),
    });
    if (outcome === "downloaded") {
      window.setTimeout(() => setDownloadHint(null), 3200);
    }
  };

  useEffect(() => {
    if (!showReward) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showReward]);

  useEffect(() => {
    if (result) {
      setShowReward(true);
    }
  }, [result]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setError("请填写姓名或报名提交人");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: trimmedKeyword,
        }),
      });

      const data = (await response.json()) as VerifyResponse;

      if (!response.ok || !data.ok) {
        setError(data.ok ? "验证失败" : data.message);
        return;
      }

      setResult(data.attendee);
    } catch {
      setError("网络异常，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="claim-steps">
        {steps.map((item, index) => (
          <div key={item} className="claim-step">
            <span className="step-index">{index + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <section className="claim-wrapper claim-wrapper-single">
        <ClaimForm
          keyword={keyword}
          loading={loading}
          error={error}
          onChange={setKeyword}
          onSubmit={handleSubmit}
        />
      </section>
      {showReward && result ? (
        <LazyMotion features={domAnimation}>
          <m.div
            className="reward-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowReward(false)}
          >
            {!prefersReducedMotion && (
              <m.div
                className="reward-halo"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <m.div
              className="reward-modal"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { clipPath: "circle(0% at 50% 50%)", opacity: 0.85 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { clipPath: "circle(150% at 50% 50%)", opacity: 1 }
              }
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="reward-close"
                onClick={() => setShowReward(false)}
                aria-label="关闭弹窗"
              >
                <X size={16} />
              </button>
              <h3 className="reward-title">恭喜获得入场凭证</h3>
              <p className="reward-sub">下载或查看凭证，入场时出示即可。</p>
              <div className="reward-card" aria-label="入场凭证奖励展示">
                <Image
                  src={result.image}
                  alt={`${result.name} 入场凭证`}
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  priority
                />
              </div>
              <div className="reward-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDownload}
                >
                  <DownloadSimple size={16} /> 下载凭证
                </button>
                <a
                  className="ticket-link ticket-link-cta"
                  href={`/ticket?name=${encodeURIComponent(
                    result.name
                  )}&submitter=${encodeURIComponent(result.submitter)}`}
                >
                  <LinkSimple size={16} /> 查看凭证
                </a>
              </div>
              {downloadHint ? (
                <div className="download-hint">{downloadHint}</div>
              ) : null}
            </m.div>
          </m.div>
        </LazyMotion>
      ) : null}
    </>
  );
}
