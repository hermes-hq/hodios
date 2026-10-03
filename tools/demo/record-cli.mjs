#!/usr/bin/env node
// Records the README demo: runs real commands with the published CLI in a throwaway project and draws
// their exact output as a terminal-style SVG. Nothing in the picture is typed by hand.
//
// Usage: node tools/demo/record-cli.mjs [--version 0.1.0] [--out assets/demo/cli-demo.svg]
// Needs network access (npm and the public catalog).
import { execSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const COLS = 100;
const CHAR_W = 8.4;
const LINE_H = 19;
const PAD = 20;
const BAR = 34;

/**
 * Fits a line into `cols` columns. Breaks only at spaces and indents continuation lines like the original line,
 * so the words stay exactly as captured; a word longer than the width is cut.
 */
export function wrap(line, cols = COLS) {
  if (line.length <= cols) return [line];
  const indent = /^ */.exec(line)?.[0] ?? '';
  const out = [];
  let rest = line;
  while (rest.length > cols) {
    let cut = rest.lastIndexOf(' ', cols);
    if (cut <= indent.length) cut = cols;
    out.push(rest.slice(0, cut).trimEnd());
    rest = indent + rest.slice(cut).trimStart();
  }
  out.push(rest);
  return out;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Draws a terminal session. Each step is a command and its captured output.
 * Lines appear one after another; without animation support every line is simply shown.
 * @param {{prompt: string, command: string, output: string}[]} steps
 * @param {{title?: string}} [opts]
 * @returns {string} SVG markup
 */
export function renderTerminalSvg(steps, opts = {}) {
  /** @type {{text: string, cls: string}[]} */
  const rows = [];
  for (const [i, s] of steps.entries()) {
    if (i > 0) rows.push({ text: '', cls: 'o' });
    for (const part of wrap(`${s.prompt} ${s.command}`)) rows.push({ text: part, cls: 'c' });
    for (const line of s.output.replace(/\s+$/, '').split('\n')) {
      for (const part of wrap(line)) rows.push({ text: part, cls: 'o' });
    }
  }
  const width = Math.round(COLS * CHAR_W + PAD * 2);
  const height = BAR + PAD + rows.length * LINE_H + PAD;
  const lines = rows
    .map((r, i) => {
      const y = BAR + PAD + (i + 1) * LINE_H - 5;
      const delay = (0.25 + i * 0.06).toFixed(2);
      return `<text class="${r.cls}" x="${PAD}" y="${y}" style="animation-delay:${delay}s">${esc(r.text)}</text>`;
    })
    .join('\n');
  const title = esc(opts.title ?? 'Terminal');
  return `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
<title>${title}</title>
<style>
text{font:13.5px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre;animation:in .2s ease-out backwards}
.c{fill:#e9e5ff;font-weight:600}.o{fill:#b4b0c8}
@keyframes in{from{opacity:0}}
@media (prefers-reduced-motion:reduce){text{animation:none}}
</style>
<rect width="${width}" height="${height}" rx="10" fill="#14121c"/>
<rect width="${width}" height="${BAR}" rx="10" fill="#211e2c"/><rect y="${BAR - 10}" width="${width}" height="10" fill="#211e2c"/>
<circle cx="20" cy="17" r="6" fill="#ff5f57"/><circle cx="40" cy="17" r="6" fill="#febc2e"/><circle cx="60" cy="17" r="6" fill="#28c840"/>
<text x="${width / 2}" y="22" text-anchor="middle" style="fill:#8a86a0;font-size:12px;animation:none">${title}</text>
${lines}
</svg>
`;
}

function main() {
  const arg = (name, fallback) => {
    const i = process.argv.indexOf(name);
    return i > 0 ? process.argv[i + 1] : fallback;
  };
  const version = arg('--version', 'latest');
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const out = join(root, arg('--out', 'assets/demo/cli-demo.svg'));

  const dir = mkdtempSync(join(tmpdir(), 'hodios-demo-'));
  const project = join(dir, 'my-app');
  mkdirSync(project);
  writeFileSync(
    join(project, 'package.json'),
    JSON.stringify({
      name: 'my-app',
      private: true,
      dependencies: { next: '^15.0.0', react: '^19.0.0' },
      devDependencies: { typescript: '^5.6.0' },
    }),
  );
  writeFileSync(join(project, 'tsconfig.json'), '{}\n');

  // `npx @hermes-hq/hodios@<v>` is shown as `npx @hermes-hq/hodios`; npm_config_yes answers npx's install prompt.
  const pin = (cmd) => cmd.replace('npx @hermes-hq/hodios ', `npx @hermes-hq/hodios@${version} `);
  const commands = [
    'npx @hermes-hq/hodios search "pull request" --limit 3',
    'npx @hermes-hq/hodios install review-pull-request --target claude-code',
    'head -n 9 .claude/skills/review-pull-request/SKILL.md',
  ];
  try {
    const steps = commands.map((command) => ({
      prompt: '~/my-app $',
      command,
      output: execSync(pin(command), {
        cwd: project,
        encoding: 'utf8',
        env: { ...process.env, npm_config_yes: 'true', NO_COLOR: '1' },
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
    }));
    mkdirSync(join(out, '..'), { recursive: true });
    writeFileSync(out, renderTerminalSvg(steps, { title: 'hodios in a Next.js project' }));
    console.log(`Wrote ${out}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
