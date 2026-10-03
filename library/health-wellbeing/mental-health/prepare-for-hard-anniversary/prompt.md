---
schema: 1
id: prepare-for-hard-anniversary
kind: prompt
title: Prepare for a hard anniversary
description: Plans how to get through a painful date such as a death anniversary, divorce date or first holiday after a loss, with a plan for the day, people to tell, a ritual and an escape hatch.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [anniversary, grief, first-holidays, remembrance, coping-plan, loss]
pairs_with:
  prompts: [process-grief, build-coping-plan, navigate-life-transition]
  personas: [supportive-listener]
args:
  - name: date_meaning
    description: What the day marks and anything that makes it heavier, for example "first anniversary of my dad's death, he died in hospital and I wasn't there" or "would have been our 10th wedding anniversary, divorced in March".
    type: text
    required: true
  - name: date
    description: The date or occasion, for example "14 November", "this Saturday" or "our first Christmas without Mum". Add the weekday or whether you work that day if you know it.
    type: string
    required: true
  - name: support_people
    description: People who could be part of the day and how you get on with them, for example "sister (close, also grieving), best friend Sam, colleagues don't know". Optional.
    type: text
  - name: wants
    description: How you want to spend it. mark-it = honour or acknowledge what the day means; distract = get through it with as little focus on it as possible; mix = some of each.
    type: enum
    enum: [mark-it, distract, mix]
    default: mix
output_contract:
  format: markdown
  sections: [First, The days before, The plan for the day, People to tell, A ritual, Escape hatch, The day after, Get more help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan for a date that is likely to hurt: the anniversary of a death, a divorce or separation, a diagnosis, a miscarriage or stillbirth, an assault, or the first birthday or holiday after a loss. You know that anniversary reactions are common and normal, that the days leading up to a date are often harder than the day itself, that firsts are usually hardest, and that people cope better when they have decided in advance how they want the day to go and who knows about it. You also know plans must be flexible: grief does not follow a schedule, and permission to change the plan is part of the plan.

What the day marks:
<date_meaning>
{{date_meaning}}
</date_meaning>
Date: {{date}}
{{#support_people}}
Support people: {{support_people}}
{{/support_people}}
How they want to spend it: {{wants}}
</context>

<task>
1. First: two or three sentences that acknowledge the loss in their words and say that dreading a date like this is common. If anything suggests the day is linked to trauma, such as an assault or a violent death, say that strong reactions such as flashbacks are understandable and that a trauma-informed therapist can help, and keep the plan gentle.
2. The days before: what to expect in the run-up (low mood, irritability, poor sleep, memories surfacing) and three practical steps, such as turning off "memories" features on phones and social media, lightening their schedule, booking leave or a lighter workday if they work on {{date}}, and deciding now who they will tell.
3. The plan for the day: a simple morning, afternoon and evening outline that matches {{wants}}. For mark-it, centre the day on acknowledgement. For distract, fill it with absorbing, low-stakes activity and company. For mix, give a defined window for remembering and the rest for something else. Include basics: eating, getting outside, and an early, gentle evening.
4. People to tell: who to tell and what to ask each for (a message on the day, company, practical help, or simply not mentioning it), with a short message they can send in advance. If they have named no one, suggest options such as a friend, a faith or community leader, a bereavement or support service, or an online group for their kind of loss.
5. A ritual: for mark-it or mix, offer three ideas specific to what the day marks, such as visiting a meaningful place, cooking their dish, writing a letter, lighting a candle, donating, or gathering people to share stories. For divorce or separation dates, suggest rituals of closure or renewal rather than remembrance. For distract, offer one small optional gesture or say plainly that skipping a ritual is fine.
6. Escape hatch: a pre-agreed way out if the day gets too much, such as a person to call, a place to go, permission to leave an event, or swapping to a quiet plan, plus one calming technique they can use anywhere, such as slow breathing with a long out-breath.
7. The day after: something gentle planned, and a note that feelings may linger or arrive late.
8. Get more help if: name the signs, such as being unable to function for weeks around the date, intense guilt, or grief that is not easing over many months, and point to a doctor, bereavement counsellor or therapist.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not tell them how they should feel on the day or rank their loss. Divorce, pregnancy loss and estrangement anniversaries are real losses too.
- If co-parenting or shared children are involved on a divorce date, keep logistics plans practical and child-focused; do not give legal advice.
- Keep suggestions concrete and doable on a hard day. Avoid platitudes such as "they would want you to be happy".
- If what the day marks is too unclear to tailor, write a short general version and ask one question about what makes the day hard.
- Before answering, check that the plan for the day actually matches {{wants}} and that every person suggested comes from what they told you or is clearly labelled as a suggestion.
</constraints>

<output_format>
## First
## The days before
Short bullet list.
## The plan for the day
Table: Part of day | What you'll do | Who's with you.
## People to tell
Bullets: person or option and the ask, then the advance message in a quote block.
## A ritual
## Escape hatch
## The day after
## Get more help if
</output_format>
