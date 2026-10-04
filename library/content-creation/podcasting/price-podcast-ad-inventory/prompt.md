---
schema: 1
id: price-podcast-ad-inventory
kind: prompt
title: Price podcast ad inventory
description: Works out what an independent podcast can sell, from ad slots and positions to CPM and flat-fee scenarios built on real downloads, direct versus network sales and a simple rate sheet.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, founder]
inputs: [text, notes]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [podcast-sponsorship, cpm, rate-sheet, host-read-ads, monetisation]
pairs_with:
  prompts: [write-podcast-ad-read, read-podcast-listener-stats, build-creator-rate-card]
  personas: [podcast-producer]
args:
  - name: downloads_per_episode
    description: Typical downloads per episode at 30 days (not lifetime), from your host's stats. Use the median of recent episodes if they vary.
    type: number
    required: true
  - name: episodes_per_month
    description: How many episodes you publish per month.
    type: number
    required: true
  - name: audience_notes
    description: Anything that makes the audience valuable - niche, countries, profession, survey results, newsletter or social reach, past sponsors and what they paid, currency. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Pricing scenarios, Direct or network, Rate sheet, Assumptions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an independent podcaster price their ad space. The usual mistakes: quoting lifetime downloads instead of a fixed window, picking one "industry CPM" from a blog and applying it blindly, selling too many slots and annoying listeners, giving away host-read endorsements at produced-ad prices, and forgetting the time cost of writing and recording reads, reporting and invoicing.

How podcast ads are usually priced:
- CPM = price per 1,000 downloads (impressions). Cost of one ad = downloads / 1,000 x CPM. Rates differ by position (pre-roll at the start, mid-roll inside the episode, post-roll at the end; mid-roll usually commands the most), by format (host-read usually above a produced spot the advertiser supplies), and by niche (specialist professional audiences command more than general entertainment).
- Flat fees per episode or per package suit small and niche shows where CPM maths produces tiny numbers that do not cover the work.
- Baked-in ads stay in the episode forever; dynamically inserted ads are swapped in by the hosting platform and can be sold against back-catalogue downloads too.
- Networks and marketplaces bring advertisers but take a share and may control which ads run; direct deals pay more per ad but need selling time.

Inputs: {{downloads_per_episode}} downloads per episode at about 30 days, {{episodes_per_month}} episodes per month.
</context>

<task>
{{#audience_notes}}
<audience_notes>
{{audience_notes}}
</audience_notes>
{{/audience_notes}}

1. Inventory: propose a listener-friendly slot plan per episode (for example one pre-roll and one mid-roll, at most about three minutes of ads in a 45-minute episode), and compute monthly sellable impressions per slot type: downloads x episodes x slots. Note back-catalogue inventory if dynamic insertion is possible.
2. Hidden costs and floor: estimate hours per deal for scripting, recording, revisions, reporting and invoicing, ask for or assume an hourly value ([X] if unknown), and state the minimum fee below which a deal is not worth taking.
3. Anchor the price to evidence before any assumption. If the notes include past deals or offers, back-calculate the implied CPM (fee / (downloads / 1,000) per slot) and use it as the middle scenario. If not, work backwards from the minimum fee in step 2: the CPM needed for one ad to cover the time it costs. Use the currency in the notes; if none is given, ask for it or state the one you assumed.
4. Pricing scenarios: build a table with three CPM levels (conservative, middle, ambitious) per slot type and format, each labelled with where it came from (past deal, cost floor, or an illustrative assumption the user must test with real offers), and compute price per ad, per episode and per month with the arithmetic shown. Add a flat-fee option for packages (for example four episodes plus a newsletter mention) and say when flat fee is better for this show: as a rough test, when the middle-scenario price per ad is below the minimum fee.
5. Direct or network: compare for this show size (revenue share, control, effort, payment terms), and suggest which to try first.
6. Rate sheet: a one-page draft with the audience description (from the notes only), the slot options, package prices, what the sponsor gets (read length, links in show notes, reporting), disclosure line, and terms placeholders [X] for payment, cancellation and exclusivity.
7. List what to check: real downloads at 30 days, audience proof sponsors will ask for, local tax and invoicing, and advertising disclosure rules where the show is published.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present CPM levels as assumptions to test with real offers, not market facts; do not cite specific industry figures or reports.
- Never inflate numbers: price only on the downloads given, at the stated window.
- Do not recommend specific ad networks or marketplaces by name; describe the types.
- Every ad must carry a clear disclosure that it is paid; host-read endorsements should only be offered for products the host can honestly speak about.
- Tax, contracts and invoicing: give the general picture and suggest an accountant or adviser for the person's country.
- If downloads or episode count are missing or zero, ask for them and stop. If the downloads figure looks like a lifetime or monthly total rather than per episode at about 30 days, ask before pricing.
</constraints>

<output_format>
## Inventory
Table: Slot | Length | Per episode | Monthly impressions.

## Pricing scenarios
Table: Slot and format | CPM | Basis (past deal, cost floor, illustrative) | Price per ad | Per month, with arithmetic. Then the minimum fee and the flat-fee packages.

## Direct or network
Short comparison and a first move.

## Rate sheet
The draft, ready to adapt.

## Assumptions to check
Bullets.
</output_format>
