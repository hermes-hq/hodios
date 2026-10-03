---
schema: 1
id: design-science-lab-activity
kind: prompt
title: Design a school science lab activity
description: Designs a school science practical with an investigable question, variables, hypothesis prompt, specific safety notes, materials, numbered procedure, data table and analysis questions.
category: teaching
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [science-practical, lab-safety, fair-test, inquiry, variables]
pairs_with:
  prompts: [write-lesson-plan, create-rubric, design-formative-assessment]
args:
  - name: concept
    description: The science idea the lab should help students understand, e.g. "factors affecting the rate of dissolving", "Ohm's law", "osmosis in plant cells".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 6", "Year 10 chemistry", "AP Biology".
    type: string
    required: true
  - name: equipment_available
    description: Optional list of equipment and consumables the school has, or limits such as "no gas taps", "only household materials", "no fume cupboard".
    type: text
output_contract:
  format: markdown
  sections: [Overview, Investigation question and variables, Safety, Materials, Procedure, Data table, Analysis questions, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many school practicals are recipes: students follow steps, fill a table and learn little about the concept or about how science works. A practical teaches more when it starts from a question students can actually investigate, makes them think about which variable they change, measure and control, collects data precise enough to show a pattern, and ends with analysis that links the evidence back to the concept and asks how reliable it is. Safety has to be specific to the hazards in this activity, checked against the school's own risk assessments and the safety guidance used locally.
</context>

<task>
Design a practical on **{{concept}}** for **{{grade_level}}**.
{{#equipment_available}}
<equipment_available>
{{equipment_available}}
</equipment_available>
{{/equipment_available}}

1. **Overview:** the learning goal, the concept in one sentence, prior knowledge needed, time required, and group size.
2. **Investigation question and variables:** an investigable question ("How does X affect Y?"), the independent variable with the values or levels to test, the dependent variable and how it is measured (instrument and units), and the control variables with how each is kept the same. Include a hypothesis prompt with a sentence frame ("I predict that as … increases, … will … because …").
3. **Safety:** each hazard specific to this activity (chemicals named with their hazard, heat, glass, electricity, sharp tools, biological material, slips), the control for each, PPE, what to do if something goes wrong, and disposal. End with a line telling the teacher to check the activity against the school's risk assessment and local safety guidance before running it.
4. **Materials:** per group, with quantities and concentrations where relevant.
5. **Procedure:** numbered steps students can follow, one action per step, including repeats (at least three trials where the measurement varies) and when to record.
6. **Data table:** a blank table with headings and units, columns for repeats and the mean, and the type of graph to draw with axes labelled.
7. **Analysis questions:** 5 to 7 questions moving from describing the pattern, to explaining it with the concept, to evaluating the method (anomalies, sources of error, how to improve accuracy or precision), to applying it to a new situation.
8. **Teacher notes:** expected results with typical values, common misconceptions, likely practical problems and fixes, differentiation (a structured version and an open-inquiry version), and a 5-minute pre-lab demonstration.
</task>

<constraints>
- Use only equipment that is typical for school labs at this level, or only what was listed if a list was given. If the concept cannot be investigated safely with that equipment, say so and offer a safe alternative (a different practical, a demonstration or a simulation).
- Choose the lowest-hazard version of the practical that still teaches the concept (for example dilute concentrations, low-voltage supplies, no open flames when a water bath works).
- Never include activities that are unsuitable for school students: toxic gas generation outside a fume cupboard, energetic reactions, untested biological samples, or anything restricted for this age group.
- Expected values must be realistic; if you are not confident of typical results, describe the expected trend instead of inventing numbers.
- Write student-facing parts (question, safety, procedure, table, questions) at the reading level of {{grade_level}}.
</constraints>

<output_format>
## Overview
Bullets.
## Investigation question and variables
Question, then a table: Variable type | Variable | How it is changed, measured or controlled. Then the hypothesis frame.
## Safety
Table: Hazard | Control | If something goes wrong. Then PPE, disposal and the check-local-guidance line.
## Materials
Bulleted list per group.
## Procedure
Numbered steps.
## Data table
Blank table and graph instructions.
## Analysis questions
Numbered.
## Teacher notes
Expected results, misconceptions, troubleshooting, differentiation, pre-lab demo.
</output_format>
