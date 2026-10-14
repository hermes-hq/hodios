---
schema: 1
id: write-ad-creative-brief
kind: prompt
title: Write an ad creative brief
description: Writes a production brief for a designer or video editor making a batch of ads, with angle, audience insight, hooks, mandatory elements, sizes, references, and what to avoid.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, designer]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [creative-brief, ad-production, hooks, aspect-ratios, design-handoff]
pairs_with:
  prompts: [plan-ad-creative-tests, analyze-creative-test-results, write-video-ad-script, write-social-ad-variations]
  personas: [ad-creative-strategist]
  workflows: [ad-campaign-launch-track]
args:
  - name: product_and_offer
    description: What is being advertised, the offer, price, and the proof you have (reviews, numbers, awards, guarantees).
    type: text
    required: true
  - name: audience
    description: Who the ads are for, their problem, objections, and words they use (paste reviews or survey answers if you have them).
    type: text
    required: true
  - name: batch
    description: How many ads, formats (static, video, carousel), platforms and placements, deadline.
    type: string
    required: true
  - name: learnings
    description: What has worked or failed in past ads, and brand rules (fonts, colours, tone, logo use). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Brief summary, Audience and insight, Angles and hooks, Mandatory elements, Deliverables and specs, References and what to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs to brief a designer or video editor (in-house or freelance) to produce a batch of performance ads. Weak briefs ("make some ads for our sale, on brand") get pretty ads that do not sell, and rounds of revisions. What experts know: a performance brief is built around one audience insight and a few distinct angles, each with hook options, because the angle and the first seconds decide results; it lists what must appear (offer, proof, logo, legal text) and what is free; it specifies every deliverable by aspect ratio and length with safe zones in mind so text is not covered by platform interface; it gives references for feel, not to copy; it says how the batch will be tested so each ad differs in one clear way; and it states what was learned before, so the editor does not repeat losers.
</context>

<task>
Product and offer: {{product_and_offer}}
Audience: {{audience}}
Batch: {{batch}}
{{#learnings}}Past learnings and brand rules: {{learnings}}{{/learnings}}

1. Brief summary: one paragraph with the objective, the single most important message, the deadline and the testing intent.
2. Audience and insight: who, the problem in their words, the main objection, and the insight the ads hang on. Quote customer language if supplied.
3. Angles and hooks: 3 to 5 distinct angles (for example problem and solution, social proof, comparison, demonstration, offer-led, founder story), each with 2 or 3 hook lines for the first seconds or headline, and the visual idea.
4. Mandatory elements: offer wording, proof points allowed (only the ones supplied), logo and brand rules, required legal or disclosure text, call to action.
5. Deliverables and specs: a table of every asset (angle, format, aspect ratio, length, placement, file naming), with a note to check each platform's current safe zones and specs.
6. References and what to avoid: reference descriptions, what not to do (claims not supplied, past losers, clutter, small text), and the review and delivery process.
</task>

<constraints>
- Use only the proof points and claims the user gave; never invent reviews, numbers, awards or testimonials. Mark where real proof is needed.
- Do not state platform spec limits as fact; list common aspect ratios as a starting point and tell the user to confirm current specs.
- Keep each angle clearly different so the test can tell them apart.
- Remind the user that health, finance and other regulated claims need checking against platform policies and local advertising rules.
</constraints>

<output_format>
## Brief summary
One paragraph.

## Audience and insight
Bullets.

## Angles and hooks
A table: Angle | Hook options | Visual idea | What it tests.

## Mandatory elements
Checklist.

## Deliverables and specs
A table: Asset | Angle | Format | Aspect ratio | Length | Placement | File name.

## References and what to avoid
Bullets, then review and delivery steps.
</output_format>
