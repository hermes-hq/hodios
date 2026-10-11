---
schema: 1
id: design-beneficiary-feedback-loop
kind: prompt
title: Design a feedback loop with the people you serve
description: Designs how a nonprofit regularly asks the people it serves for feedback - short questions, safe and accessible channels, who acts on it, and how you tell people what changed.
category: nonprofit
version: 1.0.0
status: incubating
stage: [design]
role: [manager, operations-manager]
subject: [nonprofit]
inputs: [notes, text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [beneficiary-feedback, service-improvement, participant-voice, accountability, safeguarding]
pairs_with:
  prompts: [build-theory-of-change, write-impact-report, set-programme-eligibility-criteria]
  personas: [nonprofit-advisor]
args:
  - name: programme
    description: The service or programme - who it serves (age, language, literacy, any vulnerabilities), how and where people use it, staff and volunteer capacity, and what you already collect.
    type: text
    required: true
  - name: purpose
    description: What you want feedback for (for example improving the service, reporting to funders, catching problems early). Leave empty to cover all three.
    type: text
output_contract:
  format: markdown
  sections: [What to learn, Questions, Channels, Safety and consent, Closing the loop, Roles and rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonprofits hear from the people they serve, regularly and safely, and act on it. Most organisations collect satisfaction scores once a year for funders; those scores are uniformly high because people do not want to seem ungrateful to a service they depend on, especially when the person asking is the one who decides their access. Useful feedback comes from a few short, specific questions asked often, through channels that fit the people served (verbal, pictorial, in their language, anonymous where possible), and above all from visibly acting on it, so people see that speaking up changes things. Feedback must never feel like a condition of receiving help, and complaints that suggest harm need a separate safeguarding route.
</context>

<task>
Design the feedback loop.

<programme>
{{programme}}
</programme>

{{#purpose}}Purpose: {{purpose}}{{/purpose}}

1. What to learn: three to five decisions the feedback should inform (for example opening hours, how staff treat people, whether the service meets the need).
2. Questions: a core set of no more than five short questions in plain language, including one open question, plus a version adapted for any group named in the input (children, low literacy, other languages). Avoid questions that invite gratitude rather than honesty.
3. Channels: two or three ways to give feedback that fit the people and setting, at least one anonymous and one that does not need reading or writing, with the effort each needs from staff.
4. Safety and consent: explain clearly that the service does not depend on the feedback, how data is stored and who sees it, and a route for anything that suggests harm or abuse to go to the safeguarding lead rather than the feedback log.
5. Closing the loop: how and how often to tell people what was heard and what changed ("You said, we did"), including what was not changed and why.
6. Roles and rhythm: who collects, who reviews, how often, how decisions get made, and a one-page log format.
</task>

<constraints>
- Fit the design to the stated capacity; a two-person team gets a light process.
- Do not invent the programme's data or results.
- Keep questions neutral; no leading wording.
- Keep the safeguarding route separate and clear; data protection rules vary by country, so flag them to check.
</constraints>

<output_format>
## What to learn
## Questions
Core questions numbered, then adapted versions.
## Channels
Table: Channel | Who it suits | Anonymous? | Staff effort.
## Safety and consent
## Closing the loop
## Roles and rhythm
Include a log table: Date | Feedback | Theme | Action | Told people (date).
</output_format>
