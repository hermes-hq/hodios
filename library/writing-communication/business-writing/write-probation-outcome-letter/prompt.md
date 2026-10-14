---
schema: 1
id: write-probation-outcome-letter
kind: prompt
title: Write a probation outcome letter
description: Writes a letter confirming, extending or ending an employee's probation with the reasons, dates, targets and support, after a process check and with points to verify locally.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [probation-review, probation-extension, employment-letters, new-hires, hr-letters]
pairs_with:
  prompts: [design-probation-review-process, write-written-warning, write-offer-letter]
args:
  - name: outcome
    description: The outcome to communicate.
    type: enum
    enum: [confirm, extend, end]
    required: true
  - name: facts
    description: Employee name and role, start date, probation end date, what was reviewed, meetings held and dates, concerns raised and when, the employee's response, and for an extension the gaps and new targets.
    type: text
    required: true
  - name: contract_and_policy
    description: What the contract and probation policy say - length, whether extension is allowed and by how much, notice during probation, any review meeting or appeal step.
    type: text
  - name: country
    description: Country and region of employment, since probation rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Process check, Letter, Questions for HR or counsel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers write probation outcome letters. Each outcome has its traps. Confirmation letters should state the effective date and any terms that change after probation (notice period, benefits), and nothing more. Extensions are only possible if the contract or policy allows them, usually must be agreed before the original end date, and are fair only if the employee knows the specific gaps, the targets, the support and the new review date. Ending employment in probation is often simpler than later, but it still goes badly when concerns were never raised before, there was no meeting, the letter gives a reason that contradicts earlier feedback, or the real reason touches a protected matter (pregnancy, health, a complaint the person made). In some countries probation ends automatically if nothing is done by the end date, and minimum notice applies even in probation.

Outcome: {{outcome}}
Country: {{country}}

<facts>
{{facts}}
</facts>
{{#contract_and_policy}}
<contract_and_policy>
{{contract_and_policy}}
</contract_and_policy>
{{/contract_and_policy}}
</context>

<task>
1. Process check: assess and report whether the probation end date has passed or is close, whether the contract or policy allows this outcome, whether concerns were raised with the employee before and when, whether a review meeting took place, and whether anything suggests a sensitive context (health, pregnancy, family leave, a grievance or whistleblowing). For an end outcome with no prior feedback or meeting, or any sensitive context, say first that the letter should not be issued until HR or employment counsel has reviewed it, and give the steps to take.
2. Letter:
   - confirm: congratulate briefly, effective date of confirmation, any post-probation terms that change per the contract, next steps such as objectives or review.
   - extend: reference the review meeting, the specific areas to improve with examples, measurable targets, support offered, the extension length and new review date within what the contract allows, and the possible outcomes at the end.
   - end: reference the meeting and the concerns previously raised with dates, the decision, the last day of employment, notice (worked or paid in lieu) per contract, final pay and accrued holiday, return of property, and any right of appeal per policy.
   Include placeholders for anything not supplied.
3. Questions for HR or counsel: the specific points to check for this case in {{country}}.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a draft for HR or employment counsel to review. Do not state the law of {{country}} as fact.
- Use only facts given; never add concerns, dates or meetings that did not happen.
- Do not mention health, pregnancy, family, age or other protected characteristics in the letter.
- Neutral, respectful tone; describe work and behaviour, not character.
</constraints>

<output_format>
## Process check
Table: Check | Status | Action needed.
## Letter
The full letter with [placeholders].
## Questions for HR or counsel
Bullets.
</output_format>
