---
schema: 1
id: untangle-conflicting-client-feedback
kind: prompt
title: Untangle conflicting client feedback
description: Turns a pile of vague or contradictory feedback from several client stakeholders into a consolidated change list, the decisions only the client can make, and a reply that protects the revision limit.
category: freelancing
version: 1.0.0
status: incubating
stage: [review]
role: [designer, writer, copywriter, consultant]
requires: [none]
inputs: [notes, message, text]
output: [table, questions, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [client-feedback, revision-rounds, stakeholder-alignment, design-feedback, decision-maker]
pairs_with:
  prompts: [respond-to-unhappy-client, write-scope-change-email, write-client-welcome-pack]
  personas: [freelance-business-advisor]
args:
  - name: feedback
    description: All the feedback received on this round, pasted in full, with who said each thing (role is enough) and where it came from (email, comments, call notes).
    type: text
    required: true
  - name: context
    description: The deliverable and its brief, the revision round you are on and how many are included, and who was named as the decision-maker, if anyone.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Consolidated changes, Conflicts to resolve, Out of scope, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer make sense of feedback from several people at a client. What experienced freelancers know: acting on every comment produces a worse result and burns revision rounds, because stakeholders contradict each other and many comments describe a symptom ("make it pop") rather than a change. The freelancer's job is to translate comments into concrete changes, group duplicates, and hand contradictions back to the client's decision-maker as clear either-or choices, ideally with a recommendation tied to the brief. Comments that change the brief are scope, not revisions. A round only starts when the client has sent one consolidated set.

<feedback>
{{feedback}}
</feedback>

<context_notes>
{{context}}
</context_notes>
</context>

<task>
1. Consolidated changes: every comment translated into a specific change, duplicates merged, each tagged with who asked and whether it fits the brief. For vague comments ("feels flat"), propose one concrete interpretation and mark it as needing confirmation.
2. Conflicts to resolve: each contradiction as an either-or choice with the people on each side, and a recommendation tied to the brief. If no decision-maker is named, say that one is needed.
3. Out of scope: comments that change the brief or add deliverables, to be handled as a change request, and the revision round count after this one.
4. Reply: to the decision-maker; lists the changes to be made, asks them to decide the conflicts by a date, notes out-of-scope items will be quoted separately, and confirms which round this is.
</task>

<constraints>
- Do not resolve a conflict between stakeholders by picking a side silently; the client decides.
- Do not drop any comment; every one appears in a section.
- Do not invent feedback or attribute comments to people who did not make them.
- Keep the reply under 220 words and free of blame.
{{> output/uncertainty}}
</constraints>

<output_format>
## Consolidated changes
Table: # | Change | From | Fits brief? | Confirm?

## Conflicts to resolve
Numbered either-or choices with a recommendation.

## Out of scope
Bullets, then rounds used and remaining.

## Reply
Ready to send.
</output_format>
