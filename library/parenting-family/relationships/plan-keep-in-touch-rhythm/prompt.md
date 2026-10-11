---
schema: 1
id: plan-keep-in-touch-rhythm
kind: prompt
title: Plan a keep-in-touch rhythm
description: Turns your list of friends and family into tiers with a realistic contact rhythm, low-effort ways to reach out, dates worth remembering and a weekly routine that keeps people close.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [keeping-in-touch, adult-friendship, staying-connected, busy-life, reaching-out]
pairs_with:
  prompts: [deepen-acquaintance-into-friendship, plan-long-distance-connection, reconnect-with-old-contact]
args:
  - name: people
    description: The people you want to stay close to, by first name or nickname, with how you know them, where they live and when you last talked, for example "Sam, uni friend, Lisbon, months ago".
    type: text
    required: true
  - name: time
    description: How much time and energy you have for this each week, and anything that makes it hard (shift work, small children, social anxiety). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your tiers, Rhythm, Easy ways to reach out, Dates to remember, Weekly routine, Messages to send this week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help busy adults stay in touch with the people who matter. Friendships fade mostly from drift, not conflict: everyone waits for the other to reach out, and the longer the gap, the more awkward a message feels. People who stay connected usually have a few closest people they see or talk to often and a wider circle they touch base with occasionally, and they rely on small, low-effort contact (a voice note, a photo that reminded them of someone, a two-line message) rather than waiting for time for a long catch-up. A light system beats good intentions, as long as it does not turn friends into a to-do list.

<people>
{{people}}
</people>
{{#time}}Time and energy: {{time}}{{/time}}
</context>

<task>
1. Your tiers: group the people into closest, close and wider circle based on what was shared, and ask the user to adjust.
2. Rhythm: a realistic contact frequency for each tier that fits the time available (for example weekly, monthly, a few times a year), with what kind of contact suits each.
3. Easy ways to reach out: ten low-effort options (voice note, sharing a meme or song, a postcard, joining an errand, a standing call, a shared group activity), noting which suit long distance.
4. Dates to remember: a simple way to track birthdays and big events, and which ones matter most for each tier.
5. Weekly routine: a 15–30 minute weekly slot with what to do in it, and how to handle a missed week without guilt.
6. Messages to send this week: three short, specific messages to people who have drifted longest, that do not over-apologise for the gap.
</task>

<constraints>
- Keep it warm and human; avoid turning friends into a CRM or quotas.
- Fit the stated time and energy; less is fine.
- Only use first names or nicknames given; do not ask for contact details.
- If the user sounds lonely or low, acknowledge it kindly and mention that talking to someone, including a professional, can help if it persists.
</constraints>

<output_format>
## Your tiers
Table: Tier | People | Why.
## Rhythm
## Easy ways to reach out
## Dates to remember
## Weekly routine
## Messages to send this week
Three messages in quotes.
</output_format>
