---
schema: 1
id: intervene-as-bystander
kind: prompt
title: Intervene as a bystander
description: Gives safe ways to step in when you witness harassment, a racist or sexist joke, or bullying, at work, in public or online, using distract, delegate, direct, delay and document.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, manager, student, teacher]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [bystander-intervention, harassment, allyship, bullying, workplace]
pairs_with:
  prompts: [respond-to-microaggression, practise-de-escalation-skills, handle-gossip]
  personas: [communication-coach]
args:
  - name: situation
    description: What you saw or expect to see, where (office, meeting, public transport, a bar, a group chat), who was involved and your relationship to them, and whether it already happened or keeps happening.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is it safe, Your options, What to say, Checking in with the target, Reporting it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most bystanders want to help but freeze, assume someone else will act, or think the only option is a confrontation. Bystander-intervention training commonly teaches five options, often called the 5 Ds: Distract (interrupt with an unrelated question or action), Delegate (get help from someone with more authority or safety, such as a manager, staff, a driver or security), Direct (name it calmly and briefly), Delay (check in with the person afterwards), and Document (record or note what happened, but only to give to the person targeted, never to post without their consent). The right choice depends on safety, power and what the targeted person would want. Centering the target matters: the goal is their safety and dignity, not the bystander's moral moment. Even a small action, like asking the target "are you OK?" afterwards, reduces harm and isolation.
</context>

<task>
Help me plan how to step in.

<situation>
{{situation}}
</situation>

1. Assess safety first: physical danger, weapons, intoxication, power I do not have. If there is immediate danger, say to contact emergency services or staff first and not to intervene physically.
2. If key details are missing (where it happens, my relationship to those involved), make reasonable assumptions, state them and continue.
3. Give my options using the five Ds, with what each looks like in this setting, and recommend one or two given safety, power and what the target would likely want.
4. Write short lines for each recommended option: a distraction, a delegate request, a calm direct line (one sentence, about the behaviour, not the person's character), and what to say if the person doing it pushes back ("it was just a joke").
5. Write a check-in with the target afterwards: what to say, how to ask what they want, and what not to do (speak for them, push them to report).
6. Explain reporting: who to tell in this setting (manager, HR, transport staff, platform tools, police for crimes), what to note (date, time, words, witnesses), and that the target decides whether their name is used.
</task>

<constraints>
- Never advise physical intervention or confronting someone who appears dangerous; safety of the target and me comes first.
- Recordings and screenshots go to the target; never suggest posting them publicly without consent.
- Keep direct lines short and calm, not lectures or insults.
- Do not state laws as fact; describe reporting routes to check locally.
- Accept that sometimes the safest action is delay or delegate, and say so without judgement.
</constraints>

<output_format>
## Is it safe
Short assessment and any immediate step.
## Your options
Table: Option | What it looks like here | When to use it.
## What to say
Lines for the recommended options, plus pushback replies.
## Checking in with the target
Words and what to avoid.
## Reporting it
Routes and what to record.
</output_format>
