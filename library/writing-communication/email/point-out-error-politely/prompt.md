---
schema: 1
id: point-out-error-politely
kind: prompt
title: Point out an error politely
description: Tells a colleague, supplier or client that their document, invoice, data or message contains a mistake, with the evidence, the impact and a face-saving way to fix it.
category: email
version: 1.0.0
status: incubating
stage: [review]
role: [individual, consultant, operations-manager, data-analyst]
requires: [none]
inputs: [text, document]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [mistakes, corrections, invoice-error, tact, diplomacy]
pairs_with:
  prompts: [correct-email-mistake, give-feedback-sbi, write-escalation-email]
args:
  - name: error
    description: What is wrong, where (page, line, cell, invoice number), what you believe is correct, and how you know.
    type: text
    required: true
  - name: recipient
    description: Who made it and your relationship, for example "senior colleague", "supplier's billing team", "client's finance lead", "my manager".
    type: string
    required: true
  - name: stakes
    description: Why it matters - money, a deadline, a public document, a decision being made on wrong numbers - and how soon it must be fixed.
    type: string
  - name: visibility
    description: Private means only the author sees your message; group means it is a thread or document others are on.
    type: enum
    enum: [private, group]
    default: private
output_contract:
  format: markdown
  sections: [Check first, Message, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pointing out someone else's mistake goes wrong in two ways: so softly that the error is missed ("just wondering if maybe…"), or so bluntly, and so publicly, that the other person gets defensive and the fix slows down. What works is to be specific and neutral about the thing, not the person: quote the exact item, show the evidence or the source, say what you think the correct value is while leaving room that you might be missing something, state why it matters and by when, and make the fix easy. Raising it privately first is usually kinder and faster; correcting in front of a group is only needed when others are about to act on the wrong information, and even then a short neutral correction plus a private note to the author works best. With suppliers and billing errors, a reference number, the agreed figure and a request for a corrected document are what get it fixed.
</context>

<task>
Write a message pointing out an error to {{recipient}} ({{visibility}}).

<error>
{{error}}
</error>
{{#stakes}}Stakes: {{stakes}}{{/stakes}}

1. Check first: is the evidence solid? If the input suggests the user might be wrong (a different version, a currency, a date format, a rounding rule, a policy change), list what to double-check before sending. If you cannot tell what the error is, ask and stop.
2. Write the message:
   - Subject or first line names the document and the item ("Invoice 1047: line 3 quantity").
   - The specific item, what it says, and what the user believes it should say, with the source ("the PO says 40, the invoice says 400").
   - A light opening for doubt only where genuine ("unless I've missed an update").
   - Why it matters and the timing, if the stakes call for it.
   - The easy fix: "Could you send a corrected invoice?" or "Shall I update the cell, or would you prefer to?"
   - No more than one softening phrase.
3. If visibility is group and others may act on the error, write two pieces: a short neutral correction for the group ("Small correction: the total should be 12,400, not 14,200; source in the sheet") and a private note to the author. If no one is about to act on it, recommend going private only.
4. Under Notes, mention whether to copy anyone (finance, a manager) and what to do if there is no response.
</task>

<constraints>
- Under about 110 words for the main message.
- Describe the error, never the person ("the figure is", not "you got it wrong"). No sarcasm, no "as I said before".
- Never invent the correct value or the source; use `[need: …]` if the user has not given it.
- Do not speculate on why the error happened.
</constraints>

<output_format>
## Check first
Bullets of things to verify, or "Evidence looks solid".
## Message
Subject or first line, then the message; plus the group correction if needed.
## Notes
Bullets: who to copy, follow-up timing.
</output_format>
