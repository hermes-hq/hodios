---
schema: 1
id: draft-contract-amendment
kind: prompt
title: Draft a contract amendment
description: Drafts a short amendment or variation to a signed contract - new price, scope, dates or term - that cites the original, changes only what was agreed, and follows the contract's own rules for changes.
category: contracts
version: 1.0.0
status: incubating
stage: [build]
role: [founder, consultant, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [document, text]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [contract-variation, amendment-letter, change-order, scope-change, term-extension]
pairs_with:
  prompts: [compare-contract-versions, build-contract-obligations-register, explain-contract-clause]
args:
  - name: original
    description: The clauses of the signed contract that are changing, plus its title, date, parties (by role) and its clauses on amendments, notices and entire agreement.
    type: text
    required: true
  - name: agreed_changes
    description: What both sides have agreed to change, in plain words, including the date the change takes effect and anything said by email or in a meeting.
    type: text
    required: true
  - name: country
    description: Governing law of the contract, if known. Rules on consideration, deeds and electronic signature differ.
    type: string
output_contract:
  format: markdown
  sections: [Check before drafting, Amendment, Drafting notes, Signing checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most contracts say they can only be changed in writing signed by both parties, and many disputes start with a change agreed on a call or by email that nobody wrote down properly, or with an amendment that accidentally changed more than intended. A good amendment identifies the original contract precisely (title, date, parties, any earlier amendments), states the effective date, changes clauses by number using clear operative words ("Clause 4.1 is deleted and replaced with...", "The following is inserted as clause 9.3..."), says that everything else continues unchanged, carries over defined terms, and is signed in the way the original requires. Problems to watch: changes that interact with other clauses (a new price that the indexation clause will later adjust, an extended term that moves a renewal notice date, extra scope with no change to liability caps or acceptance), amendments that cover a past period and need to say so, and in some legal systems the need for something given in return (consideration) or a deed for a change to be binding.
{{#country}}

Governing law: {{country}}
{{/country}}

<original>
{{original}}
</original>
</context>

<task>
<agreed_changes>
{{agreed_changes}}
</agreed_changes>

1. Check before drafting: confirm the contract's amendment clause and what it requires (form, signatories, notice); list each agreed change against the clause it affects; flag knock-on effects on other clauses; flag anything in the agreed changes that is ambiguous and needs confirming between the parties; note if the change might need something given in return under the governing law (to check).
2. Draft the amendment: title, parties by role, recitals identifying the original and its date, effective date, numbered operative changes using precise replace, insert or delete wording, a clause that all other terms continue unchanged, a clause that defined terms have the same meaning, counterparts and electronic signature wording if the original allows, and signature blocks by role.
3. Drafting notes: each choice made and anything left in [square brackets] for the user to fill or confirm.
4. Signing checklist: who must sign, in what form, how to store it with the original, and dates to update in any obligations register.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Change only what the user says was agreed; if an extra change seems needed, put it in the drafting notes as a question, not in the draft.
- Use [square brackets] for every name, date or figure not supplied; never invent them.
- Do not say the amendment is legally binding; note the formalities to check under the governing law.
- If the change concerns land, guarantees, shares, employment terms that reduce an employee's rights, or consumer rights, recommend a lawyer.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check before drafting
Table: agreed change | clause affected | knock-on effects | needs confirming?

## Amendment
The full amendment text.

## Drafting notes
Numbered.

## Signing checklist
Checklist.
</output_format>
