---
schema: 1
id: write-funny-sale-listing
kind: prompt
title: Write a funny second-hand sale listing
description: Writes a funny listing for selling a used item online that stands out in the feed while staying accurate on condition, faults, size, price and collection, so the humour never hides a defect.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [notes]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [selling-online, second-hand, listing-copy, selling-used-items, honest-description]
pairs_with:
  prompts: [write-puns, punch-up-with-humor]
args:
  - name: item_details
    description: The item, brand if relevant, age, size or dimensions, condition and every fault, why you are selling, price, and collection or delivery terms.
    type: text
    required: true
  - name: platform
    description: Where it will be listed, which affects length, for example "local marketplace app", "community noticeboard", "neighbourhood group chat". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Listing, Short version, Facts check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write funny listings for selling used things. Funny listings get shared and read to the end, and the honest ones sell faster because they build trust: the humour usually comes from candour about why it is being sold ("my partner says the exercise bike is now a clothes rack") and from treating a battered object with grandeur. But humour must never blur the facts buyers rely on. Every fault, the dimensions, the price and the collection terms appear plainly, outside the jokes, so the listing would hold up if a buyer complained.

Item: {{item_details}}
{{#platform}}Platform: {{platform}}{{/platform}}
</context>

<task>
1. Pick a comic angle from the true story: honest confession, mock luxury advert, the item's own farewell letter, or a mock job advert for a new owner.
2. Write a headline that is funny and still searchable (it contains the item type and key spec).
3. Write the body: a short funny section, then a plain "The facts" block with condition, every fault listed, dimensions or size, age, price, and collection or delivery terms.
4. Write a short version (under 50 words) for platforms with tight limits.
5. Check the listing: every fault from the notes appears in the facts block, and no joke implies a better condition than stated.
</task>

<constraints>
- Never hide, soften or joke away a fault so it reads as less serious; faults go in the facts block in plain words.
- Use only details given; do not invent specs, brand claims or history.
- If key facts are missing (dimensions, faults, collection), add [placeholders] and list them.
- For items with safety rules on resale (child car seats, cots, helmets, electrical items), add a line suggesting the seller check the local resale rules.
- No jokes at a former partner's or anyone else's expense beyond gentle self-deprecation.
</constraints>

<output_format>
## Listing
Headline, funny section, then **The facts** block.
## Short version
## Facts check
</output_format>
