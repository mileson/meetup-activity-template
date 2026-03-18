"use client";

import type React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClockCountdown,
  MicrophoneStage,
  PlayCircle,
  User,
} from "@phosphor-icons/react/ssr";
import { reviewVideos } from "@/data/review";

const FALLBACK_VIDEO_HREF = "/";
const WAITING_MESSAGE = "即将上架，请耐心等待";

function handlePendingClick(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  window.alert(WAITING_MESSAGE);
}

export default function ReviewPage() {
  return (
    <div className="page review-page" id="top">
      <div className="claim-top review-top">
        <Link className="back-link" href="/">
          <span className="back-icon">
            <ArrowLeft size={16} />
          </span>
          返回主页
        </Link>
      </div>

      <div className="review-hero-wrap">
        <header className="review-hero review-hero-single">
          <div className="review-hero-main">
            <div className="review-kicker">AFTER THE EVENT</div>
            <h1 className="review-title">示例分享回顾</h1>
          </div>
        </header>
      </div>

      <section className="section review-section" id="videos">
        <div className="review-video-grid">
          {reviewVideos.map((video) => {
            const targetHref = video.href ?? FALLBACK_VIDEO_HREF;
            const slidesHref = video.slidesHref ?? FALLBACK_VIDEO_HREF;
            const hasVideo = Boolean(video.href);
            const hasSlides = Boolean(video.slidesHref);
            return (
              <article
                key={video.title}
                className={`review-video-card review-tone-${video.tone}`}
              >
                <div className="review-video-frame">
                  {hasVideo ? (
                    <Link
                      className="review-video-screen-link"
                      href={targetHref}
                      aria-label={`${video.speaker} ${video.title}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div
                        className={`review-video-screen${video.cover ? " review-video-screen-cover" : ""}`}
                        style={
                          video.cover
                            ? { backgroundImage: `linear-gradient(rgba(22, 20, 18, 0.16), rgba(22, 20, 18, 0.48)), url(${video.cover})` }
                            : undefined
                        }
                      >
                        <div className="review-video-overlay">
                          <div className="review-video-play">
                            <PlayCircle size={68} weight="fill" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="review-video-screen-link review-video-screen-button"
                      aria-label={`${video.speaker} ${video.title}`}
                      onClick={handlePendingClick}
                    >
                      <div
                        className={`review-video-screen${video.cover ? " review-video-screen-cover" : ""}`}
                        style={
                          video.cover
                            ? { backgroundImage: `linear-gradient(rgba(22, 20, 18, 0.16), rgba(22, 20, 18, 0.48)), url(${video.cover})` }
                            : undefined
                        }
                      >
                        <div className="review-video-overlay">
                          <div className="review-video-play">
                            <PlayCircle size={68} weight="fill" />
                          </div>
                        </div>
                      </div>
                    </button>
                  )}
                  {hasSlides || hasVideo ? (
                    <div className="review-video-actions">
                      {hasSlides ? (
                        <Link
                          className="review-video-action review-video-action-ghost"
                          href={slidesHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          看课件
                        </Link>
                      ) : null}
                      {hasVideo ? (
                        <Link
                          className="review-video-action review-video-action-primary"
                          href={targetHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          看视频
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="review-video-head">
                  <div>
                    <h3>{video.title}</h3>
                  </div>
                </div>

                <div className="review-video-meta">
                  <span>
                    <User size={16} />
                    {video.speaker}
                  </span>
                  <span>
                    <ClockCountdown size={16} />
                    {video.duration}
                  </span>
                  <span>
                    <MicrophoneStage size={16} />
                    主题分享
                  </span>
                </div>

                <div className="review-detail-block">
                  <div className="review-detail-label">主要内容</div>
                  <ul className="review-detail-list">
                    {video.keyPoints.map((item, pointIndex) => (
                      <li key={item} className="review-detail-item">
                        <span className="review-detail-number">
                          {pointIndex + 1}
                        </span>
                        <span className="review-detail-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
