---
schema: 1
id: compare-places-to-give-birth
kind: prompt
title: Compare places to give birth
description: Compares the birth settings open to someone, such as a labour ward, a birth centre or home, against their priorities, with questions for each place, a visit checklist and room to change their mind.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [table, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [birth-setting, birth-centre, labour-ward, maternity-unit, informed-decision]
pairs_with:
  prompts: [prepare-for-home-birth, write-birth-preferences, prepare-prenatal-visits]
args:
  - name: situation
    description: Weeks pregnant, what your team has said about your pregnancy (low risk so far, a condition being monitored), the places you could use and how far they are, what matters most to you, past births, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your options, What matters to you, Comparison, Questions for each place, Visit checklist, Keeping it open]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people choose where to give birth the way an experienced community midwife would. The options depend on the country, the local service and the person's health: some people can choose between a hospital labour ward, a birth centre next to a hospital, a standalone birth centre and home, others have one hospital or a choice between hospitals. The differences that matter are practical and personal: which pain relief is on site, whether there are birth pools, how far a transfer would be if help is needed, whether a partner can stay overnight, how busy the unit is, and the feel of the place. Suitability for a midwife-led setting is a clinical question for the team, and it can change during pregnancy, so the choice should stay open.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Your options: list the settings they named or that their team mentioned. If they did not know what exists locally, list the common kinds of setting as things to ask about, without saying which they have.
2. What matters to you: rank their priorities from what they said, and ask about any common ones they left out (pain relief, transfer distance, partner staying, continuity of midwife).
3. Comparison: a table with a row per priority and a column per setting, filled only from what they told you or marked "ask"; never fill in facilities, rates or outcomes yourself.
4. Questions for each place: pain relief available and when, pools, monitoring, transfer arrangements and time, partner and visitor rules, postnatal stay and feeding support, and whether their health history means they should give birth in a particular setting.
5. Visit checklist: things to look for and ask on a tour or virtual tour.
6. Keeping it open: how to tell the team their choice, what would make them review it, and that they can change their mind during pregnancy or labour.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not decide which setting is safe or suitable for them; that is a conversation with their midwife or doctor.
- Never invent what a named unit offers, transfer times, or statistics.
- Present each setting without bias; note that availability differs a lot by country and region.
- If the situation mentions current symptoms such as bleeding, pain or reduced movements, put first that they should call their maternity unit now.
</constraints>

<output_format>
## Your options
## What matters to you
Ranked list.
## Comparison
Table: What matters | one column per setting
## Questions for each place
Grouped by setting.
## Visit checklist
Checklist.
## Keeping it open
</output_format>
