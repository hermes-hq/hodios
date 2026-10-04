---
schema: 1
id: plan-service-prototype-test
kind: prompt
title: Plan a service prototype test
description: Plans how to test a new service before building it, using desktop walkthroughs, staff role-play and Wizard-of-Oz runs that prototype the backstage too, with pass criteria for both.
category: product-discovery
version: 1.0.0
status: incubating
stage: [verify, design]
role: [product-manager, designer, operations-manager, manager]
subject: [hospitality, healthcare, public-sector, retail]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [service-design, service-prototyping, wizard-of-oz, staff-scenarios, backstage]
pairs_with:
  prompts: [build-service-blueprint, design-validation-experiment, plan-service-pilot, map-assumptions]
  personas: [service-designer]
args:
  - name: service_concept
    description: The new service or change (for example self check-in, a click-and-collect option, a new booking or appointment flow), who uses it and which staff and systems it touches.
    type: text
    required: true
  - name: riskiest_question
    description: The question you most need answered before investing, for the customer side, the staff side or both.
    type: text
    required: true
  - name: staff_available
    description: Which staff can take part, for how long, and whether you can use the real premises and when. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What to prototype, Prototype rounds, Roles and props, Pass criteria, Risks and safeguards, After the test]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a service designer who tests new services before anyone buys software or rewrites job descriptions. Services fail less often at the customer-facing step than behind it: the handover between staff, the information that is not there when needed, the exception nobody planned for. Teams that test only the customer screen or script miss this. Good service prototyping moves through rising fidelity: a desktop walkthrough with figures or sticky notes on a table map; an investigative role-play with real staff acting out scenarios, including the awkward ones; and a Wizard-of-Oz run in the real setting where people deliver behind the scenes what the future system would do automatically. Each round answers a specific question with criteria set beforehand.
</context>

<task>
Service concept:

<service_concept>
{{service_concept}}
</service_concept>

Riskiest question:

<riskiest_question>
{{riskiest_question}}
</riskiest_question>
{{#staff_available}}

Staff and premises:

<staff_available>
{{staff_available}}
</staff_available>
{{/staff_available}}

1. What to prototype: split the service into frontstage steps (what the customer sees and does), backstage steps (staff actions out of sight) and support processes (systems, data, suppliers). Mark which steps the riskiest question depends on; those get prototyped first.
2. Prototype rounds, cheapest first, typically:
   - Desktop walkthrough (1-2 hours, the team plus one or two staff): move tokens through a map of the space and timeline; look for gaps and handovers.
   - Role-play (half a day): staff play themselves, colleagues play customers from written scenario cards, including at least three edge cases (a customer who cannot use a phone, a no-show, a complaint, a language barrier, an accessibility need, a system failure).
   - Wizard-of-Oz in the real setting (one to three sessions): real customers who have agreed to take part, with people doing manually what the system would do (a staff member texting confirmations by hand, a printed list instead of a screen).
   For each round give the question it answers, participants, duration, materials and what is recorded.
3. Roles and props: facilitator, observer with a timing sheet, "wizard" with a written script for what they may and may not do, and the props (scenario cards, mock screens on paper or a tablet, signs, forms).
4. Pass criteria for both sides, set before each round: customer (completes without help, time, errors, how they describe it) and staff (time per case, steps that need a workaround, handover failures, load at peak, how they feel about doing it every day).
5. Risks and safeguards: real customers in Wizard-of-Oz runs must get a real, good outcome even if the prototype fails (a fallback to the current way); consent and an explanation that something new is being tried; no extra unpaid staff time.
6. After the test: a debrief agenda with staff, how findings update the blueprint, and the next step (refine, pilot or stop).
</task>

<constraints>
- Do not jump to software requirements; the point is to learn before building.
- Never invent staff numbers, volumes or premises details; if the concept or the riskiest question is too vague, ask up to three questions and stop.
- If no staff are available, say clearly what that limits and which rounds can still run.
- Use fictional names on scenario cards.
</constraints>

<output_format>
## What to prototype
Table: step | frontstage, backstage or support | depends on the riskiest question? | prototype first?

## Prototype rounds
For each round: name, question, participants, duration, materials, what is recorded.

## Roles and props
Bullets, including the wizard's script rules and three to five scenario cards written out.

## Pass criteria
Table: round | customer criteria | staff criteria | threshold.

## Risks and safeguards
Bullets.

## After the test
Debrief agenda and decision options.
</output_format>
