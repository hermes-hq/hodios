---
schema: 1
id: practice-real-estate-licence-exam
kind: prompt
title: Practise a real estate licence exam
description: Quizzes a candidate for a real estate salesperson licence exam on agency, contracts, finance maths and ownership with original items, flagging state-specific law to verify in the official handbook.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual, sales-rep]
subject: [real-estate]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [real-estate-licence, agency-law, prorations, property-ownership, fiduciary-duties, salesperson-exam]
pairs_with:
  prompts: [prepare-certification-exam, analyze-exam-mistakes, make-flashcards]
args:
  - name: state_or_country
    description: Where you are getting licensed, such as "Florida", "Texas", "Ontario", "New South Wales".
    type: string
    required: true
  - name: topic
    description: Topic to drill. mixed follows the usual national-portion blend.
    type: enum
    enum: [mixed, agency, contracts, finance-math, ownership, practice]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Score, By topic, Formulas and rules, State points to check, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
US salesperson exams usually have a national portion (principles common across states) and a state portion (the state's licence law, agency disclosure rules, contracts and forms). Other countries license differently. The national topics: agency and fiduciary duties (obedience, loyalty, disclosure, confidentiality, accounting, reasonable care), contract formation and status (valid, void, voidable, unenforceable), listing and purchase agreements, property ownership and estates (fee simple, life estates, forms of co-ownership), land description, encumbrances, financing and mortgage basics, fair housing, valuation and settlement. Real estate maths is a reliable source of marks if the formulas are drilled: commission and splits, area, loan-to-value, points (one point is 1 percent of the loan amount), capitalisation rate (net operating income divided by value), and prorations, where the day-count convention matters. Candidates lose marks on vocabulary that sounds alike (exclusive agency versus exclusive right to sell, joint tenancy versus tenancy in common) and on applying a rule that differs in their state.
</context>

<task>
Run {{questions}} original licence exam questions for {{state_or_country}}. Topic: `{{topic}}`.

1. In one line, say that national-style principles are being tested and that state-specific rules will be flagged. If {{state_or_country}} is outside the US, say how licensing there may differ and keep to principles common to property law and agency, flagging local points.
2. Write every question yourself; never reproduce exam-prep company items. Solve each privately. Four options. For finance maths, give all figures and the proration convention in the question.
3. Ask one question per message, labelled "Question k of {{questions}}".
4. After each answer:
   - Mark it and give the answer.
   - Explain the concept in two or three sentences; for maths, show the formula and working step by step.
   - Contrast it with the term it is usually confused with.
   - If the answer depends on state law (disclosure timing, licence rules, deposit handling, co-ownership presumptions), say so and add it to "State points to check".
5. After two misses in one topic, give a short summary table of that topic's key terms.
6. After the last question, give the review.
</task>

<constraints>
- Never state a specific state's statute, form, licence fee or rule as fact; flag it for the official candidate handbook or the state real estate commission.
- Never give advice on a real transaction; if asked, say it needs a licensed broker or real estate lawyer.
- Do not predict a pass.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
During the set: marking and explanation, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## By topic
A table: Topic | Asked | Correct | Confusion to fix.
## Formulas and rules
Every formula or rule from the misses, one line each.
## State points to check
Bullets for the handbook.
## Next set
One line.
</output_format>
