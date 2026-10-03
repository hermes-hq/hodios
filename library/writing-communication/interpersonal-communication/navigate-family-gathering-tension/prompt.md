---
schema: 1
id: navigate-family-gathering-tension
kind: prompt
title: Navigate tension at a family gathering
description: Plans for a tense family gathering, such as a holiday or event, with topics to steer away from, redirect lines, boundaries to state, an exit plan and a support check-in.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
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
tags: [family-dynamics, holidays, boundaries, redirecting, politics-at-dinner, exit-plan]
pairs_with:
  prompts: [set-boundary, reply-to-tricky-message, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: gathering
    description: "The event: what, where, how long, who will be there, whether you are hosting or a guest, and whether there will be alcohol, for example \"Christmas lunch at my parents', 12 people, all afternoon, I'm driving\"."
    type: text
    required: true
  - name: tensions
    description: The topics, people and comments that usually cause trouble, and how it typically goes.
    type: text
    required: true
  - name: goals
    description: "Optional, what a good day looks like for you, for example \"get through it without a row in front of the kids\" or \"enjoy time with my nan\"."
    type: text
output_contract:
  format: markdown
  sections: [Your goals for the day, Topics and redirects, Boundaries to state, Exit plan, Support check-in, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Family gatherings get tense in predictable ways: the same topics (politics, weight, money, someone's life choices, an old grievance), the same people, often more alcohol and less sleep than usual, and an audience that turns a comment into a scene. A day of rules cannot fix a family, but preparation changes how it goes: a realistic goal, a short list of topics to steer away from with a ready redirect, one or two boundaries said calmly before or at the first instance, planned breaks, a time to leave decided in advance, and someone to check in with. Hosts cannot leave, so they need breaks and tasks instead of an exit.
</context>

<task>
Help me plan for this family gathering.

<gathering>
{{gathering}}
</gathering>
<tensions>
{{tensions}}
</tensions>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. If anyone who will be there has abused or seriously harmed me or my children, say that I do not have to attend or can attend on my terms (a short visit, with a support person, somewhere public), and put safety before keeping the peace; follow the safety guidance below. Then plan for what I decide.
2. Set two or three realistic goals for the day, based on mine if given. "No awkward moments" is not realistic; "leave on good terms with Mum" is.
3. For each tension, give the topic, who usually raises it, a short redirect line, and a firmer second line if they persist. Include redirects that move to something specific and genuinely of interest to that person.
4. Boundaries: one or two boundaries worth stating, with when to say them (a message beforehand, a quiet word on arrival, or at the first instance) and the exact words. Keep each to a sentence and say what I will do if it is crossed (change the subject, step out, leave), not what they must do.
5. Exit plan: an agreed leaving time, a signal with my partner or ally, my own transport, and a neutral leaving line. If I am hosting, replace this with planned breaks, tasks that take me out of the room, and an end time stated in the invitation.
6. Support check-in: who I can message during the day, when to step outside, and a two-minute reset.
7. Afterwards: how to wind down, and whether anything needs a calmer conversation later rather than on the day.
</task>

<constraints>
- Do not diagnose or label relatives. Describe behaviour, not personality.
- Redirects must sound natural in a family setting, not like a corporate script.
- Do not script lines that are sarcastic, that win an argument, or that humiliate anyone in front of others.
- If there are children, suggest keeping disagreements away from them.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your goals for the day
Two or three bullets.
## Topics and redirects
A table: Topic | Who raises it | Redirect | If they persist.
## Boundaries to state
For each: when, and the exact words in a quote block.
## Exit plan
Bullets (or Breaks plan if hosting).
## Support check-in
Two to four bullets.
## Afterwards
Two or three bullets.
</output_format>
