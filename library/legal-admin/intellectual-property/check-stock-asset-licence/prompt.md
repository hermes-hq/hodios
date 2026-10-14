---
schema: 1
id: check-stock-asset-licence
kind: prompt
title: Check a stock asset licence for your use
description: Checks a licence you bought or downloaded for a stock photo, video, music track, icon or template against your planned use - commercial or editorial, print run, resale, people and logos shown.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review]
role: [designer, marketer, content-creator, founder]
subject: [law]
requires: [none]
inputs: [text, document]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [stock-licensing, royalty-free, editorial-use, model-release, design-assets]
pairs_with:
  prompts: [check-font-licence, assess-use-of-copyrighted-material, clear-music-for-video]
args:
  - name: asset_and_licence
    description: What the asset is and where it came from (stock site, free photo site, template marketplace, AI-generated library), the licence type you got, and the licence text or the key clauses. Say if it is marked editorial use only.
    type: text
    required: true
  - name: planned_use
    description: Exactly how you will use it - ad campaign, packaging, product for sale, book cover, client project, social posts, film - with print runs or audience and whether you or a client is the user.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you licensed, Use by use, Hidden restrictions, Fix the gaps, Keep these records]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check stock licences the way an agency's rights coordinator does. "Royalty-free" means pay once, not free of conditions. Standard licences commonly cap print runs or audience and exclude products for resale (mugs, prints, templates) that need an extended or enhanced licence. "Editorial use only" assets usually cannot be used in advertising or to promote anything, often because the people, logos, artworks or buildings in them have no releases. Sensitive-use clauses restrict showing recognisable models in contexts such as health conditions or politics. Free photo sites have their own terms, and an uploader may not have had the rights in the first place. Licences are often tied to one end client or project, and many do not let you pass the file on. Keeping the licence record matters because claims often arrive years later.
</context>

<task>
<asset>
{{asset_and_licence}}
</asset>

<use>
{{planned_use}}
</use>

1. What you licensed: licence type, licensee, end client if any, limits, permitted and prohibited uses, quoting the clauses.
2. Use by use: covered, not covered or unclear for each planned use, with the clause.
3. Hidden restrictions: editorial-only status, missing model or property releases, sensitive-use rules, logos or artworks in frame, trademarks, transfer to clients, resale and template restrictions, and attribution requirements.
4. Fix the gaps: upgrade to an extended licence, licence for the client, choose a different asset, crop or remove a third-party element where the licence allows, or ask the provider. Present options.
5. Keep these records: licence certificate, download date, account, asset ID, the page terms at the time (saved copy), releases noted.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work from the licence given. If key clauses are missing, list the uses you cannot check and the clause you need.
- Do not invent prices, licence tiers or a provider's policies.
- Do not suggest removing watermarks, using a comp image in final work or other ways around the licence.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you licensed
Bullets with quoted clauses.

## Use by use
Table: use | covered? | clause | note.

## Hidden restrictions
Bullets.

## Fix the gaps
Numbered options.

## Keep these records
Checklist.
</output_format>
