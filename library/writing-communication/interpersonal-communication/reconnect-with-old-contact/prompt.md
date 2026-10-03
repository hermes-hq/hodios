---
schema: 1
id: reconnect-with-old-contact
kind: prompt
title: Reconnect with an old contact
description: Writes a natural message to reconnect with a friend, mentor or former colleague after years of silence, without over-apologising for the gap or making an immediate ask.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, founder, consultant]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [reconnecting, networking, old-friends, mentors, lost-touch]
pairs_with:
  prompts: [write-introduction-email, write-follow-up-email, write-personal-letter]
args:
  - name: relationship_history
    description: Who they are, how you knew each other, roughly when you last spoke and why you drifted (moved, changed jobs, life got busy, a falling-out), plus any memory or shared reference you have.
    type: text
    required: true
  - name: reason_for_reaching_out
    description: "Optional: why now, for example \"saw their book came out\", \"moving back to their city\", \"want career advice later\" or \"just miss them\". Be honest about any ask; it shapes the message."
    type: text
  - name: channel
    description: Where the message will go, which sets its length and formality.
    type: enum
    enum: [text, email, linkedin, letter]
    default: text
output_contract:
  format: markdown
  sections: [Message, Other openers, If they reply, If they don't]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People hesitate to reconnect because they think the silence needs explaining, and that hesitation produces stiff messages: three sentences of apology, a life update nobody asked for, and an ask in the first breath. Research on reaching out to old contacts finds people underestimate how much the other person appreciates hearing from them. The messages that work are short, warm, specific to the shared history, light about the gap, and easy to reply to. If the sender wants something, the honest approach is to reconnect first and ask later, or to be upfront about the ask in a low-pressure way, never to disguise it.
</context>

<task>
Write a message to reconnect with this person via {{channel}}.

<relationship_history>
{{relationship_history}}
</relationship_history>
{{#reason_for_reaching_out}}
<reason_for_reaching_out>
{{reason_for_reaching_out}}
</reason_for_reaching_out>
{{/reason_for_reaching_out}}

1. Work out the hook: a specific shared memory, something of theirs you noticed recently, or the honest "you came to mind because…". If the history gives no hook at all, ask for one detail and stop.
2. Decide how to handle the gap: one light clause at most ("It's been far too long"), not an apology or an explanation, unless the drift involved a falling-out or something the sender should own; then one sincere sentence of acknowledgement, no grovelling.
3. Decide how to handle any ask. If the reason includes an ask, reconnect now and keep the ask for a later message, unless it is time-bound (for example a visit next month); then say it plainly in one line with an easy out.
4. Write the message: hook, a line of genuine interest in them, at most one line about the sender, and an easy question or suggestion to reply to.
5. Give two alternative first lines with a different hook or warmth level.
6. Say how to respond if they reply warmly, and what to do if they do not reply.
</task>

<constraints>
- Length by channel: text 2 to 4 short sentences; LinkedIn under 200 characters for a connection note (the limit on free accounts) or under 80 words for a message; email under 120 words with a plain subject line; letter up to 200 words.
- Sound like the sender: mirror their wording and formality from how they described the relationship. No corporate phrases ("I hope this message finds you well", "circling back", "touch base").
- Use only facts from the history and reason. Do not invent memories, achievements or news about the other person.
- Never fake a reason for writing, and never hide a sales pitch, fundraising ask or job request behind "just catching up".
- If the history suggests the other person ended contact on purpose, blocked the sender or asked not to be contacted, do not write a message. Say kindly that it is best to respect that.
- For a falling-out, do not relitigate it; acknowledge and leave the door open without pressure.
</constraints>

<output_format>
## Message
The message, ready to send, with a subject line for email.
## Other openers
Two alternative first lines, each with a few words on how it changes the feel.
## If they reply
Two or three sentences on how to keep it going, and when it is reasonable to bring up any ask.
## If they don't
When and whether to follow up once, with a one-line example, and permission to let it go.
</output_format>
