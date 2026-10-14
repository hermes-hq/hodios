---
schema: 1
id: message-friend-who-went-quiet
kind: prompt
title: Message a friend who has gone quiet
description: Writes a message to a friend who has stopped replying or pulled away, checking in warmly without guilt-tripping, with a follow-up plan and what to do if you are worried.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
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
depth: specific
tags: [checking-in, friendship-maintenance, low-pressure, texting, withdrawal]
pairs_with:
  prompts: [reconnect-with-old-contact, support-struggling-friend, decode-message-tone]
  personas: [communication-coach]
args:
  - name: friend_context
    description: Who the friend is to you, how you usually keep in touch, when they went quiet, and anything you know that might explain it.
    type: text
    required: true
  - name: worry_level
    description: How worried you are about them.
    type: enum
    enum: [just-miss-them, a-bit-worried, very-worried]
    default: just-miss-them
output_contract:
  format: markdown
  sections: [Message, Shorter version, If they do not reply, If they reply, If you are worried about them, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Friends go quiet for many reasons that are not about you: depression, burnout, a new baby or job, illness, money worries, or shame about how long they have taken to reply, which then makes replying even harder. Messages that count unanswered texts, ask "Did I do something wrong?" or demand an explanation add pressure and often deepen the silence. What works is a short, warm message that makes no demands: it says you are thinking of them, mentions something specific you share, explicitly takes away the need to reply ("no need to answer, just wanted you to know"), and, if it fits, offers one easy, concrete thing. Following up gently every few weeks, without escalating, keeps the door open. If there are signs of real trouble, such as talk of hopelessness before they went quiet, a big loss, or other people also unable to reach them, a more direct check, a call, or contacting someone close to them is justified.
</context>

<task>
Write a message to my friend who has gone quiet. My level of worry: {{worry_level}}.

<friend_context>
{{friend_context}}
</friend_context>

1. If anything in the context suggests they may be at risk (talk of not wanting to be here, a recent major loss, self-harm, nobody able to reach them), lead with the section on being worried and follow the safety guidance below.
2. Write the main message in a tone that matches how we usually text, under about 60 words: warm, specific to us, no guilt, no demand for an explanation, an explicit no-pressure line, and at most one easy offer.
3. Write a shorter version under 25 words.
4. Say how long to wait and what to send next if they do not reply, with a sample follow-up, and when to stop and simply leave the door open.
5. Write short responses for likely replies: an apology for being absent, telling me they are struggling, a brief or cold reply, or telling me I upset them.
6. If I am worried, say what signs justify a more direct check, how to do it (a call, a visit, asking a mutual friend or family member), and what to do in an emergency.
</task>

<constraints>
- No counting messages, "Did I do something wrong?", passive-aggressive "Hello?? Are you alive?" or guilt.
- Do not guess why they went quiet beyond what I said.
- Keep it in my voice and the way we usually talk, not a formal note.
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the friend as well as to me.
</constraints>

<output_format>
## Message
The main message.
## Shorter version
The short one.
## If they do not reply
Timing and a sample follow-up.
## If they reply
Table: If they say… | You can say…
## If you are worried about them
Signs, how to check and what to do in an emergency.
## Notes
Anything else.
</output_format>
