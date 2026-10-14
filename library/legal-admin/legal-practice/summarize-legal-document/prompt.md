---
schema: 1
id: summarize-legal-document
kind: prompt
title: Summarise a legal document
description: Summarises a case document - judgment, pleading, contract, transcript or letter - into a pinpoint-cited summary of key points, dates, issues and open questions, for attorney review.
category: legal-practice
version: 1.0.0
status: incubating
stage: [discover, review]
role: [legal-professional, student]
subject: [law]
requires: [none]
inputs: [document, text]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [case-summary, pinpoint-citations, key-dates, document-review, law-firm]
pairs_with:
  prompts: [brief-court-case, summarize-deposition-transcript, index-case-documents, draft-legal-research-memo]
  personas: [law-school-tutor]
args:
  - name: document
    description: The document text, or the parts to summarise, with page or paragraph numbers if you have them. Remove client names and identifiers you do not need.
    type: text
  - name: purpose
    description: Who the summary is for and what they need from it, for example "partner wants the key admissions before a call", "class case brief", "check this lease for renewal and break dates".
    type: text
  - name: jurisdiction
    description: Jurisdiction and court or forum, if relevant. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What this is, Short summary, Key points, Dates and deadlines, Issues and gaps, Questions for the reviewing attorney, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support lawyers, paralegals and law students by turning a legal document into a summary a supervising attorney can rely on. A plain "summarise this" fails in practice: it paraphrases without pinpoint citations, mixes what the document says with what the model assumes, drops dates and deadlines, and smooths over ambiguity that matters. A useful summary is organised for its purpose, cites every point to page, paragraph or line, separates fact from characterisation, and flags what the document does not say.

{{#purpose}}Purpose: {{purpose}}
{{/purpose}}{{#jurisdiction}}Jurisdiction: {{jurisdiction}}
{{/jurisdiction}}{{#document}}The document:
<document>
{{document}}
</document>
{{/document}}
</context>

<task>
1. Missing essentials. If you do not have the document text, or you cannot tell what the summary is for (here or in their message), ask these and stop:
   1. Please paste the document, or the sections to cover, with page or paragraph numbers if possible.
   2. Who is the summary for and what do they need? (for example "supervising attorney, key admissions before a settlement call")
   3. What kind of document is it and in which jurisdiction? (for example "appellate opinion, California")
   Say that if they answer "just do it", you will write a general summary for an attorney who has not read the document. If they gave enough, skip this step.
2. What this is: document type, parties or authors, date, court or forum, procedural posture or context, and length covered. If only part of the document was provided, say which part.
3. Short summary: three to five sentences an attorney can read in thirty seconds, shaped by the purpose.
4. Key points: the points that matter for the purpose (for a judgment: facts, issue, holding, reasoning, disposition; for a pleading: claims, relief, key allegations; for a contract: parties, obligations, payment, term, termination, liability, governing law; for a transcript: admissions, denials, inconsistencies). Each point has a pinpoint citation to the source.
5. Dates and deadlines: every date and time limit in the document, with its source. Mark any deadline you compute as "computed, verify against the rules".
6. Issues and gaps: ambiguities, inconsistencies, missing exhibits or pages, and points where the document is silent.
7. Questions for the reviewing attorney: decisions or judgment calls you left open.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a work product for attorney review, not legal advice to a client. Say so once at the top.
- Use only the document provided. Never add facts, quotations, case names or citations that are not in it; if you refer to outside law, mark it "to verify" and keep it out of the key points.
- Quote exactly when wording matters, and mark paraphrase as paraphrase.
- Do not predict the outcome of the matter or tell anyone what to do in it.
- Remind them once not to paste privileged or identifying client details they do not need.
</constraints>

<output_format>
## What this is
## Short summary
## Key points
Table: Point | Source (page, paragraph or line).
## Dates and deadlines
Table: Date | What | Source | Verified or computed.
## Issues and gaps
## Questions for the reviewing attorney
## Next steps
One line: for a specific job, try "Brief a court case", "Summarise a deposition transcript", "Index case documents and build a chronology" or "Draft a legal research memo".
</output_format>
