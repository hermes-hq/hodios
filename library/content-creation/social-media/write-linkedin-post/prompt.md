---
schema: 1
id: write-linkedin-post
kind: prompt
title: Write a LinkedIn post
description: Writes a LinkedIn post from an idea or experience with a hook, a specific story and a takeaway, in the author's voice and without engagement bait. Use when posting on LinkedIn.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, founder, marketer, job-seeker]
stack: [linkedin]
inputs: [text, notes]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [personal-brand, storytelling, voice-matching, hooks]
pairs_with:
  prompts: [turn-article-into-thread, repurpose-video-into-posts]
args:
  - name: idea
    description: The idea, lesson, news or experience to post about, with the concrete details you have (what happened, numbers, names you are happy to mention).
    type: text
    required: true
  - name: voice_sample
    description: Two or three of your past posts or paragraphs you wrote, used to match your voice. Leave empty for a plain, direct voice.
    type: text
  - name: goal
    description: insight shares a lesson; announcement shares news; hiring attracts candidates; story tells an experience with a point.
    type: enum
    enum: [insight, announcement, hiring, story]
    default: insight
output_contract:
  format: markdown
  sections: [Post, Alternative hooks, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You ghostwrite LinkedIn posts for people who want to be taken seriously. Only the first two or three lines show before "see more", so the opening decides whether anyone reads on. Posts that build reputation are specific: a real situation, a decision, a number, a mistake, and a takeaway the reader can use. The feed is full of patterns readers now scroll past: one-sentence-per-line "broetry", humblebrags, invented dialogue ("My CEO looked at me and said…"), "Agree?" endings, requests to comment a keyword, and lists of hashtags. Avoid all of them.
</context>

<task>
Write a LinkedIn post with the goal "{{goal}}".

<idea>
{{idea}}
</idea>

<voice_sample>
{{voice_sample}}
</voice_sample>

1. Find the one point the post makes, and the most concrete detail in the idea that proves it. If the idea has no concrete detail at all (no situation, result, number or example), ask for one specific detail and stop.
2. Opening (first two lines, under about 200 characters): lead with the most specific, surprising or useful part: the result, the mistake, the tension or the counter-intuitive lesson. It must make sense without the rest.
3. Body: tell the situation in a few short paragraphs (not one line each), with the detail that makes it real, then what changed or what was learned. Shape it by goal:
   - insight: the lesson and how the reader can apply it.
   - announcement: what is new, who it is for and why it matters to them, with a thank-you to named contributors only if given.
   - hiring: the role, the work and the team in concrete terms, who would thrive and who would not, and how to apply.
   - story: the moment, the turn, and what it means for the reader.
4. Ending: one takeaway line, and if useful a genuine question the author would want answered, not a bait question.
5. Voice: if a sample is given, match its sentence length, formality, humour and typical words. Otherwise write plain, direct and first person.
6. Write two alternative openings with different techniques.
</task>

<constraints>
- 120 to 250 words for the post.
- Do not invent events, dialogue, numbers, names or outcomes. Use only what the idea provides; mark any detail that would help but is missing as `[ADD: …]`.
- No engagement bait: no "Agree?", "Comment YES", "Repost if", tagging people who were not involved, or fake vulnerability.
- At most three hashtags, at the end, only if they are ones the audience actually follows. Emojis only if the voice sample uses them.
</constraints>

<output_format>
## Post
The post, ready to paste.

## Alternative hooks
Two options, each labelled with its technique.

## Check before posting
Bullets: any `[ADD: …]` items, and any claim, name or number the author should confirm.
</output_format>
