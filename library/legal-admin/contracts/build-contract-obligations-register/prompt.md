---
schema: 1
id: build-contract-obligations-register
kind: prompt
title: Build a contract obligations register
description: Extracts obligations, deadlines, renewal and notice dates, and owners from several contracts into one register table, with the next dates to diarise and the gaps to resolve.
category: contracts
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [operations-manager, founder, legal-professional, project-manager]
subject: [law]
requires: [none]
inputs: [document]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contract-management, renewals, notice-periods, obligations-tracking]
pairs_with:
  prompts: [summarize-contract, compare-contract-versions]
args:
  - name: contracts
    description: 'The text of two or more contracts, each starting with a line like "=== CONTRACT: name ===", plus the signature or start date of each if it is not in the text, the team or person who owns each relationship, and today''s date for the upcoming-dates list.'
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Contracts covered, Key dates, Obligations register, Next 90 days, Gaps and conflicts]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build obligation registers the way a contract manager does when a small company realises nobody is tracking what it signed. The register exists so that no renewal rolls over by accident, no notice window is missed, and every promise the business made (reports, insurance certificates, audits, price reviews, minimum purchases, data deletion) has a named owner and a date. Accuracy beats completeness: a wrong date in a register is worse than a blank, because people trust the register.
</context>

<task>
Contracts:

<contracts>
{{contracts}}
</contracts>

1. List each contract: name, counterparty, type, start or signature date, initial term, governing law. If a contract has no identifiable start date, say so; do not guess.
2. For each contract extract key dates: expiry, renewal mechanism (automatic, by agreement, none), renewal term, notice period to stop renewal, the last day to give that notice, price review dates, and termination notice for convenience. Calculate a date only when the inputs are explicit, show the calculation (for example "1 Mar 2026 + 24 months = 28 Feb 2028; minus 90 days notice = 30 Nov 2027"), and mark every calculated date "verify". Where the contract counts in business days or from receipt, say so instead of calculating.
3. Extract every obligation on either party: what must be done, by whom (our side or the counterparty), trigger or frequency, deadline, the consequence of missing it, and the clause. Include recurring duties (monthly reports, quarterly reviews, annual insurance certificates), one-off duties (deliver, return data on exit), conditional duties (notify a breach within 72 hours), restrictions (exclusivity, non-solicit, confidentiality after termination) and how notices must be sent (address, email, form).
4. Assign an owner: use the owner given in the input; otherwise suggest a function (finance, legal, account owner, IT) and mark it "suggested".
5. Pull everything due in the next 90 days into a short list, earliest first. The reference date is the date the user states; if none is given, ask for it and leave that section as a template.
6. List gaps and conflicts: missing schedules, undefined dates, contracts that conflict with each other (two exclusivity clauses, different notice addresses for the same counterparty), and obligations with no clear trigger.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Every row cites its contract and clause. Never invent a date, amount, owner or obligation that is not in the text or the user's notes.
- Keep each contract's own wording for the obligation in a short quote when the exact words matter (deadlines, "best efforts", "promptly").
- Do not interpret ambiguous clauses into a firm date. Mark them "unclear" and put them in gaps.
- Do not advise whether to renew or terminate. If a notice window is close or has passed, flag it prominently and suggest confirming the dates and position with whoever owns the contract or a lawyer.
- The register must be easy to paste into a spreadsheet: one obligation per row, no merged cells, ISO dates (YYYY-MM-DD).
{{> output/uncertainty}}
</constraints>

<output_format>
## Contracts covered
Table: contract | counterparty | type | start | term | governing law | missing documents.

## Key dates
Table: contract | event (expiry, renewal, notice deadline, price review) | date | how calculated | clause | status (stated / calculated - verify / unclear).

## Obligations register
Table: ID | contract | obligation | party (us / them) | frequency or trigger | deadline | consequence | clause | owner.

## Next 90 days
Numbered, earliest first: date - contract - what to do - owner. Flag any notice window that closes in this period in bold.

## Gaps and conflicts
Bullets, each with the contracts and clauses involved and the question that would resolve it.
</output_format>
