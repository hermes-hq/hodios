---
schema: 1
id: tell-friend-they-hurt-you
kind: prompt
title: Tell a friend they hurt you
description: Helps tell a friend or relative that something they said or did hurt you, whether to raise it, words for a message or talk that names it without attacking, and how to handle their reply.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
requires: [none]
inputs: [text, message]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [hurt-feelings, close-friends, speaking-up, repair, honest-conversation, family]
pairs_with:
  prompts: [set-boundary, respond-to-an-apology, rephrase-with-nonviolent-communication, decide-whether-to-raise-an-issue]
  personas: [communication-coach]
args:
  - name: what_happened
    description: What they said or did, when, where and in front of whom, in their words if you remember them or paste the messages, and why it hurt.
    type: text
    required: true
  - name: relationship
    description: Who they are to you and how the friendship usually is, for example "best friend for 12 years, we rarely argue" or "my sister, she can get defensive".
    type: string
    required: true
  - name: details
    description: Optional - whether it is a one-off or a pattern, what you would like to happen (an apology, them to understand, a change), and whether you prefer to message or talk.
    type: text
output_contract:
  format: markdown
  sections: [Should you raise it, What you want, Message, If you talk instead, How they might respond, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people tell someone close to them that they were hurt, without starting a fight or swallowing it until it turns into distance. Unspoken hurt usually leaks out as coldness, sarcasm or avoidance, which the other person notices without understanding. What works: raising it soon but not in the heat of the moment, privately, about one specific thing; describing what happened and how it landed ("when you joked about my job in front of everyone, I felt embarrassed") rather than judging their character ("you're so insensitive"); allowing that they may not have meant it, while still saying it hurt; and knowing what you want from the conversation. What fails: a list of old grievances, mind-reading their motives, asking for an apology in a way that is really a demand to admit they are a bad person, and doing it by text when the friendship normally talks in person or by voice. Some things are not worth raising (a one-off, minor, clearly unintended slip); patterns, and anything that keeps coming back to mind, usually are.

What happened: {{what_happened}}
Relationship: {{relationship}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Should you raise it: give an honest view of whether this is worth raising and why, using the size of the hurt, whether it is a pattern, and the user's own signs (still thinking about it, pulling away). If it seems small and one-off, say so and offer a light-touch option, while leaving the choice with the user.
2. What you want: help the user name the outcome they want (to be understood, an apology, a change next time, to clear the air), and say which are within their control.
3. Message: write a message in the user's voice that names the specific moment, how it felt, allows for intent, says what they would like, and invites a conversation. Under about 100 words. If the channel matters, recommend asking to talk instead and give a short message to set that up.
4. If you talk instead: an opening of two or three sentences, and a line to bring it back on track if it drifts into old arguments.
5. How they might respond: a short reply for each likely response: a real apology, defensiveness ("you're too sensitive"), turning it around with their own grievance, or minimising it. Keep the user's replies calm and on the one issue.
6. Notes: what to do if this is part of a pattern or the friend repeats it, and when it may be time to set a firmer boundary or step back.
</task>

<constraints>
- Stay with the user's account, but do not assume the friend's motives; if the messages pasted suggest a misunderstanding, say so gently.
- No guilt-tripping, sarcasm, ultimatums or labels for the friend's character in the scripts.
- One issue per conversation. If the user lists several, help them choose the one that matters most.
- If what happened involves threats, violence, coercion or abuse, do not frame it as a misunderstanding to smooth over; say it is serious, put the user's safety first, and suggest appropriate support.
- Keep wording natural and short enough to say or send.
</constraints>

<output_format>
## Should you raise it
## What you want
## Message
## If you talk instead
## How they might respond
A table: If they say | You could reply.
## Notes
</output_format>
