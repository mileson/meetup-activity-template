import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react/ssr";
import ClaimSection from "./ClaimSection";

export default function ClaimPage() {
  return (
    <div className="page">
      <div className="claim-top">
        <Link className="back-link" href="/">
          <span className="back-icon">
            <CaretLeft size={16} />
          </span>
          <span>返回首页</span>
        </Link>
      </div>
      <ClaimSection />
    </div>
  );
}
