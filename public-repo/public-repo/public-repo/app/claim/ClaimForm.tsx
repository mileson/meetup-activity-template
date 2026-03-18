import { IdentificationCard } from "@phosphor-icons/react";

type ClaimFormProps = {
  keyword: string;
  loading: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function ClaimForm({
  keyword,
  loading,
  error,
  onChange,
  onSubmit,
}: ClaimFormProps) {
  return (
    <div className="form-card">
      <div className="section-title">领取入场凭证</div>
      <form className="form-grid" onSubmit={onSubmit}>
        <div className="input-group">
          <label className="label" htmlFor="keyword">
            <IdentificationCard size={16} /> 姓名 / 报名提交人
          </label>
          <input
            id="keyword"
            className="input"
            placeholder="例如：示例用户 A 或 demo-a"
            value={keyword}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "正在验证..." : "领取凭证"}
        </button>
        <div className="helper">
          开源版默认提供 demo 名单，你可以将其替换为自己的参会数据
        </div>
      </form>

      {error ? (
        <div className="alert" role="alert" aria-live="polite">
          {error}
        </div>
      ) : null}
    </div>
  );
}
