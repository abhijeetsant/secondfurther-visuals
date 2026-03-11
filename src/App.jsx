import { useState } from "react";

// Add this inside the App() function, after useState declarations:
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if (tabParam) {
    const idx = allTabs.findIndex(t => 
      t.label.toLowerCase().replace(/\s+/g,'-') === tabParam
    );
    if (idx >= 0) setActive(idx);
  }
}, []);

// ── Cold Press palette — guide v1.0 ──────────────────────────────
const C = {
  bg:      "#F5F2EC",  // Parchment
  dark:    "#0D0D0D",  // Ink
  amber:   "#9A7B3A",  // Amber (light bg) — only accent
  amberLt: "#C9A84C",  // Amber (dark bg)
  grey:    "#888888",  // Midtone
  rule:    "#D8D4CC",  // Dividers
  panel:   "#EDE9E1",  // Parchment-2
  white:   "#FFFFFF",
  ink2:    "#1E1E1E",  // Ink-soft (dark panels)
  muted:   "#B0A8A0",
  amberDim:"#7A6030",  // Amber-muted (low score)
  paper:   "#F9F5EE", paperMid:"#F0EAE0", paperDark:"#E8E0D0",
};

const years = [2019,2020,2021,2022,2023,2024,2025];
const revenue = [5.3,6.1,7.5,9.3,11.2,13.0,13.8];
const response = [22,20,17,14,11,9,8];
const premium = [100,118,142,172,208,248,278];


// ══════════════════════════════════════════════════════════════════
//  KAY'S RECEIPT — Brand palette · Physical fidelity · Scallop tear
// ══════════════════════════════════════════════════════════════════
const KayReceipt = () => {
  const W = 340;

  // ── Scalloped tear using SVG evenodd fill-rule ─────────────────
  // Circles punched along the tear line create real semicircular holes
  const numHoles = 20;
  const holeR    = 8;           // radius — deliberately large for drama
  const stripH   = holeR + 8;  // strip height (only top half of circles visible)

  const circlesPath = Array.from({ length: numHoles }, (_, i) => {
    const cx = (W / numHoles) * (i + 0.5);
    const cy = stripH; // centre ON the bottom edge → only top semicircle visible
    // Full circle as two arcs (required for evenodd subtract)
    return `M ${cx - holeR} ${cy} a ${holeR} ${holeR} 0 1 0 ${holeR * 2} 0 a ${holeR} ${holeR} 0 1 0 ${-holeR * 2} 0`;
  }).join(" ");

  // Outer rect minus circles = paper with punched holes
  const tearPath = `M 0 0 L ${W} 0 L ${W} ${stripH} L 0 ${stripH} Z ${circlesPath}`;

  // ── Divider ────────────────────────────────────────────────────
  const HR = ({ style = "solid", my = 16 }) => (
    <div style={{
      borderTop: style === "dashed"
        ? `1.5px dashed rgba(180,140,60,0.35)`
        : `1px solid rgba(180,140,60,0.22)`,
      margin: `${my}px 0`,
    }} />
  );

  // ── Line item ─────────────────────────────────────────────────
  const Item = ({ category, label, value, valColor = C.ink, valSize = 22, note }) => (
    <div style={{ marginBottom: 16 }}>
      {category && (
        <div style={{
          fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
          color: C.amber, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 3,
        }}>{category}</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#4A3C28", letterSpacing: 0.3, fontFamily: "sans-serif", lineHeight: 1.3 }}>
          {label}
        </div>
        <div style={{ fontSize: valSize, fontWeight: 900, color: valColor, fontFamily: "'Courier New', monospace", letterSpacing: -0.5, lineHeight: 1, flexShrink: 0 }}>
          {value}
        </div>
      </div>
      {note && <div style={{ fontSize: 10, color: C.muted, fontStyle: "italic", marginTop: 2, fontFamily: "sans-serif" }}>{note}</div>}
    </div>
  );

  return (
    /* ── Scene: dark warm matte surface ─────────────────────────── */
    <div style={{
      background: "radial-gradient(ellipse at 58% 22%, #2E2418 0%, #1C160E 55%, #0E0A06 100%)",
      padding: "72px 92px 80px",
      width: 680, minHeight: 700,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      position: "relative",
      fontFamily: "sans-serif",
    }}>
      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.018, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23fff'/%3E%3C/svg%3E\")",
      }} />

      {/* ── Paper ─────────────────────────────────────────────── */}
      <div style={{
        width: W, position: "relative",
        background: `linear-gradient(158deg, #FEFBF4 0%, ${C.paper} 40%, ${C.paperMid} 75%, ${C.paperDark} 100%)`,
        borderRadius: "2px 2px 0 0",
        boxShadow: [
          "-10px 14px 44px rgba(0,0,0,0.78)",
          "-4px  6px  12px rgba(0,0,0,0.46)",
          " 4px -4px  16px rgba(212,168,83,0.08)",
          "inset -2px 0 0 rgba(0,0,0,0.04)",
          "inset  0 -1px 0 rgba(0,0,0,0.06)",
        ].join(", "),
      }}>
        {/* Top-right warm sheen (light source) */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "52%", height: "28%",
          background: "linear-gradient(222deg, rgba(220,180,90,0.12) 0%, transparent 60%)",
          borderRadius: "0 2px 0 0", pointerEvents: "none",
        }} />
        {/* Left-edge depth shadow */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 16,
          background: "linear-gradient(to right, rgba(0,0,0,0.09), transparent)",
          pointerEvents: "none",
        }} />

        {/* ── Content ──────────────────────────────────────────── */}
        <div style={{ padding: "28px 26px 22px", position: "relative" }}>

          {/* Top amber rule */}
          <div style={{ height: 2.5, background: C.amber, marginBottom: 22, borderRadius: 1 }} />

          {/* Brand header */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{
              fontSize: 9, letterSpacing: 4, color: C.amber,
              textTransform: "uppercase", fontFamily: "'Courier New', monospace", marginBottom: 12,
            }}>
              SECONDFURTHER · PLATFORM AUDIT
            </div>
            <div style={{
              fontSize: 34, fontWeight: 900, color: C.ink,
              letterSpacing: 3, textTransform: "uppercase",
              fontFamily: "'Arial Black', Impact, sans-serif",
              lineHeight: 1, marginBottom: 8,
            }}>
              KAY
            </div>
            <div style={{
              fontSize: 11, color: "#6A5840", letterSpacing: 0.5,
              fontFamily: "sans-serif", fontWeight: 600,
            }}>
              ML Engineer · 3 YOE · MSc · Premium Subscriber
            </div>
            <div style={{ fontSize: 9.5, color: C.muted, marginTop: 5, fontFamily: "'Courier New', monospace", letterSpacing: 0.4 }}>
              CASE: K-7721 · PERIOD: FEB – AUG 2025
            </div>
          </div>

          <HR style="dashed" />

          {/* Section — Activity */}
          <Item category="Activity" label="Applications sent" value="141" note="Over 6 months" />
          <Item label="Responses received"   value="33"  note="23% of applications" />
          <Item label="First-round interviews" value="02" note="6% of responses"    />

          <HR />

          {/* Section — Cost */}
          <Item category="Cost" label="LinkedIn Premium (6 mo.)" value="$240" valColor={C.amber} valSize={20} />
          <Item label={`"Top applicant" signals purchased`} value="6×" valColor="#7A6030" valSize={18} note="Undefined criteria — no outcome correlation" />

          <HR />

          {/* Section — Platform context */}
          <Item category="Platform Context" label="Ghost listing rate (est.)" value="27%" valColor="#8A5030" valSize={18} note="Listings with no active hire intent" />

          <HR style="dashed" my={20} />

          {/* Outcome box — the verdict */}
          <div style={{
            border: `2px solid ${C.amber}`,
            padding: "14px 18px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "rgba(212,168,83,0.05)",
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, color: C.ink, letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 4 }}>
                Outcome Rate
              </div>
              <div style={{ fontSize: 10, color: C.muted, fontStyle: "italic", fontFamily: "sans-serif" }}>
                Interviews ÷ Applications
              </div>
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: C.amberDim, fontFamily: "'Courier New', monospace", letterSpacing: -2, lineHeight: 1 }}>
              1.4%
            </div>
          </div>

          <HR my={18} />

          {/* Footer */}
          <div style={{ textAlign: "center" }}>
            {/* Barcode */}
            <div style={{ display: "flex", justifyContent: "center", gap: 1.5, alignItems: "flex-end", marginBottom: 8 }}>
              {[2,1,3,1,2,1,3,2,1,1,3,1,2,3,1,2,1,2,3,2,1,2,1,3,1,2].map((h, i) => (
                <div key={i} style={{ width: h === 1 ? 1 : h === 2 ? 1.5 : 2.5, height: h * 5 + 6, background: "rgba(42,32,24,0.5)" }} />
              ))}
            </div>
            <div style={{ fontSize: 8, color: C.muted, fontFamily: "'Courier New', monospace", letterSpacing: 2, marginBottom: 10 }}>
              SF-2025-LI-K7721
            </div>
            <div style={{ fontSize: 9.5, color: C.muted, fontFamily: "sans-serif", lineHeight: 1.7, letterSpacing: 0.2 }}>
              "Kay" is a composite built from primary research.<br />
              All numbers are real. · secondfurther.com
            </div>
          </div>

          {/* Bottom amber rule */}
          <div style={{ height: 2.5, background: C.amber, marginTop: 20, borderRadius: 1 }} />
        </div>

        {/* ── Scalloped tear — SVG evenodd punch-through ────────── */}
        {/* overflow:hidden clips the bottom halves of circles = clean semicircular notches */}
        <svg
          width={W} height={stripH}
          style={{ display: "block", overflow: "hidden" }}
        >
          {/* Paper-colored rect minus punched circles = perforated tear line */}
          <path
            fillRule="evenodd"
            d={tearPath}
            fill={C.paperMid}
          />
        </svg>

        {/* Tear shadow — depth under the paper edge */}
        <div style={{ height: 4, background: "rgba(0,0,0,0.18)" }} />
      </div>

      {/* Scene corner detail */}
      <svg width={18} height={18} viewBox="-9 -9 18 18"
        style={{ position: "absolute", bottom: 26, right: 30, opacity: 0.35 }}>
        <path d="M0,-8 L1.6,-1.6 L8,0 L1.6,1.6 L0,8 L-1.6,1.6 L-8,0 L-1.6,-1.6 Z" fill={C.amber} />
      </svg>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  SCORECARD — Progress bars (existing)
