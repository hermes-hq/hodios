import type { PersonaTool } from '@hermes-hq/hodios-schema';
import { blocks, exportName, frontmatter, sectionBlock, styleText } from '../text.js';
import type { Adapter, AdapterResult } from '../types.js';
import { claudeArgFields, claudeInputs, claudeLowering, skillBody, userOnly } from './skill.js';

/** Abstract persona tools -> Claude Code tool names. */
const CLAUDE_TOOLS: Record<PersonaTool, string[]> = {
  read: ['Read'],
  search: ['Grep', 'Glob'],
  edit: ['Edit'],
  write: ['Write'],
  shell: ['Bash'],
  web: ['WebFetch', 'WebSearch'],
  git: ['Bash'],
};

/** `.claude/commands/<id>.md`: a slash command with named `$arg` substitution. */
export const claudeCommandAdapter: Adapter = {
  id: 'claude-command',
  label: 'Claude Code slash command',
  kinds: ['prompt', 'workflow'],
  compile(entry, ctx): AdapterResult {
    const { fm } = entry;
    const head = frontmatter({
      description: fm.description,
      ...claudeArgFields(fm.args),
      'disable-model-invocation': userOnly(entry) ? true : undefined,
    });
    const content = `${head}\n${skillBody(entry, ctx, claudeLowering, claudeInputs(fm.args))}`;
    return { files: [{ slot: 'commands', name: `${exportName(fm.id)}.md`, content, mode: 'file' }], warnings: [] };
  },
};

/** `.claude/agents/<id>.md`: a persona as a subagent. Tools map from the abstract list; none = inherit. */
export const claudeAgentAdapter: Adapter = {
  id: 'claude-agent',
  label: 'Claude Code subagent',
  kinds: ['persona'],
  compile(entry): AdapterResult {
    const { fm } = entry;
    const tools = fm.tools?.length ? [...new Set(fm.tools.flatMap((t) => CLAUDE_TOOLS[t]))].join(', ') : undefined;
    const head = frontmatter({ name: exportName(fm.id), description: fm.description, tools, color: fm.color });
    return {
      files: [
        { slot: 'agents', name: `${exportName(fm.id)}.md`, content: `${head}\n${blocks(entry.body)}`, mode: 'file' },
      ],
      warnings: [],
    };
  },
};

/** `.claude/output-styles/<id>.md`: a persona or style as the session's voice. */
export const claudeOutputStyleAdapter: Adapter = {
  id: 'claude-output-style',
  label: 'Claude Code output style',
  kinds: ['persona', 'style'],
  compile(entry, ctx): AdapterResult {
    const { fm } = entry;
    const head = frontmatter({
      name: fm.title,
      description: fm.description,
      'keep-coding-instructions': fm.kind === 'style' ? true : (fm.keep_coding_instructions ?? true),
    });
    const body = fm.kind === 'style' ? styleText(entry, ctx.level) : blocks(entry.body);
    return {
      files: [{ slot: 'output-styles', name: `${exportName(fm.id)}.md`, content: `${head}\n${body}`, mode: 'file' }],
      warnings: [],
    };
  },
};

/** A section in CLAUDE.md between hodios markers (rules and styles). */
export const claudeMdAdapter: Adapter = {
  id: 'claude-md',
  label: 'CLAUDE.md section',
  kinds: ['rule', 'style', 'persona'],
  compile(entry, ctx): AdapterResult {
    return {
      files: [{ slot: 'memory', name: '', content: sectionBlock(entry, ctx.level), mode: 'section' }],
      warnings: [],
    };
  },
};
