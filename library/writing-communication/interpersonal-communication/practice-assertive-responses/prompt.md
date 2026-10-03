---
schema: 1
id: practice-assertive-responses
kind: prompt
title: Practise assertive responses
description: Turns situations where someone usually caves or overreacts into assertive scripts using I-statements, broken record and fogging, then rehearses them one turn at a time.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, manager, parent, student]
requires: [none]
inputs: [text]
output: [script, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [assertiveness, i-statements, broken-record, fogging, saying-no, rehearsal]
pairs_with:
  prompts: [set-boundary, rehearse-difficult-conversation, decline-request-gracefully, respond-to-criticism]
  personas: [communication-coach]
args:
  - name: situations
    description: "One to three situations, each with who is involved, what they typically say, and what you usually do, for example \"my colleague drops extra work on me at 5pm with 'you're so quick at this'\"."
    type: text
    required: true
  - name: usual_reaction
    description: How you usually respond in these moments.
    type: enum
    enum: [cave, overreact, avoid, mixed]
    default: cave
output_contract:
  format: markdown
  sections: [Your situations, Scripts, Let's rehearse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assertiveness is saying what you want, need or will not do, clearly and respectfully, while respecting the other person's right to do the same. It sits between passive (caving, over-explaining, agreeing then resenting) and aggressive (attacking, sarcasm, raising the stakes). It is learnable through scripts and rehearsal, because the hard part is the moment of pressure, not knowing the right words afterwards. Well-tested techniques include: I-statements ("I'm not able to take this on today"), the broken record (calmly repeating the core message without new justifications), fogging (agreeing with whatever is true in a criticism while holding your position), negative inquiry (asking what specifically bothers them), and a workable compromise when one exists. People who cave need permission not to justify; people who overreact need a pause and a lower temperature; people who avoid need a first sentence they can actually say.
</context>

<task>
Help me respond assertively in these situations. My usual reaction: {{usual_reaction}}.

<situations>
{{situations}}
</situations>

Phase 1, scripts (your first reply):
1. If a situation involves threats, violence, coercive control or someone with power over my safety, do not script assertiveness for it. Say that safety comes before assertiveness there, follow the safety guidance below, and continue only with the other situations.
2. If a situation is too vague to script, ask one question about it and script the others.
3. For each situation, show the difference: a passive, an aggressive and an assertive response, one line each, so I can see where mine usually lands.
4. Write the assertive script: the technique used and why it fits, the opening line, the core message I repeat if pushed, and a fogging or compromise line for the likely pushback. Fit it to my usual reaction: for caving, cut justifications and apologies; for overreacting, add a pause line ("Let me think about that and come back to you"); for avoiding, write the easiest possible first sentence.
5. If it is in person, add one or two notes on voice and body language (steady pace, normal volume, eye contact) that suit the setting.
6. End with "Let's rehearse", set the scene for situation 1 in one line, and give the other person's first line in character. Stop and wait.

Phase 2, rehearsal (each later turn):
7. Read my reply. First, in one bracketed line, coach it: what was assertive, and the one change that would make it stronger (for example "[Good, no apology. Drop the second reason; it invites debate.]").
8. Then reply as the other person, realistically: push back the way they would, using their typical phrases, and ease off only when I hold my position calmly.
9. After about four exchanges, or when I say "next" or "stop", give a three-line debrief (what I did well, what to keep practising, my best line) and move to the next situation or finish.
</task>

<constraints>
- The scripts must sound like me in that relationship, not like a training manual. Short sentences.
- Assertive is not winning. Do not script lines that attack, threaten or manipulate.
- Keep the other person realistic: neither a pushover nor a cartoon villain.
- I can say "pause" at any time for advice out of character.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your situations
A table: Situation | Passive | Aggressive | Assertive.
## Scripts
For each situation: a bold title, **Technique:** one line, **Open with:**, **Core message (repeat if pushed):**, **If they push back:**, and voice notes if in person.
## Let's rehearse
One line of scene-setting and the other person's first line, then stop.

During rehearsal: a one-line coaching note in square brackets, then the other person's reply.
</output_format>
