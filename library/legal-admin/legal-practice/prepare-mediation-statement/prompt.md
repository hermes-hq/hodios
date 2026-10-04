---
schema: 1
id: prepare-mediation-statement
kind: prompt
title: Prepare a mediation statement
description: Drafts a mediation position statement for counsel to review - dispute summary, interests, legal strengths and risks, reasoning towards a settlement range and proposals - shared or mediator-only.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan, build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, document, notes]
output: [article, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mediation, position-statement, settlement, adr, litigation-risk, batna]
pairs_with:
  prompts: [build-damages-schedule, draft-legal-research-memo, write-client-status-update]
  personas: [paralegal]
args:
  - name: case_summary
    description: The dispute - parties (placeholders fine), claims and defences, key facts and documents, procedural stage, amounts claimed and any offers already made, and the governing law or forum.
    type: text
    required: true
  - name: client_goals
    description: What the client wants beyond money - timing, confidentiality, an ongoing relationship, an apology, a reference, non-admission - and any authority limits counsel can share in the draft.
    type: text
    required: true
  - name: confidentiality
    description: "shared: exchanged with the other side and the mediator, so it persuades and reveals no bottom line. mediator-only: a confidential brief to the mediator, which can be candid about risks and flexibility."
    type: enum
    enum: [shared, mediator-only]
    default: mediator-only
output_contract:
  format: markdown
  sections: [Drafting notes, Mediation statement, Settlement range reasoning, Points for counsel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft mediation statements for litigators. A mediation statement is not a pleading: its job is to help the mediator understand the dispute quickly and to move the parties towards settlement. A statement exchanged with the other side should persuade without hardening positions - it presents the strongest case calmly, acknowledges what is genuinely disputed, highlights the other side's litigation risk and cost, and leaves room to move. A confidential statement for the mediator alone can be candid about weaknesses, the client's real interests, and the reasoning behind a realistic range, which helps the mediator test both sides. Settlement reasoning is most credible when it is built from the likely outcomes at trial weighted by risk, minus the costs, time and non-monetary burdens of getting there, rather than from opening numbers. Your job is a usable first draft and the decisions counsel must make; counsel decides strategy, numbers and what to reveal.

Version: {{confidentiality}}
</context>

<task>
Case summary:

<case>
{{case_summary}}
</case>

Client goals:

<goals>
{{client_goals}}
</goals>

1. If the summary does not show the claims, the amounts in issue or the procedural stage, ask for them and stop.
2. Write drafting notes: the version being drafted and what that means for content, the assumptions made, and anything in the summary that must not appear in a shared version.
3. Draft the statement with these parts, scaled to the case:
   - Introduction: who the parties are, what the dispute is about, and the client's willingness to settle on sensible terms.
   - Background: a short, neutral chronology of key facts with document references.
   - The issues: the questions that decide the case, stated fairly.
   - The client's position on each issue: the strongest arguments on the facts and the governing law as supplied, without citing authorities that were not provided.
   - The other side's risks: weaknesses in their case, evidential gaps, costs and time to trial, and enforcement or reputational considerations, stated in a measured way.
   - Interests and possible terms: what the client needs beyond money (from the goals) and creative terms that could bridge the gap (payment plans, non-disparagement, references, timing, confidentiality, non-admission).
   - For mediator-only: a candid section on the client's own weaknesses, the realistic range and the reasoning, and where the client may show flexibility. For shared: none of this; keep any proposal at a level counsel chooses and mark it [COUNSEL TO SET].
   - Conclusion: what the client hopes to achieve at the mediation.
4. Draft settlement range reasoning as a separate internal working note for counsel only (not part of either version of the statement): likely outcomes at trial with rough probabilities as placeholders for counsel to fill or confirm, expected value, costs to trial, timing, and how the client goals shift the acceptable range. Show the arithmetic with clearly labelled placeholder figures if the summary gives none.
5. List points for counsel: authority limits, what to reveal, the opening proposal, how the statement handles any prior offers (without-prejudice status), confidentiality and mediation privilege rules in the forum (to confirm), and anything that could be an admission.
6. Before answering, check that a shared version contains no bottom line, authority limit, candid weakness or privileged advice, every fact comes from the summary, and no authorities are invented.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for counsel, who decides strategy, numbers and disclosure. Mark it "DRAFT - privileged and confidential, prepared for mediation".
- Use only the facts and law supplied. Do not cite cases, statutes or damages figures that were not given; use [BRACKETS] for anything counsel needs to add.
- Probabilities and values in the range reasoning are placeholders or counsel's figures, never your prediction of the outcome.
- Keep a shared statement persuasive but civil; no personal attacks, no inflammatory language, nothing that would make settlement harder.
- Never include information the client goals mark as confidential in the shared version.
{{> output/uncertainty}}
</constraints>

<output_format>
## Drafting notes
Bullets.

## Mediation statement
The full draft with sub-headings for each part.

## Settlement range reasoning
Internal note for counsel only: a table of outcomes, probabilities, values and costs, then the arithmetic and the range.

## Points for counsel
Numbered.
</output_format>
