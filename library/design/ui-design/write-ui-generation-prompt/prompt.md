---
schema: 1
id: write-ui-generation-prompt
kind: prompt
title: Write a prompt for an AI UI builder
description: Writes a detailed prompt for an AI UI generator or coding agent to build one screen, with purpose, layout, components, real content, states, responsive rules, tokens and acceptance checks.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, product-manager, founder, frontend-engineer]
requires: [none]
inputs: [text, image, spec]
output: [prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-prototyping, ui-generation, screen-spec, vibe-coding, prototypes]
pairs_with:
  prompts: [write-spec-for-coding-agent, write-design-system-ai-instructions, create-wireframe-spec, derive-screen-inventory]
  personas: [product-designer]
args:
  - name: screen_idea
    description: What the screen is for, who uses it, the content and data it shows, actions, and any sketch, screenshot or reference description.
    type: text
    required: true
  - name: tech_and_style
    description: The tool or stack the output targets (an AI UI generator, React with a component library, Tailwind, SwiftUI), design tokens or brand colours and fonts, and existing components to reuse. Optional; without it the prompt stays stack-neutral.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Generation prompt, Follow-up prompts, Review checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI UI generators and coding agents produce generic screens from generic prompts: placeholder lorem ipsum, a hero section nobody asked for, only the happy state, inconsistent spacing, and inaccessible controls. They do much better when the prompt states the user and job, the layout region by region, the real content and data shapes, every state, responsive behaviour, the design tokens or component library to use, and what must not be added. Asking for one screen at a time and iterating with targeted follow-ups beats one giant prompt for a whole app.
</context>

<task>
<screen_idea>
{{screen_idea}}
</screen_idea>
{{#tech_and_style}}

<tech_and_style>
{{tech_and_style}}
</tech_and_style>
{{/tech_and_style}}

If the screen's purpose or content is unclear, ask and stop. If the idea covers several screens, write the prompt for the first and list the others.

1. **Assumptions.** List what you had to assume (platform, data, stack), so the user can correct them before generating.
2. **Generation prompt.** One self-contained prompt, ready to paste, with these parts:
   - Purpose: the user, their job, and the primary action.
   - Layout: regions top to bottom (and columns on wide screens), with hierarchy.
   - Components: each element with its type, label text and behaviour; reuse named components from the given library.
   - Content: realistic sample data with edge cases (long names, zero values, many items), never lorem ipsum.
   - States: empty, loading, error, disabled and success states, and validation messages.
   - Responsive rules: breakpoints and what changes.
   - Style: tokens or colours, typography, spacing scale, radius; or "use the library defaults" if none given.
   - Accessibility: semantic elements, visible labels, keyboard access and focus order, visible focus, WCAG 2.2 AA contrast (4.5:1 body text, 3:1 large text and UI components), targets at least 24 by 24 CSS px.
   - Do not: elements to avoid (extra marketing sections, invented features, placeholder images with text).
   - Output: what to return (single component file, page, preview) and how data is mocked.
3. **Follow-up prompts.** Three to five short prompts for the next iterations (add states, tighten spacing, connect to real data, adapt to mobile).
4. **Review checklist.** What to check in the generated result before accepting it.
</task>

<constraints>
- Do not write prompts that copy a real company's branded screens, logos or name, especially sign-in or payment pages; offer a generic version instead.
- Do not name a specific AI product as required; keep the prompt usable in any generator or coding agent unless the user named one.
- Use real, plausible sample content; no personal data of real people.
- Do not invent features beyond the screen idea; list suggestions separately as optional.
- Keep the generation prompt under about 600 words; split into follow-ups if more is needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Generation prompt
In one fenced text block, ready to paste.
## Follow-up prompts
## Review checklist
</output_format>
