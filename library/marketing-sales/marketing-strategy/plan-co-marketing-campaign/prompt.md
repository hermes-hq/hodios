---
schema: 1
id: plan-co-marketing-campaign
kind: prompt
title: Plan a co-marketing campaign with a partner
description: Plans a joint campaign with a partner company (webinar, report, bundle or event) with a fit test, shared goal, roles, lead sharing and consent rules, approvals, timeline and joint measures.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [co-marketing, partner-marketing, joint-webinar, lead-sharing, audience-overlap]
pairs_with:
  prompts: [write-partnership-proposal, plan-joint-partner-launch, plan-integration-partnerships, plan-event-marketing]
args:
  - name: partners
    description: Your company and the partner (what each sells, audience, list sizes or reach, relationship so far), and why you think the audiences overlap.
    type: text
    required: true
  - name: goal
    description: What you want from the campaign, for example new leads in a segment, credibility, pipeline, or reaching the partner's customers.
    type: text
    required: true
  - name: ideas
    description: Campaign formats you are considering and any budget or date constraints. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Campaign summary, Fit check, Format choice, Roles and responsibilities, Lead sharing and consent, Timeline, Promotion plan, Measures and wrap-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a partner marketing manager who has run many joint campaigns. They succeed when the two companies serve the same buyer with complementary, non-competing products, bring comparable reach, and agree in writing before work starts who does what, who gets which leads, and how data is shared. They fail on unequal effort (one side promotes, the other does not), vague lead terms, consent problems (registrants never agreed to be contacted by the partner), slow approvals, and content that is a disguised pitch for one side. The strongest formats teach the shared buyer something neither company could credibly say alone: a joint benchmark, a workflow across both products, a panel with both customer bases.
</context>

<task>
<partners>
{{partners}}
</partners>

Goal: {{goal}}

{{#ideas}}
<ideas>
{{ideas}}
</ideas>
{{/ideas}}

1. If either company or the shared buyer is unclear, ask up to three questions and stop.
2. Fit check: audience overlap, product overlap or competition risk, reach balance, brand fit, and what each side gains. If fit is weak, say so and suggest a lighter or different partner play.
3. Format choice: compare two or three formats (joint webinar, co-authored report or benchmark, bundle or offer, event, content swap) on effort, lead yield and fit with the goal; pick one.
4. Roles and responsibilities: content, design, hosting, promotion commitments per side (for example number of emails and posts), budget split, approval owners and turnaround.
5. Lead sharing and consent: what registrants are told, how consent to hear from each company is captured, how leads are shared and when, follow-up rules and who owns which accounts if both already talk to them. Recommend a short written agreement.
6. Timeline: from agreement to follow-up, with approval checkpoints.
7. Promotion plan: what each side sends and when, with a shared tracking approach so each side's contribution is visible.
8. Measures and wrap-up: registrations or downloads by source, attendance, qualified leads, pipeline per side, and a joint review with a decision on doing it again.
</task>

<constraints>
- Do not state data protection law as fact; flag the consent and data-sharing points to confirm for the users' regions.
- Do not invent partner reach or results; use the user's numbers or placeholders.
- Promotion commitments must be balanced and written down.
{{> output/uncertainty}}
</constraints>

<output_format>
## Campaign summary

## Fit check
A table: Factor | Assessment.

## Format choice

## Roles and responsibilities
A table: Task | Us | Partner | Deadline.

## Lead sharing and consent

## Timeline

## Promotion plan

## Measures and wrap-up
</output_format>
