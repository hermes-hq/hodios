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

> **Status: catalog `2026.1003.1`.** 2,570 entries. The 1,900 curated ones are live through the Claude Code marketplace and Agent Skills installers below; the CLI on npm searches and installs all of them: `npx @hermes-hq/hodios search` (see [Use the CLI](#use-the-cli)).

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

Claude Code installs a whole domain at a time: `hodios-software-engineering`, `hodios-education`, `hodios-travel` and so on, one plugin per domain. Then call an entry as `/hodios-software-engineering:review-pull-request`, or let Claude pick the subagents (`hodios-software-engineering:security-auditor`). For `npx skills`, `-a` takes `claude-code`, `codex`, `cursor`, `github-copilot`, `opencode`, `gemini-cli` and more; `--skill '*'` installs all 1,900 curated entries.

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
**2570 entries** (2295 prompts, 154 personas, 69 workflows, 29 rules, 23 styles).

<details><summary><b>Software engineering</b> · 290</summary>

| Category | Entries | Try |
|---|---:|---|
| Implementation | 36 | [`add-feature-flag`](library/software-engineering/implementation/add-feature-flag/) · [`add-rate-limiting`](library/software-engineering/implementation/add-rate-limiting/) · [`build-browser-extension`](library/software-engineering/implementation/build-browser-extension/) |
| Security | 19 | [`audit-dependencies`](library/software-engineering/security/audit-dependencies/) · [`harden-linux-server`](library/software-engineering/security/harden-linux-server/) · [`harden-web-app-config`](library/software-engineering/security/harden-web-app-config/) |
| DevOps | 18 | [`deploy-to-vps`](library/software-engineering/devops/deploy-to-vps/) · [`design-deployment-strategy`](library/software-engineering/devops/design-deployment-strategy/) · [`plan-disaster-recovery`](library/software-engineering/devops/plan-disaster-recovery/) |
| AI and ML engineering | 17 | [`add-llm-output-guardrails`](library/software-engineering/ai-ml/add-llm-output-guardrails/) · [`build-mcp-server`](library/software-engineering/ai-ml/build-mcp-server/) · [`build-structured-extraction`](library/software-engineering/ai-ml/build-structured-extraction/) |
| Debugging | 17 | [`bisect-regression`](library/software-engineering/debugging/bisect-regression/) · [`debug-mobile-crash`](library/software-engineering/debugging/debug-mobile-crash/) · [`debug-native-crash`](library/software-engineering/debugging/debug-native-crash/) |
| Data engineering | 16 | [`design-data-pipeline`](library/software-engineering/data/design-data-pipeline/) · [`design-database-schema`](library/software-engineering/data/design-database-schema/) · [`design-search-index`](library/software-engineering/data/design-search-index/) |
| Testing | 16 | [`add-characterization-tests`](library/software-engineering/testing/add-characterization-tests/) · [`add-regression-test`](library/software-engineering/testing/add-regression-test/) · [`fill-test-gaps`](library/software-engineering/testing/fill-test-gaps/) |
| Documentation | 14 | [`audit-documentation`](library/software-engineering/docs/audit-documentation/) · [`document-public-api`](library/software-engineering/docs/document-public-api/) · [`write-api-quickstart`](library/software-engineering/docs/write-api-quickstart/) |
| Incident and operations | 13 | [`build-incident-timeline`](library/software-engineering/incident/build-incident-timeline/) · [`define-slos`](library/software-engineering/incident/define-slos/) · [`design-alerting-rules`](library/software-engineering/incident/design-alerting-rules/) |
| Architecture | 12 | [`compare-design-options`](library/software-engineering/architecture/compare-design-options/) · [`design-api-contract`](library/software-engineering/architecture/design-api-contract/) · [`design-event-driven-system`](library/software-engineering/architecture/design-event-driven-system/) |
| Accessibility | 11 | [`audit-mobile-accessibility`](library/software-engineering/accessibility/audit-mobile-accessibility/) · [`audit-web-accessibility`](library/software-engineering/accessibility/audit-web-accessibility/) · [`build-aria-widget`](library/software-engineering/accessibility/build-aria-widget/) |
| Conventions | 11 | [`api-design-rules`](library/software-engineering/conventions/api-design-rules/) · [`csharp-style-rules`](library/software-engineering/conventions/csharp-style-rules/) · [`go-style-rules`](library/software-engineering/conventions/go-style-rules/) |
| Performance | 11 | [`find-memory-leak`](library/software-engineering/performance/find-memory-leak/) · [`fix-n-plus-one-queries`](library/software-engineering/performance/fix-n-plus-one-queries/) · [`fix-react-rerenders`](library/software-engineering/performance/fix-react-rerenders/) |
| Code review | 10 | [`respond-to-review-comments`](library/software-engineering/code-review/respond-to-review-comments/) · [`review-ai-generated-code`](library/software-engineering/code-review/review-ai-generated-code/) · [`review-api-breaking-changes`](library/software-engineering/code-review/review-api-breaking-changes/) |
| Git and version control | 10 | [`choose-branching-strategy`](library/software-engineering/git/choose-branching-strategy/) · [`clean-up-commit-history`](library/software-engineering/git/clean-up-commit-history/) · [`purge-file-from-git-history`](library/software-engineering/git/purge-file-from-git-history/) |
| Planning | 10 | [`break-down-epic`](library/software-engineering/planning/break-down-epic/) · [`estimate-with-ranges`](library/software-engineering/planning/estimate-with-ranges/) · [`plan-spike`](library/software-engineering/planning/plan-spike/) |
| Learning to code | 9 | [`create-coding-exercises`](library/software-engineering/learning/create-coding-exercises/) · [`explain-algorithm`](library/software-engineering/learning/explain-algorithm/) · [`explain-codebase`](library/software-engineering/learning/explain-codebase/) |
| Migration | 8 | [`migrate-api-version`](library/software-engineering/migration/migrate-api-version/) · [`migrate-database-engine`](library/software-engineering/migration/migrate-database-engine/) · [`migrate-javascript-to-typescript`](library/software-engineering/migration/migrate-javascript-to-typescript/) |
| Refactoring | 8 | [`extract-module`](library/software-engineering/refactoring/extract-module/) · [`improve-naming`](library/software-engineering/refactoring/improve-naming/) · [`plan-large-refactor`](library/software-engineering/refactoring/plan-large-refactor/) |
| Localization (software) | 7 | [`build-localization-glossary`](library/software-engineering/localization/build-localization-glossary/) · [`extract-ui-strings`](library/software-engineering/localization/extract-ui-strings/) · [`plan-rtl-support`](library/software-engineering/localization/plan-rtl-support/) |
| Coding-agent operations | 6 | [`audit-agent-permissions`](library/software-engineering/meta/audit-agent-permissions/) · [`review-agent-transcript`](library/software-engineering/meta/review-agent-transcript/) · [`write-agent-handoff`](library/software-engineering/meta/write-agent-handoff/) |
| Product (engineering) | 6 | [`define-non-functional-requirements`](library/software-engineering/product/define-non-functional-requirements/) · [`refine-backlog-ticket`](library/software-engineering/product/refine-backlog-ticket/) · [`write-acceptance-criteria`](library/software-engineering/product/write-acceptance-criteria/) |
| Developer writing | 5 | [`explain-tech-to-executives`](library/software-engineering/writing/explain-tech-to-executives/) · [`rewrite-for-clarity`](library/software-engineering/writing/rewrite-for-clarity/) · [`write-api-deprecation-notice`](library/software-engineering/writing/write-api-deprecation-notice/) |

</details>

<details><summary><b>Learning and education</b> · 163</summary>

| Category | Entries | Try |
|---|---:|---|
| Teaching | 68 | [`adapt-text-reading-level`](library/education/teaching/adapt-text-reading-level/) · [`align-lesson-to-standards`](library/education/teaching/align-lesson-to-standards/) · [`analyze-class-assessment-results`](library/education/teaching/analyze-class-assessment-results/) |
| Course design | 29 | [`build-course-reading-list`](library/education/course-design/build-course-reading-list/) · [`build-self-study-curriculum`](library/education/course-design/build-self-study-curriculum/) · [`convert-course-to-online`](library/education/course-design/convert-course-to-online/) |
| Tutoring | 28 | [`analyze-literary-work`](library/education/tutoring/analyze-literary-work/) · [`analyze-primary-source`](library/education/tutoring/analyze-primary-source/) · [`check-my-reasoning`](library/education/tutoring/check-my-reasoning/) |
| Studying | 24 | [`adapt-study-for-learning-difference`](library/education/studying/adapt-study-for-learning-difference/) · [`analyze-exam-mistakes`](library/education/studying/analyze-exam-mistakes/) · [`build-concept-map`](library/education/studying/build-concept-map/) |
| Exam preparation | 14 | [`analyze-past-papers`](library/education/exam-prep/analyze-past-papers/) · [`generate-practice-exam`](library/education/exam-prep/generate-practice-exam/) · [`grade-practice-answers`](library/education/exam-prep/grade-practice-answers/) |

</details>

<details><summary><b>Languages</b> · 78</summary>

| Category | Entries | Try |
|---|---:|---|
| Language learning | 43 | [`assess-language-level`](library/languages/language-learning/assess-language-level/) · [`build-personal-phrasebook`](library/languages/language-learning/build-personal-phrasebook/) · [`build-vocabulary-list`](library/languages/language-learning/build-vocabulary-list/) |
| Translation | 23 | [`adapt-regional-variant`](library/languages/translation/adapt-regional-variant/) · [`adapt-script-for-dubbing`](library/languages/translation/adapt-script-for-dubbing/) · [`back-translate-to-verify`](library/languages/translation/back-translate-to-verify/) |
| Conversation practice | 12 | [`practice-interview-in-language`](library/languages/conversation-practice/practice-interview-in-language/) · [`practice-opinion-debate`](library/languages/conversation-practice/practice-opinion-debate/) · [`practice-phone-call-in-language`](library/languages/conversation-practice/practice-phone-call-in-language/) |

</details>

<details><summary><b>Content creation</b> · 125</summary>

| Category | Entries | Try |
|---|---:|---|
| Blogging | 29 | [`edit-transcript-into-article`](library/content-creation/blogging/edit-transcript-into-article/) · [`generate-blog-post-ideas`](library/content-creation/blogging/generate-blog-post-ideas/) · [`pitch-freelance-article`](library/content-creation/blogging/pitch-freelance-article/) |
| Social media | 27 | [`brainstorm-brand-memes`](library/content-creation/social-media/brainstorm-brand-memes/) · [`build-creator-rate-card`](library/content-creation/social-media/build-creator-rate-card/) · [`deconstruct-viral-post`](library/content-creation/social-media/deconstruct-viral-post/) |
| Video | 26 | [`adapt-script-for-teleprompter`](library/content-creation/video/adapt-script-for-teleprompter/) · [`adapt-trend-format`](library/content-creation/video/adapt-trend-format/) · [`analyze-video-retention`](library/content-creation/video/analyze-video-retention/) |
| Podcasting | 17 | [`choose-podcast-setup`](library/content-creation/podcasting/choose-podcast-setup/) · [`create-podcast-edit-list`](library/content-creation/podcasting/create-podcast-edit-list/) · [`launch-podcast`](library/content-creation/podcasting/launch-podcast/) |
| Content strategy | 16 | [`analyze-competitor-channels`](library/content-creation/content-strategy/analyze-competitor-channels/) · [`analyze-content-performance`](library/content-creation/content-strategy/analyze-content-performance/) · [`audit-content-library`](library/content-creation/content-strategy/audit-content-library/) |
| Newsletters | 10 | [`curate-link-roundup`](library/content-creation/newsletters/curate-link-roundup/) · [`grow-newsletter`](library/content-creation/newsletters/grow-newsletter/) · [`plan-newsletter-format`](library/content-creation/newsletters/plan-newsletter-format/) |

</details>

<details><summary><b>Marketing and sales</b> · 130</summary>

| Category | Entries | Try |
|---|---:|---|
| Copywriting | 31 | [`analyze-competitor-copy`](library/marketing-sales/copywriting/analyze-competitor-copy/) · [`critique-marketing-copy`](library/marketing-sales/copywriting/critique-marketing-copy/) · [`plan-promotional-offer`](library/marketing-sales/copywriting/plan-promotional-offer/) |
| Sales | 30 | [`ask-clients-for-referrals`](library/marketing-sales/sales/ask-clients-for-referrals/) · [`build-sales-playbook`](library/marketing-sales/sales/build-sales-playbook/) · [`follow-up-event-leads`](library/marketing-sales/sales/follow-up-event-leads/) |
| Marketing strategy | 24 | [`analyze-competitors`](library/marketing-sales/marketing-strategy/analyze-competitors/) · [`brainstorm-guerrilla-marketing`](library/marketing-sales/marketing-strategy/brainstorm-guerrilla-marketing/) · [`build-annual-marketing-calendar`](library/marketing-sales/marketing-strategy/build-annual-marketing-calendar/) |
| SEO | 17 | [`analyze-search-console-data`](library/marketing-sales/seo/analyze-search-console-data/) · [`audit-on-page-seo`](library/marketing-sales/seo/audit-on-page-seo/) · [`audit-technical-seo`](library/marketing-sales/seo/audit-technical-seo/) |
| Advertising | 15 | [`analyze-ad-performance`](library/marketing-sales/advertising/analyze-ad-performance/) · [`audit-search-ads-account`](library/marketing-sales/advertising/audit-search-ads-account/) · [`check-ad-policy-compliance`](library/marketing-sales/advertising/check-ad-policy-compliance/) |
| Email marketing | 13 | [`audit-email-deliverability`](library/marketing-sales/email-marketing/audit-email-deliverability/) · [`design-email-template`](library/marketing-sales/email-marketing/design-email-template/) · [`plan-email-segmentation`](library/marketing-sales/email-marketing/plan-email-segmentation/) |

</details>

<details><summary><b>Product management</b> · 81</summary>

| Category | Entries | Try |
|---|---:|---|
| Product strategy | 18 | [`assess-product-market-fit`](library/product-management/product-strategy/assess-product-market-fit/) · [`define-mvp-scope`](library/product-management/product-strategy/define-mvp-scope/) · [`design-free-tier`](library/product-management/product-strategy/design-free-tier/) |
| Product discovery | 16 | [`analyze-competitor-reviews`](library/product-management/product-discovery/analyze-competitor-reviews/) · [`define-jobs-to-be-done`](library/product-management/product-discovery/define-jobs-to-be-done/) · [`design-validation-experiment`](library/product-management/product-discovery/design-validation-experiment/) |
| Product metrics | 13 | [`analyze-conversion-funnel`](library/product-management/product-metrics/analyze-conversion-funnel/) · [`build-experiment-backlog`](library/product-management/product-metrics/build-experiment-backlog/) · [`define-activation-metric`](library/product-management/product-metrics/define-activation-metric/) |
| Product launch | 12 | [`plan-feature-adoption-push`](library/product-management/product-launch/plan-feature-adoption-push/) · [`plan-price-change-communication`](library/product-management/product-launch/plan-price-change-communication/) · [`plan-product-hunt-launch`](library/product-management/product-launch/plan-product-hunt-launch/) |
| Roadmapping | 12 | [`build-outcome-roadmap`](library/product-management/roadmapping/build-outcome-roadmap/) · [`build-user-story-map`](library/product-management/roadmapping/build-user-story-map/) · [`decline-feature-request`](library/product-management/roadmapping/decline-feature-request/) |
| User feedback | 10 | [`analyze-cancellation-feedback`](library/product-management/user-feedback/analyze-cancellation-feedback/) · [`analyze-user-feedback`](library/product-management/user-feedback/analyze-user-feedback/) · [`close-feedback-loop`](library/product-management/user-feedback/close-feedback-loop/) |

</details>

<details><summary><b>Business and strategy</b> · 125</summary>

| Category | Entries | Try |
|---|---:|---|
| Operations | 33 | [`automate-business-workflow`](library/business/operations/automate-business-workflow/) · [`build-staff-schedule`](library/business/operations/build-staff-schedule/) · [`choose-small-business-kpis`](library/business/operations/choose-small-business-kpis/) |
| Fundraising | 27 | [`build-investor-pipeline`](library/business/fundraising/build-investor-pipeline/) · [`explain-term-sheet`](library/business/fundraising/explain-term-sheet/) · [`plan-capital-campaign`](library/business/fundraising/plan-capital-campaign/) |
| Entrepreneurship | 24 | [`evaluate-buying-a-business`](library/business/entrepreneurship/evaluate-buying-a-business/) · [`evaluate-pivot`](library/business/entrepreneurship/evaluate-pivot/) · [`find-cofounder`](library/business/entrepreneurship/find-cofounder/) |
| Customer support | 22 | [`analyze-support-tickets`](library/business/customer-support/analyze-support-tickets/) · [`build-service-recovery-playbook`](library/business/customer-support/build-service-recovery-playbook/) · [`build-support-macros`](library/business/customer-support/build-support-macros/) |
| Business strategy | 19 | [`analyze-business-model`](library/business/business-strategy/analyze-business-model/) · [`assess-competitive-advantage`](library/business/business-strategy/assess-competitive-advantage/) · [`build-annual-operating-plan`](library/business/business-strategy/build-annual-operating-plan/) |

</details>

<details><summary><b>Data analysis</b> · 132</summary>

| Category | Entries | Try |
|---|---:|---|
| Data exploration | 39 | [`analyze-discount-effectiveness`](library/data-analysis/data-exploration/analyze-discount-effectiveness/) · [`analyze-donor-data`](library/data-analysis/data-exploration/analyze-donor-data/) · [`analyze-employee-survey`](library/data-analysis/data-exploration/analyze-employee-survey/) |
| Spreadsheets | 31 | [`audit-spreadsheet-model`](library/data-analysis/spreadsheets/audit-spreadsheet-model/) · [`build-amortization-schedule`](library/data-analysis/spreadsheets/build-amortization-schedule/) · [`build-commission-calculator`](library/data-analysis/spreadsheets/build-commission-calculator/) |
| Statistics | 28 | [`analyze-ab-test-results`](library/data-analysis/statistics/analyze-ab-test-results/) · [`analyze-likert-data`](library/data-analysis/statistics/analyze-likert-data/) · [`build-composite-index`](library/data-analysis/statistics/build-composite-index/) |
| Data visualisation | 18 | [`audit-dashboard`](library/data-analysis/data-visualization/audit-dashboard/) · [`build-looker-studio-report`](library/data-analysis/data-visualization/build-looker-studio-report/) · [`choose-chart-colors`](library/data-analysis/data-visualization/choose-chart-colors/) |
| Reporting | 16 | [`automate-recurring-report`](library/data-analysis/reporting/automate-recurring-report/) · [`build-kpi-tree`](library/data-analysis/reporting/build-kpi-tree/) · [`build-metrics-glossary`](library/data-analysis/reporting/build-metrics-glossary/) |

</details>

<details><summary><b>Research and science</b> · 93</summary>

| Category | Entries | Try |
|---|---:|---|
| Scientific writing | 29 | [`appeal-journal-rejection`](library/research-science/scientific-writing/appeal-journal-rejection/) · [`choose-target-journal`](library/research-science/scientific-writing/choose-target-journal/) · [`design-research-poster`](library/research-science/scientific-writing/design-research-poster/) |
| Research methods | 23 | [`agree-authorship-order`](library/research-science/research-methods/agree-authorship-order/) · [`build-qualitative-codebook`](library/research-science/research-methods/build-qualitative-codebook/) · [`design-case-study-research`](library/research-science/research-methods/design-case-study-research/) |
| Literature review | 19 | [`appraise-study-quality`](library/research-science/literature-review/appraise-study-quality/) · [`build-literature-matrix`](library/research-science/literature-review/build-literature-matrix/) · [`build-search-string`](library/research-science/literature-review/build-search-string/) |
| Fact-checking | 13 | [`audit-ai-answer-for-errors`](library/research-science/fact-checking/audit-ai-answer-for-errors/) · [`check-health-claim`](library/research-science/fact-checking/check-health-claim/) · [`check-science-news-against-paper`](library/research-science/fact-checking/check-science-news-against-paper/) |
| Peer review | 9 | [`assess-reproducibility`](library/research-science/peer-review/assess-reproducibility/) · [`check-journal-legitimacy`](library/research-science/peer-review/check-journal-legitimacy/) · [`check-manuscript-reporting`](library/research-science/peer-review/check-manuscript-reporting/) |

</details>

<details><summary><b>Design</b> · 82</summary>

| Category | Entries | Try |
|---|---:|---|
| UI design | 24 | [`adapt-design-for-mobile`](library/design/ui-design/adapt-design-for-mobile/) · [`create-wireframe-spec`](library/design/ui-design/create-wireframe-spec/) · [`critique-ui-screen`](library/design/ui-design/critique-ui-screen/) |
| UX research | 20 | [`analyze-session-recordings`](library/design/ux-research/analyze-session-recordings/) · [`build-empathy-map`](library/design/ux-research/build-empathy-map/) · [`build-service-blueprint`](library/design/ux-research/build-service-blueprint/) |
| Graphic design | 19 | [`create-color-palette`](library/design/graphic-design/create-color-palette/) · [`create-mood-board`](library/design/graphic-design/create-mood-board/) · [`critique-graphic-design`](library/design/graphic-design/critique-graphic-design/) |
| Branding | 12 | [`build-brand-guidelines`](library/design/branding/build-brand-guidelines/) · [`build-brand-platform`](library/design/branding/build-brand-platform/) · [`build-personal-brand-identity`](library/design/branding/build-personal-brand-identity/) |
| Design systems | 7 | [`audit-design-consistency`](library/design/design-systems/audit-design-consistency/) · [`define-design-tokens`](library/design/design-systems/define-design-tokens/) · [`define-iconography`](library/design/design-systems/define-iconography/) |

</details>

<details><summary><b>Creative arts</b> · 121</summary>

| Category | Entries | Try |
|---|---:|---|
| Fiction | 31 | [`build-suspense-in-scene`](library/creative-arts/fiction/build-suspense-in-scene/) · [`check-story-continuity`](library/creative-arts/fiction/check-story-continuity/) · [`co-write-story-interactively`](library/creative-arts/fiction/co-write-story-interactively/) |
| Music | 17 | [`analyze-song-structure`](library/creative-arts/music/analyze-song-structure/) · [`explain-music-theory-concept`](library/creative-arts/music/explain-music-theory-concept/) · [`pitch-music-to-curators`](library/creative-arts/music/pitch-music-to-curators/) |
| Visual art | 13 | [`choose-art-supplies`](library/creative-arts/visual-art/choose-art-supplies/) · [`critique-artwork`](library/creative-arts/visual-art/critique-artwork/) · [`generate-sketchbook-prompts`](library/creative-arts/visual-art/generate-sketchbook-prompts/) |
| Screenwriting | 12 | [`adapt-story-for-screen`](library/creative-arts/screenwriting/adapt-story-for-screen/) · [`develop-tv-series-concept`](library/creative-arts/screenwriting/develop-tv-series-concept/) · [`format-screenplay-scene`](library/creative-arts/screenwriting/format-screenplay-scene/) |
| Worldbuilding | 11 | [`build-magic-system`](library/creative-arts/worldbuilding/build-magic-system/) · [`build-series-bible`](library/creative-arts/worldbuilding/build-series-bible/) · [`build-world-timeline`](library/creative-arts/worldbuilding/build-world-timeline/) |
| Life writing | 10 | [`draft-memoir-scene`](library/creative-arts/life-writing/draft-memoir-scene/) · [`interview-relative-for-oral-history`](library/creative-arts/life-writing/interview-relative-for-oral-history/) · [`plan-genealogy-research`](library/creative-arts/life-writing/plan-genealogy-research/) |
| Photography | 10 | [`choose-camera-gear`](library/creative-arts/photography/choose-camera-gear/) · [`choose-camera-settings`](library/creative-arts/photography/choose-camera-settings/) · [`critique-photograph`](library/creative-arts/photography/critique-photograph/) |
| Poetry | 9 | [`analyze-poem`](library/creative-arts/poetry/analyze-poem/) · [`critique-poem`](library/creative-arts/poetry/critique-poem/) · [`generate-poetry-prompts`](library/creative-arts/poetry/generate-poetry-prompts/) |
| Image generation | 8 | [`build-image-style-guide`](library/creative-arts/image-generation/build-image-style-guide/) · [`create-storyboard`](library/creative-arts/image-generation/create-storyboard/) · [`plan-ai-art-series`](library/creative-arts/image-generation/plan-ai-art-series/) |

</details>

<details><summary><b>Writing and communication</b> · 149</summary>

| Category | Entries | Try |
|---|---:|---|
| Interpersonal communication | 33 | [`adapt-message-for-culture`](library/writing-communication/interpersonal-communication/adapt-message-for-culture/) · [`apologize-effectively`](library/writing-communication/interpersonal-communication/apologize-effectively/) · [`ask-for-a-favor`](library/writing-communication/interpersonal-communication/ask-for-a-favor/) |
| Email | 31 | [`ask-for-feedback-by-email`](library/writing-communication/email/ask-for-feedback-by-email/) · [`build-email-templates`](library/writing-communication/email/build-email-templates/) · [`correct-email-mistake`](library/writing-communication/email/correct-email-mistake/) |
| Business writing | 28 | [`ask-for-help-in-team-chat`](library/writing-communication/business-writing/ask-for-help-in-team-chat/) · [`plan-change-communications`](library/writing-communication/business-writing/plan-change-communications/) · [`write-annual-report-letter`](library/writing-communication/business-writing/write-annual-report-letter/) |
| Editing | 28 | [`build-self-editing-checklist`](library/writing-communication/editing/build-self-editing-checklist/) · [`build-style-sheet`](library/writing-communication/editing/build-style-sheet/) · [`capture-writing-voice`](library/writing-communication/editing/capture-writing-voice/) |
| Public speaking | 15 | [`craft-personal-story`](library/writing-communication/public-speaking/craft-personal-story/) · [`critique-speech-recording`](library/writing-communication/public-speaking/critique-speech-recording/) · [`develop-idea-talk`](library/writing-communication/public-speaking/develop-idea-talk/) |
| Presentations | 14 | [`convert-slides-to-handout`](library/writing-communication/presentations/convert-slides-to-handout/) · [`critique-slide-deck`](library/writing-communication/presentations/critique-slide-deck/) · [`make-presentation-accessible`](library/writing-communication/presentations/make-presentation-accessible/) |

</details>

<details><summary><b>Career and HR</b> · 126</summary>

| Category | Entries | Try |
|---|---:|---|
| Job search | 26 | [`accept-job-offer-in-writing`](library/career-hr/job-search/accept-job-offer-in-writing/) · [`address-selection-criteria`](library/career-hr/job-search/address-selection-criteria/) · [`analyze-job-posting`](library/career-hr/job-search/analyze-job-posting/) |
| People management | 25 | [`address-underperformance-early`](library/career-hr/people-management/address-underperformance-early/) · [`allocate-merit-increases`](library/career-hr/people-management/allocate-merit-increases/) · [`build-career-ladder`](library/career-hr/people-management/build-career-ladder/) |
| Career growth | 23 | [`ask-for-raise`](library/career-hr/career-growth/ask-for-raise/) · [`build-development-plan`](library/career-hr/career-growth/build-development-plan/) · [`find-mentor`](library/career-hr/career-growth/find-mentor/) |
| Interview preparation | 19 | [`answer-salary-expectations`](library/career-hr/interview-prep/answer-salary-expectations/) · [`debrief-interview`](library/career-hr/interview-prep/debrief-interview/) · [`explain-job-loss-in-interview`](library/career-hr/interview-prep/explain-job-loss-in-interview/) |
| Hiring | 18 | [`design-interview-loop`](library/career-hr/hiring/design-interview-loop/) · [`plan-first-hire`](library/career-hr/hiring/plan-first-hire/) · [`plan-internship-program`](library/career-hr/hiring/plan-internship-program/) |
| Résumés | 15 | [`check-resume-ats-readiness`](library/career-hr/resumes/check-resume-ats-readiness/) · [`convert-cv-to-country-format`](library/career-hr/resumes/convert-cv-to-country-format/) · [`optimize-linkedin-profile`](library/career-hr/resumes/optimize-linkedin-profile/) |

</details>

<details><summary><b>Finance</b> · 115</summary>

| Category | Entries | Try |
|---|---:|---|
| Financial planning | 30 | [`build-net-worth-statement`](library/finance/financial-planning/build-net-worth-statement/) · [`compare-loan-offers`](library/finance/financial-planning/compare-loan-offers/) · [`compare-mortgage-options`](library/finance/financial-planning/compare-mortgage-options/) |
| Accounting | 27 | [`analyze-customer-profitability`](library/finance/accounting/analyze-customer-profitability/) · [`analyze-working-capital`](library/finance/accounting/analyze-working-capital/) · [`build-small-business-budget`](library/finance/accounting/build-small-business-budget/) |
| Taxes | 24 | [`check-sales-tax-obligations`](library/finance/taxes/check-sales-tax-obligations/) · [`check-tax-withholding`](library/finance/taxes/check-tax-withholding/) · [`estimate-annual-tax-bill`](library/finance/taxes/estimate-annual-tax-bill/) |
| Investing (education) | 18 | [`analyze-rental-property`](library/finance/investing/analyze-rental-property/) · [`check-portfolio-diversification`](library/finance/investing/check-portfolio-diversification/) · [`choose-financial-advisor`](library/finance/investing/choose-financial-advisor/) |
| Budgeting | 16 | [`budget-for-holidays-and-gifts`](library/finance/budgeting/budget-for-holidays-and-gifts/) · [`budget-for-university`](library/finance/budgeting/budget-for-university/) · [`budget-irregular-income`](library/finance/budgeting/budget-irregular-income/) |

</details>

<details><summary><b>Legal and admin</b> · 110</summary>

| Category | Entries | Try |
|---|---:|---|
| Legal correspondence | 23 | [`appeal-benefits-decision`](library/legal-admin/legal-correspondence/appeal-benefits-decision/) · [`appeal-insurance-denial`](library/legal-admin/legal-correspondence/appeal-insurance-denial/) · [`appeal-parking-ticket`](library/legal-admin/legal-correspondence/appeal-parking-ticket/) |
| Contracts | 21 | [`build-contract-obligations-register`](library/legal-admin/contracts/build-contract-obligations-register/) · [`compare-contract-versions`](library/legal-admin/contracts/compare-contract-versions/) · [`draft-simple-agreement`](library/legal-admin/contracts/draft-simple-agreement/) |
| Paperwork | 21 | [`apply-for-trademark`](library/legal-admin/paperwork/apply-for-trademark/) · [`check-business-licences`](library/legal-admin/paperwork/check-business-licences/) · [`check-landlord-obligations`](library/legal-admin/paperwork/check-landlord-obligations/) |
| Legal practice | 19 | [`brief-court-case`](library/legal-admin/legal-practice/brief-court-case/) · [`build-damages-schedule`](library/legal-admin/legal-practice/build-damages-schedule/) · [`build-law-course-outline`](library/legal-admin/legal-practice/build-law-course-outline/) |
| Compliance | 14 | [`answer-security-questionnaire`](library/legal-admin/compliance/answer-security-questionnaire/) · [`assess-ai-act-obligations`](library/legal-admin/compliance/assess-ai-act-obligations/) · [`audit-website-privacy-compliance`](library/legal-admin/compliance/audit-website-privacy-compliance/) |
| Policies and terms | 12 | [`write-accessibility-statement`](library/legal-admin/policies/write-accessibility-statement/) · [`write-ai-use-policy`](library/legal-admin/policies/write-ai-use-policy/) · [`write-conflict-of-interest-policy`](library/legal-admin/policies/write-conflict-of-interest-policy/) |

</details>

<details><summary><b>Health and wellbeing</b> · 153</summary>

| Category | Entries | Try |
|---|---:|---|
| Mental health | 39 | [`build-connection-plan`](library/health-wellbeing/mental-health/build-connection-plan/) · [`build-coping-plan`](library/health-wellbeing/mental-health/build-coping-plan/) · [`build-mood-tracker`](library/health-wellbeing/mental-health/build-mood-tracker/) |
| Fitness | 34 | [`adapt-exercise-for-condition`](library/health-wellbeing/fitness/adapt-exercise-for-condition/) · [`assess-fitness-baseline`](library/health-wellbeing/fitness/assess-fitness-baseline/) · [`build-training-plan`](library/health-wellbeing/fitness/build-training-plan/) |
| Medical visit preparation | 32 | [`access-healthcare-abroad`](library/health-wellbeing/medical-prep/access-healthcare-abroad/) · [`build-medication-list`](library/health-wellbeing/medical-prep/build-medication-list/) · [`build-symptom-log`](library/health-wellbeing/medical-prep/build-symptom-log/) |
| Clinical practice | 29 | [`draft-discharge-summary`](library/health-wellbeing/clinical-practice/draft-discharge-summary/) · [`plan-breaking-bad-news`](library/health-wellbeing/clinical-practice/plan-breaking-bad-news/) · [`plan-clinical-audit`](library/health-wellbeing/clinical-practice/plan-clinical-audit/) |
| Nutrition | 19 | [`analyze-diet-log`](library/health-wellbeing/nutrition/analyze-diet-log/) · [`compare-diet-approaches`](library/health-wellbeing/nutrition/compare-diet-approaches/) · [`evaluate-supplement`](library/health-wellbeing/nutrition/evaluate-supplement/) |

</details>

<details><summary><b>Cooking and home</b> · 126</summary>

| Category | Entries | Try |
|---|---:|---|
| Cooking | 30 | [`adapt-recipe`](library/home-cooking/cooking/adapt-recipe/) · [`adjust-recipe-for-altitude`](library/home-cooking/cooking/adjust-recipe-for-altitude/) · [`check-food-safety`](library/home-cooking/cooking/check-food-safety/) |
| Home improvement | 29 | [`build-home-inventory`](library/home-cooking/home-improvement/build-home-inventory/) · [`build-house-viewing-checklist`](library/home-cooking/home-improvement/build-house-viewing-checklist/) · [`childproof-home`](library/home-cooking/home-improvement/childproof-home/) |
| Meal planning | 19 | [`build-grocery-list-from-recipes`](library/home-cooking/meal-planning/build-grocery-list-from-recipes/) · [`organise-potluck`](library/home-cooking/meal-planning/organise-potluck/) · [`plan-budget-meals`](library/home-cooking/meal-planning/plan-budget-meals/) |
| Pet care | 17 | [`build-pet-emergency-plan`](library/home-cooking/pet-care/build-pet-emergency-plan/) · [`care-for-senior-pet`](library/home-cooking/pet-care/care-for-senior-pet/) · [`choose-pet-for-lifestyle`](library/home-cooking/pet-care/choose-pet-for-lifestyle/) |
| Gardening | 16 | [`build-garden-calendar`](library/home-cooking/gardening/build-garden-calendar/) · [`build-raised-bed-plan`](library/home-cooking/gardening/build-raised-bed-plan/) · [`design-garden-border`](library/home-cooking/gardening/design-garden-border/) |
| Vehicles | 15 | [`check-car-before-road-trip`](library/home-cooking/vehicles/check-car-before-road-trip/) · [`choose-bike`](library/home-cooking/vehicles/choose-bike/) · [`compare-car-insurance`](library/home-cooking/vehicles/compare-car-insurance/) |

</details>

<details><summary><b>Travel</b> · 54</summary>

| Category | Entries | Try |
|---|---:|---|
| Trip planning | 26 | [`choose-accommodation`](library/travel/trip-planning/choose-accommodation/) · [`choose-destination`](library/travel/trip-planning/choose-destination/) · [`choose-ethical-volunteer-trip`](library/travel/trip-planning/choose-ethical-volunteer-trip/) |
| Travel logistics | 19 | [`beat-jet-lag`](library/travel/travel-logistics/beat-jet-lag/) · [`build-packing-list`](library/travel/travel-logistics/build-packing-list/) · [`check-destination-safety`](library/travel/travel-logistics/check-destination-safety/) |
| Local culture | 9 | [`check-local-festivals-and-holidays`](library/travel/local-culture/check-local-festivals-and-holidays/) · [`decode-foreign-menu`](library/travel/local-culture/decode-foreign-menu/) · [`learn-destination-history`](library/travel/local-culture/learn-destination-history/) |

</details>

<details><summary><b>Parenting and family</b> · 60</summary>

| Category | Entries | Try |
|---|---:|---|
| Parenting | 26 | [`build-reading-routine-with-child`](library/parenting-family/parenting/build-reading-routine-with-child/) · [`choose-childcare`](library/parenting-family/parenting/choose-childcare/) · [`explain-hard-topic-to-child`](library/parenting-family/parenting/explain-hard-topic-to-child/) |
| Family logistics | 13 | [`build-care-rota`](library/parenting-family/family-logistics/build-care-rota/) · [`coordinate-family-calendar`](library/parenting-family/family-logistics/coordinate-family-calendar/) · [`create-chore-chart`](library/parenting-family/family-logistics/create-chore-chart/) |
| Relationships | 12 | [`choose-meaningful-gift`](library/parenting-family/relationships/choose-meaningful-gift/) · [`plan-anniversary`](library/parenting-family/relationships/plan-anniversary/) · [`plan-date-night`](library/parenting-family/relationships/plan-date-night/) |
| Kids' activities | 9 | [`create-kids-craft`](library/parenting-family/kids-activities/create-kids-craft/) · [`design-kids-science-experiment`](library/parenting-family/kids-activities/design-kids-science-experiment/) · [`invent-learning-game`](library/parenting-family/kids-activities/invent-learning-game/) |

</details>

<details><summary><b>Productivity and personal life</b> · 132</summary>

| Category | Entries | Try |
|---|---:|---|
| Task management | 20 | [`audit-time-use`](library/productivity/task-management/audit-time-use/) · [`break-down-big-task`](library/productivity/task-management/break-down-big-task/) · [`build-reusable-checklist`](library/productivity/task-management/build-reusable-checklist/) |
| Decision-making | 18 | [`build-decision-tree`](library/productivity/decision-making/build-decision-tree/) · [`check-decision-for-biases`](library/productivity/decision-making/check-decision-for-biases/) · [`choose-productivity-app`](library/productivity/decision-making/choose-productivity-app/) |
| Meetings | 17 | [`design-meeting-cadence`](library/productivity/meetings/design-meeting-cadence/) · [`facilitate-tense-meeting`](library/productivity/meetings/facilitate-tense-meeting/) · [`find-meeting-time-across-time-zones`](library/productivity/meetings/find-meeting-time-across-time-zones/) |
| Tech help | 16 | [`automate-personal-routine`](library/productivity/tech-help/automate-personal-routine/) · [`check-used-device`](library/productivity/tech-help/check-used-device/) · [`choose-computer-specs`](library/productivity/tech-help/choose-computer-specs/) |
| Habits and goals | 15 | [`beat-procrastination`](library/productivity/habits/beat-procrastination/) · [`break-bad-habit`](library/productivity/habits/break-bad-habit/) · [`build-reading-habit`](library/productivity/habits/build-reading-habit/) |
| Digital safety | 13 | [`check-online-shop-legitimacy`](library/productivity/digital-safety/check-online-shop-legitimacy/) · [`check-phone-for-stalkerware`](library/productivity/digital-safety/check-phone-for-stalkerware/) · [`check-suspicious-message`](library/productivity/digital-safety/check-suspicious-message/) |
| Summarisation | 13 | [`build-news-digest`](library/productivity/summarization/build-news-digest/) · [`build-timeline-from-documents`](library/productivity/summarization/build-timeline-from-documents/) · [`catch-up-after-leave`](library/productivity/summarization/catch-up-after-leave/) |
| Brainstorming | 10 | [`brainstorm-ideas`](library/productivity/brainstorming/brainstorm-ideas/) · [`cluster-ideas`](library/productivity/brainstorming/cluster-ideas/) · [`facilitate-group-brainstorm`](library/productivity/brainstorming/facilitate-group-brainstorm/) |
| Note-taking | 10 | [`build-personal-crm`](library/productivity/note-taking/build-personal-crm/) · [`build-team-wiki-structure`](library/productivity/note-taking/build-team-wiki-structure/) · [`design-second-brain`](library/productivity/note-taking/design-second-brain/) |

</details>

<details><summary><b>Gaming and fun</b> · 54</summary>

| Category | Entries | Try |
|---|---:|---|
| Tabletop RPGs | 18 | [`balance-combat-encounter`](library/gaming-fun/tabletop-rpg/balance-combat-encounter/) · [`build-rpg-character`](library/gaming-fun/tabletop-rpg/build-rpg-character/) · [`convert-adventure-between-systems`](library/gaming-fun/tabletop-rpg/convert-adventure-between-systems/) |
| Video games | 11 | [`design-game-economy`](library/gaming-fun/video-games/design-game-economy/) · [`design-game-level`](library/gaming-fun/video-games/design-game-level/) · [`design-game-mechanic`](library/gaming-fun/video-games/design-game-mechanic/) |
| Puzzles | 10 | [`analyze-chess-game`](library/gaming-fun/puzzles/analyze-chess-game/) · [`create-escape-room-puzzles`](library/gaming-fun/puzzles/create-escape-room-puzzles/) · [`create-scavenger-hunt`](library/gaming-fun/puzzles/create-scavenger-hunt/) |
| Humour | 8 | [`plan-improv-session`](library/gaming-fun/humor/plan-improv-session/) · [`punch-up-with-humor`](library/gaming-fun/humor/punch-up-with-humor/) · [`write-comedy-bit`](library/gaming-fun/humor/write-comedy-bit/) |
| Trivia and quizzes | 7 | [`create-custom-bingo`](library/gaming-fun/trivia/create-custom-bingo/) · [`create-party-game-cards`](library/gaming-fun/trivia/create-party-game-cards/) · [`host-trivia-night`](library/gaming-fun/trivia/host-trivia-night/) |

</details>

<details><summary><b>Prompting and assistants</b> · 64</summary>

| Category | Entries | Try |
|---|---:|---|
| Prompt engineering | 28 | [`adapt-prompt-for-reasoning-model`](library/prompting/prompt-engineering/adapt-prompt-for-reasoning-model/) · [`adapt-prompt-for-small-model`](library/prompting/prompt-engineering/adapt-prompt-for-small-model/) · [`build-ai-output-review-checklist`](library/prompting/prompt-engineering/build-ai-output-review-checklist/) |
| Output styles | 23 | [`academic`](library/prompting/output-styles/academic/) · [`annotated`](library/prompting/output-styles/annotated/) · [`beginner-friendly`](library/prompting/output-styles/beginner-friendly/) |
| Assistant setup | 13 | [`build-project-instructions`](library/prompting/assistant-setup/build-project-instructions/) · [`choose-ai-tool`](library/prompting/assistant-setup/choose-ai-tool/) · [`map-ai-use-cases`](library/prompting/assistant-setup/map-ai-use-cases/) |

</details>

<details><summary><b>Other (holding area)</b> · 7</summary>

| Category | Entries | Try |
|---|---:|---|
| Unsorted (holding area) | 7 | [`outline-nonfiction-book`](library/other/unsorted/outline-nonfiction-book/) · [`plan-knitting-project`](library/other/unsorted/plan-knitting-project/) · [`plan-sewing-project`](library/other/unsorted/plan-sewing-project/) |

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
