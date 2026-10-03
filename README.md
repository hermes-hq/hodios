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

> **Status: catalog `2026.1002.2`.** 1,070 entries are live through the Claude Code marketplace and Agent Skills installers below. The `hodios` CLI is not on npm yet; until it is, run it from a checkout (see [Use the CLI](#use-the-cli)).

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

Claude Code installs a whole domain at a time: `hodios-software-engineering`, `hodios-education`, `hodios-travel` and so on, one plugin per domain. Then call an entry as `/hodios-software-engineering:review-pull-request`, or let Claude pick the subagents (`hodios-software-engineering:security-auditor`). For `npx skills`, `-a` takes `claude-code`, `codex`, `cursor`, `github-copilot`, `opencode`, `gemini-cli` and more; `--skill '*'` installs all 1,070.

### Use the CLI

The CLI searches the catalog, ranks what fits your project and writes each tool's native files (rules and personas included, which the installers above do not cover). Run it with npx, or install it once to get the `hodios` command:

```sh
npx @hermes-hq/hodios install review-pull-request --target claude-code
npm install -g @hermes-hq/hodios                 # then use `hodios` directly

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

In a project folder, `npx @hermes-hq/hodios search` with no query does this on your machine: it reads the project's manifests and agent config folders, ranks what fits first and says why ("your project uses React"). Nothing is sent anywhere, and `--all` turns it off.

<!-- catalog:start -->
**1070 entries** (914 prompts, 94 personas, 29 workflows, 20 rules, 13 styles).

<details><summary><b>Software engineering</b> · 215</summary>

| Category | Entries | Try |
|---|---:|---|
| Implementation | 18 | [`add-feature-flag`](library/software-engineering/implementation/add-feature-flag/) · [`add-rate-limiting`](library/software-engineering/implementation/add-rate-limiting/) · [`build-rest-endpoint`](library/software-engineering/implementation/build-rest-endpoint/) |
| AI and ML engineering | 13 | [`build-mcp-server`](library/software-engineering/ai-ml/build-mcp-server/) · [`build-structured-extraction`](library/software-engineering/ai-ml/build-structured-extraction/) · [`choose-ml-approach`](library/software-engineering/ai-ml/choose-ml-approach/) |
| Security | 13 | [`audit-dependencies`](library/software-engineering/security/audit-dependencies/) · [`harden-web-app-config`](library/software-engineering/security/harden-web-app-config/) · [`respond-to-leaked-secret`](library/software-engineering/security/respond-to-leaked-secret/) |
| Data engineering | 12 | [`design-data-pipeline`](library/software-engineering/data/design-data-pipeline/) · [`design-database-schema`](library/software-engineering/data/design-database-schema/) · [`design-star-schema`](library/software-engineering/data/design-star-schema/) |
| DevOps | 12 | [`design-deployment-strategy`](library/software-engineering/devops/design-deployment-strategy/) · [`plan-disaster-recovery`](library/software-engineering/devops/plan-disaster-recovery/) · [`reduce-cloud-spend`](library/software-engineering/devops/reduce-cloud-spend/) |
| Testing | 12 | [`add-characterization-tests`](library/software-engineering/testing/add-characterization-tests/) · [`add-regression-test`](library/software-engineering/testing/add-regression-test/) · [`fill-test-gaps`](library/software-engineering/testing/fill-test-gaps/) |
| Architecture | 11 | [`compare-design-options`](library/software-engineering/architecture/compare-design-options/) · [`design-api-contract`](library/software-engineering/architecture/design-api-contract/) · [`design-event-driven-system`](library/software-engineering/architecture/design-event-driven-system/) |
| Documentation | 11 | [`audit-documentation`](library/software-engineering/docs/audit-documentation/) · [`document-public-api`](library/software-engineering/docs/document-public-api/) · [`write-changelog`](library/software-engineering/docs/write-changelog/) |
| Debugging | 10 | [`bisect-regression`](library/software-engineering/debugging/bisect-regression/) · [`debug-network-request`](library/software-engineering/debugging/debug-network-request/) · [`debug-production-only-bug`](library/software-engineering/debugging/debug-production-only-bug/) |
| Accessibility | 9 | [`audit-mobile-accessibility`](library/software-engineering/accessibility/audit-mobile-accessibility/) · [`audit-web-accessibility`](library/software-engineering/accessibility/audit-web-accessibility/) · [`build-aria-widget`](library/software-engineering/accessibility/build-aria-widget/) |
| Conventions | 9 | [`api-design-rules`](library/software-engineering/conventions/api-design-rules/) · [`csharp-style-rules`](library/software-engineering/conventions/csharp-style-rules/) · [`go-style-rules`](library/software-engineering/conventions/go-style-rules/) |
| Git and version control | 9 | [`choose-branching-strategy`](library/software-engineering/git/choose-branching-strategy/) · [`clean-up-commit-history`](library/software-engineering/git/clean-up-commit-history/) · [`purge-file-from-git-history`](library/software-engineering/git/purge-file-from-git-history/) |
| Incident and operations | 9 | [`build-incident-timeline`](library/software-engineering/incident/build-incident-timeline/) · [`define-slos`](library/software-engineering/incident/define-slos/) · [`instrument-service-observability`](library/software-engineering/incident/instrument-service-observability/) |
| Performance | 9 | [`find-memory-leak`](library/software-engineering/performance/find-memory-leak/) · [`fix-n-plus-one-queries`](library/software-engineering/performance/fix-n-plus-one-queries/) · [`improve-web-vitals`](library/software-engineering/performance/improve-web-vitals/) |
| Code review | 8 | [`respond-to-review-comments`](library/software-engineering/code-review/respond-to-review-comments/) · [`review-diff-for-risks`](library/software-engineering/code-review/review-diff-for-risks/) · [`review-error-handling`](library/software-engineering/code-review/review-error-handling/) |
| Learning to code | 7 | [`create-coding-exercises`](library/software-engineering/learning/create-coding-exercises/) · [`explain-codebase`](library/software-engineering/learning/explain-codebase/) · [`explain-concept-with-code`](library/software-engineering/learning/explain-concept-with-code/) |
| Localization (software) | 7 | [`build-localization-glossary`](library/software-engineering/localization/build-localization-glossary/) · [`extract-ui-strings`](library/software-engineering/localization/extract-ui-strings/) · [`plan-rtl-support`](library/software-engineering/localization/plan-rtl-support/) |
| Migration | 7 | [`migrate-api-version`](library/software-engineering/migration/migrate-api-version/) · [`migrate-database-engine`](library/software-engineering/migration/migrate-database-engine/) · [`migrate-javascript-to-typescript`](library/software-engineering/migration/migrate-javascript-to-typescript/) |
| Planning | 7 | [`break-down-epic`](library/software-engineering/planning/break-down-epic/) · [`estimate-with-ranges`](library/software-engineering/planning/estimate-with-ranges/) · [`plan-spike`](library/software-engineering/planning/plan-spike/) |
| Refactoring | 7 | [`extract-module`](library/software-engineering/refactoring/extract-module/) · [`improve-naming`](library/software-engineering/refactoring/improve-naming/) · [`plan-large-refactor`](library/software-engineering/refactoring/plan-large-refactor/) |
| Product (engineering) | 6 | [`define-non-functional-requirements`](library/software-engineering/product/define-non-functional-requirements/) · [`refine-backlog-ticket`](library/software-engineering/product/refine-backlog-ticket/) · [`write-acceptance-criteria`](library/software-engineering/product/write-acceptance-criteria/) |
| Coding-agent operations | 5 | [`review-agent-transcript`](library/software-engineering/meta/review-agent-transcript/) · [`write-agent-handoff`](library/software-engineering/meta/write-agent-handoff/) · [`write-agent-skill`](library/software-engineering/meta/write-agent-skill/) |
| Developer writing | 4 | [`explain-tech-to-executives`](library/software-engineering/writing/explain-tech-to-executives/) · [`rewrite-for-clarity`](library/software-engineering/writing/rewrite-for-clarity/) · [`write-conference-talk-proposal`](library/software-engineering/writing/write-conference-talk-proposal/) |

</details>

<details><summary><b>Learning and education</b> · 51</summary>

| Category | Entries | Try |
|---|---:|---|
| Teaching | 14 | [`adapt-text-reading-level`](library/education/teaching/adapt-text-reading-level/) · [`create-rubric`](library/education/teaching/create-rubric/) · [`design-classroom-activity`](library/education/teaching/design-classroom-activity/) |
| Tutoring | 12 | [`check-my-reasoning`](library/education/tutoring/check-my-reasoning/) · [`explain-concept-at-level`](library/education/tutoring/explain-concept-at-level/) · [`explain-historical-event`](library/education/tutoring/explain-historical-event/) |
| Studying | 9 | [`analyze-exam-mistakes`](library/education/studying/analyze-exam-mistakes/) · [`build-concept-map`](library/education/studying/build-concept-map/) · [`create-memory-aids`](library/education/studying/create-memory-aids/) |
| Course design | 8 | [`build-self-study-curriculum`](library/education/course-design/build-self-study-curriculum/) · [`design-course-outline`](library/education/course-design/design-course-outline/) · [`design-elearning-module`](library/education/course-design/design-elearning-module/) |
| Exam preparation | 8 | [`generate-practice-exam`](library/education/exam-prep/generate-practice-exam/) · [`grade-practice-answers`](library/education/exam-prep/grade-practice-answers/) · [`prepare-certification-exam`](library/education/exam-prep/prepare-certification-exam/) |

</details>

<details><summary><b>Languages</b> · 40</summary>

| Category | Entries | Try |
|---|---:|---|
| Language learning | 20 | [`assess-language-level`](library/languages/language-learning/assess-language-level/) · [`build-vocabulary-list`](library/languages/language-learning/build-vocabulary-list/) · [`coach-pronunciation`](library/languages/language-learning/coach-pronunciation/) |
| Translation | 12 | [`adapt-regional-variant`](library/languages/translation/adapt-regional-variant/) · [`build-translation-glossary`](library/languages/translation/build-translation-glossary/) · [`interpret-conversation`](library/languages/translation/interpret-conversation/) |
| Conversation practice | 8 | [`practice-interview-in-language`](library/languages/conversation-practice/practice-interview-in-language/) · [`practice-opinion-debate`](library/languages/conversation-practice/practice-opinion-debate/) · [`practice-small-talk`](library/languages/conversation-practice/practice-small-talk/) |

</details>

<details><summary><b>Content creation</b> · 50</summary>

| Category | Entries | Try |
|---|---:|---|
| Video | 12 | [`analyze-video-retention`](library/content-creation/video/analyze-video-retention/) · [`create-paper-edit`](library/content-creation/video/create-paper-edit/) · [`package-video-title-thumbnail`](library/content-creation/video/package-video-title-thumbnail/) |
| Social media | 10 | [`handle-social-media-backlash`](library/content-creation/social-media/handle-social-media-backlash/) · [`plan-carousel-post`](library/content-creation/social-media/plan-carousel-post/) · [`reply-to-comments`](library/content-creation/social-media/reply-to-comments/) |
| Content strategy | 9 | [`analyze-content-performance`](library/content-creation/content-strategy/analyze-content-performance/) · [`audit-content-library`](library/content-creation/content-strategy/audit-content-library/) · [`define-content-pillars`](library/content-creation/content-strategy/define-content-pillars/) |
| Podcasting | 8 | [`launch-podcast`](library/content-creation/podcasting/launch-podcast/) · [`plan-podcast-episode`](library/content-creation/podcasting/plan-podcast-episode/) · [`write-guest-interview-questions`](library/content-creation/podcasting/write-guest-interview-questions/) |
| Blogging | 6 | [`generate-blog-post-ideas`](library/content-creation/blogging/generate-blog-post-ideas/) · [`refresh-old-blog-post`](library/content-creation/blogging/refresh-old-blog-post/) · [`write-blog-post-draft`](library/content-creation/blogging/write-blog-post-draft/) |
| Newsletters | 5 | [`curate-link-roundup`](library/content-creation/newsletters/curate-link-roundup/) · [`grow-newsletter`](library/content-creation/newsletters/grow-newsletter/) · [`plan-newsletter-format`](library/content-creation/newsletters/plan-newsletter-format/) |

</details>

<details><summary><b>Marketing and sales</b> · 55</summary>

| Category | Entries | Try |
|---|---:|---|
| Sales | 12 | [`build-sales-playbook`](library/marketing-sales/sales/build-sales-playbook/) · [`handle-sales-objections`](library/marketing-sales/sales/handle-sales-objections/) · [`prepare-deal-negotiation`](library/marketing-sales/sales/prepare-deal-negotiation/) |
| Copywriting | 11 | [`critique-marketing-copy`](library/marketing-sales/copywriting/critique-marketing-copy/) · [`write-about-page`](library/marketing-sales/copywriting/write-about-page/) · [`write-app-store-listing`](library/marketing-sales/copywriting/write-app-store-listing/) |
| Marketing strategy | 11 | [`analyze-competitors`](library/marketing-sales/marketing-strategy/analyze-competitors/) · [`build-ideal-customer-profile`](library/marketing-sales/marketing-strategy/build-ideal-customer-profile/) · [`create-lead-magnet`](library/marketing-sales/marketing-strategy/create-lead-magnet/) |
| SEO | 9 | [`audit-on-page-seo`](library/marketing-sales/seo/audit-on-page-seo/) · [`audit-technical-seo`](library/marketing-sales/seo/audit-technical-seo/) · [`optimize-for-ai-search`](library/marketing-sales/seo/optimize-for-ai-search/) |
| Advertising | 6 | [`analyze-ad-performance`](library/marketing-sales/advertising/analyze-ad-performance/) · [`define-ad-audiences`](library/marketing-sales/advertising/define-ad-audiences/) · [`write-creator-brief`](library/marketing-sales/advertising/write-creator-brief/) |
| Email marketing | 6 | [`audit-email-deliverability`](library/marketing-sales/email-marketing/audit-email-deliverability/) · [`write-abandoned-cart-emails`](library/marketing-sales/email-marketing/write-abandoned-cart-emails/) · [`write-email-sequence`](library/marketing-sales/email-marketing/write-email-sequence/) |

</details>

<details><summary><b>Product management</b> · 45</summary>

| Category | Entries | Try |
|---|---:|---|
| Product discovery | 10 | [`analyze-competitor-reviews`](library/product-management/product-discovery/analyze-competitor-reviews/) · [`define-jobs-to-be-done`](library/product-management/product-discovery/define-jobs-to-be-done/) · [`design-validation-experiment`](library/product-management/product-discovery/design-validation-experiment/) |
| Product launch | 8 | [`plan-price-change-communication`](library/product-management/product-launch/plan-price-change-communication/) · [`plan-product-launch`](library/product-management/product-launch/plan-product-launch/) · [`prepare-product-demo`](library/product-management/product-launch/prepare-product-demo/) |
| Product strategy | 8 | [`define-mvp-scope`](library/product-management/product-strategy/define-mvp-scope/) · [`evaluate-build-vs-buy`](library/product-management/product-strategy/evaluate-build-vs-buy/) · [`plan-feature-sunset`](library/product-management/product-strategy/plan-feature-sunset/) |
| Product metrics | 7 | [`analyze-conversion-funnel`](library/product-management/product-metrics/analyze-conversion-funnel/) · [`define-north-star-metric`](library/product-management/product-metrics/define-north-star-metric/) · [`design-ab-test`](library/product-management/product-metrics/design-ab-test/) |
| Roadmapping | 6 | [`build-outcome-roadmap`](library/product-management/roadmapping/build-outcome-roadmap/) · [`plan-release`](library/product-management/roadmapping/plan-release/) · [`prioritize-features`](library/product-management/roadmapping/prioritize-features/) |
| User feedback | 6 | [`analyze-cancellation-feedback`](library/product-management/user-feedback/analyze-cancellation-feedback/) · [`analyze-user-feedback`](library/product-management/user-feedback/analyze-user-feedback/) · [`close-feedback-loop`](library/product-management/user-feedback/close-feedback-loop/) |

</details>

<details><summary><b>Business and strategy</b> · 50</summary>

| Category | Entries | Try |
|---|---:|---|
| Customer support | 11 | [`analyze-support-tickets`](library/business/customer-support/analyze-support-tickets/) · [`build-support-macros`](library/business/customer-support/build-support-macros/) · [`build-support-qa-scorecard`](library/business/customer-support/build-support-qa-scorecard/) |
| Entrepreneurship | 11 | [`find-first-customers`](library/business/entrepreneurship/find-first-customers/) · [`model-unit-economics`](library/business/entrepreneurship/model-unit-economics/) · [`plan-online-store`](library/business/entrepreneurship/plan-online-store/) |
| Fundraising | 10 | [`build-investor-pipeline`](library/business/fundraising/build-investor-pipeline/) · [`explain-term-sheet`](library/business/fundraising/explain-term-sheet/) · [`prepare-board-meeting`](library/business/fundraising/prepare-board-meeting/) |
| Business strategy | 9 | [`analyze-business-model`](library/business/business-strategy/analyze-business-model/) · [`build-annual-operating-plan`](library/business/business-strategy/build-annual-operating-plan/) · [`design-pricing`](library/business/business-strategy/design-pricing/) |
| Operations | 9 | [`automate-business-workflow`](library/business/operations/automate-business-workflow/) · [`build-staff-schedule`](library/business/operations/build-staff-schedule/) · [`compare-vendors`](library/business/operations/compare-vendors/) |

</details>

<details><summary><b>Data analysis</b> · 57</summary>

| Category | Entries | Try |
|---|---:|---|
| Data exploration | 18 | [`analyze-survey-results`](library/data-analysis/data-exploration/analyze-survey-results/) · [`analyze-web-analytics`](library/data-analysis/data-exploration/analyze-web-analytics/) · [`answer-question-with-sql`](library/data-analysis/data-exploration/answer-question-with-sql/) |
| Spreadsheets | 13 | [`audit-spreadsheet-model`](library/data-analysis/spreadsheets/audit-spreadsheet-model/) · [`build-pivot-analysis`](library/data-analysis/spreadsheets/build-pivot-analysis/) · [`build-tracker-spreadsheet`](library/data-analysis/spreadsheets/build-tracker-spreadsheet/) |
| Statistics | 10 | [`analyze-ab-test-results`](library/data-analysis/statistics/analyze-ab-test-results/) · [`calculate-sample-size`](library/data-analysis/statistics/calculate-sample-size/) · [`check-analysis-for-pitfalls`](library/data-analysis/statistics/check-analysis-for-pitfalls/) |
| Data visualisation | 8 | [`choose-chart-colors`](library/data-analysis/data-visualization/choose-chart-colors/) · [`choose-chart-type`](library/data-analysis/data-visualization/choose-chart-type/) · [`critique-chart`](library/data-analysis/data-visualization/critique-chart/) |
| Reporting | 8 | [`build-kpi-tree`](library/data-analysis/reporting/build-kpi-tree/) · [`define-metric`](library/data-analysis/reporting/define-metric/) · [`explain-budget-variance`](library/data-analysis/reporting/explain-budget-variance/) |

</details>

<details><summary><b>Research and science</b> · 43</summary>

| Category | Entries | Try |
|---|---:|---|
| Scientific writing | 13 | [`design-research-poster`](library/research-science/scientific-writing/design-research-poster/) · [`explain-research-to-public`](library/research-science/scientific-writing/explain-research-to-public/) · [`format-citations`](library/research-science/scientific-writing/format-citations/) |
| Research methods | 10 | [`build-qualitative-codebook`](library/research-science/research-methods/build-qualitative-codebook/) · [`design-research-study`](library/research-science/research-methods/design-research-study/) · [`run-thematic-analysis`](library/research-science/research-methods/run-thematic-analysis/) |
| Literature review | 9 | [`appraise-study-quality`](library/research-science/literature-review/appraise-study-quality/) · [`build-literature-matrix`](library/research-science/literature-review/build-literature-matrix/) · [`build-search-string`](library/research-science/literature-review/build-search-string/) |
| Fact-checking | 8 | [`check-health-claim`](library/research-science/fact-checking/check-health-claim/) · [`check-statistics-in-article`](library/research-science/fact-checking/check-statistics-in-article/) · [`evaluate-source-credibility`](library/research-science/fact-checking/evaluate-source-credibility/) |
| Peer review | 3 | [`check-manuscript-reporting`](library/research-science/peer-review/check-manuscript-reporting/) · [`review-grant-proposal`](library/research-science/peer-review/review-grant-proposal/) · [`write-peer-review`](library/research-science/peer-review/write-peer-review/) |

</details>

<details><summary><b>Design</b> · 44</summary>

| Category | Entries | Try |
|---|---:|---|
| UI design | 11 | [`adapt-design-for-mobile`](library/design/ui-design/adapt-design-for-mobile/) · [`create-wireframe-spec`](library/design/ui-design/create-wireframe-spec/) · [`critique-ui-screen`](library/design/ui-design/critique-ui-screen/) |
| UX research | 10 | [`build-user-journey-map`](library/design/ux-research/build-user-journey-map/) · [`build-user-personas`](library/design/ux-research/build-user-personas/) · [`design-diary-study`](library/design/ux-research/design-diary-study/) |
| Branding | 9 | [`build-brand-guidelines`](library/design/branding/build-brand-guidelines/) · [`build-brand-platform`](library/design/branding/build-brand-platform/) · [`design-logo-concepts`](library/design/branding/design-logo-concepts/) |
| Graphic design | 8 | [`create-color-palette`](library/design/graphic-design/create-color-palette/) · [`critique-graphic-design`](library/design/graphic-design/critique-graphic-design/) · [`design-infographic`](library/design/graphic-design/design-infographic/) |
| Design systems | 6 | [`audit-design-consistency`](library/design/design-systems/audit-design-consistency/) · [`define-design-tokens`](library/design/design-systems/define-design-tokens/) · [`define-iconography`](library/design/design-systems/define-iconography/) |

</details>

<details><summary><b>Creative arts</b> · 46</summary>

| Category | Entries | Try |
|---|---:|---|
| Fiction | 14 | [`check-story-continuity`](library/creative-arts/fiction/check-story-continuity/) · [`critique-fiction-draft`](library/creative-arts/fiction/critique-fiction-draft/) · [`design-plot-twist`](library/creative-arts/fiction/design-plot-twist/) |
| Music | 9 | [`analyze-song-structure`](library/creative-arts/music/analyze-song-structure/) · [`plan-instrument-practice`](library/creative-arts/music/plan-instrument-practice/) · [`plan-music-release`](library/creative-arts/music/plan-music-release/) |
| Screenwriting | 7 | [`adapt-story-for-screen`](library/creative-arts/screenwriting/adapt-story-for-screen/) · [`format-screenplay-scene`](library/creative-arts/screenwriting/format-screenplay-scene/) · [`write-beat-sheet`](library/creative-arts/screenwriting/write-beat-sheet/) |
| Image generation | 6 | [`build-image-style-guide`](library/creative-arts/image-generation/build-image-style-guide/) · [`create-storyboard`](library/creative-arts/image-generation/create-storyboard/) · [`write-image-edit-prompt`](library/creative-arts/image-generation/write-image-edit-prompt/) |
| Poetry | 5 | [`analyze-poem`](library/creative-arts/poetry/analyze-poem/) · [`critique-poem`](library/creative-arts/poetry/critique-poem/) · [`write-occasion-poem`](library/creative-arts/poetry/write-occasion-poem/) |
| Worldbuilding | 5 | [`build-magic-system`](library/creative-arts/worldbuilding/build-magic-system/) · [`build-series-bible`](library/creative-arts/worldbuilding/build-series-bible/) · [`build-world-timeline`](library/creative-arts/worldbuilding/build-world-timeline/) |

</details>

<details><summary><b>Writing and communication</b> · 50</summary>

| Category | Entries | Try |
|---|---:|---|
| Interpersonal communication | 11 | [`apologize-effectively`](library/writing-communication/interpersonal-communication/apologize-effectively/) · [`give-feedback-sbi`](library/writing-communication/interpersonal-communication/give-feedback-sbi/) · [`give-upward-feedback`](library/writing-communication/interpersonal-communication/give-upward-feedback/) |
| Editing | 10 | [`build-style-sheet`](library/writing-communication/editing/build-style-sheet/) · [`edit-for-structure`](library/writing-communication/editing/edit-for-structure/) · [`proofread-text`](library/writing-communication/editing/proofread-text/) |
| Business writing | 8 | [`write-decision-memo`](library/writing-communication/business-writing/write-decision-memo/) · [`write-executive-summary`](library/writing-communication/business-writing/write-executive-summary/) · [`write-handover-document`](library/writing-communication/business-writing/write-handover-document/) |
| Email | 8 | [`decline-request-gracefully`](library/writing-communication/email/decline-request-gracefully/) · [`reply-to-email`](library/writing-communication/email/reply-to-email/) · [`respond-to-angry-email`](library/writing-communication/email/respond-to-angry-email/) |
| Public speaking | 7 | [`moderate-panel`](library/writing-communication/public-speaking/moderate-panel/) · [`practice-impromptu-speaking`](library/writing-communication/public-speaking/practice-impromptu-speaking/) · [`prepare-for-tough-questions`](library/writing-communication/public-speaking/prepare-for-tough-questions/) |
| Presentations | 6 | [`critique-slide-deck`](library/writing-communication/presentations/critique-slide-deck/) · [`outline-presentation`](library/writing-communication/presentations/outline-presentation/) · [`turn-document-into-slides`](library/writing-communication/presentations/turn-document-into-slides/) |

</details>

<details><summary><b>Career and HR</b> · 50</summary>

| Category | Entries | Try |
|---|---:|---|
| Career growth | 10 | [`ask-for-raise`](library/career-hr/career-growth/ask-for-raise/) · [`negotiate-job-offer`](library/career-hr/career-growth/negotiate-job-offer/) · [`plan-career-path`](library/career-hr/career-growth/plan-career-path/) |
| Job search | 9 | [`analyze-job-posting`](library/career-hr/job-search/analyze-job-posting/) · [`evaluate-job-offer`](library/career-hr/job-search/evaluate-job-offer/) · [`plan-job-search`](library/career-hr/job-search/plan-job-search/) |
| Résumés | 9 | [`optimize-linkedin-profile`](library/career-hr/resumes/optimize-linkedin-profile/) · [`reframe-for-career-change`](library/career-hr/resumes/reframe-for-career-change/) · [`review-resume`](library/career-hr/resumes/review-resume/) |
| Interview preparation | 8 | [`debrief-interview`](library/career-hr/interview-prep/debrief-interview/) · [`practice-coding-interview`](library/career-hr/interview-prep/practice-coding-interview/) · [`prepare-case-interview`](library/career-hr/interview-prep/prepare-case-interview/) |
| Hiring | 7 | [`design-interview-loop`](library/career-hr/hiring/design-interview-loop/) · [`screen-resumes`](library/career-hr/hiring/screen-resumes/) · [`write-candidate-rejection`](library/career-hr/hiring/write-candidate-rejection/) |
| People management | 7 | [`delegate-task`](library/career-hr/people-management/delegate-task/) · [`plan-new-hire-onboarding`](library/career-hr/people-management/plan-new-hire-onboarding/) · [`plan-one-on-one`](library/career-hr/people-management/plan-one-on-one/) |

</details>

<details><summary><b>Finance</b> · 40</summary>

| Category | Entries | Try |
|---|---:|---|
| Financial planning | 11 | [`compare-loan-offers`](library/finance/financial-planning/compare-loan-offers/) · [`compare-rent-vs-buy`](library/finance/financial-planning/compare-rent-vs-buy/) · [`negotiate-with-creditor`](library/finance/financial-planning/negotiate-with-creditor/) |
| Accounting | 8 | [`calculate-product-margin`](library/finance/accounting/calculate-product-margin/) · [`chase-late-payment`](library/finance/accounting/chase-late-payment/) · [`forecast-cash-flow`](library/finance/accounting/forecast-cash-flow/) |
| Budgeting | 7 | [`build-monthly-budget`](library/finance/budgeting/build-monthly-budget/) · [`build-tight-budget`](library/finance/budgeting/build-tight-budget/) · [`categorize-expenses`](library/finance/budgeting/categorize-expenses/) |
| Investing (education) | 7 | [`check-portfolio-diversification`](library/finance/investing/check-portfolio-diversification/) · [`compare-retirement-accounts`](library/finance/investing/compare-retirement-accounts/) · [`explain-fund-document`](library/finance/investing/explain-fund-document/) |
| Taxes | 7 | [`explain-payslip`](library/finance/taxes/explain-payslip/) · [`explain-tax-notice`](library/finance/taxes/explain-tax-notice/) · [`explain-tax-on-investments`](library/finance/taxes/explain-tax-on-investments/) |

</details>

<details><summary><b>Legal and admin</b> · 35</summary>

| Category | Entries | Try |
|---|---:|---|
| Legal correspondence | 9 | [`appeal-insurance-denial`](library/legal-admin/legal-correspondence/appeal-insurance-denial/) · [`appeal-parking-ticket`](library/legal-admin/legal-correspondence/appeal-parking-ticket/) · [`demand-deposit-return`](library/legal-admin/legal-correspondence/demand-deposit-return/) |
| Compliance | 7 | [`assess-ai-act-obligations`](library/legal-admin/compliance/assess-ai-act-obligations/) · [`build-compliance-checklist`](library/legal-admin/compliance/build-compliance-checklist/) · [`check-email-marketing-compliance`](library/legal-admin/compliance/check-email-marketing-compliance/) |
| Contracts | 7 | [`compare-contract-versions`](library/legal-admin/contracts/compare-contract-versions/) · [`draft-simple-agreement`](library/legal-admin/contracts/draft-simple-agreement/) · [`explain-contract-clause`](library/legal-admin/contracts/explain-contract-clause/) |
| Paperwork | 6 | [`prepare-government-form`](library/legal-admin/paperwork/prepare-government-form/) · [`prepare-small-claims-case`](library/legal-admin/paperwork/prepare-small-claims-case/) · [`prepare-visa-application`](library/legal-admin/paperwork/prepare-visa-application/) |
| Policies and terms | 6 | [`write-ai-use-policy`](library/legal-admin/policies/write-ai-use-policy/) · [`write-employee-handbook`](library/legal-admin/policies/write-employee-handbook/) · [`write-privacy-policy`](library/legal-admin/policies/write-privacy-policy/) |

</details>

<details><summary><b>Health and wellbeing</b> · 40</summary>

| Category | Entries | Try |
|---|---:|---|
| Mental health | 13 | [`build-coping-plan`](library/health-wellbeing/mental-health/build-coping-plan/) · [`check-burnout-signs`](library/health-wellbeing/mental-health/check-burnout-signs/) · [`guide-breathing-exercise`](library/health-wellbeing/mental-health/guide-breathing-exercise/) |
| Medical visit preparation | 12 | [`build-medication-list`](library/health-wellbeing/medical-prep/build-medication-list/) · [`build-symptom-log`](library/health-wellbeing/medical-prep/build-symptom-log/) · [`explain-diagnosis`](library/health-wellbeing/medical-prep/explain-diagnosis/) |
| Fitness | 8 | [`build-training-plan`](library/health-wellbeing/fitness/build-training-plan/) · [`check-exercise-form`](library/health-wellbeing/fitness/check-exercise-form/) · [`design-mobility-routine`](library/health-wellbeing/fitness/design-mobility-routine/) |
| Nutrition | 7 | [`analyze-diet-log`](library/health-wellbeing/nutrition/analyze-diet-log/) · [`compare-diet-approaches`](library/health-wellbeing/nutrition/compare-diet-approaches/) · [`evaluate-supplement`](library/health-wellbeing/nutrition/evaluate-supplement/) |

</details>

<details><summary><b>Cooking and home</b> · 29</summary>

| Category | Entries | Try |
|---|---:|---|
| Cooking | 11 | [`adapt-recipe`](library/home-cooking/cooking/adapt-recipe/) · [`compile-family-cookbook`](library/home-cooking/cooking/compile-family-cookbook/) · [`pair-wine-with-food`](library/home-cooking/cooking/pair-wine-with-food/) |
| Home improvement | 9 | [`diagnose-home-problem`](library/home-cooking/home-improvement/diagnose-home-problem/) · [`hire-contractor`](library/home-cooking/home-improvement/hire-contractor/) · [`plan-cleaning-schedule`](library/home-cooking/home-improvement/plan-cleaning-schedule/) |
| Gardening | 5 | [`diagnose-plant-problem`](library/home-cooking/gardening/diagnose-plant-problem/) · [`plan-houseplant-care`](library/home-cooking/gardening/plan-houseplant-care/) · [`plan-vegetable-garden`](library/home-cooking/gardening/plan-vegetable-garden/) |
| Meal planning | 4 | [`plan-budget-meals`](library/home-cooking/meal-planning/plan-budget-meals/) · [`plan-meal-prep-session`](library/home-cooking/meal-planning/plan-meal-prep-session/) · [`plan-school-lunches`](library/home-cooking/meal-planning/plan-school-lunches/) |

</details>

<details><summary><b>Travel</b> · 19</summary>

| Category | Entries | Try |
|---|---:|---|
| Trip planning | 8 | [`choose-destination`](library/travel/trip-planning/choose-destination/) · [`plan-family-trip`](library/travel/trip-planning/plan-family-trip/) · [`plan-group-trip`](library/travel/trip-planning/plan-group-trip/) |
| Travel logistics | 7 | [`beat-jet-lag`](library/travel/travel-logistics/beat-jet-lag/) · [`build-packing-list`](library/travel/travel-logistics/build-packing-list/) · [`check-travel-requirements`](library/travel/travel-logistics/check-travel-requirements/) |
| Local culture | 4 | [`learn-destination-history`](library/travel/local-culture/learn-destination-history/) · [`learn-local-etiquette`](library/travel/local-culture/learn-local-etiquette/) · [`plan-food-exploration`](library/travel/local-culture/plan-food-exploration/) |

</details>

<details><summary><b>Parenting and family</b> · 23</summary>

| Category | Entries | Try |
|---|---:|---|
| Parenting | 8 | [`explain-hard-topic-to-child`](library/parenting-family/parenting/explain-hard-topic-to-child/) · [`help-with-homework`](library/parenting-family/parenting/help-with-homework/) · [`plan-behavior-approach`](library/parenting-family/parenting/plan-behavior-approach/) |
| Family logistics | 5 | [`coordinate-family-calendar`](library/parenting-family/family-logistics/coordinate-family-calendar/) · [`create-chore-chart`](library/parenting-family/family-logistics/create-chore-chart/) · [`prepare-for-new-baby`](library/parenting-family/family-logistics/prepare-for-new-baby/) |
| Kids' activities | 5 | [`design-kids-science-experiment`](library/parenting-family/kids-activities/design-kids-science-experiment/) · [`invent-learning-game`](library/parenting-family/kids-activities/invent-learning-game/) · [`plan-kids-party`](library/parenting-family/kids-activities/plan-kids-party/) |
| Relationships | 5 | [`choose-meaningful-gift`](library/parenting-family/relationships/choose-meaningful-gift/) · [`plan-date-night`](library/parenting-family/relationships/plan-date-night/) · [`plan-relationship-check-in`](library/parenting-family/relationships/plan-relationship-check-in/) |

</details>

<details><summary><b>Productivity and personal life</b> · 39</summary>

| Category | Entries | Try |
|---|---:|---|
| Task management | 8 | [`audit-time-use`](library/productivity/task-management/audit-time-use/) · [`break-down-big-task`](library/productivity/task-management/break-down-big-task/) · [`plan-my-week`](library/productivity/task-management/plan-my-week/) |
| Decision-making | 7 | [`compare-options-matrix`](library/productivity/decision-making/compare-options-matrix/) · [`compare-purchase-options`](library/productivity/decision-making/compare-purchase-options/) · [`make-life-decision`](library/productivity/decision-making/make-life-decision/) |
| Habits and goals | 6 | [`beat-procrastination`](library/productivity/habits/beat-procrastination/) · [`design-daily-routine`](library/productivity/habits/design-daily-routine/) · [`design-habit-plan`](library/productivity/habits/design-habit-plan/) |
| Meetings | 6 | [`prepare-for-meeting`](library/productivity/meetings/prepare-for-meeting/) · [`reduce-meeting-load`](library/productivity/meetings/reduce-meeting-load/) · [`run-retrospective`](library/productivity/meetings/run-retrospective/) |
| Summarisation | 5 | [`build-news-digest`](library/productivity/summarization/build-news-digest/) · [`compare-documents`](library/productivity/summarization/compare-documents/) · [`summarize-book`](library/productivity/summarization/summarize-book/) |
| Note-taking | 4 | [`design-second-brain`](library/productivity/note-taking/design-second-brain/) · [`make-reading-notes`](library/productivity/note-taking/make-reading-notes/) · [`organize-digital-files`](library/productivity/note-taking/organize-digital-files/) |
| Brainstorming | 3 | [`brainstorm-ideas`](library/productivity/brainstorming/brainstorm-ideas/) · [`facilitate-group-brainstorm`](library/productivity/brainstorming/facilitate-group-brainstorm/) · [`run-six-thinking-hats`](library/productivity/brainstorming/run-six-thinking-hats/) |

</details>

<details><summary><b>Gaming and fun</b> · 22</summary>

| Category | Entries | Try |
|---|---:|---|
| Tabletop RPGs | 6 | [`balance-combat-encounter`](library/gaming-fun/tabletop-rpg/balance-combat-encounter/) · [`build-rpg-character`](library/gaming-fun/tabletop-rpg/build-rpg-character/) · [`create-npc`](library/gaming-fun/tabletop-rpg/create-npc/) |
| Video games | 6 | [`design-game-level`](library/gaming-fun/video-games/design-game-level/) · [`design-game-mechanic`](library/gaming-fun/video-games/design-game-mechanic/) · [`plan-game-strategy`](library/gaming-fun/video-games/plan-game-strategy/) |
| Puzzles | 4 | [`create-escape-room-puzzles`](library/gaming-fun/puzzles/create-escape-room-puzzles/) · [`make-logic-puzzle`](library/gaming-fun/puzzles/make-logic-puzzle/) · [`write-crossword-clues`](library/gaming-fun/puzzles/write-crossword-clues/) |
| Humour | 3 | [`write-comedy-bit`](library/gaming-fun/humor/write-comedy-bit/) · [`write-parody-lyrics`](library/gaming-fun/humor/write-parody-lyrics/) · [`write-roast`](library/gaming-fun/humor/write-roast/) |
| Trivia and quizzes | 3 | [`host-trivia-night`](library/gaming-fun/trivia/host-trivia-night/) · [`plan-murder-mystery-party`](library/gaming-fun/trivia/plan-murder-mystery-party/) · [`quizmaster`](library/gaming-fun/trivia/quizmaster/) |

</details>

<details><summary><b>Prompting and assistants</b> · 27</summary>

| Category | Entries | Try |
|---|---:|---|
| Output styles | 13 | [`beginner-friendly`](library/prompting/output-styles/beginner-friendly/) · [`casual`](library/prompting/output-styles/casual/) · [`concise`](library/prompting/output-styles/concise/) |
| Prompt engineering | 10 | [`compress-prompt`](library/prompting/prompt-engineering/compress-prompt/) · [`create-few-shot-examples`](library/prompting/prompt-engineering/create-few-shot-examples/) · [`design-prompt-chain`](library/prompting/prompt-engineering/design-prompt-chain/) |
| Assistant setup | 4 | [`build-project-instructions`](library/prompting/assistant-setup/build-project-instructions/) · [`write-custom-instructions`](library/prompting/assistant-setup/write-custom-instructions/) · [`write-memory-profile`](library/prompting/assistant-setup/write-memory-profile/) |

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
