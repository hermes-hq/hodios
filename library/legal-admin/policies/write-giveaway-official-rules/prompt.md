---
schema: 1
id: write-giveaway-official-rules
kind: prompt
title: Write giveaway official rules
description: Drafts the official rules for a giveaway, prize draw or contest - eligibility, entry routes, dates, prize details, how winners are chosen and notified, and platform and local legal points.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, content-creator, founder]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [giveaway-rules, prize-draw, sweepstakes, contest-terms, promotion-terms]
pairs_with:
  prompts: [plan-social-media-giveaway, write-privacy-policy]
args:
  - name: promotion
    description: The organiser, what people do to enter, the prize and its value, start and end dates and time zone, where it runs (Instagram, TikTok, website, in store), who can enter, and how the winner is picked.
    type: text
    required: true
  - name: jurisdictions
    description: Countries or states where entrants can live.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Legal shape check, Official rules, Short terms for the post, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The legal shape of a promotion decides what the rules must say. A promotion with a prize, chance and a payment or purchase to enter can be an illegal lottery in many places, which is why US sweepstakes offer a free "no purchase necessary" entry route and why many countries treat paid-entry prize draws differently from skill competitions judged on merit. Some places require registration or bonding above a prize value (some US states and certain other countries), restrict promotions to adults, or require the rules to be available before entry. Platforms add their own conditions: Meta's promotion rules for Instagram and Facebook require a release stating the platform does not sponsor or administer the promotion and restrict some entry mechanics such as tagging yourself in content, and other platforms such as TikTok publish their own promotion rules. Rules disputes usually come from missing basics: exact closing time and time zone, what happens if a winner does not respond, prize substitutions, and how personal data is used.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Promotion:
<promotion>
{{promotion}}
</promotion>

1. Legal shape check: is this a random draw, a skill contest or an instant win; is a purchase or payment involved; is there a free entry route; are there age, location or prize-value issues; and any mechanic that is likely prohibited by the platform (for example requiring shares or tagging friends as entry where the platform restricts it). Recommend changes before drafting.
2. Official rules:
   - Promoter name and address [BRACKETS].
   - Eligibility: age, location, exclusions (employees and families), one entry per person or limits.
   - How to enter, including the free entry route if needed, and dates with exact times and time zone.
   - Prize: description, approximate retail value, number of prizes, no cash alternative unless stated, substitution of equal value.
   - Winner selection: method, date, who judges and criteria for skill contests.
   - Notification, response deadline, alternate winners, proof of eligibility.
   - Taxes, delivery, and publicity consent as optional where required.
   - Platform release, limitation of liability, cancellation for fraud or technical problems, data use and privacy link.
   - Governing law [JURISDICTION] and where to find the rules.
3. Short terms for the post: two or three lines for the social post or landing page linking to the full rules.
4. Points to confirm: lottery and registration rules, age limits, prize tax and platform terms, marked to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never design paid-entry chance promotions without flagging the illegal lottery risk; recommend a free route or a skill element and confirmation.
- Do not state registration thresholds, bonding amounts or tax rules as fact unless supplied; mark them to confirm.
- Do not include entry mechanics the named platform is known to restrict; say why and suggest an alternative.
- Use [BRACKETS] for organiser details; never invent them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Legal shape check
Bullets with recommendations.

## Official rules
Numbered sections.

## Short terms for the post
Two or three lines.

## Points to confirm
Numbered.
</output_format>
