---
schema: 1
id: call-time-out-in-heated-argument
kind: prompt
title: Call a time-out in a heated argument
description: Gives words to pause a heated argument with a partner or relative, an agreed time-out plan, what to do during the break and how to come back to the topic.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [time-out, flooding, argument, calming-down, couples]
pairs_with:
  prompts: [repair-after-argument-with-partner, raise-recurring-issue-with-partner, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: relationship
    description: "Who you argue with, for example \"my husband\", \"my teenage son\", \"my mother, who I live with\"."
    type: string
    required: true
  - name: pattern
    description: How your arguments usually go, what sets them off, who escalates or withdraws, and what happens if one of you tries to stop.
    type: text
    required: true
  - name: use
    description: Whether you want to agree a time-out plan in advance, have words ready for the moment, or both.
    type: enum
    enum: [agree-in-advance, in-the-moment, both]
    default: both
output_contract:
  format: markdown
  sections: [Agree it in advance, Calling it, During the break, Coming back, If they will not let you pause, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an argument gets heated, the body goes into fight-or-flight ("flooding"): heart rate jumps, hearing narrows and people say things they regret. Talking more at that point makes it worse. A time-out works when it is agreed in advance while calm, called with a neutral signal rather than storming off, and always comes with a time to return, usually after at least 20 minutes and within 24 hours. That return promise is what separates a time-out from stonewalling or abandonment, which the other person often fears. During the break the aim is to calm the body (walk, breathe, something absorbing), not to rehearse the argument, which keeps people flooded. Whoever called the pause is responsible for coming back. With a child or teenager, the parent models the pause and owns the return. A pause is not for avoiding a topic forever.
</context>

<task>
Help me pause heated arguments with {{relationship}}. I want: {{use}}.

<pattern>
{{pattern}}
</pattern>

1. Safety first. If the pattern includes physical violence, threats, blocking exits, breaking things or fear of the other person, do not offer time-out scripts as the answer. Follow the safety guidance below and stop.
2. If agreeing in advance: write a short proposal to make when calm, covering the signal word or gesture, the minimum and maximum break, where each of us goes, and the promise to return. Fit it to the relationship (an adult partner, a parent, a teenager).
3. Write two or three ways to call the pause in the moment: short, owning my state ("I'm too wound up to listen well"), naming a return time, without a final dig.
4. Say what to do during the break and what to avoid (replaying the fight, texting more arguments, venting to someone who takes sides), with ideas that suit my situation.
5. Write how to come back: a check that both are calm, a reopening line, and how to pick the topic back up more slowly, or agree to set it aside for a planned talk.
6. Write what to say if the other person follows me, keeps arguing or reads the pause as rejection, including when it is fine to leave the room anyway.
</task>

<constraints>
- Present the pause as something for both of us, not a weapon to end conversations I dislike.
- Do not judge who is to blame for the pattern or diagnose anyone.
- Keep every in-the-moment line under about 15 words so it can be said while upset.
- If arguments happen most days or keep escalating, suggest once that a counsellor or family therapist can help.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Agree it in advance
The proposal to make when calm (skip if not requested).
## Calling it
Two or three lines to use.
## During the break
Do and avoid.
## Coming back
The check, the reopening line and next steps.
## If they will not let you pause
What to say and do.
## Notes
Anything else, including when to get help.
</output_format>
