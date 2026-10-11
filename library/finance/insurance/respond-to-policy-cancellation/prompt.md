---
schema: 1
id: respond-to-policy-cancellation
kind: prompt
title: Respond to an insurance cancellation or non-renewal
description: Works out why an insurer is cancelling, voiding or not renewing a policy, whether it can be challenged, how to avoid a gap in cover and how to answer future "ever been cancelled" questions.
category: insurance
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, parent, founder]
requires: [none]
inputs: [document, text]
output: [report, message, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [policy-cancellation, non-renewal, voidance, cover-gap, specialist-insurer]
pairs_with:
  prompts: [prepare-insurance-disclosure, explain-insurance-policy, appeal-insurance-denial]
args:
  - name: notice
    description: The insurer's letter or email - cancellation, voidance (treating the policy as never existing) or a refusal to renew - with the dates, reasons and any refund mentioned.
    type: text
    required: true
  - name: background
    description: The policy type, how long you have held it, recent claims or changes, missed payments, and anything the insurer asked you about before sending the notice.
    type: text
    required: true
  - name: country
    description: Country and region. Notice periods, consumer protections and whether compulsory cover (car, employer's liability) has special rules vary.
    type: string
output_contract:
  format: markdown
  sections: [Summary, What kind of notice this is, Key dates, Can it be challenged, Keeping cover in place, Draft reply, Answering future applications]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Three different things get called "cancelled" and they have very different consequences. Cancellation ends the policy from a future date, usually after a notice period set by the policy, and normally refunds unused premium. Voidance treats the policy as if it never existed, usually because the insurer says something was misrepresented or not disclosed, and can mean past claims are refused or must be repaid. Non-renewal is the insurer declining to offer another year, which is often allowed for business reasons and is usually not a black mark in the same way. Common triggers are missed payments, a claims history the insurer no longer wants, a change in the risk (vacant property, business use), or a mistake found on the application. Many application forms ask whether cover has ever been cancelled, voided or refused, so how the notice is classified affects every future quote. The urgent practical risk is a gap: driving uninsured is a criminal offence in many countries, a mortgage usually requires buildings cover, and a business may be in breach of contracts or laws without its liability cover.
{{#country}}

Country: {{country}}
{{/country}}

<background>
{{background}}
</background>
</context>

<task>
<notice>
{{notice}}
</notice>

1. Classify the notice: cancellation, voidance or non-renewal, quoting the words used. If it is unclear, the first question to the insurer is which it is.
2. Key dates: when cover ends, any notice period the policy requires, refund due, and deadlines to respond. Flag compulsory or contract-required cover that would lapse.
3. Can it be challenged: compare the stated reason with the policy's cancellation clause and the facts given. For missed payments, whether paying now reinstates it. For misrepresentation, whether the question asked was clear and whether the error was honest or careless, since many places treat these differently from deliberate misstatement (to confirm locally). For non-renewal, usually no challenge, but ask for the reason.
4. Keeping cover in place: get replacement quotes before the end date, the disclosure the new insurer will need, brokers or specialist insurers for people with a claims history or a past cancellation, and not letting compulsory cover lapse even for a day.
5. Draft reply to the insurer: ask for the reason and the clause in writing, correct any facts that are wrong, ask for reinstatement or a later end date where that is realistic, and ask for written confirmation of how the policy will be recorded.
6. Answering future applications: how to answer "ever been cancelled, voided or declined" truthfully for this notice, and what short explanation to keep ready.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they need not disclose the cancellation on future applications; answer the question each form actually asks, truthfully.
- Do not invent notice periods, laws or regulator names; describe what to check and where.
- Do not predict whether the insurer will reverse its decision.
- If the notice is a voidance with claims being refused or reclaimed, or alleges fraud, recommend legal advice or a free advice service promptly.
- If cover required by law will lapse, say clearly not to drive, trade or operate without it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
What kind of notice it is, the date cover ends, and the most urgent action.

## What kind of notice this is
Short explanation with the quoted wording.

## Key dates
Table: date | what happens | action.

## Can it be challenged
Bullets with an honest view of each point.

## Keeping cover in place
Numbered steps.

## Draft reply
The message, ready to adapt.

## Answering future applications
Short guidance and a suggested one-line explanation.
</output_format>
