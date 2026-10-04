---
schema: 1
id: write-message-to-cancel-plans
kind: prompt
title: Write a message to cancel plans
description: Writes a kind, honest message to cancel or postpone plans with a friend, date or relative, sized to how late it is and how much the plan mattered, with a concrete alternative offer.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [cancelling-plans, rescheduling, friends, text-message, apology]
pairs_with:
  prompts: [apologize-effectively, decline-request-gracefully, reply-to-tricky-message]
  personas: [communication-coach]
args:
  - name: plan
    description: What was planned and with whom - who they are to you, what the plan was, when, and how much it mattered to them (a birthday dinner, a first date, a weekly coffee, a trip they booked).
    type: text
    required: true
  - name: reason
    description: The real reason you need to cancel, even if you do not want to share all of it. Leave empty if you would rather not say; the message will stay honest without a reason.
    type: text
  - name: notice
    description: How much notice they are getting. days means two or more days ahead; day-before means the day before; same-day means today, possibly close to the time.
    type: enum
    enum: [days, day-before, same-day]
    default: day-before
  - name: alternative
    description: When you could do it instead, or another way to make it up, for example "any evening next week" or "I'll cover the ticket". Leave empty and an alternative will be suggested for you to fill in.
    type: text
output_contract:
  format: markdown
  sections: [Recommended message, Warmer version, Shorter version, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cancelling is normal; cancelling badly costs trust. A good cancellation message arrives as early as possible, says clearly that the plan is off (no vague "might not make it"), apologises once in proportion to the inconvenience, gives an honest reason or an honest non-reason without a paragraph of excuses, acknowledges what it costs the other person, and offers a specific alternative so the plan is postponed rather than dropped. The later it is and the more the plan mattered (a birthday, booked tickets, a first date, someone who travelled), the more the message has to carry, and the more a phone call may be the better move.

<plan>
{{plan}}
</plan>
{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}
Notice: {{notice}}
{{#alternative}}
<alternative>
{{alternative}}
</alternative>
{{/alternative}}
</context>

<task>
1. Judge the weight: how late ({{notice}}), how much the plan mattered to the other person, any costs they bear (tickets, bookings, travel, childcare), and the relationship. Let this set the length of the apology and whether to suggest a call.
2. Write the recommended message: the cancellation in the first line, one honest sentence of reason (or "something's come up that I need to deal with" if they prefer not to share), an acknowledgement of what it means for the other person, an apology sized to the situation, and a specific alternative (from the alternative given, or with [day] placeholders to fill). Offer to cover any cost they lose, where that applies.
3. Write a warmer version (for someone close or a plan that mattered a lot) and a shorter version (for a casual plan), keeping the same facts.
4. Before you send: two or three quick tips specific to this case, such as sending it now rather than waiting, calling first if it is same-day and important, how to follow up with a real date, or what to avoid saying.
5. Before answering, check that each version says clearly that the plan is cancelled or postponed, contains no invented excuse, and matches the notice level.
</task>

<constraints>
- Honest only. Never invent an illness, emergency, family crisis or other false excuse. If the real reason is private or awkward (tired, overcommitted, not feeling it), find an honest way to say it or to say less.
- No over-apologising or grovelling, and no self-pity that makes the other person comfort the canceller.
- Write in a natural texting or messaging voice that matches the relationship; no formal letter language unless it is a formal plan.
- If the person seems to cancel because they feel unsafe with the other person (for example a date who pressured them), do not push a rescheduled plan; write a clear, short message without an alternative and mention safety resources if relevant.
- If the reason shows the person does not want to reschedule at all (they are not interested in a second date, or want to step back from the friendship), leave out the alternative and keep the message kind, clear and final rather than offering a plan they will cancel again.
- If this is a pattern of repeated cancelling with the same person, say so gently and suggest addressing it directly.
</constraints>

<output_format>
## Recommended message
Ready to send.
## Warmer version
## Shorter version
## Before you send
Two or three bullets.
</output_format>
