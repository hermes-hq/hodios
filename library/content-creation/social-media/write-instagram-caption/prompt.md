---
schema: 1
id: write-instagram-caption
kind: prompt
title: Write an Instagram caption
description: Writes Instagram caption options with a hook, a call to action, relevant hashtags and descriptive alt text for the image. Use when posting a photo, carousel or Reel on Instagram.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, founder]
stack: [instagram]
inputs: [text, image]
output: [post, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [captions, hashtags, alt-text, call-to-action, brand-voice]
pairs_with:
  prompts: [write-short-form-script, reply-to-comments]
args:
  - name: post_description
    description: What the image, carousel or Reel shows (subjects, setting, colours, any text in it), what the post is for, and any facts to include (product, price, date, location, link in bio).
    type: text
    required: true
  - name: brand_voice
    description: How the account sounds (for example "warm, a bit nerdy, no exclamation marks") or two past captions. Leave empty for a friendly, plain voice.
    type: text
  - name: count
    description: How many caption options to write.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Captions, Alt text, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Instagram captions for brands and creators. The feed shows only the first line or so (about 125 characters) before "more", so that line has to earn the tap by adding something the image does not already say. Saves and shares signal more value than likes, so the strongest calls to action give people a reason to save or send the post. Instagram's own guidance favours a few relevant hashtags (three to five) over long blocks. Alt text is read by screen readers to people who cannot see the image; it describes what is in the image plainly, without marketing language or hashtags.
</context>

<task>
Write {{count}} caption options.

<post_description>
{{post_description}}
</post_description>

<brand_voice>
{{brand_voice}}
</brand_voice>

1. Identify what the post is for (sell, teach, show behind the scenes, announce, build community) and the one action you want from the viewer.
2. Write the captions, each with a different approach (for example a short punchy line, a mini story, a useful tip or list, a question that invites a real answer). Each caption has:
   - A first line under 125 characters that adds context, tension or value beyond the image.
   - A body that fits the approach: from one line to about 150 words. Use line breaks for readability.
   - One call to action matched to the purpose: save for later, send to someone specific, comment with a real answer to a specific question, tap the link in bio, or visit the place.
   - Three to five hashtags: a mix of specific niche tags and one broader tag, all relevant to the actual content.
3. Write one alt text for the image: what is in it, in plain words, in under 150 characters, including any important text that appears in the image.
4. Notes: anything you assumed and any fact (price, date, link) the author must confirm.
</task>

<constraints>
- Match the brand voice; if it is empty, write friendly and plain. Use emojis only if the voice allows them, and never more than three per caption.
- Do not invent prices, dates, discounts, locations, product claims or visual details that are not in the description. Describe in alt text only what the description says is in the image; flag missing visual details in the notes.
- No engagement bait ("comment 🔥 if you agree", "tag 3 friends") and no banned or irrelevant trending hashtags.
</constraints>

<output_format>
## Captions
One sub-heading per option naming its approach; the caption text, then the hashtags on their own line.

## Alt text
One line.

## Notes
Bullets.
</output_format>
