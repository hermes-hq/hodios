---
schema: 1
id: write-referral-program-copy
kind: prompt
title: Write referral programme copy
description: Writes the copy for an existing referral programme - landing page, share messages, invite and reward emails, in-product prompts and a plain-language terms summary - leading with the friend's benefit.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text]
output: [copy, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [referral-programme, share-messages, word-of-mouth, reward-emails, refer-a-friend]
pairs_with:
  prompts: [design-referral-program, write-referral-programme-terms, ask-clients-for-referrals, write-landing-page-copy]
  personas: [copywriter]
args:
  - name: program
    description: How the programme works - reward for the referrer and for the friend, when each reward is given (sign-up, first purchase, after the refund period), limits, how sharing works (link, code, email invite) and where the programme appears.
    type: text
    required: true
  - name: product
    description: What you sell and why customers recommend it, ideally in their words from reviews.
    type: text
    required: true
  - name: channels
    description: The share channels to write for (for example WhatsApp, email, text message, LinkedIn, Instagram story). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Programme summary, Referral page copy, Share messages, Emails and prompts, Terms summary, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the words for referral programmes that are already designed. People recommend a product mainly to help a friend and to look good, not for the reward. Copy that leads with "Earn 20 USD" makes sharing feel like selling; copy that leads with what the friend gets ("Give your friends 20 USD off their first box") makes the referrer the generous one. Share messages work best when they sound like the referrer: short, personal, easy to edit, with the friend's benefit and the link.

Most referral complaints come from unclear conditions: rewards that arrive later than people expected, or not at all because a condition was hidden (the friend had to spend a minimum, the reward came after the refund window). The copy must state when rewards arrive and what the conditions are at the moment of sharing, and keep people informed with status emails. Incentivised recommendations can fall under endorsement and advertising disclosure rules in some markets, especially for public posts.
</context>

<task>
<program>
{{program}}
</program>

<product>
{{product}}
</product>

{{#channels}}Channels: {{channels}}{{/channels}}

1. If either reward, its timing or the main condition is unclear, ask and stop; the copy cannot be honest without them.
2. Summarise the programme in three lines a customer would understand.
3. Write the referral page: headline leading with the friend's benefit, one line on the referrer's reward, three steps (share, friend does X, you both get Y and when), the share area labels, a short FAQ (when rewards arrive, limits, what counts as a new customer, where to track referrals), and the link to full terms.
4. Write share messages for each channel, in the referrer's voice, with the friend's benefit and a placeholder for the link. For public posts, include a short disclosure that the sharer gets a reward.
5. Write the emails and prompts: the invitation to join the programme (and the moment to send it, such as after a good review or a repeat purchase), the friend's landing message, "your friend joined", "reward on its way" and "reward earned" emails, and one in-product or post-purchase prompt.
6. Write a plain-language terms summary of five to eight bullets, and point to the full terms.
7. Checks: conditions stated everywhere a reward is mentioned, disclosure for public sharing, and items to verify with whoever owns the terms.
</task>

<constraints>
- Use only the rewards, timings and conditions supplied; never invent bonuses, tiers or expiry dates. Mark unknowns as [CONFIRM: ...].
- Lead with the friend's benefit; mention the referrer's reward clearly but second.
- State the main condition and timing wherever a reward is promised.
- Do not write messages designed to look like unpaid personal reviews; public posts include a disclosure.
- The terms summary is not the legal terms; recommend the full terms be written or reviewed separately and checked for the markets you operate in.
</constraints>

<output_format>
## Programme summary
Three lines.

## Referral page copy
Each section labelled, ready to paste.

## Share messages
One block per channel.

## Emails and prompts
One block per message: trigger, subject line where relevant, body.

## Terms summary
Bullets.

## Checks
Checklist.
</output_format>
