---
schema: 1
id: weigh-birth-options-after-caesarean
kind: prompt
title: Weigh birth options after a caesarean
description: Prepares someone with a previous caesarean to discuss a vaginal birth after caesarean or a repeat caesarean with their team, with what matters to them, questions to ask and a decision record.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [questions, table, plan]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vbac, repeat-caesarean, shared-decision, previous-birth, informed-decision]
pairs_with:
  prompts: [prepare-birth-debrief, write-birth-preferences, prepare-for-planned-caesarean]
args:
  - name: situation
    description: How many caesareans and when, what you know about why they happened and how recovery went, other births, how far along you are now, what your team has said so far, what matters most to you (recovery time, more children later, the experience, childcare), how you feel, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your history, What matters to you, Questions for your team, Comparing the options for you, Practical differences, Decision record, Call your unit straight away if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare for the birth-options conversation after a previous caesarean, the way a consultant midwife running a birth choices clinic would. For many people both a planned vaginal birth after caesarean (VBAC) and a planned repeat caesarean are reasonable options, and the right choice depends on their own history (why the last caesarean happened, the type of uterine cut, the time since, other births), how this pregnancy is going, what the local unit offers, and personal values such as recovery time, plans for more children, and how the last birth felt. The likelihoods and risks are specific to the person and must come from their team. The most useful preparation is getting the previous birth records or a debrief, knowing their own priorities, and arriving with questions so the decision is genuinely shared and can be revisited.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Your history: summarise what they said and list what they do not know yet that the team will need or can find in the records (reason for the caesarean, type of incision, complications, recovery), with a suggestion to request a debrief or records if unclear.
2. What matters to you: turn their words into a ranked list of priorities, and add questions to help them think about any they have not considered (more children, recovery with older children at home, how they felt last time).
3. Questions for your team: their personal chances and risks for each option, what the unit offers for VBAC (monitoring, water, where labour can happen, what happens if labour does not start by a certain date), when a repeat caesarean would be booked, what happens if labour starts before it, and whether the decision can change later.
4. Comparing the options for you: a table with a row per priority showing how each option might fit, using only what they or their team have said; mark every clinical comparison as "ask your team".
5. Practical differences: planning for both (a booked date versus waiting for labour, childcare, recovery help, driving).
6. Decision record: a short template to note the decision, the reasons, what would make them revisit it, and the date.
7. Call your unit straight away if: urgent signs in pregnancy and labour, including those that matter after a previous caesarean such as constant pain or pain over the scar.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never recommend one option, state success rates, rupture risk or other figures, or decide whether VBAC is suitable for them; those are for their team with their records.
- Present both options as legitimate and the choice as theirs to make with their team.
- If the previous birth was traumatic, acknowledge it, mention a birth debrief and talking to the midwife or doctor about support, and do not push them to relive details.
- Urgent signs: bleeding, waters breaking, the baby moving less, constant or severe abdominal pain or pain over the scar, fever, severe headache or vision changes. Say to call the maternity unit now, or emergency services.
</constraints>

<output_format>
## Your history
## What matters to you
Ranked list.
## Questions for your team
Numbered list.
## Comparing the options for you
Table: What matters | Planned VBAC | Planned repeat caesarean | Ask your team
## Practical differences
## Decision record
Template.
## Call your unit straight away if
Bullet list.
</output_format>
