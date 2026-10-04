---
schema: 1
id: audit-argument-evidence
kind: prompt
title: Audit the evidence behind an argument
description: Audits the evidence a text itself offers for each claim, labelling claims supported, weakly supported, unsupported or contradicted, and naming the reasoning gaps, without outside research.
category: fact-checking
version: 1.0.0
status: incubating
stage: [review, verify]
role: [student, editor, researcher]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evidence-mapping, critical-reading, claim-support, reasoning-gaps]
pairs_with:
  prompts: [fact-check-claims, find-logical-fallacies, debate-the-author]
args:
  - name: text
    description: The essay, op-ed, report, white paper or post to audit.
    type: text
    required: true
  - name: claim_scope
    description: main-claims = the thesis and the claims it rests on; all-claims = every substantive claim, including side points.
    type: enum
    enum: [main-claims, all-claims]
    default: main-claims
output_contract:
  format: markdown
  sections: [Thesis and verdict, Claims and their evidence, Reasoning gaps, What would strengthen it, Claims to check externally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Before checking whether a text's claims are true in the world, a careful reader checks whether the text even tries to support them. This audit stays inside the text: for each claim, what evidence does the author offer, what kind is it, and does it actually reach the claim? A claim the text leaves unsupported may still be true, and a supported claim may still be false; the audit says which claims a reader is being asked to take on trust, and where the reasoning jumps.

<text>
{{text}}
</text>
Scope: {{claim_scope}}
</context>

<task>
1. If the text makes no arguable claims (pure narrative, instructions, a list), say so and stop.
2. State the thesis in one sentence, as the author would accept it.
3. List the claims in scope: with main-claims, the thesis and the claims it directly rests on; with all-claims, every substantive claim. Number them and show how they connect to the thesis.
4. For each claim, find the evidence the text offers and classify it: data or statistics; a study or report cited; an expert or authority; an example, case or anecdote; personal experience; reasoning from other claims; none.
5. Rate the support, judged only by what is on the page:
   - **Supported:** the evidence offered directly backs the claim at the strength stated.
   - **Weakly supported:** evidence exists but falls short: a single anecdote for a general claim, a citation with no detail, evidence for a weaker or narrower claim, an authority speaking outside their field.
   - **Unsupported:** asserted with no evidence.
   - **Contradicted:** the text's own evidence or another passage points the other way.
6. Name the reasoning gaps between evidence and claim: generalising from a few cases, correlation read as cause, a missing comparison or baseline, a jump in scope ("this school" to "all schools"), a conclusion stronger than its premises, a key term that shifts meaning.
7. Say what evidence would close the most important gaps, and list the claims most worth checking against outside sources.
8. Before answering, check every rating against the quoted evidence and confirm you have not used outside knowledge to judge truth.
</task>

<constraints>
- No outside research or knowledge about whether claims are true. "Unsupported in the text" never means "false"; say so in the verdict.
- A citation counts as evidence offered, but you cannot verify it. Rate it on how specifically it is described and whether it matches the claim as stated.
- Credit what is well supported; the audit is not a hunt for faults.
- Quote the text for every claim and its evidence. Do not paraphrase claims into stronger or weaker versions.
- Judge the same way whatever the text's politics or conclusion.
</constraints>

<output_format>
## Thesis and verdict
The thesis in one sentence, then two or three sentences on how well the text supports it, ending with a reminder that this is an internal audit.
## Claims and their evidence
Table: # | Claim (quoted) | Evidence offered (quoted or "none") | Evidence type | Support rating | Note.
## Reasoning gaps
Bullets: the gap, the claims it affects, and a short explanation.
## What would strengthen it
Bullets: the evidence that would most change the verdict.
## Claims to check externally
Numbered: the claims whose truth matters most and could be checked against sources.
</output_format>
