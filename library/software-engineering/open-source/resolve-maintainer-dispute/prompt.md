---
schema: 1
id: resolve-maintainer-dispute
kind: prompt
title: Resolve a dispute between maintainers
description: Helps open-source co-maintainers work through a disagreement on direction, a design or someone's conduct, by separating positions from interests and using the project's own decision rules.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer]
requires: [none]
inputs: [text]
output: [plan, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [maintainer-conflict, mediation, project-direction, consensus, community-health]
pairs_with:
  prompts: [write-project-governance, plan-rfc-process, handle-code-of-conduct-report, summarize-discussion-positions]
  personas: [open-source-maintainer]
  workflows: [maintainer-handover-track]
args:
  - name: dispute
    description: What the maintainers disagree about, each side's position as fairly as you can put it, how long it has gone on, and how it is affecting the project (stalled releases, public arguments, someone stepping back). Use roles or initials.
    type: text
    required: true
  - name: your_role
    description: Your place in it - one of the parties, a third maintainer asked to help, or a foundation or steering member.
    type: enum
    enum: [party, neutral-maintainer, steering-or-foundation]
    default: party
  - name: governance
    description: How the project decides things today, or the GOVERNANCE.md text. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What kind of dispute this is, Interests behind the positions, Options, Process to decide, Messages, If it does not resolve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Disputes between maintainers do more damage than hostile users because they stall releases, split contributors into camps and often end with someone quietly leaving. They usually fall into a few types: a technical choice, the project's direction or scope, a work-style clash (review speed, how blunt feedback is), money or company influence, or conduct. Each needs a different route: technical choices are settled by a written proposal and the project's decision rule; direction needs the users' and maintainers' interests laid out; conduct goes through the code of conduct process, not a debate. Arguments move forward when the people involved name what they actually need (stability for downstream users, time, recognition, control over an area) rather than repeating positions, and when the decision happens in a known place with a deadline.
</context>

<task>
Help resolve this maintainer dispute. My role: {{your_role}}.

<dispute>
{{dispute}}
</dispute>
{{#governance}}

<governance>
{{governance}}
</governance>
{{/governance}}

1. Say what kind of dispute this is, or which mix, and whether part of it belongs in the code of conduct process instead. If there are harassment, threats or safety concerns, say to route them there first and stop treating them as a disagreement.
2. For each side, separate the stated position from the likely interests behind it, marking which interests are stated in the input and which are guesses to check.
3. Offer three to five options, including ones that meet both sides' interests (an experiment behind a flag, splitting ownership of areas, a time-boxed trial, a plugin or separate package, an outside reviewer) and the option of deciding by the project's rule. Give the trade-offs.
4. Propose a process to decide: written summaries from each side, a meeting or async thread with an agenda, a deadline, who decides under the governance, and how the decision is recorded. If there is no governance, suggest a fair interim rule and recommend writing governance afterwards.
5. Draft the messages that fit {{your_role}}: a private opening message to the other party or parties that is calm and specific, and if useful a short public note to contributors that work continues and when a decision is expected.
6. If it does not resolve: the fallbacks in order (mediation by a neutral maintainer or a foundation, the governance tie-break, splitting areas of ownership, a respectful fork) and how to protect users and contributors during it.
</task>

<constraints>
- Stay even-handed. If the user is a party, do not take their side; name where their own position may be weak.
- Do not diagnose anyone's personality or mental health.
- Do not invent governance rules; use the ones given or say they are missing.
- Keep public messages free of blame and of private details.
</constraints>

<output_format>
## What kind of dispute this is
Two to four sentences.

## Interests behind the positions
Table: Party | Position | Likely interests | Stated or to check.

## Options
Table: Option | Meets whose interests | Trade-offs.

## Process to decide
Numbered steps with a deadline.

## Messages
The drafts in fenced blocks.

## If it does not resolve
Ordered fallbacks.
</output_format>
