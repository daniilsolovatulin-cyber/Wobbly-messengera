const { useState, useRef, useEffect, useCallback } = React;

/* ============================================================
   THEME SYSTEM
   ============================================================ */
const THEMES = {
  aurora: {
    name: "Aurora",
    bg: "linear-gradient(160deg, #14131c 0%, #1b1428 55%, #14131c 100%)",
    panel: "rgba(30, 27, 42, 0.55)",
    panelBorder: "rgba(255,255,255,0.06)",
    bubbleThem: "rgba(61, 51, 80, 0.85)",
    bubbleMe: "#E8836B",
    bubbleMeText: "#241209",
    accent: "#E8836B",
    mint: "#7FD4B5",
    text: "#F2EEE8",
    textDim: "#B8B0C4",
    glow: "rgba(232,131,107,0.25)",
  },
  midnight: {
    name: "Полночь",
    bg: "linear-gradient(160deg, #0a0e17 0%, #0f1a2e 55%, #0a0e17 100%)",
    panel: "rgba(15, 23, 42, 0.55)",
    panelBorder: "rgba(255,255,255,0.06)",
    bubbleThem: "rgba(30, 41, 59, 0.85)",
    bubbleMe: "#5B8CFF",
    bubbleMeText: "#08122c",
    accent: "#5B8CFF",
    mint: "#6FE3C9",
    text: "#EAF0FF",
    textDim: "#94A3C4",
    glow: "rgba(91,140,255,0.25)",
  },
  sakura: {
    name: "Сакура",
    bg: "linear-gradient(160deg, #1a1116 0%, #241522 55%, #1a1116 100%)",
    panel: "rgba(41, 24, 36, 0.55)",
    panelBorder: "rgba(255,255,255,0.06)",
    bubbleThem: "rgba(63, 35, 51, 0.85)",
    bubbleMe: "#F587B3",
    bubbleMeText: "#2b0a17",
    accent: "#F587B3",
    mint: "#7FD4B5",
    text: "#FBEFF3",
    textDim: "#C9A3B4",
    glow: "rgba(245,135,179,0.25)",
  },
  azure: {
    name: "Лазурь",
    bg: "linear-gradient(160deg, #071019 0%, #0c2233 55%, #071019 100%)",
    panel: "rgba(12, 34, 51, 0.55)",
    panelBorder: "rgba(255,255,255,0.06)",
    bubbleThem: "rgba(19, 47, 68, 0.85)",
    bubbleMe: "#3FC1E0",
    bubbleMeText: "#04222c",
    accent: "#3FC1E0",
    mint: "#6FE3C9",
    text: "#E7F7FC",
    textDim: "#8FB6C7",
    glow: "rgba(63,193,224,0.25)",
  },
};

/* ============================================================
   HELPERS
   ============================================================ */
function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function fileKind(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return "file";
}

/* ============================================================
   ICONS (inline SVG, no external icon library needed)
   ============================================================ */
function Icon({ size = 16, children, style, strokeWidth = 2 }) {
  return React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { display: "block", flexShrink: 0, ...style },
    },
    children
  );
}
const Lock = (p) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>;
const Send = (p) => <Icon {...p}><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></Icon>;
const Paperclip = (p) => <Icon {...p}><path d="M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95L9.41 17.41a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48" /></Icon>;
const FileText = (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></Icon>;
const Film = (p) => <Icon {...p}><rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></Icon>;
const X = (p) => <Icon {...p}><path d="M18 6 6 18" /><path d="M6 6l12 12" /></Icon>;
const Settings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></Icon>;
const Check = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>;
const CheckCheck = (p) => <Icon {...p}><path d="M18 6 7 17l-5-5" /><path d="m22 10-7.5 7.5L13 16" /></Icon>;
const Wifi = (p) => <Icon {...p}><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></Icon>;

/* ============================================================
   ATTACHMENT CHIP (composer preview)
   ============================================================ */
function AttachmentChip({ att, onRemove, theme }) {
  const progress = att.progress;
  return (
    <div className="pop-in" style={{
      position: "relative", width: 74, height: 74, borderRadius: 14, overflow: "hidden",
      flexShrink: 0, border: `1px solid ${theme.panelBorder}`, background: "rgba(0,0,0,0.3)",
    }}>
      {att.kind === "image" && <img src={att.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      {att.kind === "video" && (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <video src={att.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <Film size={18} style={{ position: "absolute", top: 6, left: 6, color: "#fff" }} />
        </div>
      )}
      {att.kind === "file" && (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: theme.textDim, padding: 4 }}>
          <FileText size={22} />
          <span style={{ fontSize: 8.5, textAlign: "center", lineHeight: 1.1, color: theme.text }}>
            {att.name.length > 12 ? att.name.slice(0, 10) + "…" : att.name}
          </span>
        </div>
      )}
      {progress < 100 && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle
              cx="14" cy="14" r="11" fill="none" stroke={theme.accent} strokeWidth="3" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 11}
              strokeDashoffset={2 * Math.PI * 11 * (1 - progress / 100)}
              transform="rotate(-90 14 14)"
              style={{ transition: "stroke-dashoffset 0.2s linear" }}
            />
          </svg>
        </div>
      )}
      <button onClick={() => onRemove(att.id)} className="tap-shrink" style={{
        position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%",
        background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", display: "flex",
        alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0,
      }}>
        <X size={11} />
      </button>
    </div>
  );
}

