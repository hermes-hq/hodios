---
schema: 1
id: reply-to-email
kind: prompt
title: Reply to an email
description: Drafts a reply that answers every question and request in a received email from your stated position, matches its formality, proposes next steps and flags points you have not decided.
category: email
version: 1.1.0
status: experimental
stage: [build]
role: [individual, manager, support-agent, consultant]
requires: [none]
inputs: [message, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [email-reply, follow-up, next-steps]
pairs_with:
  prompts: [write-professional-email, rewrite-for-tone, triage-inbox, decline-request-gracefully]
args:
  - name: email
    description: The email you received, pasted in full (include earlier messages in the thread if they matter).
    type: text
    required: true
  - name: my_position
    description: What you want to say or decide, in rough notes, for example "yes to the call but not Tuesday; no discount; I'll send the contract Friday".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Points to answer, Reply, Still to decide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.1.0, note: "Position points the sender did not raise are held back for the user to decide instead of being volunteered."}
  - {version: 1.0.0, note: "First version."}
---
<context>
The most common failure in a reply is answering the first question and missing the rest, which costs another round trip. The second is committing to more than the sender intended: a polite reply that accidentally agrees to a date, a price or a deliverable. A good reply answers each point in the order that is easiest to read, says clearly what happens next and who does it, and mirrors the sender's formality without copying their mood if they are upset.
</context>

<task>
Draft a reply to this email:
<email>
{{email}}
</email>

My position:
<position>
{{my_position}}
</position>

1. List every question, request, proposal and implied expectation in the email, numbered, including ones in postscripts and attachments mentioned.
2. Map my position to each item. Where my position does not cover an item, do not guess an answer: put a `[your answer on …]` placeholder in the reply and list it under Still to decide.
3. Match formality: mirror the sender's greeting, sign-off style, use of first names and length, adjusting up if they are senior or external. If the email is angry or upset, acknowledge the concern once, without matching the emotion, and move to substance.
4. Order the reply for the reader: lead with the answer they most need (usually the main yes or no, or a decision); answer the remaining points briefly, numbered if there are more than three.
5. Close with a concrete next step: who does what by when. Propose times or options when something needs scheduling.
6. Keep the original subject line with "Re:" unless the topic has changed; if so, suggest a new subject.
</task>

<constraints>
- Do not commit me to anything beyond my position: no dates, prices, deliverables, apologies or admissions of fault I did not state.
- Do not invent facts about earlier conversations, attachments or third parties.
- Keep it as short as the points allow; no filler openings or closings.
- If my position conflicts with something the sender said is fixed (for example a deadline), keep my position and flag the conflict under Still to decide.
- If my position contains a point the sender did not raise (for example "no refund" when they have not asked for one), do not volunteer it in the reply unless it is needed to answer them; list it under Still to decide as "held back" so I can choose.
</constraints>

<output_format>
## Points to answer
Numbered list of each point in their email, each marked "answered", "placeholder" or "declined".
## Reply
Subject: Re: …
The reply, ready to send apart from placeholders.
## Still to decide
Bullets: each placeholder or conflict and the decision you need to make. "None" if complete.
</output_format>
