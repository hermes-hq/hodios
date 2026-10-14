---
schema: 1
id: map-compliance-obligations
kind: prompt
title: Find out which rules apply to my organisation
description: Maps the legal and regulatory duties that likely apply to a small organisation, ranks them by risk and gives a first 30-day plan with what to confirm. Use when you do not know where compliance starts.
category: compliance
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, operations-manager, individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, table, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [small-organisation, regulations, obligations, data-protection, licences, health-and-safety, where-to-start]
pairs_with:
  prompts: [build-compliance-calendar, check-first-hire-employer-obligations, map-personal-data-processing, build-compliance-checklist]
  workflows: [privacy-programme-track]
  personas: [compliance-officer]
args:
  - name: organisation
    description: What the organisation does, its legal form, country and region, number of staff or volunteers, and whether it has premises, sells online, or works with customers or the public.
    type: text
  - name: activities
    description: Things that often bring extra rules, for example handling customer or patient data, food or alcohol, children or vulnerable adults, client money, vehicles, chemicals, marketing emails, card payments. Optional.
    type: text
  - name: concern
    description: What prompted this, for example "starting up", "first hire", "a customer asked for our privacy policy", "an inspection letter". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Urgent first, What applies, Ranked by risk, Your first 30 days, To confirm, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders, managers and volunteers of small organisations see which rules apply to them. A plain request usually produces either a generic list of every law ever written or a single topic (often privacy) while missing the duty that actually bites, such as registration, employer insurance, a sector licence or fire safety. Good compliance mapping works from the organisation's facts: what it does, where, with whom and with what data, then sorts duties into what certainly applies, what likely applies and what to check, and starts with the highest-risk gaps.

{{#organisation}}The organisation:
<organisation>
{{organisation}}
</organisation>
{{/organisation}}{{#activities}}Activities that may bring extra rules: {{activities}}
{{/activities}}{{#concern}}What prompted this: {{concern}}
{{/concern}}
</context>

<task>
1. Missing essentials. If you do not yet know what the organisation does, where it operates, and whether it has staff (here or in their message), ask these and stop:
   1. What does the organisation do, and in which country and region? (for example "online candle shop, Ireland")
   2. How many people work or volunteer for it, and does it have premises? (for example "just me plus one part-timer, working from home")
   3. Does it handle personal data, payments, food, children, health information or anything regulated?
   Say that if they answer "just do it", you will map a sole trader selling online in one country with no staff, labelled as an example. If they gave enough, skip this step.
2. Urgent first. If they mention an inspection, a regulator or police letter, a data breach, an injury at work, a court deadline or trading without a licence they need, lead with what to do now (keep records, do not destroy anything, note the deadline) and that a lawyer or the relevant regulator's helpline should be contacted promptly.
3. What applies: group duties by area (registration and tax, employment, health and safety and premises, data protection and privacy, consumer and marketing, sector licences, insurance, accessibility). For each, mark "applies" (follows from what they said), "likely" (common for this kind of organisation, to confirm) or "check" (depends on a fact you do not have, and name the fact).
4. Ranked by risk: order the gaps by likelihood and consequence (fines, closure, personal liability, harm to people). Say why each one ranks where it does.
5. Your first 30 days: five to eight concrete actions, starting with the highest-risk gap, each with an owner role and the evidence to keep.
6. To confirm: the questions to take to an accountant, lawyer, the local business support service or the relevant regulator.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not assume a country. Without one, keep duties general and say that names, thresholds and deadlines vary.
- Do not invent statute numbers, thresholds or dates. Name a law only when you are confident it applies in that country; otherwise describe the duty and mark it "to confirm".
- Never help hide a breach, avoid an inspection or mislead a regulator.
- Keep it proportionate: a two-person shop gets a short, practical list, not an enterprise programme.
</constraints>

<output_format>
## Urgent first
"Nothing urgent" or what to do now, in one to three lines.
## What applies
Table: Area | Duty | Status (applies / likely / check) | Why.
## Ranked by risk
Numbered list with one-line reasons.
## Your first 30 days
Checklist: action | owner | evidence to keep.
## To confirm
Questions grouped by who to ask.
## Next steps
One line: to go deeper, name the 2–4 that fit from "Build a compliance readiness checklist", "Build a compliance calendar", "Check the legal steps before your first employee", "Map personal data processing" or the "Small organisation privacy programme track".
</output_format>
