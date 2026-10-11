---
schema: 1
id: secure-rights-to-commissioned-work
kind: prompt
title: Secure rights to commissioned work
description: Works out who likely owns a logo, website, photo or code you paid someone to make, what rights you have now, and drafts the request for a written assignment or licence to discuss with a lawyer.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review, build]
role: [founder, marketer, individual]
subject: [law]
requires: [none]
inputs: [text, document, message]
output: [report, message, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [commissioned-work, ip-assignment, work-made-for-hire, ownership-check, licensing]
pairs_with:
  prompts: [review-freelance-contract, audit-small-business-ip, apply-for-trademark]
args:
  - name: commission
    description: What was made (logo, website, photos, code, illustrations, copy), who made it (freelancer, agency, employee, friend), when, what was paid, and what the agreement, quote, invoice or emails say about ownership or rights. Paste the relevant wording.
    type: text
    required: true
  - name: planned_use
    description: What you want to do with the work, for example register the logo as a trademark, sell merchandise, sell the business, modify it with another designer.
    type: text
    required: true
  - name: country
    description: Where you and the creator are based. Ownership rules for commissioned work differ a lot between countries.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [What you told me, Likely position, Gaps and risks, Request to the creator, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business or individual check whether they own work they paid for. The common surprise: in many countries, paying for a commissioned work does not by itself transfer copyright; the creator usually keeps it unless there is a written assignment, the creator was an employee acting in the course of employment, or a specific statutory rule applies (for example "work made for hire" categories in some countries, which do not cover every kind of commission). Without an assignment the client may only have an implied licence for the purpose the work was made for, which may not cover trademark registration, resale, merchandise, or editing by someone else. Moral rights may also stay with the creator in some places. Fixing this is usually easy while the relationship is good: a short written assignment or a broad licence, sometimes for a modest fee.

Country: {{country}}
</context>

<task>
<commission>
{{commission}}
</commission>

<planned_use>
{{planned_use}}
</planned_use>

{{> guardrails/professional-limits}}

1. What you told me: summarise the facts, quote any rights wording given, and list missing facts that change the answer (employee or contractor, written terms, country of each party).
2. Likely position: in plain words, the general rule for commissioned work as it commonly applies, how the given wording may change it, and what rights the user may have for the planned use. Present it as a preliminary reading, with what would change it.
3. Gaps and risks: what the planned use needs (ownership, an exclusive licence, the right to modify, waiver of moral rights where possible) compared with what the user may have, and third-party elements inside the work (stock images, fonts, open-source code, templates) that carry their own licences.
4. Request to the creator: a friendly message asking to confirm in writing an assignment of copyright (or a licence wide enough for the planned use), listing the works, and suggesting a short document for both to sign. Mention any fee the user is willing to offer only if they gave one.
5. Questions for a lawyer, specific to this case, including whether an assignment must meet formal requirements in the relevant country.
</task>

<constraints>
- Do not state that the user owns or does not own the work as a conclusion; give a preliminary reading and say what decides it.
- Do not cite specific statutes or case names unless certain; describe the rule and the kind of official source to check.
- Do not draft a final assignment deed; list the points it should cover and recommend legal review.
- If there is a dispute with the creator, or the work is central to a sale, investment or trademark filing, recommend a lawyer before acting.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you told me
Bullets, then missing facts.

## Likely position
Short paragraphs, labelled "preliminary reading".

## Gaps and risks
Table: planned use | right needed | what you may have | gap.

## Request to the creator
Ready-to-send message, then the points a written assignment should cover.

## Questions for a lawyer
Numbered.
</output_format>
