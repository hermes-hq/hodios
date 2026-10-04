---
schema: 1
id: draft-privilege-log
kind: prompt
title: Draft privilege log entries
description: Drafts privilege log entries from a document list - date, author, recipients, type, privilege and a description that supports the claim without revealing privileged content - for attorney review.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build, review]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, dataset]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [privilege-log, ediscovery, attorney-client-privilege, work-product, document-review, litigation-support]
pairs_with:
  prompts: [draft-discovery-requests, index-case-documents]
  personas: [paralegal]
args:
  - name: documents
    description: The withheld or redacted documents, one per line - control or Bates number, date, author, recipients and copyees with roles (mark lawyers), document type, subject line or a neutral summary of the topic, and whether withheld in full or redacted.
    type: text
    required: true
  - name: privilege_types
    description: The privileges or protections the reviewing attorney has asserted or is considering, for example attorney-client privilege, work product, common interest, legal advice privilege, litigation privilege. Optional; without it the draft proposes a basis per entry for the attorney to confirm.
    type: text
  - name: jurisdiction
    description: The court and governing rules, for example "US federal court, FRCP 26(b)(5)", "Delaware Chancery", "England and Wales". Format and detail expectations differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Log conventions used, Privilege log, Entries needing attorney decision, Consistency checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft privilege log entries for litigation support teams. A log has to give the other side and the court enough information to assess each claim of privilege without disclosing the privileged content itself. Courts reject logs with boilerplate descriptions ("email re legal advice") for every entry, missing authors or recipients, unidentified lawyers, or claims over business communications where no lawyer is giving or being asked for legal advice. They also find waiver where a description reveals the substance of the advice. Recurring problems include lawyers copied only for information, third parties on the distribution who break confidentiality, attachments that need their own entries, and threads where only some messages are privileged and redaction would do. Your job is a consistent, defensible first draft and a clear list of the entries that need an attorney's judgment. The privilege calls themselves belong to the reviewing attorney.

Jurisdiction: {{jurisdiction}}
{{#privilege_types}}Privileges asserted or under consideration:

<privilege_types>
{{privilege_types}}
</privilege_types>
{{/privilege_types}}
</context>

<task>
Documents:

<documents>
{{documents}}
</documents>

1. If the list lacks dates, authors or recipients for most entries, say exactly which fields are needed and stop. If only some entries lack them, continue and mark the gaps "[MISSING]".
2. State the log conventions you used: column set, date format, how lawyers are marked (for example "Esq." or an asterisk), how families and attachments are logged, and how redacted versus withheld documents are distinguished. Note any format the rules or a protective order commonly require in {{jurisdiction}}, marked "to confirm against the governing order".
3. Draft one log entry per document, and separate entries for attachments: control number, date, document type, author, recipients, copyees, privilege or protection asserted, withheld or redacted, and a description. Each description identifies the general subject and the purpose that makes it privileged (for example "Email from in-house counsel to Head of HR providing legal advice regarding proposed termination process") without revealing what the advice was, what facts were investigated, or the lawyer's conclusions.
4. Vary descriptions so they reflect each document; avoid identical boilerplate across entries unless the documents are genuinely identical in nature.
5. List the entries that need an attorney's decision, with the reason: no lawyer on the communication, a lawyer only copied, a third party on the distribution (consultant, broker, family member), predominantly business content, a document likely to have been shared outside the privileged group, a thread with mixed content better redacted than withheld, or a description that would be hard to write without revealing substance.
6. Run consistency checks: the same privilege basis is described the same way, each lawyer is identified consistently, attachments track their parent, dates are in one format, and no description quotes or paraphrases the advice.
7. Before answering, re-read every description and remove any phrase that discloses the content of advice, opinion or strategy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for review by the attorney responsible for the privilege calls. Mark the log "DRAFT - attorney work product". Do not decide that a document is privileged; propose a basis and flag uncertain entries.
- Use only the information supplied. Do not invent authors, recipients, dates or lawyer status; mark gaps "[MISSING]".
- Descriptions must never reveal the substance of legal advice, mental impressions or strategy.
- Do not state the governing format requirements as fact; mark them to confirm against the rules, local practice and any order in the case.
- Refer to individuals by the name or role given in the input; do not add personal details.
{{> output/uncertainty}}
</constraints>

<output_format>
## Log conventions used
Bullets.

## Privilege log
Table: control no. | date | type | author | recipients | cc | privilege | withheld / redacted | description.

## Entries needing attorney decision
Table: control no. | issue | suggested next step.

## Consistency checks
Checklist with results.
</output_format>

<examples>
<example>
Weak: "Email re legal advice."
Too revealing: "Email from outside counsel advising that the non-compete is likely unenforceable in California."
Good: "Email from outside counsel (Esq.) to General Counsel providing legal advice regarding enforceability of restrictive covenants in employment agreements."
</example>
</examples>
