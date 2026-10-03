---
schema: 1
id: draft-discovery-requests
kind: prompt
title: Draft discovery requests
description: Drafts interrogatories, requests for production and requests for admission tied to the case issues and facts, with numbering-limit checks and objection risks, for attorney review.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, document, notes]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [written-discovery, interrogatories, requests-for-production, requests-for-admission, litigation-support]
pairs_with:
  prompts: [index-case-documents, prepare-deposition-outline, outline-motion-argument]
  personas: [paralegal]
args:
  - name: case_facts
    description: The facts as your side knows them, the parties, the claims and defences pleaded, and what the other side is likely to hold (documents, systems, people). Note facts still to be confirmed.
    type: text
    required: true
  - name: issues
    description: The disputed issues or elements you need evidence on, in priority order, plus anything the supervising attorney asked to target (a meeting, a contract, a data set, damages).
    type: text
    required: true
  - name: jurisdiction
    description: The court and procedural rules that govern (for example "US federal court, FRCP", "California Superior Court", "Texas state court"), and any local rules, scheduling order or agreed limits you know of.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Rules check, Discovery map, Definitions and instructions, Interrogatories, Requests for production, Requests for admission, Before service]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft written discovery the way a seasoned litigation associate does for a partner's review. Good discovery is built backwards from what must be proved or disproved at trial or on summary judgment: every request maps to an issue, asks for something the other side actually holds, and is drafted tightly enough to survive the standard objections (overbroad, unduly burdensome, vague, not proportional, compound, seeks privileged material). Sloppy requests waste the numerical limits that many systems impose on interrogatories and admissions, invite boilerplate objections, and leave gaps a motion to compel cannot fix later. Discovery rules differ sharply between jurisdictions, and many systems outside the US have disclosure rather than party-propounded requests, so the rules you are working under are always stated and marked for confirmation.
</context>

<task>
Jurisdiction and rules: {{jurisdiction}}

Case facts:
<facts>
{{case_facts}}
</facts>

Issues to target:
<issues>
{{issues}}
</issues>

1. Check fit. Confirm the jurisdiction uses party-propounded interrogatories, requests for production and requests for admission. If it uses a different model (for example standard disclosure and specific disclosure applications in England and Wales), say so first, then adapt: produce a list of document categories to seek and a draft request letter or application outline instead.
2. Build a discovery map: for each issue, the facts you need, who likely holds the evidence, and which tool fits best (interrogatory for identities, dates and contentions; production for documents and electronically stored information; admission to narrow undisputed facts and authenticate documents).
3. Draft definitions and instructions: defined terms (Document, Communication, You/Your, Relating to, the relevant time period), the format for electronically stored information, how to handle withheld privileged material (a privilege log), and the continuing duty to supplement, if the rules impose one. Keep definitions no broader than the issues need; overbroad definitions are the most common objection.
4. Draft interrogatories, numbered, each a single question with no hidden subparts, and count them against the limit you understand applies, stating that limit and marking it to confirm.
5. Draft requests for production, numbered, each describing a category with reasonable particularity, a date range and the custodians or systems where known.
6. Draft requests for admission, numbered, each a single fact stated so it can be admitted or denied plainly, including authentication of key documents named in the facts.
7. For every request, give the issue it serves and the likely objection with how the drafting already anticipates it.
8. List what to confirm before service: numerical limits, timing (whether discovery is open), service method, any protective order or ESI protocol, and facts marked unconfirmed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Everything is a draft for the supervising attorney, who decides what is served. Mark the document "DRAFT - attorney work product - for review".
- Use only the facts given. Do not invent names, dates, documents or custodians; use [BRACKETS] where a fact is missing.
- Do not cite rule numbers, cases or local rules as authority unless the user supplied them or you are certain of them; otherwise describe the requirement and mark it "confirm under the governing rules".
- No compound questions, no "any and all documents relating to the case", no requests that call for privileged material on their face.
- Proportionality matters: prefer ten targeted requests to forty sweeping ones, and say where you deliberately held back.
- Never draft requests designed to harass, to burden a party into settlement, or to obtain information for a purpose outside the litigation.
- If the facts or issues are too thin to target requests, ask up to five specific questions and give only the discovery map.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rules check
Two to four sentences: the discovery model assumed, limits assumed, and what to confirm.

## Discovery map
Table: issue | facts needed | likely holder | tool.

## Definitions and instructions
Numbered.

## Interrogatories
Numbered; after each, an italic line: *Issue: ... | Likely objection: ...*. End with a count against the limit.

## Requests for production
Numbered, same italic line after each.

## Requests for admission
Numbered, same italic line after each.

## Before service
Checklist.
</output_format>
