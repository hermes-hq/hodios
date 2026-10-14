---
schema: 1
id: write-onsite-popup-copy
kind: prompt
title: Write website popup and announcement bar copy
description: Writes email-capture popups, exit-intent and slide-in messages and announcement-bar lines, with the offer, trigger and frequency rules, consent wording and a neutral decline option.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [popup, exit-intent, announcement-bar, email-capture, list-growth]
pairs_with:
  prompts: [create-lead-magnet, write-newsletter-signup-page, write-thank-you-page-copy, grow-email-list-in-store]
  rules: [email-consent-rules]
  personas: [copywriter]
args:
  - name: site
    description: What the site sells or publishes, who visits, and where most visitors come from (search, social, ads, returning customers).
    type: text
    required: true
  - name: offer
    description: What people get for signing up or what you want to announce (for example "10% off first order", "free sizing guide", "free UK delivery over 40 GBP this week", "weekly recipes"). Include the real terms.
    type: text
    required: true
  - name: formats
    description: Which formats you want - entry popup, exit-intent, slide-in, announcement bar, or all. Optional; the prompt recommends formats otherwise.
    type: string
  - name: market
    description: Countries your visitors are in, for the consent wording check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Offer and triggers, Popup copy, Announcement bar copy, Display rules, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write on-site capture and announcement messages for shops, publishers and service sites. A popup interrupts; it only earns its place with a clear, specific reason to act ("Get 10% off your first order", "Free fit guide: find your size in 2 minutes"), not "Join our newsletter". What works is matching the message to the visitor's moment: a first-visit offer after some engagement (time on page or scroll depth) rather than on landing, an exit-intent message that answers why they are leaving (price, unsure about size, shipping cost), and an announcement bar for one current fact (delivery threshold, sale end date, holiday cut-off).

The common failures are popups that fire instantly on mobile and cover the content (search engines may demote pages with intrusive mobile interstitials, and visitors leave), showing the same popup on every page view, confirmshaming decline links ("No thanks, I like paying full price"), and capture forms without clear consent wording. Marketing email consent rules differ by country, so the form must say what people will receive and how to unsubscribe.
</context>

<task>
<site>
{{site}}
</site>

<offer>
{{offer}}
</offer>

{{#formats}}Formats: {{formats}}{{/formats}}

{{#market}}Markets: {{market}}{{/market}}

1. If the offer or its terms are unclear (discount size, minimum order, expiry), ask and stop.
2. Offer and triggers: recommend which formats to use for this site and visitor mix, the trigger for each (time, scroll depth, exit intent, page type), and who should not see it (existing subscribers, people at checkout, visitors who just closed it).
3. Write the popup copy for each chosen format: headline, one supporting line, field labels (email only, or one extra field if it truly helps segmentation), button text, consent line, neutral decline label, and the success message with how the code or resource is delivered.
4. Write two variants of the main popup headline to test.
5. Write three announcement bar lines, each with one fact and an optional link label, and say when each should run.
6. Write display rules: frequency cap, mobile behaviour (smaller format, easy close), suppression rules and when to retire the message.
7. Write checks: offer terms stated, consent wording reviewed for the markets, discount codes work, accessibility (focus moves to the popup, close button reachable by keyboard and screen readers, Escape closes it).
</task>

<constraints>
- Use only the offer and terms supplied; never invent discounts, deadlines or "today only" urgency.
- Decline labels are neutral ("No thanks", "Maybe later"). No guilt or mockery.
- Headline under about 8 words; supporting line under about 20 words; button text starts with a verb and names what they get.
- Consent wording says what they will receive and that they can unsubscribe; flag that it must be checked against the email consent rules for the visitors' countries rather than stating the law.
- Do not recommend instant full-screen popups on mobile.
</constraints>

<output_format>
## Offer and triggers
A table: Format | Trigger | Audience | Do not show to.

## Popup copy
One block per format with each element labelled, plus the headline variants.

## Announcement bar copy
Three lines with when to run each.

## Display rules
Bullets: frequency, mobile, suppression, retirement.

## Checks
Checklist.
</output_format>
