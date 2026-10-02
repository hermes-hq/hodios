---
schema: 1
id: respond-to-angry-email
kind: prompt
title: Respond to an angry email
description: Drafts a reply to an angry email that de-escalates, acknowledges what is valid, corrects facts without defensiveness and sets a clear next step, with a note on whether to call instead.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [manager, support-agent, consultant, individual]
requires: [none]
inputs: [message, text]
output: [message, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [de-escalation, complaint-reply, conflict-resolution, angry-customer]
pairs_with:
  prompts: [reply-to-email, apologize-effectively, respond-to-criticism, rewrite-for-tone]
  personas: [communication-coach]
args:
  - name: email
    description: The angry email you received, in full.
    type: text
    required: true
  - name: facts
    description: What actually happened from your side, including anything they have wrong and anything they have right, and what you can and cannot offer.
    type: text
  - name: desired_outcome
    description: "What you want after this exchange, for example \"keep the client and agree a revised delivery date\" or \"end the argument without conceding the refund\"."
    type: text
output_contract:
  format: markdown
  sections: [Read of the email, Reply, Why it is written this way, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An angry email usually contains three things mixed together: a legitimate grievance, some facts that are wrong or exaggerated, and emotion. Replies go wrong when they answer the emotion with emotion, defend line by line, open with corporate apology language ("We apologise for any inconvenience"), or concede things that are not true to make the anger stop. Replies that de-escalate acknowledge the person's experience specifically, own what is genuinely the sender's to own, correct facts once, calmly and with evidence, and move quickly to what happens next, often offering a call. Shorter is usually better.
</context>

<task>
Draft a reply to this email.

<email>
{{email}}
</email>
{{#facts}}
<facts>
{{facts}}
</facts>
{{/facts}}
{{#desired_outcome}}What I want from this: {{desired_outcome}}{{/desired_outcome}}

1. Read the email and separate: (a) the core grievance, (b) what they want, (c) claims that are valid according to the facts, (d) claims that are wrong or unclear, (e) tone issues such as insults or threats. If no facts were supplied, do not assume either side is right: write the reply so it acknowledges without conceding disputed points, and list what to check.
2. Decide the reply's single purpose, using the desired outcome if given.
3. Write the reply:
   - Open by acknowledging their experience in specific terms (what happened to them and its effect), without "I understand your frustration" boilerplate and without blaming them.
   - Own clearly anything that is genuinely the sender's fault, once, with a plain apology for that specific thing.
   - Correct wrong facts briefly and neutrally, with the evidence or reference, without "as I already said" or sarcasm.
   - State what you will do, what you cannot do and why in one line, and the next step with a date or a call offer.
   - Close courteously, without a lecture about their tone. If the email contained abuse or threats, set one calm, firm boundary.
4. Keep it under about 200 words unless the facts require more.
5. Advise whether this should be a call or meeting instead of email, and whether anyone else should be copied or consulted first.
</task>

<constraints>
- Never admit fault, liability or facts the sender did not confirm. Apologise for experience and for actual mistakes, not for things that did not happen.
- No defensiveness, sarcasm, passive aggression, or point-by-point rebuttal. No promises the facts do not show the sender can keep.
- If the email involves a legal threat, a safety issue, discrimination or harassment, say once that the sender should involve their manager, HR or legal before replying, and keep the draft neutral.
- If the email threatens violence or harm, tell the sender to keep it, not to reply alone, and to report it to their manager, security or the police as appropriate.
- Match the sender's role: a support agent follows company policy; an individual replying to a family member can be warmer.
</constraints>

<output_format>
## Read of the email
Bullets: grievance, what they want, valid points, points to correct or check, tone issues.
## Reply
Subject line and the full reply.
## Why it is written this way
Three to five bullets explaining the key choices.
## Before you send
Facts to verify, who to consult, whether to call first, and a reminder to wait a few minutes and reread before sending.
</output_format>
