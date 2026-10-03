---
schema: 1
id: write-review-video-script
kind: prompt
title: Write a product review video script
description: Writes a product review video script with a hook, context, testing, pros and cons, who it is for and a verdict, plus an honest disclosure. Use after you have tested the product.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
stack: [youtube]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [product-review, disclosure, verdict, tech-review]
pairs_with:
  prompts: [write-product-review-post, package-video-title-thumbnail, write-video-sponsor-segment]
  personas: [youtube-strategist]
args:
  - name: product
    description: The product name and model or version reviewed.
    type: string
    required: true
  - name: testing_notes
    description: What you did with it and for how long, what you measured, what impressed or annoyed you, what you compared it with, the price you paid, and how you got it (bought, loaned, gifted, sponsored, affiliate links).
    type: text
    required: true
  - name: length_minutes
    description: Target length of the video in minutes.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Verdict in one line, Script, B-roll and graphics list, Disclosure and claims check, Fill before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write review scripts for creators whose audience trusts them to say what is true. Viewers click a review to answer one question: should I buy this, and if not, what instead? The best reviews state a verdict early (people skip around), show the testing rather than describe it, compare against the realistic alternative at the same price, name who the product is for and who should skip it, and say plainly how the creator got the product. Advertising rules in most markets (for example the US FTC Endorsement Guides, UK ASA/CAP rules and EU consumer law) require a clear, early disclosure of any material connection: payment, a free or loaned product, or affiliate commissions. Spoken pace on camera is about 150 words per minute.
</context>

<task>
Write a {{length_minutes}}-minute review script for {{product}}.

<testing_notes>
{{testing_notes}}
</testing_notes>

1. Pull out of the notes: the verdict, the strongest evidence for and against, the comparison product, the price, the testing period, and how the product was obtained. List anything missing that a viewer would expect (price, test duration, the alternative).
2. Write the verdict in one line. It must follow from the notes; if the notes are mixed, the verdict says so ("great camera, wrong phone for most people").
3. Write the script in these sections, sized to fit {{length_minutes}} minutes:
   - **Hook (first 15 to 20 seconds):** the key question and a preview of the verdict or the most surprising finding. Disclosure goes here or immediately after, in plain words.
   - **Context:** what it is, the price, who makes it, and what it competes with.
   - **Testing:** organised by what the target buyer cares about, not by spec sheet. Each claim tied to something the creator did or measured, with a b-roll or on-screen cue.
   - **Pros and cons:** the three that matter most each way, specific and from the notes.
   - **Who it is for, and who should skip it:** with the alternative to buy instead.
   - **Verdict:** a restatement with the one condition that would change it (price drop, software update).
   - **Close:** one call to action that fits (a comparison video, the description links), never a begging line.
4. Add on-screen and b-roll cues in brackets in the script.
</task>

<constraints>
- Only use findings, numbers and comparisons in the notes. Anything the script needs that the notes lack becomes `[FILL: …]`; never invent benchmark results, battery figures or quotes.
- Disclosure: if the notes say how the product was obtained, write a matching disclosure (for example "Brand sent this for review; they have not seen this video" or "Links below are affiliate links"). If they do not say, insert `[FILL: how you got the product]` in the hook and flag it. Never write "I bought this" unless the notes say so.
- Keep the verdict independent of any sponsorship; if the notes suggest a brand asked for approval or positive coverage, flag it.
- Spoken word count within 10% of 150 words per minute times {{length_minutes}}.
- Health, safety or financial claims about the product stay framed as the creator's experience and are flagged in the claims check.
</constraints>

<output_format>
## Verdict in one line

## Script
Section headings with timings, spoken lines, and `[B-ROLL: …]` or `[ON SCREEN: …]` cues. Then the spoken word count.

## B-roll and graphics list
Bullets of shots and graphics to capture or make.

## Disclosure and claims check
The disclosure as written and where it sits, plus every claim that needs evidence or softening.

## Fill before recording
Every `[FILL]` placeholder and gap in the notes.
</output_format>
