<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand/banner-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/brand/banner-light.png">
  <img alt="Hodios: open prompts for every AI tool" src="assets/brand/banner-dark.png" width="100%">
</picture>

**Hodios — prompts by Hermes IDE**

Expert prompts, personas and workflows for work, learning, creativity and everyday life — one line to use in any AI tool.<br>
Open, tested and free forever.

[![check](https://github.com/hermes-hq/hodios/actions/workflows/check.yml/badge.svg)](https://github.com/hermes-hq/hodios/actions/workflows/check.yml)
[![catalog](https://img.shields.io/github/v/release/hermes-hq/hodios?label=catalog&color=7c3aed)](https://github.com/hermes-hq/hodios/releases)
[![content: CC0-1.0](https://img.shields.io/badge/content-CC0--1.0-green)](LICENSES/CC0-1.0.txt)
[![code: Apache-2.0](https://img.shields.io/badge/code-Apache--2.0-blue)](LICENSE)
[![DCO](https://img.shields.io/badge/contributions-DCO-informational)](CONTRIBUTING.md#sign-off)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-support-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/anhaia)

[Browse the library](https://hermes-ide.com/prompts) · [Install](#install) · [What's inside](#whats-inside) · [Contribute in 5 minutes](CONTRIBUTING.md)

</div>

---

Works with **Claude Code · Codex · Cursor · GitHub Copilot · Gemini CLI · Antigravity · OpenCode · Windsurf · Zed · Continue · ChatGPT · claude.ai · any MCP client**, and ships as the built-in library of [Hermes IDE](https://hermes-ide.com).

Every entry is written once and compiled to each tool's native format: Agent Skills, plugins, subagents, slash commands, rules files or plain paste-in text. Nothing to learn, nothing to run, no account.

> **Status: early.** The format, schema and validator are in place, and the first entries are being written. The install commands below go live with the first catalog release. Watch the repo or the [releases](https://github.com/hermes-hq/hodios/releases) to know when.

*Hodios* (HO-dee-os) is an epithet of Hermes: the guide of travellers. This library is the guide for your agents.

## Install

Pick your tool. Each command installs one entry; swap the id for any entry in the [library](https://hermes-ide.com/prompts).

| Tool | One line |
|---|---|
| **Any agent (Agent Skills)** | `npx skills add hermes-hq/hodios-dist --skill review-pull-request` |
| **Claude Code** | `claude plugin marketplace add hermes-hq/hodios-dist && claude plugin install hodios-code-review@hodios` |
| **GitHub Copilot CLI** | `copilot plugin marketplace add hermes-hq/hodios-dist && copilot plugin install hodios-code-review@hodios` |
| **GitHub CLI** | `gh skill install hermes-hq/hodios-dist review-pull-request` |
| **Gemini CLI** | `gemini skills install https://github.com/hermes-hq/hodios-dist --path skills/review-pull-request --consent` |
| **Codex, Cursor, OpenCode, Windsurf, Antigravity, Zed, Continue** | `npx hodios install review-pull-request --target <tool>` |
| **MCP (any client)** | `claude mcp add hodios -- npx -y @hermes-hq/hodios-mcp` |
| **ChatGPT, claude.ai, anything else** | Open the entry on [hermes-ide.com/prompts](https://hermes-ide.com/prompts) and press **Copy** |
| **Hermes IDE** | Built in. Open the Library tab. |

Use a prompt once, without installing anything:

```sh
npx hodios use review-pull-request --var diff=@- < my-change.diff | claude -p
```

## What's inside

| Kind | What it is | Becomes |
|---|---|---|
| **Prompt** | A task with typed inputs: review a PR, find a root cause, write a migration | Skill, slash command, Copilot prompt file, Gemini command, MCP prompt |
| **Persona** | Who the agent is and how it works: security auditor, debugger, tech writer | Subagent, output style, custom agent, project instructions |
| **Workflow** | Ordered steps with approval gates: feature track, incident response | Skill with step references, Windsurf/Antigravity workflow, Hermes Track |
| **Rule** | Always-on project instructions: TypeScript strictness, commit conventions | AGENTS.md / CLAUDE.md / GEMINI.md section, Cursor rule, Copilot instructions |
| **Style** | An output modifier with 5 levels: concise, diff-only, beginner-friendly | Output style or appended instructions |

Entries are organised into 24 categories, from **code review**, **debugging** and **testing** to **security**, **incident response**, **planning**, **docs** and **AI/ML**.

### The ones for you, not all of them

Every entry is tagged with what it is for: the **stack** it targets (TypeScript, Django, Terraform…), the **stage** of work (plan, build, review, operate…), what it **needs** (repo access, shell, an MCP server) and which **tools** it works in. Hermes IDE, the site and the CLI use those tags to put the entries that match your project and your interests first, so you see a short, relevant list instead of the whole catalog. Stack-agnostic entries stay visible to everyone.

<!-- catalog:start -->
_The catalog table is generated here at each release._
<!-- catalog:end -->

## Why Hodios

- **Measured, not claimed.** Stable entries must beat a plain request on their own evals, on models from two vendors, before they are promoted.
- **Native everywhere.** One source, compiled to each tool's real format and limits. No wrapper, no runtime, no lock-in.
- **Self-contained.** An installed entry never depends on another entry being installed.
- **Safe by construction.** Entries are text only: no scripts, no tool grants, no hidden characters, no download-and-run. Every change is linted and reviewed.
- **Free for any use.** Content is CC0: copy it into your repo, your product or your docs. A link back is appreciated, never required.
- **No telemetry.** The library, CLI and MCP server collect nothing.

## Contribute

Adding a prompt takes about five minutes: copy an example folder, edit the frontmatter, write the body, run `npm run validate`, and open a pull request. [CONTRIBUTING.md](CONTRIBUTING.md) has the walkthrough, the quality bar and what we do not accept. Questions and ideas go to [Discussions](https://github.com/hermes-hq/hodios/discussions).

## Repository layout

```
library/<domain>/<category>/<id>/<kind>.md   entries (prompt.md, persona.md, workflow.md, rule.md or style.md)
partials/                            shared snippets included with {{> path}}
vocab/                               controlled vocabularies: domains, categories, roles, stacks... (see TAXONOMY.md)
schema/                              JSON Schemas for entries, evals and vocab
packages/schema  core  cli           @hermes-hq/hodios-schema, @hermes-hq/hodios-core, hodios (CLI)
ids.lock                             every released id, append-only
```

The compiled install tree lives in [hermes-hq/hodios-dist](https://github.com/hermes-hq/hodios-dist), built by the release bot.

## Support

Hodios is free and always will be. If it saves you time and you'd like to say thanks, you can [buy the maintainer a coffee](https://buymeacoffee.com/anhaia). Stars, good entries and honest bug reports help just as much.

## License

- **Content** (`library/`, `partials/`, `vocab/` and every generated export): [CC0-1.0](LICENSES/CC0-1.0.txt). No rights reserved.
- **Code** (`packages/`, `tools/`, `schema/`): [Apache-2.0](LICENSE).

[REUSE.toml](REUSE.toml) maps every path. Hodios is separate from Hermes IDE's own license. "Hodios" and "Hermes IDE" are trademarks; see [TRADEMARK.md](TRADEMARK.md).
