import type { PersonaTool } from '@hermes-hq/hodios-schema';
import { placeholder, type Lowering } from '../render.js';
import { blocks, entryText, exportName, frontmatter, inputsBlock, sectionBlock } from '../text.js';
import type { Adapter, AdapterResult, ResolvedEntry } from '../types.js';
import { skillBody } from './skill.js';

const one = (files: AdapterResult['files'], warnings: string[] = []): AdapterResult => ({ files, warnings });

/** Persona/style/rule text used where a target has no persona concept of its own. */
const personaIntro = 'Work as the persona below for this task, unless the user asks otherwise.';

// ── Copilot ────────────────────────────────────────────────────────────────────────────────────────────────

const COPILOT_AGENT_MAX = 30_000;
const COPILOT_TOOLS: Record<PersonaTool, string> = {
  read: 'read',
  search: 'search',
  edit: 'edit',
  write: 'edit',
  shell: 'execute',
  web: 'web',
  git: 'execute',
};

const copilotInput = (name: string, description: string) =>
  `\${input:${name}:${description.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim()}}`;

const copilotLowering: Lowering = {
  ref: (arg) => copilotInput(arg.name, arg.description),
  section: (arg, inner) => `Only if ${arg.name} was provided (leave it empty to skip): ${inner}`,
};

/** `.github/prompts/<id>.prompt.md`: `${input:name:description}` variables, agent mode. */
export const copilotPromptAdapter: Adapter = {
  id: 'copilot-prompt',
  label: 'GitHub Copilot prompt file',
  kinds: ['prompt', 'workflow'],
  compile(entry, ctx) {
    const { fm } = entry;
    const head = frontmatter({
      description: fm.description,
      agent: 'agent',
      'argument-hint': fm.args?.length ? fm.args.map((a) => a.name).join(' ') : undefined,
    });
    const content = `${head}\n${skillBody(entry, ctx, copilotLowering, undefined)}`;
    return one([{ slot: 'prompts', name: `${exportName(fm.id)}.prompt.md`, content, mode: 'file' }]);
  },
};

/** `.github/agents/<id>.agent.md`: a persona as a custom agent (≤ 30k characters). */
export const copilotAgentAdapter: Adapter = {
  id: 'copilot-agent',
  label: 'GitHub Copilot custom agent',
  kinds: ['persona'],
  compile(entry) {
    const { fm } = entry;
    const tools = fm.tools?.length ? [...new Set(fm.tools.map((t) => COPILOT_TOOLS[t]))] : undefined;
    const head = frontmatter({ name: exportName(fm.id), description: fm.description, tools });
    const content = `${head}\n${blocks(entry.body)}`;
    const warnings =
      content.length > COPILOT_AGENT_MAX
        ? [`${fm.id}: ${content.length} characters; Copilot agents allow ${COPILOT_AGENT_MAX}`]
        : [];
    return one([{ slot: 'agents', name: `${exportName(fm.id)}.agent.md`, content, mode: 'file' }], warnings);
  },
};

/** `.github/instructions/<id>.instructions.md`: rules scoped by `applyTo`, styles and personas on `**`. */
export const copilotInstructionsAdapter: Adapter = {
  id: 'copilot-instructions',
  label: 'GitHub Copilot instructions file',
  kinds: ['rule', 'style', 'persona'],
  compile(entry, ctx) {
    const { fm } = entry;
    const applyTo = fm.applies_to?.length ? fm.applies_to.join(',') : '**';
    const head = frontmatter({ description: fm.description, applyTo });
    const body = fm.kind === 'persona' ? blocks(personaIntro, entry.body) : entryText(entry, undefined, ctx.level);
    return one([
      { slot: 'instructions', name: `${exportName(fm.id)}.instructions.md`, content: `${head}\n${body}`, mode: 'file' },
    ]);
  },
};

// ── Cursor ─────────────────────────────────────────────────────────────────────────────────────────────────

/** `.cursor/rules/<id>.mdc`: rules by glob or always on; personas agent-requested; styles always on. */
export const cursorRuleAdapter: Adapter = {
  id: 'cursor-rule',
  label: 'Cursor rule (.mdc)',
  kinds: ['rule', 'style', 'persona'],
  compile(entry, ctx) {
    const { fm } = entry;
    const globs = fm.kind === 'rule' && fm.applies_to?.length ? fm.applies_to.join(',') : undefined;
    const alwaysApply = fm.kind === 'persona' ? false : globs === undefined;
    const head = frontmatter({ description: fm.description, globs, alwaysApply });
    const body = fm.kind === 'persona' ? blocks(personaIntro, entry.body) : entryText(entry, undefined, ctx.level);
    return one([{ slot: 'rules', name: `${exportName(fm.id)}.mdc`, content: `${head}\n${body}`, mode: 'file' }]);
  },
};

/** `.cursor/commands/<id>.md`: plain Markdown; text typed after the command reaches the model as-is. */
export const cursorCommandAdapter: Adapter = {
  id: 'cursor-command',
  label: 'Cursor command',
  kinds: ['prompt', 'workflow'],
  compile(entry, ctx) {
    const { fm } = entry;
    const lowering: Lowering = { ref: (a) => placeholder(a.name) };
    const content = skillBody(entry, ctx, lowering, inputsBlock(fm.args));
    return one([{ slot: 'commands', name: `${exportName(fm.id)}.md`, content, mode: 'file' }]);
  },
};

// ── Gemini CLI ─────────────────────────────────────────────────────────────────────────────────────────────