/* ============================================================
   ATTACHMENT BLOCK (inside a sent bubble)
   ============================================================ */
function AttachmentBlock({ att, theme }) {
  if (att.kind === "image") {
    return <img src={att.url} alt={att.name} style={{ width: "100%", maxWidth: 260, borderRadius: 12, display: "block", marginBottom: 6 }} />;
  }
  if (att.kind === "video") {
    return <video src={att.url} controls style={{ width: "100%", maxWidth: 260, borderRadius: 12, display: "block", marginBottom: 6 }} />;
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12, background: "rgba(0,0,0,0.18)", marginBottom: 6, minWidth: 200 }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <FileText size={16} color={theme.bubbleMeText} />
      </div>
      <div style={{ overflow: "hidden" }}>
        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{att.name}</div>
        <div style={{ fontSize: 11, opacity: 0.65 }}>{fmtSize(att.size)}</div>
      </div>
    </div>
  );
}

/* ============================================================
   MESSAGE BUBBLE — CSS spring-like entrance (cubic-bezier overshoot)
   ============================================================ */
function Bubble({ msg, theme }) {
  const isMe = msg.from === "me";
  return (
    <div className="bubble-row" style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 8 }}>
      <div className="bubble-spring" style={{
        transformOrigin: isMe ? "bottom right" : "bottom left",
        maxWidth: "74%",
        padding: msg.attachments?.length ? "8px" : "9px 14px",
        borderRadius: isMe ? "18px 18px 5px 18px" : "18px 18px 18px 5px",
        background: isMe ? theme.bubbleMe : theme.bubbleThem,
        backdropFilter: isMe ? "none" : "blur(14px)",
        WebkitBackdropFilter: isMe ? "none" : "blur(14px)",
        color: isMe ? theme.bubbleMeText : theme.text,
        fontSize: 15, lineHeight: 1.4,
        boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
        wordBreak: "break-word",
      }}>
        {msg.attachments?.map((att) => <AttachmentBlock key={att.id} att={att} theme={theme} />)}
        {msg.text && <div style={{ padding: msg.attachments?.length ? "0 6px" : 0 }}>{msg.text}</div>}
        <div style={{
          fontSize: 10.5, opacity: 0.6, marginTop: 3, padding: msg.attachments?.length ? "0 6px" : 0,
          textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center",
        }}>
          {msg.time}
          {isMe && (msg.status === "sent" ? <Check size={11} /> : <CheckCheck size={11} />)}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator({ theme }) {
  return (
    <div className="bubble-row" style={{ display: "flex", marginBottom: 8 }}>
      <div style={{ background: theme.bubbleThem, backdropFilter: "blur(14px)", borderRadius: "18px 18px 18px 5px", padding: "12px 16px", display: "flex", gap: 5 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: theme.textDim, display: "inline-block", animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

function EncryptionBadge({ theme }) {
  return (
    <div className="pop-in" style={{
      display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: theme.mint,
      padding: "6px 12px", background: "rgba(127, 212, 181, 0.1)", borderRadius: 20,
      margin: "4px auto 14px", width: "fit-content", border: "1px solid rgba(127, 212, 181, 0.25)",
    }}>
      <span className="breathe" style={{ display: "flex" }}><Lock size={12} strokeWidth={2.5} /></span>
      Сквозное шифрование включено
    </div>
  );
}

/* ============================================================
   SETTINGS PANEL
   ============================================================ */
function SettingsPanel({ open, onClose, themeKey, setThemeKey, theme }) {
  if (!open) return null;
  return (
    <>
      <div className="fade-in" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 10 }} />
      <div className="sheet-in" style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 11, background: theme.panel,
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderTop: `1px solid ${theme.panelBorder}`,
        borderRadius: "22px 22px 0 0", padding: 20, color: theme.text, maxWidth: 460, margin: "0 auto",
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 4, background: theme.textDim, opacity: 0.4, margin: "0 auto 16px" }} />
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Тема оформления</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {Object.entries(THEMES).map(([key, t]) => (
            <button key={key} onClick={() => setThemeKey(key)} className="tap-shrink" style={{
              flex: "1 1 40%", border: key === themeKey ? `2px solid ${t.accent}` : `1px solid ${theme.panelBorder}`,
              borderRadius: 16, padding: 12, background: t.bg, cursor: "pointer", display: "flex",
              flexDirection: "column", alignItems: "center", gap: 8,
            }}>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: t.bubbleMe }} />
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: t.bubbleThem }} />
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: t.mint }} />
              </div>
              <span style={{ fontSize: 12.5, color: t.text, fontWeight: 600 }}>{t.name}</span>
              {key === themeKey && <Check size={13} color={t.accent} />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   GENIE OVERLAY — text gets sucked from the input into the send
   button, narrowing and warping via an SVG turbulence filter.
   ============================================================ */
let genieFilterSeq = 0;
function GenieOverlay({ text, fromRect, toRect, theme, onDone }) {
  const filterId = useRef(`genie-warp-${genieFilterSeq++}`).current;
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const dx = toRect.x - fromRect.x;
    const dy = toRect.y - fromRect.y;

    const anim = el.animate(
      [
        { left: `${fromRect.x}px`, top: `${fromRect.y}px`, width: `${fromRect.width}px`, height: `${fromRect.height}px`, opacity: 1, borderRadius: "22px", transform: "scaleY(1)" },
        { left: `${fromRect.x + dx * 0.85}px`, top: `${fromRect.y + dy * 0.6}px`, width: `${fromRect.width * 0.55}px`, height: `${fromRect.height * 0.7}px`, opacity: 0.9, borderRadius: "30px", transform: "scaleY(1.3)" },
        { left: `${fromRect.x + dx}px`, top: `${fromRect.y + dy}px`, width: "4px", height: "4px", opacity: 0, borderRadius: "50px", transform: "scaleY(0.2)" },
      ],
      { duration: 480, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" }
    );
    anim.onfinish = onDone;
    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={elRef} style={{
      position: "fixed", zIndex: 50, pointerEvents: "none", background: theme.bubbleMe, color: theme.bubbleMeText,
      display: "flex", alignItems: "center", padding: "0 16px", fontSize: 15, whiteSpace: "nowrap",
      overflow: "hidden", filter: `url(#${filterId})`, boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
    }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" values="0.02 0.06;0.04 0.1;0.02 0.06" dur="0.48s" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16">
            <animate attributeName="scale" values="2;24;4" dur="0.48s" />
          </feDisplacementMap>
        </filter>
      </svg>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{text}</span>
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
const SEED_MESSAGES = [
  { id: 1, from: "them", text: "Привет! Смотри что получилось 👀", time: "12:01", status: "read" },
  { id: 2, from: "me", text: "Пружины теперь реально пружинят, красота", time: "12:02", status: "read" },
  { id: 3, from: "them", text: "Можно ещё фотки и файлы кидать, гляди", time: "12:02", status: "read" },
];
const REPLIES = [
  "Вау, реально как в телеге пружинит!",
  "Тема огонь, обожаю блюр 😍",
  "А файл красиво так с прогрессом грузится",
  "Го теперь видео закинь",
];

function App() {
  const [themeKey, setThemeKey] = useState("aurora");
  const theme = THEMES[themeKey];
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [pending, setPending] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [genie, setGenie] = useState(null);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const sendBtnRef = useRef(null);
  const idRef = useRef(4);
  const attIdRef = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, pending]);

  const handleFiles = useCallback((fileList) => {
    Array.from(fileList).forEach((file) => {
      const id = attIdRef.current++;
      const kind = fileKind(file);
      const url = kind !== "file" ? URL.createObjectURL(file) : null;
      setPending((p) => [...p, { id, name: file.name, size: file.size, kind, url, progress: 0 }]);
      let prog = 0;
      const interval = setInterval(() => {
        prog += 12 + Math.random() * 18;
        if (prog >= 100) { prog = 100; clearInterval(interval); }
        setPending((p) => p.map((a) => (a.id === id ? { ...a, progress: prog } : a)));
      }, 160);
    });
  }, []);

  const removeAttachment = useCallback((id) => setPending((p) => p.filter((a) => a.id !== id)), []);

  const commitMessage = useCallback((text, attachments) => {
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { id: idRef.current++, from: "me", text, time, status: "sent", attachments }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, {
        id: idRef.current++, from: "them",
        text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        status: "read",
      }]);
    }, 1300 + Math.random() * 900);
  }, []);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text && pending.length === 0) return;
    const attachments = pending.map((a) => ({ ...a }));

    if (!text || !inputRef.current || !sendBtnRef.current) {
      commitMessage(text, attachments);
      setInput(""); setPending([]);
      return;
    }
    const fromEl = inputRef.current.getBoundingClientRect();
    const toEl = sendBtnRef.current.getBoundingClientRect();
    setGenie({
      text,
      fromRect: { x: fromEl.left, y: fromEl.top, width: fromEl.width, height: fromEl.height },
      toRect: { x: toEl.left + toEl.width / 2 - 20, y: toEl.top + toEl.height / 2 - 20, width: 40, height: 40 },
    });
    setInput(""); setPending([]);
    setTimeout(() => commitMessage(text, attachments), 480);
  }, [input, pending, commitMessage]);

  const allUploaded = pending.every((a) => a.progress >= 100);

  return (
    <div style={{ height: "100vh", width: "100%", background: theme.bg, fontFamily: "'Nunito','Segoe UI',sans-serif", display: "flex", justifyContent: "center", color: theme.text }}>
      <div style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 320, height: 200, background: theme.glow, filter: "blur(70px)", pointerEvents: "none", transition: "background 0.4s ease" }} />

        <div style={{ padding: "14px 18px", background: theme.panel, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${theme.panelBorder}`, zIndex: 2 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.bubbleMe}, ${theme.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: theme.bubbleMeText }}>Д</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Друг</div>
            <div style={{ fontSize: 11, color: theme.mint, display: "flex", alignItems: "center", gap: 4 }}><Wifi size={11} /> в сети</div>
          </div>
          <button onClick={() => setSettingsOpen(true)} className="tap-shrink" style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Settings size={17} />
          </button>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px 14px 4px", zIndex: 1 }}>
          <EncryptionBadge theme={theme} />
          {messages.map((m) => <Bubble key={m.id} msg={m} theme={theme} />)}
          {typing && <TypingIndicator theme={theme} />}
        </div>

        <div style={{ background: theme.panel, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: `1px solid ${theme.panelBorder}`, zIndex: 2 }}>
          {pending.length > 0 && (
            <div style={{ display: "flex", gap: 8, padding: "12px 14px 4px", overflowX: "auto" }}>
              {pending.map((att) => <AttachmentChip key={att.id} att={att} onRemove={removeAttachment} theme={theme} />)}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, padding: 12, alignItems: "center" }}>
            <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }} />
            <button onClick={() => fileInputRef.current?.click()} className="tap-shrink" style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Paperclip size={17} />
            </button>
            <input
              ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Написать сообщение..."
              style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: `1px solid ${theme.panelBorder}`, borderRadius: 22, padding: "11px 16px", color: theme.text, fontSize: 15, outline: "none", opacity: genie ? 0 : 1, transition: "opacity 0.15s ease" }}
            />
            <button ref={sendBtnRef} onClick={sendMessage} disabled={!allUploaded} className="tap-shrink" style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: theme.bubbleMe, color: theme.bubbleMeText, display: "flex", alignItems: "center", justifyContent: "center", cursor: allUploaded ? "pointer" : "not-allowed", opacity: allUploaded ? 1 : 0.5, flexShrink: 0 }}>
              <Send size={17} />
            </button>
          </div>
        </div>

        <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} themeKey={themeKey} setThemeKey={setThemeKey} theme={theme} />
        {genie && <GenieOverlay key={genie.text + genie.fromRect.x} text={genie.text} fromRect={genie.fromRect} toRect={genie.toRect} theme={theme} onDone={() => setGenie(null)} />}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
