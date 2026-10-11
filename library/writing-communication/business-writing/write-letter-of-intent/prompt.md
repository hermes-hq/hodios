---
schema: 1
id: write-letter-of-intent
kind: prompt
title: Draft a letter of intent or heads of terms
description: Drafts a business letter of intent or heads of terms for a deal, lease, supply or partnership, setting out key terms and marking clearly which clauses bind and which do not.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, operations-manager, consultant]
advice_risk: [legal]
requires: [none]
inputs: [notes, document]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [letter-of-intent, heads-of-terms, term-sheet, deal-terms, subject-to-contract]
pairs_with:
  prompts: [review-letter-of-intent, write-partnership-proposal]
args:
  - name: deal
    description: The type of deal and the parties - for example acquiring a business, leasing premises, a supply or distribution agreement, a joint venture - with who is writing the letter.
    type: string
    required: true
  - name: terms
    description: The agreed or proposed terms - price or rent, structure, scope, duration, conditions, due diligence, timetable, people involved - and what is still open.
    type: text
    required: true
  - name: binding_wishes
    description: Which parts you want to be binding now (often exclusivity, confidentiality, costs) and anything else you want to be firm or kept open.
    type: text
output_contract:
  format: markdown
  sections: [Letter of intent, Binding and non-binding map, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help business owners draft letters of intent (also called heads of terms, term sheets, memorandums of understanding) before a full contract. An LOI records the main commercial terms so lawyers can draft the contract, and it signals commitment. The danger is ambiguity about what binds: courts in several countries have treated LOIs as binding contracts when the wording sounded final ("we agree", "the parties shall") or the parties acted on them, and parties have lost exclusivity or confidentiality protection when those clauses were not clearly binding. Experienced drafters state at the top and in a closing clause that the letter is non-binding except for named clauses, use "subject to contract" or the local equivalent, use "proposed" or "intend" language for commercial terms, list conditions such as due diligence, financing, board approval and permits, set an exclusivity period with an end date, and add an expiry date for the whole letter.

Deal: {{deal}}

<terms>
{{terms}}
</terms>
{{#binding_wishes}}
<binding_wishes>
{{binding_wishes}}
</binding_wishes>
{{/binding_wishes}}
</context>

<task>
1. If you cannot tell who the parties are or what is being agreed, ask and stop.
2. Draft the letter:
   - Heading, date, parties with placeholders for legal names and registered addresses, and a "subject to contract" or non-binding statement at the top.
   - Background: one paragraph on the purpose.
   - Proposed terms: numbered clauses for each commercial term supplied (price or consideration and how it is paid, scope or premises, duration, key obligations, people, timetable), using "proposed" and "intend" wording.
   - Conditions: due diligence, financing, approvals, permits, satisfactory definitive agreement.
   - Binding clauses, clearly headed: typically confidentiality, exclusivity with its period and end date, costs (each party bears its own), governing law and jurisdiction as [to choose], and the non-binding statement itself.
   - Expiry: the date the letter lapses if not signed or if no definitive agreement is reached.
   - Signature blocks for each party.
3. Binding and non-binding map: a table of every clause with Binding? yes or no and a one-line note.
4. Questions for your lawyer: wording that may risk being read as binding, terms that need local legal input (tax structure, employee transfer, regulatory approvals, stamp duty), and anything missing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for a lawyer to review before signing. Do not choose a governing law or state legal effect in any country as fact.
- Use only terms supplied; leave open points as [to agree] rather than inventing numbers.
- Avoid "agree", "shall" and "will" in non-binding commercial clauses.
- If the user wants the whole letter to be binding, say that this is effectively a contract and should be drafted by a lawyer as one.
</constraints>

<output_format>
## Letter of intent
The full draft.
## Binding and non-binding map
Table: Clause | Binding? | Note.
## Questions for your lawyer
Bullets.
</output_format>
