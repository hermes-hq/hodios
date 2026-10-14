---
schema: 1
id: assess-breach-of-contract
kind: prompt
title: Assess whether the other side broke a contract
description: Assesses whether the other party broke a contract by matching the facts to the clauses, checking notice and cure steps, likely remedies, your own risks and a proportionate next step.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, founder, operations-manager, consultant]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [breach-of-contract, contract-dispute, notice-and-cure, remedies, evidence-gathering, limitation-period]
pairs_with:
  prompts: [plan-contract-exit, write-complaint-letter, prepare-small-claims-case, draft-letter-before-action]
args:
  - name: contract
    description: The contract or the relevant clauses (what was promised, notices, termination, liability, disputes), with clause numbers, plus any written changes or emails that changed the deal.
    type: text
    required: true
  - name: facts
    description: What happened, in date order - what the other side did or failed to do, what you did, messages exchanged, money paid or owed, and the loss or harm so far. Say which side you are.
    type: text
    required: true
  - name: goal
    description: What you want - the work finished, money back, compensation, to end the contract, or just to know where you stand.
    type: text
    required: true
  - name: country
    description: Country and region and the governing law named. Remedies, limitation periods and pre-action steps differ by place.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Promise versus what happened, Notices and steps the contract requires, Your own position, Possible remedies, Evidence to gather, Next step, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who feel let down by a supplier, client, builder or business partner often jump straight to "they breached the contract" and to stopping payment or terminating, which can put them in breach instead. What dispute lawyers check first: the exact promise in the contract (an obligation to do something by a date, to a standard, or a "reasonable efforts" duty, which is weaker); whether later emails, variations or conduct changed the deal; whether the user did their own part (paid on time, gave access, approved designs), since the other side will point to that; notice and cure clauses that require written notice and a period to fix the problem before termination or claims; whether the breach is minor or serious enough to allow ending the contract, which depends on the contract and the law; limits and exclusions of liability; dispute clauses requiring negotiation, mediation or arbitration first; the user's duty in many places to take reasonable steps to reduce their loss; time limits for bringing a claim; and evidence. The usual first step is a clear written notice that identifies the clause, the failure and what must happen by when, not a threat or an immediate withholding of money.
{{#country}}

Country and law: {{country}}
{{/country}}

<facts>
{{facts}}
</facts>

<goal>
{{goal}}
</goal>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: whether the facts as described appear to match a broken promise in the text, how strong that looks on the documents given, and the three most important points.
2. Promise versus what happened: for each relevant obligation, quote the clause, set out what the facts say happened, and say whether it looks met, arguably not met, or clearly not met, with the reason. Note any variation or conduct that may have changed the obligation.
3. Notices and steps the contract requires: notice form and address, cure periods, dispute steps (negotiation, mediation, arbitration) and termination conditions, with dates worked out from the facts where possible.
4. Your own position: anything the user did or failed to do that the other side could raise, and the risk of withholding payment or terminating early.
5. Possible remedies, described generally: performance or fixing the work, price reduction, damages within any liability limits, termination, and what the contract says about each. Mention that a duty to reduce loss and time limits commonly apply, as points to check.
6. Evidence to gather: a checklist tied to each point.
7. Next step: the lowest-risk proportionate next action for the stated goal, usually a written notice, with a short outline of what it should say.
8. Get a lawyer if: features that need one (large sums, termination decisions, court deadlines, counterclaims).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent facts, dates or clauses.
- Do not predict who would win or what a court would award; describe how strong the position looks on the documents given and what would change it.
- You are hearing only one side; note what the other side is likely to say.
- Do not recommend stopping payment, terminating or threatening legal action as a first step without setting out the risks.
- If a deadline may be close (a cure period ending, a time limit to claim), put it first.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Promise versus what happened
Table: clause and short quote | what happened | assessment | reason.

## Notices and steps the contract requires
Bullets with dates where possible.

## Your own position
Bullets.

## Possible remedies
Bullets.

## Evidence to gather
Checklist.

## Next step
One recommended step and an outline of the notice.

## Get a lawyer if
Bullets.
</output_format>
