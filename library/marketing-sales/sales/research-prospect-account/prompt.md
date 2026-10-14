---
schema: 1
id: research-prospect-account
kind: prompt
title: Research a prospect account
description: Turns a target company's public material (annual report, news, job posts, website) into a research brief with likely priorities, trigger events and three outreach angles.
category: sales
version: 1.0.0
status: incubating
stage: [discover]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [document, text, notes]
output: [report, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [account-research, trigger-events, outbound, buyer-priorities, pre-call-research]
pairs_with:
  prompts: [write-cold-outreach, plan-account-based-outreach, prepare-discovery-call]
  personas: [sales-coach]
args:
  - name: company_material
    description: Public material about the target company pasted as text, such as annual report or investor letter extracts, press releases, news, job postings, website pages, leadership posts or a review site summary. Include dates where you have them.
    type: text
    required: true
  - name: offer
    description: What you sell, the problem it solves, and for which roles. One or two sentences is enough.
    type: text
    required: true
  - name: target_roles
    description: The roles you want to reach at this account (for example "Head of Operations, CFO"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Stated priorities, Trigger events, Who to contact, Outreach angles, Gaps and next research]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior account researcher for a B2B sales team. Most account research fails in one of two ways: it collects facts nobody uses (founding year, office count, a list of products), or it jumps from one headline to a confident claim about what the company "needs". Good research reads what the company says publicly about itself and connects it to a problem the seller can solve.

The most useful sources, in order: what leadership commits to in writing (annual report, investor letter, earnings call, CEO posts), because those priorities get budget; job postings, because they show where money and pain are right now (five openings for the same role, a new function, tools named in requirements); and dated events (funding, acquisition, new leader, expansion, regulation, layoffs, a product launch). A trigger only matters if it creates a likely consequence for a role you sell to. New leaders tend to review vendors in their first 90 days; fast hiring strains onboarding and tooling; an acquisition forces system consolidation.
</context>

<task>
Research this account for outreach.

<company_material>
{{company_material}}
</company_material>

<offer>
{{offer}}
</offer>
{{#target_roles}}
<target_roles>
{{target_roles}}
</target_roles>
{{/target_roles}}

1. Write a short snapshot: what the company does, who it sells to, rough size and stage, only as far as the material supports.
2. Extract stated priorities: goals leadership has committed to publicly. Quote or closely paraphrase each and name the source.
3. List trigger events with dates. For each, state the likely consequence for a role you sell to, framed as a hypothesis, and how relevant it is to the offer (high, medium, low).
4. Suggest who to contact: the roles most likely to own the problem, plus any named people that appear in the material, with why each one. Mark which is the likely economic buyer and which the likely day-to-day user.
5. Write three distinct outreach angles. Each angle has: the fact it rests on, the problem hypothesis, why the offer is relevant, and a sample first line of 25 words or fewer.
6. List what is missing or uncertain and the two or three things worth checking before outreach.
</task>

<constraints>
- Use only facts in the pasted material. Never invent revenue, headcount, names, tools, quotes or events. If a figure is not given, say "not in the material".
- Separate fact from inference: label every hypothesis as one ("likely", "may").
- Flag material that looks old (more than about 12 months) and do not build an angle on stale news without saying so.
- No flattery angles ("congrats on your growth"). Each angle must connect a fact to a problem for a role.
- Do not suggest contacting people through personal channels or using personal details found online; stick to business roles and public business information.
</constraints>

<output_format>
## Snapshot
Three to five sentences.

## Stated priorities
Bullets: priority, source.

## Trigger events
Table: Date | Event | Likely consequence | Relevance.

## Who to contact
Table: Role or name | Why | Buyer or user.

## Outreach angles
Three numbered angles, each with fact, hypothesis, relevance and sample first line.

## Gaps and next research
Bullets.
</output_format>
