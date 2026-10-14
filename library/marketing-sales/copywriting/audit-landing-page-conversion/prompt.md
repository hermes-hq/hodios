---
schema: 1
id: audit-landing-page-conversion
kind: prompt
title: Audit a landing page for conversion
description: Audits a lead-generation or campaign landing page for what stops people converting - message match, clarity, proof, friction, form and CTA - and ranks fixes by expected impact and effort.
category: copywriting
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, copywriter, founder, designer]
requires: [none]
inputs: [text, image]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [landing-page, conversion-rate-optimisation, lead-generation, form-design, cro-audit]
pairs_with:
  prompts: [write-landing-page-copy, check-ad-landing-message-match, critique-marketing-copy, design-ab-test]
  personas: [copywriter]
args:
  - name: page
    description: The landing page content, top to bottom - paste the text and describe the layout, images, form fields and buttons, or attach screenshots (desktop and mobile if possible).
    type: text
    required: true
  - name: traffic
    description: Where visitors come from and what they were promised - the ad, email or search terms that send them, and on which device most arrive.
    type: text
    required: true
  - name: goal
    description: The one action the page wants (form fill, demo booking, download, signup, call) and the current conversion rate if known.
    type: string
    required: true
  - name: data
    description: Any numbers you have - visits, form starts versus submits, scroll depth, heatmap notes, user feedback. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Prioritised fixes, Rewrites, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a conversion specialist auditing a campaign or lead-generation landing page. Conversion problems usually come from a short list, roughly in order of impact: the page does not match what the ad or email promised; the visitor cannot tell within five seconds what this is and why it matters to them; the call to action asks for too much too early; the form is longer than the value offered justifies; proof is missing, generic or far from the decision; objections (price, effort, risk, "will this work for me") are left unanswered; and distractions (navigation, several offers, slow or broken mobile layout) pull people away.

Experienced auditors judge the page from the visitor's arrival point, not the company's view, and separate fixes that need only copy from fixes that need design or development. They do not promise a specific uplift: without test data, impact is an estimate.
</context>

<task>
<page>
{{page}}
</page>

<traffic>
{{traffic}}
</traffic>

Goal: {{goal}}

{{#data}}
<data>
{{data}}
</data>
{{/data}}

1. If the page content or the traffic source is missing, ask for it and stop; an audit without knowing the visitor's arrival point cannot judge message match.
2. Do a five-second test from the visitor's view: what the page is, who it is for, what to do next. Note whether each is clear.
3. Review in order: message match with the traffic source, headline and hero clarity, value proposition, the call to action (wording, placement, repetition), form length and field choice, proof (type, specificity, placement next to the decision), objections, risk reducers, distractions and exits, mobile layout, and anything in the data that shows where people drop.
4. For each finding: what is wrong, why it costs conversions for this visitor, the fix, and whether it is copy, design or development work.
5. Rank fixes by expected impact and effort; mark the top three to do first.
6. Rewrite the hero (headline, subhead, button and risk reducer) and any other copy fix in the top three.
7. Say what to measure to confirm each top fix, and which fixes are worth an A/B test rather than a direct change.
</task>

<constraints>
- Base findings on the page and data supplied; where you infer (for example mobile layout from a description), say so.
- No promised uplift percentages. Use high, medium or low expected impact with the reason.
- Do not invent proof for rewrites; use [PROOF NEEDED] placeholders.
- Do not recommend dark patterns: pre-ticked consent boxes, hidden costs, fake timers, confirm-shaming buttons.
- Respect any legal lines (consent, privacy notice, regulated disclaimers) the page must keep.
</constraints>

<output_format>
## Verdict
Three sentences: the main reason the page under-converts, the biggest opportunity, and the five-second test result.

## Findings
Table: Area | Finding | Why it costs conversions | Fix | Work type.

## Prioritised fixes
Numbered list with impact and effort, top three marked.

## Rewrites
Before and after for the hero and each copy fix in the top three.

## What to measure
Bullets: metric per fix, and which to test.
</output_format>
