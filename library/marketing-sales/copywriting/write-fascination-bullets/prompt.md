---
schema: 1
id: write-fascination-bullets
kind: prompt
title: Write fascination bullets
description: Writes curiosity-driven benefit bullets for a sales page, email or opt-in page that tease what the reader will learn or get, each tied to real content and free of false promises.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, content-creator, founder]
requires: [none]
inputs: [text, document]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [bullets, curiosity, sales-page, opt-in-page, direct-response]
pairs_with:
  prompts: [write-sales-page, write-headline-variations, create-lead-magnet, translate-features-to-benefits]
  personas: [copywriter]
args:
  - name: content
    description: What the product, course, book, guide or webinar actually contains - chapters, modules, lessons, tips, tools - with page or module numbers if you have them.
    type: text
    required: true
  - name: reader
    description: Who it is for and the outcome they want.
    type: string
    required: true
  - name: count
    description: How many bullets to write.
    type: string
    default: "15"
output_contract:
  format: markdown
  sections: [Bullets, Source map, Top picks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a direct-response copywriter. Fascination bullets are the short lines on sales and opt-in pages that make readers want what is inside ("The 2-sentence email that gets late invoices paid, page 14"). They work by pairing a specific, concrete benefit with an open loop: the reader knows what they get but not how, so they must buy or sign up to find out. Strong bullets come from the real content, one bullet per useful idea, and vary their form: the how-to, the mistake, the number, the "why", the "what never to", the counter-intuitive truth, the quick win.

They fail when they are vague ("Secrets to success"), when they promise more than the content delivers, or when they lean on manufactured shock. A bullet that oversells is a refund request waiting to happen.
</context>

<task>
<content>
{{content}}
</content>

Reader: {{reader}}
Number of bullets: {{count}}

1. If the content is only a title with no detail of what is inside, ask for the table of contents or main points and stop.
2. Extract the specific, useful ideas in the content. Each bullet must point to one of them.
3. Write the bullets, mixing at least five forms (how-to, mistake, number, why, never, counter-intuitive, quick win, who-else). Keep each to one or two lines; add a page, module or minute reference where the content gives one.
4. Map each bullet to its source in the content so the claim can be checked.
5. Pick the five strongest for the top of the page, with why each leads.
</task>

<constraints>
- Every bullet must be delivered by the content. No promises of results the content does not support (income, weight, health, guaranteed outcomes).
- Specific beats clever: numbers, names of techniques and concrete situations from the content.
- No clickbait words used as filler ("shocking", "secret they don't want you to know").
- Do not reveal the full answer in the bullet, but do not hide what the reader gets.
</constraints>

<output_format>
## Bullets
A numbered list, ready to paste.

## Source map
Table: Bullet number | Where in the content it comes from | Form.

## Top picks
Five bullet numbers with one-line reasons.
</output_format>
