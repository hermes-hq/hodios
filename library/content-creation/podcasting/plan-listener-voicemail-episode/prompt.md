---
schema: 1
id: plan-listener-voicemail-episode
kind: prompt
title: Plan a listener voicemail episode
description: Plans a podcast episode built on listener voicemails, voice notes or written questions, with the call-out script, collection, consent and anonymity, screening, running order and on-air answers.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [listener-questions, audience-community, call-out, mailbag, consent]
pairs_with:
  prompts: [plan-podcast-episode, invent-recurring-podcast-segments, plan-podcast-growth]
  personas: [podcast-producer]
args:
  - name: show_summary
    description: The show, its audience and tone, usual length, how many listeners write in today, and the channels you have (newsletter, community, social).
    type: text
    required: true
  - name: theme
    description: A theme for the questions (for example "your worst first job", "ask us anything about sourdough"). Leave empty for an open mailbag.
    type: string
  - name: collection_method
    description: How listeners send their questions. voicemail-line is a phone number with a voicemail box; voice-notes is recorded audio sent through a form or app; email is written questions read on air.
    type: enum
    enum: [voicemail-line, voice-notes, email]
    default: voice-notes
output_contract:
  format: markdown
  sections: [Call-out script, Collection and consent, Screening, Running order, Answering on air, Timeline]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan listener-driven episodes. Hearing real listeners builds community, but these episodes fail in known ways: a vague call-out ("send us your questions!") brings few and generic replies; audio is unusable because nobody told callers how to record; voices or names go out without clear permission; and the episode turns into a slow queue of questions with rambling answers. A good call-out is specific, gives an example, a length limit and a deadline, and says plainly how the message will be used.

<show_summary>
{{show_summary}}
</show_summary>

{{#theme}}Theme: {{theme}}{{/theme}}
Collection method: {{collection_method}}
</context>

<task>
1. Write the call-out script to read in the episode before (30 to 45 seconds): the theme or prompt with one concrete example question, how to send it, a time limit (about 60 seconds for audio), recording tips for audio (quiet room, phone close to the mouth, say first name and where you are from if you are happy to), the deadline, and a plain statement of use and consent. Add a two-line version for social and the newsletter.
2. Set up collection and consent for {{collection_method}}: what to set up, what the submission must include, the consent wording (permission to play or read on air and in clips, edit for length, first name or anonymous, how to withdraw before release), and how to store and delete messages. For voicemail-line or voice-notes, note that callers' phone numbers or contact details must never be read out or shown.
3. Screening: a short checklist to pick messages for audio quality, variety of voices and topics, fit with the theme, and content (no full names of third parties, no private details, nothing defamatory, abusive or that identifies a minor). Say how to handle a message that discloses distress or risk: do not air it, reply privately with care and point to local support services.
4. Running order for the usual length: opening, five to eight messages grouped by theme with the best one early, a lighter one mid-episode, a strong one to close, and how many minutes each answer gets.
5. Answering on air: play or read the message, restate the question in one line, answer with one concrete point or story, and hand over; for co-hosts, who leads each. Include how to handle a question nobody can answer well (say so, invite expert listeners).
6. Timeline from call-out to release, including a fallback if too few messages arrive (written questions read by the host, or a shorter segment instead of a full episode).
</task>

<constraints>
- Never invent listener messages, names or numbers. Example questions in the call-out must be labelled as examples.
- Do not provide a phone number or service name; describe the type of tool and say to check its privacy and storage terms.
- Consent must be opt-in and clear; anonymous options are always offered.
- If the show's audience may include children, require a parent's permission for under-18 voices and suggest first names only.
- Keep scripts conversational, in the show's tone.
</constraints>

<output_format>
## Call-out script
The spoken script, then the social and newsletter version.

## Collection and consent
Setup steps and the consent wording.

## Screening
Checklist.

## Running order
Table: Slot | Content | Minutes | Notes.

## Answering on air
Bullets.

## Timeline
Table: Day | Task | Owner, including the fallback.
</output_format>
