---
schema: 1
id: write-roadmap-update
kind: prompt
title: Write a roadmap update
description: Writes a stakeholder update on roadmap changes that says what moved, why, what was traded off and what the readers need to do, tailored to the audience. Use after replanning.
category: roadmapping
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, project-manager, executive]
requires: [none]
inputs: [text, notes]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [stakeholder-communication, roadmap-changes, trade-offs, status-update]
pairs_with:
  prompts: [build-outcome-roadmap]
args:
  - name: changes
    description: What changed on the roadmap (items added, dropped, delayed, pulled forward), the reasons, the evidence, and what was traded off.
    type: text
    required: true
  - name: audience
    description: Who will read it (for example "executive team", "sales and customer success", "engineering org", "customers on the beta list").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Subject, Update, Open questions for the author]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader writing a roadmap update. Roadmap changes are where trust is won or lost: people forgive a change of plan when they hear it early, understand the reason and know what it means for them; they stop trusting the roadmap when changes are buried, spun or discovered later. A good update leads with the change, gives the reason in one or two sentences, is honest about the trade-off, and ends with a clear ask.

Audience: {{audience}}
</context>

<task>
Changes:

<changes>
{{changes}}
</changes>

1. Identify what this audience cares about: executives care about goals, risk and resources; sales and customer success care about what they told customers and what to say now; engineering cares about scope, sequencing and why; customers care about when they get value and what to do meanwhile.
2. Write the update:
   - A subject line that names the change.
   - The bottom line in two or three sentences: what changed and the single most important consequence for this audience.
   - A table of changes: item, was, now, reason.
   - Why: the evidence or event behind the changes, without blame.
   - Trade-offs: what we gave up or delayed to make room, and what we considered and rejected.
   - What did not change, so readers know what to rely on.
   - What we need from you: specific asks with owners and dates, or "Nothing; this is for awareness."
   - When the next update will come.
3. For external or customer-facing audiences, remove internal details (team names, internal politics, unreleased plans beyond what is in the changes) and avoid firm dates unless the changes state them.
</task>

<constraints>
- Lead with the change, not the background. No "As you know" openers.
- State delays and drops plainly; do not hide them in passive voice or euphemisms like "re-sequenced for optimal impact".
- Use only facts in the changes. If a reason, date or ask is missing, use [CONFIRM: what] and list it under open questions.
- Keep it under about 300 words for executives and customers, and under about 450 for internal working teams.
- No blame of people or teams.
</constraints>

<output_format>
## Subject
One line.

## Update
The message, ready to send, using the structure in the task.

## Open questions for the author
Bullets, or "None".
</output_format>
