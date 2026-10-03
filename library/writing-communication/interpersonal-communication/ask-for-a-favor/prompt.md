---
schema: 1
id: ask-for-a-favor
kind: prompt
title: Ask for a favour
description: Writes a request for a favour, such as an introduction, a review, borrowing something or help moving, that is specific, easy to decline and offers something back.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, founder, student]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [asking-for-help, introductions, requests, reciprocity, warm-intro]
pairs_with:
  prompts: [write-introduction-email, reconnect-with-old-contact, write-thank-you-note]
  personas: [communication-coach]
args:
  - name: favor
    description: "What you need, as specifically as you can: what, how much time or effort, when, and why it matters to you, for example \"an intro to the head of design at Lumen, I'm applying for a senior role there\"."
    type: text
    required: true
  - name: person
    description: "Who you are asking and why them, for example \"Ana, my former manager, now works at Lumen\"."
    type: string
    required: true
  - name: relationship_strength
    description: How close you are.
    type: enum
    enum: [close, friendly, distant]
    default: friendly
  - name: deadline
    description: "Optional, when you need it by, for example \"before 15 May\" or \"no rush\"."
    type: string
output_contract:
  format: markdown
  sections: [Fit check, The ask, Make it easy, Offer back, If they say no or do not reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People say yes to favours that are clear, sized honestly, easy to do and easy to refuse. Vague asks ("could you help me with my job search?") put the work on the helper, so they stall. Hidden size ("quick look" at a 40-page document) breeds resentment. Asks with no way out make a "no" feel like a rejection of the relationship. The best requests say exactly what is wanted and by when, explain why this person, do the preparation for them (a forwardable blurb for an introduction, the specific pages to review), give an explicit out, and offer something back that fits the relationship. With distant contacts, the ask should be smaller and the context fuller.
</context>

<task>
Write a request to {{person}} for this favour. We are {{relationship_strength}}.{{#deadline}} Deadline: {{deadline}}.{{/deadline}}

<favor>
{{favor}}
</favor>

1. Fit check: compare the size of the favour, the deadline and the relationship. If the ask is large for the relationship or the deadline is too tight, say so and propose a smaller first ask (for example 20 minutes of advice instead of a full review, or a name instead of an introduction) and write the message for that smaller ask, with the original as an option.
2. Choose the channel (text, email, LinkedIn message, in person) that suits the relationship and the favour, and say why in one line.
3. Write the ask:
   - context first if we are not close: who I am to them and how we know each other;
   - why I am asking them specifically;
   - exactly what I am asking for, its honest size (time, effort) and the deadline;
   - an explicit, warm out ("Completely fine if the timing doesn't work");
   - an offer back that fits, or a sincere thank-you if we are close and an offer would feel transactional.
4. Make it easy: draft what they would need, for example a short forwardable blurb for an introduction (with a double opt-in suggestion so the third person can agree first), the exact questions for an advice call, or the specific sections for a review.
5. If they say no or do not reply: one gracious reply to a no, and a single follow-up after a sensible interval. Then let it go.
</task>

<constraints>
- No guilt, flattery or pressure. No exaggerating the urgency.
- Keep it short: a text is two to four sentences, an email under 150 words, plus any blurb.
- Do not invent facts about me, them or the third party; use `[placeholders]`.
- Match how I would normally write to this person.
</constraints>

<output_format>
## Fit check
One to three lines, and the channel.
## The ask
The message in a quote block (and the original larger ask as an option, if you proposed a smaller one).
## Make it easy
The blurb, questions or materials, in a quote block, or "Nothing needed."
## Offer back
One or two ideas that fit, or why a thank-you is enough.
## If they say no or do not reply
A reply to a no, and a follow-up message with when to send it.
</output_format>
