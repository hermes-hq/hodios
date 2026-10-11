---
schema: 1
id: write-chat-mod-handbook
kind: prompt
title: Write a chat mod handbook
description: Writes a handbook for a stream's volunteer moderators with the chat rules, an action ladder from warning to ban, bot filters, private signals to the streamer and escalation for threats and crises.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [content-creator, gamer]
inputs: [notes, preferences, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chat-moderation, moderators, mod-team, chat-rules, timeouts]
pairs_with:
  prompts: [write-community-guidelines, prepare-hate-raid-response, write-chat-bot-commands]
  personas: [stream-producer]
args:
  - name: stream
    description: What you stream, platform, typical viewers and chat speed, the vibe you want in chat, recurring problems (spoilers, backseating, self-promotion, creepy comments, politics), and how many mods you have.
    type: text
    required: true
  - name: existing_rules
    description: Optional. Your current chat rules or any notes you already give mods.
    type: text
  - name: audience_age
    description: Optional. Whether the audience includes many minors, since it changes what mods must watch for.
    type: string
output_contract:
  format: markdown
  sections: [Chat rules, Action ladder, Situation guide, Filters and tools, Talking to the streamer, Serious incidents, Mod care, Onboarding checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most stream moderation fails for one of two reasons: mods do not know how far they may go, so they freeze or overreact, or the streamer and mods do not agree on the line, so the same comment gets a laugh one night and a ban the next. A good handbook is short, gives each rule an example, and sets a proportionate ladder (delete, warn, short timeout, longer timeout, ban) with the cases that skip straight to a ban: hate speech, sexual comments about or to minors, sharing anyone's private information, threats. Mods are volunteers; a handbook also protects them, with a way to step away, no expectation to read abuse alone, and a rule that the streamer backs their reasonable calls in public and discusses mistakes in private. Viewers in distress need a different response from trolls. Platforms differ in tools (timeouts, blocked terms, follower-only or subscriber-only chat, slow mode, shared ban lists, chat verification), and the names and limits change.
</context>

<task>
<stream>
{{stream}}
</stream>

{{#existing_rules}}
<existing_rules>
{{existing_rules}}
</existing_rules>
{{/existing_rules}}

{{#audience_age}}Audience age: {{audience_age}}{{/audience_age}}

1. **Chat rules:** five to eight audience-facing rules in plain words, each with a one-line example of what breaks it, tuned to this stream's problems and vibe. Keep the user's existing rules where they work and say what you changed.
2. **Action ladder:** the steps from deleting a message to a permanent ban, with when to use each, typical timeout lengths as starting points, and the list of zero-tolerance cases that go straight to a ban and report.
3. **Situation guide:** a table of common situations for this stream (backseating, spoilers, self-promotion, arguing with other viewers, a first-time chatter with a borderline joke, a viewer in distress, a raid arriving) with what mods do and what they say.
4. **Filters and tools:** what to set up in the platform's tools and any chat bot: blocked terms categories (not a list of slurs), link rules, slow mode and follower or subscriber-only mode triggers. Tell the user to check the current names of these tools on their platform.
5. **Talking to the streamer:** a private signal for "check mod chat", what not to bring up live, and how decisions get reviewed after the stream.
6. **Serious incidents:** threats, doxxing, self-harm mentions, sexual comments involving minors, a hate raid: what to do, what evidence to keep (screenshots, usernames, times), reporting to the platform, and when the streamer should end the stream. For immediate danger, contact local emergency services.
7. **Mod care:** stepping away, shifts on long streams, not engaging with abusers in DMs, and how the streamer thanks mods.
8. **Onboarding checklist** for a new mod.
</task>

<constraints>
- Do not write lists of slurs or explicit terms; describe categories to block and suggest the platform's built-in filters.
- Be proportionate: most rule breaks are a delete or short timeout, not a ban.
- Do not promise that any tool blocks everything, and do not quote tool limits as fact.
- If the audience includes minors, add rules against asking for or sharing personal details and against private contact with viewers, and make sexual content toward minors a zero-tolerance report.
- Mods never handle real-world threats alone; the handbook says who to tell.
- Write for volunteers: short sentences, no legal jargon.
</constraints>

<output_format>
## Chat rules
Numbered rules, each with an example.

## Action ladder
Table: step | when | example.
Then: Zero tolerance - bullet list.

## Situation guide
Table: situation | what mods do | what mods can say.

## Filters and tools
Bullets.

## Talking to the streamer
## Serious incidents
Numbered steps per incident type.

## Mod care
## Onboarding checklist
Checkbox list.
</output_format>
