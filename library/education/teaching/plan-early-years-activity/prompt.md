---
schema: 1
id: plan-early-years-activity
kind: prompt
title: Plan a play-based early-years activity
description: Plans a play-based activity for children aged two to five with learning areas, setup, adult prompts and questions, adaptations, safety notes and what to observe and record.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [topic, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [early-years, play-based-learning, preschool, provocations, child-development, observation]
pairs_with:
  prompts: [write-learning-story, design-kids-science-experiment, create-kids-craft]
  personas: [early-years-educator]
args:
  - name: theme_or_goal
    description: The interest, theme or learning goal, e.g. "the children are fascinated by puddles", "counting to five", "turn-taking", "autumn leaves".
    type: text
    required: true
  - name: age_range
    description: Ages of the children, e.g. "2 to 3 years", "3 to 4", "4 to 5 (pre-K)".
    type: string
    required: true
  - name: group_size
    description: Number of children taking part at one time.
    type: number
    default: 6
  - name: materials
    description: Optional materials available or to use, e.g. "loose parts, water tray, clipboards, natural materials", or anything to avoid.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Learning areas, Setup, Adult role, Extending the play, Adaptations, Safety, Observe and record, Sharing with families]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Young children learn most when an activity starts from their interests, lets them explore and choose, and has an adult who notices and extends their thinking rather than directing every step. A good early-years activity is an invitation: an attractive setup that suggests possibilities without a single right outcome, adult language that comments, models vocabulary and asks genuinely open questions, and a clear idea of what to look for so the adult can capture learning and plan next steps. It must also be safe for the age group: under-threes put things in their mouths, many children have allergies, and water and outdoor play need supervision.
</context>

<task>
Plan a play-based activity for **{{group_size}}** children aged **{{age_range}}** around:

<theme_or_goal>
{{theme_or_goal}}
</theme_or_goal>
{{#materials}}
Materials available or to avoid:
<materials>
{{materials}}
</materials>
{{/materials}}

1. **Overview:** a name for the activity, where it happens (indoors, outdoors, a tray, a corner), roughly how long children might stay with it (they come and go), and how many adults it needs.
2. **Learning areas:** the 2 to 4 areas it supports most, using broad areas such as communication and language; personal, social and emotional; physical; early literacy; early maths; understanding the world; and expressive arts. Name the specific skill in each (for example "comparing size using bigger and smaller", "using a pincer grip"). Tell the educator to map them to their own framework.
3. **Setup:** exactly how to lay out the invitation to play, with materials and quantities, so it looks inviting and works for the group size.
4. **Adult role:** what the adult does first (observe, then join in), 6 to 8 example comments and open questions, 5 to 8 words to model, and when to step back.
5. **Extending the play:** 2 or 3 ways to take it further over following days, depending on what the children do with it.
6. **Adaptations:** for the youngest or less confident children, for children ready for more challenge, for children learning English or another home language, and for children with additional needs (sensory sensitivities, mobility).
7. **Safety:** risks specific to this activity and age (choking hazards for under-threes, allergens in food or natural materials, water, sharp tools, hygiene) and the precaution for each.
8. **Observe and record:** 4 to 6 look-fors linked to the learning areas, and a quick way to capture them (a photo with a one-line note, a sticky note, a tally).
9. **Sharing with families:** one or two sentences a family could read, plus a question to ask families about the child's interest at home.
</task>

<constraints>
- Child-led and open-ended: no worksheets, colouring sheets or tasks with one right product.
- Match materials and expectations to {{age_range}}: under-threes need large, safe items, sensory exploration and short attention spans; four- to five-year-olds can manage more complex construction, mark-making and rules.
- Use everyday, low-cost materials unless the educator listed others.
- If food is used, note allergies and whether the setting permits food in play.
- Do not invent framework outcome codes; describe skills in plain words.
</constraints>

<output_format>
## Overview
Name, location, adults needed, approximate time.
## Learning areas
Area → specific skill.
## Setup
Steps and materials list.
## Adult role
How to start, comments and questions, vocabulary.
## Extending the play
Bullets.
## Adaptations
Bullets by group.
## Safety
Table: Risk | Precaution.
## Observe and record
Look-fors and how to capture them.
## Sharing with families
Short text and a question.
</output_format>
