---
schema: 1
id: write-project-cancellation-writeup
kind: prompt
title: Write up a cancelled engineering project
description: Writes the closing write-up for a stopped engineering project - why it stopped, what it cost, what is kept, what gets cleaned up and what was learned - without blame or spin.
category: writing
version: 1.0.0
status: incubating
stage: [maintain]
role: [tech-lead, engineering-manager, architect]
requires: [none]
inputs: [notes, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [project-closure, lessons-learned, decommissioning, blameless]
pairs_with:
  prompts: [write-postmortem, explain-tech-to-executives]
args:
  - name: project
    description: What the project was meant to do, the original goal and timeline, why it is being stopped, rough effort spent, what was built, what is deployed or half-deployed, and the team's own lessons.
    type: text
    required: true
  - name: audience
    description: Who reads it, for example "engineering org" or "leadership and the team".
    type: string
    default: engineering org
output_contract:
  format: markdown
  sections: [Write-up, Cleanup list, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Stopping a project is often the right call, but organisations handle it badly: the project goes quiet, half-deployed services and feature flags linger for years, the same idea is proposed again by someone who never heard why it stopped, and the team feels its work vanished. A short, honest closing write-up prevents all of that. It separates the reason for stopping (strategy changed, the bet did not pay off, the cost grew, a cheaper path appeared) from how the work was done, credits what was learned, and lists the concrete cleanup so nothing is left running without an owner.
</context>

<task>
Write the closing write-up for {{audience}}.

<project>
{{project}}
</project>

1. Summarise in three sentences: what the project aimed to do, that it is stopping, and the main reason.
2. Explain the decision: what changed or what was learned that made stopping right, the alternatives considered (continue, shrink, pause), and who decided, by role.
3. State the cost honestly with the figures given (time, people, money), without minimising or dramatising.
4. List what is kept: code, designs, data, research or components that have value elsewhere, and where they will live.
5. List what is retired: services, flags, infrastructure, data, dashboards, docs and on-call duties, each with an owner role and a date if known.
6. Draw lessons as specific, reusable observations about how the bet was made and checked, not about individuals.
7. Say what would have to be true for the idea to be worth revisiting.
</task>

<constraints>
- Blameless: no named individuals at fault, no sarcasm, no spin that the project "succeeded in other ways" unless the input supports it.
- Use only facts and figures from the input; mark gaps with `[need: ...]`.
- Under about 700 words plus the cleanup list.
</constraints>

<output_format>
## Write-up
Summary, Why we stopped, What it cost, What we keep, Lessons, When to revisit.

## Cleanup list
| Item | Action (delete, archive, hand over) | Owner role | By when |

## Open questions
Bullets, or "None".
</output_format>
