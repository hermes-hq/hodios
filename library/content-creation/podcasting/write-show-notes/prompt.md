---
schema: 1
id: write-show-notes
kind: prompt
title: Write podcast show notes
description: Writes podcast show notes from an episode transcript with a summary, timestamps, key takeaways, guest links and verbatim quotable lines. Use when publishing an episode.
category: podcasting
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, marketer]
inputs: [transcript, url]
output: [summary, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [show-notes, timestamps, pull-quotes, episode-summary]
pairs_with:
  prompts: [plan-podcast-episode, repurpose-video-into-posts, write-video-chapters]
args:
  - name: transcript
    description: The episode transcript, ideally with timestamps and speaker names, plus any guest links or resources you want listed.
    type: text
    required: true
  - name: show_name
    description: The podcast's name, used in the summary and sign-off. Leave empty to omit it.
    type: string
  - name: style
    description: brief gives a summary, three takeaways and links; detailed adds timestamps, more takeaways and quotes.
    type: enum
    enum: [brief, detailed]
    default: detailed
output_contract:
  format: markdown
  sections: [Episode summary, Timestamps, Key takeaways, Quotable lines, Guest and resources, To check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a podcast producer writing show notes. Show notes do three jobs: convince someone scrolling a podcast app to press play, help a listener find a moment again, and give the guest something accurate to share. They fail when the summary is vague ("we had a great chat about leadership"), when timestamps are invented, when quotes are paraphrased inside quotation marks, or when they link to things nobody mentioned. Everything in the notes must be traceable to the transcript.
</context>

<task>
Write {{style}} show notes for this episode.

<show_name>
{{show_name}}
</show_name>

<transcript>
{{transcript}}
</transcript>

1. Identify the speakers, the guest (if any) and the episode's central idea: the one thing a listener will walk away with.
2. Episode summary: two to three sentences that name the guest and their credential as stated in the episode, the specific question the episode answers, and why a listener should care. Lead with the most interesting idea, not "In this episode".
3. Timestamps (detailed only): one line per topic shift, `MM:SS` or `H:MM:SS` from the transcript, with a short, specific label. Skip this section if the transcript has no timestamps and say so.
4. Key takeaways: three for brief, five to seven for detailed. Each is one concrete idea a listener could act on or repeat, in plain words.
5. Quotable lines (detailed only): three to five lines that stand alone and would work as social posts, quoted verbatim with the speaker and timestamp. You may remove filler words ("um", "you know"), marking cuts with an ellipsis; never change or merge words inside quotation marks.
6. Guest and resources: the guest's links and every book, tool, person or resource mentioned, with links only where the transcript or the user supplied them; otherwise `[LINK NEEDED]`.
7. To check: names, titles and spellings that the transcript renders uncertainly (auto-transcripts often mangle names), and any claim the host may want to verify before publishing.
</task>

<constraints>
- Do not invent timestamps, quotes, credentials, links or resources.
- Do not add opinions or facts that are not in the episode.
- If the show name is empty, leave it out rather than inventing one.
- Brief notes stay under 150 words, excluding links; detailed notes stay under 500.
</constraints>

<output_format>
Use the section headings in order, omitting Timestamps and Quotable lines for brief:
## Episode summary
## Timestamps
## Key takeaways
## Quotable lines
## Guest and resources
## To check
</output_format>
