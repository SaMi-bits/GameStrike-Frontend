import React, { useEffect } from "react";

export default function Toast({ items, onRemove }) {
  // 🔥 FIX: Limpiar timeouts al desmontar
  useEffect(() => {
    const timeouts = [];
    
    items.forEach(item => {
      if (item.autoRemove !== false) {
        const timeout = setTimeout(() => {
          onRemove(item.id);
        }, item.ttl || 3800);
        
        timeouts.push(timeout);
      }
    });

    // Cleanup: limpiar todos los timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [items, onRemove]);

  return (
    <div className="toast-wrap" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.type || "success"}`}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
            <div style={{ flex: 1 }}>{t.message}</div>
            <button 
              style={{ marginLeft: 8 }} 
              onClick={() => onRemove(t.id)} 
              className="btn"
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}