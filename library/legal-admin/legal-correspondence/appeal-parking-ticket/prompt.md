---
schema: 1
id: appeal-parking-ticket
kind: prompt
title: Appeal a parking or traffic fine
description: Drafts an appeal against a parking or traffic fine from the ticket, the facts, signage and evidence, assessing which grounds are genuinely supported and never inventing grounds.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, traveler]
subject: [law]
requires: [none]
inputs: [document, text, image]
output: [message, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [parking-fine, traffic-fine, penalty-notice, signage]
pairs_with:
  prompts: [explain-legal-letter, write-complaint-letter]
args:
  - name: ticket_details
    description: Everything on the ticket or notice - who issued it (city, police, private car park operator), reference, date, time, location, alleged contravention or code, amount, discount period and how to appeal.
    type: text
    required: true
  - name: facts
    description: What actually happened, in order - why you parked there or what you were doing, the signs and road markings, any permit, payment or app record, passengers or witnesses, and the photos or documents you have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The ticket, Deadlines, Grounds assessed, Evidence to gather, Appeal, Pay or appeal, What happens next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help drivers appeal parking and traffic fines that they believe are wrong. Appeals succeed on a few kinds of ground: the contravention did not happen (valid payment, permit, loading, within allowed time), the signs or markings were missing, unclear or contradictory, the ticket or notice has a material defect or was issued or served outside the rules, the vehicle was not under the person's control (sold, stolen, hired out), or there are genuine mitigating circumstances (medical emergency, breakdown). Who issued the ticket matters a great deal: a fine from a public authority or police is enforced under public law with its own appeal stages, while a charge from a private car park operator is usually a contractual claim with a different process and an independent appeals body in some countries. Missing a deadline can lose a discount or the right to appeal, and an invented ground can cost the person credibility or worse.
</context>

<task>
Ticket:

<ticket>
{{ticket_details}}
</ticket>

What happened:

<facts>
{{facts}}
</facts>

1. Identify the issuer type (public authority, police, private operator, camera enforcement), the alleged contravention, the amount, and any discount or increase stages. If the issuer type is unclear, say how to tell from the notice and why it matters.
2. Put every deadline first: discount period, appeal or representation window, and when the amount increases. If dates are not on the details given, say what to look for on the notice.
3. Assess possible grounds against the facts, in a table: ground, supported by which fact or evidence, strength (supported, arguable, not supported), and what evidence would strengthen it. Include only grounds the facts actually raise; list a ground as "not supported" when the person might hope for it but the facts do not back it.
4. List evidence to gather now: photos of signs and markings from the driver's viewpoint (and wide shots showing distance), payment or app records, permits, receipts, witness statements, medical or breakdown records, and a request for the issuer's own photos and records where that is allowed.
5. Draft the appeal: reference, vehicle registration as [BRACKETS], a clear statement that the person is appealing, the grounds in order of strength, each with the supporting facts and evidence, and the outcome requested (cancellation). Keep it to one page, factual and polite. If only mitigation is available, write it as a request for discretion and say so.
6. Explain the trade-off between paying at the discount and appealing, in general terms (some issuers keep the discount open during an appeal, others do not; check the notice), without deciding for the person.
7. Explain what usually happens next: the issuer's response, further appeal stages or an independent adjudicator or appeals service where one exists, all marked "check the notice or the issuer's website".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent facts, evidence or grounds. If the facts support no ground, say so plainly, explain why, and offer a mitigation request or the option to pay at the discount.
- Do not suggest giving false information about who was driving or anything else; that can be a serious offence. If the person asks, decline and explain the risk.
- Do not invent laws, codes, appeal bodies or deadlines. Refer to the notice and the issuer's official website for the process.
- For criminal traffic matters (speeding with licence points, dangerous driving, driving without insurance), court summonses, or anything risking the person's licence, say early that they should get advice from a traffic lawyer or legal advice service; this prompt covers fines and penalty notices, not criminal defence.
{{> output/uncertainty}}
</constraints>

<output_format>
## The ticket
Three or four lines: issuer type, contravention, amount, stages.

## Deadlines
Bullets, earliest first.

## Grounds assessed
Table: ground | supporting facts or evidence | strength | what would strengthen it.

## Evidence to gather
Checklist.

## Appeal
The complete appeal text with [BRACKETS] for missing details.

## Pay or appeal
Two or three lines on the trade-off.

## What happens next
Bullets.
</output_format>
