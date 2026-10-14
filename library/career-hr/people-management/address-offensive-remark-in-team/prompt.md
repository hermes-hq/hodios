---
schema: 1
id: address-offensive-remark-in-team
kind: prompt
title: Address an offensive remark made in your team
description: Plans how a manager responds to an offensive joke or remark made in the team - what to say in the moment, the private conversation, support for those affected, and when it is a formal matter.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [offensive-remarks, inclusion, conduct-standards, manager-duty, psychological-safety]
pairs_with:
  prompts: [respond-to-harassment-report-as-manager, write-team-charter, give-feedback-sbi]
  personas: [hr-business-partner]
args:
  - name: incident
    description: What was said or done, roughly in their words, where (meeting, chat, social event), who was present, who it targeted or could hurt, whether it has happened before, and what you or others did at the time.
    type: text
    required: true
  - name: timing
    description: Whether you are preparing to respond in the moment next time, or responding after it already happened.
    type: enum
    enum: [already-happened, prepare-for-next-time]
    default: already-happened
output_contract:
  format: markdown
  sections: [How serious is it, In the moment, Private conversation with the speaker, Supporting those affected, Resetting the team standard, When it is formal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers respond when someone in their team makes an offensive joke or remark: about race, gender, sexuality, religion, disability, age, accent, body or similar. When a manager says nothing, the team learns that this is acceptable, and the people targeted learn that their manager will not back them. Unlike a bystander, a manager has a duty to act. Common mistakes: laughing along, waiting for the targeted person to complain, a vague "let's keep it professional" that names nothing, a public dressing-down that makes the speaker defensive and the target the centre of attention, or asking the targeted person to explain why it was offensive. Good practice is a short, calm interruption in the moment ("That's not OK here"), a private conversation with the speaker about the specific words and their impact, a private check-in with anyone affected that does not put them on the spot, and a team-level reset if the culture has drifted. Repeated or severe remarks, or those aimed at a specific person, may be harassment and need HR.

<incident>
{{incident}}
</incident>
Timing: {{timing}}
</context>

<task>
1. How serious is it: assess whether this is a one-off misjudged remark, a pattern, or targeted or severe enough to be possible harassment, and what that means for the response.
2. In the moment: two or three short lines a manager can use to interrupt calmly without making a scene, and how to move on. If it already happened and nothing was said, how to acknowledge that.
3. Private conversation with the speaker: an opening, the specific words and why they are not acceptable here (impact, not intent), how to handle "it was just a joke" or "I didn't mean it", the expected behaviour, and the consequence if it repeats.
4. Supporting those affected: a private check-in that acknowledges what happened, does not ask them to educate anyone, asks what they need, and explains the options to raise it formally.
5. Resetting the team standard: whether and how to address the whole team without naming individuals, and whether to update the team's agreements.
6. When it is formal: signs this should go to HR (repetition, targeting, severity, a complaint), and what to record.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not minimise the remark or advise waiting for a complaint before acting.
- Do not name or expose the targeted person to the team.
- Do not rule on whether conduct is unlawful; say when HR or legal advice is needed.
- Quote the offensive remark only as needed to address it; do not invent or embellish it.
</constraints>

<output_format>
## How serious is it
## In the moment
## Private conversation with the speaker
Table: If they say… | You say….
## Supporting those affected
## Resetting the team standard
## When it is formal
</output_format>
