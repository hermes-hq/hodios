---
schema: 1
id: check-ad-landing-message-match
kind: prompt
title: Check ad and landing page match
description: Checks message match between ads and the page they send to (promise, offer, keyword, visual, CTA, price), scores each pair and names the mismatches that waste clicks and the edit that fixes each.
category: advertising
version: 1.0.0
status: incubating
stage: [review, verify]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text, url, image]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [message-match, landing-pages, conversion-rate, scent, ad-relevance]
pairs_with:
  prompts: [write-landing-page-copy, analyze-ad-performance, write-google-ads, write-social-ad-variations]
  personas: [paid-media-specialist, ad-creative-strategist]
args:
  - name: ads
    description: The ads to check, each with its text (headline, body, CTA), the keyword or audience it targets, the image or video described, and the destination URL. Number them.
    type: text
    required: true
  - name: landing_page
    description: The landing page content as pasted text or a description of what loads above the fold on mobile and desktop (headline, subhead, image, offer, price, CTA button, form), plus anything further down that matters. If ads go to different pages, paste each and label it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Match scores, Mismatches and fixes, Above the fold check, What to test first]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs ads that get clicks but not enough conversions. A common cause is a broken promise: the ad says one thing and the page says another, so the visitor wonders if they are in the right place and leaves within seconds. Message match covers six things the visitor checks without thinking: the promise or benefit, the offer and its terms, the keyword or product they searched or clicked, the visual (same product, same person, same colours), the call to action, and the price. Search ads also lose quality score when the page does not reflect the keyword. Reviews go wrong when they judge the page in general instead of from the point of view of someone who just clicked a specific ad, and when they suggest a full redesign where a headline change would do.
</context>

<task>
<ads>
{{ads}}
</ads>

<landing_page>
{{landing_page}}
</landing_page>

1. If the ads or the landing page content above the fold are missing, ask for them in one message and stop.
2. For each ad and its destination, read the page as the person who clicked that ad. Score six dimensions from 0 to 2 (0 missing or contradicted, 1 present but buried or reworded, 2 clear above the fold): promise, offer, keyword or product, visual, CTA, price. Total out of 12.
3. List every mismatch: what the ad said, what the page shows, why it costs conversions (doubt, extra search, surprise at price, wrong product), and severity: high when it contradicts the ad (different price, expired offer, product not on page), medium when the visitor must scroll or search to confirm, low when the wording differs but the meaning holds.
4. For each mismatch, give the smallest fix: change the ad, change the page headline or hero, add a dynamic or dedicated landing page, or send the ad to a deeper page. Say which side to change and why (change the ad when the page is right for most traffic; change the page when several ads share the same promise).
5. Above the fold check on mobile: does a visitor see within about five seconds what this is, that it matches the ad, what it costs or what to do next.
6. Rank what to test first by traffic and severity.
</task>

<constraints>
- Judge only what the user pasted; if part of the page is described rather than pasted, say the check depends on that description.
- Do not invent conversion rates or quality scores; describe the expected direction of the effect.
- Do not recommend copy that overstates the offer to match the ad; if the ad promised something the business cannot deliver, fix the ad.
- Keep fixes concrete: rewritten headline, moved element, changed URL.
</constraints>

<output_format>
## Summary
Three lines: the weakest pair, the biggest single fix, overall state.

## Match scores
A table: Ad | Destination | Promise | Offer | Keyword or product | Visual | CTA | Price | Total /12.

## Mismatches and fixes
A table: Ad | Ad says | Page shows | Effect | Severity | Fix | Change ad or page.

## Above the fold check
Bullets per page on mobile.

## What to test first
A numbered list of up to five changes with the reason.
</output_format>
