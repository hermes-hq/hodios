---
schema: 1
id: write-cross-promo-blurbs
kind: prompt
title: Write newsletter cross-promotion blurbs
description: Writes recommendation blurbs for a newsletter swap in the writer's own voice, saying why their readers would like the partner's newsletter and who it suits, plus the note asking for theirs.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [text]
output: [copy, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [newsletter-swap, recommendations, cross-promotion, partner-outreach, audience-growth]
pairs_with:
  prompts: [grow-newsletter, write-newsletter-sponsor-spot]
args:
  - name: partner_newsletter
    description: The newsletter you are recommending - name, what it covers, cadence, a few recent issues or lines you liked, and the signup link. Paste real excerpts if you can.
    type: text
    required: true
  - name: own_newsletter
    description: Your newsletter - what it covers, who reads it, a short sample of your writing for voice, and your signup link.
    type: text
    required: true
  - name: count
    description: How many blurb variations to write (different angles or lengths).
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Fit check, Blurbs, Request to partner, Disclosure]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write newsletter recommendations that readers act on. Readers skip generic praise ("an amazing newsletter you'll love!") because it reads like an ad. A recommendation works when it sounds like the writer telling a friend about something they actually read: a specific issue or idea, why this writer's readers in particular would get something from it, and an honest line on who it is for and who it is not for. A swap also has to be fair to both sides: similar audience overlap, a clear placement and timing, and plain disclosure if anything was exchanged.
</context>

<task>
<partner_newsletter>
{{partner_newsletter}}
</partner_newsletter>

<own_newsletter>
{{own_newsletter}}
</own_newsletter>

1. Fit check: how the two audiences overlap and differ, from the descriptions only. If the fit is weak, say so before writing, and suggest the angle that would still be honest.
2. Write {{count}} blurbs in the voice shown in the own-newsletter sample, each with a different angle (the specific issue I liked, the problem it solves for you, the writer's point of view, the format). Each blurb:
   - opens with something specific from the partner's material, not an adjective;
   - says why "you" (this writer's readers) would like it, in one sentence;
   - includes an honest "best for ... / not for ..." line;
   - ends with the link and a plain call to subscribe;
   - stays between 40 and 90 words, with one very short version (under 25 words) for a footer or recommendations list.
3. Write the request to the partner: a short, friendly note proposing the swap (or thanking them if agreed), what you will run and when, the placement, what you would like from them, and a ready-made description of your own newsletter they can adapt (60-80 words, written for their readers).
4. Add the disclosure line if the swap is reciprocal or paid.
</task>

<constraints>
- Quote or reference only what the partner material contains. Never invent issues, quotes, subscriber counts or results; if the material is thin, write [specific issue] placeholders and ask for one or two excerpts.
- No superlatives you cannot back ("the best", "must-read") and no fake urgency.
- Do not claim to have read something the writer has not; if the input does not show they read it, ask.
- Keep the writer's voice; do not import the partner's.
</constraints>

<output_format>
## Fit check
Two to four sentences.

## Blurbs
Numbered blurbs with their angle in bold, then the short version.

## Request to partner
The note, then your own newsletter's description for them.

## Disclosure
One line, or "None needed" with the reason.
</output_format>
