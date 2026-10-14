---
schema: 1
id: write-up-sick-day-plan
kind: prompt
title: Write up a sick day plan
description: Turns the sick day rules a care team has given for a condition such as diabetes or adrenal insufficiency into a clear one-page card and checklist, copied exactly, with gaps flagged to ask about.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [notes, document, text]
output: [checklist, summary, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [sick-day-rules, diabetes, adrenal-insufficiency, kidney-disease, emergency-card, carers]
pairs_with:
  prompts: [prepare-emergency-medical-summary, set-up-medication-routine, plan-flare-day-logistics]
args:
  - name: rules
    description: The sick day rules or advice your care team gave you, pasted or typed exactly as written (leaflet, clinic letter or notes from the appointment), including any numbers, doses and who to call.
    type: text
    required: true
  - name: context
    description: The condition, who will use the card (you, a partner, a child's school, a carer), and what you find hard to remember when ill. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Check first, Sick day card, Supplies checklist, Gaps to ask your care team about]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn medical sick day rules into something usable when someone is vomiting at 3am. Several long-term conditions come with rules for minor illnesses such as a stomach bug, fever or infection: for example, insulin users may be told to check glucose and ketones more often and never stop basal insulin; people on steroid replacement for adrenal insufficiency are often told how to adjust doses and when to use an emergency injection; some people with kidney or heart conditions or diabetes are told which medicines to pause temporarily when they cannot keep fluids down. These rules are individual and come from the person's own care team. The danger is in the details: written in long leaflets, remembered wrongly, or unavailable to the partner or carer who has to act. Your job is formatting and clarity only. You copy numbers, doses and instructions exactly and never fill a gap with general knowledge.

<rules>
{{rules}}
</rules>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. Check first: list the "get help now" instructions from their rules at the top. If the rules contain none, add a clearly labelled general line to call emergency services for collapse, confusion, severe breathing difficulty or being unable to keep fluids down for a sustained period, and flag that they should ask the team for their specific thresholds.
2. Sick day card: rewrite the rules as a one-page card in short imperative lines, in the order someone would use them (when to start the rules, what to check and how often, what to do with each medicine exactly as written, fluids and food, when to call the team, when to call emergency services, when to stop the rules). Keep every number, unit and medicine name exactly as given. Mark anything ambiguous with [check with care team].
3. Supplies checklist: items the rules mention (testing strips, ketone strips, emergency injection kit, sugary drinks, thermometer), plus checking expiry dates and keeping the card where carers can find it.
4. Gaps to ask your care team about: anything a careful reader would need but the rules do not say (for example what to do if they cannot test, thresholds missing, which medicines to pause), as questions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy doses, thresholds and medicine instructions exactly. Do not add, round, convert units, reorder in a way that changes meaning, or complete a missing dose from general knowledge.
- Do not suggest any medicine change that is not in their rules.
- If the rules appear to conflict with each other, flag the conflict and do not resolve it.
- Use their words for medicines; do not substitute names.
</constraints>

<output_format>
## Check first
## Sick day card
Printable, one page.
## Supplies checklist
## Gaps to ask your care team about
</output_format>
