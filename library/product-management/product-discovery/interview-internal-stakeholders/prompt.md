---
schema: 1
id: interview-internal-stakeholders
kind: prompt
title: Interview internal stakeholders before discovery
description: Plans short interviews with sales, support, success and leaders before customer research, with questions per role, how to separate opinion from evidence and a hypothesis list to test.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, ux-researcher, designer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [stakeholder-interviews, internal-knowledge, hypotheses, research-planning, sales-and-support-input]
pairs_with:
  prompts: [write-discovery-research-plan, map-assumptions, translate-request-into-problem, turn-sales-notes-into-product-insights]
args:
  - name: product_area
    description: The product area, problem or initiative you are about to research, and what decision the research should inform.
    type: text
    required: true
  - name: stakeholders
    description: The internal people or teams you can talk to (for example two sales reps, support lead, a customer success manager, head of product, finance).
    type: text
    required: true
  - name: known_beliefs
    description: Things people inside the company already claim about customers on this topic, if you have heard any.
    type: text
output_contract:
  format: markdown
  sections: [Who to talk to and why, Questions by role, Capturing evidence versus opinion, Hypotheses to test with customers, Running the sessions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior product researcher starting a new discovery project. Before talking to customers, experienced researchers spend a few hours with the people inside the company who see customers every day. They hold real evidence (lost-deal notes, ticket volumes, call recordings, renewal conversations) and they also hold distortions: sales hears prospects' objections and the last loud deal, support hears only from people with problems, success managers hear from their biggest accounts, and leaders bring strategy and pet theories. Each group's view is biased in a known direction. The goal of these interviews is not to collect requirements; it is to learn what is already known, where the evidence lives, what everyone assumes, and who the right customers are, then turn it into hypotheses that customer research can confirm or reject. Done well, it also builds allies who will act on the findings later.

{{#known_beliefs}}Beliefs already heard inside the company:
<known_beliefs>
{{known_beliefs}}
</known_beliefs>{{/known_beliefs}}
</context>

<task>
Product area and decision:

<product_area>
{{product_area}}
</product_area>

People available: {{stakeholders}}

1. Choose who to talk to first and why, in a short ordered list. Include each group's typical blind spot (for example "support: sees only people who hit problems; under-represents silent churn"). Suggest one or two people who were not listed if a key view is missing (finance for pricing, engineering for constraints, a recent hire who still sees with fresh eyes).
2. Write a 30-minute question set per role. Every set has: their goal and how they are measured; the last specific customer situation they handled on this topic ("Tell me about the last deal you lost over this", "the last ticket about this"); numbers they can point to and where the data lives; what customers say in their own words; what they believe the cause is; and who in the customer base you should talk to. End with "What do you think we will get wrong?"
3. Give a capture method that separates three things: evidence (with source: ticket id, CRM record, recording, report), reported customer words (with how many customers), and the stakeholder's opinion or interpretation. Provide a note template with those three columns.
4. Turn the beliefs (given and likely) into a hypothesis list, each written as testable: "We believe [segment] [behaviour or problem] because [evidence]; we will know we are wrong if [observation]". Mark each hypothesis's source and current evidence strength (anecdote, repeated anecdote, data).
5. List the artefacts to request before customer interviews (ticket exports, lost-deal reasons, call recordings, churn survey) and the customers or segments the stakeholders suggest, with a note on how to avoid only talking to their favourite accounts.
6. Give running tips: how to explain the purpose so people do not expect their feature request to be built, how to handle a senior person who presents a solution, and how to share back what you heard.
</task>

<constraints>
- Treat everything stakeholders say as input to test, not as findings. Never present stakeholder opinion as customer evidence in any output.
- Do not invent customer data, metrics or ticket counts; where data might exist, name the report to ask for.
- Keep it short: four to eight stakeholder sessions is usually enough; say if the list given is too long for the time.
- If the product area is a solution ("build a dashboard"), restate the research focus as the underlying problem space and say so.
- Be respectful of internal politics: questions should not put anyone on trial for past decisions.
</constraints>

<output_format>
## Who to talk to and why
Ordered list with each group's blind spot.

## Questions by role
One subsection per role, numbered questions with one probe each.

## Capturing evidence versus opinion
The note template as a table: what was said | type (evidence, customer words, opinion) | source | follow-up.

## Hypotheses to test with customers
Table: hypothesis | source | evidence strength | how customer research will test it.

## Running the sessions
Bullets: framing, artefacts to request, sharing back.
</output_format>
