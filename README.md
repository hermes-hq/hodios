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

> **Status: catalog `2026.1002.1`.** 578 entries are live through the Claude Code marketplace and Agent Skills installers below. The `hodios` CLI is not on npm yet; until it is, run it from a checkout (see [Use the CLI](#use-the-cli)).

*Hodios* (HO-dee-os) is an epithet of Hermes: the guide of travellers. This library is the guide for your agents.

## Install

Pick your tool. Each command was run against the published install tree in [hermes-hq/hodios-dist](https://github.com/hermes-hq/hodios-dist); swap the id or domain for any entry in the catalog below.

| Tool | One line |
|---|---|
| **Claude Code** | `claude plugin marketplace add hermes-hq/hodios-dist && claude plugin install hodios-software-engineering@hodios` |
| **Codex, Cursor, Copilot, OpenCode and other Agent Skills tools** | `npx skills add hermes-hq/hodios-dist --skill review-pull-request -a codex` |
| **Gemini CLI** | `gemini skills install https://github.com/hermes-hq/hodios-dist --path skills/review-pull-request --consent` |
| **ChatGPT, claude.ai, anything else** | Copy `paste/<id>.md` from [hodios-dist](https://github.com/hermes-hq/hodios-dist/tree/main/paste) |
| **Hermes IDE** | Built in. Open the Library tab. |

Claude Code installs a whole domain at a time: `hodios-software-engineering`, `hodios-education`, `hodios-travel` and so on, one plugin per domain. Then call an entry as `/hodios-software-engineering:review-pull-request`, or let Claude pick the subagents (`hodios-software-engineering:security-auditor`). For `npx skills`, `-a` takes `claude-code`, `codex`, `cursor`, `github-copilot`, `opencode`, `gemini-cli` and more; `--skill '*'` installs all 578.

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
**578 entries** (500 prompts, 48 personas, 8 workflows, 14 rules, 8 styles).

<details><summary><b>Software engineering</b> · 173</summary>

| Category | Entries | Try |
|---|---:|---|
| Implementation | 13 | [`add-feature-flag`](library/software-engineering/implementation/add-feature-flag/) · [`build-rest-endpoint`](library/software-engineering/implementation/build-rest-endpoint/) · [`build-ui-component`](library/software-engineering/implementation/build-ui-component/) |
| DevOps | 11 | [`plan-disaster-recovery`](library/software-engineering/devops/plan-disaster-recovery/) · [`reduce-cloud-spend`](library/software-engineering/devops/reduce-cloud-spend/) · [`review-dockerfile`](library/software-engineering/devops/review-dockerfile/) |
| Security | 11 | [`audit-dependencies`](library/software-engineering/security/audit-dependencies/) · [`handle-leaked-secret`](library/software-engineering/security/handle-leaked-secret/) · [`harden-web-app-config`](library/software-engineering/security/harden-web-app-config/) |
| AI and ML engineering | 10 | [`build-mcp-server`](library/software-engineering/ai-ml/build-mcp-server/) · [`choose-ml-approach`](library/software-engineering/ai-ml/choose-ml-approach/) · [`design-rag-pipeline`](library/software-engineering/ai-ml/design-rag-pipeline/) |
| Testing | 10 | [`add-characterization-tests`](library/software-engineering/testing/add-characterization-tests/) · [`add-regression-test`](library/software-engineering/testing/add-regression-test/) · [`fill-test-gaps`](library/software-engineering/testing/fill-test-gaps/) |
| Data engineering | 9 | [`design-data-pipeline`](library/software-engineering/data/design-data-pipeline/) · [`design-database-schema`](library/software-engineering/data/design-database-schema/) · [`design-star-schema`](library/software-engineering/data/design-star-schema/) |
| Accessibility | 8 | [`audit-web-accessibility`](library/software-engineering/accessibility/audit-web-accessibility/) · [`build-aria-widget`](library/software-engineering/accessibility/build-aria-widget/) · [`fix-form-accessibility`](library/software-engineering/accessibility/fix-form-accessibility/) |
| Documentation | 8 | [`document-public-api`](library/software-engineering/docs/document-public-api/) · [`write-changelog`](library/software-engineering/docs/write-changelog/) · [`write-code-tutorial`](library/software-engineering/docs/write-code-tutorial/) |
| Git and version control | 8 | [`clean-up-commit-history`](library/software-engineering/git/clean-up-commit-history/) · [`recover-lost-git-work`](library/software-engineering/git/recover-lost-git-work/) · [`recover-lost-work`](library/software-engineering/git/recover-lost-work/) |
| Incident and operations | 8 | [`build-incident-timeline`](library/software-engineering/incident/build-incident-timeline/) · [`define-slos`](library/software-engineering/incident/define-slos/) · [`triage-production-alert`](library/software-engineering/incident/triage-production-alert/) |
| Performance | 8 | [`find-memory-leak`](library/software-engineering/performance/find-memory-leak/) · [`fix-n-plus-one-queries`](library/software-engineering/performance/fix-n-plus-one-queries/) · [`improve-web-vitals`](library/software-engineering/performance/improve-web-vitals/) |
| Conventions | 7 | [`api-design-rules`](library/software-engineering/conventions/api-design-rules/) · [`go-style-rules`](library/software-engineering/conventions/go-style-rules/) · [`python-style-rules`](library/software-engineering/conventions/python-style-rules/) |
| Debugging | 7 | [`bisect-regression`](library/software-engineering/debugging/bisect-regression/) · [`debug-race-condition`](library/software-engineering/debugging/debug-race-condition/) · [`explain-stack-trace`](library/software-engineering/debugging/explain-stack-trace/) |
| Localization (software) | 7 | [`build-localization-glossary`](library/software-engineering/localization/build-localization-glossary/) · [`extract-ui-strings`](library/software-engineering/localization/extract-ui-strings/) · [`plan-rtl-support`](library/software-engineering/localization/plan-rtl-support/) |
| Migration | 7 | [`migrate-api-version`](library/software-engineering/migration/migrate-api-version/) · [`migrate-database-engine`](library/software-engineering/migration/migrate-database-engine/) · [`migrate-javascript-to-typescript`](library/software-engineering/migration/migrate-javascript-to-typescript/) |
| Refactoring | 7 | [`extract-module`](library/software-engineering/refactoring/extract-module/) · [`plan-large-refactor`](library/software-engineering/refactoring/plan-large-refactor/) · [`reduce-duplication`](library/software-engineering/refactoring/reduce-duplication/) |
| Architecture | 6 | [`compare-design-options`](library/software-engineering/architecture/compare-design-options/) · [`design-api-contract`](library/software-engineering/architecture/design-api-contract/) · [`review-system-design`](library/software-engineering/architecture/review-system-design/) |
| Code review | 6 | [`respond-to-review-comments`](library/software-engineering/code-review/respond-to-review-comments/) · [`review-diff-for-risks`](library/software-engineering/code-review/review-diff-for-risks/) · [`review-error-handling`](library/software-engineering/code-review/review-error-handling/) |
| Planning | 6 | [`break-down-epic`](library/software-engineering/planning/break-down-epic/) · [`estimate-task`](library/software-engineering/planning/estimate-task/) · [`estimate-with-ranges`](library/software-engineering/planning/estimate-with-ranges/) |
| Learning to code | 5 | [`create-coding-exercises`](library/software-engineering/learning/create-coding-exercises/) · [`explain-codebase`](library/software-engineering/learning/explain-codebase/) · [`explain-concept-with-code`](library/software-engineering/learning/explain-concept-with-code/) |
| Product (engineering) | 4 | [`write-acceptance-criteria`](library/software-engineering/product/write-acceptance-criteria/) · [`write-prd`](library/software-engineering/product/write-prd/) · [`write-user-stories`](library/software-engineering/product/write-user-stories/) |
| Developer writing | 4 | [`explain-tech-to-executives`](library/software-engineering/writing/explain-tech-to-executives/) · [`rewrite-for-clarity`](library/software-engineering/writing/rewrite-for-clarity/) · [`write-rfc`](library/software-engineering/writing/write-rfc/) |
| Coding-agent operations | 3 | [`write-agent-handoff`](library/software-engineering/meta/write-agent-handoff/) · [`write-agents-md`](library/software-engineering/meta/write-agents-md/) · [`write-subagent-brief`](library/software-engineering/meta/write-subagent-brief/) |

</details>

<details><summary><b>Learning and education</b> · 26</summary>

| Category | Entries | Try |
|---|---:|---|
| Teaching | 7 | [`create-rubric`](library/education/teaching/create-rubric/) · [`design-classroom-activity`](library/education/teaching/design-classroom-activity/) · [`differentiate-lesson`](library/education/teaching/differentiate-lesson/) |
| Tutoring | 6 | [`check-my-reasoning`](library/education/tutoring/check-my-reasoning/) · [`explain-concept-at-level`](library/education/tutoring/explain-concept-at-level/) · [`give-essay-feedback`](library/education/tutoring/give-essay-feedback/) |
| Studying | 5 | [`create-memory-aids`](library/education/studying/create-memory-aids/) · [`create-study-plan`](library/education/studying/create-study-plan/) · [`make-flashcards`](library/education/studying/make-flashcards/) |
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

<details><summary><b>Content creation</b> · 25</summary>

| Category | Entries | Try |
|---|---:|---|
| Video | 7 | [`package-video-title-thumbnail`](library/content-creation/video/package-video-title-thumbnail/) · [`plan-livestream-run-of-show`](library/content-creation/video/plan-livestream-run-of-show/) · [`write-short-form-script`](library/content-creation/video/write-short-form-script/) |
| Social media | 5 | [`reply-to-comments`](library/content-creation/social-media/reply-to-comments/) · [`repurpose-video-into-posts`](library/content-creation/social-media/repurpose-video-into-posts/) · [`turn-article-into-thread`](library/content-creation/social-media/turn-article-into-thread/) |
| Content strategy | 4 | [`analyze-content-performance`](library/content-creation/content-strategy/analyze-content-performance/) · [`define-content-pillars`](library/content-creation/content-strategy/define-content-pillars/) · [`plan-content-calendar`](library/content-creation/content-strategy/plan-content-calendar/) |
| Podcasting | 4 | [`plan-podcast-episode`](library/content-creation/podcasting/plan-podcast-episode/) · [`write-guest-interview-questions`](library/content-creation/podcasting/write-guest-interview-questions/) · [`write-podcast-guest-pitch`](library/content-creation/podcasting/write-podcast-guest-pitch/) |
| Blogging | 3 | [`generate-blog-post-ideas`](library/content-creation/blogging/generate-blog-post-ideas/) · [`write-blog-post-draft`](library/content-creation/blogging/write-blog-post-draft/) · [`blog-post-track`](library/content-creation/blogging/blog-post-track/) |
| Newsletters | 2 | [`curate-link-roundup`](library/content-creation/newsletters/curate-link-roundup/) · [`write-newsletter-issue`](library/content-creation/newsletters/write-newsletter-issue/) |

</details>

<details><summary><b>Marketing and sales</b> · 30</summary>

| Category | Entries | Try |
|---|---:|---|
| Copywriting | 7 | [`critique-marketing-copy`](library/marketing-sales/copywriting/critique-marketing-copy/) · [`write-case-study`](library/marketing-sales/copywriting/write-case-study/) · [`write-headline-variations`](library/marketing-sales/copywriting/write-headline-variations/) |
| Sales | 7 | [`handle-sales-objections`](library/marketing-sales/sales/handle-sales-objections/) · [`prepare-discovery-call`](library/marketing-sales/sales/prepare-discovery-call/) · [`summarize-sales-call`](library/marketing-sales/sales/summarize-sales-call/) |
| Marketing strategy | 6 | [`analyze-competitors`](library/marketing-sales/marketing-strategy/analyze-competitors/) · [`build-ideal-customer-profile`](library/marketing-sales/marketing-strategy/build-ideal-customer-profile/) · [`create-lead-magnet`](library/marketing-sales/marketing-strategy/create-lead-magnet/) |
| Advertising | 4 | [`analyze-ad-performance`](library/marketing-sales/advertising/analyze-ad-performance/) · [`write-creator-brief`](library/marketing-sales/advertising/write-creator-brief/) · [`write-google-ads`](library/marketing-sales/advertising/write-google-ads/) |
| SEO | 4 | [`audit-on-page-seo`](library/marketing-sales/seo/audit-on-page-seo/) · [`research-keywords`](library/marketing-sales/seo/research-keywords/) · [`write-meta-tags`](library/marketing-sales/seo/write-meta-tags/) |
| Email marketing | 2 | [`write-email-sequence`](library/marketing-sales/email-marketing/write-email-sequence/) · [`write-promo-email`](library/marketing-sales/email-marketing/write-promo-email/) |

</details>

<details><summary><b>Product management</b> · 20</summary>

| Category | Entries | Try |
|---|---:|---|
| Product discovery | 4 | [`define-jobs-to-be-done`](library/product-management/product-discovery/define-jobs-to-be-done/) · [`map-opportunity-solution-tree`](library/product-management/product-discovery/map-opportunity-solution-tree/) · [`synthesize-customer-interviews`](library/product-management/product-discovery/synthesize-customer-interviews/) |
| Product launch | 4 | [`plan-product-launch`](library/product-management/product-launch/plan-product-launch/) · [`write-launch-announcement`](library/product-management/product-launch/write-launch-announcement/) · [`write-sales-enablement-brief`](library/product-management/product-launch/write-sales-enablement-brief/) |
| Product metrics | 4 | [`define-north-star-metric`](library/product-management/product-metrics/define-north-star-metric/) · [`design-ab-test`](library/product-management/product-metrics/design-ab-test/) · [`diagnose-metric-drop`](library/product-management/product-metrics/diagnose-metric-drop/) |
| Product strategy | 3 | [`define-mvp-scope`](library/product-management/product-strategy/define-mvp-scope/) · [`run-product-teardown`](library/product-management/product-strategy/run-product-teardown/) · [`write-product-strategy`](library/product-management/product-strategy/write-product-strategy/) |
| Roadmapping | 3 | [`build-outcome-roadmap`](library/product-management/roadmapping/build-outcome-roadmap/) · [`prioritize-features`](library/product-management/roadmapping/prioritize-features/) · [`write-roadmap-update`](library/product-management/roadmapping/write-roadmap-update/) |
| User feedback | 2 | [`analyze-user-feedback`](library/product-management/user-feedback/analyze-user-feedback/) · [`plan-beta-program`](library/product-management/user-feedback/plan-beta-program/) |

</details>

<details><summary><b>Business and strategy</b> · 25</summary>

| Category | Entries | Try |
|---|---:|---|
| Business strategy | 6 | [`analyze-business-model`](library/business/business-strategy/analyze-business-model/) · [`design-pricing`](library/business/business-strategy/design-pricing/) · [`estimate-market-size`](library/business/business-strategy/estimate-market-size/) |
| Customer support | 5 | [`analyze-support-tickets`](library/business/customer-support/analyze-support-tickets/) · [`build-support-macros`](library/business/customer-support/build-support-macros/) · [`write-help-center-article`](library/business/customer-support/write-help-center-article/) |
| Entrepreneurship | 5 | [`find-first-customers`](library/business/entrepreneurship/find-first-customers/) · [`model-unit-economics`](library/business/entrepreneurship/model-unit-economics/) · [`validate-business-idea`](library/business/entrepreneurship/validate-business-idea/) |
| Operations | 5 | [`automate-business-workflow`](library/business/operations/automate-business-workflow/) · [`compare-vendors`](library/business/operations/compare-vendors/) · [`map-business-process`](library/business/operations/map-business-process/) |
| Fundraising | 4 | [`prepare-investor-qa`](library/business/fundraising/prepare-investor-qa/) · [`write-grant-application`](library/business/fundraising/write-grant-application/) · [`write-investor-update`](library/business/fundraising/write-investor-update/) |

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

<details><summary><b>Design</b> · 19</summary>

| Category | Entries | Try |
|---|---:|---|
| UI design | 5 | [`create-wireframe-spec`](library/design/ui-design/create-wireframe-spec/) · [`critique-ui-screen`](library/design/ui-design/critique-ui-screen/) · [`design-onboarding-flow`](library/design/ui-design/design-onboarding-flow/) |
| UX research | 5 | [`build-user-journey-map`](library/design/ux-research/build-user-journey-map/) · [`run-heuristic-evaluation`](library/design/ux-research/run-heuristic-evaluation/) · [`synthesize-usability-findings`](library/design/ux-research/synthesize-usability-findings/) |
| Graphic design | 4 | [`create-color-palette`](library/design/graphic-design/create-color-palette/) · [`critique-graphic-design`](library/design/graphic-design/critique-graphic-design/) · [`pair-typefaces`](library/design/graphic-design/pair-typefaces/) |
| Design systems | 3 | [`audit-design-consistency`](library/design/design-systems/audit-design-consistency/) · [`define-design-tokens`](library/design/design-systems/define-design-tokens/) · [`write-component-spec`](library/design/design-systems/write-component-spec/) |
| Branding | 2 | [`name-brand`](library/design/branding/name-brand/) · [`write-brand-voice-guide`](library/design/branding/write-brand-voice-guide/) |

</details>

<details><summary><b>Creative arts</b> · 21</summary>

| Category | Entries | Try |
|---|---:|---|
| Fiction | 9 | [`check-story-continuity`](library/creative-arts/fiction/check-story-continuity/) · [`critique-fiction-draft`](library/creative-arts/fiction/critique-fiction-draft/) · [`develop-character`](library/creative-arts/fiction/develop-character/) |
| Image generation | 3 | [`build-image-style-guide`](library/creative-arts/image-generation/build-image-style-guide/) · [`create-storyboard`](library/creative-arts/image-generation/create-storyboard/) · [`write-image-prompt`](library/creative-arts/image-generation/write-image-prompt/) |
| Music | 3 | [`suggest-chord-progressions`](library/creative-arts/music/suggest-chord-progressions/) · [`write-music-prompt`](library/creative-arts/music/write-music-prompt/) · [`write-song-lyrics`](library/creative-arts/music/write-song-lyrics/) |
| Poetry | 2 | [`critique-poem`](library/creative-arts/poetry/critique-poem/) · [`write-poem-in-form`](library/creative-arts/poetry/write-poem-in-form/) |
| Screenwriting | 2 | [`format-screenplay-scene`](library/creative-arts/screenwriting/format-screenplay-scene/) · [`write-logline-and-synopsis`](library/creative-arts/screenwriting/write-logline-and-synopsis/) |
| Worldbuilding | 2 | [`build-magic-system`](library/creative-arts/worldbuilding/build-magic-system/) · [`design-fictional-culture`](library/creative-arts/worldbuilding/design-fictional-culture/) |

</details>

<details><summary><b>Writing and communication</b> · 25</summary>

| Category | Entries | Try |
|---|---:|---|
| Editing | 6 | [`proofread-text`](library/writing-communication/editing/proofread-text/) · [`rewrite-for-tone`](library/writing-communication/editing/rewrite-for-tone/) · [`simplify-to-plain-language`](library/writing-communication/editing/simplify-to-plain-language/) |
| Interpersonal communication | 5 | [`apologize-effectively`](library/writing-communication/interpersonal-communication/apologize-effectively/) · [`give-feedback-sbi`](library/writing-communication/interpersonal-communication/give-feedback-sbi/) · [`mediate-disagreement`](library/writing-communication/interpersonal-communication/mediate-disagreement/) |
| Business writing | 4 | [`write-executive-summary`](library/writing-communication/business-writing/write-executive-summary/) · [`write-internal-announcement`](library/writing-communication/business-writing/write-internal-announcement/) · [`write-project-proposal`](library/writing-communication/business-writing/write-project-proposal/) |
| Email | 4 | [`decline-request-gracefully`](library/writing-communication/email/decline-request-gracefully/) · [`reply-to-email`](library/writing-communication/email/reply-to-email/) · [`triage-inbox`](library/writing-communication/email/triage-inbox/) |
| Presentations | 3 | [`critique-slide-deck`](library/writing-communication/presentations/critique-slide-deck/) · [`outline-presentation`](library/writing-communication/presentations/outline-presentation/) · [`write-speaker-notes`](library/writing-communication/presentations/write-speaker-notes/) |
| Public speaking | 3 | [`prepare-for-tough-questions`](library/writing-communication/public-speaking/prepare-for-tough-questions/) · [`write-speech`](library/writing-communication/public-speaking/write-speech/) · [`speaking-coach`](library/writing-communication/public-speaking/speaking-coach/) |

</details>

<details><summary><b>Career and HR</b> · 25</summary>

| Category | Entries | Try |
|---|---:|---|
| Career growth | 5 | [`negotiate-job-offer`](library/career-hr/career-growth/negotiate-job-offer/) · [`plan-career-path`](library/career-hr/career-growth/plan-career-path/) · [`prepare-promotion-case`](library/career-hr/career-growth/prepare-promotion-case/) |
| Interview preparation | 5 | [`practice-coding-interview`](library/career-hr/interview-prep/practice-coding-interview/) · [`prepare-questions-for-interviewer`](library/career-hr/interview-prep/prepare-questions-for-interviewer/) · [`prepare-star-stories`](library/career-hr/interview-prep/prepare-star-stories/) |
| Job search | 5 | [`analyze-job-posting`](library/career-hr/job-search/analyze-job-posting/) · [`plan-job-search`](library/career-hr/job-search/plan-job-search/) · [`write-cover-letter`](library/career-hr/job-search/write-cover-letter/) |
| Résumés | 5 | [`optimize-linkedin-profile`](library/career-hr/resumes/optimize-linkedin-profile/) · [`reframe-for-career-change`](library/career-hr/resumes/reframe-for-career-change/) · [`review-resume`](library/career-hr/resumes/review-resume/) |
| People management | 3 | [`plan-new-hire-onboarding`](library/career-hr/people-management/plan-new-hire-onboarding/) · [`plan-one-on-one`](library/career-hr/people-management/plan-one-on-one/) · [`write-performance-review`](library/career-hr/people-management/write-performance-review/) |
| Hiring | 2 | [`design-interview-loop`](library/career-hr/hiring/design-interview-loop/) · [`write-job-description`](library/career-hr/hiring/write-job-description/) |

</details>

<details><summary><b>Finance</b> · 15</summary>

| Category | Entries | Try |
|---|---:|---|
| Budgeting | 4 | [`build-monthly-budget`](library/finance/budgeting/build-monthly-budget/) · [`categorize-expenses`](library/finance/budgeting/categorize-expenses/) · [`plan-savings-goal`](library/finance/budgeting/plan-savings-goal/) |
| Accounting | 3 | [`forecast-cash-flow`](library/finance/accounting/forecast-cash-flow/) · [`prepare-month-end-close`](library/finance/accounting/prepare-month-end-close/) · [`set-up-chart-of-accounts`](library/finance/accounting/set-up-chart-of-accounts/) |
| Financial planning | 3 | [`compare-rent-vs-buy`](library/finance/financial-planning/compare-rent-vs-buy/) · [`plan-debt-payoff`](library/finance/financial-planning/plan-debt-payoff/) · [`plan-retirement-scenarios`](library/finance/financial-planning/plan-retirement-scenarios/) |
| Taxes | 3 | [`explain-tax-notice`](library/finance/taxes/explain-tax-notice/) · [`organize-tax-documents`](library/finance/taxes/organize-tax-documents/) · [`plan-freelance-tax-set-aside`](library/finance/taxes/plan-freelance-tax-set-aside/) |
| Investing (education) | 2 | [`explain-investment-concept`](library/finance/investing/explain-investment-concept/) · [`read-company-financials`](library/finance/investing/read-company-financials/) |

</details>

<details><summary><b>Legal and admin</b> · 10</summary>

| Category | Entries | Try |
|---|---:|---|
| Compliance | 2 | [`build-compliance-checklist`](library/legal-admin/compliance/build-compliance-checklist/) · [`map-personal-data-processing`](library/legal-admin/compliance/map-personal-data-processing/) |
| Contracts | 2 | [`draft-simple-agreement`](library/legal-admin/contracts/draft-simple-agreement/) · [`summarize-contract`](library/legal-admin/contracts/summarize-contract/) |
| Legal correspondence | 2 | [`explain-legal-letter`](library/legal-admin/legal-correspondence/explain-legal-letter/) · [`write-complaint-letter`](library/legal-admin/legal-correspondence/write-complaint-letter/) |
| Paperwork | 2 | [`prepare-government-form`](library/legal-admin/paperwork/prepare-government-form/) · [`prepare-small-claims-case`](library/legal-admin/paperwork/prepare-small-claims-case/) |
| Policies and terms | 2 | [`write-privacy-policy`](library/legal-admin/policies/write-privacy-policy/) · [`write-workplace-policy`](library/legal-admin/policies/write-workplace-policy/) |

</details>

<details><summary><b>Health and wellbeing</b> · 15</summary>

| Category | Entries | Try |
|---|---:|---|
| Mental health | 5 | [`build-coping-plan`](library/health-wellbeing/mental-health/build-coping-plan/) · [`guided-journaling`](library/health-wellbeing/mental-health/guided-journaling/) · [`prepare-for-therapy`](library/health-wellbeing/mental-health/prepare-for-therapy/) |
| Medical visit preparation | 4 | [`build-symptom-log`](library/health-wellbeing/medical-prep/build-symptom-log/) · [`explain-diagnosis`](library/health-wellbeing/medical-prep/explain-diagnosis/) · [`explain-lab-results`](library/health-wellbeing/medical-prep/explain-lab-results/) |
| Fitness | 3 | [`build-training-plan`](library/health-wellbeing/fitness/build-training-plan/) · [`check-exercise-form`](library/health-wellbeing/fitness/check-exercise-form/) · [`fitness-coach`](library/health-wellbeing/fitness/fitness-coach/) |
| Nutrition | 3 | [`analyze-diet-log`](library/health-wellbeing/nutrition/analyze-diet-log/) · [`plan-nutrition-targets`](library/health-wellbeing/nutrition/plan-nutrition-targets/) · [`read-nutrition-label`](library/health-wellbeing/nutrition/read-nutrition-label/) |

</details>

<details><summary><b>Cooking and home</b> · 13</summary>

| Category | Entries | Try |
|---|---:|---|
| Cooking | 6 | [`adapt-recipe`](library/home-cooking/cooking/adapt-recipe/) · [`plan-dinner-party-menu`](library/home-cooking/cooking/plan-dinner-party-menu/) · [`recipe-from-ingredients`](library/home-cooking/cooking/recipe-from-ingredients/) |
| Home improvement | 3 | [`diagnose-home-problem`](library/home-cooking/home-improvement/diagnose-home-problem/) · [`plan-decluttering`](library/home-cooking/home-improvement/plan-decluttering/) · [`plan-diy-project`](library/home-cooking/home-improvement/plan-diy-project/) |
| Gardening | 2 | [`diagnose-plant-problem`](library/home-cooking/gardening/diagnose-plant-problem/) · [`plan-vegetable-garden`](library/home-cooking/gardening/plan-vegetable-garden/) |
| Meal planning | 2 | [`plan-meal-prep-session`](library/home-cooking/meal-planning/plan-meal-prep-session/) · [`plan-weekly-meals`](library/home-cooking/meal-planning/plan-weekly-meals/) |

</details>

<details><summary><b>Travel</b> · 10</summary>

| Category | Entries | Try |
|---|---:|---|
| Travel logistics | 4 | [`build-packing-list`](library/travel/travel-logistics/build-packing-list/) · [`check-travel-requirements`](library/travel/travel-logistics/check-travel-requirements/) · [`handle-travel-disruption`](library/travel/travel-logistics/handle-travel-disruption/) |
| Trip planning | 4 | [`plan-group-trip`](library/travel/trip-planning/plan-group-trip/) · [`plan-itinerary`](library/travel/trip-planning/plan-itinerary/) · [`plan-road-trip`](library/travel/trip-planning/plan-road-trip/) |
| Local culture | 2 | [`learn-local-etiquette`](library/travel/local-culture/learn-local-etiquette/) · [`plan-food-exploration`](library/travel/local-culture/plan-food-exploration/) |

</details>

<details><summary><b>Parenting and family</b> · 10</summary>

| Category | Entries | Try |
|---|---:|---|
| Family logistics | 3 | [`coordinate-family-calendar`](library/parenting-family/family-logistics/coordinate-family-calendar/) · [`create-chore-chart`](library/parenting-family/family-logistics/create-chore-chart/) · [`prepare-for-new-baby`](library/parenting-family/family-logistics/prepare-for-new-baby/) |
| Parenting | 3 | [`explain-hard-topic-to-child`](library/parenting-family/parenting/explain-hard-topic-to-child/) · [`plan-behavior-approach`](library/parenting-family/parenting/plan-behavior-approach/) · [`parenting-coach`](library/parenting-family/parenting/parenting-coach/) |
| Kids' activities | 2 | [`plan-kids-party`](library/parenting-family/kids-activities/plan-kids-party/) · [`plan-rainy-day-activities`](library/parenting-family/kids-activities/plan-rainy-day-activities/) |
| Relationships | 2 | [`choose-meaningful-gift`](library/parenting-family/relationships/choose-meaningful-gift/) · [`plan-relationship-check-in`](library/parenting-family/relationships/plan-relationship-check-in/) |

</details>

<details><summary><b>Productivity and personal life</b> · 24</summary>

| Category | Entries | Try |
|---|---:|---|
| Decision-making | 4 | [`compare-options-matrix`](library/productivity/decision-making/compare-options-matrix/) · [`run-pre-mortem`](library/productivity/decision-making/run-pre-mortem/) · [`steelman-opposing-view`](library/productivity/decision-making/steelman-opposing-view/) |
| Meetings | 4 | [`prepare-for-meeting`](library/productivity/meetings/prepare-for-meeting/) · [`run-retrospective`](library/productivity/meetings/run-retrospective/) · [`summarize-meeting-transcript`](library/productivity/meetings/summarize-meeting-transcript/) |
| Note-taking | 4 | [`design-second-brain`](library/productivity/note-taking/design-second-brain/) · [`make-reading-notes`](library/productivity/note-taking/make-reading-notes/) · [`organize-digital-files`](library/productivity/note-taking/organize-digital-files/) |
| Task management | 4 | [`plan-my-week`](library/productivity/task-management/plan-my-week/) · [`prioritize-todo-list`](library/productivity/task-management/prioritize-todo-list/) · [`run-weekly-review`](library/productivity/task-management/run-weekly-review/) |
| Habits and goals | 3 | [`beat-procrastination`](library/productivity/habits/beat-procrastination/) · [`design-habit-plan`](library/productivity/habits/design-habit-plan/) · [`productivity-coach`](library/productivity/habits/productivity-coach/) |
| Summarisation | 3 | [`summarize-book`](library/productivity/summarization/summarize-book/) · [`summarize-email-thread`](library/productivity/summarization/summarize-email-thread/) · [`summarize-long-document`](library/productivity/summarization/summarize-long-document/) |
| Brainstorming | 2 | [`brainstorm-ideas`](library/productivity/brainstorming/brainstorm-ideas/) · [`run-six-thinking-hats`](library/productivity/brainstorming/run-six-thinking-hats/) |

</details>

<details><summary><b>Gaming and fun</b> · 10</summary>

| Category | Entries | Try |
|---|---:|---|
| Tabletop RPGs | 3 | [`balance-combat-encounter`](library/gaming-fun/tabletop-rpg/balance-combat-encounter/) · [`design-one-shot-adventure`](library/gaming-fun/tabletop-rpg/design-one-shot-adventure/) · [`dungeon-master`](library/gaming-fun/tabletop-rpg/dungeon-master/) |
| Video games | 3 | [`design-game-mechanic`](library/gaming-fun/video-games/design-game-mechanic/) · [`plan-game-strategy`](library/gaming-fun/video-games/plan-game-strategy/) · [`play-text-adventure`](library/gaming-fun/video-games/play-text-adventure/) |
| Puzzles | 2 | [`create-escape-room-puzzles`](library/gaming-fun/puzzles/create-escape-room-puzzles/) · [`make-logic-puzzle`](library/gaming-fun/puzzles/make-logic-puzzle/) |
| Humour | 1 | [`write-comedy-bit`](library/gaming-fun/humor/write-comedy-bit/) |
| Trivia and quizzes | 1 | [`host-trivia-night`](library/gaming-fun/trivia/host-trivia-night/) |

</details>

<details><summary><b>Prompting and assistants</b> · 17</summary>

| Category | Entries | Try |
|---|---:|---|
| Output styles | 8 | [`beginner-friendly`](library/prompting/output-styles/beginner-friendly/) · [`concise`](library/prompting/output-styles/concise/) · [`diff-only`](library/prompting/output-styles/diff-only/) |
| Prompt engineering | 6 | [`compress-prompt`](library/prompting/prompt-engineering/compress-prompt/) · [`create-few-shot-examples`](library/prompting/prompt-engineering/create-few-shot-examples/) · [`diagnose-prompt-failures`](library/prompting/prompt-engineering/diagnose-prompt-failures/) |
| Assistant setup | 3 | [`build-project-instructions`](library/prompting/assistant-setup/build-project-instructions/) · [`write-custom-instructions`](library/prompting/assistant-setup/write-custom-instructions/) · [`candid-feedback-rules`](library/prompting/assistant-setup/candid-feedback-rules/) |

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
