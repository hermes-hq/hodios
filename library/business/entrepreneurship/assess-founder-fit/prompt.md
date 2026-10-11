---
schema: 1
id: assess-founder-fit
kind: prompt
title: Assess founder fit for an idea
description: Tests whether a specific business idea suits you - skills, network, money, stamina, motivation and lifestyle - and says what would have to change before you commit.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [founder-market-fit, self-assessment, unfair-advantage, skill-gaps, personal-runway]
pairs_with:
  prompts: [compare-business-ideas, validate-business-idea, find-cofounder, decide-when-to-go-full-time]
  personas: [startup-mentor]
args:
  - name: idea
    description: The business idea - what you would sell, to whom and how it makes money.
    type: text
    required: true
  - name: about_you
    description: Your work history and skills, people you know in this market, money you could put in and lose, hours available, family and health commitments, and why you want to do this idea in particular.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit verdict, Fit table, Biggest gaps, Ways to close the gaps, Questions to answer honestly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You assess whether a particular person is a good founder for a particular idea, separately from whether the market wants it. Investors and experienced founders look for founder-market fit: insider knowledge of the problem, access to the first buyers, the core skill the business depends on (selling, building, operating), enough money and time to reach first proof, and a reason to keep going through the dull second year. Novices overrate passion and underrate selling, distribution and stamina. Good fit can be partial; gaps can often be closed with a cofounder, a smaller first version or a different customer.

<idea>
{{idea}}
</idea>

<about_you>
{{about_you}}
</about_you>
</context>

<task>
1. Name the three to five capabilities this idea most depends on to reach its first 20 paying customers (for example: enterprise selling, food safety know-how, content creation, software building, managing staff, working capital).
2. Rate the founder on each, plus on access to buyers, money to reach first proof, time and energy, insider knowledge of the problem, and motivation that survives slow months. Use strong, partial or weak, and quote what in their description supports each rating.
3. Give a verdict: strong fit, fit with gaps, or poor fit as things stand. One paragraph.
4. Name the two or three gaps most likely to sink the venture, and why.
5. For each gap, list ways to close it: learn it, partner with someone, hire or outsource, change the offer, change the customer, or start smaller. Say the cost or time of each where it can be judged.
6. Ask the questions the founder should answer honestly before committing, including what they would do if it took twice as long as planned.
</task>

<constraints>
- Judge the person against the idea, not in general. Do not praise or criticise character.
- Do not assume skills, contacts or money that were not mentioned. Mark anything you are inferring.
- If personal circumstances (dependants, debt, health, visa status) make the risk high, say so plainly and suggest a lower-risk route, without moralising.
- Do not judge market demand here beyond noting if the idea needs validating; point to validation as a separate step.
</constraints>

<output_format>
## Fit verdict
One paragraph.
## Fit table
Table: Factor | Rating | Evidence from what you told me.
## Biggest gaps
Numbered, with why each matters.
## Ways to close the gaps
Table: Gap | Option | Cost or time | Trade-off.
## Questions to answer honestly
At most six questions.
</output_format>
