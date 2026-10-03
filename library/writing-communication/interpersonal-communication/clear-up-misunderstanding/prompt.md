---
schema: 1
id: clear-up-misunderstanding
kind: prompt
title: Clear up a misunderstanding
description: Writes a message that clears up a misunderstanding, covering what you meant, what they likely heard, the part you own and a way forward, without over-apologising.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, parent]
requires: [none]
inputs: [text, message]
output: [message, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [miscommunication, repair, clarification, workplace-relationships]
pairs_with:
  prompts: [apologize-effectively, decode-message-tone, reply-to-tricky-message]
  personas: [communication-coach]
args:
  - name: what_happened
    description: What you said or wrote (quote it if you can), how they reacted, and what you think they took it to mean.
    type: text
    required: true
  - name: what_you_meant
    description: What you actually meant or intended.
    type: text
    required: true
  - name: relationship
    description: "Optional, who they are to you, for example \"a colleague I'm still getting to know\", \"my partner\", \"a client\"."
    type: string
  - name: channel
    description: How you will clear it up.
    type: enum
    enum: [message, email, in-person]
    default: message
output_contract:
  format: markdown
  sections: [Read of the situation, Message, Shorter version, Avoid, If they are still upset]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clearing up a misunderstanding goes wrong in two opposite ways. One is defensive: "you misunderstood", "that's not what I said", "I'm sorry you took it that way", which tells the other person their reaction is the problem. The other is grovelling: apologising so much for an honest misunderstanding that it sounds like guilt, and makes them comfort you. What works is short: acknowledge what they heard and why that was a reasonable reading, say once what you meant, own the specific part that was yours (ambiguous wording, the wrong channel, poor timing), and move forward with a question or next step. It also matters to check that it really was a misunderstanding; if the words meant what they heard, it needs an apology, not a clarification.
</context>

<task>
Help me clear up this misunderstanding by {{channel}}{{#relationship}} with {{relationship}}{{/relationship}}.

<what_happened>
{{what_happened}}
</what_happened>
<what_you_meant>
{{what_you_meant}}
</what_you_meant>

1. Read the situation honestly: what they most likely heard, why that reading was reasonable, and what my part was. If what I meant was in fact close to what they heard, or my words caused real hurt whatever I intended, say so plainly and recommend an apology instead of a clarification; give a short apology rather than this message.
2. Draft the message or, for in person, a few short opening lines:
   - acknowledge what they understood and that it makes sense they reacted that way;
   - say once, plainly, what I meant;
   - own my specific part in one sentence ("My wording was unclear", "I should have said this privately"), without a string of apologies;
   - a way forward: a question to check how it lands, a correction to the record if others saw it, or the next practical step.
3. If the original was public (a group chat, a meeting, an email to several people) and it affected how others see them, suggest a short public correction as well and draft it.
4. Give a shorter version.
5. List phrases to avoid in this situation and why.
6. Give two or three lines for if they are still upset: listen first, do not re-explain, and offer to talk in person or later.
</task>

<constraints>
- One clear apology at most, for my part, if any. No "sorry if", "sorry you felt", or self-criticism beyond what fits.
- Do not tell them what they felt or why; say what I understand they heard.
- Keep it proportionate: a minor misunderstanding gets two or three sentences.
- Match my voice and the relationship; no corporate language with a partner, no slang with a client.
- Do not invent details of what was said.
</constraints>

<output_format>
## Read of the situation
Two to four lines: what they likely heard, why it was reasonable, my part, and whether this is a misunderstanding or needs an apology.
## Message
In a quote block, or opening lines for in person.
## Shorter version
In a quote block.
## Avoid
Two to four bullets: phrase, then why.
## If they are still upset
Two or three lines.
</output_format>
