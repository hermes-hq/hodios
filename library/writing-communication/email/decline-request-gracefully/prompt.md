---
schema: 1
id: decline-request-gracefully
kind: prompt
title: Decline a request gracefully
description: Declines a request or invitation clearly and kindly in the first lines, gives an honest brief reason if wanted, offers only real alternatives and preserves the relationship.
category: email
version: 1.0.0
status: experimental
stage: [build]
role: [individual, manager, consultant, writer]
requires: [none]
inputs: [message, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [saying-no, boundaries, invitations]
pairs_with:
  prompts: [reply-to-email, write-professional-email, rewrite-for-tone]
args:
  - name: request
    description: The request or invitation you received (paste it or describe it), and who it is from.
    type: text
    required: true
  - name: reason
    description: Optional true reason you can share. Leave empty to decline without one.
    type: text
  - name: alternative
    description: Optional real alternative you are willing to offer, such as a later date, a smaller commitment or another person to ask.
    type: text
output_contract:
  format: markdown
  sections: [Message, Short version, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good "no" is clear early, brief and warm. People damage relationships less by declining than by declining badly: a vague reply that sounds like "maybe" and has to be chased, a long justification that invites negotiation, excessive apology that makes the other person comfort the decliner, or a counter-offer the decliner does not actually want to honour. A reason is optional; a clear answer is not.
</context>

<task>
Write a message declining this request:
<request>
{{request}}
</request>
{{#reason}}Reason I can share: {{reason}}{{/reason}}
{{#alternative}}Alternative I'm willing to offer: {{alternative}}{{/alternative}}

1. If it is unclear what is being requested, ask and stop.
2. Infer the channel (email, chat, letter) and the relationship (boss, client, friend, stranger, organiser) from the request, and match its formality.
3. Open with brief, specific thanks or acknowledgement that shows you read the request, then decline clearly within the first two sentences. Use unambiguous words ("I won't be able to", "I'm going to say no to this"), not "I'm not sure I can" or "probably not".
4. Give the reason only if one was provided, in one sentence, without over-explaining. If none was provided, decline without a reason or with a neutral line such as "I can't take this on right now"; never invent one.
5. Offer the alternative only if one was provided, stated specifically. If none was provided, do not offer to help in some other way, and do not suggest asking again later unless the user said so.
6. End warmly and in a way that fits the relationship (wishing the event well, expressing interest in future work only if the user's input supports it).
</task>

<constraints>
- At most one apology, and only if the relationship calls for it.
- No invented reasons, commitments, referrals or future availability.
- Keep the main message under 120 words. The short version is under 40 words, suitable for chat.
- If the request is from a manager or client where saying no has consequences, keep the message respectful and note in Notes any part the user may want to discuss live instead of in writing.
</constraints>

<output_format>
## Message
Subject line if email, then the message.
## Short version
A shorter version for chat or text.
## Notes
One to three bullets: what to adjust (warmth, reason, door left open) and any risk in how it may land. "None" if none.
</output_format>

<examples>
Request: speak at a meetup on 12 March. Reason: none given. Alternative: none.
"Hi Jordan, thanks for thinking of me for the March meetup, and for the kind words about my last talk. I won't be able to speak this time. I hope the evening goes really well."
</examples>
