---
schema: 1
id: check-font-licence
kind: prompt
title: Check a font licence for your use
description: Checks whether a font's licence covers what you plan - logo, print, website, app, ebook, video or merchandise - finds the gaps and lists the upgrade, alternative or question for the foundry.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review]
role: [designer, graphic-designer, founder, marketer]
subject: [law]
requires: [none]
inputs: [text, document]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [font-licensing, typography, webfonts, eula, design-assets]
pairs_with:
  prompts: [check-stock-asset-licence, pair-typefaces, package-logo-files]
args:
  - name: licence
    description: The font's licence text or the key parts of it, the font name and where you got it (foundry, marketplace, free font site, bundled with software).
    type: text
    required: true
  - name: planned_use
    description: Every way the font will be used - logo, print, website, app, ebook, video, social graphics, merchandise for sale, templates for customers - with rough volumes (page views, installs, print runs) and whether a client will use the files.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Licence in brief, Use by use, Gaps and risks, Options, Question for the foundry]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check font licences the way a studio production manager does before a job ships. Fonts are software licensed per use, and the common licence types differ: desktop (install on a set number of computers to make static artwork), webfont (serve on a website, often capped by page views or domains), app (embed in an application), ebook or digital publication, broadcast or video, and server or template licences for products where customers generate output. Free fonts range from open licences that allow almost anything except selling the font itself, to "free for personal use" fonts that exclude any commercial use. Typical traps: a designer's desktop licence does not transfer to the client; a logo made with a font is usually fine but the client may need their own licence to make more material; personalisation or print-on-demand products and templates often need a special licence; and converting or embedding font files can break the terms.
</context>

<task>
<licence>
{{licence}}
</licence>

<planned_use>
{{planned_use}}
</planned_use>

1. Licence in brief: licence type, licensee, number of users or devices, limits (page views, installs, impressions), restrictions (modification, embedding, logos, merchandise, templates), quoting the clauses that decide each point.
2. Use by use: for each planned use, say covered, not covered, or unclear, with the clause that decides it.
3. Gaps and risks: where use goes beyond the licence, who would need a licence (the designer, the client, the developer), and the practical risk.
4. Options: buy the missing licence type, switch to an open-licence alternative of similar style (described, not invented as a named product unless you are confident it exists under that licence), outline the logo text as artwork where the licence allows, or ask the foundry.
5. Question for the foundry: a short email asking exactly about the unclear uses.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Base every answer on the licence text given. If the text is missing or partial, say which uses cannot be checked and ask for the clause.
- Do not quote prices for licences or invent foundry policies.
- Do not suggest ways to hide unlicensed use (renaming files, subsetting to disguise the font).
{{> output/uncertainty}}
</constraints>

<output_format>
## Licence in brief
Bullets with quoted clauses.

## Use by use
Table: use | covered? | clause | note.

## Gaps and risks
Bullets.

## Options
Numbered.

## Question for the foundry
Short email.
</output_format>
