---
schema: 1
id: talk-to-doctor-about-mental-health
kind: prompt
title: Talk to your doctor about mental health
description: Prepares someone to raise their mental health with a family doctor, with a 30-second opening, concrete examples of impact, questions to ask and ways to make sure they are heard.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, questions, checklist]
risk: read-only
advice_risk: [mental-health, medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [doctor-appointment, depression, anxiety, self-advocacy, getting-help]
pairs_with:
  prompts: [prepare-for-therapy, build-mood-tracker, prepare-doctor-questions]
  personas: [supportive-listener]
args:
  - name: symptoms
    description: What you have been feeling and noticing, in your own words, for example "low and flat, no interest in anything, waking at 4am", "constant worry, tight chest, can't switch off".
    type: text
    required: true
  - name: duration
    description: How long it has been going on, for example "about two months", "on and off for years, worse since spring". Optional.
    type: string
  - name: impact
    description: How it affects daily life, for example "called in sick three times this month", "stopped seeing friends", "snapping at the kids". Optional.
    type: text
output_contract:
  format: markdown
  sections: [If you need help sooner, Your opening, What to tell them, Questions to ask, Making sure you are heard, Before and after]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare to talk to their family doctor or primary-care clinician about their mental health. Many people find it hard to start, minimise how bad things are, or run out of time in a 10 to 15 minute appointment. Doctors find it easiest to help when they hear, early and plainly, what the person is experiencing, for how long, how it affects daily life, and what the person hopes for. Patients are entitled to ask questions, to bring someone, to ask for a longer appointment and to ask for a second view.

<symptoms>
{{symptoms}}
</symptoms>
{{#duration}}Duration: {{duration}}{{/duration}}
{{#impact}}
<impact>
{{impact}}
</impact>
{{/impact}}
</context>

<task>
1. If you need help sooner: two lines. If they have thoughts of suicide or self-harm, or feel unable to stay safe, they should not wait for a routine appointment: contact emergency services, a crisis line, or ask for an urgent same-day appointment.
2. Your opening: a 30-second statement in the first person they can read aloud, saying they want to talk about their mental health, the main feelings, how long, how it affects life, and what they want from the visit (to understand what is going on, to talk about options, a referral, time off). Plain words, no medical labels unless they used them.
3. What to tell them: a short, organised list from their input under mood and feelings, thoughts, sleep, appetite and energy, concentration, physical symptoms, alcohol or drug use, and impact on work, home and relationships, with one concrete example each where they gave one. Mark gaps as [not noted] and include a prompt to add them. Note that it helps to mention any thoughts of self-harm honestly, and that doctors ask this routinely.
4. Questions to ask: top three, then more if there is time, such as: What might be going on? What are the options, including talking therapies, self-help, medicines and doing nothing for now, and their pros and cons? How do I get a referral and how long is the wait? What should I do if things get worse before then? When should we review this?
5. Making sure you are heard: say the most important thing first; use the impact examples; it is fine to read from a note or hand it over; say "I'd like you to know this is hard for me to say"; ask for a longer or follow-up appointment if time runs out; bring someone if that helps; ask the doctor to write down next steps.
6. Before and after: a checklist (write the note, list current medicines and supplements, book a double appointment if possible) and, after, what to write down and when to follow up.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not suggest a diagnosis or specific medicines, or coach them to ask for a named medicine.
- Keep their words and do not exaggerate or minimise what they described.
- The opening must take about 30 seconds to read aloud (roughly 70 to 90 words).
- If the symptoms are too vague to summarise, ask two short questions (how long, and what it stops them doing) and still give a draft opening.
</constraints>

<output_format>
## If you need help sooner
## Your opening
In a quote block.
## What to tell them
## Questions to ask
Top three in bold, then the rest.
## Making sure you are heard
## Before and after
Checklist.
</output_format>
