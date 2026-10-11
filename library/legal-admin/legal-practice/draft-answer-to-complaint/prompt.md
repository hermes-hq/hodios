---
schema: 1
id: draft-answer-to-complaint
kind: prompt
title: Draft an answer to a complaint
description: Drafts a defendant's answer or defence paragraph by paragraph, admitting, denying or pleading lack of knowledge from the client's facts, with defences and counterclaims flagged for the attorney.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [document, notes]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [answer-to-complaint, pleadings, affirmative-defenses, statement-of-defence, responsive-pleading]
pairs_with:
  prompts: [build-litigation-deadline-calendar, draft-legal-research-memo, index-case-documents]
  personas: [paralegal]
args:
  - name: complaint
    description: The complaint or claim with numbered paragraphs.
    type: text
    required: true
  - name: client_facts
    description: What the client says about each allegation and the documents that support it, including what the client does not know.
    type: text
    required: true
  - name: jurisdiction
    description: The court and the procedural system (for example US federal, a US state, England and Wales, Ontario), since the form and the effect of a failure to deny differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before filing, Response table, Draft answer, Defences and counterclaims to consider, Questions for the client]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In most systems an allegation that is not properly denied may be treated as admitted, so an answer is a paragraph-by-paragraph exercise: admit what is true, deny what is false, and where the client lacks knowledge after reasonable inquiry, say so in the form the rules allow. Compound paragraphs need splitting: admit the part that is true and deny the rest. Blanket denials can breach the duty of candour and annoy the court; careless admissions can lose the case. Defences that are not pleaded may be waived, so the drafter lists the possible affirmative defences for the attorney to evaluate, and checks whether a counterclaim must be brought now or lost. Some systems use a narrative defence rather than numbered responses, and some require a statement of truth or verification.

Jurisdiction: {{jurisdiction}}

Complaint:
<complaint>
{{complaint}}
</complaint>

Client's account:
<client_facts>
{{client_facts}}
</client_facts>
</context>

<task>
1. Before filing: the response deadline to calendar (from the rules, marked to verify), whether any pre-answer motion or objection to jurisdiction or service should be considered first, and the facts still needed.
2. Response table: every paragraph of the complaint, split into its separate allegations where compound, with the proposed response (admit, deny, lack of knowledge, legal conclusion requiring no response where the system allows it) and the client fact or document that supports it.
3. Draft answer: caption placeholders, responses in the jurisdiction's usual form, a general denial of anything not expressly admitted only where the rules allow it, defences as numbered placeholders for the attorney's choice, prayer for relief, and signature and verification block placeholders.
4. Defences and counterclaims to consider: possible affirmative defences suggested by the facts (for example limitation, waiver, failure to mitigate, set-off) with the facts that support each and whether waiver risk applies, and possible counterclaims with any compulsory-counterclaim risk, all to evaluate.
5. Questions for the client: everything needed to move a "lack of knowledge" to an admission or denial.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Respond only on the client's facts. Never deny an allegation the client says is true, and never admit one the client disputes; mark gaps for inquiry.
- Do not decide which defences to plead; present them for the attorney's judgment with the facts behind each.
- Do not cite rules or cases as certain; mark deadlines and form requirements to verify.
- Draft for attorney review and signature. Use [BRACKETS] for case numbers, names and dates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before filing
Bullets.
## Response table
Table: Para | Allegation | Response | Basis.
## Draft answer
The full draft.
## Defences and counterclaims to consider
Table: Defence or claim | Supporting facts | Waiver risk | Decide by.
## Questions for the client
Numbered.
</output_format>
