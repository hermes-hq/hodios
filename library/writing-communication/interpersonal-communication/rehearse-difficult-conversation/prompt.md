---
schema: 1
id: rehearse-difficult-conversation
kind: prompt
title: Rehearse a difficult conversation
description: Role-plays the other person in a difficult conversation realistically, one turn at a time, then debriefs what worked, what escalated and better phrasing to try next time.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, manager, parent, founder]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [counterpart-simulation, rehearsal, conflict-resolution, de-escalation, debrief]
pairs_with:
  prompts: [prepare-difficult-conversation, set-boundary, give-feedback-sbi]
  personas: [communication-coach]
args:
  - name: situation
    description: What the conversation is about, what has happened so far, and what you want to say or achieve.
    type: text
    required: true
  - name: other_person_profile
    description: Who the other person is to you and how they tend to react, for example "my manager, deflects with 'everyone's busy'" or "my dad, goes quiet then brings up old stuff". Include phrases they actually use.
    type: text
    required: true
  - name: difficulty
    description: How hard the other person makes it. cooperative listens but has their own view; defensive justifies, minimises and deflects; hostile interrupts, blames and escalates.
    type: enum
    enum: [cooperative, defensive, hostile]
    default: defensive
output_contract:
  format: markdown
  sections: [Scene, Role-play, Debrief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Knowing what to say is not the same as being able to say it when the other person pushes back. Rehearsal works when the practice partner reacts the way the real person would, including the reaction you dread, and responds to the words you actually used rather than to the ideal version in your head. Escalation in real conversations usually follows specific moves: blame language ("you always"), assumed motives, piling on old grievances, or not acknowledging the other side. De-escalation follows others: naming facts, acknowledging their view without conceding the point, asking a real question, proposing a next step. The value is in the debrief that connects each reaction to the line that caused it.
</context>

<task>
Run a rehearsal of this conversation with me. You play the other person; I play myself.

<situation>
{{situation}}
</situation>
<other_person_profile>
{{other_person_profile}}
</other_person_profile>
Difficulty: {{difficulty}}

1. Safety check first. If the situation involves violence, threats, coercive control, stalking or fear for anyone's safety, do not run a confrontation rehearsal. Follow the safety guidance below and stop.
2. Scene: in two or three lines, confirm who you are playing, where and how the conversation happens, and what I want from it. If the profile is too thin to play the person realistically, ask up to two questions first (for example how they usually react, or a phrase they use). Then ask whether I want to open or want them to open, and wait.
3. Role-play, one turn at a time:
   - Reply only as the other person, in one to four sentences, in their voice. Then stop and wait for my next line.
   - React to what I actually said. Blame, sarcasm, assumed motives or an ultimatum make them more defensive; a specific fact, acknowledgement of their view, or a genuine question makes them more open, within the limits of the difficulty level.
   - Stay consistent with the profile and difficulty. Defensive means justifying, minimising, deflecting and changing the subject. Hostile means interrupting, counter-accusing and raising old grievances, but no slurs, threats or abuse. Cooperative still holds their own view and asks hard questions.
   - Do not coach during the role-play. If I type "pause", step out of role, give one short tip, and resume when I say so.
4. End the role-play when I type "debrief", when a resolution or clear impasse is reached, or after about twelve exchanges (then ask if I want to continue or debrief).
5. Debrief, quoting my lines.
</task>

<constraints>
- Be realistic, not cartoonish and not a pushover. The person gives ground only when something I say earns it.
- Keep each in-character turn short so I have to respond, as in a real conversation.
- In the debrief, be specific and kind: quote the exact line, say what it triggered and why, and give a replacement I could actually say.
- If I seem genuinely distressed during the practice (not in character), step out of role, check in, and offer to stop or lower the difficulty.
- Do not help me script manipulation, threats or guilt-tripping; in the debrief, name such lines and offer an honest alternative.
- If the situation involves harassment, discrimination or an employment or tenancy dispute, mention once in the scene setup that HR, a union or an advice service may be the right route alongside the conversation.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
Scene: two or three plain lines, then the question about who opens.

During the role-play: only the other person's words, with an occasional stage direction in italics in brackets (for example *(sighs, looks at phone)*). No headings, no notes.

Debrief, as Markdown:
## What worked
Two or three of my lines, quoted, and what each achieved.
## What escalated
The moments the conversation got worse: my line, their reaction, why.
## Try instead
A table: You said | Try | Why it lands better.
## Next round
One thing to practise, and an offer to rerun at the same or a harder difficulty.
</output_format>
