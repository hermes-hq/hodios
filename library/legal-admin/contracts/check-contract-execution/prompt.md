---
schema: 1
id: check-contract-execution
kind: prompt
title: Check how a contract should be signed
description: Checks how a contract should be signed - who signs and with what authority, deed or simple contract, witnesses, e-signature, counterparts, dates and attachments - before it goes out.
category: contracts
version: 1.0.0
status: incubating
stage: [ship]
role: [founder, operations-manager, executive, legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [checklist, report, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contract-signing, signing-authority, e-signature, witnessing, counterparts]
pairs_with:
  prompts: [build-contract-obligations-register, summarize-contract, draft-contract-amendment]
  workflows: [contract-review-track]
args:
  - name: contract
    description: The signature page, the parties clause, the execution or counterparts clause, and a list of schedules and attachments. You do not need the whole contract.
    type: text
    required: true
  - name: signers
    description: Who is expected to sign on each side (by role, for example "sole director", "head of sales", "two partners") and how (wet ink, e-signature platform, typed name).
    type: text
    required: true
  - name: country
    description: Governing law and where each party is based. Formalities for deeds, witnesses and electronic signatures vary by country.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Parties and signers, Form of signing, Document completeness, Issues to fix, Signing checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A well-negotiated contract can still be signed badly. The recurring problems: the party named is not the legal entity that will perform (a trading name, a parent company, a person instead of their company); the signer lacks authority (a manager with no delegated authority, a company that needs two signatories or a board approval); a document meant to be a deed or to need witnesses is signed like an ordinary contract; e-signature is used for a document type that some places still require on paper or with particular formalities; counterparts are signed on different versions; schedules and annexes are missing or out of date; and blank dates or fields are filled in later by one side. Individuals who sign for a company without making clear they sign "for and on behalf of" it can risk personal liability. These points are cheap to fix before signing and expensive afterwards.

Governing law and locations: {{country}}

<signers>
{{signers}}
</signers>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: whether signing looks ready, and the issues to fix first.
2. Parties and signers: for each party, the legal name and form (company, partnership, individual, public body), registration details if shown, and whether the named signer's role suggests authority; note what to check (company register, constitution or delegation of authority, board approval).
3. Form of signing: simple contract or deed (look for "executed as a deed", "signed, sealed and delivered", or terms that commonly require a deed, such as no consideration or certain property or guarantee documents); witnesses; whether e-signature is allowed by the contract and is generally acceptable for this document type under the stated law (to confirm); counterparts.
4. Document completeness: schedules, annexes and referenced documents present and in their agreed version; blanks, dates and effective date; initials on amendments if used.
5. Issues to fix, ranked.
6. Signing checklist: the order of signing, how versions are controlled, who keeps originals, and what to send to whom afterwards.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a signature or form of signing is valid under a specific law; describe common requirements and say to confirm for the governing law.
- Do not invent registration numbers, names or authority; mark "check".
- Flag deeds, guarantees, land, powers of attorney and cross-border signing as cases for a lawyer.
- Never suggest signing someone else's name, back-dating, or filling in blanks after the other side has signed without their agreement.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three lines.

## Parties and signers
Table: party | legal name and form | signer and role | authority to check.

## Form of signing
Bullets.

## Document completeness
Checklist.

## Issues to fix
Numbered, most important first.

## Signing checklist
Numbered steps.
</output_format>
