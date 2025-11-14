// src/components/Toast.jsx
import React from "react";

export default function Toast({ items, onRemove }) {
  return (
    <div className="toast-wrap" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.type || "success"}`}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
            <div style={{ flex: 1 }}>{t.message}</div>
            <button style={{ marginLeft: 8 }} onClick={() => onRemove(t.id)} className="btn">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
