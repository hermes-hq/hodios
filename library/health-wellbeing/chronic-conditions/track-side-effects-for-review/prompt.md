---
schema: 1
id: track-side-effects-for-review
kind: prompt
title: Track side effects for review
description: Sets up a log of possible medicine side effects for a long-term condition, with timing against doses, severity, what needs urgent help, and a summary for the prescriber or pharmacist.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [text, notes]
output: [table, summary, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [side-effects, medicines, adverse-reactions, pharmacist, symptom-tracking]
pairs_with:
  prompts: [set-up-medication-routine, explore-flare-triggers, coordinate-care-across-specialists]
args:
  - name: medicine
    description: The medicine you are worried about, when you started it or changed the dose, when you take it, and anything the prescriber or leaflet said to expect.
    type: text
    required: true
  - name: effects
    description: What you have noticed so far, when it happens, and how much it affects your day. Paste any notes you have kept. Optional if you are setting up a log before starting.
    type: text
output_contract:
  format: markdown
  sections: [Get help now if, Keep taking it unless told otherwise, What to log, Your log, Summary for your prescriber, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people record possible side effects in a way that a prescriber or pharmacist can act on. People with long-term conditions often take medicines for years, and side effects are a common reason they quietly stop, which can be dangerous: stopping some medicines suddenly (for example steroids, some epilepsy, heart and blood pressure medicines, and many antidepressants) can cause serious problems. Prescribers can often help: changing the timing, taking with food, a different formulation, a dose change or a switch. What helps them decide is specific information: when it started relative to starting or changing the medicine, when in the day it happens relative to doses, how severe, how it affects daily life, whether it is getting better or worse, and what else changed at the same time. Many effects ease in the first weeks; some do not and are worth raising. Most countries also run a national scheme where patients can report suspected side effects themselves.

<medicine>
{{medicine}}
</medicine>
{{#effects}}
<effects>
{{effects}}
</effects>
{{/effects}}
</context>

<task>
1. Get help now if: signs of a serious reaction that need emergency or same-day help (for example swelling of the face, lips or throat, difficulty breathing, a widespread rash with blistering or sore mouth and eyes, yellowing skin or eyes, severe or unusual bleeding or bruising, chest pain, fainting, thoughts of self-harm) and anything their leaflet lists as urgent. Put this first.
2. Keep taking it unless told otherwise: explain briefly why not to stop or change on their own, and that a pharmacist can be asked quickly about whether a symptom is a known effect.
3. What to log: date, time of dose, time and description of effect, severity 0 to 10, impact on the day, other factors (food, sleep, other new medicines or supplements, illness).
4. Your log: a table filled with anything they already noted, and blank rows to continue.
5. Summary for your prescriber: if they gave enough information, a short factual summary with counts and patterns observed ("on 9 of 14 days, nausea within an hour of the morning dose, severity 4 to 6"), without saying the medicine caused it.
6. Questions to ask: for the prescriber or pharmacist, and a line telling them they can usually report suspected side effects through their country's national reporting scheme.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say the medicine is or is not causing the symptom, and never suggest stopping, skipping, splitting, retiming or changing a dose.
- Do not list side effects from memory as facts about their medicine; point them to the leaflet and the pharmacist.
- Summaries count what they logged and nothing else. Do not fill gaps.
- If they mention low mood, hopelessness or self-harm thoughts after starting a medicine, treat it as urgent and kind.
</constraints>

<output_format>
## Get help now if
## Keep taking it unless told otherwise
## What to log
## Your log
Table: Date | Dose time | Effect | Started | Severity 0-10 | Impact | Other factors.
## Summary for your prescriber
## Questions to ask
</output_format>
