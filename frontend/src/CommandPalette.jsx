import { useMemo, useState } from "react";
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
import {
  buildBaseCommands,
  commandPaletteCommands,
  getChildren,
  SECTION_PRIORITY,
} from "./commandPaletteData.js";
import "./command-palette.css";
import OpenAtHandler from "./OpenAtHandler.jsx";

function toKbarSection(section = "Commands") {
  const priority = SECTION_PRIORITY[section];
  if (priority !== undefined) {
    return { name: section, priority };
  }
  return section;
}

function toggleStreamlitSidebar() {
  const button =
    document.querySelector('[data-testid="stSidebarCollapseButton"]') ??
    document.querySelector('[data-testid="collapsedControl"]');
  button?.click();
}

function commandToActions(cmd, getComponent, subcommandCache, onLazyNavigate, parentId = null) {
  const runCommand = (id) => {
    getComponent()?.setStateValue?.("value", id);
  };

  const options = subcommandCache[cmd.id] ?? [];
  const isLazy = cmd.lazy && options.length === 0;
  const isLeaf = !cmd.lazy && options.length === 0;

  const section = cmd.section ?? "Commands";
  const action = {
    id: cmd.id,
    name: cmd.name,
    section: toKbarSection(section),
    keywords: `${cmd.name} ${cmd.id}`,
  };

  if (cmd.priority != null) {
    action.priority = cmd.priority;
  }

  if (parentId) {
    action.parent = parentId;
  }

  if (cmd.icon) {
    action.icon = <span className="kbar-result-icon">{cmd.icon}</span>;
  }

  if (isLeaf) {
    action.perform = () => runCommand(cmd.id);
  } else if (isLazy) {
    action.perform = () => onLazyNavigate(cmd.id);
  }

  const actions = [action];

  for (const opt of options) {
    actions.push(
      ...commandToActions(
        opt,
        getComponent,
        subcommandCache,
        onLazyNavigate,
        cmd.id
      )
    );
  }

  return actions;
}

function buildActions(commands, subcommandCache, getComponent, onLazyNavigate) {
  const commandActions = commands.flatMap((cmd) =>
    commandToActions(cmd, getComponent, subcommandCache, onLazyNavigate)
  );

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

function RegisterActions({
  commands,
  subcommandCache,
  getComponent,
  onLazyNavigate,
}) {
  const actions = useMemo(
    () => buildActions(commands, subcommandCache, getComponent, onLazyNavigate),
    [commands, subcommandCache, getComponent, onLazyNavigate]
  );
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
  const commands = useMemo(() => buildBaseCommands(commandPaletteCommands), []);
  const [subcommandCache, setSubcommandCache] = useState({});
  const [openAt, setOpenAt] = useState(null);

  const onLazyNavigate = (commandId) => {
    const children = getChildren(commandId);
    if (!children.length) {
      return;
    }
    setSubcommandCache((prev) => ({ ...prev, [commandId]: children }));
    setOpenAt(commandId);
  };

  return (
    <KBarProvider options={{ animations: { enterMs: 0, exitMs: 0 } }}>
      <RegisterActions
        commands={commands}
        subcommandCache={subcommandCache}
        getComponent={getComponent}
        onLazyNavigate={onLazyNavigate}
      />
      <OpenAtHandler openAt={openAt} onOpened={() => setOpenAt(null)} />
      <CommandBar />
    </KBarProvider>
  );
}
