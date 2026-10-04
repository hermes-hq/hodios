---
schema: 1
id: design-citizen-science-project
kind: prompt
title: Design a citizen science project
description: Designs a citizen science project with a question volunteers can really answer, a simple protocol, data quality checks, training, ethics, and a plan for telling participants what was found.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, plan]
role: [researcher, teacher]
requires: [none]
inputs: [topic, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [citizen-science, volunteers, data-quality, public-engagement, community-science]
pairs_with:
  prompts: [design-sampling-plan, write-data-management-plan, write-informed-consent-form, plan-participatory-research]
  personas: [research-methodologist]
args:
  - name: question
    description: The research question, for example "How does urban light pollution affect moth abundance across the city?"
    type: string
    required: true
  - name: participants
    description: Who will take part and what they bring, for example "secondary school classes", "allotment holders", "anglers", "the general public with smartphones".
    type: string
    required: true
  - name: duration_months
    description: How long data collection runs, in months.
    type: number
    default: 6
  - name: resources
    description: Staff time, budget, existing platforms or partners, and any equipment you can lend volunteers.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Project model, Volunteer protocol, Data quality, Training and support, Recruitment and retention, Ethics and data, Timeline, Telling participants what we found, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Citizen science works when volunteers can collect data that answer the question without expert skill, when the protocol is simple enough to follow the same way every time, and when the project treats people as collaborators rather than free labour. Projects fail when the task is ambiguous (so data from different people are not comparable), when nobody plans for uneven effort (records cluster where people live, on sunny weekends), when data quality is checked after the fact or not at all, when participants never hear what their data showed, and when location or personal data are published carelessly. Good design chooses the participation model on purpose: contributory (volunteers collect data), collaborative (they also help analyse or refine methods) or co-created (they help set the question).
</context>

<task>
Design a citizen science project.

Question: {{question}}
Participants: {{participants}}
Data collection: {{duration_months}} months
{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. Fit check: can these participants collect data that answer this question? Name the measurement, the skill it needs, and the biggest threat to comparability (observer skill, effort, location bias, timing). If the question is too broad, propose a narrower version volunteers can answer and use that, saying so.
2. Project model: choose contributory, collaborative or co-created, and say why for these participants.
3. Volunteer protocol: what one observation is, when and where to make it, the exact steps (no more than about seven), the equipment, and the fields to record, including effort (time spent, area covered) and "nothing found" records, which are as important as sightings.
4. Data quality: design checks at each stage - built-in form validation, required photos or samples for verification, expert or community verification of a subsample, a calibration exercise against expert data, rules for outliers and duplicates, and how observer skill or effort is modelled in the analysis.
5. Training and support: what volunteers learn before their first observation, in what format, a short competency check, and how they ask questions during the project.
6. Recruitment and retention: where to find these participants, what motivates them (learning, contribution, community, recognition), how to keep them active through the {{duration_months}} months, and how to avoid recruiting only one type of person.
7. Ethics and data: whether ethics review is likely needed, consent, minors and safeguarding where relevant, privacy (especially home locations and sensitive species locations), safety in the field, credit and acknowledgement, data ownership and licence, and how data will be shared.
8. Timeline: month by month over the {{duration_months}} months plus set-up and analysis.
9. Telling participants what we found: interim updates, the final results in plain language, how individual contributions are visible, and how participants can help interpret or use the results.
10. Open questions: what you need to know from me to finish the design.
11. Before you answer, check that every protocol step can be done by these participants with the equipment named, and that the data-quality plan covers the threat named in the fit check.
</task>

<constraints>
- Recommend kinds of platform (an existing recording platform, a form tool, a custom app) by the features needed, not by brand.
- Do not invent a funder's or ethics board's requirements; name them as things to confirm.
- Keep the volunteer task as simple as the question allows; add complexity only where data quality needs it, and say why.
- If the question needs expert skill that cannot be trained in the time available, say so and propose a version that works or a different method.
</constraints>

<output_format>
Markdown with the sections in the output contract. Write the volunteer protocol as a numbered list volunteers could follow as is, put data quality and the timeline in tables, and keep the rest as short bullets.
</output_format>
