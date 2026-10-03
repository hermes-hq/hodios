---
schema: 1
id: strengthen-argument-in-draft
kind: prompt
title: Strengthen the argument in a draft
description: Revises a proposal, essay or memo to be more persuasive for its reader by sharpening claims, adding prompts for missing evidence and answering objections, without hype.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student, manager, founder]
requires: [none]
inputs: [document, text]
output: [rewrite, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [persuasion, argumentation, evidence-gaps, objection-handling, proposals]
pairs_with:
  prompts: [critique-draft, plan-persuasive-argument, write-decision-memo, edit-for-structure]
  personas: [editor]
args:
  - name: draft
    description: The proposal, essay, memo or pitch to strengthen, in full.
    type: text
    required: true
  - name: reader
    description: "Who must be persuaded and what they care about, for example \"the CFO, sceptical of new headcount\" or \"my seminar tutor, marks on use of evidence\"."
    type: string
    required: true
  - name: desired_outcome
    description: What the reader should think or do after reading, for example "approve a three-month pilot" or "accept that the policy failed for structural reasons".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Argument map, Revised draft, Evidence needed, Objections answered, What I did not change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A draft persuades when a specific reader can see what is being claimed, why it matters to them, what supports it, and that the obvious objections have been considered. Drafts usually fall short in predictable ways: the main claim is vague or arrives late, reasons are asserted rather than shown, the evidence is about something the reader does not care about, the strongest objection is ignored, and hype ("game-changing", "everyone agrees") stands in for proof. Strengthening means fixing those, with the author's evidence. Inventing statistics or sources makes the draft weaker, because one checked fake figure discredits the rest.
</context>

<task>
Strengthen the argument in this draft for this reader: {{reader}}.
Outcome I want from them: {{desired_outcome}}.

<draft>
{{draft}}
</draft>

1. If the draft is empty, ask for it and stop.
2. Map the current argument: the main claim, the reasons, the evidence behind each reason, the unstated assumptions linking them, and where in the draft each appears. Note gaps.
3. Model the reader: what they value, what they will be measured on, what they already believe, and the two or three objections they are most likely to raise.
4. Revise:
   - **Claim:** make it specific, arguable and early. Tie it to the desired outcome and, for a proposal, state the exact ask (what, how much, by when).
   - **Reasons:** lead with the ones this reader cares about; cut or demote reasons that do not move them.
   - **Evidence:** keep every real figure and source. Where a reason lacks support, insert `[EVIDENCE NEEDED: what would prove this, and where to find it]` instead of inventing it. Where a claim is stronger than its evidence, soften it.
   - **Objections:** answer the strongest two or three in the text: concede what is true, then say why the case still holds or how the risk is limited (a pilot, a review point, a cap).
   - **Tone:** remove hype, superlatives and certainty the evidence does not support; keep the author's voice.
5. Keep the structure the genre expects (for example thesis-led for an essay, ask-first for a memo or proposal) and keep the length within about 20% of the original unless a missing section is essential.
</task>

<constraints>
- Never invent facts, figures, quotes, studies or sources. Unsupported claims either get an evidence placeholder or are softened.
- Do not change the author's position or recommendation. If you think the case cannot be made honestly, say so in What I did not change and explain why.
- No manipulation: no false urgency, fake scarcity, or misrepresenting the other side.
- Keep the author's language variety and terminology.
</constraints>

<output_format>
## Argument map
A short before → after outline: main claim, reasons, evidence (or gap) for each, and the objections addressed.
## Revised draft
The full revised draft, with `[EVIDENCE NEEDED: …]` placeholders where support is missing.
## Evidence needed
A numbered list matching the placeholders: what to find, why this reader needs it, and where it might come from.
## Objections answered
A table: Objection | How the draft now answers it.
## What I did not change
Bullets: choices kept on purpose, and any limits of the case the author should know about.
</output_format>
