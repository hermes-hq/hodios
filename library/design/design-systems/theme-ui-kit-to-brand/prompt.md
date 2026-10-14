---
schema: 1
id: theme-ui-kit-to-brand
kind: prompt
title: Theme a UI kit to your brand
description: Maps brand colours, type, radius and shadows onto a UI kit such as MUI, shadcn/ui, Chakra or Mantine, producing the theme file, component overrides and a contrast check.
category: design-systems
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, designer]
stack: [react, typescript]
requires: [repo-read, file-write]
inputs: [repo, file, text, image]
output: [code, diff, report]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [theming, ui-kit, brand-colours, component-overrides, color-contrast]
pairs_with:
  prompts: [choose-component-library-foundation, define-design-tokens, design-dark-mode, plan-multi-brand-theming]
  personas: [design-systems-lead]
args:
  - name: kit
    description: The UI kit and where it is set up in the repository (for example "MUI in src/theme", "shadcn/ui with Tailwind", "Chakra UI").
    type: string
    required: true
  - name: brand
    description: Brand colours with hex values, typefaces and weights, corner radius, shadow style, and any brand guideline excerpts or screenshots.
    type: text
    required: true
  - name: scope
    description: Optional. Themes needed (light, dark), components that must look custom, and what must stay stock.
    type: text
output_contract:
  format: markdown
  sections: [Kit and version, Brand mapping, Contrast check, Theme changes, Component overrides, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Theming a kit goes wrong in three ways. First, a single brand colour is dropped into the primary slot without its companions: hover and pressed shades, a readable foreground on top of it, and a version that works in dark mode. Many brand colours that look good on a logo fail as text on white or as a button background behind white text, so the kit needs a darker or lighter shade for those roles. Second, the brand is forced in with deep CSS selectors against generated class names, which break on the next kit upgrade; every mainstream kit has a supported theme API (MUI `createTheme` with palette, typography, shape and `components` style overrides and default props; shadcn/ui CSS variables in the global stylesheet plus editing the copied component source; Chakra and Mantine theme or system configuration), and its shape differs between major versions. Third, the theme is set up without checking which kit version is installed, so the code follows the wrong major version's API. A good theme also changes fewer components than people expect: most brand character comes from colour roles, type, radius and shadow.
</context>

<task>
Theme the {{kit}} setup in this repository to the brand.

<brand>
{{brand}}
</brand>
{{#scope}}

<scope>
{{scope}}
</scope>
{{/scope}}

1. **Kit and version.** Read the dependency manifest and existing theme files. State the installed kit and major version, where theming happens today and which API that version expects. If the kit is not installed or cannot be found, stop and say so.
2. **Brand mapping.** Map brand values to the kit's theme slots: colour roles (primary, secondary, neutral, background, surface, text, error, warning, success, info, borders, focus ring) with hover and active shades and foreground colours; typography (families, weights, sizes per variant); radius; shadows or elevation. Where the kit needs values the brand does not define (for example a ten-step shade scale), derive them and mark them derived.
3. **Contrast check.** Compute contrast for each foreground-on-background pair the theme creates (text on background, text on primary button, links, focus ring against adjacent colours) in each theme, against 4.5:1 for text and 3:1 for UI components and large text. Where a brand colour fails, use a darker or lighter shade for that role and say so.
4. **Theme changes.** Write the theme using the installed version's supported API, in the existing theme file if there is one. Include dark mode if requested.
5. **Component overrides.** Only for components the scope says must look custom, or where the theme alone cannot express the brand. Use the kit's override mechanism, not selectors against generated class names.
6. **Verification.** Run the type check and any build or test command the repository already uses, and list the screens or stories to check visually. Report what you ran and its result.
</task>

<constraints>
- Use the API of the installed kit version; do not mix APIs from different major versions.
- Do not use `!important` or selectors against generated class names.
- Do not change component behaviour or props while theming.
- Use only brand values given; derived values are labelled.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Brand mapping and contrast as tables, changes as diffs or fenced code. End with Open questions.
</output_format>
