import { useId } from "react";
import styled from "styled-components";

const themes = {
    TMP: { icon: "☀", color: "#b7682b", background: "#fff3e5" },
    UUU: { icon: "↔", color: "#537c95", background: "#edf4fa" },
    VVV: { icon: "↕", color: "#537c95", background: "#edf4fa" },
    VEC: { icon: "↗", color: "#537c95", background: "#edf4fa" },
    WSD: { icon: "≋", color: "#537c95", background: "#edf4fa" },
    SKY: { icon: "☁", color: "#b7682b", background: "#fff3e5" },
    PTY: { icon: "☂", color: "#6775ad", background: "#f0f1fc" },
    POP: { icon: "%", color: "#6775ad", background: "#f0f1fc" },
    WAV: { icon: "≈", color: "#187d70", background: "#e8f6f1" },
    PCP: { icon: "☂", color: "#6775ad", background: "#f0f1fc" },
};
const Card = styled.article`
    position: relative; overflow: hidden; isolation: isolate;
    min-width: 0; padding: 24px; border: 1px solid #e0e9eb; border-radius: 18px;
    background: #fff; box-shadow: 0 4px 16px #163b4503;
    transition: border-color .3s, box-shadow .3s, transform .3s, background .3s;
    &:hover, &:focus-visible {
        border-color: #a8cdc5; box-shadow: 0 14px 32px #163b4515; transform: translateY(-4px);
        background: linear-gradient(135deg, white 25%, ${({ $tint }) => $tint});
    }
    &:focus-visible { outline: 3px solid #8bd3c6; outline-offset: 3px; }
    &:hover .weather-motion, &:focus-visible .weather-motion { opacity: 1; animation-play-state: running; }
    &:hover .weather-motion *, &:focus-visible .weather-motion * { animation-play-state: running; }
    header, h3, p { position: relative; z-index: 1; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 24px; }
    small { color: #758a90; font-size: 11px; letter-spacing: .08em; }
    h3 { color: #657b82; font-size: 14px; font-weight: 500; margin: 0 0 10px; }
    p { color: #183e47; font-size: clamp(23px, 3vw, 30px); font-weight: 750; letter-spacing: -.04em; margin: 0; overflow-wrap: anywhere; }
    @media (max-width: 600px) { padding: 20px 16px; }
    @media (prefers-reduced-motion: reduce) {
        transition: none; transform: none !important;
        .weather-motion, .weather-motion * { animation: none !important; transition: none; }
    }
`;
const Motion = styled.svg`
    position: absolute; right: -4px; top: 32px; width: 148px; height: 98px;
    pointer-events: none; color: ${({ $color }) => $color}; opacity: 0;
    transition: opacity .35s; z-index: 0;
    animation: forecast-luminous 3.2s ease-in-out infinite paused;
    .spark { filter: drop-shadow(0 0 3px currentColor); }
    fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round;
    .sun { transform-origin: 60px 36px; animation: forecast-sun 9s linear infinite; }
    .cloud { animation: forecast-cloud 3s ease-in-out infinite alternate; }
    .wind { animation: forecast-wind 1.8s ease-in-out infinite; }
    .wave { animation: forecast-wave 2.4s ease-in-out infinite alternate; }
    .drop { animation: forecast-rain 1.2s linear infinite; }
    .snow { animation: forecast-snow 3s linear infinite; }
    .calm { transform-origin: 60px 36px; animation: forecast-calm 2.6s ease-in-out infinite; }
    .needle { transform-origin: 60px 36px; animation: forecast-needle 2s ease-in-out infinite alternate; }
    .halo { transform-origin: 60px 36px; animation: forecast-glow 3s ease-in-out infinite; }
    .spark { transform-box: fill-box; transform-origin: center; animation: forecast-spark 2s ease-in-out infinite; }
    .splash { transform-origin: 60px 66px; animation: forecast-splash 1.6s ease-out infinite; }
    .leaf { animation: forecast-leaf 3s ease-in-out infinite; }
    .delayed { animation-delay: -.6s; }
    .later { animation-delay: -1.2s; }
    & * { animation-play-state: paused; }
    @keyframes forecast-sun { to { transform: rotate(360deg); } }
    @keyframes forecast-luminous {
        0%, 100% { filter: drop-shadow(0 0 2px ${({ $color }) => $color}55) brightness(1); }
        50% { filter: drop-shadow(0 0 7px ${({ $color }) => $color}88) brightness(1.12); }
    }
    @keyframes forecast-cloud { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
    @keyframes forecast-wind { from { transform: translateX(-28px); opacity: 0; } 35%, 65% { opacity: .65; } to { transform: translateX(28px); opacity: 0; } }
    @keyframes forecast-wave { from { transform: translate(-12px, 2px); } to { transform: translate(10px, -2px); } }
    @keyframes forecast-rain { from { transform: translate(3px, -8px); opacity: 0; } 25% { opacity: .65; } to { transform: translate(-7px, 20px); opacity: 0; } }
    @keyframes forecast-snow { from { transform: translate(-4px, -8px); opacity: 0; } 30% { opacity: .65; } to { transform: translate(6px, 22px); opacity: 0; } }
    @keyframes forecast-calm { 0%, 100% { transform: scale(.9); opacity: .25; } 50% { transform: scale(1.08); opacity: .55; } }
    @keyframes forecast-needle { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
    @keyframes forecast-glow { 0%, 100% { transform: scale(.88); opacity: .5; } 50% { transform: scale(1.16); opacity: .95; } }
    @keyframes forecast-spark { 0%, 100% { transform: scale(.4); opacity: .2; } 50% { transform: scale(1.15); opacity: .9; } }
    @keyframes forecast-splash { from { transform: scaleX(.3); opacity: .6; } to { transform: scaleX(1.6); opacity: 0; } }
    @keyframes forecast-leaf { 0% { transform: translate(-24px, 5px) rotate(-8deg); opacity: 0; } 40% { opacity: .85; } 100% { transform: translate(25px, -8px) rotate(15deg); opacity: 0; } }
`;

