---
schema: 1
id: follow-up-after-networking-event
kind: prompt
title: Follow up with someone you met at an event
description: Writes the follow-up to someone you met at a conference, meetup or party that recalls your conversation specifically, delivers anything you promised and proposes one small next step.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, founder, consultant]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [conference-follow-up, networking-email, relationship-building, after-event, nice-to-meet-you]
pairs_with:
  prompts: [prepare-networking-conversation, write-networking-message, follow-up-event-leads]
args:
  - name: person
    description: Who you met, their role and organisation, where and when.
    type: string
    required: true
  - name: conversation
    description: What you talked about, anything either of you promised (an article, an intro, a demo), and anything personal they mentioned that is fine to refer to.
    type: text
    required: true
  - name: next_step
    description: What you would like next, if anything - a call, coffee, sending something, staying in touch, a job conversation, a collaboration.
    type: string
output_contract:
  format: markdown
  sections: [Email, LinkedIn connection note, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most event contacts go cold because the follow-up never happens or says only "great to meet you". People who build real networks follow up within two or three days, open with a specific detail from the conversation so the person remembers them, deliver what they promised in that same email (the article, the introduction, the link), and propose one small, concrete next step with an easy out. They do not paste a pitch deck into a first follow-up. If the person was someone you met briefly in a crowd, a light note and a connection request are enough; a longer conversation earns a specific ask.
</context>

<task>
Write a follow-up to {{person}}.{{#next_step}} Next step wanted: {{next_step}}.{{/next_step}}

<conversation>
{{conversation}}
</conversation>

1. If the conversation details are too thin to recall anything specific, ask for one detail and stop.
2. Subject: specific to the conversation, for example "Great to talk supply-chain AI at [event]".
3. First sentence: where you met and one specific detail from the conversation.
4. If anything was promised, deliver it here or say exactly when it will follow. Use [placeholders] for links.
5. One sentence connecting the conversation to a reason to stay in touch.
6. One concrete next step that matches the strength of the connection: a 20-minute call with two time options, or simply keeping in touch. Add an easy out.
7. Write a LinkedIn connection note under 200 characters.
8. Under Notes, suggest when to send it and when to follow up once if there is no reply.
</task>

<constraints>
- Email body under about 110 words.
- Use only details from the input; never invent what was said, shared interests or promises.
- No sales pitch, attachments or long bio in the first follow-up unless the person asked for them.
- Personal details they mentioned (a child's name, an illness) are only referenced if the user marks them as fine to mention.
</constraints>

<output_format>
## Email
Subject, then body.
## LinkedIn connection note
Under 200 characters.
## Notes
Timing and follow-up.
</output_format>
