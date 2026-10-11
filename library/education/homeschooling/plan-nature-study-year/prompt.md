---
schema: 1
id: plan-nature-study-year
kind: prompt
title: Plan a nature study year
description: Plans a year of weekly nature study for a homeschooling family, with seasonal focus topics for their own climate, nature journal skills by age, outings, and how it builds science and drawing.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [biology]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [nature-study, nature-journal, outdoor-learning, seasons, charlotte-mason]
pairs_with:
  prompts: [plan-home-science-labs, plan-nature-walk-activities]
args:
  - name: family
    description: "Children's ages and how much time an adult can give each week."
    type: text
    required: true
  - name: location
    description: "Your area, climate and hemisphere, and the green or wild spaces you can reach."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your patch, The year, Nature journal by age, Weekly routine, Links to other learning, Safety, Kit and guides]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling families build regular nature study, a staple of Charlotte Mason, forest school and many eclectic homes. Nature study works when it is regular (weekly), local (the same patch revisited through the seasons), and observational: children notice, draw, name and ask, and the parent does not lecture. A nature journal grows with the child: young children draw and dictate, older ones add labels, measurements, dates, weather and questions, and teenagers can add simple data and field guide work. The topics have to follow the family's own climate and habitats: "spring" means different things in different hemispheres and climates, and urban families study street trees, birds, insects and weeds. Safety matters: plants and fungi that are toxic, water, ticks and other local risks.

Family: {{family}}
Where you live and what is nearby: {{location}}
</context>

<task>
1. Choose one or two "sit spots" or regular patches the family can revisit weekly, based on what is nearby.
2. Plan the year in seasonal or monthly blocks for the family's climate, each with a focus (for example a tree adopted for the year, birds at the feeder, insects, weather, clouds, stars, water life), and what to look for then.
3. Set nature journal skills by child's age, building through the year: drawing from life, labelling, measuring, dating and weather, questions, comparisons over time.
4. Plan a simple weekly routine (when, how long, what to bring) and a few special outings tied to the focuses.
5. Show how it feeds other learning: science vocabulary and classification, maths through counting and measuring, writing through journal entries, art.
6. Give safety rules for the family's setting and what to teach the children (do not eat or handle unknown plants or fungi, water, ticks, local hazards).
7. List low-cost kit and how to find local field guides or identification help.
</task>

<constraints>
- Fit the topics to the family's climate and hemisphere; ask if the location is too vague and do not assume four temperate seasons.
- Do not name specific local species as present unless the family mentioned them; describe types to look for and suggest checking a local guide.
- Never suggest tasting or foraging wild plants or fungi.
- Keep weekly time realistic, usually 45 to 90 minutes.
</constraints>

<output_format>
## Your patch
## The year
Table: Month or season | Focus | What to look for | Special outing.
## Nature journal by age
## Weekly routine
## Links to other learning
## Safety
## Kit and guides
</output_format>
