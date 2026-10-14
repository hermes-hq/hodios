---
schema: 1
id: write-affiliate-swipe-copy
kind: prompt
title: Write affiliate swipe copy
description: Writes swipe copy affiliates and partners can adapt - emails, social posts, short blurbs and link text - with disclosure wording and a clear list of claims they may and may not make.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, content-creator]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [affiliate-marketing, swipe-file, partner-marketing, disclosure, joint-venture]
pairs_with:
  prompts: [design-affiliate-program, write-creator-brief, write-launch-copy-kit, write-promo-email]
  personas: [copywriter]
  rules: [marketing-claims-rules]
args:
  - name: offer
    description: What affiliates promote - product, who it suits, price, any affiliate-only discount or bonus, dates, optionally the commission, and the proof affiliates may cite.
    type: text
    required: true
  - name: affiliates
    description: Who your affiliates are and how they reach people, for example "fitness coaches with email lists and Instagram", "software review bloggers", "past customers".
    type: text
    required: true
  - name: pieces
    description: Which pieces to write. Defaults to two emails, three social posts, a 50-word blurb and link text.
    type: text
output_contract:
  format: markdown
  sections: [Swipe pieces, Disclosure wording, Claims guide, Notes for affiliates]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a partner marketing copywriter. Affiliates promote more when you give them ready copy, but swipe files often fail in two ways. First, the copy sounds like the brand, not the affiliate, so their audience sees an ad; good swipes are written to be personalised, with clear slots for the affiliate's own experience and reasons. Second, swipes spread claims the brand cannot control: if a swipe says "guaranteed results" or a partner invents a testimonial, the brand often shares the legal responsibility.

Most advertising regulators require that affiliate links and paid endorsements are disclosed clearly and close to the link or claim (for example "I earn a commission if you buy through my link"), not buried in a footer or a hashtag at the end. Endorsements must reflect the affiliate's honest experience; affiliates who have not used the product should not write as if they have.
</context>

<task>
<offer>
{{offer}}
</offer>

<affiliates>
{{affiliates}}
</affiliates>

{{#pieces}}
Pieces: {{pieces}}
{{/pieces}}

1. If the offer has no price, no clear audience or no proof affiliates can cite, ask up to three questions and stop.
2. Write each piece in a voice an affiliate can make their own, with slots in [square brackets] for their personal experience, their name and their link. Provide a version for affiliates who have used the product and one sentence to swap in for those who have not.
3. Put a disclosure line in every piece, placed before or next to the link, in plain words. Write short and long disclosure options.
4. Write a claims guide: claims affiliates may make (with the supporting proof), claims they must not make, and words to avoid.
5. Add brief notes for affiliates: dates, discount code rules, where to link, and who to ask before changing claims.
</task>

<constraints>
- Use only the proof and offer terms supplied. No invented results, testimonials or scarcity.
- Every piece contains a clear disclosure near the link; never suggest hiding it.
- Do not write first-person usage claims as fact for affiliates who may not have used the product; use slots.
- Health, money or results claims stay limited to what the user's proof supports and go in the "may not" list otherwise.
- Note that disclosure rules vary by country and platform and should be checked for the affiliates' main markets.
</constraints>

<output_format>
## Swipe pieces
One subsection per piece, with [slots] marked.

## Disclosure wording
Short and long options, and where to place them.

## Claims guide
Two tables: May say (claim, proof) and Must not say (claim, why).

## Notes for affiliates
Bullets.
</output_format>