// ══════════════════════════════════════════════════════════════════
const Scorecard = () => {
  const [hov, setHov] = useState(null);
  const cats = [
    { id:"s", label:"Search & Filtering",     li:62, verdict:"Partial",       vc:C.amber,    feats:["Date posted ✓","Remote ✓","Easy Apply ✓","Response rate ✗","Ghost flag ✗","Recruiter activity ✗"],         note:"Filters serve recruiter targeting, not listing quality"            },
    { id:"a", label:"Application Process",    li:55, verdict:"Partial",       vc:C.amber,    feats:["Easy Apply ✓","ATS requirements ✗","Auto-rejection criteria ✗","Stage tracking ✗"],                        note:"Apply flow optimised for volume, not informed decisions"           },
    { id:"t", label:"Applicant Transparency", li:12, verdict:"Critical gap",  vc:C.amberDim,      feats:["Applicant count* ✓ (*inflated)","Response rate ✗","Ghost probability ✗","Algorithm logic ✗"],              note:"Near-zero transparency on what the listing actually signals"       },
    { id:"tr",label:"Trust Signals",          li: 8, verdict:"Missing",       vc:C.amberDim,      feats:["Promoted disclosure (tooltip only) ~✓","Budget verification ✗","Verified openings ✗"],                    note:"Paid listings disclosed only via tooltip — one deliberate click"   },
    { id:"i", label:"Hiring Intent Visibility",li:5, verdict:"Missing",       vc:C.amberDim,      feats:["Posted date ✓","Time-to-hire data ✗","Last hire date ✗","Active headcount ✗"],                            note:"Recency of posting ≠ intent to hire. No distinction surfaced"     },
    { id:"p", label:"Premium Value Delivery", li:30, verdict:"Weak",          vc:C.amberDim,  feats:['"Top applicant" label ✓',"InMail credits ✓","Response rate insight ✗","Competitive intel ✗"],             note:"$40/mo buys urgency signals, not decision-quality information"    },
  ];
  const col = p => p>=50 ? C.dark : p>=20 ? C.amber : C.amberDim;
  return (
    <div style={{ background:C.bg, padding:"44px 48px 36px", fontFamily:"'Georgia',serif", width:900 }}>
      <div style={{ fontSize:10,fontWeight:700,letterSpacing:3,color:C.amber,marginBottom:8,textTransform:"uppercase",fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs</div>
      <div style={{ fontSize:26,fontWeight:800,color:C.dark,lineHeight:1.15 }}>Platform Scorecard</div>
      <div style={{ fontSize:13.5,color:C.grey,marginTop:6,marginBottom:28,fontStyle:"italic" }}>How LinkedIn Jobs performs across six dimensions that matter to job seekers. Hover each row.</div>
      <div style={{ display:"flex",gap:20,marginBottom:28 }}>
        <div style={{ flex:1,background:C.white,border:`1.5px solid ${C.panel}`,borderRadius:8,padding:"16px 20px",display:"flex",alignItems:"center",gap:16 }}>
          <div style={{ textAlign:"center",minWidth:72 }}>
            <div style={{ fontSize:40,fontWeight:900,color:C.amberDim,lineHeight:1,letterSpacing:-2 }}>29</div>
            <div style={{ fontSize:9,color:C.grey,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"sans-serif",marginTop:2 }}>/100</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,fontWeight:700,color:C.dark,marginBottom:6,fontFamily:"sans-serif" }}>Overall Job Seeker Score</div>
            <div style={{ height:8,background:"#EDE6DE",borderRadius:4,overflow:"hidden" }}><div style={{ width:"29%",height:"100%",background:C.amberDim,borderRadius:4 }}/></div>
            <div style={{ fontSize:10.5,color:C.grey,marginTop:6,fontStyle:"italic" }}>Average across 6 dimensions. Weighted toward seeker outcomes.</div>
          </div>
        </div>
        <div style={{ width:200,background:C.dark,border:`1.5px solid ${C.amber}22`,borderRadius:8,padding:"16px 18px" }}>
          <div style={{ fontSize:8.5,color:C.amber,letterSpacing:2,textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:10 }}>Score by dimension</div>
          {cats.map(c=>(<div key={c.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5 }}><div style={{ fontSize:9.5,color:"#907858",fontFamily:"sans-serif",flex:1 }}>{c.label.split(" ")[0]}</div><div style={{ fontSize:11,fontWeight:800,color:col(c.li),fontFamily:"sans-serif" }}>{c.li}</div></div>))}
        </div>
      </div>
      {cats.map(cat=>{const h=hov===cat.id;const bc=col(cat.li);return(
        <div key={cat.id} onMouseEnter={()=>setHov(cat.id)} onMouseLeave={()=>setHov(null)} style={{ background:C.white,border:`1px solid ${h?bc+"55":"#E8E0DC"}`,borderLeft:`4px solid ${bc}`,borderRadius:"0 7px 7px 0",padding:h?"16px 18px 18px":"12px 18px",cursor:"pointer",transition:"all 0.18s",boxShadow:h?"0 4px 18px rgba(0,0,0,0.08)":"none",marginBottom:8 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ minWidth:42,textAlign:"center" }}>
              <div style={{ fontSize:26,fontWeight:900,color:bc,lineHeight:1,letterSpacing:-1 }}>{cat.li}</div>
              <div style={{ fontSize:8,color:C.muted,fontFamily:"sans-serif" }}>/100</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <div style={{ fontSize:12.5,fontWeight:700,color:C.dark,fontFamily:"sans-serif" }}>{cat.label}</div>
                <div style={{ fontSize:9.5,fontWeight:700,color:cat.vc,fontFamily:"sans-serif",letterSpacing:0.5,background:cat.vc+"14",padding:"2px 9px",borderRadius:10 }}>{cat.verdict}</div>
              </div>
              <div style={{ height:7,background:"#EDE6DE",borderRadius:4,overflow:"hidden" }}><div style={{ width:`${cat.li}%`,height:"100%",background:bc,borderRadius:4 }}/></div>
              <div style={{ fontSize:9,color:C.muted,fontStyle:"italic",fontFamily:"sans-serif",marginTop:4 }}>{cat.note}</div>
            </div>
          </div>
          {h&&<div style={{ marginTop:14,paddingTop:12,borderTop:`1px solid ${bc}22`,display:"flex",flexWrap:"wrap",gap:"6px 8px" }}>{cat.feats.map((f,fi)=>{const absent=f.includes("✗");const partial=f.includes("~✓");return(<div key={fi} style={{ fontSize:10.5,fontFamily:"sans-serif",color:absent?C.amberDim:partial?C.amber:C.dark,background:absent?"rgba(122,96,48,0.06)":partial?"rgba(212,168,83,0.08)":"rgba(13,13,13,0.07)",padding:"3px 10px",borderRadius:12,border:`1px solid ${absent?"rgba(122,96,48,0.18)":partial?"rgba(212,168,83,0.2)":"rgba(13,13,13,0.18)"}` }}>{f}</div>);})}</div>}
        </div>
      );})}
      <div style={{ marginTop:18,padding:"13px 20px",background:C.panel,borderRadius:7,fontSize:12.5,color:C.dark,lineHeight:1.6,borderLeft:`3px solid ${C.amber}` }}>LinkedIn Jobs scores highest on the dimensions that generate recruiter revenue. Lowest on the dimensions job seekers need to make informed decisions.<span style={{ color:C.amberDim,fontWeight:700 }}> That correlation is not coincidental.</span></div>
      <div style={{ marginTop:14,fontSize:9.5,color:C.muted,fontStyle:"italic" }}>Source: LinkedIn Jobs UI audit, March 2025 · Greenhouse Benchmark 2024 · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  SPIDER CHART — Full-width clean radar, matching Image 6 reference
//  Labels + scores outside axes · large open polygon · light grid
// ══════════════════════════════════════════════════════════════════
const SpiderChart = () => {
  const [hovAxis, setHovAxis] = useState(null);

  // Large centered radar — fills the 900px card
  const W = 820, H = 520;
  const cX = 410, cY = 270, R = 195;

  const dims = [
    { label: "Search & Filtering",       score: 62 },
    { label: "Application Process",      score: 55 },
    { label: "Applicant Transparency",   score: 12 },
    { label: "Trust Signals",            score:  8 },
    { label: "Hiring Intent Visibility", score:  5 },
    { label: "Premium Value Delivery",   score: 30 },
  ];
  const N = dims.length;

  // Angle: 0 = top (−90°), going clockwise
  const ang  = (i) => (i * (360 / N) - 90) * Math.PI / 180;
  const pt   = (i, frac) => ({
    x: cX + R * frac * Math.cos(ang(i)),
    y: cY + R * frac * Math.sin(ang(i)),
  });
  const poly = (fracs) =>
    fracs.map((f, i) => {
      const p = pt(i, f);
      return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(" ") + "Z";

  // Grid rings at 25 / 50 / 75 / 100
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Label anchor position — push further out from axis end
  const LABEL_PUSH = 42;
  const labelPt = (i) => ({
    x: cX + (R + LABEL_PUSH) * Math.cos(ang(i)),
    y: cY + (R + LABEL_PUSH) * Math.sin(ang(i)),
  });

  // Score color: high = dark ink, mid = amber, low = amber-muted
  const sc = (v) => v >= 45 ? C.dark : v >= 20 ? C.amber : C.amberDim;

  const liPath = poly(dims.map(d => d.score / 100));

  return (
    <div style={{ background: C.bg, padding: "44px 48px 32px", fontFamily: "'Georgia', serif", width: 900 }}>
      {/* Header */}
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:C.amber, marginBottom:8, textTransform:"uppercase", fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs</div>
      <div style={{ fontSize:26, fontWeight:800, color:C.dark, lineHeight:1.15 }}>Platform Health Scorecard</div>
      <div style={{ fontSize:13.5, color:C.grey, marginTop:6, marginBottom:8, fontStyle:"italic" }}>
        Six dimensions. One product decision. The shape of what LinkedIn chose to build — and what it didn't.
      </div>

      {/* Legend row */}
      <div style={{ display:"flex", gap:28, marginBottom:18, alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={`${C.dark}40`} strokeWidth={1.5} strokeDasharray="4,3"/></svg>
          <span style={{ fontSize:11, color:C.grey, fontFamily:"sans-serif" }}>Ideal (100)</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={C.dark} strokeWidth={2.5}/></svg>
          <span style={{ fontSize:11, color:C.dark, fontFamily:"sans-serif", fontWeight:600 }}>LinkedIn Jobs</span>
        </div>
      </div>

      {/* Full-width SVG */}
      <svg width={W} height={H} style={{ display:"block", overflow:"visible" }}>

        {/* Grid rings */}
        {rings.map((frac, ri) => (
          <g key={ri}>
            <polygon
              points={dims.map((_, i) => { const p = pt(i, frac); return `${p.x},${p.y}`; }).join(" ")}
              fill="none"
              stroke={frac === 1.0 ? `${C.amber}44` : C.rule}
              strokeWidth={frac === 1.0 ? 1.5 : 0.8}
              strokeDasharray={frac < 1 ? "3,4" : undefined}
            />
            {/* Ring value label — placed on vertical axis (i=0, top) */}
            <text
              x={cX} y={cY - R * frac + (frac === 1.0 ? -6 : -4)}
              textAnchor="middle" fontSize={9} fill={C.muted} fontFamily="sans-serif"
            >{Math.round(frac * 100)}</text>
          </g>
        ))}

        {/* Axis spokes */}
        {dims.map((d, i) => {
          const end = pt(i, 1);
          const isH = hovAxis === i;
          return (
            <line key={i}
              x1={cX} y1={cY} x2={end.x} y2={end.y}
              stroke={isH ? C.amber : C.rule}
              strokeWidth={isH ? 1.5 : 1}
            />
          );
        })}

        {/* Ideal outline — light dashed */}
        <polygon
          points={dims.map((_, i) => { const p = pt(i, 1); return `${p.x},${p.y}`; }).join(" ")}
          fill={`${C.dark}05`} stroke={`${C.dark}30`} strokeWidth={1.5} strokeDasharray="5,4"
        />

        {/* LinkedIn polygon — solid dark fill */}
        <path d={liPath} fill={`${C.dark}14`} stroke={C.dark} strokeWidth={2.5} strokeLinejoin="round" />

        {/* Axis labels + score numbers — outside each axis end */}
        {dims.map((d, i) => {
          const lp  = labelPt(i);
          const isH = hovAxis === i;
          const a   = ang(i);
          const cos = Math.cos(a);
          // Anchor: right-of-axis = start, left = end, top/bottom = middle
          const anchor = cos > 0.2 ? "start" : cos < -0.2 ? "end" : "middle";
          // Vertical align: if bottom half push down a bit
          const sin = Math.sin(a);
          const yOff = sin > 0.3 ? 6 : sin < -0.3 ? -6 : 0;
          const scoreVal = d.score;
          const colour = sc(scoreVal);

          return (
            <g key={i}
              onMouseEnter={() => setHovAxis(i)}
              onMouseLeave={() => setHovAxis(null)}
              style={{ cursor:"pointer" }}>

              {/* Score number — large, right at axis end */}
              <text
                x={pt(i,1).x + (cos > 0.2 ? 8 : cos < -0.2 ? -8 : 0)}
                y={pt(i,1).y + (sin > 0.2 ? 8 : sin < -0.2 ? -8 : 0) + yOff}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={isH ? 17 : 15}
                fontWeight={900}
                fill={colour}
                fontFamily="sans-serif"
                style={{ transition:"all 0.15s" }}
              >{scoreVal}</text>

              {/* Label text — further out */}
              <text
                x={lp.x}
                y={lp.y + yOff}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={isH ? 12 : 11}
                fontWeight={isH ? 700 : 500}
                fill={isH ? C.dark : "#5A5250"}
                fontFamily="sans-serif"
                style={{ transition:"all 0.15s" }}
              >{d.label}</text>

              {/* Dot at axis tip */}
              <circle
                cx={pt(i,1).x} cy={pt(i,1).y}
                r={isH ? 4.5 : 3}
                fill={isH ? C.amber : C.muted}
                style={{ transition:"all 0.15s" }}
              />

              {/* Score dot on polygon */}
              <circle
                cx={pt(i, d.score/100).x}
                cy={pt(i, d.score/100).y}
                r={isH ? 7 : 4.5}
                fill={colour}
                stroke={C.white}
                strokeWidth={isH ? 2 : 1.5}
                style={{ transition:"all 0.15s" }}
              />
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={cX} cy={cY} r={4} fill={C.amber} />
      </svg>

      {/* Insight footer */}
      <div style={{ marginTop:4, padding:"13px 20px", background:C.panel, borderRadius:7,
        fontSize:12.5, color:C.dark, lineHeight:1.6, borderLeft:`3px solid ${C.amber}` }}>
        LinkedIn performs strongest on dimensions that generate recruiter revenue.
        <span style={{ color:C.amberDim, fontWeight:700 }}> Weakest on the three that would tell job seekers the truth.</span>
      </div>
      <div style={{ marginTop:12, fontSize:9.5, color:C.muted, fontStyle:"italic" }}>
        Source: LinkedIn Jobs UI audit, March 2025 · Greenhouse Benchmark 2024 · secondfurther.com
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  NETWORK GRAPH — Hub-and-spoke, labels inside nodes
//  Matches Image 3 reference: fan layout, solid/dashed lines,
//  zone pill labels, text inside circles
// ══════════════════════════════════════════════════════════════════
const NetworkGraph = () => {
  const [hov, setHov] = useState(null);
  const W = 820, H = 480;

  // Hub — center of canvas
  const HUB = { x: 388, y: 240, r: 46 };

  // ── RIGHT side — 8 BUILT nodes, fan from ~-65° to +65°
  const builtData = [
    "Easy Apply",
    "Date Posted",
    "Remote",
    "Experience Level",
    "Applicant Count",
    "In Network",
    "Industry Filters",
    "Emp. Type",
  ];
  const BUILT_ARC = 185;
  const builtAngles = builtData.map((_, i) => {
    // Spread evenly from -68° to +68°
    const span = 136;
    return (-68 + i * (span / (builtData.length - 1))) * Math.PI / 180;
  });
  const builtNodes = builtData.map((label, i) => ({
    label,
    x: HUB.x + BUILT_ARC * Math.cos(builtAngles[i]),
    y: HUB.y + BUILT_ARC * Math.sin(builtAngles[i]),
    a: builtAngles[i],
  }));

  // ── LEFT side — 6 MISSING nodes, fan from ~115° to ~245°
  const missingData = [
    { label: "Response Rate",    note: "LinkedIn avg: 8–13%" },
    { label: "Ghost Job Flag",   note: "27% of all listings" },
    { label: "Recruiter Active", note: "Last active date" },
    { label: "ATS Visibility",   note: "Hidden reject criteria" },
    { label: "Budget Verified",  note: "No hiring intent signal" },
    { label: "Time-to-Hire",     note: "Recruiter-only data" },
  ];
  const MISSING_ARC = 182;
  const missingAngles = missingData.map((_, i) => {
    const span = 128;
    return (115 + i * (span / (missingData.length - 1))) * Math.PI / 180;
  });
  const missingNodes = missingData.map((d, i) => ({
    ...d,
    x: HUB.x + MISSING_ARC * Math.cos(missingAngles[i]),
    y: HUB.y + MISSING_ARC * Math.sin(missingAngles[i]),
    a: missingAngles[i],
  }));

  // Node radius — big enough for 2-line text
  const NR = 34;

  // Curved path helper — quadratic bezier, control point slightly offset
  const curve = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // Gentle bow toward center
    const dx = x2 - x1, dy = y2 - y1;
    const cx = mx - dy * 0.08;
    const cy = my + dx * 0.08;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  };

  // Shorten line to node edge
  const edgePt = (from, to, pad) => {
    const dx = to.x - from.x, dy = to.y - from.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    return { x: to.x - (dx/d)*pad, y: to.y - (dy/d)*pad };
  };

  return (
    <div style={{ background: C.bg, padding: "44px 48px 32px", fontFamily: "'Georgia', serif", width: 900 }}>
      {/* Header */}
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:C.amber, marginBottom:8, textTransform:"uppercase", fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs</div>
      <div style={{ fontSize:26, fontWeight:800, color:C.dark, lineHeight:1.15 }}>The Filter Architecture of LinkedIn Jobs</div>
      <div style={{ fontSize:13.5, color:C.grey, marginTop:6, marginBottom:20, fontStyle:"italic" }}>
        Mapping which filters actually connect to the ranking system — and which were never built.
      </div>

      <svg width={W} height={H} style={{ display:"block", overflow:"visible" }}>
        <defs>
          <radialGradient id="hubG" cx="38%" cy="32%">
            <stop offset="0%" stopColor={C.amberLt} stopOpacity="1" />
            <stop offset="100%" stopColor={C.amberDim} stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* Zone pill labels */}
        {/* Left zone — missing */}
        <rect x={48} y={20} width={210} height={24} rx={12}
          fill={`${C.amber}18`} stroke={`${C.amber}55`} strokeWidth={1}/>
        <text x={153} y={36} textAnchor="middle" fontSize={10} fontWeight={700}
          fill={C.amberDim} fontFamily="sans-serif" letterSpacing={0.5}>
          Seeker Transparency (Unbuilt)
        </text>

        {/* Right zone — built */}
        <rect x={490} y={20} width={200} height={24} rx={12}
          fill={`${C.dark}0A`} stroke={`${C.dark}25`} strokeWidth={1}/>
        <text x={590} y={36} textAnchor="middle" fontSize={10} fontWeight={700}
          fill={`${C.dark}88`} fontFamily="sans-serif" letterSpacing={0.5}>
          Recruiter Optimization (Built)
        </text>

        {/* ── Built connection lines — solid, gentle curve */}
        {builtNodes.map((n, i) => {
          const ep = edgePt(n, HUB, HUB.r + 2);
          const np = edgePt(HUB, n, NR + 2);
          return (
            <path key={i}
              d={curve(np.x, np.y, ep.x, ep.y)}
              fill="none"
              stroke={`${C.dark}30`} strokeWidth={1.5}
            />
          );
        })}

        {/* ── Missing connection lines — dashed, stop halfway */}
        {missingNodes.map((n, i) => {
          const hubEdge = edgePt(n, HUB, HUB.r + 2);
          // Stop at 52% of the way — severed midpoint
          const sx = HUB.x + (n.x - HUB.x) * 0.52;
          const sy = HUB.y + (n.y - HUB.y) * 0.52;
          const np = edgePt(HUB, n, NR + 2);
          return (
            <path key={i}
              d={curve(np.x, np.y, sx, sy)}
              fill="none"
              stroke={`${C.amber}55`} strokeWidth={1.5}
              strokeDasharray="5,4"
            />
          );
        })}

        {/* ── Built nodes — solid ink circles with white text inside */}
        {builtNodes.map((n, i) => {
          const h = hov === `b${i}`;
          const lines = n.label.split(" ");
          // Split into max 2 lines
          const l1 = lines.slice(0, Math.ceil(lines.length/2)).join(" ");
          const l2 = lines.slice(Math.ceil(lines.length/2)).join(" ");
          return (
            <g key={i}
              onMouseEnter={() => setHov(`b${i}`)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor:"pointer" }}>
              <circle cx={n.x} cy={n.y} r={h ? NR+3 : NR}
                fill={h ? C.dark : `${C.dark}CC`}
                stroke={C.dark} strokeWidth={h ? 2 : 1}
                style={{ transition:"all 0.15s" }}/>
              <text x={n.x} y={l2 ? n.y - 6 : n.y + 4}
                textAnchor="middle" fontSize={10} fontWeight={700}
                fill={C.white} fontFamily="sans-serif">{l1}</text>
              {l2 && (
                <text x={n.x} y={n.y + 8}
                  textAnchor="middle" fontSize={10} fontWeight={700}
                  fill={C.white} fontFamily="sans-serif">{l2}</text>
              )}
            </g>
          );
        })}

        {/* ── Hub node — amber gradient */}
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 10}
          fill="none" stroke={`${C.amber}28`} strokeWidth={10}/>
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r}
          fill="url(#hubG)"/>
        <text x={HUB.x} y={HUB.y - 8} textAnchor="middle"
          fontSize={11} fontWeight={900} fill={C.white} fontFamily="sans-serif">Ranking</text>
        <text x={HUB.x} y={HUB.y + 8} textAnchor="middle"
          fontSize={10} fontWeight={700} fill={`${C.white}DD`} fontFamily="sans-serif">Engine</text>

        {/* ── Missing nodes — dashed amber circles with text inside */}
        {missingNodes.map((n, i) => {
          const h = hov === `m${i}`;
          const lines = n.label.split(" ");
          const l1 = lines.slice(0, Math.ceil(lines.length/2)).join(" ");
          const l2 = lines.slice(Math.ceil(lines.length/2)).join(" ");
          return (
            <g key={i}
              onMouseEnter={() => setHov(`m${i}`)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor:"pointer" }}>
              <circle cx={n.x} cy={n.y} r={h ? NR+3 : NR}
                fill={`${C.amber}10`}
                stroke={C.amber} strokeWidth={h ? 2 : 1.5}
                strokeDasharray="5,3"
                style={{ transition:"all 0.15s" }}/>
              <text x={n.x} y={l2 ? n.y - 6 : n.y + 4}
                textAnchor="middle" fontSize={10} fontWeight={600}
                fill={C.amberDim} fontFamily="sans-serif">{l1}</text>
              {l2 && (
                <text x={n.x} y={n.y + 8}
                  textAnchor="middle" fontSize={10} fontWeight={600}
                  fill={C.amberDim} fontFamily="sans-serif">{l2}</text>
              )}
              {/* Hover tooltip */}
              {h && (
                <g>
                  <rect x={n.x - 76} y={n.y - NR - 38} width={152} height={26} rx={5}
                    fill={C.white} stroke={`${C.amber}40`} strokeWidth={1}/>
                  <text x={n.x} y={n.y - NR - 21}
                    textAnchor="middle" fontSize={10} fill={C.amber}
                    fontFamily="sans-serif" fontStyle="italic">{n.note}</text>
                </g>
              )}
            </g>
          );
        })}

        {/* ── Legend (bottom-right) */}
        <g transform={`translate(${W - 240}, ${H - 78})`}>
          <line x1={0} y1={8} x2={24} y2={8} stroke={`${C.dark}55`} strokeWidth={1.5}/>
          <circle cx={12} cy={8} r={6} fill={`${C.dark}CC`} stroke={C.dark} strokeWidth={1}/>
          <text x={30} y={12} fontSize={10.5} fill={C.grey} fontFamily="sans-serif">Built — connected to ranking</text>

          <line x1={0} y1={30} x2={24} y2={30} stroke={`${C.amber}88`} strokeWidth={1.5} strokeDasharray="5,3"/>
          <circle cx={12} cy={30} r={6} fill={`${C.amber}10`} stroke={C.amber} strokeWidth={1.5} strokeDasharray="4,2"/>
          <text x={30} y={34} fontSize={10.5} fill={C.grey} fontFamily="sans-serif">Unbuilt — severed, no signal</text>

          <circle cx={12} cy={52} r={8} fill="url(#hubG)"/>
          <text x={30} y={56} fontSize={10.5} fill={C.grey} fontFamily="sans-serif">Ranking Engine — hub</text>
        </g>
      </svg>

      {/* Insight bar */}
      <div style={{ marginTop:8, padding:"13px 20px", background:C.panel, borderRadius:7,
        fontSize:12.5, color:C.dark, lineHeight:1.6, borderLeft:`3px solid ${C.amber}` }}>
        The filter system is not incomplete. It is complete — for one side of the marketplace.
        <span style={{ color:C.amberDim, fontWeight:700 }}> The missing filters were never connected because connecting them would have cost LinkedIn revenue.</span>
      </div>
      <div style={{ marginTop:12, fontSize:9.5, color:C.muted, fontStyle:"italic" }}>
        Source: LinkedIn Jobs UI audit, March 2025 · LinkedIn dataset 31,597 listings · secondfurther.com
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  EFFICIENCY DECAY BUBBLE CHART
// ══════════════════════════════════════════════════════════════════
const BubbleChart = () => {
  const [hov, setHov] = useState(null);
  const W=640, H=400, PAD={l:64,r:40,t:48,b:60};
  const iW=W-PAD.l-PAD.r, iH=H-PAD.t-PAD.b;
  const xS=v=>PAD.l+((v-80)/220)*iW;
  const yS=v=>PAD.t+iH-((v-4)/22)*iH;
  const rS=v=>10+((v-5.3)/8.5)*44;

  // Color per year: early years warm-grey, recent years shift to red — tells the decay story
  const yearColor = (i) => {
    const t = i / 6; // 0=2019 (neutral), 1=2025 (red)
    const r = Math.round(120 + t * 72);
    const g = Math.round(100 - t * 65);
    const b = Math.round(90  - t * 55);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div style={{background:C.bg, padding:"36px 40px 28px", fontFamily:"'Georgia',serif", width:W+80}}>
      {/* Brand header — SecondFurther Cold Press style */}
      <div style={{fontSize:9, fontWeight:700, letterSpacing:3.5, color:C.amber, textTransform:"uppercase", fontFamily:"sans-serif", marginBottom:10}}>
        SecondFurther · LinkedIn Jobs Teardown
      </div>
      <div style={{height:2, width:40, background:C.amber, marginBottom:14}} />
      <div style={{fontSize:24, fontWeight:800, color:C.dark, lineHeight:1.15, marginBottom:6, fontFamily:"'Georgia',serif"}}>
        Revenue Up. Response Rate Down.
      </div>
      <div style={{fontSize:13, color:"#6A6260", fontStyle:"italic", marginBottom:4, lineHeight:1.5}}>
        As LinkedIn's Talent Solutions revenue grew from $5.3B to $13.8B, job seeker response rates fell from 22% to 8%.
      </div>
      <div style={{fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:20}}>
        X — Premium subscriber growth (Index, 2019=100) &nbsp;·&nbsp; Y — Application response rate (%) &nbsp;·&nbsp; Bubble — Revenue ($B)
      </div>

      <svg width={W} height={H} style={{overflow:"visible"}}>
        <defs>
          {years.map((yr, i) => (
            <radialGradient key={yr} id={`bub${i}`} cx="38%" cy="32%">
              <stop offset="0%" stopColor={yearColor(i)} stopOpacity="0.7"/>
              <stop offset="100%" stopColor={yearColor(i)} stopOpacity="0.18"/>
            </radialGradient>
          ))}
        </defs>

        {/* Grid */}
        {[100,150,200,250,300].map(v=>(<g key={v}>
          <line x1={xS(v)} x2={xS(v)} y1={PAD.t} y2={PAD.t+iH} stroke="#EAE2DE" strokeWidth={0.8}/>
          <text x={xS(v)} y={PAD.t+iH+18} textAnchor="middle" fontSize={10} fill={C.muted} fontFamily="sans-serif">{v}</text>
        </g>))}
        {[6,10,14,18,22].map(v=>(<g key={v}>
          <line x1={PAD.l} x2={PAD.l+iW} y1={yS(v)} y2={yS(v)} stroke="#EAE2DE" strokeWidth={0.8}/>
          <text x={PAD.l-10} y={yS(v)+4} textAnchor="end" fontSize={10} fill={C.muted} fontFamily="sans-serif">{v}%</text>
        </g>))}

        {/* Axis labels */}
        <text x={PAD.l+iW/2} y={H-6} textAnchor="middle" fontSize={11} fill={C.grey} fontFamily="sans-serif">
          Premium subscriber growth (Index · 2019=100)
        </text>
        <text x={18} y={PAD.t + iH/2} textAnchor="middle" fontSize={11} fill={C.grey} fontFamily="sans-serif"
          transform={`rotate(-90, 18, ${PAD.t + iH/2})`}>Response rate (%)</text>

        {/* Trend path */}
        <path d={years.map((y,i)=>`${i===0?"M":"L"} ${xS(premium[i])} ${yS(response[i])}`).join(" ")}
          fill="none" stroke={`${C.amber}55`} strokeWidth={1.5} strokeDasharray="5,3"/>

        {/* Bubbles — sorted large-first so small ones render on top */}
        {[...years].sort((a,b)=>revenue[years.indexOf(b)]-revenue[years.indexOf(a)]).map(yr=>{
          const i=years.indexOf(yr);
          const cx=xS(premium[i]), cy=yS(response[i]), r=rS(revenue[i]);
          const h=hov===i;
          return(
            <g key={yr} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
              <circle cx={cx} cy={cy} r={h?r+3:r}
                fill={`url(#bub${i})`}
                stroke={yearColor(i)}
                strokeWidth={h?2.5:1.5}
                style={{transition:"all 0.2s"}}/>
              {/* Year label outside bubble */}
              <text x={cx} y={cy+r+15} textAnchor="middle" fontSize={10} fontWeight={700}
                fill={i>=5?C.amberDim:C.dark} fontFamily="sans-serif" style={{pointerEvents:"none"}}>{yr}</text>
              {/* Hover card */}
              {h&&(
                <g>
                  <rect x={cx+r+8} y={cy-34} width={158} height={68} rx={6}
                    fill={C.white} stroke={`${C.panel}`} strokeWidth={1.5}
                    style={{filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.10))"}}/>
                  <text x={cx+r+16} y={cy-16} fontSize={12} fontWeight={700} fill={C.dark} fontFamily="sans-serif">Revenue: ${revenue[i]}B</text>
                  <text x={cx+r+16} y={cy+2}  fontSize={11} fill={C.grey} fontFamily="sans-serif">Premium idx: {premium[i]}</text>
                  <text x={cx+r+16} y={cy+18} fontSize={12} fontWeight={700} fill={C.amberDim} fontFamily="sans-serif">Response: {response[i]}%</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Annotation — label switch moment */}
        <line x1={xS(premium[3])} x2={xS(premium[3])+32}
          y1={yS(response[3])-rS(revenue[3])-12}
          y2={yS(response[3])-rS(revenue[3])-38}
          stroke={C.amber} strokeWidth={1.2}/>
        <text x={xS(premium[3])+36} y={yS(response[3])-rS(revenue[3])-40}
          fontSize={9.5} fill={C.amber} fontFamily="sans-serif" fontStyle="italic">
          "clicked apply" replaces "applicants"
        </text>

        {/* Color legend */}
        <g transform={`translate(${PAD.l}, ${PAD.t-32})`}>
          {[{i:0,yr:"2019"},{i:6,yr:"2025"}].map(({i,yr})=>(
            <g key={yr} transform={`translate(${i===0?0:100}, 0)`}>
              <circle cx={7} cy={7} r={7} fill={yearColor(i)} fillOpacity={0.5} stroke={yearColor(i)} strokeWidth={1.5}/>
              <text x={18} y={11} fontSize={10} fill={C.grey} fontFamily="sans-serif">{yr}</text>
            </g>
          ))}
          <text x={220} y={11} fontSize={10} fill={C.muted} fontFamily="sans-serif" fontStyle="italic">
            Colour shift 2019→2025 reflects outcome degradation
          </text>
        </g>
      </svg>

      {/* Brand pull quote */}
      <div style={{marginTop:16, padding:"12px 18px", background:C.panel, borderRadius:6, borderLeft:`3px solid ${C.amber}`, fontSize:12.5, color:C.dark, lineHeight:1.65}}>
        Revenue grows every year. Response rates fall every year. LinkedIn's most profitable period for Talent Solutions is also its least effective for job seekers. That is not a coincidence.
      </div>
      <div style={{marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{fontSize:9.5, color:C.muted, fontFamily:"sans-serif", fontStyle:"italic"}}>
          Sources: Microsoft FY2024 Earnings · Greenhouse Benchmark 2024
        </div>
        <div style={{fontSize:9, color:C.amber, fontFamily:"sans-serif", letterSpacing:1.5, textTransform:"uppercase", fontWeight:700}}>
          secondfurther.com
        </div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  FLOOD & DRAIN
// ══════════════════════════════════════════════════════════════════
const RecruiterFunnel = () => {
  const W=620,H=380,PAD={l:56,r:48,t:44,b:54};
  const iW=W-PAD.l-PAD.r,iH=H-PAD.t-PAD.b;
  const xS=i=>PAD.l+(i/6)*iW, yV=v=>PAD.t+iH-(v/500)*iH;
  const apps=[180,220,280,350,420,470,500],hired=[40,38,34,28,22,18,16],prem=[55,62,72,80,90,96,100];
  const area=(d,yF,base)=>d.map((v,i)=>`${i===0?"M":"L"} ${xS(i)} ${yF(v)}`).join(" ")+` L ${xS(6)} ${base} L ${xS(0)} ${base} Z`;
  const lp=(d,yF)=>d.map((v,i)=>`${i===0?"M":"L"} ${xS(i)} ${yF(v)}`).join(" ");
  return(
    <div style={{background:C.bg,padding:"32px 36px",fontFamily:"'Georgia',serif",width:W+72}}>
      <div style={{fontSize:10,letterSpacing:3,color:C.amber,fontFamily:"sans-serif",fontWeight:700,marginBottom:6,textTransform:"uppercase"}}>Visualization — Volume vs. Outcome</div>
      <div style={{fontSize:22,fontWeight:700,color:C.dark,marginBottom:4,lineHeight:1.2}}>The Flood and the Drain</div>
      <div style={{fontSize:12,color:C.grey,marginBottom:20,fontStyle:"italic"}}>Application volume explodes. The hired channel flatlines. The gap between them is the product.</div>
      <svg width={W} height={H} style={{overflow:"visible"}}>
        <defs>
          <linearGradient id="vg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.dark} stopOpacity="0.10"/><stop offset="100%" stopColor={C.dark} stopOpacity="0.02"/></linearGradient>
          <linearGradient id="pg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.amber} stopOpacity="0.18"/><stop offset="100%" stopColor={C.amber} stopOpacity="0.04"/></linearGradient>
        </defs>
        {[100,200,300,400,500].map(v=>(<g key={v}><line x1={PAD.l} x2={PAD.l+iW} y1={yV(v)} y2={yV(v)} stroke="#E8DDD9" strokeWidth={0.8}/><text x={PAD.l-8} y={yV(v)+4} textAnchor="end" fontSize={9.5} fill={C.grey}>{v}</text></g>))}
        <path d={area(apps,yV,PAD.t+iH)} fill="url(#vg3)"/><path d={lp(apps,yV)} fill="none" stroke={C.dark} strokeWidth={2.5} strokeLinecap="round"/>
        <path d={area(prem,yV,PAD.t+iH)} fill="url(#pg3)"/><path d={lp(prem,yV)} fill="none" stroke={C.amber} strokeWidth={1.8} strokeDasharray="5,3"/>
        <path d={lp(hired,yV)} fill="none" stroke={C.amberDim} strokeWidth={3} strokeLinecap="round"/>
        {hired.map((v,i)=>(<circle key={i} cx={xS(i)} cy={yV(v)} r={4} fill={C.amberDim} stroke={C.bg} strokeWidth={2}/>))}
        <line x1={xS(6)} x2={xS(6)} y1={yV(hired[6])} y2={yV(apps[6])} stroke="#D0C8C6" strokeWidth={1} strokeDasharray="3,2"/>
        <text x={xS(6)+8} y={(yV(hired[6])+yV(apps[6]))/2} fontSize={10} fill={C.dark} fontWeight={700} fontStyle="italic">GAP</text>
        <text x={xS(6)+8} y={yV(apps[6])+4} fontSize={10} fill={C.dark} fontWeight={700}>500</text>
        <text x={xS(6)+8} y={yV(hired[6])+4} fontSize={10} fill={C.amberDim} fontWeight={700}>16</text>
        {years.map((yr,i)=>(<text key={yr} x={xS(i)} y={PAD.t+iH+20} textAnchor="middle" fontSize={10} fill={C.grey}>{yr}</text>))}
        <text x={PAD.l+iW/2} y={H-4} textAnchor="middle" fontSize={11} fill={C.grey} fontStyle="italic">Year</text>
        {[{color:C.dark,dash:false,label:"Total applications (indexed)"},{color:C.amber,dash:true,label:"Premium applicant band"},{color:C.amberDim,dash:false,label:"Successful hires (indexed)"}].map(({color,dash,label},i)=>(<g key={i} transform={`translate(${PAD.l+i*195},${PAD.t-22})`}><line x1={0} y1={6} x2={28} y2={6} stroke={color} strokeWidth={2.5} strokeDasharray={dash?"5,3":undefined}/><text x={34} y={10} fontSize={10} fill={C.grey}>{label}</text></g>))}
      </svg>
      <div style={{marginTop:12,padding:"10px 16px",background:C.panel,borderRadius:6,borderLeft:`3px solid ${C.dark}`,fontSize:12,color:C.dark,fontStyle:"italic"}}>More applications. Same number of jobs. The gap is not a bug — it is the mechanism.</div>
      <div style={{marginTop:10,fontSize:9.5,color:C.muted,fontStyle:"italic"}}>Sources: Resume Builder 2024 · LinkedIn dataset 2025 · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  SPLIT-SCREEN — Algorithm Intent vs Business Model Reality
//  Inspired by editorial clarity of Image 2 reference
// ══════════════════════════════════════════════════════════════════
const SplitScreen = () => {
  const idealJobs = [
    { rank:1, title:"Senior PM — Product-Led Growth",   match:"97%", best:true  },
    { rank:2, title:"Head of Product, B2B SaaS",        match:"91%", best:true  },
    { rank:3, title:"Group PM — Data Platform",         match:"88%", best:false },
    { rank:4, title:"PM Lead — Enterprise Cloud",       match:"84%", best:false },
    { rank:5, title:"Senior PM — Mobile Consumer",      match:"79%", best:false },
  ];
  const realJobs = [
    { rank:1, title:"Junior PM — Small Startup",        match:"43%", paid:true  },
    { rank:2, title:"Senior PM — Product-Led Growth",   match:"97%", paid:false },
    { rank:3, title:"PM Coordinator — Entry Level",     match:"31%", paid:true  },
    { rank:4, title:"Head of Product, B2B SaaS",        match:"91%", paid:false },
    { rank:5, title:"Associate PM — Various",           match:"28%", paid:true  },
  ];

  // Horizontal bar for ranking weight
  const Bar = ({ label, pct, highlight }) => (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontFamily:"sans-serif",
        color: highlight ? C.dark : C.grey, fontWeight: highlight ? 700 : 400, marginBottom:4 }}>
        <span>{label}</span><span style={{ fontWeight:700 }}>{pct}%</span>
      </div>
      <div style={{ height:9, background:C.rule, borderRadius:2 }}>
        <div style={{ width:`${pct}%`, height:"100%",
          background: highlight ? C.dark : C.muted, borderRadius:2 }} />
      </div>
    </div>
  );

  const JobRow = ({ job, light }) => (
    <div style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"9px 12px", marginBottom:4, borderRadius:4,
      background: light
        ? (job.best ? `${C.dark}08` : "transparent")
        : (job.paid ? `${C.amberLt}12` : "transparent"),
      borderLeft: light
        ? (job.best ? `2px solid ${C.dark}` : "2px solid transparent")
        : (job.paid ? `2px solid ${C.amberLt}` : "2px solid transparent"),
    }}>
      <span style={{ fontSize:14, fontWeight:900, minWidth:20,
        color: light ? (job.best ? C.dark : C.muted) : (job.paid ? C.amberLt : `${C.panel}88`),
        fontFamily:"sans-serif" }}>#{job.rank}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontFamily:"sans-serif",
          color: light ? C.dark : (job.paid ? C.panel : `${C.panel}99`) }}>{job.title}</div>
        <div style={{ fontSize:10, fontFamily:"sans-serif",
          color: light ? C.grey : (job.paid ? C.amberLt : C.muted) }}>{job.match} match</div>
      </div>
      {light && job.best && (
        <span style={{ fontSize:8.5, background:C.dark, color:C.bg, padding:"2px 8px",
          borderRadius:3, fontFamily:"sans-serif", fontWeight:700, letterSpacing:0.5 }}>BEST FIT</span>
      )}
      {!light && job.paid && (
        <span style={{ fontSize:8.5, background:C.amberLt, color:C.dark, padding:"2px 8px",
          borderRadius:3, fontFamily:"sans-serif", fontWeight:900, letterSpacing:0.5 }}>PAID</span>
      )}
    </div>
  );

  return (
    <div style={{ width:900, fontFamily:"'Georgia',serif", overflow:"hidden",
      border:`1px solid ${C.rule}`, borderRadius:6 }}>

      {/* Header */}
      <div style={{ background:C.dark, padding:"22px 32px 18px", display:"grid", gridTemplateColumns:"1fr auto 1fr" }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:3, color:C.amberLt, textTransform:"uppercase",
            fontFamily:"sans-serif", fontWeight:700, marginBottom:6 }}>SecondFurther · LinkedIn Jobs Teardown</div>
          <div style={{ fontSize:22, fontWeight:800, color:C.panel, lineHeight:1.15 }}>
            Algorithm Intent vs Business Model Reality
          </div>
        </div>
        <div />
        <div style={{ textAlign:"right", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", fontStyle:"italic" }}>
            When ad spend enters the ranking system,<br/>the algorithm begins optimising for revenue.
          </div>
        </div>
      </div>

      {/* Two panels */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1px 1fr" }}>

        {/* LEFT — Ideal / user-centric */}
        <div style={{ background:C.bg, padding:"28px 28px 24px" }}>
          <div style={{ fontSize:9, letterSpacing:2.5, color:C.amber, textTransform:"uppercase",
            fontFamily:"sans-serif", fontWeight:700, marginBottom:8 }}>User-Centric Ranking</div>
          <div style={{ fontSize:16, fontWeight:800, color:C.dark, marginBottom:3, fontFamily:"sans-serif" }}>
            SORT: MOST RELEVANT
          </div>
          <div style={{ fontSize:11, color:C.grey, fontStyle:"italic", marginBottom:18 }}>
            Ideal: ranked purely by skill match and experience
          </div>
          {/* Ranking weight bars */}
          <div style={{ background:C.panel, borderRadius:5, padding:"14px 16px", marginBottom:18,
            border:`1px solid ${C.rule}` }}>
            <div style={{ fontSize:9, color:C.amber, textTransform:"uppercase", letterSpacing:2,
              fontFamily:"sans-serif", marginBottom:12 }}>Ranking weight (ideal)</div>
            <Bar label="Skill match"    pct={64} highlight={true}  />
            <Bar label="Experience"     pct={28} highlight={false} />
            <Bar label="Paid placement" pct={8}  highlight={false} />
          </div>
          {/* Job list */}
          {idealJobs.map((job, i) => <JobRow key={i} job={job} light={true} />)}
        </div>

        {/* DIVIDER */}
        <div style={{ background:C.dark, position:"relative", display:"flex",
          alignItems:"center", justifyContent:"center" }}>
          <div style={{ position:"absolute", background:C.amber, padding:"28px 6px",
            display:"flex", flexDirection:"column", alignItems:"center", gap:4,
            zIndex:2, left:-20, right:-20 }}>
            <div style={{ fontSize:11, fontWeight:900, color:C.dark,
              fontFamily:"sans-serif", writingMode:"vertical-rl",
              textOrientation:"mixed", letterSpacing:1, transform:"rotate(180deg)" }}>
              AD SPEND ENTERS
            </div>
            <div style={{ fontSize:14, color:C.dark, fontWeight:900 }}>→</div>
          </div>
        </div>

        {/* RIGHT — Reality / marketplace */}
        <div style={{ background:C.dark, padding:"28px 28px 24px" }}>
          <div style={{ fontSize:9, letterSpacing:2.5, color:C.amberLt, textTransform:"uppercase",
            fontFamily:"sans-serif", fontWeight:700, marginBottom:8 }}>Marketplace Ranking</div>
          <div style={{ fontSize:16, fontWeight:800, color:C.panel, marginBottom:3, fontFamily:"sans-serif" }}>
            SORT: RELEVANCE + SPEND
          </div>
          <div style={{ fontSize:11, color:C.muted, fontStyle:"italic", marginBottom:18 }}>
            Reality: influenced by how much the hirer paid
          </div>
          {/* Ranking weight bars (reversed) */}
          <div style={{ background:`${C.ink2}`, borderRadius:5, padding:"14px 16px", marginBottom:18,
            border:`1px solid ${C.amberLt}20` }}>
            <div style={{ fontSize:9, color:C.amberLt, textTransform:"uppercase", letterSpacing:2,
              fontFamily:"sans-serif", marginBottom:12 }}>Actual ranking weight</div>
            {[
              { label:"Paid placement", pct:51, hl:true  },
              { label:"Skill match",    pct:35, hl:false },
              { label:"Experience",     pct:14, hl:false },
            ].map((b, i) => (
              <div key={i} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11,
                  fontFamily:"sans-serif", color: b.hl ? C.amberLt : C.muted,
                  fontWeight: b.hl ? 700 : 400, marginBottom:4 }}>
                  <span>{b.label}</span><span style={{ fontWeight:700 }}>{b.pct}%</span>
                </div>
                <div style={{ height:9, background:`${C.panel}18`, borderRadius:2 }}>
                  <div style={{ width:`${b.pct}%`, height:"100%",
                    background: b.hl ? C.amberLt : `${C.muted}55`, borderRadius:2 }} />
                </div>
              </div>
            ))}
          </div>
          {/* Job list */}
          {realJobs.map((job, i) => <JobRow key={i} job={job} light={false} />)}
        </div>
      </div>

      {/* Insight footer */}
      <div style={{ background:C.dark, borderTop:`1px solid ${C.ink2}`,
        padding:"14px 32px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:3, height:32, background:C.amber, flexShrink:0, borderRadius:2 }} />
        <div style={{ fontSize:12.5, color:C.panel, fontFamily:"sans-serif", lineHeight:1.5 }}>
          When ads enter ranking systems, the algorithm begins optimising for revenue instead of relevance.
          <span style={{ color:C.amberLt, fontWeight:700 }}> The default sort is "Most Relevant." It isn't.</span>
        </div>
        <div style={{ marginLeft:"auto", fontSize:9, color:C.muted, fontFamily:"sans-serif",
          letterSpacing:1.5, textTransform:"uppercase", flexShrink:0 }}>secondfurther.com</div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  PEEL-BACK REVEAL
// ══════════════════════════════════════════════════════════════════
const PeelBack = () => (
  <div style={{background:C.bg,padding:"44px 48px 36px",fontFamily:"'Georgia',serif",width:900}}>
    <div style={{fontSize:10,fontWeight:700,letterSpacing:3,color:C.amber,marginBottom:8,textTransform:"uppercase",fontFamily:"sans-serif"}}>Product Teardown · LinkedIn Jobs</div>
    <div style={{fontSize:26,fontWeight:800,color:C.dark,lineHeight:1.15}}>Behind the Interface</div>
    <div style={{fontSize:13.5,color:C.grey,marginTop:6,marginBottom:28,fontStyle:"italic"}}>A job listing has one visible layer. What runs underneath is the product.</div>
    <div style={{background:C.white,border:`2px solid ${C.dark}`,borderRadius:8,padding:"20px 24px",boxShadow:"0 4px 18px rgba(0,0,0,0.1)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:9.5,letterSpacing:2.5,color:C.dark,textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:700}}>✓ Layer 1 — What the listing shows you</div><div style={{fontSize:9,color:C.dark,fontFamily:"sans-serif",background:"rgba(13,13,13,0.08)",padding:"3px 10px",borderRadius:10,border:"1px solid rgba(13,13,13,0.2)"}}>VISIBLE SURFACE</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[{label:"Applicant count",value:"100+ clicked apply",urgency:true},{label:'"Early applicant"',value:"Be among the first",urgency:true},{label:'"Actively reviewing"',value:"Easy Apply only",urgency:true},{label:"Salary range",value:"$120K – $160K",urgency:false},{label:'"Top applicant" badge',value:"Premium signal",urgency:true},{label:"Job posted",value:"2 days ago",urgency:false}].map((item,i)=>(<div key={i} style={{padding:"8px 12px",borderRadius:5,background:item.urgency?"rgba(13,13,13,0.07)":"rgba(0,0,0,0.03)",border:`1px solid ${item.urgency?"rgba(13,13,13,0.18)":"#E8E0DC"}`}}><div style={{fontSize:9,color:C.grey,fontFamily:"sans-serif",marginBottom:3}}>{item.label}</div><div style={{fontSize:11.5,fontWeight:700,color:item.urgency?C.dark:C.dark,fontFamily:"sans-serif"}}>{item.value}</div>{item.urgency&&<div style={{fontSize:8,color:C.dark,marginTop:3,fontFamily:"sans-serif",letterSpacing:0.5}}>↑ urgency signal</div>}</div>))}
      </div>
    </div>
    <div style={{textAlign:"center",padding:"10px 0",fontSize:22,color:"#C8C0BC"}}>↓</div>
    <div style={{background:C.dark,border:`2px solid ${C.amber}`,borderRadius:8,padding:"20px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:9.5,letterSpacing:2.5,color:C.amber,textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:700}}>⚙ Layer 2 — The mechanism beneath</div><div style={{fontSize:9,color:C.amber,fontFamily:"sans-serif",background:"rgba(212,168,83,0.1)",padding:"3px 10px",borderRadius:10,border:"1px solid rgba(212,168,83,0.14)"}}>REVENUE ENGINE</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[{icon:"💰",h:"Hirer spend determines rank",d:"Paid placements boosted above organic — no visible badge"},{icon:"📊",h:"Engagement metric: click volume",d:'"100+ clicked apply" counts clicks, not completed applications'},{icon:"🔄",h:"Easy Apply drives data capture",d:"Job seeker profile harvested as recruiter pipeline lead"},{icon:"⚡",h:"Urgency signals compress decisions",d:'"Early applicant" not verified — manufactured scarcity'}].map((item,i)=>(<div key={i} style={{display:"flex",gap:11,padding:"11px 13px",background:"rgba(212,168,83,0.06)",borderRadius:6,border:"1px solid rgba(212,168,83,0.14)"}}><span style={{fontSize:22,lineHeight:1,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:11.5,fontWeight:700,color:C.amber,fontFamily:"sans-serif",marginBottom:3}}>{item.h}</div><div style={{fontSize:10.5,color:"#907848",fontFamily:"sans-serif",lineHeight:1.4}}>{item.d}</div></div></div>))}
      </div>
    </div>
    <div style={{textAlign:"center",padding:"10px 0",fontSize:22,color:"#C8C0BC"}}>↓</div>
    <div style={{background:C.ink2,border:`2px dashed ${C.amber}`,borderRadius:8,padding:"20px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:9.5,letterSpacing:2.5,color:C.amberDim,textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:700}}>🔒 Layer 3 — Withheld from you</div><div style={{fontSize:9,color:"#903030",fontFamily:"sans-serif",background:"rgba(122,96,48,0.08)",padding:"3px 10px",borderRadius:10,border:"1px dashed rgba(122,96,48,0.25)"}}>ACCESS: DENIED</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
        {["Recruiter last active","Company response rate","Ghost job probability","ATS auto-reject criteria","Budget verification","Time-to-hire data"].map((item,i)=>(<div key={i} style={{padding:"8px 12px",background:"rgba(122,96,48,0.05)",border:"1px dashed rgba(122,96,48,0.25)",borderRadius:5,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:C.amberDim,flexShrink:0}}>✗</span><span style={{fontSize:11,color:"#7A3030",fontFamily:"sans-serif"}}>{item}</span></div>))}
      </div>
    </div>
    <div style={{marginTop:24,padding:"13px 20px",background:C.panel,borderRadius:7,fontSize:12.5,color:C.dark,lineHeight:1.6,borderLeft:`3px solid ${C.amber}`}}>The interface is one layer. The product is three layers. You only have access to one.</div>
    <div style={{marginTop:14,fontSize:9.5,color:C.muted,fontStyle:"italic"}}>Source: LinkedIn Jobs UI audit, March 2025 · secondfurther.com</div>
  </div>
);


// ══════════════════════════════════════════════════════════════════
//  DECISION MATRIX — Bubble size = priority / impact score
// ══════════════════════════════════════════════════════════════════
const DecisionMatrix = () => {
  const [hov, setHov] = useState(null);
  const W=520, H=420, cxA=W/2, cyA=H/2;

  // UNIFORM bubble size — position alone tells the story
  const R = 18;

  // Existing: HIGH-Recruiter / LOW-Seeker quadrant — spread, no overlap
  const existing = [
    { x:450,y:355, label:"Paid Placement",   sub:"Platform investment: Very High", la:"start" },
    { x:320,y:358, label:"Easy Apply",        sub:"Platform investment: Very High", la:"end"   },
    { x:453,y:268, label:"Premium Badge",     sub:"Platform investment: High",      la:"start" },
    { x:298,y:262, label:"Applicant Count",   sub:"Platform investment: Medium",    la:"end"   },
    { x:375,y:255, label:"Early Applicant",   sub:"Platform investment: Medium",    la:"middle"},
    { x:278,y:355, label:"Social Graph",      sub:"Platform investment: Low",       la:"end"   },
  ];

  // Missing: SEEKER-BENEFIT quadrants — spread, no overlap
  const missing = [
    { x:108,y: 95, label:"Response Rate",    sub:"Seeker impact: Very High — expose 8% avg"   },
    { x:108,y:202, label:"Ghost Job Flag",   sub:"Seeker impact: Very High — 27% of listings" },
    { x:218,y: 88, label:"ATS Visibility",   sub:"Seeker impact: High — hidden rejection"     },
    { x:218,y:188, label:"Recruiter Active", sub:"Seeker impact: High — abandonment signal"   },
    { x:148,y:318, label:"Budget Verified",  sub:"Seeker impact: Medium — intent signal"      },
    { x:228,y:308, label:"Time-to-Hire",     sub:"Seeker impact: Medium — effort calibration" },
  ];

  return (
    <div style={{ background:C.bg, padding:"44px 48px 36px", fontFamily:"'Georgia',serif", width:900 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:C.amber, marginBottom:8, textTransform:"uppercase", fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs</div>
      <div style={{ fontSize:26, fontWeight:800, color:C.dark, lineHeight:1.15 }}>Who the Product Was Designed For</div>
      <div style={{ fontSize:13.5, color:C.grey, marginTop:6, marginBottom:28, fontStyle:"italic" }}>Position = where the platform chose to invest. The pattern is not subtle.</div>

      <div style={{ display:"flex", gap:28 }}>
        <svg width={W} height={H} style={{ flexShrink:0, overflow:"visible" }}>
          {/* Quadrant fills — subtle, parchment-family only */}
          <rect x={0}   y={0}   width={cxA} height={cyA} fill={`${C.dark}04`}/>
          <rect x={cxA} y={0}   width={cxA} height={cyA} fill={`${C.amber}06`}/>
          <rect x={0}   y={cyA} width={cxA} height={cyA} fill="transparent"/>
          <rect x={cxA} y={cyA} width={cxA} height={cyA} fill={`${C.amber}08`}/>

          {/* Axes */}
          <line x1={cxA} y1={16} x2={cxA} y2={H-16} stroke={C.rule} strokeWidth={1.5}/>
          <line x1={16} y1={cyA} x2={W-16} y2={cyA} stroke={C.rule} strokeWidth={1.5}/>
          <polygon points={`${W-16},${cyA-5} ${W-4},${cyA} ${W-16},${cyA+5}`} fill={C.rule}/>
          <polygon points={`${cxA-5},16 ${cxA},4 ${cxA+5},16`} fill={C.rule}/>

          {/* Axis labels */}
          <text x={W-20} y={cyA+16} fontSize={9} fill={C.muted} textAnchor="end" fontStyle="italic">High Recruiter Benefit →</text>
          <text x={20}   y={cyA+16} fontSize={9} fill={C.muted} fontStyle="italic">← Low Recruiter Benefit</text>
          <text x={cxA+6} y={20}   fontSize={9} fill={C.muted} fontStyle="italic">High Seeker Benefit ↑</text>
          <text x={cxA+6} y={H-8}  fontSize={9} fill={C.muted} fontStyle="italic">Low Seeker Benefit ↓</text>

          {/* Quadrant corner labels */}
          <text x={cxA+10} y={38}  fontSize={9} fontWeight={700} fill="#6A8A7A">Optimal — both benefit</text>
          <text x={22}     y={28}  fontSize={9} fontWeight={700} fill={C.dark}>Seeker-centric territory</text>
          <text x={22}     y={40}  fontSize={8} fill={C.muted}>missing features live here</text>
          <text x={cxA+10} y={H-20} fontSize={9} fontWeight={700} fill="#9A7040">LinkedIn's zone</text>
          <text x={cxA+10} y={H-10} fontSize={8} fill={C.muted}>existing features cluster here</text>

          {/* Missing features — dashed red, size = seeker impact */}
          {missing.map((f,i) => {
            const h=hov===`m${i}`;
            const r = h ? R+3 : R;
            const labelY = f.y + R + 14;
            return(
              <g key={i} onMouseEnter={()=>setHov(`m${i}`)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
                <circle cx={f.x} cy={f.y} r={h?r+4:r}
                  fill="rgba(122,96,48,0.12)" stroke={C.amberDim} strokeWidth={h?2:1.5} strokeDasharray="4,2"
                  style={{transition:"all 0.18s"}}/>
                <text x={f.x} y={f.y+4} textAnchor="middle" fontSize={9} fill={`${C.amberDim}88`} fontFamily="sans-serif">?</text>
                <text x={f.x} y={labelY} textAnchor={f.la||"middle"} fontSize={9.5} fill={C.amberDim} fontFamily="sans-serif" fontWeight={h?700:400}>{f.label}</text>
                {h&&(<g>
                  <rect x={f.x-90} y={f.y-r-40} width={180} height={28} rx={5} fill={C.white} stroke={`${C.amberDim}30`} strokeWidth={1}/>
                  <text x={f.x} y={f.y-r-23} textAnchor="middle" fontSize={10} fill={C.amberDim} fontFamily="sans-serif" fontStyle="italic">{f.sub}</text>
                </g>)}
              </g>
            );
          })}

          {/* Existing features — solid blue, size = platform investment */}
          {existing.map((f,i) => {
            const h=hov===`e${i}`;
            const r = h ? R+3 : R;
            const labelX = f.la==="end" ? f.x - R - 8 : f.la==="start" ? f.x + R + 8 : f.x;
            const anchor = f.la||"middle";
            return(
              <g key={i} onMouseEnter={()=>setHov(`e${i}`)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
                <circle cx={f.x} cy={f.y} r={h?r+4:r}
                  fill="rgba(13,13,13,0.18)" stroke={C.dark} strokeWidth={h?2:1.5}
                  style={{transition:"all 0.18s"}}/>
                <text x={labelX} y={f.y + (f.la==="middle" ? r+14 : 4)}
                  textAnchor={anchor} fontSize={9.5} fill={C.dark} fontFamily="sans-serif" fontWeight={h?700:400}>{f.label}</text>
                {h&&(<g>
                  <rect x={f.x-90} y={f.y-r-40} width={180} height={28} rx={5} fill={C.white} stroke={`${C.dark}30`} strokeWidth={1}/>
                  <text x={f.x} y={f.y-r-23} textAnchor="middle" fontSize={10} fill={C.dark} fontFamily="sans-serif" fontStyle="italic">{f.sub}</text>
                </g>)}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ paddingTop:24, flex:1 }}>
          {/* Legend — uniform bubbles, no size key */}
          {/* Type legend */}
          <div style={{ marginBottom:22 }}>
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:8 }}>
              <svg width={20} height={20}><circle cx={10} cy={10} r={8} fill="rgba(13,13,13,0.18)" stroke={C.dark} strokeWidth={1.5}/></svg>
              <div>
                <div style={{fontSize:11.5,fontWeight:700,color:C.dark,fontFamily:"sans-serif"}}>Exists in LinkedIn</div>
                <div style={{fontSize:9.5,color:C.grey,fontFamily:"sans-serif"}}>Size = platform investment</div>
              </div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:9 }}>
              <svg width={20} height={20}><circle cx={10} cy={10} r={8} fill="rgba(122,96,48,0.12)" stroke={C.amberDim} strokeWidth={1.5} strokeDasharray="3,2"/></svg>
              <div>
                <div style={{fontSize:11.5,fontWeight:700,color:C.amberDim,fontFamily:"sans-serif"}}>Doesn't exist</div>
                <div style={{fontSize:9.5,color:C.grey,fontFamily:"sans-serif"}}>Size = seeker impact if built</div>
              </div>
            </div>
          </div>

          <div style={{ padding:"14px",background:C.panel,borderRadius:7,borderLeft:`3px solid ${C.amber}`,fontSize:11,color:C.dark,lineHeight:1.65 }}>
            The largest missing bubbles sit furthest from LinkedIn's existing zone. The highest-impact features for seekers were the ones never built.
          </div>
        </div>
      </div>
      <div style={{ marginTop:18, fontSize:9.5, color:C.muted, fontStyle:"italic" }}>Source: LinkedIn Jobs UI audit, March 2025 · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  TRANSPARENCY SPECTRUM
// ══════════════════════════════════════════════════════════════════
const TransparencySpectrum = () => {
  const urgency=[{label:"Paid Placement",sub:"Hidden ad surface"},{label:"100+ Clicked Apply",sub:"Metric laundering"},{label:'"Early Applicant"',sub:"Manufactured urgency"},{label:'"Top Applicant"',sub:"Undefined criteria"},{label:"Easy Apply Data Capture",sub:"Pipeline harvesting"},{label:"Promoted Listings",sub:"No visible PAID badge"}];
  const transparency=[{label:"Response Rate Filter",sub:"Would expose 8% avg"},{label:"Ghost Job Flag",sub:"27% of listings"},{label:"Recruiter Activity Date",sub:"Last active signal"},{label:"ATS Requirements",sub:"Rejection criteria"},{label:"Budget Verification",sub:"Hiring intent signal"},{label:"Algorithm Disclosure",sub:"Ranking transparency"}];
  return(
    <div style={{background:C.bg,padding:"44px 48px 36px",fontFamily:"'Georgia',serif",width:900}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:3,color:C.amber,marginBottom:8,textTransform:"uppercase",fontFamily:"sans-serif"}}>Product Teardown · LinkedIn Jobs</div>
      <div style={{fontSize:26,fontWeight:800,color:C.dark,lineHeight:1.15}}>The Information Opacity Spectrum</div>
      <div style={{fontSize:13.5,color:C.grey,marginTop:6,marginBottom:30,fontStyle:"italic"}}>Every signal LinkedIn surfaces or withholds — on a single axis.</div>
      <div style={{marginBottom:10}}><div style={{height:12,borderRadius:6,background:"linear-gradient(to right,#7A6030 0%,#9A7B3A 50%,#0D0D0D 100%)"}}/><div style={{display:"flex",justifyContent:"space-between",marginTop:6}}><div style={{fontSize:9.5,fontWeight:700,color:C.amberDim,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:1}}>← Opacity / Urgency</div><div style={{fontSize:9.5,fontWeight:700,color:C.dark,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:1}}>Transparency / Empowerment →</div></div></div>
      <div style={{height:20}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 48px 1fr",gap:0,alignItems:"start"}}>
        <div>
          <div style={{fontSize:9.5,fontWeight:700,color:C.amberDim,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:"sans-serif",textAlign:"right"}}>LinkedIn surfaces →</div>
          {urgency.map((item,i)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:9,padding:"8px 12px",marginBottom:7,borderRadius:5,background:`rgba(122,96,48,${0.04+i*0.01})`,border:"1px solid rgba(122,96,48,0.14)"}}><div style={{textAlign:"right"}}><div style={{fontSize:11.5,fontWeight:700,color:C.amberDim,fontFamily:"sans-serif"}}>{item.label}</div><div style={{fontSize:10,color:C.muted,fontStyle:"italic",fontFamily:"sans-serif"}}>{item.sub}</div></div><div style={{width:7,height:7,borderRadius:"50%",background:C.amberDim,flexShrink:0}}/></div>))}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:40}}><div style={{width:2,height:300,background:"linear-gradient(to bottom,#7A6030,#9A7B3A,#0D0D0D)"}}/><div style={{fontSize:22,marginTop:8}}>⚖</div></div>
        <div>
          <div style={{fontSize:9.5,fontWeight:700,color:C.dark,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:"sans-serif"}}>← LinkedIn withholds</div>
          {transparency.map((item,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",marginBottom:7,borderRadius:5,background:`rgba(13,13,13,${0.04+i*0.01})`,border:"1px dashed rgba(13,13,13,0.2)"}}><div style={{width:7,height:7,borderRadius:"50%",background:C.dark,flexShrink:0}}/><div><div style={{fontSize:11.5,fontWeight:700,color:C.dark,fontFamily:"sans-serif"}}>{item.label}</div><div style={{fontSize:10,color:C.muted,fontStyle:"italic",fontFamily:"sans-serif"}}>{item.sub}</div></div></div>))}
        </div>
      </div>
      <div style={{marginTop:24,padding:"13px 20px",background:C.panel,borderRadius:7,fontSize:12.5,color:C.dark,lineHeight:1.6,borderLeft:`3px solid ${C.amber}`}}>The platform's urgency signals are visible. Its transparency signals are absent. The information architecture is not neutral.</div>
      <div style={{marginTop:14,fontSize:9.5,color:C.muted,fontStyle:"italic"}}>Source: LinkedIn Jobs UI audit, March 2025 · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  SIGNAL LAYER
// ══════════════════════════════════════════════════════════════════
const SignalLayer = () => {
  const shown=[{signal:"Applicant count (inflated)",effect:"Manufactures urgency"},{signal:'"Be an early applicant"',effect:"Compresses decision window"},{signal:'"Actively reviewing" badge',effect:"Easy Apply only — no enforcement"},{signal:"Promoted by hirer",effect:"Paid placement, no visible badge"},{signal:"Job posted X days ago",effect:"Recency without activity confirmation"},{signal:'"Top applicant" (Premium)',effect:"Undefined criteria, sold as signal"}];
  const withheld=[{signal:"Recruiter last active date",effect:"Would expose abandoned listings"},{signal:"Company response rate",effect:"Would calibrate effort allocation"},{signal:"Ghost job probability",effect:"Would expose zero-intent listings"},{signal:"ATS keyword requirements",effect:"Determines auto-rejection — hidden"},{signal:"Click-to-submission rate",effect:"Gap between click and actual apply"},{signal:"Time since last hire",effect:"Budget signal — never surfaced"}];
  const Row=({item,type})=>(<div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",marginBottom:6,borderRadius:7,background:type==="shown"?"rgba(13,13,13,0.06)":"rgba(122,96,48,0.05)",border:`1px solid ${type==="shown"?"rgba(13,13,13,0.2)":"rgba(122,96,48,0.18)"}`}}><span style={{fontSize:16,lineHeight:1,color:type==="shown"?C.dark:C.amberDim}}>{type==="shown"?"↑":"—"}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:type==="shown"?C.dark:C.amberDim,fontFamily:"sans-serif"}}>{item.signal}</div><div style={{fontSize:11,color:C.muted,fontStyle:"italic",marginTop:2,fontFamily:"sans-serif"}}>{item.effect}</div></div></div>);
  return(<div style={{background:C.bg,padding:"44px 48px 36px",fontFamily:"'Georgia',serif",width:900}}><div style={{fontSize:10,fontWeight:700,letterSpacing:3,color:C.amber,marginBottom:8,textTransform:"uppercase",fontFamily:"sans-serif"}}>Product Teardown · LinkedIn Jobs</div><div style={{fontSize:26,fontWeight:800,color:C.dark,lineHeight:1.15}}>What the Listing Shows You and What It's Decided Not To</div><div style={{fontSize:13.5,color:C.grey,marginTop:8,fontStyle:"italic"}}>Every surfaced signal. Every withheld signal.</div><div style={{height:1,background:`linear-gradient(to right,${C.amber},transparent)`,margin:"24px 0 24px"}}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}><div><div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.dark,textTransform:"uppercase",marginBottom:14,fontFamily:"sans-serif"}}>✓ Shown to you</div>{shown.map((item,i)=><Row key={i} item={item} type="shown"/>)}</div><div><div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.amberDim,textTransform:"uppercase",marginBottom:14,fontFamily:"sans-serif"}}>✗ Withheld from you</div>{withheld.map((item,i)=><Row key={i} item={item} type="withheld"/>)}</div></div><div style={{marginTop:28,padding:"14px 20px",background:C.panel,borderRadius:8,fontSize:13,color:C.dark,lineHeight:1.6,borderLeft:`3px solid ${C.amber}`}}>The signals that drive urgency are shown. The signals that would drive better decisions are withheld.<span style={{color:C.amberDim,fontWeight:700}}> That is not an accident.</span></div><div style={{marginTop:16,fontSize:9.5,color:C.muted,fontStyle:"italic"}}>Source: LinkedIn Jobs UI audit, March 2025 · Resume Builder 2024 · secondfurther.com</div></div>);
};


// ══════════════════════════════════════════════════════════════════
//  WATERFALL — Kay's application collapse, step by step
// ══════════════════════════════════════════════════════════════════
const WaterfallChart = () => {
  const [hov, setHov] = useState(null);

  const W = 820, H = 420;
  const PAD = { l: 64, r: 48, t: 56, b: 100 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;
  const MAX = 155;

  // Each step: label, delta, mechanism (shown on hover), color role
  const steps = [
    { label: "Applications\nSent",        val: 141,  delta: +141, from: 0,   mechanism: "141 applications across 6 months of active job seeking",      role: "start"   },
    { label: "Ghost\nListings",           val: 103,  delta:  -38, from: 141, mechanism: "27% of listings estimated with no active hire intent",          role: "loss"    },
    { label: "ATS\nBlack Hole",           val:  46,  delta:  -57, from: 103, mechanism: "No screening by a human — auto-filtered or never reviewed",     role: "loss"    },
    { label: "Recruiter\nTimeout",        val:  33,  delta:  -13, from:  46, mechanism: "Response probability collapses after 48 hours. Window missed.", role: "loss"    },
    { label: "No Interview\nOffered",     val:   2,  delta:  -31, from:  33, mechanism: "33 responses received. 31 ended without an interview offer",     role: "loss"    },
    { label: "No Offer\nExtended",        val:   0,  delta:  -2,  from:   2, mechanism: "2 first-round interviews. 0 offers.",                           role: "loss"    },
    { label: "Outcome",                   val:   0,  delta:   0,  from:   0, mechanism: "6 months. $240 in Premium fees. 141 applications. 0 offers.",   role: "end"     },
  ];

  const barW = Math.floor(iW / steps.length) - 14;
  const xC   = (i) => PAD.l + (i + 0.5) * (iW / steps.length);
  const yPx  = (v) => PAD.t + iH - (v / MAX) * iH;

  // Connector line between bars (from end of this bar to start of next)
  const connectorY = (i) => {
    if (i >= steps.length - 1) return null;
    const s = steps[i];
    return s.role === "start" ? yPx(s.val) : yPx(s.val);
  };

  const roleColor = (role, hovered) => {
    if (role === "start") return hovered ? C.dark : `${C.dark}CC`;
    if (role === "end")   return hovered ? C.amberDim  : `${C.amberDim}CC`;
    return hovered ? C.amberDim : `${C.amberDim}BB`;
  };

  return (
    <div style={{ background: C.bg, padding: "44px 48px 36px", fontFamily: "'Georgia', serif", width: 900 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:C.amber, marginBottom:8, textTransform:"uppercase", fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs · Kay's Journey</div>
      <div style={{ fontSize:26, fontWeight:800, color:C.dark, lineHeight:1.15 }}>141 Applications. The Waterfall.</div>
      <div style={{ fontSize:13.5, color:C.grey, marginTop:6, marginBottom:32, fontStyle:"italic" }}>Each red bar is a platform failure. Each drop is a mechanism, not a coincidence. Hover for what caused it.</div>

      <svg width={W} height={H} style={{ overflow: "visible", display: "block" }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100, 125, 150].map(v => (
          <g key={v}>
            <line x1={PAD.l} x2={PAD.l + iW} y1={yPx(v)} y2={yPx(v)}
              stroke={v === 0 ? "#C8C0BC" : "#EAE2DE"} strokeWidth={v === 0 ? 1.5 : 0.8} />
            <text x={PAD.l - 10} y={yPx(v) + 4} textAnchor="end" fontSize={10} fill={C.grey} fontFamily="sans-serif">{v}</text>
          </g>
        ))}

        {/* Connector lines between bars (horizontal, dotted) */}
        {steps.slice(0, -1).map((s, i) => {
          const x1 = xC(i) + barW / 2;
          const x2 = xC(i + 1) - barW / 2;
          const y  = yPx(s.val);
          return (
            <line key={i} x1={x1} y1={y} x2={x2} y2={y}
              stroke="#C8C0BC" strokeWidth={1} strokeDasharray="3,3" />
          );
        })}

        {/* Bars */}
        {steps.map((s, i) => {
          const h    = hov === i;
          const col  = roleColor(s.role, h);
          const x    = xC(i) - barW / 2;

          // For loss bars: float between `from` and `val`
          // For start: 0 → val; For end: show a thin line at 0
          let barTop, barHeight;
          if (s.role === "start") {
            barTop    = yPx(s.val);
            barHeight = yPx(0) - yPx(s.val);
          } else if (s.role === "end") {
            barTop    = yPx(2) - 6;
            barHeight = 6; // just a thin line
          } else {
            barTop    = yPx(s.from);
            barHeight = yPx(s.val) - yPx(s.from);
          }

          // Delta label
          const deltaLabel = s.role === "start" ? "141" : s.role === "end" ? "0 offers" : `−${Math.abs(s.delta)}`;
          const deltaColor = s.role === "start" ? C.dark : C.amberDim;

          // Split label into lines
          const lines = s.label.split("\n");

          return (
            <g key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer" }}>

              {/* Bar */}
              <rect x={x} y={barTop} width={barW} height={Math.max(barHeight, 2)}
                fill={col}
                rx={2}
                style={{ transition: "fill 0.15s" }}
              />

              {/* Delta label above/below bar */}
              <text
                x={xC(i)} y={s.role === "loss" ? barTop - 8 : barTop - 10}
                textAnchor="middle" fontSize={13} fontWeight={900}
                fill={deltaColor} fontFamily="sans-serif">
                {deltaLabel}
              </text>

              {/* X-axis label */}
              {lines.map((line, li) => (
                <text key={li}
                  x={xC(i)} y={PAD.t + iH + 20 + li * 14}
                  textAnchor="middle" fontSize={10.5} fill={h ? C.dark : C.grey}
                  fontFamily="sans-serif" fontWeight={h ? 700 : 400}>
                  {line}
                </text>
              ))}

              {/* Hover tooltip */}
              {h && (
                <g>
                  <rect x={xC(i) - 130} y={barTop - 58} width={260} height={46}
                    rx={6} fill={C.dark} />
                  <text x={xC(i)} y={barTop - 40}
                    textAnchor="middle" fontSize={11} fill={C.white} fontFamily="sans-serif">
                    {s.mechanism.length > 52
                      ? s.mechanism.slice(0, 52) + "…"
                      : s.mechanism}
                  </text>
                  {s.mechanism.length > 52 && (
                    <text x={xC(i)} y={barTop - 24}
                      textAnchor="middle" fontSize={11} fill={C.white} fontFamily="sans-serif">
                      {s.mechanism.slice(52).trim()}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* Running total annotations for key steps */}
        {[
          { i: 2, label: "103 potentially active", y: yPx(103) - 6 },
          { i: 4, label: "33 responses",            y: yPx(33) - 6  },
          { i: 5, label: "2 interviews",             y: yPx(2) - 6   },
        ].map(({ i, label, y }) => (
          <text key={i} x={xC(i) + barW / 2 + 6} y={y}
            fontSize={9.5} fill={C.muted} fontFamily="sans-serif" fontStyle="italic"
            dominantBaseline="middle">
            ↓ {label}
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(${PAD.l}, ${PAD.t - 30})`}>
          <rect x={0} y={0} width={12} height={12} rx={2} fill={`${C.dark}CC`} />
          <text x={17} y={10} fontSize={10} fill={C.grey} fontFamily="sans-serif">Starting total</text>
          <rect x={130} y={0} width={12} height={12} rx={2} fill={`${C.amberDim}BB`} />
          <text x={147} y={10} fontSize={10} fill={C.grey} fontFamily="sans-serif">Platform failure mechanism</text>
        </g>
      </svg>

      <div style={{ marginTop: 12, padding: "13px 20px", background: C.panel, borderRadius: 7, fontSize: 12.5, color: C.dark, lineHeight: 1.6, borderLeft: `3px solid ${C.amberDim}` }}>
        Each drop is a named mechanism. None of them are Kay's fault.<span style={{ color: C.amberDim, fontWeight: 700 }}> The waterfall is the product design.</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Primary research (Kay, 2025) · Resume Builder 2024 · LinkedIn dataset · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  SANKEY DIAGRAM — Where 141 applications actually went
// ══════════════════════════════════════════════════════════════════
const SankeyDiagram = () => {
  const [hov, setHov] = useState(null);
  const W = 820, H = 420;
  const xL = 100,  xR = 580, xFar = 750;
  const nodeW = 22;
  const TOTAL = 141;

  // Source node
  const srcH   = 340;
  const srcY   = (H - srcH) / 2;

  // Destination nodes (right column) — ordered top to bottom
  // Each: label, count, color, y start (computed below)
  const destData = [
    { id: "ghost",  label: "Ghost Listings",       count: 38, sub: "27% — zero intent",              color: C.amberDim             },
    { id: "data",   label: "Easy Apply — Data Harvested", count: 40, sub: "Pipeline lead, no screen", color: C.amberDim         },
    { id: "ats",    label: "ATS Auto-Rejected",     count: 30, sub: "Never reached a human",          color: "#B07030"         },
    { id: "resp",   label: "Response Received",     count: 33, sub: "33 of 141 — 23%",                color: C.amber           },
  ];

  // Sub-flows from "Response Received"
  const subData = [
    { id: "int",  label: "Interview",    count:  2, sub: "1.4% of total",   color: C.amber },
    { id: "decl", label: "Declined",     count: 31, sub: "31 of 33",        color: "#908080" },
  ];

  // Compute Y positions for dest nodes
  const destGap = 10;
  const destTotalH = srcH;
  let runY = srcY;
  const dests = destData.map(d => {
    const h = (d.count / TOTAL) * destTotalH;
    const node = { ...d, y: runY, h };
    runY += h + destGap;
    return node;
  });

  // Sub-flow Y positions (below the resp node)
  const respNode  = dests.find(d => d.id === "resp");
  let subRunY = respNode.y;
  const subs = subData.map(s => {
    const h = (s.count / TOTAL) * destTotalH;
    const node = { ...s, y: subRunY, h };
    subRunY += h + destGap;
    return node;
  });

  // Cubic bezier path between two rects
  const flow = (x1, y1, h1, x2, y2, h2, color, id) => {
    const mx = (x1 + x2) / 2;
    const path = [
      `M ${x1} ${y1}`,
      `C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,
      `L ${x2} ${y2 + h2}`,
      `C ${mx} ${y2 + h2}, ${mx} ${y1 + h1}, ${x1} ${y1 + h1}`,
      "Z",
    ].join(" ");
    const isHov = hov === id;
    return (
      <path key={id} d={path}
        fill={color} fillOpacity={isHov ? 0.55 : 0.3}
        stroke={color} strokeOpacity={isHov ? 0.7 : 0.15} strokeWidth={1}
        style={{ cursor: "pointer", transition: "fill-opacity 0.15s" }}
        onMouseEnter={() => setHov(id)}
        onMouseLeave={() => setHov(null)}
      />
    );
  };

  return (
    <div style={{ background: C.bg, padding: "44px 48px 36px", fontFamily: "'Georgia', serif", width: 900 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:C.amber, marginBottom:8, textTransform:"uppercase", fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs · Kay's Journey</div>
      <div style={{ fontSize:26, fontWeight:800, color:C.dark, lineHeight:1.15 }}>Where 141 Applications Actually Went</div>
      <div style={{ fontSize:13.5, color:C.grey, marginTop:6, marginBottom:32, fontStyle:"italic" }}>The width of each flow is proportional to the number of applications lost to that mechanism.</div>

      <svg width={W} height={H} style={{ overflow: "visible", display: "block" }}>

        {/* ── Source node ─────────────────────────────────────── */}
        <rect x={xL} y={srcY} width={nodeW} height={srcH}
          fill={C.dark} fillOpacity={0.85} rx={3} />
        <text x={xL - 10} y={srcY + srcH / 2}
          textAnchor="end" dominantBaseline="middle"
          fontSize={13} fontWeight={800} fill={C.dark} fontFamily="sans-serif">141</text>
        <text x={xL - 10} y={srcY + srcH / 2 + 16}
          textAnchor="end" dominantBaseline="middle"
          fontSize={10} fill={C.grey} fontFamily="sans-serif" fontStyle="italic">applications</text>

        {/* ── Flows + dest nodes ───────────────────────────────── */}
        {dests.map(d => {
          // Source slice Y: proportional position within source block
          const srcSliceY = srcY + ((141 - d.count) / 141 * srcH);
          // For cleaner layout, stack slices from top
          return null; // drawn below
        })}

        {/* Draw flows in order */}
        {(() => {
          let srcOffsetY = srcY;
          return dests.map(d => {
            const fh  = (d.count / TOTAL) * srcH;
            const el  = flow(xL + nodeW, srcOffsetY, fh, xR, d.y, d.h, d.color, d.id);
            srcOffsetY += fh;
            return el;
          });
        })()}

        {/* Sub-flows from response */}
        {(() => {
          let offY = respNode.y;
          return subs.map(s => {
            const fh = (s.count / TOTAL) * srcH;
            const el = flow(xR + nodeW, offY, fh, xFar, s.y, s.h, s.color, s.id);
            offY += fh;
            return el;
          });
        })()}

        {/* Dest node rectangles */}
        {dests.map(d => {
          const isHov = hov === d.id;
          return (
            <g key={d.id}
              onMouseEnter={() => setHov(d.id)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer" }}>
              <rect x={xR} y={d.y} width={nodeW} height={Math.max(d.h, 4)}
                fill={d.color} fillOpacity={isHov ? 1 : 0.85} rx={2}
                style={{ transition: "fill-opacity 0.15s" }} />
              <text x={xR + nodeW + 10} y={d.y + Math.max(d.h, 4) / 2 - 6}
                dominantBaseline="middle" fontSize={11.5} fontWeight={700}
                fill={d.color} fontFamily="sans-serif">{d.label}</text>
              <text x={xR + nodeW + 10} y={d.y + Math.max(d.h, 4) / 2 + 10}
                dominantBaseline="middle" fontSize={10} fill={C.muted}
                fontFamily="sans-serif" fontStyle="italic">{d.count} · {d.sub}</text>
            </g>
          );
        })}

        {/* Sub-flow node rectangles */}
        {subs.map(s => {
          const isHov = hov === s.id;
          return (
            <g key={s.id}
              onMouseEnter={() => setHov(s.id)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer" }}>
              <rect x={xFar} y={s.y} width={nodeW} height={Math.max(s.h, 4)}
                fill={s.color} fillOpacity={isHov ? 1 : 0.85} rx={2}
                style={{ transition: "fill-opacity 0.15s" }} />
              <text x={xFar + nodeW + 10} y={s.y + Math.max(s.h, 4) / 2 - 5}
                dominantBaseline="middle" fontSize={11.5} fontWeight={700}
                fill={s.color} fontFamily="sans-serif">{s.label}</text>
              <text x={xFar + nodeW + 10} y={s.y + Math.max(s.h, 4) / 2 + 10}
                dominantBaseline="middle" fontSize={10} fill={C.muted}
                fontFamily="sans-serif" fontStyle="italic">{s.count} · {s.sub}</text>
            </g>
          );
        })}

        {/* Column labels */}
        <text x={xL + nodeW / 2} y={srcY - 18} textAnchor="middle"
          fontSize={10} fontWeight={700} fill={C.dark} fontFamily="sans-serif" letterSpacing={1.5} textTransform="uppercase">INPUT</text>
        <text x={xR + nodeW / 2} y={srcY - 18} textAnchor="middle"
          fontSize={10} fontWeight={700} fill={C.grey} fontFamily="sans-serif" letterSpacing={1.5}>PLATFORM MECHANISM</text>
        <text x={xFar + nodeW / 2} y={srcY - 18} textAnchor="middle"
          fontSize={10} fontWeight={700} fill={C.grey} fontFamily="sans-serif" letterSpacing={1.5}>OUTCOME</text>
      </svg>

      <div style={{ marginTop: 12, padding: "13px 20px", background: C.panel, borderRadius: 7, fontSize: 12.5, color: C.dark, lineHeight: 1.6, borderLeft: `3px solid ${C.amber}` }}>
        Two of 141 applications resulted in an interview. The 139 that didn't each have a named mechanism. The platform is not a search engine — it is a sorting system with different goals than yours.
      </div>
      <div style={{ marginTop: 14, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Primary research (Kay, 2025) · Resume Builder 2024 · LinkedIn dataset · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  SMALL MULTIPLES — Three cohorts, same axes, same three metrics
// ══════════════════════════════════════════════════════════════════
const SmallMultiples = () => {
  const [hovCell, setHovCell] = useState(null);

  const cohorts = [
    {
      id: "easy",
      title: "Easy Apply\nMass Applicant",
      sub: "Default approach · High volume",
      badge: "Most common",
      badgeColor: C.grey,
      metrics: [
        { label: "Response Rate",  val: 8,   note: "LinkedIn avg — confirmed"          },
        { label: "Interview Rate", val: 2.1, note: "2.1% — Greenhouse 2024"            },
        { label: "Offer Rate",     val: 0.8, note: "Estimated from benchmark data"     },
      ],
      bg: "#F8F3EE",
      border: C.grey,
    },
    {
      id: "targeted",
      title: "Targeted\nDirect Application",
      sub: "Selective · Research-led",
      badge: "Best outcome",
      badgeColor: C.amber,
      metrics: [
        { label: "Response Rate",  val: 23,  note: "23% — industry benchmark"          },
        { label: "Interview Rate", val: 12,  note: "12% — Resume Builder 2024"         },
        { label: "Offer Rate",     val: 5,   note: "5% — estimated from benchmark"     },
      ],
      bg: "#F3F8F3",
      border: C.amber,
    },
    {
      id: "premium",
      title: "LinkedIn Premium\nSubscriber",
      sub: "Kay's cohort · $40/mo · 6 months",
      badge: "$240 spent",
      badgeColor: C.amber,
      metrics: [
        { label: "Response Rate",  val: 23,  note: "33 of 141 — same as targeted"      },
        { label: "Interview Rate", val: 1.4, note: "2 of 141 — closer to mass-apply"   },
        { label: "Offer Rate",     val: 0,   note: "0 offers after 6 months"           },
      ],
      bg: "#FDF6EE",
      border: C.amber,
    },
  ];

  const MAX_VAL = 25;
  const BAR_W   = 180;

  const MetricRow = ({ m, cohortId, ci, isLast }) => {
    const hKey = `${cohortId}-${ci}`;
    const isHov = hovCell === hKey;
    const barPct = Math.min(m.val / MAX_VAL, 1);
    const barColor = m.val === 0 ? "#D0C8C0" : m.val >= 20 ? C.amber : m.val >= 5 ? C.amber : C.amberDim;
    return (
      <div
        onMouseEnter={() => setHovCell(hKey)}
        onMouseLeave={() => setHovCell(null)}
        style={{
          padding: "11px 14px",
          borderBottom: isLast ? "none" : `1px solid rgba(0,0,0,0.06)`,
          background: isHov ? "rgba(255,255,255,0.7)" : "transparent",
          transition: "background 0.12s",
          cursor: "default",
        }}>
        <div style={{ fontSize: 9.5, color: C.grey, fontFamily: "sans-serif", marginBottom: 4, letterSpacing: 0.3 }}>{m.label}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: BAR_W, height: 7, background: "#E8E0DC", borderRadius: 4, flexShrink: 0, overflow: "hidden" }}>
            <div style={{ width: `${barPct * 100}%`, height: "100%", background: barColor, borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: barColor, fontFamily: "sans-serif", lineHeight: 1, minWidth: 36 }}>
            {m.val === 0 ? "0%" : `${m.val}%`}
          </div>
        </div>
        {isHov && (
          <div style={{ fontSize: 10, color: C.muted, fontStyle: "italic", fontFamily: "sans-serif", marginTop: 5 }}>{m.note}</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: C.bg, padding: "44px 48px 36px", fontFamily: "'Georgia', serif", width: 900 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:C.amber, marginBottom:8, textTransform:"uppercase", fontFamily:"sans-serif" }}>Product Teardown · LinkedIn Jobs</div>
      <div style={{ fontSize:26, fontWeight:800, color:C.dark, lineHeight:1.15 }}>Three Cohorts. Same Platform. Same Period.</div>
      <div style={{ fontSize:13.5, color:C.grey, marginTop:6, marginBottom:32, fontStyle:"italic" }}>
        Premium buys a response rate comparable to targeted applications. It does not buy interview outcomes. Hover each metric for the source.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {cohorts.map(c => {
          const lines = c.title.split("\n");
          return (
            <div key={c.id} style={{
              background: c.bg,
              border: `1.5px solid ${c.border}40`,
              borderTop: `3px solid ${c.border}`,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}>
              {/* Panel header */}
              <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    {lines.map((l, i) => (
                      <div key={i} style={{ fontSize: i === 0 ? 15 : 13.5, fontWeight: i === 0 ? 800 : 600, color: C.dark, fontFamily: "sans-serif", lineHeight: 1.25 }}>{l}</div>
                    ))}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: c.badgeColor, background: c.badgeColor + "18", padding: "3px 8px", borderRadius: 10, border: `1px solid ${c.badgeColor}30`, flexShrink: 0, marginLeft: 8, marginTop: 2, fontFamily: "sans-serif" }}>
                    {c.badge}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: C.grey, fontFamily: "sans-serif", fontStyle: "italic" }}>{c.sub}</div>
              </div>

              {/* Metric rows */}
              {c.metrics.map((m, mi) => (
                <MetricRow key={mi} m={m} cohortId={c.id} ci={mi} isLast={mi === c.metrics.length - 1} />
              ))}
            </div>
          );
        })}
      </div>

      {/* The key insight: annotated comparison */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ padding: "12px 16px", background: C.white, borderRadius: 7, border: `1px solid ${C.panel}`, borderLeft: `3px solid ${C.amber}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, fontFamily: "sans-serif", marginBottom: 4 }}>Response rate: Premium = Targeted</div>
          <div style={{ fontSize: 11, color: C.dark, fontFamily: "sans-serif", lineHeight: 1.5 }}>Premium's 23% response rate matches targeted. The signal looks the same from outside.</div>
        </div>
        <div style={{ padding: "12px 16px", background: C.white, borderRadius: 7, border: `1px solid ${C.panel}`, borderLeft: `3px solid ${C.amberDim}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.amberDim, fontFamily: "sans-serif", marginBottom: 4 }}>Interview rate: Premium ≈ Mass-apply</div>
          <div style={{ fontSize: 11, color: C.dark, fontFamily: "sans-serif", lineHeight: 1.5 }}>1.4% interview rate sits closer to Easy Apply (2.1%) than Targeted (12%). Premium buys visibility, not outcomes.</div>
        </div>
      </div>

      <div style={{ marginTop: 12, padding: "13px 20px", background: C.panel, borderRadius: 7, fontSize: 12.5, color: C.dark, lineHeight: 1.6, borderLeft: `3px solid ${C.amber}` }}>
        LinkedIn Premium is optimised to make you feel like a targeted applicant while behaving like a mass applicant.<span style={{ color: C.amberDim, fontWeight: 700 }}> The gap between those two feelings is $40 a month.</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 9.5, color: C.muted, fontStyle: "italic" }}>Sources: Primary research (Kay, 2025) · Greenhouse Benchmark 2024 · Resume Builder 2024 · secondfurther.com</div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════
//  MAIN — two-level nav
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState(0);
  const [group, setGroup]   = useState(0);

  const groups = [
    { label: "Primary Research", tabs: [
      { label: "Kay's Receipt",    sub: "Brand Palette",        view: <KayReceipt /> },
    ]},
    { label: "Data Charts", tabs: [
      { label: "Efficiency Decay", sub: "Bubble",               view: <BubbleChart /> },
      { label: "Flood & Drain",    sub: "Funnel",               view: <RecruiterFunnel /> },
    ]},
    { label: "Ad Surface", tabs: [
      { label: "Split-Screen",     sub: "Ideal vs Reality",     view: <SplitScreen /> },
      { label: "Peel-Back",        sub: "3-Layer Reveal",       view: <PeelBack /> },
      { label: "Decision Matrix",  sub: "Priority Bubbles",     view: <DecisionMatrix /> },
      { label: "Transparency",     sub: "Spectrum",             view: <TransparencySpectrum /> },
    ]},
    { label: "Signal Layer", tabs: [
      { label: "Signal Layer",     sub: "Shown vs Hidden",      view: <SignalLayer /> },
      { label: "Scorecard",        sub: "Progress Bars",        view: <Scorecard /> },
      { label: "Spider Chart",     sub: "Radar / New option",   view: <SpiderChart /> },
      { label: "Network Graph",    sub: "Architecture",         view: <NetworkGraph /> },
    ]},
    { label: "Kay's Collapse", tabs: [
      { label: "Waterfall",        sub: "The 141 Drop",         view: <WaterfallChart /> },
      { label: "Sankey",           sub: "Where They Went",      view: <SankeyDiagram /> },
      { label: "Small Multiples",  sub: "3 Cohorts",            view: <SmallMultiples /> },
    ]},
  ];

  const gStart = groups.reduce((acc, g, i) => { acc[i] = i === 0 ? 0 : acc[i-1] + groups[i-1].tabs.length; return acc; }, {});
  const allTabs = groups.flatMap(g => g.tabs);

  return (
    <div style={{ background: "#E8E0DC", minHeight: "100vh", padding: "28px 24px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: 3, fontSize: 11, letterSpacing: 3, color: C.amber, fontWeight: 700, textTransform: "uppercase" }}>SecondFurther · LinkedIn Jobs Teardown</div>
      <div style={{ marginBottom: 16, fontSize: 12, color: C.grey }}>14 visualizations · 5 sections · hover for detail</div>

      {/* Section groups */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {groups.map((g, gi) => (
          <button key={gi} onClick={() => { setGroup(gi); setActive(gStart[gi]); }} style={{
            padding: "5px 15px", borderRadius: 14, border: "none", cursor: "pointer",
            background: group === gi ? C.amber : "rgba(255,255,255,0.45)",
            color: group === gi ? C.dark : C.grey,
            fontSize: 10.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
            fontFamily: "sans-serif", transition: "all 0.15s",
          }}>{g.label}</button>
        ))}
      </div>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 7, marginBottom: 24, flexWrap: "wrap" }}>
        {groups[group].tabs.map((t, i) => {
          const gi = gStart[group] + i;
          return (
            <button key={t.label} onClick={() => setActive(gi)} style={{
              padding: "8px 18px", borderRadius: 18, border: "none", cursor: "pointer",
              background: active === gi ? C.dark : C.white,
              color: active === gi ? C.white : C.grey,
              fontSize: 12, fontWeight: 600, letterSpacing: 0.4,
              fontFamily: "sans-serif", transition: "all 0.15s",
              boxShadow: active === gi ? "0 2px 12px rgba(0,0,0,0.15)" : "none",
            }}>
              {t.label} <span style={{ opacity: 0.5, fontSize: 10 }}>· {t.sub}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "inline-block", boxShadow: "0 8px 48px rgba(0,0,0,0.12)", borderRadius: 4 }}>
        {allTabs[active].view}
      </div>
    </div>
  );
}
