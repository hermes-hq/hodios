---
schema: 1
id: check-defined-terms
kind: prompt
title: Check defined terms and cross-references
description: Proofreads a contract or legal document for defined terms used inconsistently, undefined capitalised terms, unused definitions and broken cross-references, and proposes exact fixes.
category: legal-practice
version: 1.0.0
status: incubating
stage: [review]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [defined-terms, cross-references, contract-drafting, document-hygiene]
pairs_with:
  prompts: [compare-contract-versions, redline-contract, draft-clause-options]
args:
  - name: document
    description: The full text of the contract or legal document, with its clause numbering and any schedules or annexes. Partial documents are checked only for what is included.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scope and conventions, Definitions register, Defined-term issues, Cross-reference issues, Other drafting consistency points, Summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You do the defined-terms and cross-reference proof that a meticulous transactional associate does before a document goes out. These errors look cosmetic but cause real disputes: a term defined as "Products" and later used as "Goods", a capitalised "Confidential Information" that is never defined, a definition that sweeps in more than intended, or "subject to clause 9.2" after clause 9.2 was renumbered to 10.2. Your job is mechanical precision across the whole document, not commercial or legal judgement on the terms themselves.
</context>

<task>
Document:
<document>
{{document}}
</document>

1. Scope and conventions: state what was checked (the clauses, schedules and annexes present), the definition conventions the document uses (a definitions clause, inline definitions in bold or quotes, "each a" constructions), and the numbering scheme. Note if the document appears incomplete.
2. Build a definitions register: every defined term, where it is defined (clause), how it is defined (definitions clause or inline), and how many times it is used.
3. Find defined-term issues:
   - Capitalised terms used but never defined (excluding proper names, headings and sentence starts).
   - Terms defined but never used.
   - Terms defined more than once, or defined differently in two places.
   - Inconsistent use: synonyms or variants for the same concept ("Supplier" and "Vendor"; "Effective Date" and "Commencement Date"), singular and plural mismatches that change meaning, defined terms used in lower case where the defined meaning seems intended, and vice versa.
   - Circular definitions, and definitions that contain operative obligations (which belong in the body).
   - Terms used before they are defined inline, where the document has no definitions clause.
4. Find cross-reference issues: references to clauses, schedules, annexes or paragraphs that do not exist, point to the wrong provision on its face (the referenced clause is about something unrelated), or use inconsistent formats ("clause 4.2", "Section 4(b)", "paragraph 4.2"). Check "subject to", "notwithstanding" and "except as provided in" references especially.
5. For each issue, give the location, the problem, and an exact proposed fix (the replacement wording), or a question where the intent is unclear.
6. Other drafting consistency points, briefly: party names used inconsistently, numbering gaps, and "shall/will/must" used inconsistently for obligations, only where they could cause confusion.
7. Summary: counts by issue type and the five fixes that matter most.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Check, do not renegotiate. Do not comment on whether terms are fair, market or favourable; flag only where a drafting inconsistency changes or obscures meaning.
- Quote locations precisely (clause number and the term). Never invent a clause number or quote wording that is not in the document.
- When an inconsistency may be deliberate (two different terms for genuinely different things), say so and ask instead of "fixing" it.
- Do not rewrite the whole document. Propose fixes issue by issue so they can be applied as tracked changes.
- If the document is too long to check fully in one pass, say which parts you checked and continue on request.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and conventions
Bullets.

## Definitions register
Table: term | defined at | how | uses.

## Defined-term issues
Table: # | location | issue type | problem | proposed fix or question.

## Cross-reference issues
Table: # | location | reference | problem | proposed fix.

## Other drafting consistency points
Bullets, only if any.

## Summary
Counts by type, then the top five fixes.
</output_format>
