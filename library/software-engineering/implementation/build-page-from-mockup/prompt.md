---
schema: 1
id: build-page-from-mockup
kind: prompt
title: Build a responsive page from a mockup
description: Turns a design mockup or screenshot into a responsive, semantic page layout in HTML and CSS or Tailwind, reusing existing components and tokens and listing what the image could not tell.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, designer]
stack: [html-css]
requires: [repo-read, file-write, shell]
inputs: [image, repo, spec]
output: [code]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-to-code, responsive-layout, mobile-first, semantic-html, landmarks]
args:
  - name: mockup
    description: The mockup or screenshot (attached), and which page or route it becomes.
    type: text
    required: true
  - name: breakpoints
    description: Other screen sizes provided or expected, for example "desktop mockup only; must work on phones".
    type: text
output_contract:
  format: markdown
  sections: [Layout reading, Changes, Assumptions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A static mockup shows one screen width, one content length and no interaction. Pages built straight from it come out pixel-pinned: fixed widths and heights that break with real text, absolute positioning that collapses on phones, a fresh set of colours and spacings that ignore the design system, `div`s where headings, lists and landmarks belong, and invented hover, focus and empty states. Experienced front-end developers read the layout as a grid of sections first, map every element to an existing component or token, and write down what the image does not say.
</context>

<task>
Build this page from the mockup:

{{mockup}}

{{#breakpoints}}
Breakpoints: {{breakpoints}}
{{/breakpoints}}

1. Read the project first: component library, design tokens or Tailwind theme (colours, spacing scale, type scale, radii), layout primitives, and one existing page of similar shape. List the components you can reuse.
2. Read the mockup as structure: page regions (header, nav, main, aside, footer), sections top to bottom, the grid in each (columns, gaps, alignment), and repeated patterns that should be one component.
3. Map every colour, font size, spacing and radius to the nearest existing token. Where nothing is close, add a token only if it is clearly intended, and list it under Assumptions.
4. Write semantic HTML: one `h1`, headings in order, lists for repeated items, `nav`, `main`, `button` for actions and `a` for navigation, `img` with meaningful `alt` (or empty `alt` for decoration), labelled form fields.
5. Lay out mobile first with flexbox or grid and the project's breakpoints. Use `max-width`, `minmax`, `clamp()` and wrapping instead of fixed pixel widths and heights; make images responsive with sizes and aspect ratios to avoid layout shift.
6. Test resilience: longer text, missing images, many or zero items in repeated sections, and 200% zoom.
7. Use the mockup's copy where it is real; mark placeholder text and images clearly rather than inventing product claims.
8. Run the dev build, the linter and any visual or component tests, and check the page at phone, tablet and desktop widths if you have a browser tool; otherwise say you could not.
</task>

<constraints>
- Do not use absolute positioning or fixed heights for normal content flow.
- Do not invent interactions, hover effects or states the mockup does not show; implement sensible defaults from the design system and list them under Assumptions.
- Do not create a parallel set of colours or spacings when tokens exist.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Layout reading
Regions and sections, the grid of each, and the components reused or created.

## Changes
One line per file: `path`, what changed.

## Assumptions
What the mockup did not specify and what you chose: other breakpoints, states, interactions, new tokens.

## Verification
Commands run, widths checked, and their real results.
</output_format>
