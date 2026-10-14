---
schema: 1
id: reply-after-long-delay
kind: prompt
title: Reply to an email you left too long
description: Replies to an email you left unanswered for weeks, with a short proportionate apology, the actual answer, a check on whether it still matters and a fix for anything your delay caused.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, consultant]
requires: [none]
inputs: [message, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [late-reply, sorry-for-the-delay, overdue-response, inbox-backlog, repair]
pairs_with:
  prompts: [reply-to-email, declutter-overflowing-inbox, write-client-apology]
args:
  - name: original
    description: The email you did not answer, pasted in, with roughly how long ago it arrived and who the sender is to you.
    type: text
    required: true
  - name: answer
    description: What you want to say now - your answer to their question or request, or that you need more time, and whether anything changed because of the delay (a missed deadline, an opportunity gone).
    type: text
    required: true
  - name: reason
    description: The real reason for the delay, if you want to mention one (illness, leave, it got buried). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Reply, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who leave an email for weeks often leave it longer because the reply now feels like it needs a big apology. Experienced communicators keep it proportionate: one short sentence of apology, no long excuses, then straight to the answer, because the sender cares more about the answer than the reason. Two things separate a good late reply from a bad one: checking whether the request is still live ("if this is still useful..."), and owning any consequence of the delay (a missed deadline, a decision they had to make without you) with a concrete fix. An honest, brief reason helps only if it is real and relevant; invented excuses ("it went to spam") are easily recognised.
</context>

<task>
Write a late reply to this email.{{#reason}} Real reason for the delay: {{reason}}.{{/reason}}

<original>
{{original}}
</original>

<answer>
{{answer}}
</answer>

1. Work out from the original how long the delay was, who the sender is to the user, and whether the request had a deadline that has passed.
2. Opening: one sentence of apology, proportionate to the delay and relationship (a few days: "Sorry for the slow reply"; weeks with a client or boss: "I'm sorry I didn't reply to this sooner"). Add the reason in five to ten words only if one was given and it is appropriate to share.
3. The answer to every question or request in the original, using only the user's answer; if the user needs more time on part of it, give a specific date.
4. If the request may no longer be relevant, check: "If you've already sorted this, no need to reply."
5. If the delay caused a problem (missed deadline, lost slot), acknowledge it in one sentence and offer a concrete fix from the input or a [placeholder].
6. Close with the next step.
7. Under Notes, say if a phone call or a message in another channel would be better first (for example a client relationship at risk).
</task>

<constraints>
- Reply under about 120 words.
- One apology only; no grovelling, no self-criticism, no "I know you must be frustrated".
- Never invent reasons for the delay, answers or fixes. If the user asks for a false excuse (spam folder, technical issue that did not happen), write an honest version and explain under Notes.
- Match the formality of the original email.
</constraints>

<output_format>
## Reply
Subject line if changing it, then the body.
## Notes
Channel advice and anything changed. "None" if nothing.
</output_format>
