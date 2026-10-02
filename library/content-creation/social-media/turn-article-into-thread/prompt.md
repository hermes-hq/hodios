---
schema: 1
id: turn-article-into-thread
kind: prompt
title: Turn an article into a thread
description: Turns an article or blog post into a native thread for X, Threads or Bluesky with a standalone hook, one idea per post and a closing link. Use when promoting long-form writing.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, writer]
stack: [x-twitter]
inputs: [document, text, url]
output: [post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [repurposing, character-limits, hooks, long-form-to-short-form]
pairs_with:
  prompts: [write-linkedin-post, repurpose-video-into-posts]
args:
  - name: article
    description: The full article text (not just a link), plus its URL if you want it in the last post.
    type: text
    required: true
  - name: platform
    description: Where the thread will be posted; this sets the per-post character limit and conventions.
    type: enum
    enum: [x-twitter, threads, bluesky]
    default: x-twitter
  - name: max_posts
    description: The most posts the thread may have, including the hook and the closing post.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Core idea, Thread, Alternative hooks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn long-form writing into threads that people read to the end. A thread is not an article chopped into pieces: most readers see only the first post in their feed, so it must stand alone and make the rest feel worth opening. After that, each post carries one idea, reads well on its own if quoted or reposted, and pulls the reader to the next one. Limits per post: x-twitter 280 characters (for standard accounts), threads 500, bluesky 300. Many platforms show posts with external links to fewer people, so the link to the article belongs in the last post, not the first.
</context>

<task>
Turn this article into a thread for {{platform}} of at most {{max_posts}} posts.

<article>
{{article}}
</article>

1. Find the one core idea or most useful takeaway of the article, and the three to eight supporting points that matter most to a reader who will never open the article. Leave out the rest.
2. Write the hook post: the core idea as a specific claim, result, or problem the reader has, with a reason to keep reading. No "A thread", "Let's dive in" or "1/🧵" filler, and no link.
3. Write one post per supporting point, in an order that builds. Each post: one idea, a concrete detail from the article (an example, number or step), and plain language. Use short lines and line breaks where they help reading on a phone.
4. Write the closing post: the takeaway restated in one line, the link to the article if one was given (otherwise `[ARTICLE LINK]`), and one soft call to action (read the full piece, follow for more on the topic, or a question to reply to).
5. Count the characters of every post and keep each within the {{platform}} limit. Write two alternative hook posts using different techniques.
</task>

<constraints>
- Use only claims, numbers and examples from the article. Do not add statistics, quotes or opinions it does not contain.
- Keep the author's stance and voice; do not make the article's claims stronger than the article does.
- Hashtags: none on x-twitter and bluesky unless the article's community clearly uses one; at most one topic tag on threads.
- If the article is too short or thin for a thread, say so and write a single post instead.
- Fewer, stronger posts beat reaching {{max_posts}}.
</constraints>

<output_format>
## Core idea
One sentence.

## Thread
Numbered posts, each in its own block, followed by its character count in brackets, for example `[214/280]`.

## Alternative hooks
Two options, each labelled with its technique.
</output_format>
