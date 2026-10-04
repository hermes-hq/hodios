---
schema: 1
id: create-wireframe-spec
kind: prompt
title: Write a text wireframe spec
description: Writes a low-fidelity text wireframe for one screen with layout regions, components, content hierarchy, all states and responsive behaviour. Use before visual design or to brief a developer.
category: ui-design
version: 1.0.1
status: incubating
aliases: [design-wireframe]
stage: [design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [docs, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [wireframe, information-architecture, ui-states, responsive-design]
pairs_with:
  prompts: [critique-ui-screen, write-component-spec, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: screen_purpose
    description: What the screen is for, who uses it, the main task, and where the user comes from and goes next.
    type: text
    required: true
  - name: content
    description: The data, fields and actions the screen must show, with realistic examples and volumes (e.g. "0 to 500 orders, each with id, customer, total, status"). Optional.
    type: text
  - name: platform
    description: Target layout. web covers desktop and tablet with a narrow-screen fallback; mobile is a native or mobile-first layout.
    type: enum
    enum: [web, mobile]
    default: web
output_contract:
  format: markdown
  sections: [Summary, Layout, Regions, States, Responsive behaviour, Interactions, Accessibility notes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id design-wireframe."}
---
<context>
A wireframe settles structure before anyone argues about colour: what is on the screen, in what order of importance, and how it behaves. Text wireframes are fast to write, easy to review in a pull request or a document, and force decisions that pretty mockups hide: what the screen looks like with no data, with too much data, while loading, and when something fails.
</context>

<task>
Write a low-fidelity {{platform}} wireframe spec for this screen.

<screen_purpose>
{{screen_purpose}}
</screen_purpose>
{{#content}}
<content>
{{content}}
</content>
{{/content}}

1. Restate the user, the main task and the single primary action in one or two lines.
2. Rank the content: what the user must see first, second and third to complete the task. Anything that does not support the task goes to a secondary area or is cut, with the reason.
3. Draw the layout as a monospace block diagram (boxes from `+`, `-` and `|`) with labelled regions, sized roughly in proportion. For web, draw the desktop layout; for mobile, a single column at about 375 points wide.
4. Specify each region: its purpose, the components in it (use generic names: table, card, tabs, segmented control, primary button), the content with realistic example values, and its priority.
5. Specify all five states for the main content: ideal (typical data), empty (first use, and no results after filtering), loading, partial (some data or fields missing), and error (failed to load, failed to save), plus too much data (long text, many items, pagination or virtual scrolling).
6. Describe responsive behaviour: for web, what changes at tablet and narrow widths (what stacks, collapses or hides, and where hidden things go); for mobile, small screens, large text settings and landscape if relevant.
7. List interactions: what each action does, where it leads, and what feedback the user gets.
8. Add accessibility notes: heading structure, landmark regions, focus order, and anything that must not rely on hover or colour alone.
9. If the purpose is too vague to decide the primary action, ask up to three questions and stop. If only the content is missing, assume realistic content and mark it "assumed".
</task>

<constraints>
- Stay low fidelity: no colours, fonts or exact pixel values. Use relative sizes and component names.
- Do not add features the purpose does not need. Put tempting extras in Open questions.
- Use realistic example content, never lorem ipsum, so that length and density problems show up.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
User, task, primary action.
## Layout
The monospace diagram in a code block.
## Regions
| Region | Purpose | Components and content | Priority |
## States
Ideal, empty, loading, partial, error and too-much-data, each described for the regions it affects.
## Responsive behaviour
## Interactions
| Element | Action | Result and feedback |
## Accessibility notes
## Open questions
</output_format>
