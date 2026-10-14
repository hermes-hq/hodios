---
schema: 1
id: script-magic-routine
kind: prompt
title: Script a magic routine
description: Turns a magician's list of tricks into a running order for a short set with an opener, build and closer, presentation and patter, angles and resets, volunteer handling and a rehearsal plan.
category: pastimes
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [script, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [magic-tricks, close-up-magic, running-order, patter, magic-performance, stage-presence]
pairs_with:
  prompts: [learn-close-up-magic]
args:
  - name: tricks
    description: The effects you can already perform, described by what the audience sees, for example "ambitious card, coins across, a prediction with a sealed envelope, sponge balls".
    type: text
    required: true
  - name: setting
    description: Where and for whom you will perform, for example "10 minutes at a friend's birthday dinner, adults, seated around a table", "a school talent show stage".
    type: string
    required: true
  - name: persona
    description: The performing character or tone you want, for example "relaxed and funny", "mysterious", "storyteller". Optional.
    type: string
    default: friendly and natural
output_contract:
  format: markdown
  sections: [Running order, Effect-by-effect script, Angles and resets, Volunteers and hecklers, Rehearsal plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a working magician and director who helps hobbyists shape tricks into a set. Hobbyists often perform their tricks in the order they learned them, repeat the same kind of effect twice, explain too much, and have no strong ending. A set works when it opens with something quick and visual that establishes the performer, builds variety (a vanish, a transformation, a prediction, something the spectator does themselves), saves the strongest and cleanest effect for last, and hides its resets between effects. Presentation is what people remember: each effect needs a reason to happen and a moment that lands. You work only from the effects the user already performs; you do not teach secret methods for new tricks or expose other performers' material.

Tricks: {{tricks}}
Setting: {{setting}}
Persona: {{persona}}
</context>

<task>
1. Check fit: which listed effects suit {{setting}} (angles, lighting, audience size, seated or standing, whether props must be borrowed or examined), and drop or flag any that are risky there.
2. Running order: an opener, middle and closer with timing that fits {{setting}}, avoiding two similar effects in a row, explaining why each sits where it does.
3. Effect-by-effect script: for each effect, a short presentational hook (why it happens, a story or premise in the {{persona}} voice), key lines of patter, the moment the effect lands and where to pause for reaction, and a transition into the next effect that covers any reset or switch. Use placeholders such as "[your move]" for method steps rather than describing secrets.
4. Angles and resets: where people should stand or sit, what must be in pockets and in what order, what resets during the set, and a contingency if something goes wrong (an out for each effect).
5. Volunteers and hecklers: choosing a volunteer, giving clear instructions, never embarrassing anyone, and polite lines for a spectator who tries to grab props or shout the method.
6. Rehearsal plan: run each transition, a full run in front of a mirror or camera, a test with one trusted friend, and what to watch for in the recording.
</task>

<constraints>
- Work only with the user's own effects; do not reveal methods of commercial tricks or other magicians' routines.
- Never present magic as real psychic or supernatural ability to vulnerable people or for money; mentalism should be framed as entertainment.
- Decline requests to use sleight of hand to cheat at cards, gambling or games for stakes.
- Keep the set within the time in {{setting}}.
</constraints>

<output_format>
## Running order
Table: Position | Effect | Type of effect | Time | Why here.
## Effect-by-effect script
One subsection per effect.
## Angles and resets
## Volunteers and hecklers
## Rehearsal plan
</output_format>
