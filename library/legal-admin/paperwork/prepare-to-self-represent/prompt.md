---
schema: 1
id: prepare-to-self-represent
kind: prompt
title: Prepare to represent yourself at a hearing
description: Prepares someone to represent themselves at a court or tribunal hearing with the process, the documents and bundle, what to say and how to say it, likely questions, and courtroom conduct.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent, founder]
subject: [law]
requires: [none]
inputs: [text, document]
output: [plan, checklist, script]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [self-represented, litigant-in-person, tribunal, court-hearing, hearing-bundle, pro-se]
pairs_with:
  prompts: [prepare-small-claims-case, index-case-documents, claim-unpaid-wages, respond-to-eviction-notice]
  personas: [legal-information-guide]
args:
  - name: case_type
    description: The kind of case and your side, for example "small claims, I am the claimant", "employment tribunal, unfair dismissal claimant", "landlord possession hearing, I am the tenant" or "traffic court, defending a ticket".
    type: string
    required: true
  - name: jurisdiction
    description: Country and state or region, and the court or tribunal name if you know it, for example "County Court at Leeds, England" or "Superior Court, Maricopa County, Arizona".
    type: string
    required: true
  - name: facts
    description: Optional. What the case is about in date order, what you want, what the other side says, your evidence and witnesses, the hearing date and format (in person, video, phone), and any directions or orders the court has sent.
    type: text
output_contract:
  format: markdown
  sections: [Before anything, How the hearing usually runs, Your case in three points, Documents and bundle, What to say, Questions you may face, On the day, Help available]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who are representing themselves at a court or tribunal hearing, as an experienced court support volunteer or self-help centre adviser would. Self-represented people usually lose ground not on the merits but on preparation: missing the court's directions or deadlines, bringing evidence the other side and the judge have not seen, telling the whole story instead of the points the decision turns on, arguing with the other side instead of addressing the judge, and freezing when asked a direct question. Judges and tribunal members generally expect less of people without lawyers, but they still need the issues, the evidence and the remedy set out clearly. Procedures, forms of address, and what is allowed (for example bringing a supporter to sit with you, recording, or video hearings) vary by court and country, so you mark them to verify.

Case: {{case_type}}
Court or tribunal: {{jurisdiction}}
</context>

<task>
{{#facts}}
Facts and documents:

<facts>
{{facts}}
</facts>
{{/facts}}

1. Before anything: list any deadlines or directions to check now (for filing documents, exchanging evidence, witness statements, confirming attendance), the hearing date and format if given, and anything that suggests urgent professional help is needed. If facts are missing, ask for the court's letters and orders as the first step.
2. How the hearing usually runs: the stages for this kind of hearing in this jurisdiction, in plain words (opening, each side's evidence, questions, closing, decision), who speaks when, roughly how long, and whether a decision is given on the day. Mark specifics "to verify with the court's guidance or help desk".
3. Your case in three points: from the facts, the issues the decision is likely to turn on, and for each the point the person needs to make, the evidence that supports it, and the weak spot to be ready for. If facts are not given, show the structure with [BRACKETS]. Do not predict the result.
4. Documents and bundle: what to prepare (statement of case or claim, witness statements, evidence in date order, a chronology, a list of what is being asked for with the calculation), how to number and index pages, how many copies, and the rule of thumb that anything relied on should have been shared with the other side and the court in advance, to verify.
5. What to say: a short opening outline (under two minutes spoken), how to refer to documents by page number, how to ask a witness questions (short, one point each, no arguing), and a closing outline that repeats the three points and states the remedy. Write these as notes the person can read from, in their own voice.
6. Questions you may face: likely questions from the judge and the other side for this kind of case, with honest, short answers built from the facts or guidance on how to answer ("I don't know" and "I don't remember" are acceptable when true).
7. On the day: what to bring, arriving early, how to address the judge or tribunal (to verify locally), standing or sitting, phones off, not interrupting, asking for a break or for something to be repeated, taking notes, behaviour toward the other side, and what to do if they do not understand something.
8. Help available: types of help (court help desks or self-help centres, legal aid, law school clinics, pro bono schemes, free advice lines, a supporter who can sit with them where the court allows, interpreters and accessibility adjustments), without inventing names or numbers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict the outcome or say who will win. Help the person present their case clearly and honestly.
- Use only the facts given. Do not invent evidence, witnesses, procedural rules, forms, case law or deadlines. Mark procedure "to verify".
- Never suggest misleading the court, coaching a witness to say something untrue, or hiding relevant documents. If asked, decline and explain that this can lose the case and carry serious consequences.
- If the case involves possible prison, losing a home, children, immigration status, a large sum, or the other side has a lawyer, recommend seeking legal aid or at least a one-off consultation before the hearing, and say how to ask the court about an adjournment to get advice if time is very short (to verify).
- Keep the tone steady and encouraging. Many people do this successfully with good preparation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before anything
Bullets, deadlines in bold.

## How the hearing usually runs
Numbered stages.

## Your case in three points
Table: issue | what you need to show | evidence (page) | weak spot and your answer.

## Documents and bundle
Checklist.

## What to say
Opening notes, witness question tips, closing notes.

## Questions you may face
Q and A pairs.

## On the day
Checklist.

## Help available
Bullets by type.
</output_format>
