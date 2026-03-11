import { useState } from "react";

const C = {
  bg: "#FDF0EE", dark: "#1A1A1A", grey: "#8A8A8A",
  muted: "#B0A8A5", amber: "#D4A853", blue: "#0077B5",
  green: "#5CB87A", red: "#C0392B", panel: "#F5E8E4", white: "#FFFFFF",
};

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const revenue = [5.3, 6.1, 7.5, 9.3, 11.2, 13.0, 13.8];
const response = [22, 20, 17, 14, 11, 9, 8];
const premium = [100, 118, 142, 172, 208, 248, 278];

// ── 1. EFFICIENCY DECAY BUBBLE CHART ─────────────────────────────
const BubbleChart = () => {
  const [hovered, setHovered] = useState(null);
  const W = 640, H = 400;
  const PAD = { l: 64, r: 40, t: 40, b: 56 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const xScale = v => PAD.l + ((v - 5) / 9) * iW;
  const yScale = v => PAD.t + iH - ((v - 80) / 210) * iH;
  const rScale = v => 10 + ((v - 6) / 18) * 44;

  const gridX = [6, 8, 10, 12, 14];
  const gridY = [100, 150, 200, 250, 300];

  return (
    <div style={{ background: C.bg, padding: "32px 36px", fontFamily: "'Georgia', serif", width: W + 72 }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: C.amber, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Visualization 1 — Efficiency Decay</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 4, lineHeight: 1.2 }}>The Bubble That Was Never Supposed to Shrink</div>
      <div style={{ fontSize: 12, color: C.grey, marginBottom: 20, fontStyle: "italic" }}>Bubble size = application response rate. As revenue grows, the bubble shrinks.</div>

      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <defs>
          {years.map((yr, i) => {
            const t = i / 6;
            const r = Math.round(0 + t * 192);
            const g = Math.round(119 - t * 100);
            const b = Math.round(181 - t * 160);
            return (
              <radialGradient key={yr} id={`bg${yr}`} cx="40%" cy="35%">
                <stop offset="0%" stopColor={`rgba(${r},${g},${b},0.5)`} />
                <stop offset="100%" stopColor={`rgba(${r},${g},${b},0.15)`} />
              </radialGradient>
            );
          })}
        </defs>

        {/* Grid */}
        {gridX.map(v => (
          <g key={v}>
            <line x1={xScale(v)} x2={xScale(v)} y1={PAD.t} y2={PAD.t + iH} stroke="#E8DDD9" strokeWidth={0.8} />
            <text x={xScale(v)} y={PAD.t + iH + 18} textAnchor="middle" fontSize={10} fill={C.grey}>${v}B</text>
          </g>
        ))}
        {gridY.map(v => (
          <g key={v}>
            <line x1={PAD.l} x2={PAD.l + iW} y1={yScale(v)} y2={yScale(v)} stroke="#E8DDD9" strokeWidth={0.8} />
            <text x={PAD.l - 10} y={yScale(v) + 4} textAnchor="end" fontSize={10} fill={C.grey}>{v}</text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={PAD.l + iW / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={C.grey} fontStyle="italic">LinkedIn Talent Solutions Revenue</text>
        <text x={14} y={PAD.t + iH / 2} textAnchor="middle" fontSize={11} fill={C.grey} fontStyle="italic" transform={`rotate(-90, 14, ${PAD.t + iH / 2})`}>Premium Growth Index</text>

        {/* Path connecting bubbles */}
        <path
          d={years.map((yr, i) => `${i === 0 ? "M" : "L"} ${xScale(revenue[i])} ${yScale(premium[i])}`).join(" ")}
          fill="none" stroke="#D0C8C6" strokeWidth={1.5} strokeDasharray="4,3" />

        {/* Bubbles — back to front (smallest last so they're on top) */}
        {[...years].sort((a, b) => {
          const ai = years.indexOf(a), bi = years.indexOf(b);
          return response[bi] - response[ai];
        }).map(yr => {
          const i = years.indexOf(yr);
          const cx = xScale(revenue[i]);
          const cy = yScale(premium[i]);
          const r = rScale(response[i]);
          const isHov = hovered === i;
          const t = i / 6;
          const rc = Math.round(0 + t * 192);
          const gc = Math.round(119 - t * 100);
          const bc = Math.round(181 - t * 160);
          return (
            <g key={yr} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <circle cx={cx} cy={cy} r={r} fill={`url(#bg${yr})`}
                stroke={`rgb(${rc},${gc},${bc})`} strokeWidth={isHov ? 2.5 : 1.5}
                style={{ cursor: "pointer", transition: "all 0.2s" }} />
              <text x={cx} y={cy - r - 6} textAnchor="middle" fontSize={10}
                fontWeight={700} fill={C.dark} style={{ pointerEvents: "none" }}>{yr}</text>
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize={isHov ? 13 : 10}
                fontWeight={700} fill={`rgb(${rc},${gc},${bc})`} style={{ pointerEvents: "none" }}>
                {response[i]}%
              </text>
              {isHov && (
                <g>
                  <rect x={cx + r + 6} y={cy - 30} width={130} height={62} rx={6}
                    fill={C.white} stroke="#E0D8D5" strokeWidth={1} />
                  <text x={cx + r + 14} y={cy - 14} fontSize={11} fontWeight={700} fill={C.dark}>Revenue: ${revenue[i]}B</text>
                  <text x={cx + r + 14} y={cy + 2} fontSize={11} fill={C.grey}>Premium idx: {premium[i]}</text>
                  <text x={cx + r + 14} y={cy + 18} fontSize={11} fill={C.red} fontWeight={700}>Response: {response[i]}%</text>
                </g>
              )}
            </g>
          );
        })}

        {/* 2022 annotation */}
        <line x1={xScale(revenue[3])} x2={xScale(revenue[3]) - 30} y1={yScale(premium[3]) - rScale(response[3]) - 10} y2={yScale(premium[3]) - rScale(response[3]) - 40}
          stroke={C.amber} strokeWidth={1} />
        <text x={xScale(revenue[3]) - 32} y={yScale(premium[3]) - rScale(response[3]) - 44} textAnchor="end" fontSize={9} fill={C.amber} fontStyle="italic">"clicked apply" label</text>
      </svg>

      <div style={{ marginTop: 12, padding: "10px 16px", background: C.panel, borderRadius: 6, borderLeft: `3px solid ${C.red}`, fontSize: 12, color: C.dark, fontStyle: "italic" }}>
        The bubble doesn't shrink because LinkedIn got worse. It shrinks because shrinking is what the incentive structure produces.
      </div>
      <div style={{ marginTop: 10, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Microsoft FY2024 Earnings · Greenhouse Benchmark 2024 · secondfurther.com</div>
    </div>
  );
};

// ── 2. CONNECTED SCATTER — SPIRAL OF DOOM ────────────────────────
const SpiralOfDoom = () => {
  const [hovered, setHovered] = useState(null);
  const W = 520, H = 420;
  const PAD = { l: 64, r: 48, t: 48, b: 56 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const xScale = v => PAD.l + ((v - 4.5) / 10.5) * iW;
  const yScale = v => PAD.t + iH - ((v - 5) / 20) * iH;

  const points = years.map((yr, i) => ({ x: xScale(revenue[i]), y: yScale(response[i]), yr, rev: revenue[i], resp: response[i], i }));

  return (
    <div style={{ background: C.bg, padding: "32px 36px", fontFamily: "'Georgia', serif", width: W + 72 }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: C.amber, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Visualization 2 — Spiral of Doom</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 4, lineHeight: 1.2 }}>Every Dollar of Revenue Has a Cost</div>
      <div style={{ fontSize: 12, color: C.grey, marginBottom: 20, fontStyle: "italic" }}>Direct plot: Revenue vs Response Rate. Path shows the seven-year trajectory. No other variables.</div>

      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.blue} />
            <stop offset="100%" stopColor={C.red} />
          </linearGradient>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={C.red} />
          </marker>
        </defs>

        {/* Grid */}
        {[6, 8, 10, 12, 14].map(v => (
          <g key={v}>
            <line x1={xScale(v)} x2={xScale(v)} y1={PAD.t} y2={PAD.t + iH} stroke="#E8DDD9" strokeWidth={0.8} />
            <text x={xScale(v)} y={PAD.t + iH + 18} textAnchor="middle" fontSize={10} fill={C.grey}>${v}B</text>
          </g>
        ))}
        {[8, 12, 16, 20, 24].map(v => (
          <g key={v}>
            <line x1={PAD.l} x2={PAD.l + iW} y1={yScale(v)} y2={yScale(v)} stroke="#E8DDD9" strokeWidth={0.8} />
            <text x={PAD.l - 10} y={yScale(v) + 4} textAnchor="end" fontSize={10} fill={C.grey}>{v}%</text>
          </g>
        ))}

        {/* Axes labels */}
        <text x={PAD.l + iW / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={C.grey} fontStyle="italic">LinkedIn Revenue ($B)</text>
        <text x={12} y={PAD.t + iH / 2} textAnchor="middle" fontSize={11} fill={C.grey} fontStyle="italic" transform={`rotate(-90, 12, ${PAD.t + iH / 2})`}>Response Rate (%)</text>

        {/* Connected path with gradient */}
        {points.slice(0, -1).map((p, i) => {
          const next = points[i + 1];
          const t = i / 5;
          const r = Math.round(0 + t * 192);
          const g = Math.round(119 - t * 100);
          const b = Math.round(181 - t * 160);
          return (
            <line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y}
              stroke={`rgb(${r},${g},${b})`} strokeWidth={3}
              markerEnd={i === points.length - 2 ? "url(#arrowhead)" : undefined} />
          );
        })}

        {/* Points */}
        {points.map((p, i) => {
          const t = i / 6;
          const r = Math.round(0 + t * 192);
          const g = Math.round(119 - t * 100);
          const b = Math.round(181 - t * 160);
          const isHov = hovered === i;
          return (
            <g key={p.yr} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <circle cx={p.x} cy={p.y} r={isHov ? 9 : 6}
                fill={`rgb(${r},${g},${b})`} stroke={C.bg} strokeWidth={2}
                style={{ cursor: "pointer", transition: "r 0.15s" }} />
              <text x={p.x + (i < 3 ? -12 : 12)} y={p.y - 10}
                textAnchor={i < 3 ? "end" : "start"} fontSize={11} fontWeight={700} fill={C.dark}>{p.yr}</text>
              {isHov && (
                <g>
                  <rect x={p.x + 12} y={p.y - 34} width={136} height={56} rx={6}
                    fill={C.white} stroke="#E0D8D5" strokeWidth={1} />
                  <text x={p.x + 20} y={p.y - 18} fontSize={11} fontWeight={700} fill={C.dark}>Revenue: ${p.rev}B</text>
                  <text x={p.x + 20} y={p.y - 2} fontSize={11} fill={C.red} fontWeight={700}>Response: {p.resp}%</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Start / End labels */}
        <text x={points[0].x - 14} y={points[0].y - 14} fontSize={10} fill={C.green} fontWeight={700}>START</text>
        <text x={points[6].x + 14} y={points[6].y + 18} fontSize={10} fill={C.red} fontWeight={700}>NOW →</text>
      </svg>

      <div style={{ marginTop: 12, padding: "10px 16px", background: C.panel, borderRadius: 6, borderLeft: `3px solid ${C.red}`, fontSize: 12, color: C.dark, fontStyle: "italic" }}>
        The path only moves in one direction. There is no year where both numbers improved simultaneously.
      </div>
      <div style={{ marginTop: 10, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Microsoft FY2024 Earnings · Greenhouse Benchmark 2024 · secondfurther.com</div>
    </div>
  );
};

// ── 3. RECRUITER FUNNEL ───────────────────────────────────────────
const RecruiterFunnel = () => {
  const W = 620, H = 380;
  const PAD = { l: 56, r: 48, t: 44, b: 54 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const xScale = i => PAD.l + (i / 6) * iW;
  const yScaleVol = v => PAD.t + iH - (v / 500) * iH;

  const appVolume = [180, 220, 280, 350, 420, 470, 500];
  const hiredChannel = [40, 38, 34, 28, 22, 18, 16];
  const premiumBand = [55, 62, 72, 80, 90, 96, 100];

  const areaPath = (data, yFn, base) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yFn(v)}`).join(" ") +
    ` L ${xScale(6)} ${base} L ${xScale(0)} ${base} Z`;

  const linePath = (data, yFn) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yFn(v)}`).join(" ");

  return (
    <div style={{ background: C.bg, padding: "32px 36px", fontFamily: "'Georgia', serif", width: W + 72 }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: C.amber, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Visualization 3 — Volume vs. Outcome</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 4, lineHeight: 1.2 }}>The Flood and the Drain</div>
      <div style={{ fontSize: 12, color: C.grey, marginBottom: 20, fontStyle: "italic" }}>Application volume explodes. The hired channel flatlines. The gap between them is the product.</div>

      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.blue} stopOpacity="0.22" />
            <stop offset="100%" stopColor={C.blue} stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="premGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.amber} stopOpacity="0.35" />
            <stop offset="100%" stopColor={C.amber} stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[100, 200, 300, 400, 500].map(v => (
          <g key={v}>
            <line x1={PAD.l} x2={PAD.l + iW} y1={yScaleVol(v)} y2={yScaleVol(v)}
              stroke="#E8DDD9" strokeWidth={0.8} />
            <text x={PAD.l - 8} y={yScaleVol(v) + 4} textAnchor="end" fontSize={9.5} fill={C.grey}>{v}</text>
          </g>
        ))}

        {/* Application volume flood */}
        <path d={areaPath(appVolume, yScaleVol, PAD.t + iH)} fill="url(#volGrad)" />
        <path d={linePath(appVolume, yScaleVol)} fill="none"
          stroke={C.blue} strokeWidth={2.5} strokeLinecap="round" />

        {/* Premium band */}
        <path d={areaPath(premiumBand, yScaleVol, PAD.t + iH)} fill="url(#premGrad)" />
        <path d={linePath(premiumBand, yScaleVol)} fill="none"
          stroke={C.amber} strokeWidth={1.8} strokeDasharray="5,3" />

        {/* Hired channel — the flat red line at the bottom */}
        <path d={linePath(hiredChannel, yScaleVol)} fill="none"
          stroke={C.red} strokeWidth={3} strokeLinecap="round" />
        {hiredChannel.map((v, i) => (
          <circle key={i} cx={xScale(i)} cy={yScaleVol(v)} r={4}
            fill={C.red} stroke={C.bg} strokeWidth={2} />
        ))}

        {/* Gap annotation */}
        <line x1={xScale(6)} x2={xScale(6)} y1={yScaleVol(hiredChannel[6])} y2={yScaleVol(appVolume[6])}
          stroke="#D0C8C6" strokeWidth={1} strokeDasharray="3,2" />
        <text x={xScale(6) + 8} y={(yScaleVol(hiredChannel[6]) + yScaleVol(appVolume[6])) / 2}
          fontSize={10} fill={C.dark} fontWeight={700} fontStyle="italic">GAP</text>

        {/* End labels */}
        <text x={xScale(6) + 8} y={yScaleVol(appVolume[6]) + 4} fontSize={10} fill={C.blue} fontWeight={700}>500</text>
        <text x={xScale(6) + 8} y={yScaleVol(hiredChannel[6]) + 4} fontSize={10} fill={C.red} fontWeight={700}>16</text>

        {/* X axis */}
        {years.map((yr, i) => (
          <text key={yr} x={xScale(i)} y={PAD.t + iH + 20} textAnchor="middle" fontSize={10} fill={C.grey}>{yr}</text>
        ))}
        <text x={PAD.l + iW / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={C.grey} fontStyle="italic">Year</text>

        {/* Legend */}
        {[
          { color: C.blue, dash: false, label: "Total applications (indexed)" },
          { color: C.amber, dash: true, label: "Premium applicant band" },
          { color: C.red, dash: false, label: "Successful hires (indexed)" },
        ].map(({ color, dash, label }, i) => (
          <g key={i} transform={`translate(${PAD.l + i * 195}, ${PAD.t - 22})`}>
            <line x1={0} y1={6} x2={28} y2={6} stroke={color} strokeWidth={2.5}
              strokeDasharray={dash ? "5,3" : undefined} />
            <text x={34} y={10} fontSize={10} fill={C.grey}>{label}</text>
          </g>
        ))}
      </svg>

      <div style={{ marginTop: 12, padding: "10px 16px", background: C.panel, borderRadius: 6, borderLeft: `3px solid ${C.blue}`, fontSize: 12, color: C.dark, fontStyle: "italic" }}>
        More applications. Same number of jobs. The gap is not a bug — it is the mechanism.
      </div>
      <div style={{ marginTop: 10, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Resume Builder 2024 · LinkedIn dataset 2025 · secondfurther.com</div>
    </div>
  );
};

// ── 4. POLAR BLOOM (NIGHTINGALE) ─────────────────────────────────
const PolarBloom = () => {
  const cx = 280, cy = 250, maxR = 200;

  const segments = years.map((yr, i) => {
    const angleStart = (i / 7) * Math.PI * 2 - Math.PI / 2;
    const angleEnd = ((i + 1) / 7) * Math.PI * 2 - Math.PI / 2;
    const r = (revenue[i] / 13.8) * maxR;

    const t = 1 - (response[i] - 6) / 18;
    const rC = Math.round(92 + t * 100);
    const gC = Math.round(184 - t * 130);
    const bC = Math.round(122 - t * 90);
    const color = `rgb(${rC},${gC},${bC})`;

    const x1 = cx + Math.cos(angleStart) * 18;
    const y1 = cy + Math.sin(angleStart) * 18;
    const x2 = cx + Math.cos(angleStart) * r;
    const y2 = cy + Math.sin(angleStart) * r;
    const x3 = cx + Math.cos(angleEnd) * r;
    const y3 = cy + Math.sin(angleEnd) * r;
    const x4 = cx + Math.cos(angleEnd) * 18;
    const y4 = cy + Math.sin(angleEnd) * 18;

    const midAngle = (angleStart + angleEnd) / 2;
    const labelR = r + 22;
    const lx = cx + Math.cos(midAngle) * labelR;
    const ly = cy + Math.sin(midAngle) * labelR;

    return { yr, r, color, x1, y1, x2, y2, x3, y3, x4, y4, lx, ly, midAngle, i, resp: response[i], rev: revenue[i] };
  });

  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: C.bg, padding: "32px 36px", fontFamily: "'Georgia', serif", width: 640 }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: C.amber, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Visualization 4 — Polar Bloom</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 4, lineHeight: 1.2 }}>Blooming Financially. Wilting Functionally.</div>
      <div style={{ fontSize: 12, color: C.grey, marginBottom: 8, fontStyle: "italic" }}>Petal length = revenue. Petal colour = response rate. Green → Red = efficiency dying.</div>

      <svg width={560} height={500} style={{ overflow: "visible" }}>
        {/* Radial grid rings */}
        {[0.25, 0.5, 0.75, 1.0].map(t => (
          <circle key={t} cx={cx} cy={cy} r={t * maxR}
            fill="none" stroke="#E8DDD9" strokeWidth={0.8} />
        ))}
        {[0.25, 0.5, 0.75, 1.0].map(t => (
          <text key={t} x={cx + 4} y={cy - t * maxR - 4} fontSize={8.5}
            fill={C.muted}>${(13.8 * t).toFixed(1)}B</text>
        ))}

        {/* Petals */}
        {segments.map(s => {
          const isHov = hovered === s.i;
          return (
            <g key={s.yr}
              onMouseEnter={() => setHovered(s.i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}>
              <path
                d={`M ${s.x1} ${s.y1} L ${s.x2} ${s.y2} A ${s.r} ${s.r} 0 0 1 ${s.x3} ${s.y3} L ${s.x4} ${s.y4} Z`}
                fill={s.color}
                opacity={isHov ? 1 : 0.82}
                stroke={C.bg}
                strokeWidth={2}
                style={{ transition: "opacity 0.2s" }}
              />
              <text x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="middle"
                fontSize={isHov ? 13 : 11} fontWeight={700} fill={C.dark}>{s.yr}</text>
              {isHov && (
                <g>
                  <rect x={cx - 70} y={cy - 38} width={140} height={68} rx={8}
                    fill={C.white} stroke="#E0D8D5" strokeWidth={1} />
                  <text x={cx} y={cy - 18} textAnchor="middle" fontSize={13} fontWeight={800} fill={C.dark}>{s.yr}</text>
                  <text x={cx} y={cy + 0} textAnchor="middle" fontSize={11} fill={C.blue}>Revenue: ${s.rev}B</text>
                  <text x={cx} y={cy + 17} textAnchor="middle" fontSize={11} fill={s.color} fontWeight={700}>Response: {s.resp}%</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Centre dot */}
        <circle cx={cx} cy={cy} r={10} fill={C.dark} />

        {/* Colour legend */}
        <defs>
          <linearGradient id="legendGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.green} />
            <stop offset="100%" stopColor={C.red} />
          </linearGradient>
        </defs>
        <rect x={60} y={460} width={180} height={10} rx={5} fill="url(#legendGrad)" />
        <text x={60} y={484} fontSize={9.5} fill={C.green} fontWeight={700}>High response (22%)</text>
        <text x={240} y={484} fontSize={9.5} fill={C.red} fontWeight={700} textAnchor="end">Low response (8%)</text>
        <text x={340} y={470} fontSize={10} fill={C.grey} fontStyle="italic">Hover each petal for data</text>
      </svg>

      <div style={{ marginTop: 4, padding: "10px 16px", background: C.panel, borderRadius: 6, borderLeft: `3px solid ${C.amber}`, fontSize: 12, color: C.dark, fontStyle: "italic" }}>
        Every petal grows. Every petal reddens. The flower has never looked bigger. The function has never been worse.
      </div>
      <div style={{ marginTop: 10, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Microsoft FY2024 Earnings · Greenhouse Benchmark 2024 · secondfurther.com</div>
    </div>
  );
};

// ── MAIN ─────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(0);
  const tabs = [
    { label: "Efficiency Decay", sub: "Bubble" },
    { label: "Spiral of Doom", sub: "Scatter" },
    { label: "Flood & Drain", sub: "Funnel" },
    { label: "Polar Bloom", sub: "Nightingale" },
  ];
  const views = [<BubbleChart />, <SpiralOfDoom />, <RecruiterFunnel />, <PolarBloom />];

  return (
    <div style={{ background: "#E8E0DC", minHeight: "100vh", padding: "28px 24px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: 4, fontSize: 11, letterSpacing: 3, color: C.amber, fontWeight: 700, textTransform: "uppercase" }}>SecondFurther · Visualization Review</div>
      <div style={{ marginBottom: 20, fontSize: 14, color: C.grey }}>Hover over data points for details</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map((t, i) => (
          <button key={t.label} onClick={() => setActive(i)} style={{
            padding: "9px 20px", borderRadius: 20, border: "none", cursor: "pointer",
            background: active === i ? C.dark : C.white,
            color: active === i ? C.white : C.grey,
            fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
            fontFamily: "sans-serif", transition: "all 0.15s",
            boxShadow: active === i ? "0 2px 12px rgba(0,0,0,0.15)" : "none",
          }}>
            {t.label} <span style={{ opacity: 0.6, fontSize: 10 }}>· {t.sub}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "inline-block", boxShadow: "0 8px 48px rgba(0,0,0,0.12)", borderRadius: 4 }}>
        {views[active]}
      </div>
    </div>
  );
}