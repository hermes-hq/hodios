---
schema: 1
id: answer-neighbour-farm-complaint
kind: prompt
title: Answer a neighbour's farm complaint
description: Writes a calm reply to a neighbour complaining about muck spreading, smells, noise, mud on the road or animals getting out, with practical fixes the farm can offer and records worth keeping.
category: farming
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [message, notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [neighbour-relations, complaint-reply, muck-spreading, mud-on-road, farm-noise]
pairs_with:
  prompts: [write-neighbor-dispute-letter, manage-footpath-through-livestock-fields]
args:
  - name: complaint
    description: The neighbour's complaint as they said or wrote it, and how it arrived (note through the door, email, social media post, on the doorstep).
    type: text
    required: true
  - name: facts
    description: What actually happened from your side - dates, what was spread or done and why, how long it lasts, what you already do to limit it, and any history with this neighbour.
    type: text
    required: true
  - name: channel
    description: How the reply will be sent.
    type: enum
    enum: [letter, email, text-message, talking-points]
    default: letter
output_contract:
  format: markdown
  sections: [Reply, Fixes to offer, Records to keep, If it escalates]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer reply to a neighbour's complaint in a way that keeps the relationship and protects the farm. Most farm-neighbour disputes start small (a smell after slurry spreading, mud on the lane, a bird scarer at dawn, sheep in a garden) and grow because the first reply was defensive, dismissive or silent. People complain less when they know what is happening, why, for how long, and that the farmer cares. A good reply thanks them for raising it, explains briefly without lecturing, offers one or two concrete changes the farm can actually keep (notice before spreading, timing, road cleaning, fence repairs, scarer hours), invites a conversation, and admits only what the facts support. Keeping simple records protects the farm if a complaint goes to the council or further.

Channel: {{channel}}
</context>

<task>
<complaint>
{{complaint}}
</complaint>

<facts>
{{facts}}
</facts>

1. Identify what the neighbour is really asking for (to be told in advance, for it to stop, an apology, compensation) and the tone of the complaint.
2. Separate what the facts support (the farm did spread on that date) from what they do not (the claim that it went on for weeks).
3. Write the reply for {{channel}}: open with thanks and acknowledgement of how it affected them; explain in two or three sentences what happened and why it is needed; say what the farm already does; offer specific changes the farmer can keep; invite a chat and give a way to reach the farm; close warmly. No jargon, no blame, no sarcasm.
4. If something went wrong (animals got out, mud left on the road, damage done), acknowledge it plainly, say what has been fixed, and do not admit wider liability or offer payment beyond what the farmer has decided; suggest checking with the farm's insurer before accepting responsibility for damage.
5. List fixes the farm could offer, with cost and effort, for the farmer to choose from, for example: text or notice before spreading, avoiding weekends and bank holidays and spreading with the wind away from houses, low-emission spreading or incorporating quickly, road cleaning and warning signs during field work, bird scarer timing and direction, fence and gate checks.
6. List records to keep from now on.
</task>

<constraints>
- Use only the facts given; never invent dates, events or promises the farmer has not agreed.
- Do not state the law on nuisance, roads, animals straying or spreading rules as fact; in "If it escalates", list what to check and who to ask (the farm's insurer, a farming union adviser, a solicitor).
- If the complaint includes threats, harassment or damage to the farm, keep the reply short and factual (or advise not replying at all, and say when that is wiser), never answer the threat in kind, and suggest keeping screenshots and records and, if there is a threat to people or property, reporting it to the police. Fixes are still offered only where the farm's own facts support them.
- If the complaint was posted publicly (social media, a village group), reply privately where possible and keep any public reply to one polite line.
- If the complaint or the facts are missing, ask for them and stop.
</constraints>

<output_format>
## Reply
The reply ready to send: letter or email under 250 words; text message under 80 words with no headings; talking points as five to seven bullets for a doorstep or phone conversation.

## Fixes to offer
Table: fix | what it involves | cost and effort | easy to keep? (yes/no).

## Records to keep
Bullets: dates, weather and wind, what was done where, photos, contact with the neighbour.

## If it escalates
Bullets: likely next steps (council, environmental regulator, insurer, solicitor) and what to have ready.
</output_format>
