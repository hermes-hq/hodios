---
schema: 1
id: invent-with-sit-templates
kind: prompt
title: Invent with SIT templates
description: Applies the five Systematic Inventive Thinking templates - subtraction, division, multiplication, task unification, attribute dependency - to a product or service using only its own parts.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, design]
role: [product-manager, designer, founder, engineering-manager]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [systematic-inventive-thinking, closed-world, product-innovation, inside-the-box, ideation-technique]
pairs_with:
  prompts: [run-scamper-session, solve-contradiction-with-triz, run-morphological-analysis]
args:
  - name: subject
    description: The product, service or process to innovate on, with its main parts, who uses it and in what setting. For example "a bike rental station in a city park".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Components and attributes, Subtraction, Division, Multiplication, Task unification, Attribute dependency, Function follows form, Best concepts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Systematic Inventive Thinking (SIT), developed from TRIZ by Roni Horowitz, Jacob Goldenberg and colleagues, works "inside the box". It relies on the closed-world principle: good inventions tend to use only components already present in the product or its immediate surroundings. It also reverses the usual direction: first apply a template to make a strange virtual product, then ask who would want it and why ("function follows form"). The five templates are: Subtraction (remove an essential component and find value in what remains), Division (split a component off physically, functionally or in time), Multiplication (copy a component but change it), Task unification (give an existing component an extra job), and Attribute dependency (make one attribute change with another, such as price with time of day). Novices apply templates to add features from outside, which is not SIT; or they reject a strange virtual product before asking what it would be good for.

<subject>
{{subject}}
</subject>
</context>

<task>
1. List the internal components of the subject and the components in its immediate environment (users, setting, nearby objects). Then list variable attributes (price, size, colour, time, location, speed, user type). If the subject is too vague to list components, ask up to two questions and stop.
2. Apply each template at least three times to different components or attribute pairs. For each, first write the virtual product in one line, then ask "who would want this, and for what?", then write the benefit or "no clear benefit".
   - Subtraction: remove an essential component, ideally without replacing it from outside.
   - Division: separate a component physically, functionally or in time, and rearrange.
   - Multiplication: add a copy of a component, changed in some way.
   - Task unification: an existing component (or a user, or the environment) takes on an extra task.
   - Attribute dependency: make an attribute depend on another that it does not depend on today.
3. Flag any idea that brings in a new component from outside the closed world, and keep it only if marked as such.
4. Choose the five best concepts and describe each: what it is, who benefits, how it could work, the main risk and a cheap test.
</task>

<constraints>
- Keep to the closed world; mark any outside addition explicitly.
- Write the virtual product before the benefit, as the method requires; do not reject a virtual product without asking who might want it.
- Do not invent facts about the market, costs or safety; mark risks and what to check, including any safety or regulatory aspects.
- One line per virtual product and per benefit.
</constraints>

<output_format>
## Components and attributes
Two bullet lists: components (internal, environment) and attributes.

## Subtraction
Table: Virtual product | Who would want it, for what | Benefit or none.

## Division
Same table.

## Multiplication
Same table.

## Task unification
Same table.

## Attribute dependency
Same table.

## Function follows form
Short note on any outside additions flagged and which strange forms turned out useful.

## Best concepts
Numbered list of five: concept, who benefits, how it works, main risk, cheap test.
</output_format>