const getMotion = (category, value) => {
    const text = String(value).replace(/\s/g, "");
    if (!text) return null;
    if (category === "TMP") return parseFloat(text) <= 0 ? "frost" : "warmth";
    if (category === "VEC") return "direction";
    if (["UUU", "VVV", "WSD"].includes(category)) return parseFloat(text) === 0 ? "calm" : "wind";
    if (category === "WAV") return parseFloat(text) === 0 ? "calm" : "wave";
    if (category === "SKY") return text === "맑음" || text === "1" ? "sun" : text === "흐림" || text === "4" ? "overcast" : "cloud";
    if (["PTY", "PCP", "POP"].includes(category)) {
        if (/^(?:강수)?없음(?:mm)?$/i.test(text) || /^0(?:\.0+)?(?:mm|%)?$/i.test(text)) return "calm";
        if (text.includes("비/눈") || (text.includes("비") && text.includes("눈")) || (category === "PTY" && ["2", "6"].includes(text))) return "sleet";
        if (text.includes("눈") || (category === "PTY" && ["3", "7"].includes(text))) return "snow";
        // 강수확률만으로 비가 온다고 표현하지 않습니다.
        return category === "POP" ? "cloud" : "rain";
    }
    return null;
};

const WeatherMotion = ({ kind, color, value }) => {
    const id = useId().replace(/:/g, "");
    const paint = (name) => `url(#${id}-${name})`;
    const wet = ["rain", "snow", "sleet"].includes(kind);
    const sunny = ["sun", "warmth", "cloud"].includes(kind);
    return (
        <Motion className="weather-motion" viewBox="0 0 120 80" $color={color} aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id={`${id}-glow`}><stop stopColor="#ffc85b" stopOpacity=".7" /><stop offset="1" stopColor="#ffe3a4" stopOpacity="0" /></radialGradient>
                <linearGradient id={`${id}-sun`} x2=".7" y2="1"><stop stopColor="#ffe39a" /><stop offset="1" stopColor="#ff9b3d" /></linearGradient>
                <linearGradient id={`${id}-cloud`} x2="0" y2="1"><stop stopColor={wet || kind === "overcast" ? "#a7bbd1" : "#ffffff"} /><stop offset="1" stopColor={wet || kind === "overcast" ? "#6f8fae" : "#c7deeb"} /></linearGradient>
                <linearGradient id={`${id}-water`} x2="0" y2="1"><stop stopColor="#58d7cb" /><stop offset="1" stopColor="#258bc0" /></linearGradient>
            </defs>
            {sunny && <g opacity={kind === "cloud" ? ".65" : ".85"}>
                <circle className="halo" cx="60" cy="36" r="37" fill={paint("glow")} stroke="none" />
                <g className="sun" stroke="#f3ad44" strokeWidth="3">
                    {Array.from({ length: 12 }, (_, i) => <path key={i} transform={`rotate(${i * 30} 60 36)`} d="M60 10v5" />)}
                </g>
                <circle cx="60" cy="36" r="15" fill={paint("sun")} stroke="#f7b754" strokeWidth="1" />
                {[ [25, 20], [94, 18], [87, 61] ].map(([x, y], i) => <path key={x} className={`spark ${i ? "delayed" : ""}`} stroke="#ecae4a" d={`M${x - 3} ${y}h6m-3-3v6`} />)}
            </g>}
            {["cloud", "overcast", "rain", "snow", "sleet"].includes(kind) && <g>
                <path className="cloud later" opacity=".4" fill="#a3bfd1" stroke="none" d="M22 34h57a10 10 0 0 0 0-20 18 18 0 0 0-34-2 13 13 0 0 0-23 22Z" />
                <path className="cloud" fill={paint("cloud")} stroke="#99b5c9" strokeWidth=".7" d="M38 46h49a11 11 0 0 0 0-22 17 17 0 0 0-32-4 13 13 0 0 0-17 26Z" />
            </g>}
            {["rain", "sleet"].includes(kind) && <g stroke="#429ad1" strokeWidth="2.5">
                {[33, 45, 57, 69, 81, 93].map((x, i) => <path key={x} className="drop" style={{ animationDelay: `${-i * .19}s` }} d={`M${x} 49l-4 9`} />)}
                <ellipse className="splash" cx="60" cy="67" rx="16" ry="2" strokeWidth="1" />
            </g>}
            {["snow", "sleet", "frost"].includes(kind) && <g stroke="#79b6d6" strokeWidth="1.4">
                {[28, 44, 62, 78, 94].map((x, i) => <g key={x} className="snow" style={{ animationDelay: `${-i * .55}s` }}><path d={`M${x - 3} 51h6m-3-3v6m-2-5 4 4m0-4-4 4`} /></g>)}
                {kind === "frost" && <g className="calm"><circle cx="60" cy="30" r="20" fill="#e3f6ff" stroke="none" /><path d="M60 13v34M45 21l30 18m-30 0 30-18M56 17l4 4 4-4m-8 26 4-4 4 4" /></g>}
            </g>}
            {kind === "wind" && <g stroke="#6ba9be" strokeWidth="2.5">
                <path className="wind" d="M13 25h59q14 0 14-10t-11-6" />
                <path className="wind delayed" d="M21 40h76q12 0 12-8" />
                <path className="wind later" d="M8 55h52q13 0 13 9" />
                <path className="leaf" d="M46 31q12-16 24-5-5 16-24 5Z" fill="#8dc9aa" stroke="#63a88b" strokeWidth="1" />
                <path className="leaf delayed" d="M32 49q8-10 17-3-4 10-17 3Z" fill="#b8dca8" stroke="none" />
            </g>}
            {kind === "wave" && <g>
                {[29, 42, 55].map((y, i) => <path key={y} className={`wave ${i === 1 ? "delayed" : i === 2 ? "later" : ""}`} opacity={.25 + i * .2} fill={paint("water")} stroke="#4dbabf" strokeWidth="1" d={`M-18 ${y}q15-14 30 0t30 0t30 0t30 0t30 0v35H-18Z`} />)}
                {[ [35, 26], [78, 37], [96, 22] ].map(([x, y], i) => <circle key={x} className={`spark ${i ? "delayed" : ""}`} cx={x} cy={y} r="2" fill="#87dcd8" stroke="none" />)}
            </g>}
            {kind === "direction" && <g opacity=".8">
                <circle cx="60" cy="36" r="27" fill="#e8f3f8" stroke="#abcbd8" strokeWidth="1" />
                <circle className="sun" cx="60" cy="36" r="23" stroke="#7eafc3" strokeDasharray="1 5" />
                <g transform={`rotate(${Number.isFinite(parseFloat(value)) ? parseFloat(value) : 0} 60 36)`}>
                    <g className="needle"><path d="m60 16 8 20-8-4-8 4Z" fill="#4798b0" stroke="none" /><path d="m60 56 8-20-8 4-8-4Z" fill="#b3d2de" stroke="none" /></g>
                </g><circle cx="60" cy="36" r="3" fill="white" stroke="#7eafc3" />
            </g>}
            {kind === "calm" && <g stroke="#73bbaa">
                <circle className="halo" cx="60" cy="36" r="26" fill="#e0f5ee" stroke="none" />
                <ellipse className="calm" cx="60" cy="42" rx="30" ry="10" strokeWidth="1" />
                <ellipse className="calm delayed" cx="60" cy="42" rx="18" ry="5" strokeWidth="1" />
                <path className="spark" d="M84 18h8m-4-4v8M31 28h6m-3-3v6" />
            </g>}
        </Motion>
    );
};
const Icon = styled.span`
    display: inline-flex; align-items: center; justify-content: center;
    width: 42px; height: 42px; border-radius: 13px; font-size: 25px;
    color: ${({ $theme }) => $theme.color}; background: ${({ $theme }) => $theme.background};
`;
const ForcastItem = ({ item }) => {
    const theme = themes[item.category] || { icon: "◌", color: "#187d70", background: "#e8f6f1" };
    const displayValue = item.category === "PCP" && /^강수없음(?:mm)?$/i.test(String(item.fcstValue).replace(/\s/g, ""))
        ? "0mm"
        : item.fcstValue;
    const motion = getMotion(item.category, displayValue);
    return (
        <Card tabIndex={0} $tint={motion === "frost" ? "#eaf6ff" : theme.background}>
            {motion && <WeatherMotion kind={motion} color={theme.color} value={displayValue} />}
            <header><Icon $theme={theme} aria-hidden="true">{theme.icon}</Icon><small>{item.category}</small></header>
            <h3>{item.categoryName}</h3>
            <p>{displayValue === "" ? "정보 없음" : displayValue}</p>
        </Card>
    );
};
export default ForcastItem;
