---
schema: 1
id: register-works-with-collecting-societies
kind: prompt
title: Register works with collecting societies
description: Maps which collecting societies and lending-right schemes may pay a writer, musician or visual artist where they live, what to register and the details to prepare.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [operate]
role: [writer, artist, content-creator]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [royalties, collecting-societies, lending-rights, secondary-rights, creator-income]
pairs_with:
  prompts: [plan-music-release, agree-ownership-with-co-creators, prepare-copyright-registration]
args:
  - name: creator
    description: What you create and how it is used - books, articles, songs, recordings, photos, illustrations, scripts, broadcasts, artworks resold - where you live, and whether you have a publisher, label or agent.
    type: text
    required: true
  - name: current_registrations
    description: Any society or scheme you already belong to, and works not yet registered. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Income streams you may be missing, Where to look, What to register, Details to prepare, Yearly routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators collect money they are already owed, the way an adviser at a writers' or artists' union does. Collecting societies collect for uses that are impractical to license one by one: public performance and broadcast of music, copying of books and articles in schools and businesses (reprographic rights), private copying levies, cable retransmission, library lending (public lending right, often a separate government scheme) and, in some countries, a resale royalty when artworks are resold. Different rights in the same work go to different bodies: in music, songwriters and publishers via performing and mechanical rights organisations, performers and labels via neighbouring rights bodies. Creators often miss money because they never joined, joined only one of several relevant bodies, registered works without co-writers or ISBNs, or forgot to claim back years before deadlines. Membership rules, deadlines and which bodies exist vary by country, and a creator may usually join only one body per right per territory.
</context>

<task>
<creator>
{{creator}}
</creator>
{{#current_registrations}}

<current>
{{current_registrations}}
</current>
{{/current_registrations}}

1. Income streams you may be missing: for this creator's works and uses, which secondary income types commonly exist (performance, mechanical, neighbouring, reprographic, lending, private copying, resale, broadcast and retransmission), and which may already be collected by their publisher, label or agent.
2. Where to look: the type of body for each stream and how to find the ones for their country, such as national union or arts council guidance and the country's official copyright office. You may name well-known bodies only as examples and say to verify.
3. What to register: works, editions, recordings and contributions, including co-writers and shares, and international claims if works are used abroad.
4. Details to prepare: identifiers (ISBN, ISWC, ISRC, IPI where relevant), titles, dates, publishers, splits, bank and tax details, and proof of authorship.
5. Yearly routine: a checklist and when to check statements and claim deadlines.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state which bodies exist in a country, their fees, deadlines or payment rates as fact unless marked "verify".
- Do not recommend joining a specific body over another where a choice exists; list what to compare.
- Warn that a publisher, label or agent may already handle some streams, so check contracts before joining in a way that conflicts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Income streams you may be missing
Table: stream | applies to you? | who usually collects it | already covered by a partner?

## Where to look
Bullets.

## What to register
Checklist.

## Details to prepare
Checklist.

## Yearly routine
Table: month | task.
</output_format>
