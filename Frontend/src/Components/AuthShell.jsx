import React, { useMemo } from "react";
import { Check } from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');`;

const STARS = Array.from({ length: 46 }, (_, i) => {
  const seed = i * 9973;
  const x = (seed % 997) / 997 * 100;
  const y = ((seed * 13) % 991) / 991 * 100;
  const r = 0.5 + ((seed * 7) % 100) / 100 * 1.1;
  return { x, y, r, id: i };
});

export function BirthWheel({ time, filled }) {
  const angle = useMemo(() => {
    if (!time) return -90;
    const [h, m] = time.split(":").map(Number);
    const decimal = h + m / 60;
    return (decimal / 24) * 360 - 90;
  }, [time]);

  const ticks = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bw-wrap">
      <svg viewBox="0 0 200 200" className="bw-svg" aria-hidden="true">
        <circle cx="100" cy="100" r="86" className="bw-ring-outer" />
        <circle cx="100" cy="100" r="62" className="bw-ring-inner" />
        {ticks.map((i) => {
          const a = (i / 24) * 2 * Math.PI;
          const major = i % 6 === 0;
          const r1 = major ? 70 : 78;
          const r2 = 86;
          const x1 = 100 + r1 * Math.cos(a);
          const y1 = 100 + r1 * Math.sin(a);
          const x2 = 100 + r2 * Math.cos(a);
          const y2 = 100 + r2 * Math.sin(a);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={major ? "bw-tick-major" : "bw-tick-minor"} />
          );
        })}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px" }} className="bw-hand-group">
          <line x1="100" y1="100" x2="100" y2="30" className="bw-hand" />
          <circle cx="100" cy="30" r="4.5" className="bw-hand-tip" />
        </g>
        <circle cx="100" cy="100" r="4" className="bw-center" />
        <circle
          cx={100 + 62 * Math.cos((3 / 4) * Math.PI)}
          cy={100 + 62 * Math.sin((3 / 4) * Math.PI)}
          r={filled ? 3.5 : 2}
          className={filled ? "bw-locus-filled" : "bw-locus"}
        />
      </svg>
      <div className="bw-readout">
        {time ? time : "— : —"}
        <span className="bw-readout-deg">{time ? `${Math.round(angle + 90)}°` : "awaiting time"}</span>
      </div>
    </div>
  );
}

