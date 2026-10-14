---
schema: 1
id: raise-awkward-personal-issue
kind: prompt
title: Raise an awkward personal issue
description: Plans how to tell someone about an embarrassing issue, such as body odour, bad breath, loud calls or an annoying habit, privately, kindly and in words that do not humiliate them.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager]
requires: [none]
inputs: [text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [awkward-situations, hygiene, sensitive-topics, kindness, privacy]
pairs_with:
  prompts: [prepare-difficult-conversation, set-boundary]
  personas: [communication-coach]
args:
  - name: issue
    description: The issue, how often you have noticed it, who else is affected and anything already hinted or said.
    type: text
    required: true
  - name: relationship
    description: "Who they are to you, for example \"a colleague I sit next to\", \"someone I manage\", \"my flatmate\", \"a close friend\"."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Should you be the one, What to say, If they are embarrassed or upset, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people would rather be told privately about body odour, bad breath, food in their teeth or a loud habit than discover months later that everyone noticed. What makes it bearable is privacy, brevity and a matter-of-fact tone: one person, alone with them, saying it once in plain words, then moving on. What makes it humiliating is an audience, a long build-up, hints they cannot decode (an anonymous deodorant on the desk), "people have been talking", or jokes. The issue may have causes the speaker does not know about: illness, medication, a disability, money troubles, a broken washing machine, depression, cultural norms about scent or volume. So the message names the effect, not the person's character, and leaves room for an explanation without demanding one. In a workplace, the line manager is usually the right person; a peer can do it if they are close.
</context>

<task>
Help me raise this with {{relationship}}.

<issue>
{{issue}}
</issue>

1. If it is unclear what the issue is or how it affects me or others, ask one or two short questions and stop.
2. Say whether I am the right person to raise it. If a manager, HR or a closer friend is better placed, say who and why, and give me a line to pass it on discreetly.
3. Plan the moment: private, not before a big meeting or in front of anyone, not by group chat. Say whether in person or a private message suits this relationship and issue.
4. Write the words: a short kind opener that signals I am on their side, the issue in one or two plain sentences without euphemisms they could misread, an optional practical suggestion, and a close that moves on. Keep it under about 60 spoken words.
5. Write replies for the likely reactions: embarrassment, defensiveness, an explanation (health, money, culture), tears or "who else noticed?". Never confirm gossip or name others.
6. Say what to do afterwards: act normally, do not mention it again unless it continues, and what to do if it does not change, including the case where a health or wellbeing issue may lie behind it.
</task>

<constraints>
- Name the effect, not the person ("there's a noticeable smell", not "you smell bad"; "your calls carry across the office", not "you're so loud").
- No hinting, anonymous notes, joking, or saying "everyone has noticed".
- Do not speculate about medical or mental-health causes; leave room for them and point to support without diagnosing.
- For a manager raising it, keep it about work impact and offer reasonable help (quiet room, headset, flexibility) where it fits.
- If the issue is about religion, dress, accent, weight or a disability rather than an avoidable behaviour, say plainly that it is not something to raise, and why.
</constraints>

<output_format>
## Should you be the one
Who should raise it, when and where.
## What to say
The words, ready to say or send.
## If they are embarrassed or upset
Table: If they say… | You can say…
## Afterwards
How to act next, and what to do if nothing changes.
</output_format>
