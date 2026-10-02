---
schema: 1
id: build-ideal-customer-profile
kind: prompt
title: Build an ideal customer profile
description: Builds an ideal customer profile and buyer personas from customer data or interviews, with buying triggers, disqualifiers and a fit score. Use to focus targeting, outbound and messaging.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, founder, sales-rep, product-manager]
requires: [none]
inputs: [dataset, transcript, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [icp, buyer-personas, lead-scoring, targeting]
pairs_with:
  prompts: [write-positioning-statement, write-cold-outreach, plan-marketing-campaign]
args:
  - name: customer_data
    description: Evidence about customers, such as a CRM or billing export (industry, size, plan, revenue, tenure, churn, sales cycle), win-loss notes, interview transcripts or survey answers. More rows and more outcomes give a better profile.
    type: text
    required: true
  - name: product
    description: What you sell, the price range, the sales motion (self-serve, sales-led) and the problem it solves.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data read, Best customers, Ideal customer profile, Buying triggers, Disqualifiers, Buyer personas, Fit score, Gaps and validation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a go-to-market strategist. An ideal customer profile (ICP) describes the accounts that get the most value from the product and are the best business for you: they buy faster, stay longer, expand and cost less to serve. It is derived from your best customers, not from all customers and not from who you wish would buy. Buyer personas are different: they describe the people inside those accounts who use, champion, approve or block the purchase. For consumer products the ICP is the customer segment itself, and personas describe motivations and contexts.

An ICP that fits everyone is useless. A good one lets a sales rep or an ad platform say yes or no to a prospect in under a minute.
</context>

<task>
Build an ICP and buyer personas.

<customer_data>
{{customer_data}}
</customer_data>

<product>
{{product}}
</product>

1. Read the data: what it covers, how many customers, which outcome fields exist (retention, revenue, expansion, sales cycle, support load), and what is missing. If there is no outcome information at all, say the profile can describe current customers but not the best ones, and ask for outcome data or proceed with that caveat.
2. Define "best customers" using the outcomes available (for example top quartile by retention and revenue, or won quickly and still active), and compare them with the rest and with churned or lost customers.
3. Write the ICP from what distinguishes the best group: firmographics (industry, size, region, business model), technographics (tools they use), situation (stage, team structure, the problem they have), and behaviours. For each attribute give the ideal value, the acceptable range, and the evidence.
4. List buying triggers: events that make a good-fit account likely to buy now (new leader, funding, hiring for a role, a regulation, a failure, a tool reaching its limits), with evidence or labelled as hypotheses.
5. List disqualifiers: signals of a poor fit, such as churn patterns, deals that took too long, or needs the product does not meet.
6. Write two to four buyer personas for the roles involved in the purchase: role and title variants, their part in the decision (user, champion, economic buyer, blocker), goals, pains, what they need to see to say yes, likely objections, where they look for information, and words they use, from the data where possible.
7. Turn the ICP into a simple fit score: five to eight criteria, points each, and the thresholds for A, B and C fit.
</task>

<constraints>
- Every attribute and persona detail cites evidence from the data or is labelled "hypothesis". No invented statistics, quotes or market sizes.
- With small samples (roughly under 20 best customers), say that patterns are tentative.
- Do not use protected characteristics (for example race, religion, health, age or gender of individuals) as targeting or scoring criteria.
- Keep personas about roles and motivations, not invented biographies with names and hobbies.
</constraints>

<output_format>
## Data read
What the data covers, outcome fields used, gaps.

## Best customers
How "best" was defined and how they differ from the rest, as a short comparison table.

## Ideal customer profile
A table: Attribute | Ideal | Acceptable | Evidence.

## Buying triggers
Bullets with evidence or "hypothesis".

## Disqualifiers
Bullets with evidence.

## Buyer personas
One card per persona with the fields from step 6.

## Fit score
A table: Criterion | Points | How to check. Then the A, B and C thresholds.

## Gaps and validation
What to collect or test next (for example win-loss interviews, a data field to start tracking).
</output_format>
