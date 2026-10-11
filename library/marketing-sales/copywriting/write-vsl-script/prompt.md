---
schema: 1
id: write-vsl-script
kind: prompt
title: Write a video sales letter script
description: Writes a video sales letter script with hook, problem, story, how it works, proof, offer, guarantee and call to action, paced for speech, with on-screen text and an honest-claims check.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, founder, consultant]
requires: [none]
inputs: [text, transcript, notes]
output: [script, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [video-sales-letter, direct-response, sales-script, offer-design, claims-check]
pairs_with:
  prompts: [write-sales-page, write-video-ad-script, write-guarantee-wording, write-webinar-script, write-sales-faq]
  rules: [marketing-claims-rules]
  personas: [copywriter]
args:
  - name: offer
    description: What is sold (course, programme, service, product), what the buyer gets, price and payment options, guarantee or refund terms, and why it works (the method or mechanism).
    type: text
    required: true
  - name: audience
    description: Who the video is for, the problem in their words, what they have tried before, and how aware they are of the offer (cold traffic from ads, warm email list, existing customers).
    type: text
    required: true
  - name: proof
    description: Real results, testimonials with names and permission, the founder's story and credentials, case studies. Optional; without it the script marks where proof belongs.
    type: text
  - name: length
    description: Target length. short for about 3 to 6 minutes, medium for about 10 to 15 minutes, long for 20 minutes or more.
    type: enum
    enum: [short, medium, long]
    default: medium
output_contract:
  format: markdown
  sections: [Script strategy, VSL script, On-screen text, Claims check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write video sales letters: a sales page delivered as a spoken video, usually a presenter on camera or a voice over simple slides, on a page with the buy button below. The structure that works is well tested: a hook in the first 10 to 20 seconds that names who it is for and the promise; the problem in the viewer's words; a story that shows the presenter understands it; why previous attempts failed and how this method works differently (the mechanism); proof; the offer with everything included; the price; the guarantee; and a call to action repeated near the end, with objections handled before the close.

The genre has a bad reputation because of fake countdown timers, invented testimonials, "secret" cures, income promises and hiding the price until minute 40. Those tactics bring refunds, chargebacks, ad account bans and regulatory risk: income, health and results claims are closely regulated in many countries, and in several markets a testimonial showing better-than-typical results needs a clear statement of what customers generally achieve; a bare "results not typical" line is often not enough. Write a script that persuades with specifics and proof, and is honest about what the viewer gets and what it costs. Spoken copy runs at about 130 to 150 words a minute and must sound natural when read aloud.
</context>

<task>
<offer>
{{offer}}
</offer>

<audience>
{{audience}}
</audience>

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

Length: {{length}}

1. If the offer, price or what the buyer gets is missing, ask and stop.
2. Script strategy: the viewer's awareness level, the big promise stated in a way the offer can keep, the mechanism in one sentence, the three main objections, and the proof for each. Give the target word count for the length (about 140 words per minute).
3. Write the script in sections with timestamps: hook, problem, story, why other approaches fail, the mechanism, proof, the offer (what is included), price and payment options, guarantee, objection handling, call to action, and a short recap with the call to action repeated. Write it to be spoken: short sentences, contractions, natural pauses marked.
4. Give on-screen text for each section (slide headings, captions for key claims, the price and guarantee on screen when spoken), and note where to show proof such as screenshots or customer clips.
5. Run a claims check on every claim about results, income, health, time, or comparisons.
</task>

<constraints>
- Use only supplied proof and results. Never invent testimonials, numbers, credentials or media mentions. Mark gaps as [PROOF NEEDED: ...].
- No income, health or weight-loss promises; for results claims, describe what the method involves and what customers have achieved, and next to any standout result state the typical result from the inputs, or mark [PROOF NEEDED: typical results] if the inputs do not give one.
- No fake scarcity or countdowns, no "secret" or "they don't want you to know" framing, no attacks on named competitors.
- Say the price clearly in the script; do not stretch the reveal artificially.
- The guarantee wording matches the terms supplied exactly.
</constraints>

<output_format>
## Script strategy
Bullets: awareness, big promise, mechanism, objections with proof, target word count.

## VSL script
Sections with approximate timestamps, spoken text ready to record, pauses marked.

## On-screen text
A table: Timestamp | On-screen text | Visual or proof to show.

## Claims check
A table: Claim | Supported by | Risk | Fix.
</output_format>
