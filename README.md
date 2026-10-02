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

Works with **Claude Code · Codex · Cursor · GitHub Copilot · Gemini CLI · OpenCode · ChatGPT · claude.ai** and any tool that reads Agent Skills or `AGENTS.md`, and ships as the built-in library of [Hermes IDE](https://hermes-ide.com).

Every entry is written once and compiled to each tool's native format: Agent Skills, plugins, subagents, slash commands, rules files or plain paste-in text. Nothing to learn, nothing to run, no account.

> **Status: first catalog, `2026.1002.0`.** 203 entries are live through the Claude Code marketplace and Agent Skills installers below. The `hodios` CLI is not on npm yet; until it is, run it from a checkout (see [Use the CLI](#use-the-cli)).

*Hodios* (HO-dee-os) is an epithet of Hermes: the guide of travellers. This library is the guide for your agents.

## Install

Pick your tool. Each command was run against the published install tree in [hermes-hq/hodios-dist](https://github.com/hermes-hq/hodios-dist); swap the id or category for any entry in the catalog below.

| Tool | One line |
|---|---|
| **Claude Code** | `claude plugin marketplace add hermes-hq/hodios-dist && claude plugin install hodios-code-review@hodios` |
| **Codex, Cursor, Copilot, OpenCode and other Agent Skills tools** | `npx skills add hermes-hq/hodios-dist --skill review-pull-request -a codex` |
| **Gemini CLI** | `gemini skills install https://github.com/hermes-hq/hodios-dist --path skills/review-pull-request --consent` |
| **ChatGPT, claude.ai, anything else** | Copy `paste/<id>.md` from [hodios-dist](https://github.com/hermes-hq/hodios-dist/tree/main/paste) |
| **Hermes IDE** | Built in. Open the Library tab. |

Claude Code installs a whole category at a time: `hodios-testing`, `hodios-security`, `hodios-debugging` and so on, one plugin per category. Then call an entry as `/hodios-code-review:review-pull-request`, or let Claude pick the subagents (`hodios-security:security-auditor`). For `npx skills`, `-a` takes `claude-code`, `codex`, `cursor`, `github-copilot`, `opencode`, `gemini-cli` and more; `--skill '*'` installs all 203.

### Use the CLI

The CLI searches the catalog, ranks what fits your project and writes each tool's native files (rules and personas included, which the installers above do not cover). It goes to npm as `hodios`; until then, from a checkout:

```sh
git clone https://github.com/hermes-hq/hodios ~/hodios
cd ~/hodios && npm ci && npm run build && npm run hodios -- build
alias hodios="HODIOS_CATALOG=~/hodios/dist/catalog/v1 node ~/hodios/packages/cli/bin/hodios.js"

cd ~/my-project
hodios search                                    # what fits this project first, and why
hodios install review-pull-request python-style-rules --target cursor
hodios use review-pull-request --arg diff=@- < my-change.diff | claude -p
```

Targets: `claude-code`, `codex`, `cursor`, `copilot`, `gemini-cli`, `opencode`, `agents-md`, `paste`, `hermes`. `list` shows what is installed and `remove` takes it out again.

## What's inside

| Kind | What it is | Becomes |
|---|---|---|
| **Prompt** | A task with typed inputs: review a PR, find a root cause, write a migration | Skill, slash command, Copilot prompt file, Gemini command |
| **Persona** | Who the agent is and how it works: security auditor, debugger, tech writer | Subagent, output style, custom agent, project instructions |
| **Workflow** | Ordered steps with approval gates: feature track, literature review | Skill with the steps inlined, Copilot prompt file, Gemini command, Hermes Track |
| **Rule** | Always-on project instructions: TypeScript strictness, commit conventions | AGENTS.md / CLAUDE.md / GEMINI.md section, Cursor rule, Copilot instructions |
| **Style** | An output modifier with 5 levels: concise, diff-only, beginner-friendly | Output style or appended instructions |

Entries are organised by domain and category, from **code review**, **debugging** and **testing** to **teaching**, **trip planning** and **statistics**. The full list is below.

### The ones for you, not all of them

Every entry is tagged with what it is for: the **stack** it targets (TypeScript, Django, Terraform…), the **stage** of work (plan, build, review, operate…), what it **needs** (repo access, shell, an MCP server) and which **tools** it works in. Hermes IDE, the site and the CLI use those tags to put the entries that match your project and your interests first, so you see a short, relevant list instead of the whole catalog. Stack-agnostic entries stay visible to everyone.

In a project folder, `npx hodios search` with no query does this on your machine: it reads the project's manifests and agent config folders, ranks what fits first and says why ("your project uses React"). Nothing is sent anywhere, and `--all` turns it off.

<!-- catalog:start -->
**203 entries** (173 prompts, 19 personas, 3 workflows, 8 rules).

<details><summary><b>Software engineering</b> · 103</summary>

| Category | Entries | Try |
|---|---:|---|
| Implementation | 13 | [`add-feature-flag`](library/software-engineering/implementation/add-feature-flag/) · [`build-rest-endpoint`](library/software-engineering/implementation/build-rest-endpoint/) · [`build-ui-component`](library/software-engineering/implementation/build-ui-component/) |
| AI and ML engineering | 10 | [`build-mcp-server`](library/software-engineering/ai-ml/build-mcp-server/) · [`choose-ml-approach`](library/software-engineering/ai-ml/choose-ml-approach/) · [`design-rag-pipeline`](library/software-engineering/ai-ml/design-rag-pipeline/) |
| Accessibility | 8 | [`audit-web-accessibility`](library/software-engineering/accessibility/audit-web-accessibility/) · [`build-aria-widget`](library/software-engineering/accessibility/build-aria-widget/) · [`fix-form-accessibility`](library/software-engineering/accessibility/fix-form-accessibility/) |
| Data engineering | 8 | [`design-data-pipeline`](library/software-engineering/data/design-data-pipeline/) · [`design-star-schema`](library/software-engineering/data/design-star-schema/) · [`generate-realistic-seed-data`](library/software-engineering/data/generate-realistic-seed-data/) |
| DevOps | 8 | [`plan-disaster-recovery`](library/software-engineering/devops/plan-disaster-recovery/) · [`reduce-cloud-spend`](library/software-engineering/devops/reduce-cloud-spend/) · [`review-iac-plan`](library/software-engineering/devops/review-iac-plan/) |
| Localization (software) | 7 | [`build-localization-glossary`](library/software-engineering/localization/build-localization-glossary/) · [`extract-ui-strings`](library/software-engineering/localization/extract-ui-strings/) · [`plan-rtl-support`](library/software-engineering/localization/plan-rtl-support/) |
| Conventions | 6 | [`api-design-rules`](library/software-engineering/conventions/api-design-rules/) · [`go-style-rules`](library/software-engineering/conventions/go-style-rules/) · [`python-style-rules`](library/software-engineering/conventions/python-style-rules/) |
| Security | 6 | [`audit-dependencies`](library/software-engineering/security/audit-dependencies/) · [`handle-leaked-secret`](library/software-engineering/security/handle-leaked-secret/) · [`harden-web-app-config`](library/software-engineering/security/harden-web-app-config/) |
| Incident and operations | 5 | [`build-incident-timeline`](library/software-engineering/incident/build-incident-timeline/) · [`define-slos`](library/software-engineering/incident/define-slos/) · [`write-runbook`](library/software-engineering/incident/write-runbook/) |
| Performance | 5 | [`find-memory-leak`](library/software-engineering/performance/find-memory-leak/) · [`improve-web-vitals`](library/software-engineering/performance/improve-web-vitals/) · [`optimize-sql-query`](library/software-engineering/performance/optimize-sql-query/) |
| Testing | 5 | [`add-characterization-tests`](library/software-engineering/testing/add-characterization-tests/) · [`write-contract-tests`](library/software-engineering/testing/write-contract-tests/) · [`write-e2e-test`](library/software-engineering/testing/write-e2e-test/) |
| Migration | 4 | [`migrate-api-version`](library/software-engineering/migration/migrate-api-version/) · [`migrate-database-engine`](library/software-engineering/migration/migrate-database-engine/) · [`migrate-javascript-to-typescript`](library/software-engineering/migration/migrate-javascript-to-typescript/) |
| Documentation | 3 | [`write-code-tutorial`](library/software-engineering/docs/write-code-tutorial/) · [`write-onboarding-guide`](library/software-engineering/docs/write-onboarding-guide/) · [`write-release-notes`](library/software-engineering/docs/write-release-notes/) |
| Git and version control | 3 | [`clean-up-commit-history`](library/software-engineering/git/clean-up-commit-history/) · [`recover-lost-git-work`](library/software-engineering/git/recover-lost-git-work/) · [`split-large-pull-request`](library/software-engineering/git/split-large-pull-request/) |
| Code review | 2 | [`review-error-handling`](library/software-engineering/code-review/review-error-handling/) · [`review-pull-request`](library/code-review/review-pull-request/) |
| Debugging | 2 | [`bisect-regression`](library/software-engineering/debugging/bisect-regression/) · [`debug-race-condition`](library/software-engineering/debugging/debug-race-condition/) |
| Learning to code | 2 | [`create-coding-exercises`](library/software-engineering/learning/create-coding-exercises/) · [`learn-new-programming-language`](library/software-engineering/learning/learn-new-programming-language/) |
| Planning | 2 | [`estimate-with-ranges`](library/software-engineering/planning/estimate-with-ranges/) · [`feature-track`](library/planning/feature-track/) |
| Refactoring | 2 | [`retire-unused-code-paths`](library/software-engineering/refactoring/retire-unused-code-paths/) · [`split-large-module`](library/software-engineering/refactoring/split-large-module/) |
| Architecture | 1 | [`write-design-doc`](library/software-engineering/architecture/write-design-doc/) |
| Developer writing | 1 | [`explain-tech-to-executives`](library/software-engineering/writing/explain-tech-to-executives/) |

</details>

<details><summary><b>Learning and education</b> · 25</summary>

| Category | Entries | Try |
|---|---:|---|
| Teaching | 7 | [`create-rubric`](library/education/teaching/create-rubric/) · [`design-classroom-activity`](library/education/teaching/design-classroom-activity/) · [`differentiate-lesson`](library/education/teaching/differentiate-lesson/) |
| Studying | 5 | [`create-memory-aids`](library/education/studying/create-memory-aids/) · [`create-study-plan`](library/education/studying/create-study-plan/) · [`make-flashcards`](library/education/studying/make-flashcards/) |
| Tutoring | 5 | [`check-my-reasoning`](library/education/tutoring/check-my-reasoning/) · [`explain-concept-at-level`](library/education/tutoring/explain-concept-at-level/) · [`give-essay-feedback`](library/education/tutoring/give-essay-feedback/) |
| Course design | 4 | [`build-self-study-curriculum`](library/education/course-design/build-self-study-curriculum/) · [`design-course-outline`](library/education/course-design/design-course-outline/) · [`write-learning-objectives`](library/education/course-design/write-learning-objectives/) |
| Exam preparation | 4 | [`generate-practice-exam`](library/education/exam-prep/generate-practice-exam/) · [`grade-practice-answers`](library/education/exam-prep/grade-practice-answers/) · [`prepare-oral-exam`](library/education/exam-prep/prepare-oral-exam/) |

</details>

<details><summary><b>Languages</b> · 15</summary>

| Category | Entries | Try |
|---|---:|---|
| Language learning | 8 | [`build-vocabulary-list`](library/languages/language-learning/build-vocabulary-list/) · [`coach-pronunciation`](library/languages/language-learning/coach-pronunciation/) · [`correct-my-sentences`](library/languages/language-learning/correct-my-sentences/) |
| Translation | 4 | [`review-translation`](library/languages/translation/review-translation/) · [`transcreate-marketing-copy`](library/languages/translation/transcreate-marketing-copy/) · [`translate-preserving-tone`](library/languages/translation/translate-preserving-tone/) |
| Conversation practice | 3 | [`practice-speaking-exam`](library/languages/conversation-practice/practice-speaking-exam/) · [`roleplay-real-situation`](library/languages/conversation-practice/roleplay-real-situation/) · [`language-exchange-partner`](library/languages/conversation-practice/language-exchange-partner/) |

</details>

<details><summary><b>Data analysis</b> · 32</summary>

| Category | Entries | Try |
|---|---:|---|
| Data exploration | 9 | [`analyze-survey-results`](library/data-analysis/data-exploration/analyze-survey-results/) · [`answer-question-with-sql`](library/data-analysis/data-exploration/answer-question-with-sql/) · [`build-cohort-analysis`](library/data-analysis/data-exploration/build-cohort-analysis/) |
| Spreadsheets | 8 | [`build-pivot-analysis`](library/data-analysis/spreadsheets/build-pivot-analysis/) · [`clean-messy-spreadsheet`](library/data-analysis/spreadsheets/clean-messy-spreadsheet/) · [`debug-spreadsheet-formula`](library/data-analysis/spreadsheets/debug-spreadsheet-formula/) |
| Statistics | 7 | [`analyze-ab-test-results`](library/data-analysis/statistics/analyze-ab-test-results/) · [`calculate-sample-size`](library/data-analysis/statistics/calculate-sample-size/) · [`check-analysis-for-pitfalls`](library/data-analysis/statistics/check-analysis-for-pitfalls/) |
| Data visualisation | 4 | [`choose-chart-type`](library/data-analysis/data-visualization/choose-chart-type/) · [`critique-chart`](library/data-analysis/data-visualization/critique-chart/) · [`design-dashboard`](library/data-analysis/data-visualization/design-dashboard/) |
| Reporting | 4 | [`build-kpi-tree`](library/data-analysis/reporting/build-kpi-tree/) · [`define-metric`](library/data-analysis/reporting/define-metric/) · [`write-insight-report`](library/data-analysis/reporting/write-insight-report/) |

</details>

<details><summary><b>Research and science</b> · 18</summary>

| Category | Entries | Try |
|---|---:|---|
| Literature review | 5 | [`build-literature-matrix`](library/research-science/literature-review/build-literature-matrix/) · [`find-research-gaps`](library/research-science/literature-review/find-research-gaps/) · [`summarize-paper`](library/research-science/literature-review/summarize-paper/) |
| Fact-checking | 4 | [`check-statistics-in-article`](library/research-science/fact-checking/check-statistics-in-article/) · [`evaluate-source-credibility`](library/research-science/fact-checking/evaluate-source-credibility/) · [`fact-check-claims`](library/research-science/fact-checking/fact-check-claims/) |
| Research methods | 4 | [`build-qualitative-codebook`](library/research-science/research-methods/build-qualitative-codebook/) · [`design-research-study`](library/research-science/research-methods/design-research-study/) · [`write-survey-questionnaire`](library/research-science/research-methods/write-survey-questionnaire/) |
| Scientific writing | 4 | [`explain-research-to-public`](library/research-science/scientific-writing/explain-research-to-public/) · [`respond-to-reviewers`](library/research-science/scientific-writing/respond-to-reviewers/) · [`write-abstract`](library/research-science/scientific-writing/write-abstract/) |
| Peer review | 1 | [`write-peer-review`](library/research-science/peer-review/write-peer-review/) |

</details>

<details><summary><b>Travel</b> · 10</summary>

| Category | Entries | Try |
|---|---:|---|
| Travel logistics | 4 | [`build-packing-list`](library/travel/travel-logistics/build-packing-list/) · [`check-travel-requirements`](library/travel/travel-logistics/check-travel-requirements/) · [`handle-travel-disruption`](library/travel/travel-logistics/handle-travel-disruption/) |
| Trip planning | 4 | [`plan-group-trip`](library/travel/trip-planning/plan-group-trip/) · [`plan-itinerary`](library/travel/trip-planning/plan-itinerary/) · [`plan-road-trip`](library/travel/trip-planning/plan-road-trip/) |
| Local culture | 2 | [`learn-local-etiquette`](library/travel/local-culture/learn-local-etiquette/) · [`plan-food-exploration`](library/travel/local-culture/plan-food-exploration/) |

</details>
<!-- catalog:end -->

## Why Hodios

- **Measured, not claimed.** Stable entries must beat a plain request on their own evals, on models from two vendors, before they are promoted.
- **Native everywhere.** One source, compiled to each tool's real format and limits. No wrapper, no runtime, no lock-in.
- **Self-contained.** An installed entry never depends on another entry being installed.
- **Safe by construction.** Entries are text only: no scripts, no tool grants, no hidden characters, no download-and-run. Every change is linted and reviewed.
- **Free for any use.** Content is CC0: copy it into your repo, your product or your docs. A link back is appreciated, never required.
- **No telemetry.** The library and the CLI collect nothing.

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