/** TOML multi-line basic string. Gemini's `!{…}` and `@{…}` injections are defused; source bans them anyway. */
export function tomlMultiline(text: string): string {
  const safe = text.replace(/([!@])\{/g, '$1 {');
  return `"""\n${safe.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""`;
}

export const tomlString = (text: string): string => JSON.stringify(text);

/** `.gemini/commands/<id>.toml`: one `{{args}}` slot plus "Inputs" parse instructions. */
export const geminiTomlAdapter: Adapter = {
  id: 'gemini-toml',
  label: 'Gemini CLI command (TOML)',
  kinds: ['prompt', 'workflow'],
  compile(entry, ctx) {
    const { fm } = entry;
    const inputs = inputsBlock(
      fm.args,
      undefined,
      'Read each value from the user input below. If a required value is missing, ask for it once.',
    );
    const userInput = fm.args?.length ? 'User input:\n\n{{args}}' : undefined;
    const body = blocks(skillBody(entry, ctx, { ref: (a) => placeholder(a.name) }, inputs), userInput);
    const content = `description = ${tomlString(fm.description)}\nprompt = ${tomlMultiline(body)}\n`;
    return one([{ slot: 'commands', name: `${exportName(fm.id)}.toml`, content, mode: 'file' }]);
  },
};

// ── OpenCode ───────────────────────────────────────────────────────────────────────────────────────────────

/** `.opencode/commands/<id>.md`: `$ARGUMENTS` plus an Inputs preamble. */
export const opencodeCommandAdapter: Adapter = {
  id: 'opencode-command',
  label: 'OpenCode command',
  kinds: ['prompt', 'workflow'],
  compile(entry, ctx) {
    const { fm } = entry;
    const inputs = inputsBlock(
      fm.args,
      undefined,
      'Read each value from the arguments below. If a required value is missing, ask for it once.',
    );
    const args = fm.args?.length ? 'Arguments: $ARGUMENTS' : undefined;
    const head = frontmatter({ description: fm.description });
    const content = `${head}\n${blocks(skillBody(entry, ctx, { ref: (a) => placeholder(a.name) }, inputs), args)}`;
    return one([{ slot: 'commands', name: `${exportName(fm.id)}.md`, content, mode: 'file' }]);
  },
};

/** OpenCode permission block from what the persona needs: missing capabilities are denied, present ones ask. */
export function opencodePermission(entry: ResolvedEntry): Record<string, string> {
  const tools = new Set(entry.fm.tools ?? []);
  const requires = new Set(entry.fm.requires ?? []);
  const edit = tools.has('edit') || tools.has('write') || requires.has('file-write');
  const bash = tools.has('shell') || tools.has('git') || requires.has('shell') || requires.has('git');
  const web = tools.has('web') || requires.has('web');
  return { edit: edit ? 'ask' : 'deny', bash: bash ? 'ask' : 'deny', webfetch: web ? 'ask' : 'deny' };
}

/** `.opencode/agents/<id>.md`: a persona as a subagent with a permission block. */
export const opencodeAgentAdapter: Adapter = {
  id: 'opencode-agent',
  label: 'OpenCode agent',
  kinds: ['persona'],
  compile(entry) {
    const { fm } = entry;
    const head = frontmatter({ description: fm.description, mode: 'subagent', permission: opencodePermission(entry) });
    return one([
      { slot: 'agents', name: `${exportName(fm.id)}.md`, content: `${head}\n${blocks(entry.body)}`, mode: 'file' },
    ]);
  },
};

// ── Codex custom prompts ───────────────────────────────────────────────────────────────────────────────────

/** `~/.codex/prompts/<id>.md`: uppercase named placeholders filled with `KEY=value` (user scope only). */
export const codexPromptAdapter: Adapter = {
  id: 'codex-prompt',
  label: 'Codex custom prompt',
  kinds: ['prompt', 'workflow'],
  compile(entry, ctx) {
    const { fm } = entry;
    const ref = (name: string) => `$${name.toUpperCase()}`;
    const lowering: Lowering = {
      ref: (a) => ref(a.name),
      section: (a, inner) => `Only if ${a.name.toUpperCase()} was provided: ${inner}`,
    };
    const inputs = inputsBlock(
      fm.args,
      (a) => a.name.toUpperCase(),
      'Pass values as KEY=value. If a required value is missing or still shows as $KEY, ask for it once.',
    );
    const head = frontmatter({
      description: fm.description,
      'argument-hint': fm.args?.length
        ? fm.args
            .map((a) => (a.required ? `${a.name.toUpperCase()}=<${a.name}>` : `[${a.name.toUpperCase()}=<${a.name}>]`))
            .join(' ')
        : undefined,
    });
    return one([
      {
        slot: 'prompts',
        name: `${exportName(fm.id)}.md`,
        content: `${head}\n${skillBody(entry, ctx, lowering, inputs)}`,
        mode: 'file',
      },
    ]);
  },
};

// ── Shared instruction files ───────────────────────────────────────────────────────────────────────────────

const sectionAdapter = (id: string, label: string): Adapter => ({
  id,
  label,
  kinds: ['rule', 'style', 'persona'],
  compile(entry, ctx) {
    return one([{ slot: 'memory', name: '', content: sectionBlock(entry, ctx.level), mode: 'section' }]);
  },
});

/** A section in AGENTS.md (Codex, OpenCode and every AGENTS.md reader). */
export const agentsMdAdapter = sectionAdapter('agents-md', 'AGENTS.md section');
/** A section in GEMINI.md. */
export const geminiMdAdapter = sectionAdapter('gemini-md', 'GEMINI.md section');
