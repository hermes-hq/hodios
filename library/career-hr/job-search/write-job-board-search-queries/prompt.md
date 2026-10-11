---
schema: 1
id: write-job-board-search-queries
kind: prompt
title: Write job board search queries
description: Writes Boolean search queries, filters and saved alerts for job boards such as LinkedIn and Indeed that surface relevant postings and cut out the noise for a job seeker.
category: job-search
version: 1.0.0
status: incubating
stage: [discover]
role: [job-seeker]
requires: [none]
inputs: [preferences, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [boolean-search, job-alerts, job-boards, keywords, filters]
pairs_with:
  prompts: [find-job-titles-for-my-skills, prioritize-job-applications, set-up-job-application-tracker]
args:
  - name: target
    description: The roles and level you want, key skills or tools, location or remote, and contract type.
    type: text
    required: true
  - name: exclusions
    description: Optional - what keeps showing up that you do not want (wrong seniority, sales roles, agencies, specific industries, unpaid roles).
    type: text
  - name: boards
    description: The job boards you use (for example LinkedIn, Indeed, a national or sector board).
    type: string
    default: "LinkedIn and Indeed"
output_contract:
  format: markdown
  sections: [Query building blocks, Queries, Filters to set, Alerts, Tuning, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a researcher who builds job searches. A plain keyword search on a big board returns hundreds of loosely matched postings sorted for the board's benefit, so people either scroll endlessly or miss the right roles. Good searches combine title variants with OR, require one or two core skills with AND, exclude recurring noise with NOT, put multi-word phrases in quotes, and use the board's own filters (date posted, location radius, remote, experience level) instead of keywords where those filters exist. Operator support differs between boards and changes over time: some support full Boolean in the keyword box, some ignore parentheses or only partly support exclusions, so every query must be tested. Narrow daily alerts beat broad weekly ones, because many postings get most of their applications in the first days.

<target>
{{target}}
</target>
{{#exclusions}}
<exclusions>
{{exclusions}}
</exclusions>
{{/exclusions}}
Boards: {{boards}}
</context>

<task>
1. Query building blocks: list title variants (including different seniority words and regional spellings), core skills or tools, and exclusion terms drawn from the target and exclusions.
2. Queries: write 3 to 5 queries, from narrow (exact title phrases plus one core skill) to broad (adjacent titles), each with what it is for. Use AND, OR, NOT, quotes and parentheses in uppercase Boolean form. Keep each query short enough for a board's keyword box.
3. For each board in {{boards}}, give a simplified fallback version of the main query in case the board does not support full Boolean, and say to test whether exclusions and parentheses work by comparing result counts.
4. Filters to set: date posted, location and radius or remote, experience level, job type, and sort by most recent. Say which filters do the work better than keywords.
5. Alerts: which queries to save as alerts, how often (daily for the narrow ones), and how many alerts to keep so the inbox stays useful.
6. Tuning: how to read the first results: if a query returns mostly irrelevant roles, which term to tighten; if it returns almost nothing, which to loosen. Add a weekly check to retire alerts that never produce a good posting.
7. Limits: one or two lines on what board search cannot find (roles filled through referrals, company career pages, recruiters) and to pair it with direct sources.
</task>

<constraints>
- Do not claim a board supports a specific operator or filter as fact; say to test, because features change.
- Do not invent job board names. Use the boards given; mention other types of boards only generically.
- Keep queries valid: balanced quotes and parentheses, uppercase operators.
- Exclusions must not knock out good roles; warn when a NOT term is risky (for example NOT "senior" also removes postings that say "reports to a senior manager").
</constraints>

<output_format>
## Query building blocks
## Queries
Table: Query | Purpose | Expect.
Each query also in a code block for copying.
## Filters to set
## Alerts
## Tuning
Table: If results look like this | Change.
## Limits
</output_format>