export function Field({ label, error, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className={`field-box ${error ? "field-box-error" : ""}`}>{children}</div>
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

export function ProgressSteps({ step }) {
  const items = [
    { n: 1, label: "Account" },
    { n: 2, label: "Birth details" },
  ];
  return (
    <div className="progress" role="list">
      {items.map((it, i) => (
        <React.Fragment key={it.n}>
          <div className="progress-item" role="listitem">
            <span
              className={
                "progress-dot " +
                (step === it.n ? "progress-dot-active" : step > it.n ? "progress-dot-done" : "")
              }
            >
              {step > it.n ? <Check size={11} strokeWidth={3} /> : it.n}
            </span>
            <span className={"progress-label " + (step === it.n ? "progress-label-active" : "")}>
              {it.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className={"progress-line " + (step > it.n ? "progress-line-done" : "")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function Shell({ children }) {
  return (
    <div className="page">
      <style>{`
        ${FONT_IMPORT}
        .page {
          --bg-950: #0B0E1A; --bg-900: #12162A; --bg-850: #171C33;
          --border: #262B45; --border-soft: #1E2338;
          --gold: #C9A227; --gold-soft: #E4C878;
          --text: #F1EEE4; --muted: #8A8FA3; --error: #E2604F;
          min-height: 100vh; width: 100%;
          background: radial-gradient(ellipse 120% 80% at 50% -10%, #1B2140 0%, var(--bg-950) 55%);
          font-family: 'Inter', sans-serif; color: var(--text);
          display: flex; justify-content: center;
          padding: 56px 20px 64px; position: relative; overflow: hidden; box-sizing: border-box;
        }
        .page * { box-sizing: border-box; }
        .page::before {
          content: ''; position: absolute; inset: 0;
          background-image: ${STARS.map(
            (s) => `radial-gradient(${s.r}px ${s.r}px at ${s.x}% ${s.y}%, rgba(241,238,228,0.55), transparent)`
          ).join(",")};
          pointer-events: none;
        }
        .content { position: relative; width: 100%; max-width: 420px; display: flex; flex-direction: column; align-items: center; }
        .bw-wrap { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 8px; }
        .bw-svg { width: 128px; height: 128px; }
        .bw-ring-outer { fill: none; stroke: var(--border); stroke-width: 1; }
        .bw-ring-inner { fill: none; stroke: var(--border-soft); stroke-width: 1; }
        .bw-tick-major { stroke: var(--gold-soft); stroke-width: 1.6; }
        .bw-tick-minor { stroke: var(--border); stroke-width: 1; }
        .bw-hand-group { transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .bw-hand { stroke: var(--gold); stroke-width: 1.8; }
        .bw-hand-tip { fill: var(--gold); }
        .bw-center { fill: var(--text); }
        .bw-locus { fill: var(--border-soft); transition: r 0.3s ease; }
        .bw-locus-filled { fill: var(--gold-soft); transition: r 0.3s ease; }
        .bw-readout { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.03em; color: var(--muted); display: flex; gap: 8px; align-items: baseline; }
        .bw-readout-deg { color: var(--gold-soft); }
        .headline { font-family: 'Fraunces', serif; font-weight: 500; font-size: 27px; line-height: 1.25; text-align: center; margin: 4px 0 6px; letter-spacing: -0.01em; }
        .subcopy { font-size: 13.5px; line-height: 1.5; color: var(--muted); text-align: center; max-width: 340px; margin: 0 0 28px; }
        .tabs { display: flex; background: var(--bg-900); border: 1px solid var(--border); border-radius: 999px; padding: 3px; margin-bottom: 24px; width: 100%; max-width: 260px; }
        .tab { flex: 1; background: transparent; border: none; color: var(--muted); font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; padding: 8px 0; border-radius: 999px; cursor: pointer; text-decoration: none; text-align: center; display: block; transition: color 0.2s ease, background 0.2s ease; }
        .tab-active { background: var(--bg-850); color: var(--gold-soft); box-shadow: inset 0 0 0 1px var(--border); }
        .progress { display: flex; align-items: center; gap: 8px; width: 100%; margin-bottom: 22px; }
        .progress-item { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .progress-dot { width: 20px; height: 20px; border-radius: 50%; border: 1px solid var(--border); color: var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .progress-dot-active { border-color: var(--gold); color: var(--gold-soft); box-shadow: 0 0 0 3px rgba(201,162,39,0.14); }
        .progress-dot-done { background: var(--gold); border-color: var(--gold); color: #14101A; }
        .progress-label { font-size: 12.5px; color: var(--muted); white-space: nowrap; }
        .progress-label-active { color: var(--text); font-weight: 500; }
        .progress-line { flex: 1; height: 1px; background: var(--border); transition: background 0.2s ease; }
        .progress-line-done { background: var(--gold); }
        .form { width: 100%; display: flex; flex-direction: column; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .field-label { font-size: 12px; font-weight: 500; color: var(--muted); letter-spacing: 0.01em; }
        .field-box { display: flex; align-items: center; gap: 9px; background: var(--bg-900); border: 1px solid var(--border); border-radius: 10px; padding: 0 12px; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .field-box:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,162,39,0.14); }
        .field-box-error { border-color: var(--error); }
        .field-icon { color: var(--muted); flex-shrink: 0; }
        .input { flex: 1; background: transparent; border: none; outline: none; color: var(--text); font-family: 'Inter', sans-serif; font-size: 14px; padding: 11px 0; min-width: 0; }
        .input::placeholder { color: #565C77; }
        .input-mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }
        .input[type="date"], .input[type="time"] { color-scheme: dark; }
        .eye-btn { background: none; border: none; color: var(--muted); cursor: pointer; display: flex; padding: 4px; flex-shrink: 0; }
        .eye-btn:hover { color: var(--text); }
        .field-hint { font-size: 11.5px; color: #6B7190; line-height: 1.4; }
        .field-error { font-size: 11.5px; color: var(--error); }
        .divider { display: flex; align-items: baseline; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 18px; margin-top: 4px; }
        .divider span:first-child { font-family: 'Fraunces', serif; font-size: 14px; color: var(--gold-soft); }
        .divider-hint { font-size: 11px; color: var(--muted); }
        .submit-btn { margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, var(--gold-soft), var(--gold)); color: #14101A; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; border: none; border-radius: 10px; padding: 13px 0; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,162,39,0.25); }
        .submit-btn:active { transform: translateY(0); }
        .btn-row { display: flex; gap: 10px; margin-top: 6px; }
        .btn-row .submit-btn { margin-top: 0; flex: 1; }
        .back-btn { background: var(--bg-900); border: 1px solid var(--border); color: var(--muted); font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; border-radius: 10px; padding: 13px 20px; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
        .back-btn:hover { color: var(--text); border-color: var(--border-soft); }
        .switch-line { margin-top: 22px; font-size: 13px; color: var(--muted); }
        .link-btn { background: none; border: none; color: var(--gold-soft); font-weight: 500; font-size: inherit; cursor: pointer; padding: 0; text-decoration: underline; text-underline-offset: 2px; }
        .success-card { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; padding: 40px 8px; }
        .success-icon { width: 44px; height: 44px; border-radius: 50%; background: rgba(201,162,39,0.14); border: 1px solid var(--gold); color: var(--gold-soft); display: flex; align-items: center; justify-content: center; }
        .success-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500; }
        .success-copy { font-size: 13.5px; color: var(--muted); line-height: 1.6; max-width: 320px; }
        @media (prefers-reduced-motion: reduce) {
          .bw-hand-group { transition: none; }
          .submit-btn { transition: none; }
        }
      `}</style>
      <div className="content">{children}</div>
    </div>
  );
}
