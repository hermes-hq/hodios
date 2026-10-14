---
schema: 1
id: request-employee-referral
kind: prompt
title: Request an employee referral
description: Writes the referral request to someone who works at the target company, plus the forwardable blurb and the details they need to complete an internal referral form.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [referrals, referral-request, internal-referral, networking-ask]
pairs_with:
  prompts: [map-warm-introductions, write-networking-message, write-cover-letter]
args:
  - name: contact
    description: Who you are asking, how you know them, how well and how recently, and whether they work near the hiring team.
    type: text
    required: true
  - name: role
    description: The role, with a job link or reference number and the key requirements from the posting.
    type: text
    required: true
  - name: background
    description: Your resume or the two or three facts that make you a strong fit for this role.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you ask, The ask, Referral packet, If they say yes, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring manager who has received and made many referrals. Employees refer when it is easy and safe: they need to understand the role, believe the person fits, and not feel their reputation is at risk. Many companies use an internal referral form that asks the employee how they know the candidate, why they are a fit, and the job reference, and the employee often submits it in a few minutes between meetings, so a candidate who sends those answers ready to paste gets referred faster and better. Asking someone who barely knows you to "refer" you puts them in an awkward spot; for weaker ties the right ask is a conversation or to pass on your details with honest context. Employees should never feel pressured, and a polite way to say no should be built in.

<contact>
{{contact}}
</contact>
<role>
{{role}}
</role>
<background>
{{background}}
</background>
</context>

<task>
1. Before you ask: from the contact details, judge whether a direct referral request fits the relationship (strong or recent working tie) or whether to ask first for a short chat about the team or for them to pass the details on with honest context. Say which, and adjust the message accordingly.
2. The ask: write a short message (under 130 words) for email or LinkedIn that reconnects naturally, names the role with its link or reference, gives one or two lines of fit, asks clearly whether they would be comfortable referring (or the softer ask), and offers an easy way out ("completely fine if not").
3. Referral packet: the material they can paste into a referral form or forward: a three-to-four-line blurb in the third person, the job reference, how they know the candidate (in the contact's likely words, to be confirmed), two fit points tied to the posting, and a note that the resume is attached. Mark anything the contact must confirm themselves.
4. If they say yes: a short thank-you, what to confirm (that they submitted it, whether to also apply directly or wait for the referral link, whether to name them in the application), and how to avoid double submission.
5. Follow-up: a gentle nudge after about a week if no reply, and a rule to update the contact on the outcome either way.
</task>

<constraints>
- Do not overstate the relationship or put words in the contact's mouth as fact; anything about how well they know the candidate is a draft for them to confirm or edit.
- Do not invent achievements; use only the background given.
- Do not mention referral bonuses as a reason for them to help.
- Keep it easy to decline. No guilt, no pressure, no repeated chasing.
- Use [Name] placeholders where names are unknown.
</constraints>

<output_format>
## Before you ask
## The ask
The message, ready to send.
## Referral packet
Blurb, job reference, how we know each other, two fit points.
## If they say yes
## Follow-up
</output_format>
