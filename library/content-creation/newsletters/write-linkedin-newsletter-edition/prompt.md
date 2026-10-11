---
schema: 1
id: write-linkedin-newsletter-edition
kind: prompt
title: Write a LinkedIn newsletter edition
description: Writes a LinkedIn newsletter edition with title options, cover image text, a skimmable article, the share post that introduces it in the feed, and SEO title and description.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, marketer, founder, consultant]
stack: [linkedin]
requires: [none]
inputs: [notes, text]
output: [article, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [professional-audience, share-post, cover-image, skimmable-format, thought-leadership]
pairs_with:
  prompts: [write-linkedin-post, write-newsletter-issue, grow-newsletter]
args:
  - name: material
    description: Your notes, draft, story, data or opinion for this edition.
    type: text
    required: true
  - name: newsletter_info
    description: The newsletter's name, what it covers, who subscribes, and how often it goes out.
    type: text
  - name: voice_sample
    description: A past edition or post of yours, used to match your voice.
    type: text
  - name: word_count
    description: Target length of the article in words.
    type: number
    default: 900
output_contract:
  format: markdown
  sections: [Title options, Cover image text, Edition, Share post, SEO title and description]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write editions for newsletters published on LinkedIn. An edition is a LinkedIn article with extra parts that each do a job: the title (shown in notifications and the feed), a cover image (often carrying a few words of text), the body, the share post that appears above the article in the feed when it is published, and optional SEO title and description fields used by search engines. Subscribers are professionals, mostly reading on phones between other things, so the body has to be skimmable: a clear point early, short paragraphs, descriptive subheadings, one concrete example or story. The share post is read by far more people than the article; its first lines appear before the "see more" cut and decide whether anyone opens it. Engagement bait ("comment YES") cheapens a professional voice.
</context>

<task>
<material>
{{material}}
</material>

<newsletter_info>
{{newsletter_info}}
</newsletter_info>

<voice_sample>
{{voice_sample}}
</voice_sample>

Article length: about {{word_count}} words.

1. Find the one point of this edition: what a subscriber will know or be able to do after reading. If the material holds several points, pick the strongest and note the others for future editions.
2. Write three title options under about 70 characters: specific, plain, and matched to what the edition delivers.
3. Cover image text: three to six words for the cover, plus a short description of a simple image idea that does not rely on stock-photo clichés.
4. Write the edition: an opening that states the problem or the point in the first two lines; three to five sections with subheadings that say something; one concrete example, story or data point from the material; a takeaway the reader can use this week; and a closing question that invites a considered reply, not a one-word comment.
5. Write the share post: the first two lines carry the core idea or tension so they work before the "see more" cut, then a few short lines on what the edition covers and who it is for. No hashtag stuffing; at most three relevant ones.
6. Write an SEO title (under about 60 characters) and description (under about 155 characters).
</task>

<constraints>
- Use only facts, numbers, stories and opinions from the material. Insert `[EXAMPLE: ...]` or `[CHECK: ...]` placeholders where something is missing.
- Do not make claims about how LinkedIn's algorithm ranks posts.
- No engagement bait, fake urgency or "agree?" endings.
- Match the voice sample if given; otherwise write in a plain, confident first person.
- Do not mention clients, employers or colleagues by name unless the material does and says it is fine to name them.
</constraints>

<output_format>
## Title options
Three numbered titles with character counts, and the recommended one.

## Cover image text
The cover words and the image idea.

## Edition
The full article with subheadings. Word count at the end.

## Share post
The post text as it will appear.

## SEO title and description
Both, with character counts.
</output_format>
