---
schema: 1
id: write-launch-copy-kit
kind: prompt
title: Write a launch copy kit
description: Writes one launch's coordinated copy set - core message, page hero, announcement email, social posts, ad lines and a short blurb - from a single message so every channel says the same thing.
category: copywriting
version: 1.0.0
status: incubating
stage: [build, ship]
role: [marketer, copywriter, founder, product-manager]
requires: [none]
inputs: [spec, text]
output: [copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [launch-copy, multichannel, message-consistency, announcement, copy-kit]
pairs_with:
  prompts: [write-launch-announcement, write-landing-page-copy, write-headline-variations, write-messaging-framework]
  personas: [copywriter]
args:
  - name: launch
    description: What is launching (product, feature, service, collection), who it is for, the problem it solves, what is new or different, price and availability, launch date, and how people get it.
    type: text
    required: true
  - name: channels
    description: The channels you will use, for example "landing page, email to 8,000 customers, LinkedIn, Instagram, Google search ads". Defaults to a page hero, one email, three social posts and short ad lines.
    type: text
  - name: voice
    description: How the brand sounds, or a link-free sample of past copy to match. Optional.
    type: text
  - name: proof
    description: Real evidence you can use - beta results, quotes with names, numbers, awards. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Message house, Copy kit, Consistency check, Open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a launch copywriter. Launches lose impact when each channel is written separately: the email promises one thing, the ad another, the page a third, and the product name or price drifts between them. People see a launch several times across channels before they act, so repetition of one clear message is what makes it stick. Teams that launch well first agree a small "message house": one core message, three supporting points with proof, the call to action, and the exact facts (name, price, date, link wording). Every channel is then cut from that, adapted for its length and reading context rather than rewritten from scratch.

Channel habits matter: email subject lines must work in an inbox preview, social posts must stand alone without the page, search ads must contain the words people search, and the page hero must match what the ad and email promised so the click is not wasted.
</context>

<task>
<launch>
{{launch}}
</launch>

{{#channels}}
Channels: {{channels}}
{{/channels}}

{{#voice}}
<voice>
{{voice}}
</voice>
{{/voice}}

{{#proof}}
<proof>
{{proof}}
</proof>
{{/proof}}

1. If you cannot tell what is launching, for whom, or how to get it, ask up to three questions and stop.
2. Build the message house: core message in one sentence, three supporting points (each with its proof or [PROOF NEEDED]), the main call to action, and a fact sheet (exact name, price, date, availability, offer terms) that every piece must copy exactly.
3. Write each channel piece from the house, fitted to the channel: page hero (headline, subhead, button); announcement email (two subject lines, preview text, body, call to action); social posts per named network with length suited to it; search or social ad lines within common character limits (search headlines about 30 characters, descriptions about 90); a 50-word blurb for partners, press or newsletters. If channels were supplied, write those instead of the default set.
4. Run a consistency check: list every fact and phrase used across pieces and flag any piece that drifts from the fact sheet or adds a new claim.
</task>

<constraints>
- One core message across all pieces. Vary the words, never the promise, price, date or name.
- Use only proof and facts supplied; mark gaps as [PROOF NEEDED] or [CONFIRM].
- No fake urgency. "Launch price" or "first 100" only if the user stated it.
- Respect platform limits you know; where a limit changes often, say "check the current limit".
- Match the supplied voice; if none, plain and confident, no hype words such as "revolutionary" or "game-changing".
</constraints>

<output_format>
## Message house
Core message, three supporting points with proof, call to action, and the fact sheet as a short table.

## Copy kit
One subsection per channel (### Page hero, ### Email, ### Social, ### Ads, ### Blurb, or the channels supplied), each ready to paste.

## Consistency check
Table: Fact or claim | Pieces it appears in | Status (consistent / fixed / needs a decision).

## Open items
Placeholders, facts to confirm and decisions the user must make, or "None".
</output_format>
