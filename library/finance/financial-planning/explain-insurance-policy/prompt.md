---
schema: 1
id: explain-insurance-policy
kind: prompt
title: Explain an insurance policy
description: Explains one insurance policy document in plain terms - cover, limits, exclusions, excess, conditions and claim process - tests it against realistic claims and lists gaps worth asking about.
category: financial-planning
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [insurance-policy, exclusions, deductible, policy-wording, claims]
pairs_with:
  prompts: [review-insurance-coverage, explain-fund-document]
  personas: [personal-finance-coach]
args:
  - name: policy_text
    description: The policy wording, or as much of it as you have - schedule, definitions, cover sections, exclusions and conditions. A summary or key facts document works but leaves gaps that will be flagged.
    type: text
    required: true
  - name: policy_type
    description: What kind of policy it is (home, contents, car, travel, health, life, income protection, pet, gadget) and, optionally, what you most want to know or a situation you are worried about.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In plain terms, What is covered, What is not covered, What you pay when you claim, Conditions you must keep, Definitions that change the meaning, Would this be covered, Gaps and questions for the insurer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Insurance documents are written so that the cover reads broadly in the marketing and is defined narrowly in the wording. Claims are most often refused not because of the headline cover but because of a definition (what counts as "flood", "unattended", "pre-existing", "accident"), an exclusion buried in a general section, a condition the policyholder did not know they had to keep (locks, notification deadlines, disclosure), a sub-limit far below the main sum insured, or underinsurance that reduces every claim proportionally. A good explanation reads the actual text, quotes the clauses, and tests the policy against claims that are realistic for this person.

Policy type: {{policy_type}}

<policy_text>
{{policy_text}}
</policy_text>
</context>

<task>
1. Check the document: say whether this looks like the full wording, a schedule, or a summary such as a key facts or product information document, and what is missing. Work only from what is there.
2. In plain terms: four or five sentences on what the policy does and the single most important limitation.
3. What is covered: each cover section with the insured events, sums insured, sub-limits (for example single-item limits, cash limits, per-condition limits) and any optional extras shown, quoting clause numbers or headings.
4. What is not covered: general and section exclusions, grouped and translated into everyday terms.
5. What you pay when you claim: excess or deductible (compulsory and voluntary, per claim or per condition), co-payments, waiting periods, and how underinsurance or an average clause would reduce a claim, with a worked example if the policy has one.
6. Conditions you must keep: duties during the policy (disclosure of changes, security, maintenance, occupancy, travel advice) and at claim time (notification deadlines, evidence, police reports), with the consequence the text gives for breaking them.
7. Definitions that change the meaning: the five to eight defined terms that most affect cover, quoted and explained.
8. Would this be covered: three to five realistic scenarios for this policy type (and the person's own situation if they gave one), each with "likely covered", "likely not covered" or "unclear", the clauses that decide it, and what would need confirming.
9. Gaps and questions for the insurer: gaps against common needs for this policy type, plus specific questions to ask in writing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote or cite the text for every statement about cover. If the text does not say, write "not stated in the text supplied" rather than relying on what policies usually say.
- Do not predict the outcome of a real claim or dispute with certainty; use "likely" and say who decides (the insurer, then a complaints process or ombudsman where one exists).
- Do not recommend switching insurers or specific products. You may suggest asking a broker or the insurer.
- If the person describes an existing claim dispute, add the complaint route as a general step and suggest independent advice where stakes are high.
{{> output/uncertainty}}
</constraints>

<output_format>
## In plain terms
Four or five sentences, after one line on what the document is.

## What is covered
Table: section | covers | limit or sub-limit | clause.

## What is not covered
Bullets with clause references.

## What you pay when you claim
Bullets, with a worked example where relevant.

## Conditions you must keep
Table: condition | what it requires | consequence if broken | clause.

## Definitions that change the meaning
Bullets: term, quote, what it means for you.

## Would this be covered
Table: scenario | likely outcome | deciding clauses | to confirm.

## Gaps and questions for the insurer
Bullets, then numbered questions.
</output_format>
