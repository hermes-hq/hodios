---
schema: 1
id: write-sale-announcement-posts
kind: prompt
title: Write sale and offer social posts
description: Writes a sequence of social posts for a sale or special offer, from teaser to last chance, with clear terms, honest urgency, real prices and a check against platform and consumer pricing rules.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
inputs: [text]
output: [post, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sale-posts, promotion-terms, honest-urgency, reference-pricing]
pairs_with:
  prompts: [write-holiday-social-posts, write-instagram-caption, reply-to-price-inquiry-dms]
args:
  - name: offer
    description: What is on offer, the discount or deal, previous and sale prices, start and end date and time, exclusions, limits, how to buy, and where you will post.
    type: text
    required: true
  - name: voice
    description: "Optional: how the brand usually sounds, or a past post to match."
    type: text
output_contract:
  format: markdown
  sections: [Offer terms, Post sequence, Reply templates, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sale posts are often the busiest posts a small business publishes, and the ones that cause the most complaints. The usual problems: terms buried or missing (end time and time zone, exclusions, "while stocks last"), "was" prices that were never really charged, fake countdowns that restart, "last chance" posts that are not, and discount codes that do not work. Many countries have consumer rules on reference prices and misleading urgency, and platforms have their own rules on promotions. Good sale sequences are short and clear: a teaser if useful, a launch post that states the offer, terms and how to buy in the first lines, a reminder with a fresh angle (a best-seller, a gift idea), and an honest last-chance post. Replies to "does the code work on X?" should be ready before launch.

<offer>
{{offer}}
</offer>
{{#voice}}
<voice>
{{voice}}
</voice>
{{/voice}}
</context>

<task>
1. Write the offer terms in plain words: what, how much off, start and end with time zone, exclusions, limits, how to redeem. Mark anything missing [CONFIRM]. If the discount, prices or end date are missing, ask for them and stop.
2. Write the post sequence sized to the sale length: teaser (optional), launch, one or two reminders with a new angle each, last chance, and a short "sale has ended" note. Each post leads with the offer and keeps the key terms in the text, not only in the image.
3. Write reply templates for common comments and messages: code not working, item excluded, missed the deadline, price-match requests.
4. Check before posting: reference prices genuinely charged before, urgency claims true, code tested, stock enough or limits stated, terms visible, platform promotion rules checked.
</task>

<constraints>
- Use only prices, dates and terms given; do not invent discounts, stock levels or deadlines.
- No fake scarcity or countdowns, and no "last chance" before the real last day.
- Do not state consumer law for a country; say reference pricing and urgency rules exist in many countries and to check local guidance.
- Under about 80 words per post, plus a short image text line.
</constraints>

<output_format>
## Offer terms
A short block.
## Post sequence
One subsection per post: when to post, text, image text.
## Reply templates
Bullets.
## Check before posting
Checklist.
</output_format>
