import { useMemo } from "react";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
  useRegisterActions,
} from "kbar";
import "./command-palette.css";

function toggleStreamlitSidebar() {
  const button =
    document.querySelector('[data-testid="stSidebarCollapseButton"]') ??
    document.querySelector('[data-testid="collapsedControl"]');
  button?.click();
}

function buildActions(getComponent) {
  const navItems = getComponent()?.data?.navItems ?? [];
  const navigate = (file) => {
    getComponent()?.setStateValue?.("value", file);
  };

  const navActions = navItems.map((item) => ({
    id: `nav-${item.file}`,
    name: item.title,
    section: "Navigation",
    keywords: `${item.title} ${item.file} page`,
    icon: <span className="kbar-result-icon">{item.icon}</span>,
    perform: () => navigate(item.file),
  }));

  return [
    ...navActions,
    {
      id: "toggle-sidebar",
      name: "Toggle sidebar",
      section: "App",
      keywords: "sidebar collapse expand panel",
      perform: toggleStreamlitSidebar,
    },
    {
      id: "keyboard-shortcuts",
      name: "Keyboard shortcuts",
      section: "Help",
      keywords: "help hotkeys keys",
      children: [
        {
          id: "ks-open",
          name: "Open command palette — ⌘K / Ctrl+K",
          perform: () => {},
        },
        {
          id: "ks-nav",
          name: "Move selection — ↑ / ↓",
          perform: () => {},
        },
        {
          id: "ks-select",
          name: "Run action — Enter",
          perform: () => {},
        },
        {
          id: "ks-back",
          name: "Go back — Backspace",
          perform: () => {},
        },
        {
          id: "ks-close",
          name: "Close palette — Esc",
          perform: () => {},
        },
      ],
    },
  ];
}

function RegisterActions({ getComponent }) {
  const actions = useMemo(() => buildActions(getComponent), [getComponent]);
  useRegisterActions(actions, [actions]);
  return null;
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return <div className="kbar-group-label">{item}</div>;
        }

        const isInfo = item.id?.startsWith("ks-");

        return (
          <div
            className={`kbar-result${isInfo ? " kbar-result--info" : ""}`}
            data-active={active}
          >
            {item.icon}
            <span className="kbar-result-name">{item.name}</span>
            {item.shortcut?.length ? (
              <span className="kbar-result-shortcut">
                {item.shortcut.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </span>
            ) : null}
          </div>
        );
      }}
    />
  );
}

function CommandBar() {
  return (
    <KBarPortal>
      <div className="kbar-overlay" />
      <KBarPositioner className="kbar-positioner">
        <KBarAnimator className="kbar-animator">
          <KBarSearch className="kbar-search" placeholder="Search commands…" />
          <div className="kbar-results">
            <RenderResults />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

export default function CommandPalette({ getComponent }) {
  return (
    <KBarProvider options={{ animations: { enterMs: 0, exitMs: 0 } }}>
      <RegisterActions getComponent={getComponent} />
      <CommandBar />
    </KBarProvider>
  );
}
