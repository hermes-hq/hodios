---
schema: 1
id: write-contract-award-letter
kind: prompt
title: Write a contract award letter
description: Writes the letter telling the winning bidder they have been selected, with the conditions still to meet, any standstill period, next steps to contract and a clear statement of what is not yet binding.
category: business-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [operations-manager, manager, project-manager, consultant]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [award-letter, intention-to-award, procurement, preferred-supplier, standstill]
pairs_with:
  prompts: [write-tender-evaluation-report, reject-vendor-proposal, write-rfp]
args:
  - name: award_details
    description: The tender or project, the winning bidder and contact, contract value and term, and the decision date.
    type: text
    required: true
  - name: conditions_and_steps
    description: Conditions before contract (such as references, insurance, due diligence, final price confirmation), any standstill period, the contract signing process, kickoff dates and who to contact.
    type: text
    required: true
  - name: letter_type
    description: Whether this is a notice of intention to award (not final yet) or a final award.
    type: enum
    enum: [intention-to-award, final-award]
    default: intention-to-award
output_contract:
  format: markdown
  sections: [Letter, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An award letter is good news, but buyers get into trouble when its wording accidentally creates a contract before terms are signed, or when a supplier starts work and invoices on the strength of an enthusiastic email. Procurement teams separate a notice of intention to award (the decision is made, but standstill, conditions or approvals remain) from the final award, and say plainly that no binding contract exists until the contract is signed or a purchase order issued. Good letters confirm exactly what was awarded (reference, lots, value, term), list the conditions and their deadlines, explain any standstill period, ask the supplier not to start work or incur costs yet, and give the next steps and contact. In public procurement the losing bidders are often notified at the same time, so dates should match.
</context>

<task>
Write a {{letter_type}} letter.

<award_details>
{{award_details}}
</award_details>

<conditions_and_steps>
{{conditions_and_steps}}
</conditions_and_steps>

1. If the winning bidder or what was awarded is missing, ask in one short message and stop.
2. Subject line with the tender reference and "Notice of intention to award" or "Contract award".
3. Opening: the decision, what it covers (reference, lots, scope summary), value and term as given, and thanks for the bid.
4. Status: for intention to award, state that the decision is subject to the standstill period (if any) and the listed conditions, and that it does not create a contract. For final award, state what document creates the contract (signature or purchase order) and that work should not start before it.
5. Conditions: each with its deadline and what the supplier must provide.
6. Next steps: contract documents, signing, kickoff or mobilisation, with dates where given.
7. A line asking the supplier to keep the decision confidential until the buyer announces it, if the input suggests that.
8. Contact details placeholder and sign-off.
</task>

<constraints>
- Use only facts given; mark missing dates, values or names `[NEEDED: …]`.
- Never state or imply that a binding contract exists when it does not; avoid phrases like "you are hereby engaged" in an intention letter.
- Do not state the length of a legal standstill period from memory; use the period given or mark it `[NEEDED: standstill period, confirm with procurement or legal]`.
- Warm but formal; about 250 to 450 words.
</constraints>

<output_format>
## Letter
Subject, letter body with conditions as a numbered list.
## Check before sending
Up to four checks, such as aligning the date with the unsuccessful bidder letters and confirming the approver has signed the evaluation report.
</output_format>
