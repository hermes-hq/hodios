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

> **Status: catalog `2026.1003.0`.** 1,570 entries are live through the Claude Code marketplace and Agent Skills installers below. The CLI is on npm: `npx @hermes-hq/hodios search` (see [Use the CLI](#use-the-cli)).

*Hodios* (HO-dee-os) is an epithet of Hermes: the guide of travellers. This library is the guide for your agents.

## Install

Pick your tool. Each command was run against the published install tree in [hermes-hq/hodios-dist](https://github.com/hermes-hq/hodios-dist); swap the id or domain for any curated entry. The install tree holds the curated tier only (at most 2,000 entries, listed in [`curated.txt`](curated.txt)), because these installers download the whole repository. Every other entry installs with [the CLI](#use-the-cli).

| Tool | One line |
|---|---|
| **Claude Code** | `claude plugin marketplace add hermes-hq/hodios-dist && claude plugin install hodios-software-engineering@hodios` |
| **Codex, Cursor, Copilot, OpenCode and other Agent Skills tools** | `npx skills add hermes-hq/hodios-dist --skill review-pull-request -a codex` |
| **Gemini CLI** | `gemini skills install https://github.com/hermes-hq/hodios-dist --path skills/review-pull-request --consent` |
| **ChatGPT, claude.ai, anything else** | Copy `paste/<id>.md` from [hodios-dist](https://github.com/hermes-hq/hodios-dist/tree/main/paste), or run `npx @hermes-hq/hodios use <id>` for any entry |
| **Hermes IDE** | Built in. Open the Library tab. |

Claude Code installs a whole domain at a time: `hodios-software-engineering`, `hodios-education`, `hodios-travel` and so on, one plugin per domain. Then call an entry as `/hodios-software-engineering:review-pull-request`, or let Claude pick the subagents (`hodios-software-engineering:security-auditor`). For `npx skills`, `-a` takes `claude-code`, `codex`, `cursor`, `github-copilot`, `opencode`, `gemini-cli` and more; `--skill '*'` installs all 1,570.

### Use the CLI

The CLI searches the whole catalog, curated or not, ranks what fits your project and writes each tool's native files (rules and personas included, which the installers above do not cover). Run it with npx, or install it once to get the `hodios` command:

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
**1570 entries** (1355 prompts, 124 personas, 49 workflows, 24 rules, 18 styles).

<details><summary><b>Software engineering</b> · 240</summary>

| Category | Entries | Try |
|---|---:|---|
| Implementation | 21 | [`add-feature-flag`](library/software-engineering/implementation/add-feature-flag/) · [`add-rate-limiting`](library/software-engineering/implementation/add-rate-limiting/) · [`build-rest-endpoint`](library/software-engineering/implementation/build-rest-endpoint/) |
| Security | 15 | [`audit-dependencies`](library/software-engineering/security/audit-dependencies/) · [`harden-web-app-config`](library/software-engineering/security/harden-web-app-config/) · [`plan-secrets-management`](library/software-engineering/security/plan-secrets-management/) |
| AI and ML engineering | 14 | [`build-mcp-server`](library/software-engineering/ai-ml/build-mcp-server/) · [`build-structured-extraction`](library/software-engineering/ai-ml/build-structured-extraction/) · [`choose-ml-approach`](library/software-engineering/ai-ml/choose-ml-approach/) |
| Data engineering | 13 | [`design-data-pipeline`](library/software-engineering/data/design-data-pipeline/) · [`design-database-schema`](library/software-engineering/data/design-database-schema/) · [`design-search-index`](library/software-engineering/data/design-search-index/) |
| DevOps | 13 | [`design-deployment-strategy`](library/software-engineering/devops/design-deployment-strategy/) · [`plan-disaster-recovery`](library/software-engineering/devops/plan-disaster-recovery/) · [`reduce-cloud-spend`](library/software-engineering/devops/reduce-cloud-spend/) |
| Testing | 13 | [`add-characterization-tests`](library/software-engineering/testing/add-characterization-tests/) · [`add-regression-test`](library/software-engineering/testing/add-regression-test/) · [`fill-test-gaps`](library/software-engineering/testing/fill-test-gaps/) |
| Architecture | 12 | [`compare-design-options`](library/software-engineering/architecture/compare-design-options/) · [`design-api-contract`](library/software-engineering/architecture/design-api-contract/) · [`design-event-driven-system`](library/software-engineering/architecture/design-event-driven-system/) |
| Documentation | 12 | [`audit-documentation`](library/software-engineering/docs/audit-documentation/) · [`document-public-api`](library/software-engineering/docs/document-public-api/) · [`write-changelog`](library/software-engineering/docs/write-changelog/) |
| Incident and operations | 12 | [`build-incident-timeline`](library/software-engineering/incident/build-incident-timeline/) · [`define-slos`](library/software-engineering/incident/define-slos/) · [`design-alerting-rules`](library/software-engineering/incident/design-alerting-rules/) |
| Conventions | 11 | [`api-design-rules`](library/software-engineering/conventions/api-design-rules/) · [`csharp-style-rules`](library/software-engineering/conventions/csharp-style-rules/) · [`go-style-rules`](library/software-engineering/conventions/go-style-rules/) |
| Debugging | 11 | [`bisect-regression`](library/software-engineering/debugging/bisect-regression/) · [`debug-mobile-crash`](library/software-engineering/debugging/debug-mobile-crash/) · [`debug-network-request`](library/software-engineering/debugging/debug-network-request/) |
| Code review | 10 | [`respond-to-review-comments`](library/software-engineering/code-review/respond-to-review-comments/) · [`review-ai-generated-code`](library/software-engineering/code-review/review-ai-generated-code/) · [`review-api-breaking-changes`](library/software-engineering/code-review/review-api-breaking-changes/) |
| Accessibility | 9 | [`audit-mobile-accessibility`](library/software-engineering/accessibility/audit-mobile-accessibility/) · [`audit-web-accessibility`](library/software-engineering/accessibility/audit-web-accessibility/) · [`build-aria-widget`](library/software-engineering/accessibility/build-aria-widget/) |
| Git and version control | 9 | [`choose-branching-strategy`](library/software-engineering/git/choose-branching-strategy/) · [`clean-up-commit-history`](library/software-engineering/git/clean-up-commit-history/) · [`purge-file-from-git-history`](library/software-engineering/git/purge-file-from-git-history/) |
| Performance | 9 | [`find-memory-leak`](library/software-engineering/performance/find-memory-leak/) · [`fix-n-plus-one-queries`](library/software-engineering/performance/fix-n-plus-one-queries/) · [`improve-web-vitals`](library/software-engineering/performance/improve-web-vitals/) |
| Planning | 9 | [`break-down-epic`](library/software-engineering/planning/break-down-epic/) · [`estimate-with-ranges`](library/software-engineering/planning/estimate-with-ranges/) · [`plan-spike`](library/software-engineering/planning/plan-spike/) |
| Migration | 8 | [`migrate-api-version`](library/software-engineering/migration/migrate-api-version/) · [`migrate-database-engine`](library/software-engineering/migration/migrate-database-engine/) · [`migrate-javascript-to-typescript`](library/software-engineering/migration/migrate-javascript-to-typescript/) |
| Refactoring | 8 | [`extract-module`](library/software-engineering/refactoring/extract-module/) · [`improve-naming`](library/software-engineering/refactoring/improve-naming/) · [`plan-large-refactor`](library/software-engineering/refactoring/plan-large-refactor/) |
| Learning to code | 7 | [`create-coding-exercises`](library/software-engineering/learning/create-coding-exercises/) · [`explain-codebase`](library/software-engineering/learning/explain-codebase/) · [`explain-concept-with-code`](library/software-engineering/learning/explain-concept-with-code/) |
| Localization (software) | 7 | [`build-localization-glossary`](library/software-engineering/localization/build-localization-glossary/) · [`extract-ui-strings`](library/software-engineering/localization/extract-ui-strings/) · [`plan-rtl-support`](library/software-engineering/localization/plan-rtl-support/) |
| Coding-agent operations | 6 | [`audit-agent-permissions`](library/software-engineering/meta/audit-agent-permissions/) · [`review-agent-transcript`](library/software-engineering/meta/review-agent-transcript/) · [`write-agent-handoff`](library/software-engineering/meta/write-agent-handoff/) |
| Product (engineering) | 6 | [`define-non-functional-requirements`](library/software-engineering/product/define-non-functional-requirements/) · [`refine-backlog-ticket`](library/software-engineering/product/refine-backlog-ticket/) · [`write-acceptance-criteria`](library/software-engineering/product/write-acceptance-criteria/) |
| Developer writing | 5 | [`explain-tech-to-executives`](library/software-engineering/writing/explain-tech-to-executives/) · [`rewrite-for-clarity`](library/software-engineering/writing/rewrite-for-clarity/) · [`write-api-deprecation-notice`](library/software-engineering/writing/write-api-deprecation-notice/) |

</details>

<details><summary><b>Learning and education</b> · 88</summary>

| Category | Entries | Try |
|---|---:|---|
| Teaching | 34 | [`adapt-text-reading-level`](library/education/teaching/adapt-text-reading-level/) · [`align-lesson-to-standards`](library/education/teaching/align-lesson-to-standards/) · [`analyze-class-assessment-results`](library/education/teaching/analyze-class-assessment-results/) |
| Tutoring | 20 | [`analyze-literary-work`](library/education/tutoring/analyze-literary-work/) · [`analyze-primary-source`](library/education/tutoring/analyze-primary-source/) · [`check-my-reasoning`](library/education/tutoring/check-my-reasoning/) |
| Course design | 13 | [`build-self-study-curriculum`](library/education/course-design/build-self-study-curriculum/) · [`design-course-outline`](library/education/course-design/design-course-outline/) · [`design-elearning-module`](library/education/course-design/design-elearning-module/) |
| Studying | 13 | [`analyze-exam-mistakes`](library/education/studying/analyze-exam-mistakes/) · [`build-concept-map`](library/education/studying/build-concept-map/) · [`create-cheat-sheet`](library/education/studying/create-cheat-sheet/) |
| Exam preparation | 8 | [`generate-practice-exam`](library/education/exam-prep/generate-practice-exam/) · [`grade-practice-answers`](library/education/exam-prep/grade-practice-answers/) · [`prepare-certification-exam`](library/education/exam-prep/prepare-certification-exam/) |

</details>

<details><summary><b>Languages</b> · 53</summary>

| Category | Entries | Try |
|---|---:|---|
| Language learning | 29 | [`assess-language-level`](library/languages/language-learning/assess-language-level/) · [`build-vocabulary-list`](library/languages/language-learning/build-vocabulary-list/) · [`coach-pronunciation`](library/languages/language-learning/coach-pronunciation/) |
| Translation | 15 | [`adapt-regional-variant`](library/languages/translation/adapt-regional-variant/) · [`build-translation-glossary`](library/languages/translation/build-translation-glossary/) · [`handle-foreign-language-letter`](library/languages/translation/handle-foreign-language-letter/) |
| Conversation practice | 9 | [`practice-interview-in-language`](library/languages/conversation-practice/practice-interview-in-language/) · [`practice-opinion-debate`](library/languages/conversation-practice/practice-opinion-debate/) · [`practice-small-talk`](library/languages/conversation-practice/practice-small-talk/) |

</details>

<details><summary><b>Content creation</b> · 75</summary>

| Category | Entries | Try |
|---|---:|---|
| Video | 18 | [`adapt-trend-format`](library/content-creation/video/adapt-trend-format/) · [`analyze-video-retention`](library/content-creation/video/analyze-video-retention/) · [`create-paper-edit`](library/content-creation/video/create-paper-edit/) |
| Social media | 16 | [`build-creator-rate-card`](library/content-creation/social-media/build-creator-rate-card/) · [`handle-social-media-backlash`](library/content-creation/social-media/handle-social-media-backlash/) · [`plan-carousel-post`](library/content-creation/social-media/plan-carousel-post/) |
| Content strategy | 13 | [`analyze-competitor-channels`](library/content-creation/content-strategy/analyze-competitor-channels/) · [`analyze-content-performance`](library/content-creation/content-strategy/analyze-content-performance/) · [`audit-content-library`](library/content-creation/content-strategy/audit-content-library/) |
| Blogging | 11 | [`edit-transcript-into-article`](library/content-creation/blogging/edit-transcript-into-article/) · [`generate-blog-post-ideas`](library/content-creation/blogging/generate-blog-post-ideas/) · [`refresh-old-blog-post`](library/content-creation/blogging/refresh-old-blog-post/) |
| Podcasting | 11 | [`launch-podcast`](library/content-creation/podcasting/launch-podcast/) · [`plan-podcast-episode`](library/content-creation/podcasting/plan-podcast-episode/) · [`plan-podcast-season`](library/content-creation/podcasting/plan-podcast-season/) |
| Newsletters | 6 | [`curate-link-roundup`](library/content-creation/newsletters/curate-link-roundup/) · [`grow-newsletter`](library/content-creation/newsletters/grow-newsletter/) · [`plan-newsletter-format`](library/content-creation/newsletters/plan-newsletter-format/) |

</details>

<details><summary><b>Marketing and sales</b> · 80</summary>

| Category | Entries | Try |
|---|---:|---|
| Sales | 19 | [`build-sales-playbook`](library/marketing-sales/sales/build-sales-playbook/) · [`handle-sales-objections`](library/marketing-sales/sales/handle-sales-objections/) · [`prepare-deal-negotiation`](library/marketing-sales/sales/prepare-deal-negotiation/) |
| Copywriting | 18 | [`critique-marketing-copy`](library/marketing-sales/copywriting/critique-marketing-copy/) · [`request-customer-testimonials`](library/marketing-sales/copywriting/request-customer-testimonials/) · [`write-about-page`](library/marketing-sales/copywriting/write-about-page/) |
| Marketing strategy | 15 | [`analyze-competitors`](library/marketing-sales/marketing-strategy/analyze-competitors/) · [`build-ideal-customer-profile`](library/marketing-sales/marketing-strategy/build-ideal-customer-profile/) · [`create-lead-magnet`](library/marketing-sales/marketing-strategy/create-lead-magnet/) |
| SEO | 12 | [`audit-on-page-seo`](library/marketing-sales/seo/audit-on-page-seo/) · [`audit-technical-seo`](library/marketing-sales/seo/audit-technical-seo/) · [`build-internal-linking-plan`](library/marketing-sales/seo/build-internal-linking-plan/) |
| Advertising | 8 | [`analyze-ad-performance`](library/marketing-sales/advertising/analyze-ad-performance/) · [`audit-search-ads-account`](library/marketing-sales/advertising/audit-search-ads-account/) · [`define-ad-audiences`](library/marketing-sales/advertising/define-ad-audiences/) |
| Email marketing | 8 | [`audit-email-deliverability`](library/marketing-sales/email-marketing/audit-email-deliverability/) · [`write-abandoned-cart-emails`](library/marketing-sales/email-marketing/write-abandoned-cart-emails/) · [`write-email-sequence`](library/marketing-sales/email-marketing/write-email-sequence/) |

</details>

<details><summary><b>Product management</b> · 57</summary>

| Category | Entries | Try |
|---|---:|---|
| Product discovery | 13 | [`analyze-competitor-reviews`](library/product-management/product-discovery/analyze-competitor-reviews/) · [`define-jobs-to-be-done`](library/product-management/product-discovery/define-jobs-to-be-done/) · [`design-validation-experiment`](library/product-management/product-discovery/design-validation-experiment/) |
| Product metrics | 10 | [`analyze-conversion-funnel`](library/product-management/product-metrics/analyze-conversion-funnel/) · [`build-experiment-backlog`](library/product-management/product-metrics/build-experiment-backlog/) · [`define-activation-metric`](library/product-management/product-metrics/define-activation-metric/) |
| Product strategy | 10 | [`define-mvp-scope`](library/product-management/product-strategy/define-mvp-scope/) · [`evaluate-ai-feature-opportunity`](library/product-management/product-strategy/evaluate-ai-feature-opportunity/) · [`evaluate-build-vs-buy`](library/product-management/product-strategy/evaluate-build-vs-buy/) |
| Product launch | 9 | [`plan-price-change-communication`](library/product-management/product-launch/plan-price-change-communication/) · [`plan-product-launch`](library/product-management/product-launch/plan-product-launch/) · [`prepare-product-demo`](library/product-management/product-launch/prepare-product-demo/) |
| Roadmapping | 8 | [`build-outcome-roadmap`](library/product-management/roadmapping/build-outcome-roadmap/) · [`build-user-story-map`](library/product-management/roadmapping/build-user-story-map/) · [`plan-release`](library/product-management/roadmapping/plan-release/) |
| User feedback | 7 | [`analyze-cancellation-feedback`](library/product-management/user-feedback/analyze-cancellation-feedback/) · [`analyze-user-feedback`](library/product-management/user-feedback/analyze-user-feedback/) · [`close-feedback-loop`](library/product-management/user-feedback/close-feedback-loop/) |

</details>

<details><summary><b>Business and strategy</b> · 75</summary>

| Category | Entries | Try |
|---|---:|---|
| Fundraising | 17 | [`build-investor-pipeline`](library/business/fundraising/build-investor-pipeline/) · [`explain-term-sheet`](library/business/fundraising/explain-term-sheet/) · [`plan-fundraising-event`](library/business/fundraising/plan-fundraising-event/) |
| Entrepreneurship | 16 | [`evaluate-buying-a-business`](library/business/entrepreneurship/evaluate-buying-a-business/) · [`find-first-customers`](library/business/entrepreneurship/find-first-customers/) · [`model-unit-economics`](library/business/entrepreneurship/model-unit-economics/) |
| Customer support | 15 | [`analyze-support-tickets`](library/business/customer-support/analyze-support-tickets/) · [`build-support-macros`](library/business/customer-support/build-support-macros/) · [`build-support-qa-scorecard`](library/business/customer-support/build-support-qa-scorecard/) |
| Operations | 15 | [`automate-business-workflow`](library/business/operations/automate-business-workflow/) · [`build-staff-schedule`](library/business/operations/build-staff-schedule/) · [`compare-vendors`](library/business/operations/compare-vendors/) |
| Business strategy | 12 | [`analyze-business-model`](library/business/business-strategy/analyze-business-model/) · [`build-annual-operating-plan`](library/business/business-strategy/build-annual-operating-plan/) · [`design-pricing`](library/business/business-strategy/design-pricing/) |

</details>

<details><summary><b>Data analysis</b> · 82</summary>

| Category | Entries | Try |
|---|---:|---|
| Data exploration | 26 | [`analyze-employee-survey`](library/data-analysis/data-exploration/analyze-employee-survey/) · [`analyze-location-data`](library/data-analysis/data-exploration/analyze-location-data/) · [`analyze-marketing-attribution`](library/data-analysis/data-exploration/analyze-marketing-attribution/) |
| Spreadsheets | 19 | [`audit-spreadsheet-model`](library/data-analysis/spreadsheets/audit-spreadsheet-model/) · [`build-pivot-analysis`](library/data-analysis/spreadsheets/build-pivot-analysis/) · [`build-sheets-dashboard`](library/data-analysis/spreadsheets/build-sheets-dashboard/) |
| Statistics | 15 | [`analyze-ab-test-results`](library/data-analysis/statistics/analyze-ab-test-results/) · [`calculate-sample-size`](library/data-analysis/statistics/calculate-sample-size/) · [`check-analysis-for-pitfalls`](library/data-analysis/statistics/check-analysis-for-pitfalls/) |
| Data visualisation | 12 | [`audit-dashboard`](library/data-analysis/data-visualization/audit-dashboard/) · [`choose-chart-colors`](library/data-analysis/data-visualization/choose-chart-colors/) · [`choose-chart-type`](library/data-analysis/data-visualization/choose-chart-type/) |
| Reporting | 10 | [`automate-recurring-report`](library/data-analysis/reporting/automate-recurring-report/) · [`build-kpi-tree`](library/data-analysis/reporting/build-kpi-tree/) · [`compare-period-performance`](library/data-analysis/reporting/compare-period-performance/) |

</details>

<details><summary><b>Research and science</b> · 68</summary>

| Category | Entries | Try |
|---|---:|---|
| Scientific writing | 20 | [`choose-target-journal`](library/research-science/scientific-writing/choose-target-journal/) · [`design-research-poster`](library/research-science/scientific-writing/design-research-poster/) · [`design-scientific-figures`](library/research-science/scientific-writing/design-scientific-figures/) |
| Literature review | 14 | [`appraise-study-quality`](library/research-science/literature-review/appraise-study-quality/) · [`build-literature-matrix`](library/research-science/literature-review/build-literature-matrix/) · [`build-search-string`](library/research-science/literature-review/build-search-string/) |
| Research methods | 14 | [`build-qualitative-codebook`](library/research-science/research-methods/build-qualitative-codebook/) · [`design-research-study`](library/research-science/research-methods/design-research-study/) · [`plan-phd-timeline`](library/research-science/research-methods/plan-phd-timeline/) |
| Fact-checking | 12 | [`check-health-claim`](library/research-science/fact-checking/check-health-claim/) · [`check-science-news-against-paper`](library/research-science/fact-checking/check-science-news-against-paper/) · [`check-statistics-in-article`](library/research-science/fact-checking/check-statistics-in-article/) |
| Peer review | 8 | [`assess-reproducibility`](library/research-science/peer-review/assess-reproducibility/) · [`check-manuscript-reporting`](library/research-science/peer-review/check-manuscript-reporting/) · [`review-grant-proposal`](library/research-science/peer-review/review-grant-proposal/) |

</details>

<details><summary><b>Design</b> · 57</summary>

| Category | Entries | Try |
|---|---:|---|
| UI design | 16 | [`adapt-design-for-mobile`](library/design/ui-design/adapt-design-for-mobile/) · [`create-wireframe-spec`](library/design/ui-design/create-wireframe-spec/) · [`critique-ui-screen`](library/design/ui-design/critique-ui-screen/) |
| UX research | 13 | [`analyze-session-recordings`](library/design/ux-research/analyze-session-recordings/) · [`build-user-journey-map`](library/design/ux-research/build-user-journey-map/) · [`build-user-personas`](library/design/ux-research/build-user-personas/) |
| Graphic design | 12 | [`create-color-palette`](library/design/graphic-design/create-color-palette/) · [`create-mood-board`](library/design/graphic-design/create-mood-board/) · [`critique-graphic-design`](library/design/graphic-design/critique-graphic-design/) |
| Branding | 9 | [`build-brand-guidelines`](library/design/branding/build-brand-guidelines/) · [`build-brand-platform`](library/design/branding/build-brand-platform/) · [`design-logo-concepts`](library/design/branding/design-logo-concepts/) |
| Design systems | 7 | [`audit-design-consistency`](library/design/design-systems/audit-design-consistency/) · [`define-design-tokens`](library/design/design-systems/define-design-tokens/) · [`define-iconography`](library/design/design-systems/define-iconography/) |

</details>

<details><summary><b>Creative arts</b> · 63</summary>

| Category | Entries | Try |
|---|---:|---|
| Fiction | 20 | [`check-story-continuity`](library/creative-arts/fiction/check-story-continuity/) · [`critique-fiction-draft`](library/creative-arts/fiction/critique-fiction-draft/) · [`design-plot-twist`](library/creative-arts/fiction/design-plot-twist/) |
| Music | 13 | [`analyze-song-structure`](library/creative-arts/music/analyze-song-structure/) · [`plan-instrument-practice`](library/creative-arts/music/plan-instrument-practice/) · [`plan-live-set`](library/creative-arts/music/plan-live-set/) |
| Screenwriting | 9 | [`adapt-story-for-screen`](library/creative-arts/screenwriting/adapt-story-for-screen/) · [`develop-tv-series-concept`](library/creative-arts/screenwriting/develop-tv-series-concept/) · [`format-screenplay-scene`](library/creative-arts/screenwriting/format-screenplay-scene/) |
| Image generation | 7 | [`build-image-style-guide`](library/creative-arts/image-generation/build-image-style-guide/) · [`create-storyboard`](library/creative-arts/image-generation/create-storyboard/) · [`write-character-consistency-prompts`](library/creative-arts/image-generation/write-character-consistency-prompts/) |
| Poetry | 7 | [`analyze-poem`](library/creative-arts/poetry/analyze-poem/) · [`critique-poem`](library/creative-arts/poetry/critique-poem/) · [`generate-poetry-prompts`](library/creative-arts/poetry/generate-poetry-prompts/) |
| Worldbuilding | 7 | [`build-magic-system`](library/creative-arts/worldbuilding/build-magic-system/) · [`build-series-bible`](library/creative-arts/worldbuilding/build-series-bible/) · [`build-world-timeline`](library/creative-arts/worldbuilding/build-world-timeline/) |

</details>

<details><summary><b>Writing and communication</b> · 88</summary>

| Category | Entries | Try |
|---|---:|---|
| Business writing | 19 | [`write-award-nomination`](library/writing-communication/business-writing/write-award-nomination/) · [`write-decision-memo`](library/writing-communication/business-writing/write-decision-memo/) · [`write-executive-summary`](library/writing-communication/business-writing/write-executive-summary/) |
| Interpersonal communication | 19 | [`adapt-message-for-culture`](library/writing-communication/interpersonal-communication/adapt-message-for-culture/) · [`apologize-effectively`](library/writing-communication/interpersonal-communication/apologize-effectively/) · [`give-feedback-sbi`](library/writing-communication/interpersonal-communication/give-feedback-sbi/) |
| Editing | 17 | [`build-style-sheet`](library/writing-communication/editing/build-style-sheet/) · [`capture-writing-voice`](library/writing-communication/editing/capture-writing-voice/) · [`copyedit-to-style-guide`](library/writing-communication/editing/copyedit-to-style-guide/) |
| Email | 15 | [`build-email-templates`](library/writing-communication/email/build-email-templates/) · [`decline-request-gracefully`](library/writing-communication/email/decline-request-gracefully/) · [`reply-to-email`](library/writing-communication/email/reply-to-email/) |
| Public speaking | 10 | [`craft-personal-story`](library/writing-communication/public-speaking/craft-personal-story/) · [`critique-speech-recording`](library/writing-communication/public-speaking/critique-speech-recording/) · [`moderate-panel`](library/writing-communication/public-speaking/moderate-panel/) |
| Presentations | 8 | [`critique-slide-deck`](library/writing-communication/presentations/critique-slide-deck/) · [`outline-presentation`](library/writing-communication/presentations/outline-presentation/) · [`plan-slide-visuals`](library/writing-communication/presentations/plan-slide-visuals/) |

</details>

<details><summary><b>Career and HR</b> · 75</summary>

| Category | Entries | Try |
|---|---:|---|
| Career growth | 15 | [`ask-for-raise`](library/career-hr/career-growth/ask-for-raise/) · [`build-development-plan`](library/career-hr/career-growth/build-development-plan/) · [`find-mentor`](library/career-hr/career-growth/find-mentor/) |
| Job search | 14 | [`analyze-job-posting`](library/career-hr/job-search/analyze-job-posting/) · [`answer-application-questions`](library/career-hr/job-search/answer-application-questions/) · [`brief-your-references`](library/career-hr/job-search/brief-your-references/) |
| People management | 14 | [`build-career-ladder`](library/career-hr/people-management/build-career-ladder/) · [`delegate-task`](library/career-hr/people-management/delegate-task/) · [`plan-layoff-conversation`](library/career-hr/people-management/plan-layoff-conversation/) |
| Hiring | 12 | [`design-interview-loop`](library/career-hr/hiring/design-interview-loop/) · [`run-hiring-debrief`](library/career-hr/hiring/run-hiring-debrief/) · [`run-reference-check`](library/career-hr/hiring/run-reference-check/) |
| Interview preparation | 10 | [`debrief-interview`](library/career-hr/interview-prep/debrief-interview/) · [`practice-coding-interview`](library/career-hr/interview-prep/practice-coding-interview/) · [`practice-video-interview`](library/career-hr/interview-prep/practice-video-interview/) |
| Résumés | 10 | [`convert-cv-to-country-format`](library/career-hr/resumes/convert-cv-to-country-format/) · [`optimize-linkedin-profile`](library/career-hr/resumes/optimize-linkedin-profile/) · [`reframe-for-career-change`](library/career-hr/resumes/reframe-for-career-change/) |

</details>

<details><summary><b>Finance</b> · 65</summary>

| Category | Entries | Try |
|---|---:|---|
| Financial planning | 18 | [`compare-loan-offers`](library/finance/financial-planning/compare-loan-offers/) · [`compare-mortgage-options`](library/finance/financial-planning/compare-mortgage-options/) · [`compare-rent-vs-buy`](library/finance/financial-planning/compare-rent-vs-buy/) |
| Accounting | 14 | [`analyze-working-capital`](library/finance/accounting/analyze-working-capital/) · [`calculate-break-even`](library/finance/accounting/calculate-break-even/) · [`calculate-product-margin`](library/finance/accounting/calculate-product-margin/) |
| Taxes | 12 | [`check-sales-tax-obligations`](library/finance/taxes/check-sales-tax-obligations/) · [`explain-marginal-tax-rates`](library/finance/taxes/explain-marginal-tax-rates/) · [`explain-payslip`](library/finance/taxes/explain-payslip/) |
| Investing (education) | 11 | [`check-portfolio-diversification`](library/finance/investing/check-portfolio-diversification/) · [`choose-financial-advisor`](library/finance/investing/choose-financial-advisor/) · [`compare-retirement-accounts`](library/finance/investing/compare-retirement-accounts/) |
| Budgeting | 10 | [`budget-for-holidays-and-gifts`](library/finance/budgeting/budget-for-holidays-and-gifts/) · [`build-monthly-budget`](library/finance/budgeting/build-monthly-budget/) · [`build-tight-budget`](library/finance/budgeting/build-tight-budget/) |

</details>

<details><summary><b>Legal and admin</b> · 56</summary>

| Category | Entries | Try |
|---|---:|---|
| Legal correspondence | 16 | [`appeal-benefits-decision`](library/legal-admin/legal-correspondence/appeal-benefits-decision/) · [`appeal-insurance-denial`](library/legal-admin/legal-correspondence/appeal-insurance-denial/) · [`appeal-parking-ticket`](library/legal-admin/legal-correspondence/appeal-parking-ticket/) |
| Contracts | 12 | [`build-contract-obligations-register`](library/legal-admin/contracts/build-contract-obligations-register/) · [`compare-contract-versions`](library/legal-admin/contracts/compare-contract-versions/) · [`draft-simple-agreement`](library/legal-admin/contracts/draft-simple-agreement/) |
| Paperwork | 12 | [`apply-for-trademark`](library/legal-admin/paperwork/apply-for-trademark/) · [`choose-business-structure`](library/legal-admin/paperwork/choose-business-structure/) · [`organize-important-documents`](library/legal-admin/paperwork/organize-important-documents/) |
| Compliance | 10 | [`assess-ai-act-obligations`](library/legal-admin/compliance/assess-ai-act-obligations/) · [`audit-website-privacy-compliance`](library/legal-admin/compliance/audit-website-privacy-compliance/) · [`build-compliance-checklist`](library/legal-admin/compliance/build-compliance-checklist/) |
| Policies and terms | 6 | [`write-ai-use-policy`](library/legal-admin/policies/write-ai-use-policy/) · [`write-employee-handbook`](library/legal-admin/policies/write-employee-handbook/) · [`write-privacy-policy`](library/legal-admin/policies/write-privacy-policy/) |

</details>

<details><summary><b>Health and wellbeing</b> · 78</summary>

| Category | Entries | Try |
|---|---:|---|
| Mental health | 26 | [`build-connection-plan`](library/health-wellbeing/mental-health/build-connection-plan/) · [`build-coping-plan`](library/health-wellbeing/mental-health/build-coping-plan/) · [`build-mood-tracker`](library/health-wellbeing/mental-health/build-mood-tracker/) |
| Medical visit preparation | 24 | [`build-medication-list`](library/health-wellbeing/medical-prep/build-medication-list/) · [`build-symptom-log`](library/health-wellbeing/medical-prep/build-symptom-log/) · [`explain-clinical-notes`](library/health-wellbeing/medical-prep/explain-clinical-notes/) |
| Fitness | 17 | [`assess-fitness-baseline`](library/health-wellbeing/fitness/assess-fitness-baseline/) · [`build-training-plan`](library/health-wellbeing/fitness/build-training-plan/) · [`check-exercise-form`](library/health-wellbeing/fitness/check-exercise-form/) |
| Nutrition | 11 | [`analyze-diet-log`](library/health-wellbeing/nutrition/analyze-diet-log/) · [`compare-diet-approaches`](library/health-wellbeing/nutrition/compare-diet-approaches/) · [`evaluate-supplement`](library/health-wellbeing/nutrition/evaluate-supplement/) |

</details>

<details><summary><b>Cooking and home</b> · 44</summary>

| Category | Entries | Try |
|---|---:|---|
| Cooking | 17 | [`adapt-recipe`](library/home-cooking/cooking/adapt-recipe/) · [`check-food-safety`](library/home-cooking/cooking/check-food-safety/) · [`compile-family-cookbook`](library/home-cooking/cooking/compile-family-cookbook/) |
| Home improvement | 14 | [`diagnose-home-problem`](library/home-cooking/home-improvement/diagnose-home-problem/) · [`hire-contractor`](library/home-cooking/home-improvement/hire-contractor/) · [`plan-cleaning-schedule`](library/home-cooking/home-improvement/plan-cleaning-schedule/) |
| Meal planning | 7 | [`plan-budget-meals`](library/home-cooking/meal-planning/plan-budget-meals/) · [`plan-freezer-meals`](library/home-cooking/meal-planning/plan-freezer-meals/) · [`plan-meal-prep-session`](library/home-cooking/meal-planning/plan-meal-prep-session/) |
| Gardening | 6 | [`diagnose-plant-problem`](library/home-cooking/gardening/diagnose-plant-problem/) · [`plan-container-garden`](library/home-cooking/gardening/plan-container-garden/) · [`plan-houseplant-care`](library/home-cooking/gardening/plan-houseplant-care/) |

</details>

<details><summary><b>Travel</b> · 29</summary>

| Category | Entries | Try |
|---|---:|---|
| Travel logistics | 11 | [`beat-jet-lag`](library/travel/travel-logistics/beat-jet-lag/) · [`build-packing-list`](library/travel/travel-logistics/build-packing-list/) · [`check-destination-safety`](library/travel/travel-logistics/check-destination-safety/) |
| Trip planning | 11 | [`choose-destination`](library/travel/trip-planning/choose-destination/) · [`plan-accessible-trip`](library/travel/trip-planning/plan-accessible-trip/) · [`plan-digital-nomad-base`](library/travel/trip-planning/plan-digital-nomad-base/) |
| Local culture | 7 | [`decode-foreign-menu`](library/travel/local-culture/decode-foreign-menu/) · [`learn-destination-history`](library/travel/local-culture/learn-destination-history/) · [`learn-local-etiquette`](library/travel/local-culture/learn-local-etiquette/) |

</details>

<details><summary><b>Parenting and family</b> · 35</summary>

| Category | Entries | Try |
|---|---:|---|
| Parenting | 15 | [`explain-hard-topic-to-child`](library/parenting-family/parenting/explain-hard-topic-to-child/) · [`handle-picky-eating`](library/parenting-family/parenting/handle-picky-eating/) · [`handle-sibling-conflict`](library/parenting-family/parenting/handle-sibling-conflict/) |
| Family logistics | 7 | [`build-care-rota`](library/parenting-family/family-logistics/build-care-rota/) · [`coordinate-family-calendar`](library/parenting-family/family-logistics/coordinate-family-calendar/) · [`create-chore-chart`](library/parenting-family/family-logistics/create-chore-chart/) |
| Kids' activities | 7 | [`create-kids-craft`](library/parenting-family/kids-activities/create-kids-craft/) · [`design-kids-science-experiment`](library/parenting-family/kids-activities/design-kids-science-experiment/) · [`invent-learning-game`](library/parenting-family/kids-activities/invent-learning-game/) |
| Relationships | 6 | [`choose-meaningful-gift`](library/parenting-family/relationships/choose-meaningful-gift/) · [`plan-date-night`](library/parenting-family/relationships/plan-date-night/) · [`plan-long-distance-connection`](library/parenting-family/relationships/plan-long-distance-connection/) |

</details>

<details><summary><b>Productivity and personal life</b> · 64</summary>

| Category | Entries | Try |
|---|---:|---|
| Task management | 13 | [`audit-time-use`](library/productivity/task-management/audit-time-use/) · [`break-down-big-task`](library/productivity/task-management/break-down-big-task/) · [`build-reusable-checklist`](library/productivity/task-management/build-reusable-checklist/) |
| Decision-making | 11 | [`compare-options-matrix`](library/productivity/decision-making/compare-options-matrix/) · [`compare-purchase-options`](library/productivity/decision-making/compare-purchase-options/) · [`find-logical-fallacies`](library/productivity/decision-making/find-logical-fallacies/) |
| Habits and goals | 10 | [`beat-procrastination`](library/productivity/habits/beat-procrastination/) · [`break-bad-habit`](library/productivity/habits/break-bad-habit/) · [`design-daily-routine`](library/productivity/habits/design-daily-routine/) |
| Meetings | 9 | [`design-meeting-cadence`](library/productivity/meetings/design-meeting-cadence/) · [`prepare-for-meeting`](library/productivity/meetings/prepare-for-meeting/) · [`prepare-for-one-on-one`](library/productivity/meetings/prepare-for-one-on-one/) |
| Note-taking | 8 | [`build-team-wiki-structure`](library/productivity/note-taking/build-team-wiki-structure/) · [`design-second-brain`](library/productivity/note-taking/design-second-brain/) · [`make-reading-notes`](library/productivity/note-taking/make-reading-notes/) |
| Summarisation | 7 | [`build-news-digest`](library/productivity/summarization/build-news-digest/) · [`compare-documents`](library/productivity/summarization/compare-documents/) · [`extract-deadlines`](library/productivity/summarization/extract-deadlines/) |
| Brainstorming | 6 | [`brainstorm-ideas`](library/productivity/brainstorming/brainstorm-ideas/) · [`cluster-ideas`](library/productivity/brainstorming/cluster-ideas/) · [`facilitate-group-brainstorm`](library/productivity/brainstorming/facilitate-group-brainstorm/) |

</details>

<details><summary><b>Gaming and fun</b> · 36</summary>

| Category | Entries | Try |
|---|---:|---|
| Tabletop RPGs | 13 | [`balance-combat-encounter`](library/gaming-fun/tabletop-rpg/balance-combat-encounter/) · [`build-rpg-character`](library/gaming-fun/tabletop-rpg/build-rpg-character/) · [`create-npc`](library/gaming-fun/tabletop-rpg/create-npc/) |
| Puzzles | 7 | [`analyze-chess-game`](library/gaming-fun/puzzles/analyze-chess-game/) · [`create-escape-room-puzzles`](library/gaming-fun/puzzles/create-escape-room-puzzles/) · [`create-scavenger-hunt`](library/gaming-fun/puzzles/create-scavenger-hunt/) |
| Video games | 7 | [`design-game-level`](library/gaming-fun/video-games/design-game-level/) · [`design-game-mechanic`](library/gaming-fun/video-games/design-game-mechanic/) · [`plan-game-strategy`](library/gaming-fun/video-games/plan-game-strategy/) |
| Trivia and quizzes | 5 | [`create-party-game-cards`](library/gaming-fun/trivia/create-party-game-cards/) · [`host-trivia-night`](library/gaming-fun/trivia/host-trivia-night/) · [`plan-murder-mystery-party`](library/gaming-fun/trivia/plan-murder-mystery-party/) |
| Humour | 4 | [`punch-up-with-humor`](library/gaming-fun/humor/punch-up-with-humor/) · [`write-comedy-bit`](library/gaming-fun/humor/write-comedy-bit/) · [`write-parody-lyrics`](library/gaming-fun/humor/write-parody-lyrics/) |

</details>

<details><summary><b>Prompting and assistants</b> · 39</summary>

| Category | Entries | Try |
|---|---:|---|
| Output styles | 18 | [`academic`](library/prompting/output-styles/academic/) · [`beginner-friendly`](library/prompting/output-styles/beginner-friendly/) · [`bilingual`](library/prompting/output-styles/bilingual/) |
| Prompt engineering | 15 | [`adapt-prompt-for-reasoning-model`](library/prompting/prompt-engineering/adapt-prompt-for-reasoning-model/) · [`build-prompt-test-set`](library/prompting/prompt-engineering/build-prompt-test-set/) · [`compress-prompt`](library/prompting/prompt-engineering/compress-prompt/) |
| Assistant setup | 6 | [`build-project-instructions`](library/prompting/assistant-setup/build-project-instructions/) · [`map-ai-use-cases`](library/prompting/assistant-setup/map-ai-use-cases/) · [`review-custom-instructions`](library/prompting/assistant-setup/review-custom-instructions/) |

</details>

<details><summary><b>Other (holding area)</b> · 23</summary>

| Category | Entries | Try |
|---|---:|---|
| Unsorted (holding area) | 23 | [`brief-court-case`](library/other/unsorted/brief-court-case/) · [`check-suspicious-message`](library/other/unsorted/check-suspicious-message/) · [`critique-artwork`](library/other/unsorted/critique-artwork/) |

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
curated.txt                          the curated tier: the entries hodios-dist ships
```

The compiled install tree (the curated tier) and the searchable catalog (every entry, `catalog/v1`) live in [hermes-hq/hodios-dist](https://github.com/hermes-hq/hodios-dist), built by the release bot. How entries are picked for the curated tier: [TAXONOMY.md §6.1](TAXONOMY.md#61-tiers-and-the-curated-list).

## Support

Hodios is free and always will be. If it saves you time and you'd like to say thanks, you can [buy the maintainer a coffee](https://buymeacoffee.com/anhaia). Stars, good entries and honest bug reports help just as much.

## License

- **Content** (`library/`, `partials/`, `vocab/` and every generated export): [CC0-1.0](LICENSES/CC0-1.0.txt). No rights reserved.
- **Code** (`packages/`, `tools/`, `schema/`): [Apache-2.0](LICENSE).

[REUSE.toml](REUSE.toml) maps every path. Hodios is separate from Hermes IDE's own license. "Hodios" and "Hermes IDE" are trademarks; see [TRADEMARK.md](TRADEMARK.md).
