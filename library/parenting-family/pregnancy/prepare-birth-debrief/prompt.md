---
schema: 1
id: prepare-birth-debrief
kind: prompt
title: Prepare for a birth debrief
description: Helps someone prepare to go through their birth experience with the maternity service, building a timeline, the questions they want answered, how to request it and what support exists afterwards.
category: pregnancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [questions, plan, message]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [birth-debrief, birth-trauma, maternity-care, medical-records, birth-reflections]
pairs_with:
  prompts: [prepare-doctor-questions, explain-clinical-notes]
args:
  - name: birth_story
    description: What you remember of the labour and birth in your own words, including what was hard, confusing or upsetting, what you were told and when, and anything you are unsure happened. Leave out names of staff and hospital numbers.
    type: text
    required: true
  - name: context
    description: How long ago the birth was, who would attend (you, your partner), the country, and whether you are also thinking of a complaint. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How you are now, Your timeline, Questions you want answered, Requesting the debrief, On the day, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare for a birth debrief (sometimes called birth reflections or birth afterthoughts), the meeting where a midwife or obstetrician goes through the maternity notes with them. Many people come out of a difficult birth with gaps: they do not know why a decision was made, how long something took, or whether something was their fault. A debrief can fill those gaps, and it works best when they bring a timeline of what they remember and a short list of the questions that matter most. Debriefs are not complaints, though people can do both, and in many places they can also ask for a copy of their notes. Distress after birth is common, and birth trauma and postnatal depression or anxiety are treatable; they deserve support alongside the debrief.

<birth_story>
{{birth_story}}
</birth_story>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. How you are now: a short, gentle check. If the story or context mentions flashbacks, nightmares, avoiding reminders, panic, low mood, not bonding with the baby or thoughts of self-harm, say kindly that these are signs to speak to their doctor, midwife or health visitor soon, and give crisis guidance if needed.
2. Your timeline: turn the story into a clear timeline by phase (before labour, labour, birth, straight after, postnatal ward), marking each moment as "I remember", "I was told" or "I'm not sure", and where the gaps are.
3. Questions you want answered: questions phrased neutrally ("Why was the decision made to...?", "What did the monitoring show at...?", "Could this happen again in a future pregnancy?"), grouped by moment, with the top three marked.
4. Requesting the debrief: who usually offers it (the maternity service, birth reflections or birth afterthoughts service, the consultant midwife, or the hospital patient liaison service), that availability varies by country and hospital, and a short request message in a code block. Mention they can usually ask for a copy of their maternity notes, with the process to check locally.
5. On the day: bring the timeline and questions, bring someone if they want, ask to take notes or have a written summary, ask for terms to be explained, and that they can pause or stop.
6. Afterwards: what to do if questions remain (a follow-up, a second opinion, raising a concern or complaint through the hospital's process, independent advice), and support for how they feel.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not judge whether the care was right or wrong, whether anyone was negligent, or what "should" have happened. That is for the clinicians, and for a complaint process or lawyer if they choose.
- Do not reinterpret their medical events or guess causes; keep their words and mark uncertainty.
- Neutral, non-blaming question wording, including no self-blame.
- Never invent services, names, timescales or rights.
- Warm, unhurried tone.
</constraints>

<output_format>
## How you are now
## Your timeline
Table: Phase | What happened | I remember / I was told / I'm not sure.
## Questions you want answered
## Requesting the debrief
Message in a code block.
## On the day
## Afterwards
</output_format>
