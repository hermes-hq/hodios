---
schema: 1
id: check-leaked-document-authenticity
kind: prompt
title: Check whether a leaked document is authentic
description: Plans how to verify a leaked or anonymously supplied document through provenance, file metadata, internal details, comparison with known genuine documents and confirmation with sources.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher]
requires: [none]
inputs: [document, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [leaked-documents, document-forensics, source-protection, investigative-journalism, newsroom]
pairs_with:
  prompts: [verify-image-provenance, verify-quotes-against-source, write-fact-checking-methodology]
  personas: [fact-checker]
args:
  - name: document
    description: The document's text or a description of it (type, claimed author and date, letterhead, signatures, reference numbers, format), and how it reached you, without naming a confidential source.
    type: text
    required: true
  - name: stakes
    description: Optional. What you would publish from it and who it could affect.
    type: text
output_contract:
  format: markdown
  sections: [Initial assessment, Provenance questions, Internal checks, External checks, Confirmation plan, Before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Forged documents have embarrassed major news organisations, usually because the content confirmed what reporters already believed. Experienced investigative teams verify a document on several independent tracks. Provenance: how did it reach you, through how many hands, and why now? Internal consistency: does the format match genuine documents from that organisation for that date (templates, reference numbering, classification markings, job titles, people who held those posts then, office addresses, typefaces and software available at the time), and are the facts in it consistent with each other and with the public record? File evidence: metadata such as author, creation software and dates can support or undercut a story, but it is easily altered and also leaks the identity of the source, so it needs careful handling. Confirmation: the strongest test is a second, independent source who has seen the document, or the organisation itself confirming it, often after being shown extracts rather than the full text. A document can be genuine and still misleading: a draft that was never adopted, or one part of a longer exchange.
</context>

<task>
Help me verify this document.
<document>
{{document}}
</document>
{{#stakes}}What is at stake: {{stakes}}{{/stakes}}

1. Give an initial assessment of what the document claims to be and the biggest risks: forgery, a genuine but superseded draft, selective extraction, or a plant meant to discredit the outlet.
2. List the provenance questions to put to the source and to yourself, including chain of custody and motive.
3. Check what can be checked internally from the text supplied: dates against weekdays and holidays, names and job titles against the period, reference formats, internal contradictions, anachronistic terms or technology, and language that does not fit the organisation.
4. Plan the external checks: comparison with known genuine documents from the same body and period, public records, file metadata review on a copy, and what a document examiner could test for paper originals.
5. Plan confirmation: independent sources who could have seen it, how to approach the organisation for comment, and what to show them without exposing the source.
6. List the conditions to meet before publishing and how to describe the verification honestly in the story.
</task>

<constraints>
- Never state that the document is genuine or fake on the basis of this review alone; give an assessment and a plan.
- Do not invent facts about the organisation, its templates or its staff. Mark anything you would need to confirm.
- Protect the source: advise working on copies, removing identifying metadata and markings before sharing extracts with anyone, and never ask for the source's identity.
- Do not advise obtaining further documents by hacking, deception or other unlawful means; note that laws on leaked material differ by country and that the user's legal or editorial counsel should be consulted for high-stakes publication.
- Say clearly when the evidence available cannot support publication.
</constraints>

<output_format>
## Initial assessment
## Provenance questions
Numbered list.
## Internal checks
Table: detail | what it should look like if genuine | finding from the text | status (consistent, inconsistent, needs checking).
## External checks
## Confirmation plan
## Before publishing
Checklist, including source-protection steps and wording for describing the verification.
</output_format>
