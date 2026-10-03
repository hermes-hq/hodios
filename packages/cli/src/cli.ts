import { VERSION } from './version.js';

export interface Io {
  out: (line: string) => void;
  err: (line: string) => void;
  cwd: string;
  /** Home directory for `--scope user` and caches; tests point it at a temp dir. */
  home?: string;
  env?: Record<string, string | undefined>;
  /** Reads all of stdin (for `--arg name=@-`). */
  readStdin?: () => Promise<string>;
}

const NAME = 'hodios';

export const USAGE = `Hodios — prompts by Hermes IDE

Usage: ${NAME} <command> [options]

Find and use:
  search [query] [--here] [--all] [--kind k] [--cat c] [--stack s] [--works t] [--limit n] [--page n] [--json]
      Search the catalog. Query keys: kind: cat: domain: stage: role: stack: subject: works: tag: risk: …
      With no query inside a project, shows the entries for this project first (stack and agents found here).
  show <id> [--target t] [--format f] [--scope project|user] [--json]
      Print an entry, or its compiled file(s) for a target.
  use <id> [--arg name=value]... [--copy]
      Print the paste-ready text with arguments filled (value @file reads a file, @- reads stdin).

Install into your tools:
  install <id|pack:name>... --target <t> [--scope project|user] [--format f] [--force] [--dry-run]
  list [--scope project|user] [--json]
  remove <id>... [--target t] [--scope project|user] [--force]
  targets
      List targets and the formats each one accepts.

Build and check (inside a Hodios checkout):
  validate [--root <dir>] [--json] [--verbose]
  build [--out dist] [--target t]... [--catalog YYYY.MDD.N] [--seq n]
  rules
      List lint rule ids.

Targets: claude-code, codex, cursor, copilot, gemini-cli, opencode, agents-md, paste (chatgpt, claude-ai), hermes.
Catalog: --catalog <dir|url> or HODIOS_CATALOG; default is this checkout's dist/catalog/v1, else the public catalog in hermes-hq/hodios-dist (jsDelivr, then raw GitHub).

Options:
  -h, --help       Show this help
  -v, --version    Show the CLI version`;

type Command = (args: string[], io: Io) => Promise<number> | number;

/** Commands load lazily so `search` never pays for the schema validator that `validate` and `build` need. */
const COMMANDS: Record<string, () => Promise<Command>> = {
  validate: async () => (await import('./commands/validate.js')).runValidate,
  rules: async () => (await import('./commands/validate.js')).runRules,
  build: async () => (await import('./commands/build.js')).runBuild,
  search: async () => (await import('./commands/search.js')).runSearch,
  show: async () => (await import('./commands/show.js')).runShow,
  use: async () => (await import('./commands/show.js')).runUse,
  install: async () => (await import('./commands/install.js')).runInstall,
  list: async () => (await import('./commands/install.js')).runList,
  remove: async () => (await import('./commands/install.js')).runRemove,
  targets: async () => (await import('./commands/show.js')).runTargets,
};

export async function run(argv: string[], io: Io): Promise<number> {
  const [command, ...rest] = argv;
  try {
    switch (command) {
      case undefined:
      case '-h':
      case '--help':
      case 'help':
        io.out(USAGE);
        return command === undefined ? 2 : 0;
      case '-v':
      case '--version':
        io.out(VERSION);
        return 0;
    }
    const load = COMMANDS[command];
    if (!load) {
      io.err(`${NAME}: unknown command "${command}"\n\n${USAGE}`);
      return 2;
    }
    return await (
      await load()
    )(rest, io);
  } catch (err) {
    io.err(`${NAME}: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}
