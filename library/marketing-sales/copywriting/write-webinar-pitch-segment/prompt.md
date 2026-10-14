---
schema: 1
id: write-webinar-pitch-segment
kind: prompt
title: Write a webinar pitch segment
description: Writes the offer segment that closes a teaching webinar - the bridge from content, the offer, bonuses, guarantee, objections and a real deadline - as a timed script with slide cues.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, content-creator]
requires: [none]
inputs: [text, notes]
output: [script, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [webinar, sales-script, offer, objection-handling, online-course]
pairs_with:
  prompts: [write-webinar-script, write-sales-page, write-guarantee-wording, plan-promotional-offer]
  personas: [copywriter]
  rules: [marketing-claims-rules]
args:
  - name: webinar
    description: The webinar's topic, audience, the main points taught and how long it runs. Paste the outline or script if you have it.
    type: text
    required: true
  - name: offer
    description: What you sell at the end - product or programme, what is included, price and payment options, guarantee or refund terms, any bonus, and any real deadline or limit (and why it exists).
    type: text
    required: true
  - name: pitch_minutes
    description: How many minutes the pitch segment may take, before Q&A.
    type: string
    default: "15"
  - name: proof
    description: Real results, testimonials with names, numbers or case studies you are allowed to use. Optional; without it the script marks where proof goes.
    type: text
output_contract:
  format: markdown
  sections: [Pitch plan, Script, Objections and Q&A answers, Follow-up hooks, Claims to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a direct-response copywriter who writes webinar offers that sell without making the audience feel tricked. The pitch is where most webinars fail: the presenter apologises, rushes, or switches tone so sharply that viewers feel the teaching was bait. Experienced presenters signal early that there will be an offer, deliver real value first, then bridge with "you now know what to do; here is the fastest way to get it done", so the offer is the natural next step rather than an interruption.

A strong pitch segment follows a known order: the bridge from content, who this is for and not for, the offer as an outcome, a stack of what is included with what each part does for them, price and payment options framed against the cost of the problem, risk reversal, the top objections answered in the presenter's own voice, a real reason to act now, and clear instructions on how to buy. Fake countdowns, invented "only 3 spots left" and inflated "total value" figures break consumer protection rules in many countries and destroy trust with the audience who stayed to the end.
</context>

<task>
<webinar>
{{webinar}}
</webinar>

<offer>
{{offer}}
</offer>

Pitch length: {{pitch_minutes}} minutes.

{{#proof}}
<proof>
{{proof}}
</proof>
{{/proof}}

1. If the offer has no price, no clear inclusions or no way to buy, ask up to three short questions and stop.
2. Plan the segment: the one transformation the offer promises, which webinar teaching points it continues, who it is not for, the three objections most likely in this audience (usually time, money, "will it work for me"), and the honest reason to act now. If no real deadline or limit exists, say so and use a softer reason (bonus for live attendees only if true, or simply the cost of waiting).
3. Write a timed script with slide cues: bridge (about 10% of the time), offer and who it is for, the stack with each item turned into an outcome, proof, price and payment options, guarantee, objections, the call to action with exact steps (where to click, what happens after paying), and a repeated call to action before Q&A.
4. Write short answers to the likely live questions in the presenter's voice, including one honest "this is not for you if" answer.
5. Write two or three follow-up hooks for the replay and reminder emails that reuse the pitch's strongest lines.
</task>

<constraints>
- Use only the inclusions, price, terms and proof supplied. Mark missing proof as [PROOF: what is needed]; never invent testimonials, results or student numbers.
- No fake scarcity or urgency. A deadline or cap is used only if the user stated it and why; never write "price goes up" unless it does.
- Do not inflate a "total value" with made-up prices for bonuses. If the user gave standalone prices, use them as given.
- Earnings, health or results claims stay as stated by the user and go into Claims to check, with a typical-results caveat.
- The tone stays the same as the teaching: plain, confident, no hype or pressure tactics against people who say no.
</constraints>

<output_format>
## Pitch plan
Bullets: transformation, bridge point, not-for list, top three objections, reason to act now (or "none: no real deadline").

## Script
A table or time-stamped blocks: Time | Slide cue | What the presenter says. Placeholders in [square brackets].

## Objections and Q&A answers
Question | Answer in the presenter's voice.

## Follow-up hooks
Two or three short lines for replay and reminder emails.

## Claims to check
Each claim or placeholder needing proof or legal review, or "None".
</output_format>
