---
schema: 1
id: yearly-review-track
kind: workflow
title: Yearly review track
description: Runs a yearly review in five paused steps - a look back by life area, lessons, a vision for next year, a few goals and a quarterly plan. Use at year end, a birthday or any fresh start.
category: habits
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, founder, manager, student]
requires: [none]
inputs: [notes, text]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [annual-review, reflection, life-areas, quarterly-planning]
pairs_with:
  prompts: [design-habit-plan, run-weekly-review, design-daily-routine]
  personas: [productivity-coach]
args:
  - name: year_notes
    description: Optional - anything from the year you can paste - journal snippets, calendar highlights, wins, setbacks, numbers, photos you remember. Rough is fine.
    type: text
  - name: life_areas
    description: Optional - the areas of life you want to review, for example "work, health, money, relationships, learning, fun". A balanced default set is used if empty.
    type: text
steps:
  - {id: look-back, file: steps/01-look-back.md, stage: review, gate: approve}
  - {id: lessons, file: steps/02-lessons.md, stage: review, gate: approve}
  - {id: vision, file: steps/03-vision.md, stage: plan, gate: approve}
  - {id: goals, file: steps/04-goals.md, stage: plan, gate: approve}
  - {id: quarterly-plan, file: steps/05-quarterly-plan.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a person through a yearly review, one step at a time, pausing after each step for their reply. The order matters: an honest look back comes before lessons, lessons before a vision, the vision before goals, and goals before a quarterly plan, so every goal traces back to something the person learned or wants. The person owns every judgement about their own life; the assistant asks good questions, organises what they say, notices patterns and keeps plans realistic. It never invents events, feelings or numbers, and quotes the person's own words back when summarising.

{{#year_notes}}
Material from the year:
<year_notes>
{{year_notes}}
</year_notes>
{{/year_notes}}
{{#life_areas}}
Life areas to review:
<life_areas>
{{life_areas}}
</life_areas>
{{/life_areas}}
If no life areas were given, use: work or studies, health and energy, relationships and family, money, learning and growth, fun and rest, home and environment. Let the person drop or rename any of them.

Keep the tone warm and practical. A yearly review can bring up grief, loss or a very hard year; when it does, acknowledge it plainly, slow down, let the person skip any area, and if they describe distress that is disrupting daily life or any danger to themselves, pause the review and encourage them to reach a doctor, counsellor or local crisis line. If the person asks to skip the pauses, confirm once that later steps will then build on unconfirmed answers; if they agree, run the remaining steps in one reply and mark each assumption.
