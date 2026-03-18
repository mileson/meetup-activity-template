"use client";

import { Clock, MapPin } from "@phosphor-icons/react";
import { useCallback, useMemo } from "react";

type MetaCardsProps = {
  timeLines: string[];
  venueLines: string[];
  city: string;
};

const buildAppleMapLink = (query: string) =>
  `https://maps.apple.com/?q=${encodeURIComponent(query)}`;

const buildGeoFallbackLink = (query: string) =>
  `geo:0,0?q=${encodeURIComponent(query)}`;

const buildAmapUniversalLink = (query: string, city: string) =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(
    query
  )}&city=${encodeURIComponent(city)}&src=ai-coding-friends&coordinate=gaode&callnative=1`;

export default function MetaCards({ timeLines, venueLines, city }: MetaCardsProps) {
  const query = useMemo(
    () => `${city} ${venueLines.join(" ")}`,
    [city, venueLines]
  );

  const mapHref = useMemo(
    () => buildAmapUniversalLink(query, city),
    [city, query]
  );

  const handleOpenMap = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const ua = navigator.userAgent || "";
      const isIOS = /iPad|iPhone|iPod/i.test(ua);
      const primaryUrl = buildAmapUniversalLink(query, city);
      const fallbackUrl = isIOS
        ? buildAppleMapLink(query)
        : buildGeoFallbackLink(query);

      const fallbackTimer = window.setTimeout(() => {
        if (!document.hidden) {
          window.location.assign(fallbackUrl);
        }
      }, 900);

      window.addEventListener(
        "pagehide",
        () => window.clearTimeout(fallbackTimer),
        { once: true }
      );

      window.location.assign(primaryUrl);
    },
    [city, query]
  );

  const locationLines = useMemo(
    () => [`${city} · ${venueLines[0]}`, ...venueLines.slice(1)],
    [city, venueLines]
  );

  return (
    <div className="meta-grid">
      <div className="meta-card">
        <div className="meta-value">
          <span className="meta-primary">{timeLines[0]}</span>
          {timeLines.slice(1).map((line) => (
            <span key={line} className="meta-secondary">
              {line}
            </span>
          ))}
        </div>
        <div className="meta-label">
          <span className="meta-icon">
            <Clock size={18} />
          </span>
          <span>时间</span>
        </div>
      </div>

      <a
        className="meta-card meta-card-link"
        href={mapHref}
        aria-label="打开地图导航"
        onClick={handleOpenMap}
      >
        <div className="meta-value">
          <span className="meta-primary">{locationLines[0]}</span>
          {locationLines.slice(1).map((line) => (
            <span key={line} className="meta-secondary">
              {line}
            </span>
          ))}
        </div>
        <div className="meta-label">
          <span className="meta-icon">
            <MapPin size={18} />
          </span>
          <span>地点</span>
        </div>
      </a>
    </div>
  );
}
