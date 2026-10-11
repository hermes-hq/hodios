---
schema: 1
id: plan-stream-hiatus
kind: prompt
title: Plan a break from streaming
description: Plans a streamer's planned break - how long and what continues, the announcement, what happens with paid supporters and perks, light content while away, and a return plan and comeback stream.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [streaming-break, streamer-burnout, return-stream, paid-supporters, community-communication]
pairs_with:
  prompts: [grow-streaming-channel, read-stream-analytics, reduce-membership-churn]
  personas: [stream-producer]
args:
  - name: situation
    description: "Why you need a break (as much as you want to share), how long you think, your platform, schedule now, viewers, and whether you have subs, memberships or a Patreon."
    type: text
    required: true
  - name: support
    description: "Mods, editors or friends who could keep things going, Discord or socials you have, and any sponsor or event commitments in the break."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Break shape, Announcement, While you are away, Paid supporters, Return plan, Comeback stream]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Streamers often fear that any break will kill a channel, so they keep going until they burn out, which is worse for the channel than a planned pause. In practice, audiences forgive a clear, honest announcement with a return date or check-in date far more than silence; channel numbers usually dip and recover when the streamer returns with a plan. The parts that need deliberate care are paid supporters (subscriptions or memberships that keep billing while perks stop), sponsor or event commitments, and mods left without guidance. Light activity can keep the community warm without becoming work: scheduled clips or highlights, a Discord where mods host something small, a short check-in post. The announcement should say only what the streamer wants to share; nobody owes the internet their health details. A comeback works better as a defined event than a quiet return. If the break is because of serious stress or health, a professional is a better source of help than an audience.
</context>

<task>
<situation>
{{situation}}
</situation>

<support>
{{support}}
</support>

1. **Break shape:** length or a check-in date rather than an open end, what stops, what (if anything) continues, and who does it.
2. **Announcement:** a short message for stream, socials and Discord that sets the date or check-in, says what continues, and shares only what they choose. Give a version that shares nothing personal.
3. **While you are away:** light content that does not need them (scheduled clips, highlights, mod-run community nights) and a note to mods on rules and contact.
4. **Paid supporters:** honest options for subs, members or patrons (tell them perks pause, pause billing where the platform allows, or keep a small perk going), marked as platform checks, plus commitments to sponsors or events to rearrange.
5. **Return plan:** a gentler schedule to come back to, with fewer hours if needed, and early warning signs to pace against.
6. **Comeback stream:** a short plan for the return stream: what is new, a reason to show up, and thanks to people who stayed.
</task>

<constraints>
{{> guardrails/crisis-safety}}
- Never pressure them to shorten a break or share health details.
- If they describe serious distress, burnout affecting daily life, or thoughts of self-harm, say clearly that a doctor or mental health professional is the right help, and give that before the channel plan.
- Do not promise the channel will recover; describe what usually helps.
- Mark platform features for pausing subscriptions as checks.
</constraints>

<output_format>
## Break shape
## Announcement
Two versions: with and without personal detail.

## While you are away
## Paid supporters
## Return plan
## Comeback stream
</output_format>
