---
schema: 1
id: build-diy-brand-kit
kind: prompt
title: Build a DIY brand kit for a small business
description: Builds a low-budget brand kit for a small business with a positioning line, a logo direction to brief or make, colours, fonts, photo style and the first templates to create.
category: branding
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, individual, marketer]
requires: [none]
inputs: [text, preferences]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [local-business, brand-kit, diy-design, low-budget, free-fonts, brand-starter]
pairs_with:
  prompts: [design-logo-concepts, create-color-palette, pair-typefaces, design-social-media-templates, design-business-card]
  personas: [brand-strategist]
args:
  - name: business
    description: What the business does, where, what makes it different, how customers find it today, and anything you already have (a name, a sign, a logo you like or dislike, colours you are attached to).
    type: text
    required: true
  - name: audience
    description: Who the main customers are, for example "busy parents in the neighbourhood" or "small restaurants needing weekly flower deliveries".
    type: string
    required: true
  - name: budget
    description: What you can spend on branding, for example "very-low" (free tools, do it yourself), "a few hundred" (can pay a freelancer for a logo), or an amount and currency.
    type: string
    default: very-low
output_contract:
  format: markdown
  sections: [Positioning, Logo direction, Colours, Fonts, Photo and image style, Voice in a nutshell, Templates to make first, One-page brand sheet, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bakery, a plumber or a one-person consultancy does not need an agency brand process, but it does need to look consistent and trustworthy on its sign, menu, van, social posts and invoices. Without a kit, small businesses end up with five versions of the logo, random colours each time, clip-art fonts and stock photos that look like every competitor. A small, well-chosen kit (a clear positioning line, a simple logo that works small and in one colour, two or three colours, two fonts that are free to use, a photo style, and a handful of templates) gets most of the benefit for very little money, and can be made in free design tools or briefed to a freelancer.
</context>

<task>
Build a brand kit for this business.

<business>
{{business}}
</business>

Audience: {{audience}}. Budget: {{budget}}.

1. **Positioning:** one line that says who it is for, what it offers and why choose it, plus two alternatives. Base it on what makes the business different in the input; if nothing distinctive is given, ask one question about it at the end and offer a provisional line.
2. **Logo direction:** recommend the logo type that suits the business and budget (a wordmark in a well-chosen font is often best for very low budgets; a simple symbol plus wordmark if budget allows). Give two concrete directions, each with the idea, the font style, how it looks in one colour and at small sizes (a profile picture, a stamp), and what to avoid (thin details, gradients, generic icons such as a light bulb or a globe). Then either step-by-step instructions to make it in a free design tool, or a short brief to give a freelancer, depending on the budget. Remind the user to check that the name and logo do not clash with a local competitor or a registered trademark.
3. **Colours:** a palette of one primary, one accent and neutrals, with hex values, the role of each, and which text colours are readable on which backgrounds (mark contrast "to verify with a free contrast checker"). Explain the choice in terms of the audience and competitors, not colour psychology clichés.
4. **Fonts:** a heading and a body font that are free for commercial use (for example from an open-licence font library), why they suit the business, and a fallback. Only name fonts you are confident exist under an open licence, and tell the user to confirm the licence where they download it.
5. **Photo and image style:** what to photograph (real products, the team, the place, customers with permission), lighting and framing tips for a phone camera, a consistent edit, and what to avoid (generic stock, heavy filters).
6. **Voice in a nutshell:** three words for how the business sounds, with a do and don't example sentence each.
7. **Templates to make first:** the five to eight items that matter most for this business and audience (for example a social post, a story, a price list or menu, a flyer, a business card, an email signature, an invoice header, a sign), each with format and what goes on it, ordered by impact.
8. **One-page brand sheet:** a compact summary of everything above that the owner can print or share with anyone making something for them.
9. **Next steps:** a short checklist for the next two weeks, and what to invest in first if the budget grows.
10. Before answering, check that every recommendation can be done within the stated budget, and replace anything that cannot.
</task>

<constraints>
- Keep it practical for a non-designer: plain words, specific steps, no agency jargon.
- Never suggest copying another business's logo, name or look.
- Do not present trademark checks as legal clearance; say a local search is a first step and a professional check is needed before heavy investment.
</constraints>

<output_format>
Markdown with the contract's sections in order. Colours as a table (Role, Name, Hex, Use, Readable text colour). Templates as a table (Template, Format, Contents, Priority). The one-page brand sheet in a fenced Markdown block.
</output_format>
