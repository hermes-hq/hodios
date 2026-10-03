---
schema: 1
id: write-guest-promo-kit
kind: prompt
title: Write a podcast guest promo kit
description: Writes a promo kit for podcast guests with a thank-you email, links, summaries, social posts in the guest's voice, clips and quote cards. Use when a guest episode is about to go live.
category: podcasting
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, marketer]
inputs: [transcript, notes]
output: [copy, post, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guest-promotion, promo-kit, podcast-clips, quote-cards]
pairs_with:
  prompts: [write-show-notes, plan-podcast-growth, write-podcast-guest-pitch]
  personas: [podcast-producer]
args:
  - name: episode
    description: The episode title, release date, links, the show's handles, a summary or show notes, and the transcript or the best moments with timestamps.
    type: text
    required: true
  - name: guest
    description: The guest's name, role, and their social platforms or handles.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Email to the guest, Links and details, Summaries, Social posts, Clip suggestions, Quote cards, Fill before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare promo kits that podcast guests actually use. Guests are often the biggest single source of new listeners for an interview show, but most never share their episode because it takes effort: they would have to find the link, decide what to say, and make a graphic. A good kit removes every step. It arrives on release day, thanks the guest specifically, gives every link in one place, and offers copy they can post as is, written in their voice and from their point of view ("I joined…"), not the show's. It also gives the show's editor clips and quote cards drawn from the guest's best moments. Guests share more when the copy makes them look good and gives their audience a reason to listen.
</context>

<task>
<episode>
{{episode}}
</episode>

Guest: {{guest}}

1. **Email to the guest:** a short thank-you that names a specific moment from the conversation, the release date and link, what is in the kit, and a light, specific ask (share once on the platform where their audience is, and tag the show). No pressure, no guilt.
2. **Links and details:** episode title, release date, the main listening links, the show's handles to tag, and the suggested hashtag if the show has one.
3. **Summaries:** a one-line hook, a 50-word summary and a 100-word summary, each written so the guest can paste it into a newsletter or a website.
4. **Social posts** written in first person for {{guest}}, one for each of their platforms (or for LinkedIn, Instagram and X if none are given), each native to the platform: a hook drawn from what they said, one takeaway, why their audience will care, and the link or a "link in bio" note. Add one version the show posts from its own account, tagging the guest.
5. **Clip suggestions:** three to five moments from the transcript of 20 to 60 seconds, each with the timestamp or opening words, a one-line reason it works out of context, and a caption.
6. **Quote cards:** three short quotes, word for word from the transcript, under 20 words each, with the attribution.
</task>

<constraints>
- Quotes and clip text must be verbatim from the episode material. If there is no transcript, write `[QUOTE: …]` slots describing what kind of quote to pull, never invented words.
- Do not overstate the guest's credentials or the episode's content; use only what the notes say.
- Respect platform norms: links in captions only where they work, few and specific hashtags, and alt text for quote cards.
- Missing links, dates or handles become `[FILL: …]`.
- If the guest's voice is unknown, write in a warm, professional first-person voice and note that the guest may want to adjust it.
</constraints>

<output_format>
## Email to the guest
## Links and details
## Summaries
## Social posts
Each post headed by the platform and who posts it.

## Clip suggestions
A table: # | location | length | why it works | caption.

## Quote cards
Each quote with attribution and alt text.

## Fill before sending
Every placeholder.
</output_format>
