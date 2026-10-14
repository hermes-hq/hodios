---
schema: 1
id: prepare-manuscript-legal-read
kind: prompt
title: Prepare a manuscript for a legal read
description: Flags passages in a nonfiction manuscript a publisher's lawyer is likely to query, such as claims about real people, private facts and confidential material, and builds the evidence file.
category: nonfiction
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [defamation-risk, privacy, pre-publication-check, evidence-file, real-people]
pairs_with:
  prompts: [assess-use-of-copyrighted-material, write-composite-case-study]
  workflows: [manuscript-fact-check-track]
args:
  - name: manuscript_extract
    description: The chapter or passages involving real people, organisations, private information, quotations or confidential documents.
    type: text
    required: true
  - name: country
    description: Where you and the publisher are based and the main countries where the book will be sold. Defamation and privacy law differ a lot.
    type: string
    required: true
  - name: evidence_notes
    description: What evidence you hold for the sensitive statements, for example interview recordings, documents, court records, published reports.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Scope and limits, Flagged passages, Evidence file, Questions for the lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors prepare for a publisher's legal read (a pre-publication review by a lawyer). The lawyer's time is expensive and the author's preparation decides how smooth it is. Lawyers commonly look for: statements of fact that damage the reputation of an identifiable person or organisation (including by implication and by identification through details, not only names); private information about real people (health, sexuality, family, finances) disclosed without a clear public interest; reconstructed dialogue and quotations presented as exact; material from confidential documents or leaked sources; allegations of crime that have not been proven; and long quotations from other works. Truth is usually a defence only if it can be proven with evidence the author holds, and the burden and the defences differ by country.

<manuscript_extract>
{{manuscript_extract}}
</manuscript_extract>
Country: {{country}}
{{#evidence_notes}}Evidence held: {{evidence_notes}}{{/evidence_notes}}
</context>

<task>
1. State the scope: this is a preparation aid that flags passages for the lawyer, not a legal opinion.
2. Go through the extract and flag every passage that names or identifies a real person or organisation in a negative or private context, attributes words or motives to someone, alleges wrongdoing, discloses private facts, relies on confidential material, or quotes another work at length.
3. For each flag, say why a lawyer may query it, how it could be phrased more carefully without losing the point (for example attributing a claim to its source, distinguishing fact from opinion, adding the subject's response), and what evidence would support it.
4. Build the evidence file the lawyer will want: for each flagged statement, the evidence held (from the notes) and what is missing.
5. List questions for the lawyer, including any country-specific points the author should raise.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a passage is safe, not defamatory or legal; give a reason it may be queried and a risk level labelled preliminary.
- Do not invent evidence or assume the author holds documents not listed.
- Do not suggest ways to disguise an allegation so it cannot be challenged while keeping the same damaging meaning.
- Note that offering the subject a right of reply before publication is often good practice and sometimes important to defences; the lawyer will advise.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and limits

## Flagged passages
Table: # | Passage (short quote) | Concern | Preliminary risk | Safer phrasing option | Evidence that would support it.

## Evidence file
Table: Statement | Evidence held | Missing | Action.

## Questions for the lawyer
Numbered.
</output_format>
