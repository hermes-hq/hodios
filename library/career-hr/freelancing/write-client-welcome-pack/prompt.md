---
schema: 1
id: write-client-welcome-pack
kind: prompt
title: Write a client welcome pack
description: Writes a freelancer's welcome pack for new clients - how the project runs, communication hours and channels, feedback rounds, what you need from them, payments and what happens if things change.
category: freelancing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, designer, writer, artist]
requires: [none]
inputs: [text, preferences]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [client-onboarding, working-hours, feedback-rounds, expectations, client-communication]
pairs_with:
  prompts: [write-statement-of-work, write-scope-change-email]
  workflows: [freelance-client-onboarding-track]
args:
  - name: service_and_process
    description: What you do, how a typical project runs from kickoff to delivery, how many feedback rounds, and the tools you use for files, calls and messages.
    type: text
    required: true
  - name: boundaries
    description: Your working hours and time zone, reply times, channels you do and do not use, notice you need for urgent work and any rush fee, holidays, and payment terms.
    type: text
    required: true
  - name: voice
    description: How you sound, for example "friendly and informal", "calm and professional".
    type: string
    default: friendly and professional
output_contract:
  format: markdown
  sections: [Welcome pack, Cover email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the welcome pack a freelancer sends when a client signs, the document that sets expectations before habits form. Experienced freelancers know the first two weeks decide the relationship: if you answer a 10 pm message once, it becomes the norm; if feedback arrives from five people in five channels, revisions double. A good pack is short (two to four pages), friendly rather than defensive, and practical: it tells the client what happens next, what you need from them and by when, how to reach you and how fast you reply, how feedback works, and how changes and payments are handled. Rules are framed as how you deliver good work, not as accusations.

Voice: {{voice}}
</context>

<task>
<service>
{{service_and_process}}
</service>

<boundaries>
{{boundaries}}
</boundaries>

1. Write the pack with: a short welcome; what happens next (the first steps with rough timing); what you need from the client (inputs, access, one decision-maker for feedback); how we communicate (channels, hours and time zone, reply time, how to flag something urgent and what that costs); how feedback and revisions work (rounds, consolidated feedback, what counts as a change); timeline and what moves it; payments (schedule and terms as given); holidays and availability; how the project ends.
2. Write a short cover email sending the pack, asking the client to name their decision-maker and send the first inputs by a date.
3. Notes: any boundary the freelancer gave that conflicts with another or with the process (for example a 24-hour reply time with a rush service), and anything that belongs in the contract rather than the pack.
</task>

<constraints>
- Use only the freelancer's facts; mark missing ones as [X]. Do not invent fees, hours or tools.
- Friendly and plain; no "please note that failure to" tone, no capital-letter warnings.
- The pack does not replace the contract; do not write it as legal terms.
- Keep the pack under about 700 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Welcome pack
The document with short headed sections.

## Cover email
Ready to send.

## Notes
Bullets.
</output_format>
