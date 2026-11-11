import React from "react";

const gold = "#D4AF37";

function Step({ idx, title, value, status, isActive, isCompleted }) {
  return (
    <div className="flex-1 min-w-[120px] px-3">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300"`}
          style={{
            background: isCompleted ? gold : isActive ? "transparent" : "transparent",
            border: `2px solid ${isCompleted || isActive ? gold : "rgba(255,255,255,0.18)"}`,
            color: isCompleted || isActive ? "#111" : "#fff",
            boxShadow: isCompleted ? "0 6px 18px rgba(0,0,0,0.45)" : "none",
          }}
        >
          <span className="font-semibold" style={{ color: isCompleted ? "#111" : isActive ? gold : "#fff" }}>
            {isCompleted ? "✓" : idx}
          </span>
        </div>

        <div className="text-sm font-medium" style={{ color: "#f3f3f3" }}>{title}</div>
        <div className="text-xs mt-1 truncate" style={{ color: "#cfcfcf", maxWidth: 160 }}>{value || "—"}</div>
      </div>
    </div>
  );
}

export default function PaymentStepper({ steps = [], active = 1 }) {
  return (
    <div className="p-4 rounded-lg shadow-md bg-gradient-to-b from-[#121212] to-[#0f0f10] border border-gray-800 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <div className="flex items-center relative" style={{ gap: 8 }}>
          {/* connector lines behind steps */}
          <div className="absolute left-0 right-0 top-5 pointer-events-none">
            <div className="w-full h-0 flex items-center">
              <div className="w-full h-0 relative">
                {/* center a thin line and break where circles are — we'll use a background gradient trick */}
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="h-0.5 w-full bg-[rgba(255,255,255,0.06)] mx-12 rounded" />
                </div>
              </div>
            </div>
          </div>

          {steps.map((s, i) => {
            const idx = i + 1;
            const isActive = idx === active;
            const isCompleted = idx < active;
            return (
              <div key={s.title} className="flex items-start relative">
                <div style={{ width: 200 }}>
                  <Step
                    idx={idx}
                    title={s.title}
                    value={s.value}
                    isActive={isActive}
                    isCompleted={isCompleted}
                  />
                </div>
                {/* connector spacer for small screens */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block" style={{ width: 12 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
