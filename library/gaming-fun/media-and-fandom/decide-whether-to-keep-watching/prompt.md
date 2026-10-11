---
schema: 1
id: decide-whether-to-keep-watching
kind: prompt
title: Decide whether to keep watching
description: Helps decide, without spoilers, whether a series or long book you are struggling with is worth continuing, by what changes later and what you dislike now.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [does-it-get-better, spoiler-free, tv-series, book-series, drop-or-continue]
pairs_with:
  prompts: [triage-entertainment-backlog, catch-up-on-series-spoiler-free, recommend-films-from-favorites]
args:
  - name: title
    description: The series or book, and whether you mean the show or the books if both exist.
    type: string
    required: true
  - name: reached
    description: How far you have got, for example "season 1, episode 4" or "page 200 of 600".
    type: string
    required: true
  - name: problem
    description: What is not working for you, for example "too slow", "I hate the main character", "too violent", "confusing".
    type: text
    required: true
  - name: liked
    description: Anything you do like about it so far, or "nothing".
    type: text
    default: nothing named
output_contract:
  format: markdown
  sections: [Your problem, Does it change, The verdict, If you stop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Does it get better?" is a precise question with a precise answer if you split it up. Some complaints are structural and never change (the tone, the prose style, a slow-burn format, the kind of violence). Others are fixed by the story itself: a first season that finds its footing, a character whose arc is the point of the show, a confusing set-up that clicks. Fans often promise a series "gets good in season 2", which is true for some shows and a sunk-cost trap for others. The honest answer depends on whether their specific complaint is the thing that changes. The answer also has to work without telling them what happens, so talk about form, pace and tone, not events.

Title: {{title}}
Reached: {{reached}}
Problem: {{problem}}
Liked so far: {{liked}}
</context>

<task>
1. If you do not know the work well enough to say what changes after their point, say so plainly and offer only general guidance, then stop at a short answer.
2. Restate their problem and sort it: is it about style or tone (rarely changes), pace or set-up (often changes), a character (depends on the arc), or content (say what to expect in kind and intensity, never in events)?
3. Say whether that specific thing changes later, roughly when ("from the second half of season 1", "the last third of the book"), and in what way, using only non-plot terms such as "the focus moves to a smaller cast" or "the pace picks up".
4. Say whether what they like is kept or lost later.
5. Give a verdict: keep going, try a specific test point (for example "give it until episode 7; if you still dislike X, stop"), or stop. Explain in one or two sentences.
6. If they stop, say whether a spoiler-free recap or a different work with what they liked would serve them better, and name one alternative if you are confident.
</task>

<constraints>
- No plot events, deaths, twists, relationships or reveals after their point. If you cannot answer without one, say "I can't say more without spoiling it" instead.
- Do not pretend certainty about a work you do not know well.
- Respect that quitting is fine; do not guilt them into continuing.
</constraints>

<output_format>
## Your problem
One or two sentences sorting the complaint.
## Does it change
Short paragraph, spoiler-free.
## The verdict
Keep going, test point or stop, with the reason.
## If you stop
One or two lines.
</output_format>
