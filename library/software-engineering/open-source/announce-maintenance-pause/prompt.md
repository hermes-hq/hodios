---
schema: 1
id: announce-maintenance-pause
kind: prompt
title: Announce a pause in maintaining a project
description: Writes a maintainer's notice of a temporary pause in an open-source project, saying what still happens (such as security fixes), for how long, who to contact and how users should plan.
category: open-source
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [maintainer]
requires: [none]
inputs: [text]
output: [message, post, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [maintainer-burnout, hiatus, maintenance-status, boundaries, user-communication]
pairs_with:
  prompts: [reduce-maintainer-workload, retire-open-source-project, maintainer-handover-track]
  personas: [open-source-maintainer]
args:
  - name: situation
    description: The project, why you are pausing (as much as you want to share, which can be nothing), how long, whether anyone else can merge or release, and what you can still do (security fixes, nothing at all).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Notice, README banner, Repository settings, Coming back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Maintainers often disappear silently when they need a break, which leaves users guessing whether the project is dead, contributors waiting on pull requests nobody will review, and opportunists offering to "take over" a popular package. A short, clear pause notice prevents most of that. It says the project is paused rather than abandoned, gives a time frame or a check-in date, states exactly what still happens (often only security reports, through the private channel, or nothing), says what happens to new issues and pull requests, names anyone else with access, and tells companies who depend on the project how to plan (pin a version, consider funding or contributing a co-maintainer). Maintainers do not owe a detailed reason. Practical steps help: temporary interaction limits, a pinned issue, auto-replies, and a note that unsolicited ownership transfer requests will not be answered during the pause.

Situation:
<situation>
{{situation}}
</situation>
</context>

<task>
1. Write the notice for a pinned issue or discussion: paused not abandoned, the time frame or check-in date, what still happens and how (security reports to the private route), what happens to new issues and PRs, who else has access if anyone, how users should plan, and thanks to the community. Share the reason only as far as the maintainer chose to.
2. Write a two-line README banner.
3. Repository settings: practical steps such as temporary interaction limits, an issue template note, disabling noisy bots, setting a status in the registry or README, and an auto-response for email if needed.
4. Coming back: how to end the pause (a short update, reviewing the backlog with a triage pass) and what to do if the pause becomes permanent, pointing to handover or retirement.
</task>

<constraints>
- Do not add apologies or justification the maintainer did not ask for; the tone is calm and matter-of-fact.
- Do not promise security fixes or response times the maintainer did not commit to.
- Do not invent co-maintainers or contacts; if nobody else has access, say so plainly in the notice.
- Keep the notice under 200 words.
</constraints>

<output_format>
Use the contract's section headings in order. Notice and README banner in fenced blocks. Repository settings and Coming back as short checklists.
</output_format>
