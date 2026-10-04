---
schema: 1
id: write-ownership-handover-doc
kind: prompt
title: Write an ownership handover doc
description: Writes the handover for a system whose owner is leaving or changing team, with what it does, where it runs, deploy and rollback, known issues, jobs, where secrets live and a first-week checklist.
category: docs
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [software-engineer, tech-lead, sre, engineering-manager]
stack: []
requires: [none]
inputs: [notes, document, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [handover, knowledge-transfer, service-ownership, bus-factor, offboarding]
pairs_with:
  prompts: [write-runbook, write-onboarding-guide]
args:
  - name: system_notes
    description: Brain dump about the system - purpose, users, repos, infrastructure, dashboards, how you deploy, scheduled jobs, things that break, workarounds, people who depend on it, open work. Fragments are fine.
    type: text
    required: true
  - name: new_owner_level
    description: peer means an engineer of similar experience on the same team, junior means less experienced, other-team means someone without your team's context.
    type: enum
    enum: [peer, junior, other-team]
    default: peer
  - name: handover_date
    description: Your last day as owner, so the plan can include overlap time.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Handover document, First-week checklist, Before you leave, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an owner leaves, most of what matters about a system lives in their head: why it is built the odd way it is, which alert can be ignored, which job must never run twice, who to call at the vendor. Handover docs fail when they describe the architecture but not how to operate it, skip the scary parts (manual steps, fragile jobs, expiring certificates), point at secrets by pasting them, or end with no way for the new owner to check they are ready. New owner: {{new_owner_level}}. Handover date: {{handover_date}}.
</context>

<task>
<system_notes>
{{system_notes}}
</system_notes>

1. Write the handover document:
   - purpose and users: what the system does in two sentences, who depends on it, and what happens to them if it is down for an hour or a day;
   - map: repositories, services, data stores, infrastructure and environments, with links as placeholders where not given;
   - operate: how to deploy, verify and roll back, step by step; dashboards and alerts that matter, and which alerts are noisy and why;
   - scheduled and manual work: cron jobs, batch runs, certificate and key expiry dates, renewals, licences, recurring manual steps, with timing and what breaks if missed;
   - secrets and access: where each credential lives (vault path, secrets manager name) and who grants access - never the values;
   - known issues and history: open bugs, workarounds, tech debt, and decisions that look strange but are deliberate, with the reason;
   - people: stakeholders, upstream and downstream teams, vendor contacts, and who to ask for what;
   - open work: in-flight changes, promises made to other teams, and their status.
2. Adjust depth to the new owner: for junior, explain terms and add why behind each procedure; for other-team, add a short context section on the domain and team conventions; for peer, keep it terse.
3. Write a first-week checklist for the new owner that proves readiness by doing: get access, run a deploy with the old owner watching, roll back in staging, find each dashboard, trigger or review a recent alert, run each manual job once.
4. List what the leaving owner must do before leaving: transfer access and ownership in tools (code owners, on-call schedule, alert routing, vendor accounts, calendars), record a walkthrough, and remove their personal access afterwards.
5. List gaps the notes do not cover, ordered by risk.
</task>

<constraints>
- Never include passwords, tokens, keys or connection strings, even if they appear in the notes; replace with where they live and flag that they were exposed so they can be rotated.
- Use only facts from the notes; mark missing links, names and dates as [X].
- Write every procedure as numbered steps with the expected result of each, not as prose.
- Keep it honest about risk: if something only the leaving owner knows how to do, say so plainly.
</constraints>

<output_format>
## Handover document
Markdown with the headings from step 1, a table for scheduled work (job, schedule, what it does, if it fails), and a table for contacts (who, role, ask them about).
## First-week checklist
Checkbox list with a done-when for each item.
## Before you leave
Checkbox list for the leaving owner.
## Gaps
Numbered by risk, each with a question to answer before the handover date.
</output_format>
