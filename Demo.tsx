"use client";

import { useState } from "react";
import { GlassButton } from "./GlassButton";

// Import glass-button.css once from app/layout.tsx (Next.js),
// pages/_app.tsx (Pages Router), or your React entry file.
export default function Demo() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("버튼을 눌러보세요.");
  return (
    <div style={{ background: "#171d1c", color: "white", padding: 40, borderRadius: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <GlassButton animate onClick={() => setMessage("생각하기를 선택했습니다.")}>Thinking…</GlassButton>
        <GlassButton variant="chrome" onClick={() => setMessage("검색을 선택했습니다.")}>Searching…</GlassButton>
        <GlassButton variant="prism" onClick={() => setMessage("계획하기를 선택했습니다.")}>Planning…</GlassButton>
        <GlassButton variant="smoke" aria-pressed={listening} onClick={() => {
          setListening(!listening);
          setMessage(listening ? "듣기를 껐습니다." : "듣기를 켰습니다.");
        }}>Listening…</GlassButton>
      </div>
      <p role="status" style={{ marginTop: 32 }}>{message}</p>
    </div>
  );
}
