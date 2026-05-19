// app.tsx
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import type { ActionImpl } from "kbar";

import React from 'react';

const actions = [
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "writing words",
    perform: () => (window.location.pathname = "blog"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email",
    perform: () => (window.location.pathname = "contact"),
  },
]

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={{ padding: "8px 16px", fontSize: 10, opacity: 0.5 }}>
            {item}
          </div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
}

function ResultItem({
  action,
  active,
}: {
  action: ActionImpl;
  active: boolean;
}) {
  return (
    <div
      style={{
        padding: "12px 16px",
        background: active ? "rgba(0, 0, 0, 0.08)" : "transparent",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{action.name}</span>
      {action.shortcut?.length ? (
        <span style={{ opacity: 0.5, fontSize: 12 }}>
          {action.shortcut.join(" ")}
        </span>
      ) : null}
    </div>
  );
}

function MyApp() {
  return (
    <>
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator>
            <KBarSearch />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <div />
    </KBarProvider>
    <App/>
    </>
  );
}

// This is your main component. React "calls" this function to see what to draw.
function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Hello, TypeScript!</h1>
      <p>The server is running and the App component successfully mounted.</p>
    </div>
  );
}

export { MyApp };