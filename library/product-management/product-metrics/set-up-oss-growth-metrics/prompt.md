---
schema: 1
id: set-up-oss-growth-metrics
kind: prompt
title: Set up growth metrics for an open-source project without telemetry
description: Defines the handful of public, telemetry-free metrics that show an open-source project's adoption and community health, with collection commands, a weekly archive and leading versus vanity signals.
category: product-metrics
version: 1.1.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate, data-analyst]
requires: [none]
inputs: [text, repo]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, no-telemetry, github-traffic, download-stats, chaoss, growth-metrics]
pairs_with:
  prompts: [review-weekly-growth-numbers, audit-contributor-funnel, define-north-star-metric]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: Repo URL or owner/name, where it is distributed (GitHub releases, npm, PyPI, crates.io, Homebrew, Docker Hub, an editor marketplace, a website), whether you have repo admin or write access, and any site analytics already in place.
    type: text
    required: true
  - name: goal
    description: The outcome you care about most this year.
    type: string
    default: more people successfully using the project, and a few of them contributing
output_contract:
  format: markdown
  sections: [North-star and inputs, Metric definitions, Collection, Weekly archive, What not to track]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Token guidance for the weekly archive job."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Open-source projects can measure adoption well without adding telemetry to the software. Public and owner-visible sources include: GitHub traffic (views, unique visitors, clones, top referrers and popular paths), which is kept for only 14 days and needs push access, so it must be archived on a schedule; release asset download counts; registry download statistics (the npm downloads API, PyPI statistics through public services or the public BigQuery dataset, crates.io, Docker Hub pulls); Homebrew's public install analytics; the dependents ("Used by") graph; stars over time; issues, pull requests and their authors; and cookie-free website analytics. CHAOSS defines community metrics such as time to first response and new contributors. Stars are a weak signal: millions of fake stars have been identified, three in four developers still look at the count, and promotion raises stars far more than contributors. Adding default-on telemetry for growth has caused backlash and reversals in established projects.
</context>

<task>
<project>
{{project}}
</project>
Goal: {{goal}}.

If you cannot tell where the project is distributed or whether the user can read its traffic data, ask and stop.

1. **North-star and inputs.** Propose one north-star metric tied to {{goal}} that can be measured from public or owner-visible data (for example weekly downloads of the latest major version, or monthly new issue authors who are not maintainers), and four to six input metrics that move it. Explain why each is a leading or lagging signal.
2. **Metric definitions.** For each metric: exact definition, source, granularity, known distortions (mirrors and CI inflate downloads; bots inflate clones; AI-generated issues inflate activity; stars can be bought) and how to correct for them.
3. **Collection.** For each source available to this project, give the exact command or API call to collect it, for example `gh api repos/OWNER/REPO/traffic/views`, `.../traffic/clones`, `.../traffic/popular/referrers`, `.../traffic/popular/paths`, the releases endpoint summing each asset's `download_count`, the npm downloads range endpoint, and the Homebrew analytics JSON. Mark any endpoint you are not sure of as [CHECK] and point to its documentation.
4. **Weekly archive.** Design a small archive: a scheduled job (for example a GitHub Actions workflow on a weekly cron using a fine-grained token with the repository permission the traffic API requires; the default workflow token may not be enough, so tell the user to check the API documentation) that appends each week's numbers to a CSV in a separate branch or repository. Give the CSV columns. Say what it must never collect (personal data about visitors or users).
5. **What not to track.** List metrics to drop or demote (raw star totals as a goal, follower counts, total clones), and say why.
</task>

<constraints>
- No telemetry in the software, no tracking pixels in READMEs, no scraping personal data of stargazers or users.
- Do not invent current values; leave a column for the user to fill.
- Commands are for the user to run; do not claim you ran them.
</constraints>

<output_format>
## North-star and inputs
## Metric definitions
| Metric | Definition | Source | Leading or lagging | Distortions |
## Collection
Commands and endpoints, per source.
## Weekly archive
Job outline and CSV columns.
## What not to track
</output_format>
