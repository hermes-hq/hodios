---
schema: 1
id: write-video-chapters
kind: prompt
title: Write a video description with chapters
description: Writes a YouTube description with timestamped chapters, labelled links and searchable keywords from a video transcript. Use when publishing a long video.
category: video
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, marketer]
stack: [youtube]
inputs: [transcript, url]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [video-description, chapters, timestamps, video-seo]
pairs_with:
  prompts: [write-youtube-script, package-video-title-thumbnail, write-show-notes]
args:
  - name: transcript
    description: The video transcript with timestamps (an auto-generated caption export works). Without timestamps, chapters cannot be placed.
    type: text
    required: true
  - name: links
    description: Links to include, each with a short label (resources mentioned, products, social profiles, related videos). Leave empty for none.
    type: text
output_contract:
  format: markdown
  sections: [Description, Chapter check, Keywords used]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write YouTube descriptions that help both people and search. Only the first two lines or so show before "more", in search results and under the player, so they must say what the viewer gets in plain words. Chapters let viewers jump to what they need and appear in search, but the platform only shows them when the list follows its rules: the first timestamp is `0:00`, there are at least three chapters, they are in ascending order, and each lasts at least 10 seconds. Keywords help when they are the words viewers actually type, used naturally; stuffing them in or adding unrelated terms is against platform policy and hurts trust.
</context>

<task>
Write the description for this video.

<transcript>
{{transcript}}
</transcript>

<links>
{{links}}
</links>

1. Check that the transcript has timestamps. If it does not, stop and ask for a timestamped transcript or caption export; do not estimate times.
2. Find the main search phrase and two to four related phrases from what the video actually covers, in the words a viewer would type.
3. Write the description:
   - Two opening lines that state what the video delivers and who it is for, with the main phrase used naturally.
   - A short paragraph (two to four sentences) on what it covers.
   - Chapters: one line per topic shift, `M:SS Title` (or `H:MM:SS` past an hour), starting at `0:00`. Chapter titles name what the viewer gets, in three to six words, not "Part 2". Aim for one chapter every two to five minutes of content, never fewer than three.
   - Links: only the links supplied, each with its label. For a resource the speaker mentions that has no supplied link, add `[LINK NEEDED: name]`.
   - A one-line call to action if the transcript contains one; otherwise leave it out.
4. Check the chapters against the rules and report the result.
</task>

<constraints>
- Never invent URLs, product names, discount codes or claims that are not in the transcript or the links.
- Chapter timestamps must come from the transcript, at the moment the new topic starts.
- No hashtag lists or keyword blocks; at most three hashtags, only if clearly relevant.
- Keep the description under 300 words, excluding chapters and links.
</constraints>

<output_format>
## Description
The full description in one plain-text code block, ready to paste.

## Chapter check
One line each: starts at 0:00, at least three, ascending, each at least 10 seconds (pass or fail with the fix).

## Keywords used
The main phrase and related phrases, plus any `[LINK NEEDED]` items to resolve.
</output_format>
