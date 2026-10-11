---
schema: 1
id: decide-probation-outcome
kind: prompt
title: Decide a probation outcome
description: Helps a manager decide whether to confirm, extend or end one employee's probation from the evidence, check the process was fair, and plan the outcome conversation.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [probation-review, new-hire, evidence-based, fair-process, extension]
pairs_with:
  prompts: [coach-struggling-new-hire, write-probation-outcome-letter, design-probation-review-process]
  personas: [hr-business-partner]
args:
  - name: evidence
    description: The person's role (initials only), start date and probation end date, the expectations set at the start, what has gone well and badly with dated examples, the feedback and support given so far, and any check-in records.
    type: text
    required: true
  - name: country
    description: The country (and state or region) of employment, because probation rules and protections differ.
    type: string
    required: true
  - name: circumstances
    description: Anything that may affect the decision or process, such as absence, health, pregnancy, a recent complaint they raised, adjustments, or a change of manager. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Evidence summary, Process check, Recommendation, If extending, The conversation, Who to involve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers make a fair probation decision for one person. Probation exists so both sides can check the fit, but managers often let it slide to the last week, then either confirm someone they have doubts about (because ending it feels harsh) or end it without ever having told the person there was a problem. The fair test is: were the expectations clear, was the person told early and specifically where they fell short, did they get reasonable support and time, and what does the evidence now show against those expectations? An extension makes sense when there is real progress or a reason the period was not a fair test (absence, a manager change, missing onboarding); it does not make sense as a way to delay a decision already made. Protections during probation vary a lot by country and contract, and some reasons (pregnancy, disability, a complaint the person raised) make any decision legally sensitive.

<evidence>
{{evidence}}
</evidence>
Country: {{country}}
{{#circumstances}}Circumstances: {{circumstances}}{{/circumstances}}
</context>

<task>
1. Evidence summary: a table mapping each expectation to the evidence for and against, and whether the person was told about any gap and when.
2. Process check: was the probation a fair test? List gaps (no clear expectations, no early feedback, missing support, absences, manager change). Flag any circumstance that makes the decision sensitive and needs HR or legal input before acting.
3. Recommendation: confirm, extend or end, with the reasoning in three to five points. If the evidence does not support a clear decision, say so and what is missing.
4. If extending: the length, two or three specific measurable targets, the support, and check-in dates. Note that extensions usually need to be agreed before the original end date, to be confirmed with HR.
5. The conversation: an outline and key lines for the chosen outcome, including how to handle questions or upset, and what the person receives in writing.
6. Who to involve: what HR must confirm (contract terms, notice, any right to be accompanied or appeal in {{country}}), and anything to record.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law in {{country}} requires; list what HR or an employment lawyer must confirm.
- Use only facts given; never invent examples. Mark gaps [X].
- If the main evidence against the person is linked to absence, health, pregnancy, disability or a complaint they made, flag it clearly and recommend HR or legal advice before any decision.
- Do not recommend ending probation where the person was never told of the problem, without first flagging that as a fairness gap.
</constraints>

<output_format>
## Evidence summary
Table: Expectation | Evidence | Told when? | Met?
## Process check
## Recommendation
## If extending
## The conversation
## Who to involve
</output_format>
