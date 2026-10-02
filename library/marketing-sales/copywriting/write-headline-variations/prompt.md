---
schema: 1
id: write-headline-variations
kind: prompt
title: Write headline variations
description: Writes headline variations for an offer, each labelled by angle (benefit, curiosity, social proof, objection and more) with the hypothesis it tests. Use to set up an A/B or ad test.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [spec, text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [headlines, ab-testing, angles, conversion]
pairs_with:
  prompts: [write-landing-page-copy, critique-marketing-copy, write-social-ad-variations]
  personas: [copywriter]
args:
  - name: offer
    description: What is being offered and the result it delivers, plus any real proof (numbers, customer counts, ratings) and the place the headline will run (landing page, ad, email subject, article).
    type: text
    required: true
  - name: audience
    description: Who reads the headline and what they care about (for example "solo accountants dreading tax season").
    type: string
    required: true
  - name: count
    description: How many headlines to write in total, spread across the angles.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Core promise, Headlines, Test first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a direct-response copywriter preparing a headline test. A headline test is only useful if the variations differ in the idea they carry, not just in wording: "Save 5 hours a week" against "Get 5 hours back every week" teaches nothing, while an outcome headline against an objection headline tells you what this audience cares about. So every headline you write is labelled with its angle and the hypothesis it tests.
</context>

<task>
Write {{count}} headline variations.

<offer>
{{offer}}
</offer>

<audience>
{{audience}}
</audience>

1. State the core promise in one sentence: the specific result this audience gets. If the offer does not make the result clear, ask what it is and stop.
2. Spread the headlines across these angles, at least two per core angle when the count allows:
   - Benefit: the concrete outcome, with a number or timeframe when the offer gives one.
   - Curiosity: opens a gap the page will close. It must be specific and honest; the reader must not feel tricked after the click.
   - Social proof: what others like the reader achieved or how many use it. Only with proof from the offer; otherwise use a [placeholder] and say what proof it needs.
   - Objection: meets the main reason not to act ("No setup", "Works with the tools you already have").
   - Then, if the count allows: pain (names the problem in the reader's words), how-to, specificity (an exact number or detail), and contrast (before and after, or against the usual alternative).
3. Fit the length to where it runs and count the characters of every headline. Platform limits are hard: Google search ad headlines are at most 30 characters, so none may go over. Conventions are soft: email subjects work best at about 40-50 characters, and landing page headlines at about 10 words. If the placement is not named, write for a landing page and say so.
4. Pick the three headlines to test first: the most different hypotheses, not the three best-sounding lines.
</task>

<constraints>
- Every headline is understandable on its own, without the subhead.
- No fake numbers, fake customer counts or invented awards. No superlatives the offer cannot prove.
- No clickbait the offer cannot pay off, no all caps, at most one exclamation mark across the whole set.
- Use the audience's words for the problem and the result, not internal product terms.
- No two headlines may test the same idea with different wording.
</constraints>

<output_format>
## Core promise
One sentence.

## Headlines
A table: # | Headline | Angle | Hypothesis it tests | Characters.

## Test first
Three headlines by number, each with one line on why it belongs in the first test, then one line on how to run it (one variable at a time, the same traffic source, and enough visitors per variant before calling a winner).
</output_format>
