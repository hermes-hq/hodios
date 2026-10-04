---
schema: 1
id: complain-to-ombudsman
kind: prompt
title: Escalate a complaint to an ombudsman
description: Escalates an unresolved complaint to an ombudsman or regulator - checks eligibility and deadlines, assembles the evidence bundle and drafts a clear, calm complaint statement.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ombudsman, regulator, escalation, deadlock-letter, final-response, consumer-rights]
pairs_with:
  prompts: [write-complaint-letter, prepare-small-claims-case, explain-legal-letter]
  workflows: [dispute-resolution-track]
args:
  - name: sector
    description: The kind of organisation complained about, for example energy, banking, insurance, telecoms, a public service, a care home or a legal service.
    type: string
    required: true
  - name: complaint_history
    description: What went wrong, when you complained, how (letter, email, phone), what the organisation replied and when, whether you received a final response or deadlock letter, and the evidence you hold.
    type: text
    required: true
  - name: country
    description: Country and region where the organisation operates.
    type: string
    required: true
  - name: remedy_sought
    description: What you want, for example a refund of a stated amount, a correction to a record, an apology, compensation for distress or inconvenience, or a change of practice.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Can you go to an outside body yet, Which body, Deadlines, Evidence bundle, Complaint statement, What happens next, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people take a complaint to an ombudsman, regulator or approved dispute resolution scheme after the organisation has failed to resolve it. These bodies are usually free for the consumer and can award refunds, corrections and modest compensation, but they have entry rules that trip people up. Most require the person to complain to the organisation first and either receive a final response (sometimes called a deadlock letter) or wait out a set period - often around eight weeks in many schemes, but it varies. Most also have a time limit to bring the complaint after the final response, and some only handle certain organisations or amounts. Regulators often record complaints to spot patterns but do not resolve individual cases, which people find out too late. A complaint that is short, dated, evidence-led and asks for a specific remedy gets handled faster.

Sector: {{sector}}
Country: {{country}}
Remedy sought: {{remedy_sought}}
</context>

<task>
Complaint history:

<history>
{{complaint_history}}
</history>

1. Eligibility. Check from the history whether the organisation has had its chance: was a complaint made, when, and was there a final response or deadlock letter, or has the usual waiting period passed? If not, say so first and explain the step needed (a formal complaint asking for a final response), then still prepare the rest so it is ready.
2. Which body. Name the type of body that usually handles {{sector}} complaints in {{country}} - sector ombudsman, approved dispute resolution scheme, public services ombudsman, or a regulator - and the specific name only if you are confident, marked "to verify on its website". Explain whether that body resolves individual complaints or only records them, and the alternative if it does not (small claims, a different scheme, a card payment dispute).
3. Deadlines. List the deadlines that commonly apply: the waiting period after complaining, the time limit after the final response, and the general limitation period for court as a backstop. Mark each "to verify" and compute dates from the history where possible.
4. Evidence bundle. List and number the evidence to include (E1, E2…): the original complaint, the organisation's responses, the final response, contracts or terms, bills or statements, photos, call notes with dates. Mark what is missing and how to get it (for example a data access request for call recordings).
5. Complaint statement. Draft the statement the person can paste into the body's form or send: who they are complaining about, a dated summary in numbered paragraphs, what the organisation got wrong, how its response fell short, the impact on them, and the exact remedy sought with the amount and how it is calculated, referring to evidence numbers. Calm and factual.
6. What happens next: the usual stages (assessment, informal resolution, decision, the right to accept or reject), typical timescales described as variable, and whether a decision accepted by the consumer binds the organisation in that scheme (to verify).
7. Questions to check on the body's website or helpline.
8. Check before answering: every date and amount comes from the history, the remedy is supported by the facts, and nothing in the statement is exaggerated.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict the outcome or promise compensation amounts. Distress or inconvenience awards are discretionary; describe them as possible, not expected.
- Do not invent scheme names, rules, waiting periods or time limits. Mark unconfirmed ones "to verify".
- Keep the statement free of insults, threats, speculation about motives, and emotional language beyond a factual description of impact.
- If the complaint involves a large sum, personal injury, discrimination, or a matter already in court, say that legal advice or a free legal advice service should be consulted, as an ombudsman route may not be the right one or may affect other options.
- Refer to staff by role, and do not repeat account numbers or personal identifiers from the history.
{{> output/uncertainty}}
</constraints>

<output_format>
## Can you go to an outside body yet
A yes, no or unclear verdict with the reason and the step needed.

## Which body
Short paragraph.

## Deadlines
Table: deadline | rule (to verify) | date from your history.

## Evidence bundle
Table: # | item | date | what it shows | held or to get.

## Complaint statement
The ready-to-use statement.

## What happens next
Bullets.

## Questions to check
Numbered.
</output_format>
