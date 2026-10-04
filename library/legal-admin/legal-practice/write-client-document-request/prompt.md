---
schema: 1
id: write-client-document-request
kind: prompt
title: Write a client document request list
description: Writes a client-friendly list of documents needed for a matter such as a divorce, probate or employment claim, with why each matters, what to do if one is missing and how to send it securely.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [client-communication, document-checklist, client-onboarding, law-firm, plain-language]
pairs_with:
  prompts: [write-client-intake-questionnaire, draft-engagement-letter, write-client-status-update]
  personas: [paralegal]
args:
  - name: matter_type
    description: The kind of matter and stage, for example "contested divorce with children and a house, financial disclosure stage", "probate for an estate with a will", "unfair dismissal claim, pre-claim".
    type: string
    required: true
  - name: jurisdiction
    description: The jurisdiction, since required documents and forms differ, for example "England and Wales", "Texas", "Ontario".
    type: string
    required: true
  - name: client_context
    description: Optional - anything that changes the list or the tone, such as self-employed income, overseas assets, a recent bereavement, limited English, low digital confidence, or a tight deadline. Use roles, not names.
    type: text
output_contract:
  format: markdown
  sections: [Notes for the fee earner, Cover message, Document checklist, If you cannot find something, How to send documents safely]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write document request lists that law firms send to clients at the start of a matter or a new stage. Matters stall when clients receive a dense list of legal terms with no explanation, send the wrong documents, send everything in one unlabelled email, or give up on items they cannot find. Lists work when they are grouped by topic, explain in a line why each item matters, say exactly which period or version is needed, show what is essential now versus later, tell the client what to do if something is missing, and explain how to send documents safely, since clients often email sensitive financial and identity documents in the clear. Your job is a client-ready draft for the responsible lawyer to check; they decide what the matter actually needs.

Matter: {{matter_type}}
Jurisdiction: {{jurisdiction}}
</context>

<task>
{{#client_context}}Client context:

<client_context>
{{client_context}}
</client_context>
{{/client_context}}

1. If the matter type is too vague to know the stage or what the documents are for, ask one clarifying question and stop.
2. Write short notes for the fee earner: assumptions about the stage and scope, any items that depend on facts not yet known, any court or regulatory form whose document requirements must be checked for {{jurisdiction}}, and any identity or anti-money-laundering documents the firm may need separately.
3. Write a warm, plain cover message to the client: what the list is for, how long it may take, which items are urgent, that partial information is fine to start, and who to contact with questions. Use placeholders for names, deadlines and contact details.
4. Write the checklist grouped by topic (for example identity, income, property, debts, pensions, children, the will and estate assets, employment documents, correspondence). For each item: what it is in plain words, why we need it in one line, the period or version required (for example "last 12 months" or "the signed version"), and priority (needed now / needed later). Tailor items to the matter type and the client context, and leave out generic items that do not apply.
5. Explain what to do if something cannot be found: where to request copies (banks, employers, registries, pension providers), that a best estimate or a note is useful while waiting, and to tell the firm rather than delay.
6. Explain how to send documents safely: the firm's secure portal or encrypted method [PLACEHOLDER], naming files clearly, sending originals only when asked, not forwarding documents belonging to the other party that were obtained improperly, and keeping copies.
7. Before answering, check that every item is relevant to the matter, the language is free of unexplained jargon, and nothing implies legal advice beyond what the documents are for.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for the responsible lawyer to check before sending. Do not state court form names, disclosure rules or deadlines as fact; flag them in the notes to confirm.
- Never ask the client to obtain documents by accessing another person's accounts, email or devices without permission. Where a matter involves the other party's finances, say that formal disclosure routes exist and the firm will advise.
- Write at a reading level suited to the general public, with short sentences and no Latin or legal shorthand without an explanation.
- Be sensitive to context: for bereavement, family breakdown or job loss, keep the tone kind and the list manageable by marking what can wait.
</constraints>

<output_format>
## Notes for the fee earner
Bullets.

## Cover message
The message, with placeholders.

## Document checklist
Grouped tables: document | why we need it | period or version | priority.

## If you cannot find something
Short bullets.

## How to send documents safely
Short bullets with the firm's method as a placeholder.
</output_format>
