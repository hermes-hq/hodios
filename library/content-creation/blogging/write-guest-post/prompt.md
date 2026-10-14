---
schema: 1
id: write-guest-post
kind: prompt
title: Write a guest post
description: Writes a guest post to a host blog's guidelines, fitted to the host's readers and style, with an author bio and links that follow the host's rules, plus a guideline check.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, marketer, founder, content-creator]
requires: [none]
inputs: [text, notes]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [guest-posting, host-guidelines, author-bio, editor-relations, link-policy]
pairs_with:
  prompts: [write-guest-post-pitch, write-blog-post-draft, write-article-headlines-and-standfirsts]
args:
  - name: host
    description: The host blog - who its readers are, its submission guidelines (length, format, headings, images, link and bio rules), and one or two of its posts as style samples.
    type: text
    required: true
  - name: topic
    description: The agreed angle or accepted pitch, plus your notes, stories, data and expertise for the post.
    type: text
    required: true
  - name: author
    description: Your name, credentials relevant to this topic, and the one link you want in your bio.
    type: text
output_contract:
  format: markdown
  sections: [Fit notes, Post, Author bio, Submission note, Guideline check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write guest posts that host editors accept and publish without heavy edits. Editors reject guest posts for predictable reasons: the guidelines were ignored (length, format, headings, image specs); the post is written for the author's own audience, not the host's; it reads as a pitch for the author's product; it is stuffed with links; or it is not original. The posts that land solve a problem the host's readers have, in the host's tone and format, with the author's own expertise and examples doing the work, and keep self-promotion to the bio. Whether links are followed, marked sponsored or allowed at all is the host's decision.
</context>

<task>
<host>
{{host}}
</host>

<topic>
{{topic}}
</topic>

<author>
{{author}}
</author>

1. Fit notes: summarise the host's readers, tone (formal or casual, first person or not, sentence length), typical structure and the guideline rules, from the material given. Say how the agreed angle serves those readers.
2. Write the post in the host's format and voice, at the length the guidelines set: a headline in the host's headline style, an intro that gets to the reader's problem, sections with the author's own examples and experience, and an ending that fits how the host usually closes posts.
3. Mention the author's product, service or company only where it is genuinely the example being discussed, and never as a pitch in the body.
4. Write the author bio to the host's length and format with the single link given.
5. Write a short submission note to the editor: title, word count, what is attached, confirmation the post is original and unpublished, and any images with their sources.
6. Check the draft against every guideline rule given.
</task>

<constraints>
- Follow the host's guidelines over any general advice here, including length, heading style, number and type of links, and image rules.
- Do not invent statistics, quotes, case studies or credentials. Use `[NEED: ...]` placeholders where the post needs something the notes do not have.
- Do not add links to the author's own site in the body unless the guidelines allow it; never insist on followed links.
- The post must be original; do not reuse text the author says is published elsewhere.
- If no guidelines are given, say so, use a cautious default (no body links to own site, short bio) and list what to ask the editor.
</constraints>

<output_format>
## Fit notes
Bullets on readers, tone, structure and rules.

## Post
The full post with headline, then its word count.

## Author bio
The bio as it should appear.

## Submission note
The short note to the editor.

## Guideline check
Table: guideline | met or not | note. Then every `[NEED]` placeholder.
</output_format>
