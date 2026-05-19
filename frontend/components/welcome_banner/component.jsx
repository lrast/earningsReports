import { createRoot } from "react-dom/client";
import { MyApp } from "experiments/app.tsx";

const props = window.__STREAMLIT_PROPS__ || {};

function WelcomeBanner() {
  const { title, subtitle, features = [] } = props;

  return (
    <>
    <div
      style={{
        padding: "1.25rem 1.5rem",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.35rem", fontWeight: 600 }}>
        {title}
      </h2>
      <p
        style={{
          margin: "0 0 1rem",
          opacity: 0.85,
          lineHeight: 1.5,
          fontSize: "0.95rem",
        }}
      >
        {subtitle}
      </p>
      {features.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.25rem",
            opacity: 0.9,
            fontSize: "0.9rem",
            lineHeight: 1.6,
          }}
        >
          {features.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
    <MyApp />
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<WelcomeBanner />);
