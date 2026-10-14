---
schema: 1
id: respond-to-request-for-evidence
kind: prompt
title: Respond to a request for evidence
description: Breaks an immigration authority's request for more evidence into each item asked for, plans the documents that answer it, and drafts a cover letter mapping every item to an exhibit.
category: immigration
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, job-seeker, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [table, checklist, docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [request-for-evidence, missing-documents, cover-letter, exhibit-index, response-deadline]
pairs_with:
  prompts: [prepare-visa-application, write-immigration-status-enquiry, translate-personal-document]
args:
  - name: request_text
    description: The request letter or notice in full, in the original language, with reference and passport numbers removed.
    type: text
    required: true
  - name: country
    description: The country and the application it relates to.
    type: string
    required: true
  - name: what_you_have
    description: The documents you already submitted and those you can get, with how long each would take. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Deadline and method, What is being asked, Evidence plan, Cover letter, Before you send, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A request for more evidence means the application is still alive but something is not yet proven. The officer usually lists specific items, and the response is judged against that list: answering a different question, sending a pile of loosely related papers, missing one item, or sending late often leads to refusal on the existing file. Experts respond item by item, give each document an exhibit number, explain briefly what each proves and why an exact document is unavailable if it is (with the best alternative evidence), keep everything consistent with the original application, follow the stated format (online upload, post, certified copies, translations) and keep proof of submission. Some requests are a step before refusal; a response that changes the story or reveals a new problem may need an adviser.

Country and application: {{country}}

<request_text>
{{request_text}}
</request_text>
{{#what_you_have}}
<what_you_have>
{{what_you_have}}
</what_you_have>
{{/what_you_have}}
</context>

<task>
1. Deadline and method: quote the response deadline and how to submit (upload, post, in person, format, translations, certified copies). If the deadline is near and a document cannot arrive in time, say to ask the authority for an extension in writing before the deadline and to keep proof, and draft one line for that request.
2. What is being asked: split the request into numbered items in the officer's own words, with what each item is trying to prove.
3. Evidence plan: for each item, the best document, alternatives if it is unavailable, who issues it, lead time, whether translation or certification is needed, and status. Mark any item where the honest answer could create a new problem and suggest adviser review.
4. Cover letter: short, with the application reference placeholder, a numbered list mapping each requested item to its exhibit and a one-line explanation, and an explanation for anything not available with what is provided instead.
5. Before you send: a checklist covering every item answered, consistency with the original application, names and dates matching across documents, copies kept, proof of submission.
6. Questions for an adviser or the authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest creating, altering or backdating documents, or explaining away facts untruthfully. Decline and explain the risk of refusal and bans.
- Do not predict the decision.
- Quote deadlines from the letter and tell the user to confirm them; do not calculate them from assumptions.
- Use placeholders for reference and identity numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadline and method
## What is being asked
Numbered, quoting the request.
## Evidence plan
Table: Item | Best document | Alternative | Issued by | Lead time | Translation or certification | Status.
## Cover letter
## Before you send
Checkboxes.
## Questions for an adviser
</output_format>
