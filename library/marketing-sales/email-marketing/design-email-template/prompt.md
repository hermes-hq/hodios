---
schema: 1
id: design-email-template
kind: prompt
title: Specify a reusable marketing email template
description: Specifies a reusable marketing email template system with layout, modules, typography, mobile behaviour, accessibility and dark-mode checks. Use before a designer or developer builds templates.
category: email-marketing
version: 1.1.0
status: incubating
stage: [design]
role: [marketer, designer, frontend-engineer]
stack: [html-css]
requires: [none]
inputs: [text, spec, image]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [email-design, email-modules, dark-mode, email-accessibility, responsive-email]
pairs_with:
  prompts: [write-promo-email, audit-email-deliverability, write-email-sequence]
  personas: [copywriter]
args:
  - name: brand
    description: Brand colours with hex values, fonts used on the website, logo variants (including a version for dark backgrounds), tone, the email platform or builder you use, and any current template problems.
    type: text
    required: true
  - name: email_types
    description: The emails the template must support (for example "weekly newsletter, product launch, promo, abandoned cart, order confirmation"), and how often each is sent.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Principles, Layout grid, Module library, Typography and colour, Mobile and dark mode, Accessibility, Recipes, QA checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "A missing platform gives a platform-agnostic spec instead of stopping, and recipes are their own section with the modules each email type must never use."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an email designer and developer who builds template systems for marketing teams. Email is not the web: rendering differs widely across mail clients (some desktop clients use a word-processor rendering engine, some webmail clients strip styles, and dark mode can invert colours unpredictably), many readers have images off by default, and most opens are on phones. A good template system is a small library of tested modules that marketers combine without breaking anything: a single-column, mobile-first layout around 600 pixels wide, live text rather than text in images, web-safe font fallbacks, large tap targets, and colours that survive dark mode. Accessibility is part of the spec, not an extra: semantic structure, a sensible reading order, alt text, sufficient contrast and a language attribute.
</context>

<task>
Specify a reusable email template system.

<brand>
{{brand}}
</brand>

<email_types>
{{email_types}}
</email_types>

1. If brand colours or fonts are missing, ask in one message and stop: the type and colour specs depend on them. If the email platform is missing, write the spec platform-agnostic, say so in one line at the top, and name the one thing that would change once the platform is known (saved blocks, drag-and-drop sections or coded templates).
2. Principles: five or six rules that the whole system follows (for example one primary action per email, live text for every key message, mobile first).
3. Layout grid: container width, outer and inner padding, column behaviour (single column by default, two columns that stack on mobile only where needed), spacing scale, and the preheader and header area.
4. Module library: the 10 to 15 modules needed to build every email type listed (header, hero with image, hero text-only, text block, button, product card or grid, two-column feature, quote or review, divider, coupon or offer block, image with caption, social and footer, transactional details table). For each: purpose, content fields and their limits (headline length, image ratio and size), variants, and which email types use it.
5. Typography and colour: font stack with web-safe fallbacks, sizes for headings, body (at least about 14 to 16 pixels) and small print, line height, button style (height of at least about 44 pixels, padding, bulletproof button built with code rather than an image), the colour palette with roles, and contrast ratios checked against WCAG AA.
6. Mobile and dark mode: stacking rules, font size changes, image scaling, hiding nothing essential on mobile, and dark-mode handling (transparent PNG logos with a dark-background version or outline, avoiding pure black and white, testing colour inversion in clients that force it, and the meta and media queries the platform supports).
7. Accessibility: a lang attribute, role="presentation" on layout tables, heading order, alt text rules (descriptive for content images, empty for decorative ones), link text that makes sense alone, no information conveyed by colour alone, and minimal text in images.
8. Recipes: for each email type listed, the modules in order, and the modules it must never use (for example no coupon or product grid in an order confirmation).
9. QA checklist for every new email built from the template.
</task>

<constraints>
- Do not claim exact support for a CSS feature in a specific client unless the user supplied it; tell them to verify with an email testing tool or a support reference and test on real clients.
- Keep the module count small enough to maintain; merge modules that differ only in content.
- Transactional email types stay free of promotional modules where the law or deliverability practice requires it; footers on marketing emails include unsubscribe and postal address.
- The spec is platform-agnostic unless a platform is named; if one is named, map modules to its features (saved blocks, drag-and-drop sections or coded templates).
</constraints>

<output_format>
## Principles
Numbered.

## Layout grid
Bullets with values.

## Module library
A table: Module | Purpose | Fields and limits | Variants | Used in.

## Typography and colour
A table of type styles, a table of colours with role and contrast ratio, and the button spec.

## Mobile and dark mode
Bullets.

## Accessibility
A checklist.

## Recipes
A table: Email type | Modules in order | Never use.

## QA checklist
A checklist for each new email, including a test send to several clients, images-off view, dark mode, links, tracking parameters, plain-text version and spam-word scan.
</output_format>
