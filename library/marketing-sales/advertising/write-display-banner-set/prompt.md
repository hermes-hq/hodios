---
schema: 1
id: write-display-banner-set
kind: prompt
title: Write a display banner set
description: Writes copy for a set of display and retargeting banners across standard sizes, with headline and CTA lengths fitted to each size, frame-by-frame copy for animated versions and the hierarchy per size.
category: advertising
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, designer, copywriter]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [display-banners, retargeting, iab-sizes, html5-banners, responsive-display, ad-frames]
pairs_with:
  prompts: [write-social-ad-variations, check-ad-landing-message-match, plan-ad-creative-tests]
  personas: [ad-creative-strategist]
args:
  - name: offer
    description: Product or service, the offer and its terms, the main benefit, proof you can use (reviews, numbers, awards), the landing page, brand rules (logo, colours, tone) and any words that must or must not appear.
    type: text
    required: true
  - name: sizes
    description: The sizes needed, for example "300x250, 728x90, 160x600, 320x50", or "responsive display" for platform-assembled ads.
    type: string
    default: standard IAB set
  - name: audience_stage
    description: prospecting = people who do not know you yet; retargeting = people who visited the site or viewed a product.
    type: enum
    enum: [prospecting, retargeting]
    default: prospecting
output_contract:
  format: markdown
  sections: [Core message, Copy by size, Animated frames, Responsive assets, Design notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs copy for a banner set that a designer will build. Display banners are seen in peripheral vision on a page the viewer came to read, so each size must get one idea across in about two seconds: brand, benefit, action. Banner copy fails when one long headline is squeezed into every size (unreadable at 320x50), when the call to action is vague, when animated banners hide the message in a late frame, and when retargeting banners repeat a prospecting pitch instead of answering why the visitor did not buy. Most networks cap animation length (often about 15 to 30 seconds and a limited number of loops) and file weight, and require the final frame to stand alone; tell the user to confirm the current specs for their network.

Sizes: {{sizes}}
Audience stage: {{audience_stage}}
</context>

<task>
<offer>
{{offer}}
</offer>

1. If the offer, the main benefit or the landing page is missing, ask in one message and stop.
2. Core message: one benefit line, one proof point, one call to action of two to four words that names the action ("Get your quote", "See the range"). For retargeting, pick the likely reason the visitor left (price, trust, timing, comparison) and answer it (reviews, guarantee, free returns, the viewed product with an offer), and keep frequency in mind.
3. Copy by size. If "standard IAB set", use 300x250, 336x280, 728x90, 160x600, 300x600, 320x50, 320x100 and 970x250. Fit word counts to space: 320x50 and 728x90 carry about 5 to 8 words in total; 300x250 about 10 to 15; 300x600 and 160x600 can stack a headline, a short line and the CTA. For each size give headline, optional support line and CTA, with character counts.
4. Animated frames for 300x250 and 728x90: three or four frames (hook, benefit or product, proof, end frame with logo, offer and CTA), seconds per frame, and confirm the end frame alone makes sense.
5. If "responsive display" is requested or useful, give platform-assembled assets: up to five short headlines (about 30 characters), one long headline (about 90), up to five descriptions (about 90), and the business name, each as a separate line.
6. Design notes per size group: what the eye should hit first, logo placement, minimum text size, contrast, CTA as a button shape, and image direction.
</task>

<constraints>
- Use only claims and offers the user supplied; no invented discounts, ratings or awards.
- No fake buttons, fake close icons, fake system alerts or misleading interface elements; these break network policies.
- Keep each size readable on its own; never rely on a previous frame for meaning in the end frame.
- Label character and timing limits as typical and to be confirmed with the ad network's current specs.
</constraints>

<output_format>
## Core message
Benefit, proof, CTA, and for retargeting the objection answered.

## Copy by size
A table: Size | Headline | Support line | CTA | Characters.

## Animated frames
For each animated size, a table: Frame | Seconds | Copy | Visual.

## Responsive assets
Lists with character counts, or "Not requested".

## Design notes
Bullets by size group (rectangles, leaderboards, skyscrapers, mobile).
</output_format>
