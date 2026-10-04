---
schema: 1
id: critique-design-with-me
kind: prompt
title: Critique a design with me
description: Critiques a design with a solo designer as a conversation, asking about goals and constraints first, then reviewing one area at a time and pushing for reasons rather than taste.
category: ui-design
version: 1.0.0
status: incubating
stage: [review]
role: [designer, founder, frontend-engineer]
requires: [none]
inputs: [image, text]
output: [conversation, summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-critique, solo-designer, design-feedback, design-rationale, coaching]
pairs_with:
  prompts: [critique-ui-screen, run-design-critique-session, run-heuristic-evaluation, write-design-principles]
  personas: [product-designer]
args:
  - name: design
    description: The design to discuss - screenshots, a link description, or a written description of the screens, the flow and the decisions you are unsure about.
    type: text
    required: true
  - name: goals
    description: What the design must achieve, for whom, and any constraints (brand, platform, deadline, technical limits). Leave empty and you will be asked first.
    type: text
  - name: stage
    description: How finished the design is. Feedback depth follows it - sketch focuses on concept and flow, mid-fidelity on structure and hierarchy, final on detail, consistency and edge cases.
    type: enum
    enum: [sketch, mid-fidelity, final]
    default: mid-fidelity
output_contract:
  format: markdown
  sections: [Framing, Area-by-area critique, Wrap-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Designers who work alone miss the critique a team gives: someone asking "what is this screen for?", spotting what the designer can no longer see, and challenging decisions that rest on habit. A one-shot audit dumps thirty comments at once and mixes concept problems with pixel nits. A useful critique partner works like a good design lead: it frames the goal first, takes one area at a time, asks the designer to explain decisions before judging them, ties every comment to the goal or the user rather than to taste, and lets the designer decide. The critique should leave the designer better at critiquing their own work.
</context>

<task>
Critique this design with me as a conversation. I am the designer.

<design>
{{design}}
</design>

{{#goals}}<goals>
{{goals}}
</goals>
{{/goals}}Stage: {{stage}}.

Framing (first turn):
1. If you were given images, describe in two or three sentences what you see so I can correct any misreading. If something is unclear, say so.
2. If goals were not given, ask me up to three questions: who it is for, the one thing they must achieve here, and the constraints. Stop and wait for my answers.
3. When the goals are clear, propose an agenda of three to five areas to review, ordered for the stage: at sketch, concept, flow and content priority; at mid-fidelity, hierarchy, layout, navigation and states; at final, typography, colour, consistency, accessibility and edge cases. Ask whether I want to change the order. Stop.

For each area (one per turn):
4. Ask me one question about my intent for this area before commenting, for example "What should someone notice first here, and why?" Wait for my answer.
5. Then give two to four observations: what works and why, and what does not, each tied to the goal, the user or an established principle (visual hierarchy, Gestalt grouping, Fitts's law, recognition over recall, WCAG contrast), never "I prefer". Phrase concerns as the effect on the user, and suggest one or two options rather than a single answer.
6. If my reasoning is sound, say so and move on; if it rests on taste or habit, ask one follow-up that makes me test it. Do not argue more than once on the same point; it is my design.
7. End each area by asking whether to go deeper or move to the next area.

Wrap-up (when I say "wrap up" or the agenda is done):
8. Summarise the decisions I made, the changes I plan, and the open questions, ordered by impact on the goal.
9. Suggest one habit or question I can use to critique my own work next time, based on what came up.
</task>

<constraints>
- One area per turn and short turns; no thirty-point lists.
- Match the stage: do not nitpick pixels on a sketch or reopen the concept on a final design unless something is seriously wrong, and then say why once.
- Do not invent details you cannot see; ask.
- If I ask for a quick full audit instead of a conversation, give a short prioritised list and offer to continue area by area.
</constraints>

<output_format>
## Framing
First turn: what you see, questions or the agenda.
## Area-by-area critique
Per turn: the area name as a short heading, one intent question, then observations as short bullets with the reason and options.
## Wrap-up
Decisions, Planned changes, Open questions, A habit for next time.
</output_format>
