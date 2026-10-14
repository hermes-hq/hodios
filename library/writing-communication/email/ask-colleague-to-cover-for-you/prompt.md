---
schema: 1
id: ask-colleague-to-cover-for-you
kind: prompt
title: Ask a colleague to cover for you
description: Asks a peer to cover a meeting, task, shift or on-call slot while you are away or stretched, with exactly what is involved, what they can decide, an easy no and a fair offer back.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, teacher, support-agent]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [cover, favour, shift-swap, peer-request, time-off]
pairs_with:
  prompts: [request-time-off-by-email, write-handover-document, write-out-of-office-message]
args:
  - name: what_to_cover
    description: The meeting, task, shift or duty, with dates and times, how long it takes, and what the person would actually have to do.
    type: text
    required: true
  - name: colleague
    description: Who you are asking and your relationship, for example "a teammate I've covered for before" or "someone in another team I don't know well".
    type: string
  - name: reason
    description: Why you need cover. It will be stated briefly; private detail stays out.
    type: string
  - name: offer_back
    description: What you can offer in return, for example "take their Friday on-call next month" or "cover their stand-ups when they're off".
    type: string
output_contract:
  format: markdown
  sections: [Message, Handover notes, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People say yes to covering when they can see the whole job at a glance: when, how long, what they actually have to do, and what they can decide without checking back. They say no, or say yes and resent it, when the ask is vague ("could you keep an eye on things?"), when the work turns out to be bigger than described, or when they feel they cannot refuse. A good cover request is specific, honest about the size, makes saying no genuinely easy, offers something back, and comes with a short handover so the covering person is not left guessing. In many workplaces the manager must also agree to cover arrangements for shifts, on-call or anything with pay or safety implications; the request should say whether that is sorted.
</context>

<task>
Write a message asking a colleague to cover.{{#colleague}} Colleague: {{colleague}}.{{/colleague}}{{#reason}} Reason: {{reason}}.{{/reason}}{{#offer_back}} Offer back: {{offer_back}}.{{/offer_back}}

<what_to_cover>
{{what_to_cover}}
</what_to_cover>

1. If you cannot tell what needs covering or when, ask and stop.
2. Size it: total time involved and what the person must actually do, from the input. If the input is vague ("keep an eye on things"), turn it into specific duties and flag any you had to assume.
3. Write the message:
   - First line: the ask with dates and size ("Could you cover the 10am client stand-up on Tue 18 and Thu 20 Nov? About 20 minutes each.").
   - The reason in a few words, or none.
   - What it involves, in two or three bullets, including what they can decide and what can wait for the user's return.
   - The offer back, if given.
   - An easy no: "Completely fine if not, I'll ask someone else."
   - If a manager must approve (shifts, on-call, pay or safety duties), say whether that is done or will be.
4. Write short Handover notes the user can send once they say yes: links, contacts, what is in progress, what to do if something goes wrong.
5. Under Notes, list anything to confirm before asking and when to thank them afterwards.
</task>

<constraints>
- Message under about 110 words.
- Honest sizing; never shrink the work to make the ask easier.
- No guilt or pressure ("you're the only one who can"), no private detail beyond a short reason.
- Never invent names, systems or access details; use `[need: …]`.
</constraints>

<output_format>
## Message
The request, suitable for email or chat.
## Handover notes
Bullets to send after they agree.
## Notes
Bullets: approvals, things to confirm, thank-you timing.
</output_format>
