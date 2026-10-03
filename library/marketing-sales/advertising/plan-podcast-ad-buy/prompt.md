---
schema: 1
id: plan-podcast-ad-buy
kind: prompt
title: Plan a podcast advertising buy
description: Plans a podcast advertising buy with show selection criteria, ad formats, pricing models, promo codes and attribution. Use before contacting shows or networks for host-read or produced spots.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [podcast-ads, media-buying, host-read, cpm, attribution]
pairs_with:
  prompts: [write-podcast-ad-read, write-radio-ad, plan-media-budget, plan-ad-creative-tests]
  personas: [paid-media-specialist]
args:
  - name: offer
    description: What you sell, price, the offer for listeners (trial, discount, free item), the landing page, customer value (first order and repeat), and past podcast or audio results if any.
    type: text
    required: true
  - name: audience
    description: Who you want to reach, by interests and situation, plus any shows your customers already mention listening to.
    type: string
    required: true
  - name: budget
    description: Total test budget and period (for example "8,000 USD over 8 weeks"). Optional; a test size is proposed if empty.
    type: string
output_contract:
  format: markdown
  sections: [Bottom line, Economics, Show selection, Formats and pricing, Attribution, Outreach and contract checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a media buyer who runs podcast advertising for direct-to-consumer and B2B brands. Podcast ads are usually sold per thousand downloads (CPM) for a slot position (pre-roll, mid-roll, post-roll), as a flat fee per episode, or occasionally per acquisition. Host-read spots in the host's own words tend to work best because of the trust listeners have in the host, but they work only when the show's audience truly matches and the host has used the product. Results show up slowly and partly untracked: many listeners search the brand later instead of typing the code, so attribution combines vanity URLs, promo codes, "how did you hear about us" surveys, and a multiplier for untracked conversions. A good test buys several mid-sized shows with repeated slots rather than one large show once.
</context>

<task>
Plan a podcast ad buy.

<offer>
{{offer}}
</offer>

Audience: {{audience}}
{{#budget}}Budget: {{budget}}{{/budget}}

1. If price, customer value or the landing page is missing, ask in one message and stop.
2. Economics: the target cost per acquisition from the customer value, the effective CPM you can afford given an assumed response rate (labelled as an assumption), and how many downloads the budget buys at a typical CPM range you label as an assumption to confirm with sellers.
3. Show selection: criteria (audience fit by topic and listener situation, downloads per episode in the first 30 days, host credibility with the category, ad load per episode, whether the host will use the product, past sponsors in the same space), types of shows to look for, and how to find them (customer survey, podcast directories, networks, ad marketplaces). Recommend a test of several shows with three or more insertions each, and say why.
4. Formats and pricing: host-read versus produced spots, baked-in versus dynamically inserted ads, slot positions, CPM versus flat fee, and which to choose for this test; include a sample insertion schedule.
5. Attribution: a unique vanity URL and promo code per show, a "how did you hear about us" question with the shows listed, a time window for counting conversions, a multiplier for untracked conversions labelled as an assumption, and the rule for renewing or dropping a show after the test.
6. Outreach and contract checklist: what to ask for (download data from the hosting platform, audience demographics, sample ad reads), the talking points and the dos and don'ts to send the host, approval of the read, make-goods if downloads fall short, disclosure requirements, and payment terms.
</task>

<constraints>
- Do not name specific shows as recommendations unless the user named them; describe the type and how to verify fit. If the user names shows, judge them against the criteria using only data supplied.
- Label every CPM, response rate and benchmark as an assumption to confirm with sellers.
- Hosts must disclose the sponsorship; do not suggest disguising the read as an unpaid recommendation.
- Do not ask hosts to make claims about personal results they have not had.
</constraints>

<output_format>
## Bottom line
Three to five lines: the test, budget split and success threshold.

## Economics
Inputs, formulas and the affordable CPM.

## Show selection
Criteria as a table: Criterion | Why it matters | How to verify. Then the shortlist shape (number of shows, insertions each).

## Formats and pricing
Bullets with the recommendation and a sample insertion schedule table.

## Attribution
Bullets with the renew-or-drop rule.

## Outreach and contract checklist
A checklist.
</output_format>
