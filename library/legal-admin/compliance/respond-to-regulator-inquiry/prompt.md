---
schema: 1
id: respond-to-regulator-inquiry
kind: prompt
title: Respond to a regulator inquiry
description: Helps a small organisation answer a letter from a data protection or other regulator about a complaint or concern, with a fact-finding plan, an accurate response, remedial actions and a document list.
category: compliance
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, founder, legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [plan, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [regulator-correspondence, complaint-investigation, regulatory-response, remediation, data-protection-authority]
pairs_with:
  prompts: [handle-data-subject-request, plan-data-breach-response, audit-data-protection-compliance]
  personas: [compliance-officer, tech-law-guide]
args:
  - name: letter
    description: The regulator's letter or email - which regulator, the reference, what it says the concern or complaint is, the questions asked, documents requested, and the deadline.
    type: text
    required: true
  - name: facts
    description: What you know about what happened, what you have already done, the relevant policies and records you hold, and anything you are unsure about.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is being asked, Deadline and holding reply, Fact-finding plan, Draft response, Remedial actions, Documents to send, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation reply to a regulator, most often a data protection authority following up a complaint from a customer or employee, but also a consumer, advertising or sector regulator. Regulators generally want three things: accurate facts, evidence that the organisation understands its obligations, and what it has done or will do to put things right. Small organisations often harm themselves by replying late, defensively or vaguely, by overstating compliance ("we are fully GDPR compliant") without evidence, or by answering questions they were not asked. An honest account of a mistake with concrete fixes and a timeline usually lands better than denial. Each question should be answered under its own heading, with documents numbered and referenced. If a response deadline is tight, a prompt, polite request for more time with a reason is normal. Any formal notice, or a letter suggesting enforcement, needs legal advice.
</context>

<task>
Regulator letter:

<letter>
{{letter}}
</letter>

Facts:

<facts>
{{facts}}
</facts>

1. What is being asked: list each question or request from the letter, numbered as in the letter, and the underlying concern.
2. Deadline and holding reply: the response date; if the facts suggest more time is needed, draft a short holding reply requesting a specific extension with reasons.
3. Fact-finding plan: who to ask, which records and systems to check, and what to preserve (do not delete or alter anything relevant), with owners and dates.
4. Draft response: a cover paragraph, then an answer per question under its own heading, using only established facts and [BRACKETS] for what is still being confirmed, acknowledging any shortcomings plainly, and describing the steps taken and planned. Avoid absolute claims of compliance.
5. Remedial actions: concrete fixes with owners and dates (for example a process change, training, a policy update, a reply to the complainant), separating done from planned.
6. Documents to send: a numbered list, and what to check before sending (other people's personal data redacted, confidential commercial information marked).
7. Get advice if.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent facts, policies, dates or actions taken. If something was not done, the draft must not say it was.
- Do not invent the regulator's powers, deadlines or penalties; describe them generally and mark "verify".
- Never advise deleting, altering or backdating documents.
- Keep the tone factual, cooperative and specific; no blaming the complainant.
- Recommend legal advice for formal notices, information or enforcement notices, potential fines, possible criminal offences, or where the matter is also in litigation.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is being asked
Numbered list.

## Deadline and holding reply
Date and draft if needed.

## Fact-finding plan
Table: question | who | records | owner | by when.

## Draft response
Letter with headings per question.

## Remedial actions
Table: action | status | owner | date.

## Documents to send
Numbered list and pre-send checks.

## Get advice if
Bullets.
</output_format>
