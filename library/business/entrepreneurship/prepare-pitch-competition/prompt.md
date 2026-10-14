---
schema: 1
id: prepare-pitch-competition
kind: prompt
title: Prepare for a pitch competition
description: Prepares a founder for a startup pitch competition - a timed pitch built on the judging criteria, demo plan, likely judge questions with answers, and a rehearsal plan.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [build, verify]
role: [founder, student]
requires: [none]
inputs: [text, document]
output: [script, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [pitch-competition, judging-criteria, timed-pitch, judge-questions, demo-day]
pairs_with:
  prompts: [review-pitch-deck, write-elevator-pitch, prepare-investor-qa, practise-elevator-pitch]
args:
  - name: competition
    description: The competition rules - pitch length, Q&A length, judging criteria and weights, who the judges are (investors, corporates, academics), slide or demo rules, and the prize.
    type: text
    required: true
  - name: startup
    description: Your startup - problem, customer, solution, traction with numbers, business model, team, competition, and what you would do with the prize. Paste an existing pitch or deck text if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Criteria map, Pitch script, Demo plan, Likely questions, Rehearsal plan, Day-of checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach founders for pitch competitions. These differ from investor meetings: judges score against published criteria, often in a few minutes each, after hearing many pitches in a row. Winners make the scoring easy - they cover every criterion explicitly, in the order judges think, with one memorable number and a clear ask. Common failures: running over time and being cut off, a long backstory before the problem, a live demo that breaks, traction claims judges cannot check, and defensive answers in Q&A. Spoken pace is about 130-150 words a minute, so a three-minute pitch is roughly 400-450 words.

<competition>
{{competition}}
</competition>

<startup>
{{startup}}
</startup>
</context>

<task>
1. Criteria map: list each judging criterion with its weight, and what in the startup's material proves it. Flag criteria with weak proof and how to strengthen them before the event.
2. Pitch script: write a script that fits the time limit at a natural speaking pace, with a word count and a time per section. Open with the problem in a concrete moment, give the one strongest number early, cover every criterion, and end with what the prize or support would unlock. Mark where each slide changes.
3. Demo plan: whether to demo live, use a recorded clip or show screenshots, given the rules and risk; the 20-30 seconds that show the core value; and a fallback.
4. Likely questions: 10-12 questions these judges are likely to ask, weighted to the weakest criteria, each with a short honest answer (under 40 words) built from the founder's facts.
5. Rehearsal plan: a schedule of timed run-throughs, practising with interruptions, recording and cutting, and a 30-second version in case time is cut.
6. Day-of checklist: files and backups, timing aids, what to wear and bring, and how to follow up with judges and other contacts afterwards.
</task>

<constraints>
- Use only facts and numbers the founder gave. Do not invent traction, market size, awards or customer names; leave `[number]` placeholders where a figure would help and say where to get it.
- Keep the script within the time limit; if the content does not fit, cut and list what was cut.
- Answers must be honest about weaknesses; never script a misleading answer.
</constraints>

<output_format>
## Criteria map
Table: Criterion | Weight | Proof we have | Gap.
## Pitch script
Sections with time, slide cue and words; total word count and estimated time at the end.
## Demo plan
## Likely questions
Numbered: question, then answer.
## Rehearsal plan
## Day-of checklist
</output_format>
