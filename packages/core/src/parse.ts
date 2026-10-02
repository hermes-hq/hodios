import { parse as parseYaml, YAMLParseError } from 'yaml';

export interface ParsedDocument {
  /** Parsed YAML frontmatter; undefined when the file has none or it failed to parse. */
  data: unknown;
  /** Markdown after the closing `---`. */
  body: string;
  /** 1-based line where the body starts. */
  bodyLine: number;
  error?: string;
}

const FENCE = /^---[ \t]*$/;

/** Splits `---\nyaml\n---\nbody` and parses the YAML (YAML 1.2 core schema; dates stay strings). */
export function parseFrontmatter(text: string): ParsedDocument {
  const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const lines = normalized.split('\n');
  if (!FENCE.test(lines[0] ?? '')) {
    return {
      data: undefined,
      body: normalized,
      bodyLine: 1,
      error: 'missing YAML frontmatter (file must start with ---)',
    };
  }
  const end = lines.findIndex((line, i) => i > 0 && FENCE.test(line));
  if (end === -1) {
    return {
      data: undefined,
      body: normalized,
      bodyLine: 1,
      error: 'unterminated YAML frontmatter (no closing ---)',
    };
  }
  const yamlText = lines.slice(1, end).join('\n');
  const body = lines.slice(end + 1).join('\n');
  try {
    return { data: parseYaml(yamlText, { uniqueKeys: true }), body, bodyLine: end + 2 };
  } catch (err) {
    const message = err instanceof YAMLParseError ? err.message.split('\n')[0] : String(err);
    return { data: undefined, body, bodyLine: end + 2, error: `invalid YAML: ${message}` };
  }
}

/** Parses a standalone YAML document (evals.yaml, vocab files). */
export function parseYamlDocument(text: string): { data: unknown; error?: string } {
  try {
    return { data: parseYaml(text, { uniqueKeys: true }) };
  } catch (err) {
    const message = err instanceof YAMLParseError ? err.message.split('\n')[0] : String(err);
    return { data: undefined, error: `invalid YAML: ${message}` };
  }
}
