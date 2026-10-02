---
schema: 1
id: write-networking-message
kind: prompt
title: Write a networking message
description: Writes a short outreach message asking for an informational interview, a referral or advice that is specific, low-effort to accept and easy to decline. Use for LinkedIn or email outreach.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [informational-interview, referral, cold-message, warm-introduction]
pairs_with:
  prompts: [plan-job-search, optimize-linkedin-profile]
args:
  - name: contact
    description: Who you are writing to - their role, company, how you found them, and anything specific you share or admire (a talk, post, project, school, former employer, mutual contact).
    type: text
    required: true
  - name: my_background
    description: Who you are in two or three lines, what you are looking for, and the specific role or posting if you are asking for a referral.
    type: text
    required: true
  - name: ask
    description: What you want - informational (a 15-20 minute call), referral (to a specific role), or advice (one focused question answered in writing).
    type: enum
    enum: [informational, referral, advice]
    default: informational
output_contract:
  format: markdown
  sections: [Message, Short version, Follow-up, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write outreach that busy professionals actually answer. Most networking messages fail because they are about the sender, ask for something vague ("pick your brain", "any opportunities?"), or ask too much too soon (a referral from a stranger with no context). A message gets a yes when the reader can see in ten seconds why you chose them, exactly what you want, how little it costs them, and that saying no is fine.

<contact>
{{contact}}
</contact>

<my_background>
{{my_background}}
</my_background>

Ask: {{ask}}
</context>

<task>
1. Find the one true, specific reason to contact this person (shared background, their work, a mutual contact, a post or talk). If {{contact}} gives none, use their role and say so in Notes, and suggest what to look for.
2. Write the message with this shape:
   - Line 1: the specific connection or reason, about them, not about you.
   - Line 2: who you are in one sentence, relevant to them.
   - Line 3: the ask, concrete and bounded:
     - informational: 15-20 minutes, two or three named topics, flexible on time.
     - referral: name the role (title, and a job ID or link if given), say why you fit in one line, offer to send a short blurb they can forward, and attach or link the resume. If the user has no prior relationship with the contact, recommend a short informational chat first and write the message as a bridge to that instead, explaining why in Notes.
     - advice: one specific question they can answer in a few lines, in writing.
   - Line 4: an easy out ("If now isn't a good time, no worries at all") and thanks.
3. Write a short version for a connection request (aim for about 300 characters, the limit platforms such as LinkedIn commonly apply to invitation notes; check the current limit).
4. Write one follow-up to send after 5-7 working days with no reply, adding something useful or new rather than a guilt-trip.
</task>

<constraints>
- Main message under 120 words. Plain text, no emojis unless the user's background suggests a casual field.
- Specific beats flattering: reference something real, never generic praise. Do not invent shared experiences, mutual contacts or details about the contact.
- No attachments requested from them, no "I know you're busy", no "pick your brain", no "any opportunities".
- Sound like a person, in the user's register; no corporate filler.
</constraints>

<output_format>
## Message
Subject line (for email) and body.
## Short version
The connection-request note.
## Follow-up
## Notes
One to three bullets: anything assumed, what to personalise, and timing advice.
</output_format>

<examples>
<example>
Input: contact is a data engineering manager at a logistics company who gave a talk on migrating to streaming pipelines; background is a backend engineer with 3 years of Kafka work wanting to move into data engineering; ask is informational.

Message body:
Hi Priya, your talk on moving the dispatch pipeline from nightly batches to streaming was the clearest explanation of exactly-once trade-offs I have seen. I'm a backend engineer with three years running Kafka consumers in payments, and I'm planning a move into data engineering. Would you be open to a 15-minute call in the next few weeks? I'd love to hear how you hire for your team and which skills mattered most for people who made the same switch. If now isn't a good time, no worries at all. Thanks either way.
</example>
</examples>
