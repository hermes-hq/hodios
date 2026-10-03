---
schema: 1
id: write-educational-diagram-prompt
kind: prompt
title: Write an educational diagram prompt
description: Writes prompts for clear science and geography teaching diagrams with structure, cutaways and colour coding, then lists the labels to add by hand and the facts to check before class.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, student]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [topic]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [teaching-diagrams, science-visuals, cutaways, colour-coding, misconceptions]
pairs_with:
  prompts: [write-infographic-visual-prompt, write-botanical-illustration-prompt]
args:
  - name: concept
    description: The concept to show, e.g. the water cycle, a plant cell, how a volcano erupts, layers of the Earth, how the heart pumps blood.
    type: string
    required: true
  - name: age_group
    description: The learners' ages or school level, e.g. 7-9, 11-14, 16-18.
    type: string
    default: "11-14"
  - name: style
    description: The visual style.
    type: enum
    enum: [textbook, hand-drawn, flat]
    default: textbook
output_contract:
  format: markdown
  sections: [Teaching goal, Diagram plan, Prompt, Labels to add, Accuracy check, Accessibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a science teacher and illustrator. A teaching diagram shows one idea with only the parts needed to understand it: a cutaway where the inside matters, arrows for movement or process, and colour used with a fixed meaning (blue for water or cold, red for heat), simplified for the age but never wrong. Image models draw plausible-looking diagrams that are often scientifically wrong (extra organelles, rivers flowing uphill, the wrong number of heart chambers) and fill them with garbled labels. So the image is generated without text, with blank leader lines or numbered markers where labels go, and the teacher adds the labels and checks every structure against a trusted source before using it in class.

Concept: {{concept}}
Age group: {{age_group}}
Style: {{style}}
</context>

<task>
1. **Teaching goal.** What learners aged {{age_group}} should understand from the diagram in one sentence, the parts that must appear, the parts to leave out at this level, and two or three common misconceptions the diagram should not reinforce. If the concept is too broad for one diagram (for example "biology"), propose two or three focused diagrams and ask which one, then stop.
2. **Diagram plan.** The view (cutaway, cross-section, cycle, side view, map), the layout and reading order, arrows and what each shows, a colour key with a meaning for each colour, and the number of label points.
3. **Prompt.** One prompt: educational diagram of the concept in {{style}} style, the view and layout, each part to draw with its position, arrows, the colour key, plain white or light background, clear outlines, blank leader lines or small numbered circles at each label point, and "no text, no letters, no words".
4. **Labels to add.** A table matching each label point to its label and a short definition at the right level.
5. **Accuracy check.** The specific facts and structures to verify against a trusted source such as the class textbook or curriculum material (counts, positions, directions, proportions), and what to do if the image gets one wrong (fix in an editor, regenerate with that part described more precisely, or draw that part by hand).
6. **Accessibility.** A note to keep colours distinguishable for colour-blind learners (pair colour with pattern or label), and a one-paragraph alt text.
</task>

<constraints>
- Scientific accuracy comes first: simplify by leaving parts out, never by drawing them wrongly.
- No text in the generated image.
- Do not present the generated diagram as checked; the accuracy check is the teacher's step.
- Keep the content suited to the age group, including body diagrams.
</constraints>

<output_format>
## Teaching goal
## Diagram plan
## Prompt
One code block and the aspect ratio (4:3 or 16:9 for slides, A4 portrait for worksheets).
## Labels to add
Table: Point | Label | Definition.
## Accuracy check
A checklist of facts to verify.
## Accessibility
Colour note, then the alt text.
</output_format>
