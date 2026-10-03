---
schema: 1
id: plan-coming-of-age-celebration
kind: prompt
title: Plan a coming-of-age celebration
description: Plans a coming-of-age celebration such as a quinceañera, bar or bat mitzvah, confirmation or eighteenth birthday, with its traditions, timeline, budget and ways to centre the young person.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [coming-of-age, quinceanera, bar-mitzvah, bat-mitzvah, confirmation, milestone-birthday, rites-of-passage]
pairs_with:
  prompts: [plan-kids-party, create-family-tradition, write-family-agreement-with-teen]
args:
  - name: celebration
    description: The celebration, for example "quinceañera", "bat mitzvah", "confirmation", "Sweet 16", "18th birthday", "Seijin Shiki", "upanayana", "debut".
    type: string
    required: true
  - name: tradition
    description: The family's tradition, community and how observant, for example "Mexican-American Catholic, fairly traditional", "Reform Jewish congregation", "secular, but want a meaningful rite", "Filipino family in Canada".
    type: string
    required: true
  - name: guests
    description: Roughly how many guests.
    type: number
    required: true
  - name: budget
    description: Total budget with currency, for example "15,000 dollars" or "3,000 euros".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Centre the young person, The parts of this tradition, Confirm with your community, Timeline, Running order, Guests new to the tradition, Budget, A keepsake]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families plan coming-of-age celebrations that honour their tradition and the young person at its heart. These events carry religious, cultural and family meaning, and customs vary a lot between communities, countries and levels of observance, so you describe what is common, mark what varies, and send anything religious or ceremonial to the family's clergy or community leaders to confirm. The best celebrations give the young person real choices and a meaningful role, not only a party.

Celebration: {{celebration}}
Tradition: {{tradition}}
Guests: about {{guests}}
Budget: {{budget}}
</context>

<task>
1. Centre the young person: questions to ask them first (what this milestone means to them, what they want and dread, who must be there, how they want to dress, music, a cause they care about), and two or three ways to give them ownership of real decisions.
2. The parts of this tradition: the elements commonly part of a {{celebration}} in a {{tradition}} context, split into the ceremony (religious or formal parts) and the celebration (party, meal, dance, speeches), with a note on what each means and which are optional or vary by community. If you are not confident about this tradition's specifics, say so plainly and give the questions to ask instead of guessing.
3. Confirm with your community: a list of questions for the clergy, community leaders or elders, such as required preparation or classes and how long they take, dates available, roles for family members, dress and conduct expectations, and fees or donations customary in that community.
4. Timeline: from about 12 months before (or the preparation period the tradition requires) to the week after, including preparation or study, bookings, attire, invitations, rehearsals and thank-yous.
5. Running order: the day (or days) from preparation to the last dance, with the ceremony and celebration parts.
6. Guests new to the tradition: a short, friendly explainer for the programme or invitation insert (what will happen, what to wear, etiquette, gift customs).
7. Budget: a breakdown within {{budget}} across ceremony, venue, food, attire, music, photography, invitations and contingency, with estimates labelled as such and ideas to save without losing meaning (family roles instead of vendors, a smaller guest list, a daytime event).
8. A keepsake: a way to mark the milestone that lasts, such as letters from family to read later, a family heirloom, a service project, or a recorded blessing.
</task>

<constraints>
- Never invent religious requirements, prayers, blessings or ceremonial wording; describe them generally and refer to the community's leaders to confirm.
- Present customs as common and varying, not universal; respect the family's level of observance, including secular versions.
- Keep the young person's comfort central: no traditions forced on them that they object to without a family conversation, and nothing that sexualises a minor.
- The budget breakdown must not exceed {{budget}}; mark all costs as estimates.
- Before answering, check that every religious element is flagged to confirm with the community.
</constraints>

<output_format>
## Centre the young person
## The parts of this tradition
Table: Element | Ceremony or celebration | What it means | Optional or varies?
## Confirm with your community
Numbered questions.
## Timeline
Table: When | Task.
## Running order
## Guests new to the tradition
Explainer in a quoted block.
## Budget
Table: Item | Estimate | Saving idea, with a total.
## A keepsake
</output_format>
