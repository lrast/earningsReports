import { useMemo } from "react";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useKBar,
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
  const commands = getComponent()?.data?.commands ?? [];
  const runCommand = (id) => {
    getComponent()?.setStateValue?.("value", id);
  };

  const commandActions = commands.flatMap((cmd) => {
    const parent = {
      id: cmd.id,
      name: cmd.name,
      section: cmd.section ?? "Commands",
      keywords: `${cmd.name} ${cmd.id}`,
      icon: <span className="kbar-result-icon">{cmd.icon}</span>,
    };

    const children = (cmd.options ?? []).map((opt) => ({
      id: opt.id,
      name: opt.name,
      parent: cmd.id,
      keywords: `${cmd.name} ${opt.name} ${opt.id}`,
      perform: () => runCommand(opt.id),
    }));

    return [parent, ...children];
  });

  return [
    ...commandActions,
    {
      id: "toggle-sidebar",
      name: "Toggle sidebar",
      section: "App",
      keywords: "sidebar collapse expand panel",
      perform: toggleStreamlitSidebar,
    },
    {
      id: "ks-open",
      name: "Open command palette — ⌘K / Ctrl+K",
      section: "Help",
      keywords: "help hotkeys keys open palette",
      perform: () => {},
    },
    {
      id: "ks-nav",
      name: "Move selection — ↑ / ↓",
      section: "Help",
      keywords: "help hotkeys keys navigate arrows",
      perform: () => {},
    },
    {
      id: "ks-select",
      name: "Run action — Enter",
      section: "Help",
      keywords: "help hotkeys keys enter select",
      perform: () => {},
    },
    {
      id: "ks-back",
      name: "Go back — Backspace",
      section: "Help",
      keywords: "help hotkeys keys back backspace",
      perform: () => {},
    },
    {
      id: "ks-close",
      name: "Close palette — Esc",
      section: "Help",
      keywords: "help hotkeys keys escape close",
      perform: () => {},
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
  // useKBar merges collector output with { query, options }; collect an object so
  // currentRootActionId is a real string for the key below (not "[object Object]").
  const { currentRootActionId } = useKBar((state) => ({
    currentRootActionId: state.currentRootActionId,
  }));

  return (
    <KBarPortal>
      <div className="kbar-overlay" />
      <KBarPositioner className="kbar-positioner">
        <KBarAnimator className="kbar-animator">
          <KBarSearch
            key={currentRootActionId ?? "root"}
            className="kbar-search"
            placeholder="Search commands…"
          />
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
