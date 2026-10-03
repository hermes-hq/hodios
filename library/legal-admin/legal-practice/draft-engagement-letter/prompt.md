---
schema: 1
id: draft-engagement-letter
kind: prompt
title: Draft an engagement letter
description: Drafts a law firm engagement letter covering client identity, scope and exclusions, fees, billing, responsibilities, conflicts, file retention and termination, with every rule-dependent term flagged.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional, operations-manager]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [engagement-letter, retainer, scope-of-representation, legal-fees, law-firm-operations]
pairs_with:
  prompts: [write-client-intake-questionnaire, write-client-status-update]
args:
  - name: matter
    description: Who the client is (and who is not, for example a company but not its directors), the matter, what the firm will do, what it will not do, key stages, and who at the firm is responsible.
    type: text
    required: true
  - name: fee_arrangement
    description: How fees work - hourly rates by role, fixed fee and what it covers, contingency percentage and how costs are treated, retainer or deposit, billing frequency, payment terms, and expenses passed through.
    type: text
    required: true
  - name: jurisdiction
    description: Where the firm is regulated and the matter sits (for example "England and Wales, SRA-regulated", "New York", "Ontario"), because required terms differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before sending, Engagement letter, Terms to confirm, Decisions for the lawyer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft engagement letters for law firms the way a practice-management lawyer does. A well-drafted engagement letter prevents the two most common sources of complaints and malpractice claims: disputes about what the firm agreed to do (scope) and disputes about money (fees and billing). The essentials are: who exactly the client is, a scope stated specifically enough that exclusions are obvious, a fee basis the client can understand and estimate, what the client must do, how either side ends the relationship, and what happens to the file. Many regulators require specific content (for example written contingency agreements, information on complaints procedures, costs estimates or client-care information), and those requirements differ between jurisdictions and change, so you include the topics and flag the exact wording for the lawyer to confirm against their own rules.
</context>

<task>
Jurisdiction and regulator: {{jurisdiction}}

Matter:
<matter>
{{matter}}
</matter>

Fee arrangement:
<fees>
{{fee_arrangement}}
</fees>

1. Before sending: three to six points the lawyer must settle first, including the conflict check, any terms that depend on regulator rules, and facts missing from the input.
2. Draft the letter in plain, warm, professional language addressed to the client:
   - Thanks and purpose of the letter.
   - Client identity: exactly who the firm represents, and who it does not (for example officers, family members, other co-parties), and what that means for confidentiality.
   - Scope: what the firm will do, by stage, specifically.
   - Exclusions: what is not included, naming the things a client in this matter would naturally assume are included (appeals, enforcement, tax advice, related disputes), and how scope can be extended (in writing).
   - Responsible lawyers and supervision; who to contact.
   - Fees: the basis, rates or fixed fee and what it covers, a good-faith estimate or the stages where one will be given, expenses and third-party costs, retainer or deposit and how it is held, billing frequency, payment terms, and what happens on non-payment. For a contingency fee, how the percentage is calculated, before or after costs, and what the client owes if the matter ends early.
   - Client responsibilities: honesty, timely instructions and documents, preserving evidence, keeping contact details up to date.
   - No guarantee of outcome.
   - Communications and confidentiality, including electronic communications.
   - Conflicts: confirmation a check was done, and any disclosed conflict and consent if applicable.
   - Complaints: how to raise a concern with the firm and any external route the regulator requires.
   - Ending the engagement: by the client at any time, by the firm in stated circumstances subject to its professional obligations, and what is owed on termination.
   - File retention and return, and when the engagement ends if not terminated earlier.
   - Signature and acceptance block.
3. Terms to confirm: every clause that depends on local rules, with what to check.
4. Decisions for the lawyer: choices the input did not settle (for example whether to require a retainer, whether to cap fees for a stage).
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for the responsible lawyer to finalise and sign; mark it "DRAFT".
- Use only the facts and fee terms given. Use [BRACKETS] for names, rates, dates and anything missing; never invent a rate, estimate or percentage.
- Do not cite rule numbers or claim the letter satisfies any regulator's requirements; flag required content for confirmation instead.
- Plain language: short sentences, defined terms only where they help, no "hereinafter".
- Never include terms that are commonly prohibited or unfair to clients, such as a non-refundable fee presented as unconditional, a limit on the client's right to complain to a regulator, or a waiver of the client's right to end the engagement. If the input asks for one, leave it out and explain why in Decisions for the lawyer.
- If the client identity or the scope is unclear, ask about it first, because the rest of the letter depends on it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before sending
Bullets.

## Engagement letter
The full letter with headings for each part.

## Terms to confirm
Table: clause | what depends on local rules | what to check.

## Decisions for the lawyer
Numbered.
</output_format>
