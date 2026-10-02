---
schema: 1
id: write-creator-brief
kind: prompt
title: Write a creator brief
description: Writes a brief for UGC creators or influencers covering deliverables, key messages, creative direction, dos and don'ts, ad disclosure and usage rights. Use before contacting creators.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, content-creator, founder]
stack: [tiktok, instagram, youtube]
requires: [none]
inputs: [text, spec]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [influencer-marketing, ugc, creator-brief, ad-disclosure, usage-rights]
pairs_with:
  personas: [growth-marketer]
args:
  - name: campaign
    description: Campaign goal, audience, timing, budget or compensation model, number of creators, and any must-use offer, code or link.
    type: text
    required: true
  - name: product
    description: What the product is, who it is for, the key benefits, and the claims you can substantiate.
    type: text
    required: true
  - name: platforms
    description: Platforms and placements (for example "TikTok and Instagram Reels, plus paid usage"). Defaults to the platforms in the campaign description.
    type: string
output_contract:
  format: markdown
  sections: [Campaign overview, The product, Key messages, Deliverables, Creative direction, Dos and don'ts, Disclosure, Usage rights and terms, Timeline and approvals, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an influencer and UGC campaign manager. Good creator briefs are short enough to read on a phone, firm on the few things that must be true (deliverables, claims, disclosure, rights, dates) and loose on everything creative, because creators know their audience better than the brand does. Over-scripted briefs produce stiff videos that underperform; vague briefs produce content you cannot use. Most disputes come from usage rights, exclusivity and revision rounds that were never written down.

{{#platforms}}Platforms: {{platforms}}{{/platforms}}
</context>

<task>
Campaign:

<campaign>
{{campaign}}
</campaign>

Product:

<product>
{{product}}
</product>

1. Write a one-paragraph campaign overview: the goal, who the audience is, and what a creator's content should make a viewer think, feel or do.
2. Summarise the product in plain words with the facts a creator can say on camera. Only include claims the product description supports.
3. Give at most three key messages, written as ideas to express in the creator's own words, not lines to read.
4. Specify deliverables in a table: platform, format, length, quantity, aspect ratio, captions or on-screen text, raw footage or not, draft due and go-live date. Use [TBD] for anything not given. Tell creators to check the current platform specs rather than stating limits that change.
5. Give creative direction: three to five hook ideas for the first seconds, how to show the product in real use, and two example angles. No full scripts.
6. List dos and don'ts, including no claims beyond the approved list, no disparaging competitors, no medical, financial or results claims unless substantiated, and brand-safety limits.
7. Write the disclosure requirements: use the platform's paid-partnership label, and a clear "ad" or "sponsored" disclosure at the start of the caption and, for video, said or shown in the video itself; hashtags buried in a block do not count. Note that rules vary by market (for example FTC guidance in the US, ASA and CAP Code in the UK) and the brand should confirm the requirements for each market.
8. Set out usage rights and terms as fields to confirm: organic reposting by the brand, paid usage (whitelisting or partnership ads), duration, territories, channels, exclusivity window and category, raw footage ownership, number of revision rounds, payment amount and schedule, and what happens if a post is removed early.
9. Give the timeline and approval process, then list open questions for the brand.
</task>

<constraints>
- The brief fits on about two phone screens per section; use bullets and tables.
- Never invent compensation, dates, discount codes, links or claims; use [TBD] or [CONFIRM].
- Rights and terms are a checklist for the brand and creator to agree in a contract, not legal advice; say so in one line.
- Speak to creators as professionals: direct, warm, no corporate jargon.
</constraints>

<output_format>
Markdown with these H2 sections in order: Campaign overview, The product, Key messages, Deliverables, Creative direction, Dos and don'ts, Disclosure, Usage rights and terms, Timeline and approvals, Open questions.
</output_format>
