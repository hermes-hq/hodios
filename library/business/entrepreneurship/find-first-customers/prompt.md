---
schema: 1
id: find-first-customers
kind: prompt
title: Find your first ten customers
description: Plans how to land the first ten paying customers - where they gather, a named prospect list, outreach scripts and weekly experiments with targets. Use right after validating an idea or launching.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, sales-rep, individual]
inputs: [text, notes]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [early-customers, prospect-list, customer-acquisition, founder-led-sales]
pairs_with:
  prompts: [validate-business-idea, model-unit-economics]
  personas: [startup-mentor]
args:
  - name: product
    description: What you offer, its price, the problem it solves, and what a new customer needs to do to start.
    type: text
    required: true
  - name: customer
    description: Who the first customers are, as specifically as you can (for example "independent physiotherapy clinics with 2-10 staff in Lisbon").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Ideal first customer, Where they are, Prospect list plan, Outreach scripts, Weekly experiments, Funnel math, What to learn]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders get their first ten customers. At this stage, ads and content rarely work; direct, personal, founder-led outreach to a narrow group does. The goal of each conversation is both a sale and learning, and the founder should do things that do not scale - onboarding people by hand, fixing their problems personally - to get there.
</context>

<task>
Plan how to land the first ten customers for:

<product>
{{product}}
</product>

Target customer: {{customer}}

1. Sharpen the ideal first customer: the narrowest segment that has the problem most acutely, can decide quickly and is reachable. Add qualifying signals (a trigger event, a tool they use, a job title, a size) that make a prospect more likely to buy now.
2. Where they are: specific kinds of places to find them - the founder's own network and second-degree introductions, communities and forums, associations and directories, events, marketplaces, review sites, social platforms. For each, how to find names and the etiquette that applies (many communities ban direct promotion).
3. Prospect list plan: how to build a list of 50 to 100 named prospects in a week, with the columns to track (name, company, signal, source, status, next step, date).
4. Outreach scripts, each under 120 words, problem-first and with one clear ask:
   - a warm-introduction request to someone who knows the prospect (with a forwardable blurb);
   - a cold email or direct message;
   - a community post that asks for input rather than selling;
   - two follow-ups, spaced a few days apart.
5. Weekly experiments for the first four weeks: each with a hypothesis, the action, volume, and the target metric (reply rate, calls booked, trials, paid).
6. Funnel math: work backwards from ten customers using assumed conversion rates, labelled as assumptions, to the number of conversations and messages needed per week. Recalculate guidance once real rates come in.
7. What to learn: the five questions to answer in every sales conversation and how to capture the answers.
</task>

<constraints>
- Personalise outreach to a real signal about the prospect; never write mass spam templates or suggest buying email lists.
- Respect privacy and platform rules: only contact people through channels where unsolicited messages are acceptable, and include an easy way to opt out in cold email.
- Do not promise discounts, features or results the product description does not support.
- Scripts must not use fake urgency, false familiarity or misleading subject lines.
- If the customer description is too broad to find named prospects, propose two or three narrower segments and pick one, explaining why.
</constraints>

<output_format>
## Ideal first customer
Short paragraph plus qualifying signals as bullets.

## Where they are
Table: Channel | How to find names | Etiquette | Expected quality.

## Prospect list plan
Steps plus the tracking columns.

## Outreach scripts
Each script under its own subheading, ready to paste, with placeholders in square brackets.

## Weekly experiments
Table: Week | Hypothesis | Action and volume | Target metric.

## Funnel math
The calculation from ten customers back to weekly activity.

## What to learn
Five numbered questions.
</output_format>
