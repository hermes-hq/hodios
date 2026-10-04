---
schema: 1
id: reduce-platform-dependence
kind: prompt
title: Reduce platform dependence
description: Assesses how exposed a creator's audience is to one content platform's algorithm or a ban, then plans moving followers to an email list or site with conversion points, backups and a 90-day target.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, founder, writer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [owned-media, email-list, account-backup, algorithm-risk, audience-ownership, resilience]
pairs_with:
  prompts: [grow-newsletter, plan-creator-monetization, plan-content-repurposing-system]
  personas: [content-strategist]
args:
  - name: current_channels
    description: Each platform you use, followers or subscribers, how much of your reach and results comes from each, and whether you have an email list, website or community already.
    type: text
    required: true
  - name: revenue_sources
    description: How you earn from the audience (sponsors, platform payouts, product sales, bookings, donations), with rough shares by platform if you know them.
    type: text
output_contract:
  format: markdown
  sections: [Exposure snapshot, What would happen if, Owned-channel plan, Conversion points, Backup checklist, Ranked actions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, or a small business whose audience comes from posting content, that reaches most of its people through one social, video or audio platform. This is about audience and attention, not sales channels: if the main dependence is on a marketplace, delivery app or booking site, say this prompt covers only the content side and keep to that. The risks are real: reach can fall overnight after a ranking change, accounts get suspended or hacked with slow appeals, monetisation terms change, and platforms decline. Followers on a rented platform cannot be contacted off it. The fix is not to leave, which throws away what works, but to turn a steady share of that attention into channels the person controls (an email list, a website, a community they host), back up content and contacts, and build the ask into normal content. Owned is not risk-free either: email and hosting providers have terms too, so exports matter. Most creators under-ask: one vague "link in bio" a month moves almost nobody, while a specific, useful reason to join, repeated in the formats that already work, does.
</context>

<task>
<current_channels>
{{current_channels}}
</current_channels>

{{#revenue_sources}}
<revenue_sources>
{{revenue_sources}}
</revenue_sources>
{{/revenue_sources}}

1. Exposure snapshot: share of reach and of results or income by platform, owned or rented, and a dependence rating (high if one rented platform drives more than about half of reach or results; medium at a quarter to a half). If they already have an owned list, compute its size as a share of the main platform's followers as the starting conversion figure.
2. What would happen if: for the top platform, three scenarios (reach halves for three months; account suspended for two weeks; monetisation or terms change), the likely effect on audience and income, and how they could reach people today in each case.
3. Owned-channel plan: the one owned channel to build first (usually email) and why, the reason to join that is useful to this audience (a free resource, early access, a community, behind-the-scenes, order or release updates), and a 90-day target expressed as followers moved, stated as an assumption to check against their first month.
4. Conversion points in existing content: bio link, pinned post, a recurring line in videos or captions, an end screen, a reply template for common DMs, packaging inserts or receipts for physical businesses. Set a rhythm (for example a specific ask in one piece in four, and a dedicated piece about the free resource once a month) and say how to avoid sounding repetitive.
5. Backup checklist: regular export of content and data, original files stored off-platform, contacts exported from email and shop tools, two-factor authentication with recovery codes stored safely, a second admin on business accounts, a pre-written "where to find us" post, and an account-loss drill (can you reach your audience within 24 hours without this platform?).
6. Ranked actions: every action scored by effort (hours) and risk reduced (high, medium, low), sorted so high-reduction low-effort actions come first, with a do-by date.
</task>

<constraints>
- Do not tell them to leave a platform that works; the aim is spreading risk.
- Email and contact collection must be opt-in with clear consent; consent and marketing rules vary by country, so tell them to check local requirements.
- Do not present platform policy details, conversion rates or growth rates as fact; say to check current terms and to measure their own figures.
- Never ask for or store passwords; recommend a password manager without naming a brand.
- If channel sizes or which channel brings results are missing, ask for them or mark [X].
</constraints>

<output_format>
## Exposure snapshot
Table: channel | owned or rented | share of reach | share of results or revenue | notes. Then the dependence rating in one line.

## What would happen if
Three short scenario paragraphs.

## Owned-channel plan
The first owned channel, the reason to join, the 90-day target and its assumption; a second channel only if justified.

## Conversion points
Table: where | what to say | how often.

## Backup checklist
Checkbox list.

## Ranked actions
Table: action | effort (hours) | risk reduced | do by.
</output_format>
