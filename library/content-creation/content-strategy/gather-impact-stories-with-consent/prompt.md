---
schema: 1
id: gather-impact-stories-with-consent
kind: prompt
title: Gather impact stories with consent
description: Plans how a nonprofit collects stories from the people it serves, with revocable consent, a dignified interview guide, photo and anonymising rules and a story log of permitted uses.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, manager]
subject: [nonprofit, social-care]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [informed-consent, impact-stories, ethical-storytelling, safeguarding, anonymisation, story-log]
pairs_with:
  personas: [nonprofit-storyteller]
  prompts: [define-content-pillars]
args:
  - name: organisation
    description: Who you are and what you do, your size, who collects stories today (comms, programme staff, volunteers) and where stories end up (appeals, reports, social media, grant bids).
    type: text
    required: true
  - name: programmes
    description: The services or programmes people use, who uses them, and any settings where stories would be gathered (drop-in, home visits, school, online).
    type: text
    required: true
  - name: vulnerable_groups
    description: True if you work with children, people in crisis, survivors of abuse, refugees and asylum seekers, people with limited capacity to consent, or anyone whose safety could be at risk if identified.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Principles, Who to ask and who not to, Consent process, Interview guide, Photo and video rules, Anonymising, Story log, Questions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a charity, community service or social enterprise collect stories from the people it serves without turning them into props. Three failures are common: consent is a signature taken once at a vulnerable moment (in the queue for food, just after a crisis) with no real option to say no or to change their mind later; stories are written as deficit or rescue narratives where the organisation is the hero and the person is defined by their worst moment; and nobody records what each person agreed to, so a quote given for an annual report ends up in a paid social ad five years later. Good practice treats consent as a process, the person as the expert on their own life, and a story log as the organisation's memory of every promise made.

Vulnerable groups involved: {{vulnerable_groups}}
</context>

<task>
<organisation>
{{organisation}}
</organisation>

<programmes>
{{programmes}}
</programmes>

1. Write four to six principles in plain words the whole team can repeat (for example: "No one's service ever depends on sharing a story").
2. Who to ask and who not to: criteria for inviting someone (out of acute crisis, a settled relationship with staff, able to understand the uses); who should not be asked now (current crisis, under a safeguarding plan, legal case ongoing, not able to consent without support). If vulnerable groups are involved, add: a named safeguarding lead signs off each story, parental or guardian consent plus the young person's own assent for under-18s, never identifying details for anyone at risk from another person, and supported-decision approaches for people with limited capacity.
3. Consent process: who asks (ideally someone without power over their service), when (not at the point of receiving help), a plain-language explanation of each possible use, a tiered consent form (each use ticked separately: internal training, annual report, website, social media, press, fundraising appeals, paid advertising), how long consent lasts (suggest reviewing at 12 to 24 months), how to withdraw at any time and what happens then (removed from future use; printed material cannot be recalled, and say so). Include a short script and a cooling-off check before anything is published.
4. Interview guide: 8 to 12 open questions in a strengths-based arc (life before, what they were aiming for, what helped including their own effort, what changed, what they want others to know), plus questions never to ask (graphic detail of trauma, "how bad was it"), how to pause or stop, and offering the person the chance to read or hear their story before it is used.
5. Photo and video rules: separate consent for images, the person chooses how they appear, no pictures of people at their lowest (queues, hospital beds, tears) unless they actively want it, no children's faces where risk exists, location details removed from metadata and backgrounds.
6. Anonymising: name changes, composite stories only if clearly labelled, removing identifying combinations (job plus town plus age), and checking with the person whether they would be recognised.
7. Story log: a table design recording each story and its permitted uses, so anyone can check before reusing a quote.
</task>

<constraints>
- Data protection and safeguarding rules differ by country and funder. Name that personal stories and photos are usually personal data (often sensitive data), and tell them to check local data-protection law and their own safeguarding policy; do not state specific legal requirements as fact.
- Never suggest payment or gifts that could pressure someone to take part; a thank-you or covering expenses can be offered to everyone regardless of whether they share.
- Avoid saviour language in every example: the person acts, the organisation helped.
- If the organisation or programme details are too thin to plan around (who is served, where stories will be used), ask for them and mark gaps as [X].
- Do not invent stories, quotes or statistics as examples; use clearly fictional placeholders.
- If anything suggests a person is at immediate risk, the plan must route that to the safeguarding lead before any storytelling.
</constraints>

<output_format>
## Principles
Four to six one-line principles.

## Who to ask and who not to
Two short bulleted lists.

## Consent process
Numbered steps, the tiered consent options as a checklist, a three-to-five sentence script, and the withdrawal procedure.

## Interview guide
Numbered questions grouped by stage, then "Never ask" bullets and how to pause.

## Photo and video rules
Bullets.

## Anonymising
Bullets, with one before-and-after example using fictional details.

## Story log
Table columns: story ID | person or pseudonym | date of consent | uses allowed | uses refused | review date | withdrawn? | storage location | who approved.

## Questions to confirm
Bullets: gaps to fill before the plan is used.
</output_format>
