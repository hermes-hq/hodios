---
schema: 1
id: turn-down-romantic-interest
kind: prompt
title: Turn down romantic interest
description: Writes a kind, clear way to turn down someone who asked you out or confessed feelings, fitted to the relationship and channel, with what to do if they keep trying.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rejection, romance, honesty, saying-no, unrequited]
pairs_with:
  prompts: [end-relationship-kindly, set-boundary, decline-request-gracefully]
  personas: [communication-coach]
args:
  - name: situation
    description: Who they are, how they asked or what they said, how you know them, and anything that makes it awkward (shared friends, work, a class).
    type: text
    required: true
  - name: channel
    description: How you will answer.
    type: enum
    enum: [in-person, message, unsure]
    default: unsure
  - name: friendship
    description: Whether you want to stay friends.
    type: enum
    enum: ["yes", "no", unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Your answer, The words, If they ask why or try again, Friendship after this, If it gets uncomfortable, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The kindest rejection is a clear one. Vague replies ("I'm really busy right now", "maybe some time"), long lists of reasons, or slowly fading out leave the other person hoping and asking again, which is harder on both. A good answer is short: thank them or acknowledge it took courage, say plainly that you do not feel the same way, and, only if true, say what you value about them. Reasons are optional and often counterproductive, because a reason ("I'm not looking for anything") invites a rebuttal ("so when you are…?"). Offering friendship is only kind if you mean it and they can manage it; "let's stay friends" said by reflex often prolongs the hurt. Context changes the approach: a colleague, classmate or someone in your friend group needs a reply that lets you both keep functioning; a stranger on a dating app needs only a brief, polite line or none. Someone who keeps pushing after a clear no is no longer misunderstanding; you do not owe more explanations.
</context>

<task>
Help me turn this person down. Channel: {{channel}}. Want to stay friends: {{friendship}}.

<situation>
{{situation}}
</situation>

1. If they have threatened me, will not accept a clear no, or I feel unsafe, skip the gentle script and go to the part on it getting uncomfortable, following the safety guidance below.
2. If I am unsure about the channel, recommend one for this relationship (in person or a call for close friends, a message is fine for a dating-app match or someone I barely know).
3. State my answer in one sentence: clear, no "maybe".
4. Write the words: an acknowledgement, the clear no, and a sincere kind line if there is one. Under about 60 words for a message.
5. Write short replies for "Why?", "Is it something I did?", "Can we just try one date?", and a later second ask, each restating the answer without new reasons.
6. Advise on friendship afterwards based on my answer: how to say it honestly, giving space, and how to handle shared groups, work or class.
7. Say what to do if they keep pursuing me, get angry or make things awkward: stop explaining, limit contact, and, at work or school, the right person to involve.
</task>

<constraints>
- No fake reasons (a made-up partner, "I'm moving") unless I say they are true.
- Do not criticise them or list what is "wrong" with them.
- Keep the tone warm and proportionate to how well we know each other.
- If they are a manager, teacher or anyone with power over me, note that unwanted advances from someone in that position can be raised with HR, the school or the relevant body, and keep the reply professional.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your answer
One sentence.
## The words
The message or what to say.
## If they ask why or try again
Table: If they say… | You can say…
## Friendship after this
Honest guidance for my choice.
## If it gets uncomfortable
Steps to take.
## Notes
Anything else.
</output_format>
