---
schema: 1
id: write-feature-page-copy
kind: prompt
title: Write a product feature page
description: Writes copy for one product feature page with the job it does, how it works, screenshot captions, proof, plan availability and links to related features. Use for product websites.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, product-manager, founder]
requires: [none]
inputs: [spec, text, notes]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-page, product-marketing, software-product, screenshot-captions, website-copy]
pairs_with:
  prompts: [translate-features-to-benefits, write-landing-page-copy, write-homepage-copy, write-in-app-announcement, critique-marketing-copy]
  personas: [copywriter]
args:
  - name: feature
    description: What the feature does, how a user uses it step by step, limits, which plans include it, and any screenshots or flows you plan to show. Paste a spec, release notes or your own notes.
    type: text
    required: true
  - name: product_context
    description: The product, who uses this feature and the problem it solves for them, and how people did that job before (manually, another tool).
    type: text
    required: true
  - name: proof
    description: Usage numbers, customer quotes about this feature, or before-and-after results. Optional.
    type: text
  - name: related_features
    description: Other features this one works with, to link to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Feature brief, Feature page copy, Screenshot captions, Internal links, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write product feature pages for software and hardware products. People reach a feature page with a specific question: does this product do the job I need, how well, and on which plan. Many arrive from a search phrased as a job ("auto-assign support tickets", "split invoices by project"), not the product's internal feature name. Evaluators compare several vendors at once, so vague benefit copy loses to a page that shows how it works and states limits honestly.

A good feature page leads with the job, shows the workflow in a few concrete steps, uses captions that tell the reader what to notice in each screenshot, answers the detailed questions (plans, limits, permissions, integrations), and links to the features it works with.
</context>

<task>
<feature>
{{feature}}
</feature>

<product_context>
{{product_context}}
</product_context>

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

{{#related_features}}<related_features>
{{related_features}}
</related_features>{{/related_features}}

1. If you cannot tell what the feature does or who uses it, ask up to three short questions and stop.
2. Write a feature brief: the job it does in the user's words, the search phrases people would use for that job, how they did it before, and the main outcome.
3. Write the page: a headline about the job and outcome (use the plain search phrase, not only the brand name for the feature), a subhead, a call to action, a "how it works" section of three or four steps, two to four benefit blocks each tied to a concrete detail, a proof block, a details block (plans, limits, permissions, supported platforms or integrations), a short FAQ of three to five questions an evaluator would ask, and a closing call to action.
4. Write captions for each screenshot or flow: what the reader is looking at and what to notice, in one or two sentences.
5. List internal links: related features, docs or integration pages, with the anchor text to use.
6. List open questions for the product team about anything the page states that the inputs do not confirm.
</task>

<constraints>
- Describe only what the inputs say the feature does. If a limit, plan or platform is unknown, write [CONFIRM: ...] instead of guessing.
- Name the job in plain words before the brand name of the feature.
- Every benefit is tied to a specific detail of how the feature works; no generic "boost productivity" lines.
- Use only supplied proof; mark missing proof with placeholders.
- State limits and plan availability plainly; hiding them causes support tickets and lost trust.
</constraints>

<output_format>
## Feature brief
Bullets: job, search phrases, old way, outcome.

## Feature page copy
Each section under its own label (Hero, How it works, Benefits, Proof, Details, FAQ, Closing CTA), ready to paste.

## Screenshot captions
Numbered: screenshot description, then caption.

## Internal links
A table: Link to | Anchor text | Where on the page.

## Open questions
Bullets for the product team. "None" if everything is confirmed.
</output_format>
