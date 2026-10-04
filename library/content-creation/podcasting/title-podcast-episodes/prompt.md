---
schema: 1
id: title-podcast-episodes
kind: prompt
title: Title podcast episodes
description: Writes podcast episode titles and the opening lines of the description for how people find episodes in podcast apps and search, with the search phrase each option targets.
category: podcasting
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, marketer]
inputs: [notes, transcript]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [episode-titles, discoverability, search-phrases, podcast-apps]
pairs_with:
  prompts: [write-show-notes, write-podcast-trailer, plan-podcast-growth]
  personas: [podcast-producer]
args:
  - name: episode_summary
    description: What the episode is about - guest name and what they are known for, the main question or story, the most surprising moment. Paste notes, a summary or part of the transcript. Several episodes are fine, one per paragraph.
    type: text
    required: true
  - name: show_name
    description: The podcast's name, so titles do not repeat it (apps already show it next to every episode).
    type: string
    required: true
  - name: count
    description: How many title options to write per episode.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Title options, Description opening, Recommended pick, To check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write episode titles for {{show_name}}. Listeners find episodes in three places: scrolling a show's feed in a podcast app, searching inside a podcast app, and web search. All three reward the same thing: the words a listener would type or recognise, near the start. Apps truncate titles on phones (often after about 40 to 60 characters) and show only the first line or two of the description.

Titles fail in predictable ways:
- Clutter up front: "Ep. 142 |", the show name, or "Part 2 of our chat with" pushes the real words past the cut-off. Episode numbers and seasons belong in the feed's episode and season fields, not the title.
- Vague or inside-joke titles ("Coffee and chaos") that mean nothing to a new listener.
- Clickbait that promises more than the episode delivers, which costs trust and completion.
- Guest names that are buried, when the name is often the most searched word.
</context>

<task>
<episode_summary>
{{episode_summary}}
</episode_summary>

1. For each episode, find the two or three phrases a listener might search: the guest's name (if known to the audience), the topic in plain words, and a specific problem or question.
2. Write {{count}} title options per episode, each under about 60 characters, with the most important words in the first 40. Vary the pattern: guest plus topic ("Name on topic"), the question the episode answers, a concrete outcome or number from the episode, a story hook. At least one option must work for someone who has never heard of the guest.
3. For each option give the character count and the search phrase it targets.
4. Write the opening of the episode description: the first two sentences only, which apps show before "more". Sentence one says who and what; sentence two gives the payoff or the strongest specific detail. No "In this episode" and no housekeeping.
5. Recommend one title per episode and say why in one line.
</task>

<constraints>
- Only use facts, names, numbers and claims that appear in the summary. If the guest's credential or the episode's payoff is missing, say what you need and mark it [X] rather than inventing it.
- No episode numbers, show name or "Part 1" in titles unless the user asks; mention the feed fields instead once.
- No clickbait, all caps, emoji strings or promises the episode does not keep ("will change your life"). Questions in titles must be ones the episode really answers.
- Spell names exactly as given and list any you could not confirm.
- Keep the show's tone if the summary signals it (playful, serious, technical).
</constraints>

<output_format>
## Title options
Per episode, a table: # | Title | Characters | Search phrase targeted.

## Description opening
Per episode, the two sentences, ready to paste.

## Recommended pick
Per episode, the title and a one-line reason.

## To check
Names, spellings and claims to confirm before publishing, or "None".
</output_format>
