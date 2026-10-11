---
schema: 1
id: confirm-agreement-in-writing
kind: prompt
title: Confirm an agreement in writing
description: Turns a phone call or verbal agreement into a dated confirmation email that records what was agreed, by whom and by when, and invites corrections, so there is a clear paper trail.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, consultant, project-manager, founder]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [paper-trail, verbal-agreement, confirmation, record-keeping, follow-up]
pairs_with:
  prompts: [write-meeting-recap-email, write-negotiation-email, write-escalation-email]
args:
  - name: conversation
    description: What was said and agreed, from your notes or memory - who, when, and each term (price, dates, scope, conditions, who does what).
    type: text
    required: true
  - name: other_party
    description: Who you agreed it with, for example "the landlord", "a contractor", "the client's project lead", "my manager", "an airline agent".
    type: string
    required: true
  - name: uncertain_points
    description: Anything you are not sure was agreed, or that was left open.
    type: text
output_contract:
  format: markdown
  sections: [Email, Not confirmed, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Verbal agreements fade and drift: two people leave the same call with different numbers in their heads, and months later neither can prove what was said. A short confirmation email sent the same day fixes that. It works as a record when it is dated, names the conversation (date, time, channel, who was on it), lists each agreed point as a specific, numbered fact, separates what was agreed from what is still open, and asks the other party to reply if anything is wrong by a set date. Silence after such an email is not a signature, but it is strong practical evidence of what was understood, and it often prompts the corrections that prevent a dispute. The email must stay neutral and factual: if it reads as one-sided or adds terms that were never discussed, it invites argument instead of agreement. For anything with legal weight (a lease change, a contract variation, a settlement), the real document still matters, and the email is not a substitute for the signed version the contract requires.
</context>

<task>
Write a confirmation email to {{other_party}}.

<conversation>
{{conversation}}
</conversation>
{{#uncertain_points}}
<uncertain_points>
{{uncertain_points}}
</uncertain_points>
{{/uncertain_points}}

1. If you cannot tell when the conversation took place or what was agreed, ask and stop.
2. Separate the content into: agreed points, actions with owners and dates, and points still open or uncertain.
3. Write the email:
   - Subject: "Confirming our conversation on [date]: [topic]".
   - First line: thanks for the call or meeting on [date, time, channel], and that this note confirms what was agreed.
   - Agreed points as a numbered list. Each one specific: amounts with currency, dates, quantities, conditions, who does what.
   - Open points in a separate short list, phrased neutrally ("We still need to agree on …").
   - Next steps with owners and dates.
   - Closing line: "If I've misunderstood anything, please let me know by [date]; otherwise I'll proceed on this basis."
4. Under Not confirmed, list anything from the notes that was too vague to write as an agreed point, and anything in uncertain_points; keep these out of the agreed list.
5. Under Notes, advise keeping the sent email and any reply, and flag if the matter seems to need a formal written variation or signature (lease, employment terms, contracts, settlements) and possibly professional advice. Do not state what the law requires.
</task>

<constraints>
- Under about 200 words in the body.
- Record only what the user says was agreed. Never upgrade a "maybe" into an agreed point, never add terms, never word points to favour the user in a way the other party would dispute.
- Neutral, friendly tone; no "as you promised" or "for the avoidance of doubt" lawyering unless the user asks for a formal style.
- Never invent dates, amounts or names; mark gaps `[need: …]`.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Not confirmed
Bullets of points left out of the agreed list and why. "None" if nothing.
## Notes
Record-keeping advice and any formal-document flag.
</output_format>
