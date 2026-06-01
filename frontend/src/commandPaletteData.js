import commandPaletteCommands from "./command_palette_commands.json";

/** Higher values sort above lower values in kbar (see useMatches `order`). */
export const SECTION_PRIORITY = {
  Tickers: 10,
  Companies: 0,
};

export function buildBaseCommands(data = commandPaletteCommands) {
  return Object.entries(data.commands).map(([id, meta]) => ({
    id,
    name: meta.name,
    icon: meta.icon,
    section: meta.section ?? "Commands",
    priority: meta.priority,
    lazy: true,
  }));
}

export function buildSubcommandId(commandId, subcommandSlug) {
  return `${commandId}/${subcommandSlug}`;
}

export function buildSubsubcommandId(subcommandId, subsubcommandSlug) {
  return `${subcommandId}/${subsubcommandSlug}`;
}

export function getSubcommands(commandId, data = commandPaletteCommands) {
  return (data.subcommands ?? []).map((sub) => ({
    id: buildSubcommandId(commandId, sub.slug),
    name: sub.name,
    section: sub.section ?? "Statement",
    lazy: true,
  }));
}

export function getSubsubcommands(subcommandId, data = commandPaletteCommands) {
  return (data.subsubcommands ?? []).map((sub) => ({
    id: buildSubsubcommandId(subcommandId, sub.slug),
    name: sub.name,
    section: sub.section ?? "Year",
  }));
}

export function getChildren(nodeId, data = commandPaletteCommands) {
  const depth = nodeId.split("/").length - 1;
  if (depth === 0) {
    return getSubcommands(nodeId, data);
  }
  if (depth === 1) {
    return getSubsubcommands(nodeId, data);
  }
  return [];
}

export { commandPaletteCommands };
