---
schema: 1
id: design-onboarding-survey
kind: prompt
title: Design an onboarding survey
description: Designs a short signup or onboarding survey on role, use case and goal that personalises onboarding and segments analytics, with drop-off limits and what each answer changes.
category: user-feedback
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, designer, marketer, founder]
requires: [none]
inputs: [text]
output: [questions, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [signup-flow, user-segmentation, onboarding-personalisation, welcome-survey, activation]
pairs_with:
  prompts: [design-in-product-survey, write-tracking-plan]
args:
  - name: product
    description: What the product does, who signs up (roles, team sizes, self-serve or sales-led) and the main ways people use it.
    type: text
    required: true
  - name: decisions
    description: What the answers should drive, for example which onboarding path, template or sales routing to show, or which segments analytics needs. Optional.
    type: text
  - name: current_flow
    description: The current signup and onboarding steps, any questions already asked, and completion rates if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Questions, Placement and flow, What each answer changes, Drop-off guardrails, Data and analytics, Review plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design signup and onboarding questions for software products. Experienced teams treat every question in a signup flow as a cost: each extra step loses some people, so a question earns its place only if its answer changes what the user sees next or a decision the business makes. Good onboarding surveys ask one to three questions after the account is created (not before), use single-select options that are mutually exclusive and in the user's own words, and are skippable. They avoid asking what can be inferred (company from email domain, device, locale), never ask for sensitive data, and remember that self-reported goals are aspirational: they segment intent, not behaviour. Free-text job titles produce unusable data; a short list of roles plus "Other" does not. A common rule of thumb: when "Other" draws a large share of answers (teams often use 10 to 15 percent as the trigger), the options need rewriting.

Product:

<product>
{{product}}
</product>
{{#decisions}}

What the answers should drive:

<decisions>
{{decisions}}
</decisions>
{{/decisions}}
{{#current_flow}}

Current flow:

<current_flow>
{{current_flow}}
</current_flow>
{{/current_flow}}
</context>

<task>
1. State the purpose in two sentences: what the survey will personalise and what it will segment. If no decisions were given, propose the two most useful ones for this product and label them as proposals.
2. List candidate questions (role, use case or job, goal, team size, experience level, how they heard about you) and keep only those whose answer changes a screen, template, message, routing rule or report. Drop the rest and say why in one line each. Keep at most three; prefer two.
3. Write each kept question in plain words, under about 12 words, with 4 to 7 answer options that are mutually exclusive, cover most users, and use the user's language rather than internal segment names. Add "Other" with an optional text box where needed, and say whether multi-select is justified (usually not, because it breaks segmentation).
4. Define placement and flow: after account creation, before or inside the first screen; one question per screen or all on one screen and why; skip option; progress hint; how mobile and invited team members (who did not choose the product) are handled.
5. Map what each answer changes: a table of question, answer, onboarding change (checklist, template, sample data, tour, email track) and analytics or routing use. Flag any answer that changes nothing, and remove or merge it.
6. Set drop-off guardrails: measure completion per question against a version without the survey; a stop rule (for example, remove a question if it costs more than an agreed number of points of signup completion); never block account creation on an answer.
7. Specify data and analytics: property names, allowed values, where they are stored (user or account level), how to treat skips and "Other", and how to keep values stable when options change.
8. Plan the review: when to check the "Other" share and answer distribution, how to compare self-reported use case with later behaviour, and when to retire a question.
</task>

<constraints>
- At most three questions; never require an answer to finish signup.
- No sensitive questions (age, gender, health, income, ethnicity) unless the product truly needs them and the user is told why; say so if asked for one.
- Do not invent completion rates or benchmarks; label any figure as an assumption to test.
- Answer options must be mutually exclusive and in plain words.
</constraints>

<output_format>
## Purpose
Two sentences.

## Questions
Each kept question with its answer options, plus dropped candidates with a one-line reason.

## Placement and flow
Bullets.

## What each answer changes
A table: question | answer | onboarding change | analytics or routing use.

## Drop-off guardrails
Bullets with the stop rule.

## Data and analytics
A table: property | values | level | skip and Other handling.

## Review plan
Bullets with dates or triggers.
</output_format>
