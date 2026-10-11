---
schema: 1
id: write-hands-on-workshop-guide
kind: prompt
title: Write a hands-on technical workshop guide
description: Writes materials for a live hands-on coding workshop - pre-event setup email, timed modules with checkpoints, catch-up branches, a no-install fallback and helper notes, so the room never stalls.
category: writing
version: 1.0.0
status: incubating
stage: [learn]
role: [developer-advocate, software-engineer, tech-lead]
requires: [none]
inputs: [topic, notes]
output: [outline, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [workshops, hands-on-labs, setup-instructions, facilitation, devrel-events]
pairs_with:
  prompts: [create-coding-exercises, outline-tech-talk-with-live-demo]
args:
  - name: workshop
    description: Topic, audience level, length, what attendees should be able to do at the end, the stack and tools needed, and the venue (in person, online, conference wifi).
    type: text
    required: true
  - name: helpers
    description: How many helpers or teaching assistants you will have, if any.
    type: string
output_contract:
  format: markdown
  sections: [Setup email, Workshop plan, Helper notes, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hands-on workshops usually fail in the first twenty minutes: half the room did not install the tools, conference wifi cannot download a 2 GB image, someone is on a locked-down work laptop, and the facilitator spends the session debugging environments. Workshops that run well send setup instructions days ahead with a one-command verification step, offer a browser-based or pre-built fallback, split the work into modules with a checkpoint at the end of each, give a catch-up branch or snapshot per module so nobody is lost for the rest of the day, and spend more time on attendees doing than on the facilitator talking.
</context>

<task>
Write the workshop materials.

<workshop>
{{workshop}}
</workshop>
{{#helpers}}Helpers: {{helpers}}{{/helpers}}

1. Write the learning outcomes as three to five things attendees will be able to do.
2. Write a pre-event setup email: what to install with versions from the input, a single verification step with the expected output, the time it takes, the no-install fallback, and where to ask for help before the day. Mark any version or command not in the input as `[confirm]`.
3. Plan the session in timed modules. For each: goal, a short explanation (under ten minutes), the hands-on task, a checkpoint attendees can verify themselves, and the catch-up branch or snapshot name to use if they fall behind.
4. Keep at least half of the time hands-on and include breaks for sessions over 90 minutes.
5. Write helper notes: the most likely setup and task problems and their fixes, how to spot people who are stuck, and when to move someone to the fallback.
6. List risks (network, permissions on work laptops, OS differences, accounts or API keys that need creating, costs to attendees) with mitigations.
</task>

<constraints>
- Do not invent tool versions, commands or URLs; use `[confirm]` placeholders.
- Never ask attendees to paste secrets into shared documents or chat; if accounts or keys are needed, say how they get their own and what it costs, if anything.
- Fit the plan exactly to the stated length.
</constraints>

<output_format>
## Setup email
Subject and body.

## Workshop plan
Outcomes, then a table: Time | Module | Explain | Do | Checkpoint | Catch-up.

## Helper notes
Bullets.

## Risks
| Risk | Mitigation |
</output_format>
