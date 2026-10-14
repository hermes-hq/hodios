---
schema: 1
id: stay-neutral-between-friends
kind: prompt
title: Stay neutral between friends in a conflict
description: Gives ways to stay out of the middle when two friends or relatives fall out, without taking sides, carrying messages or losing either relationship, and when not to stay neutral.
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
depth: specific
tags: [neutrality, triangulation, friend-groups, falling-out, caught-between]
pairs_with:
  prompts: [mediate-disagreement, navigate-family-gathering-tension, set-boundary]
  personas: [communication-coach]
args:
  - name: situation
    description: Who has fallen out, what it is about as far as you know, and how each of them is pulling you in.
    type: text
    required: true
  - name: my_relationships
    description: Optional. How close you are to each of them, and any shared events or groups coming up.
    type: text
output_contract:
  format: markdown
  sections: [Where you stand, When one of them vents, When asked to pass a message or choose, Shared events, When neutrality is not right, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Family therapists call it triangulation when two people in conflict pull a third person in instead of dealing with each other. The third person usually means well, but by carrying messages, reporting what the other said or agreeing that the absent person is unreasonable, they keep the conflict going and often end up blamed by both. Staying neutral is not the same as staying silent or cold: you can care about each person, listen to how they feel, and still decline to judge the other one ("That sounds really painful" rather than "She's being awful"). The core moves are: say clearly once that you love them both and will not take sides, do not repeat what either says to the other, encourage them to talk directly, and keep your relationship with each separate. Neutrality is wrong when one person is harming the other (abuse, threats, harassment); then supporting the person being harmed is the right thing.
</context>

<task>
Help me stay out of the middle of this.

<situation>
{{situation}}
</situation>
{{#my_relationships}}
<my_relationships>
{{my_relationships}}
</my_relationships>
{{/my_relationships}}

1. If the conflict involves abuse, threats, harassment or one person being unsafe, say that neutrality is not the right goal, explain how to support the person being harmed, and follow the safety guidance below.
2. Write a short statement of where I stand that I can say to each of them once, warmly.
3. Write lines for when one of them vents to me: listening and empathising without agreeing about the other person, and gently steering them to speak to the other directly.
4. Write lines for when I am asked to pass on a message, report what the other said, or choose a side, including a firm repeat for when they push.
5. Give practical advice for shared events and group chats (inviting both and letting them decide, not hosting a confrontation, what to do if one asks me to exclude the other).
6. Note the mistakes to avoid (sharing what each said, private agreement with both, using it as gossip) and how to recover if I have already slipped.
</task>

<constraints>
- Do not judge who is right in the conflict from my account; I am hearing one or two sides.
- Do not suggest I mediate unless I ask or both have asked me to.
- Keep lines short and natural, and warm toward both people.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Where you stand
The statement to say once.
## When one of them vents
Lines to use.
## When asked to pass a message or choose
Table: If they say… | You can say…
## Shared events
Practical advice.
## When neutrality is not right
When and how to stop being neutral.
## Notes
Mistakes to avoid and how to recover.
</output_format>
