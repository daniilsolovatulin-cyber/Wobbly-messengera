(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  const { useState, useRef, useEffect, useCallback } = React;
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
      glow: "rgba(232,131,107,0.25)"
    },
    midnight: {
      name: "\u041F\u043E\u043B\u043D\u043E\u0447\u044C",
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
      glow: "rgba(91,140,255,0.25)"
    },
    sakura: {
      name: "\u0421\u0430\u043A\u0443\u0440\u0430",
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
      glow: "rgba(245,135,179,0.25)"
    },
    azure: {
      name: "\u041B\u0430\u0437\u0443\u0440\u044C",
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
      glow: "rgba(63,193,224,0.25)"
    }
  };
  function fmtSize(bytes) {
    if (bytes < 1024) return `${bytes} \u0411`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} \u041A\u0411`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} \u041C\u0411`;
  }
  function fileKind(file) {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "file";
  }
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
        style: __spreadValues({ display: "block", flexShrink: 0 }, style)
      },
      children
    );
  }
  const Lock = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("rect", { x: "4", y: "11", width: "16", height: "10", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" }));
  const Send = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M22 2 11 13" }), /* @__PURE__ */ React.createElement("path", { d: "M22 2 15 22l-4-9-9-4 20-7Z" }));
  const Paperclip = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95L9.41 17.41a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48" }));
  const FileText = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6" }));
  const Film = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "20", height: "20", rx: "2.18" }), /* @__PURE__ */ React.createElement("line", { x1: "7", y1: "2", x2: "7", y2: "22" }), /* @__PURE__ */ React.createElement("line", { x1: "17", y1: "2", x2: "17", y2: "22" }), /* @__PURE__ */ React.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }));
  const X = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18" }), /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12" }));
  const Settings = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" }));
  const Check = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }));
  const CheckCheck = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M18 6 7 17l-5-5" }), /* @__PURE__ */ React.createElement("path", { d: "m22 10-7.5 7.5L13 16" }));
  const Wifi = (p) => /* @__PURE__ */ React.createElement(Icon, __spreadValues({}, p), /* @__PURE__ */ React.createElement("path", { d: "M5 12.55a11 11 0 0 1 14.08 0" }), /* @__PURE__ */ React.createElement("path", { d: "M1.42 9a16 16 0 0 1 21.16 0" }), /* @__PURE__ */ React.createElement("path", { d: "M8.53 16.11a6 6 0 0 1 6.95 0" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "20", x2: "12.01", y2: "20" }));
  function AttachmentChip({ att, onRemove, theme }) {
    const progress = att.progress;
    return /* @__PURE__ */ React.createElement("div", { className: "pop-in", style: {
      position: "relative",
      width: 74,
      height: 74,
      borderRadius: 14,
      overflow: "hidden",
      flexShrink: 0,
      border: `1px solid ${theme.panelBorder}`,
      background: "rgba(0,0,0,0.3)"
    } }, att.kind === "image" && /* @__PURE__ */ React.createElement("img", { src: att.url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }), att.kind === "video" && /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } }, /* @__PURE__ */ React.createElement("video", { src: att.url, style: { width: "100%", height: "100%", objectFit: "cover" } }), /* @__PURE__ */ React.createElement(Film, { size: 18, style: { position: "absolute", top: 6, left: 6, color: "#fff" } })), att.kind === "file" && /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: theme.textDim, padding: 4 } }, /* @__PURE__ */ React.createElement(FileText, { size: 22 }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8.5, textAlign: "center", lineHeight: 1.1, color: theme.text } }, att.name.length > 12 ? att.name.slice(0, 10) + "\u2026" : att.name)), progress < 100 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "28", height: "28", viewBox: "0 0 28 28" }, /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "14", r: "11", fill: "none", stroke: "rgba(255,255,255,0.2)", strokeWidth: "3" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: "14",
        cy: "14",
        r: "11",
        fill: "none",
        stroke: theme.accent,
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeDasharray: 2 * Math.PI * 11,
        strokeDashoffset: 2 * Math.PI * 11 * (1 - progress / 100),
        transform: "rotate(-90 14 14)",
        style: { transition: "stroke-dashoffset 0.2s linear" }
      }
    ))), /* @__PURE__ */ React.createElement("button", { onClick: () => onRemove(att.id), className: "tap-shrink", style: {
      position: "absolute",
      top: 3,
      right: 3,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "rgba(0,0,0,0.6)",
      border: "none",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: 0
    } }, /* @__PURE__ */ React.createElement(X, { size: 11 })));
  }
  function AttachmentBlock({ att, theme }) {
    if (att.kind === "image") {
      return /* @__PURE__ */ React.createElement("img", { src: att.url, alt: att.name, style: { width: "100%", maxWidth: 260, borderRadius: 12, display: "block", marginBottom: 6 } });
    }
    if (att.kind === "video") {
      return /* @__PURE__ */ React.createElement("video", { src: att.url, controls: true, style: { width: "100%", maxWidth: 260, borderRadius: 12, display: "block", marginBottom: 6 } });
    }
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12, background: "rgba(0,0,0,0.18)", marginBottom: 6, minWidth: 200 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(FileText, { size: 16, color: theme.bubbleMeText })), /* @__PURE__ */ React.createElement("div", { style: { overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, att.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, opacity: 0.65 } }, fmtSize(att.size))));
  }
  function Bubble({ msg, theme }) {
    var _a, _b, _c, _d;
    const isMe = msg.from === "me";
    return /* @__PURE__ */ React.createElement("div", { className: "bubble-row", style: { display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { className: "bubble-spring", style: {
      transformOrigin: isMe ? "bottom right" : "bottom left",
      maxWidth: "74%",
      padding: ((_a = msg.attachments) == null ? void 0 : _a.length) ? "8px" : "9px 14px",
      borderRadius: isMe ? "18px 18px 5px 18px" : "18px 18px 18px 5px",
      background: isMe ? theme.bubbleMe : theme.bubbleThem,
      backdropFilter: isMe ? "none" : "blur(14px)",
      WebkitBackdropFilter: isMe ? "none" : "blur(14px)",
      color: isMe ? theme.bubbleMeText : theme.text,
      fontSize: 15,
      lineHeight: 1.4,
      boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
      wordBreak: "break-word"
    } }, (_b = msg.attachments) == null ? void 0 : _b.map((att) => /* @__PURE__ */ React.createElement(AttachmentBlock, { key: att.id, att, theme })), msg.text && /* @__PURE__ */ React.createElement("div", { style: { padding: ((_c = msg.attachments) == null ? void 0 : _c.length) ? "0 6px" : 0 } }, msg.text), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 10.5,
      opacity: 0.6,
      marginTop: 3,
      padding: ((_d = msg.attachments) == null ? void 0 : _d.length) ? "0 6px" : 0,
      textAlign: "right",
      display: "flex",
      gap: 4,
      justifyContent: "flex-end",
      alignItems: "center"
    } }, msg.time, isMe && (msg.status === "sent" ? /* @__PURE__ */ React.createElement(Check, { size: 11 }) : /* @__PURE__ */ React.createElement(CheckCheck, { size: 11 })))));
  }
  function TypingIndicator({ theme }) {
    return /* @__PURE__ */ React.createElement("div", { className: "bubble-row", style: { display: "flex", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { background: theme.bubbleThem, backdropFilter: "blur(14px)", borderRadius: "18px 18px 18px 5px", padding: "12px 16px", display: "flex", gap: 5 } }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "typing-dot", style: { width: 6, height: 6, borderRadius: "50%", background: theme.textDim, display: "inline-block", animationDelay: `${i * 0.15}s` } }))));
  }
  function EncryptionBadge({ theme }) {
    return /* @__PURE__ */ React.createElement("div", { className: "pop-in", style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11.5,
      color: theme.mint,
      padding: "6px 12px",
      background: "rgba(127, 212, 181, 0.1)",
      borderRadius: 20,
      margin: "4px auto 14px",
      width: "fit-content",
      border: "1px solid rgba(127, 212, 181, 0.25)"
    } }, /* @__PURE__ */ React.createElement("span", { className: "breathe", style: { display: "flex" } }, /* @__PURE__ */ React.createElement(Lock, { size: 12, strokeWidth: 2.5 })), "\u0421\u043A\u0432\u043E\u0437\u043D\u043E\u0435 \u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E");
  }
  function SettingsPanel({ open, onClose, themeKey, setThemeKey, theme }) {
    if (!open) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "fade-in", onClick: onClose, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 10 } }), /* @__PURE__ */ React.createElement("div", { className: "sheet-in", style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 11,
      background: theme.panel,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderTop: `1px solid ${theme.panelBorder}`,
      borderRadius: "22px 22px 0 0",
      padding: 20,
      color: theme.text,
      maxWidth: 460,
      margin: "0 auto"
    } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 4, borderRadius: 4, background: theme.textDim, opacity: 0.4, margin: "0 auto 16px" } }), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 16, marginBottom: 14 } }, "\u0422\u0435\u043C\u0430 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } }, Object.entries(THEMES).map(([key, t]) => /* @__PURE__ */ React.createElement("button", { key, onClick: () => setThemeKey(key), className: "tap-shrink", style: {
      flex: "1 1 40%",
      border: key === themeKey ? `2px solid ${t.accent}` : `1px solid ${theme.panelBorder}`,
      borderRadius: 16,
      padding: 12,
      background: t.bg,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", background: t.bubbleMe } }), /* @__PURE__ */ React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", background: t.bubbleThem } }), /* @__PURE__ */ React.createElement("div", { style: { width: 16, height: 16, borderRadius: "50%", background: t.mint } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: t.text, fontWeight: 600 } }, t.name), key === themeKey && /* @__PURE__ */ React.createElement(Check, { size: 13, color: t.accent }))))));
  }
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
          { left: `${fromRect.x + dx}px`, top: `${fromRect.y + dy}px`, width: "4px", height: "4px", opacity: 0, borderRadius: "50px", transform: "scaleY(0.2)" }
        ],
        { duration: 480, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" }
      );
      anim.onfinish = onDone;
      return () => anim.cancel();
    }, []);
    return /* @__PURE__ */ React.createElement("div", { ref: elRef, style: {
      position: "fixed",
      zIndex: 50,
      pointerEvents: "none",
      background: theme.bubbleMe,
      color: theme.bubbleMeText,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      fontSize: 15,
      whiteSpace: "nowrap",
      overflow: "hidden",
      filter: `url(#${filterId})`,
      boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
    } }, /* @__PURE__ */ React.createElement("svg", { width: "0", height: "0", style: { position: "absolute" } }, /* @__PURE__ */ React.createElement("filter", { id: filterId }, /* @__PURE__ */ React.createElement("feTurbulence", { type: "fractalNoise", baseFrequency: "0.02 0.06", numOctaves: "2", seed: "7", result: "noise" }, /* @__PURE__ */ React.createElement("animate", { attributeName: "baseFrequency", values: "0.02 0.06;0.04 0.1;0.02 0.06", dur: "0.48s" })), /* @__PURE__ */ React.createElement("feDisplacementMap", { in: "SourceGraphic", in2: "noise", scale: "16" }, /* @__PURE__ */ React.createElement("animate", { attributeName: "scale", values: "2;24;4", dur: "0.48s" })))), /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, text));
  }
  const SEED_MESSAGES = [
    { id: 1, from: "them", text: "\u041F\u0440\u0438\u0432\u0435\u0442! \u0421\u043C\u043E\u0442\u0440\u0438 \u0447\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u{1F440}", time: "12:01", status: "read" },
    { id: 2, from: "me", text: "\u041F\u0440\u0443\u0436\u0438\u043D\u044B \u0442\u0435\u043F\u0435\u0440\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u0443\u0436\u0438\u043D\u044F\u0442, \u043A\u0440\u0430\u0441\u043E\u0442\u0430", time: "12:02", status: "read" },
    { id: 3, from: "them", text: "\u041C\u043E\u0436\u043D\u043E \u0435\u0449\u0451 \u0444\u043E\u0442\u043A\u0438 \u0438 \u0444\u0430\u0439\u043B\u044B \u043A\u0438\u0434\u0430\u0442\u044C, \u0433\u043B\u044F\u0434\u0438", time: "12:02", status: "read" }
  ];
  const REPLIES = [
    "\u0412\u0430\u0443, \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043A\u0430\u043A \u0432 \u0442\u0435\u043B\u0435\u0433\u0435 \u043F\u0440\u0443\u0436\u0438\u043D\u0438\u0442!",
    "\u0422\u0435\u043C\u0430 \u043E\u0433\u043E\u043D\u044C, \u043E\u0431\u043E\u0436\u0430\u044E \u0431\u043B\u044E\u0440 \u{1F60D}",
    "\u0410 \u0444\u0430\u0439\u043B \u043A\u0440\u0430\u0441\u0438\u0432\u043E \u0442\u0430\u043A \u0441 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u043E\u043C \u0433\u0440\u0443\u0437\u0438\u0442\u0441\u044F",
    "\u0413\u043E \u0442\u0435\u043F\u0435\u0440\u044C \u0432\u0438\u0434\u0435\u043E \u0437\u0430\u043A\u0438\u043D\u044C"
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
      var _a;
      (_a = scrollRef.current) == null ? void 0 : _a.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
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
          if (prog >= 100) {
            prog = 100;
            clearInterval(interval);
          }
          setPending((p) => p.map((a) => a.id === id ? __spreadProps(__spreadValues({}, a), { progress: prog }) : a));
        }, 160);
      });
    }, []);
    const removeAttachment = useCallback((id) => setPending((p) => p.filter((a) => a.id !== id)), []);
    const commitMessage = useCallback((text, attachments) => {
      const time = (/* @__PURE__ */ new Date()).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
      setMessages((m) => [...m, { id: idRef.current++, from: "me", text, time, status: "sent", attachments }]);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, {
          id: idRef.current++,
          from: "them",
          text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
          time: (/* @__PURE__ */ new Date()).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
          status: "read"
        }]);
      }, 1300 + Math.random() * 900);
    }, []);
    const sendMessage = useCallback(() => {
      const text = input.trim();
      if (!text && pending.length === 0) return;
      const attachments = pending.map((a) => __spreadValues({}, a));
      if (!text || !inputRef.current || !sendBtnRef.current) {
        commitMessage(text, attachments);
        setInput("");
        setPending([]);
        return;
      }
      const fromEl = inputRef.current.getBoundingClientRect();
      const toEl = sendBtnRef.current.getBoundingClientRect();
      setGenie({
        text,
        fromRect: { x: fromEl.left, y: fromEl.top, width: fromEl.width, height: fromEl.height },
        toRect: { x: toEl.left + toEl.width / 2 - 20, y: toEl.top + toEl.height / 2 - 20, width: 40, height: 40 }
      });
      setInput("");
      setPending([]);
      setTimeout(() => commitMessage(text, attachments), 480);
    }, [input, pending, commitMessage]);
    const allUploaded = pending.every((a) => a.progress >= 100);
    return /* @__PURE__ */ React.createElement("div", { style: { height: "100vh", width: "100%", background: theme.bg, fontFamily: "'Nunito','Segoe UI',sans-serif", display: "flex", justifyContent: "center", color: theme.text } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", height: "100%", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 320, height: 200, background: theme.glow, filter: "blur(70px)", pointerEvents: "none", transition: "background 0.4s ease" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 18px", background: theme.panel, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${theme.panelBorder}`, zIndex: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.bubbleMe}, ${theme.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: theme.bubbleMeText } }, "\u0414"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 15 } }, "\u0414\u0440\u0443\u0433"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: theme.mint, display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement(Wifi, { size: 11 }), " \u0432 \u0441\u0435\u0442\u0438")), /* @__PURE__ */ React.createElement("button", { onClick: () => setSettingsOpen(true), className: "tap-shrink", style: { width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement(Settings, { size: 17 }))), /* @__PURE__ */ React.createElement("div", { ref: scrollRef, style: { flex: 1, overflowY: "auto", padding: "14px 14px 4px", zIndex: 1 } }, /* @__PURE__ */ React.createElement(EncryptionBadge, { theme }), messages.map((m) => /* @__PURE__ */ React.createElement(Bubble, { key: m.id, msg: m, theme })), typing && /* @__PURE__ */ React.createElement(TypingIndicator, { theme })), /* @__PURE__ */ React.createElement("div", { style: { background: theme.panel, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: `1px solid ${theme.panelBorder}`, zIndex: 2 } }, pending.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "12px 14px 4px", overflowX: "auto" } }, pending.map((att) => /* @__PURE__ */ React.createElement(AttachmentChip, { key: att.id, att, onRemove: removeAttachment, theme }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { ref: fileInputRef, type: "file", multiple: true, style: { display: "none" }, onChange: (e) => {
      var _a;
      if ((_a = e.target.files) == null ? void 0 : _a.length) handleFiles(e.target.files);
      e.target.value = "";
    } }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      var _a;
      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
    }, className: "tap-shrink", style: { width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.06)", color: theme.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(Paperclip, { size: 17 })), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: inputRef,
        value: input,
        onChange: (e) => setInput(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && sendMessage(),
        placeholder: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435...",
        style: { flex: 1, background: "rgba(0,0,0,0.2)", border: `1px solid ${theme.panelBorder}`, borderRadius: 22, padding: "11px 16px", color: theme.text, fontSize: 15, outline: "none", opacity: genie ? 0 : 1, transition: "opacity 0.15s ease" }
      }
    ), /* @__PURE__ */ React.createElement("button", { ref: sendBtnRef, onClick: sendMessage, disabled: !allUploaded, className: "tap-shrink", style: { width: 42, height: 42, borderRadius: "50%", border: "none", background: theme.bubbleMe, color: theme.bubbleMeText, display: "flex", alignItems: "center", justifyContent: "center", cursor: allUploaded ? "pointer" : "not-allowed", opacity: allUploaded ? 1 : 0.5, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(Send, { size: 17 })))), /* @__PURE__ */ React.createElement(SettingsPanel, { open: settingsOpen, onClose: () => setSettingsOpen(false), themeKey, setThemeKey, theme }), genie && /* @__PURE__ */ React.createElement(GenieOverlay, { key: genie.text + genie.fromRect.x, text: genie.text, fromRect: genie.fromRect, toRect: genie.toRect, theme, onDone: () => setGenie(null) })));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
