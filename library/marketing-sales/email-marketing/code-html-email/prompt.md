---
schema: 1
id: code-html-email
kind: prompt
title: Code a responsive HTML email
description: Builds a responsive HTML email from a design using table-based layout or MJML, with inline styles, Outlook fallbacks, dark-mode handling, accessible markup and a test plan across clients.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, designer, marketer]
stack: [html-css]
requires: [none]
inputs: [image, spec, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [html-email, email-coding, mjml, outlook-fixes, dark-mode]
pairs_with:
  prompts: [design-email-template, fix-email-rendering-issues, audit-html-email-accessibility]
args:
  - name: design
    description: The email design as a description, screenshot or spec - sections, widths, fonts, colours, images, buttons and copy.
    type: text
    required: true
  - name: approach
    description: Hand-coded table HTML or MJML, and the platform it will be pasted into (and whether it uses its own merge tags or editable regions). Optional; hand-coded table HTML if empty.
    type: string
    default: hand-coded table HTML
  - name: audience_clients
    description: The email clients that matter most from your reports (for example Apple Mail, Gmail app, Outlook for Windows). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Build notes, Code, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build HTML emails. Email HTML is not web HTML: classic Outlook for Windows renders with the Word engine, which ignores much modern CSS (flexbox, grid, many margins, background images without special markup), some webmail clients strip `<style>` blocks in certain contexts or rewrite class names, Gmail clips messages whose HTML is over about 102 KB (hiding everything below, often including the unsubscribe link), and dark mode may invert colours in some clients and not others. Reliable emails use nested tables with `role="presentation"`, inline styles for anything critical (with a `<style>` block for media queries and dark mode as progressive enhancement), fixed max-width around 600 to 640 px with fluid fallbacks, bulletproof buttons made from table cells (with conditional VML for Outlook where rounded corners matter), real text instead of text in images, alt text on every image, and `lang` and `dir` on the root. MJML compiles to this kind of markup and is easier to maintain if the team accepts a build step.
</context>

<task>
Code this email.

<design>
{{design}}
</design>
Approach: {{approach}}
{{#audience_clients}}Priority clients: {{audience_clients}}{{/audience_clients}}

1. **Build notes:** list the design decisions you had to make (widths, font stacks with safe fallbacks, how each section stacks on mobile, which effects degrade in Outlook) and any part of the design that will not render reliably, with the compromise you chose.
2. **Code:** produce the full email:
   - Document skeleton with doctype, `lang`, meta charset and viewport, the colour-scheme meta tags, and a hidden preheader with spacer.
   - Layout in `role="presentation"` tables (or MJML sections and columns), max-width wrapper, mobile stacking via media queries.
   - Inline critical styles; `<style>` block only for responsive and dark-mode rules.
   - Bulletproof buttons; Outlook conditional comments where needed.
   - Images with width, height, alt text and `display:block`; logos that work on dark backgrounds.
   - Merge tags or editable regions in the platform's format if supplied, otherwise clear placeholders.
   - A footer with unsubscribe and address placeholders.
3. Keep total HTML well below the clipping size and say the approximate size.
4. **Test plan:** the clients and modes to check (priority clients first, plus light and dark mode, mobile and desktop, images off), and what to look for in each.
</task>

<constraints>
- Do not use JavaScript, forms, external CSS files, web fonts without fallbacks, or CSS that the target clients do not support for critical layout.
- Keep text as live text; never put the main message only in an image.
- Do not claim exact client support from memory as fact; mark client-specific fixes as "verify in a rendering test".
- Use placeholders for image URLs and links; do not invent URLs.
</constraints>

<output_format>
## Build notes
Bullets.

## Code
One complete code block (HTML or MJML; if MJML, note the compile step).

## Test plan
A table: Client or mode | What to check.
</output_format>
