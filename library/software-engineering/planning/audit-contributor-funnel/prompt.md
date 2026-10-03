---
schema: 1
id: audit-contributor-funnel
kind: prompt
title: Audit an open-source contributor funnel
description: Finds where would-be contributors drop off, from first visit to a second merged PR, using public repo data, and ranks fixes by maintainer hours. Use when contributors do not stick.
category: planning
version: 1.0.0
status: incubating
stage: [review, plan]
role: [maintainer, tech-lead, developer-advocate]
requires: [repo-read]
inputs: [repo, dataset, text]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, contributor-funnel, chaoss, time-to-first-response, newcomers, bus-factor]
pairs_with:
  prompts: [write-good-first-issues, reply-to-first-contribution, write-contributing-guide, triage-issue-backlog]
  personas: [open-source-maintainer]
args:
  - name: repo_data
    description: What you have on the last 3 to 12 months - issues and PRs with open, first-response and close dates and author type, contributor counts, CONTRIBUTING and setup docs, labels in use. Exports, gh output or a summary all work.
    type: text
    required: true
  - name: maintainer_capacity
    description: How many people review and how many hours a week they really have.
    type: string
  - name: goal
    description: What a healthier funnel should achieve.
    type: string
    default: more people who make a second contribution
output_contract:
  format: markdown
  sections: [Funnel, Leaks, Fixes, Metrics to track, Data gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Contributors move through stages: user, issue reporter, first pull request, merged first PR, second contribution, regular. Research on newcomers lists dozens of barriers, mostly in how they are received, oriented and documented, and technical hurdles such as setup. The CHAOSS project defines public metrics for this: time to first response (excluding bots), change request closure ratio, new contributors, and the contributor absence factor (the fewest people responsible for half the contributions). Most popular developer tools have many users and few contributors, so the goal is a realistic, sustainable flow, not a crowd. Since 2025, AI-generated issues and pull requests inflate activity counts, so look at who the authors are before trusting volumes. Events that reward contribution counts tend to attract spam unless maintainers gate what counts.
</context>

<task>
<repo_data>
{{repo_data}}
</repo_data>
{{#maintainer_capacity}}Maintainer capacity: {{maintainer_capacity}}.{{/maintainer_capacity}}
Goal: {{goal}}.

If the data has no dates or no way to tell first-time authors from regulars, say what is missing and give the exact data to collect (for example the GitHub search queries or `gh` commands for issues and PRs with author association), then audit what you can.

1. **Build the funnel** for the period: counts at each stage, conversion between stages, and how many first-time PR authors came back for a second contribution. Show the formulas.
2. **Measure response.** Median and 90th-percentile time to first human response for issues and for first-time PRs, compared with regular contributors' PRs. Flag first PRs that never got a response.
3. **Find the leaks.** For each stage with a big drop, list likely causes from the evidence: slow or no response, unclear scope, a long or broken setup, missing or stale starter issues, review rounds that drag on, unwritten rules (sign-off, changelog), a hostile or dismissive thread. Quote the evidence for each and mark guesses as inferences.
4. **Check concentration.** Compute the contributor absence factor and name the single points of failure (one reviewer, one person who can release).
5. **Rank fixes** by effect on {{goal}} per maintainer hour, sized to the stated capacity. Prefer cheap structural fixes (issue forms, a saved-reply set, a review rota, a one-command setup, a "who to ask" section) over campaigns.
6. **Set the metrics** to track monthly, with targets that capacity can sustain.
</task>

<constraints>
- Use only the data given; do not invent counts or rates.
- Do not recommend reward-for-count events, contributor leaderboards that pay for volume, or any tactic that would load maintainers with low-quality work.
- Do not single out individual contributors negatively by name.
{{> output/uncertainty}}
</constraints>

<output_format>
## Funnel
| Stage | Count | Conversion from previous |
## Leaks
For each: stage, evidence, likely cause, confidence.
## Fixes
| # | Fix | Leak it addresses | Maintainer hours | Expected effect |
## Metrics to track
| Metric | Definition | Current | Target | How to collect |
## Data gaps
</output_format>
