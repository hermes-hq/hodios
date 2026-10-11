---
schema: 1
id: handle-gossip
kind: prompt
title: Handle gossip
description: Plans what to do when you are being gossiped about or pulled into gossip at work, school or in a friend group, from deflecting in the moment to addressing the source directly.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, manager, parent]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [gossip, rumours, workplace, reputation, group-dynamics]
pairs_with:
  prompts: [respond-to-criticism, clear-up-misunderstanding, set-boundary]
  personas: [communication-coach, workplace-mediator]
args:
  - name: situation
    description: What is being said, by whom (as far as you know), how you found out, where (work, school, friends, online) and how it is affecting you.
    type: text
    required: true
  - name: role_in_it
    description: Whether you are the subject of the gossip, being pulled into gossip about someone else, or a manager dealing with gossip on your team.
    type: enum
    enum: [subject, pulled-in, manager]
    default: subject
output_contract:
  format: markdown
  sections: [How serious is this, What to do, What to say, Protect yourself, If it gets worse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most gossip fades if it is not fed; reacting publicly, demanding to know who said what, or gossiping back tends to keep it alive. But not all gossip is harmless: rumours about someone's sexuality, health, a relationship with a boss, competence or honesty can damage reputation, careers and wellbeing, and when it targets a protected characteristic or is persistent it can amount to bullying or harassment that employers and schools have a duty to address. Second-hand reports are unreliable, so the first step is separating what you know from what you were told. When you are pulled into gossip about someone else, the easiest moves are to not add anything, redirect, or say something neutral or kind about the person; you do not need to lecture. Addressing the source directly works best privately, calmly, without naming who told you, focused on the specific claim and the effect.
</context>

<task>
Help me handle this. My role: {{role_in_it}}.

<situation>
{{situation}}
</situation>

1. Safety first. If the gossip involves threats, sharing intimate images, doxxing, or is linked to harassment or violence, say so, point to the formal routes and support, and do not just coach me to ignore it.
2. Help me judge how serious it is: what I actually know versus heard, whether it is idle chat or harming reputation or wellbeing, whether it is a one-off or a pattern, and whether it touches a protected characteristic.
3. Recommend a path: let it fade, address it lightly, speak to the source privately, correct the record with the people who matter, or report it. Say why for my case.
4. Write what to say: a neutral in-the-moment line if it comes up, an opener for a private conversation with the source (without naming who told me), and, if I am pulled in, lines to step out of it without preaching. For a manager, a short message for the team or a private word with those involved.
5. Help me protect myself: what not to do (reply-all, social posts, confronting in public), keeping a dated record if it is serious, and people who can support me.
6. Say what to do if it gets worse: who to go to at work (manager, HR, union), school (teacher, pastoral lead) or online (reporting tools), and what to bring.
</task>

<constraints>
- Do not assume the source is guilty from second-hand reports; frame the private conversation as checking.
- No retaliation, counter-rumours or public call-outs.
- Do not state employment or school law as fact; say what to check with HR, a union or the school's policy.
- Keep lines short and natural, suitable for the setting (a teenager at school speaks differently from a manager).
</constraints>

<output_format>
## How serious is this
Short assessment.
## What to do
The recommended path and why.
## What to say
The lines for each situation that applies.
## Protect yourself
Do and avoid, and what to record.
## If it gets worse
Who to go to and what to bring.
</output_format>
