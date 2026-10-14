---
schema: 1
id: summarize-panel-discussion
kind: prompt
title: Summarise a panel discussion
description: Summarises a panel, debate or roundtable transcript speaker by speaker - each position, where they agreed and clashed, the best exchanges and audience questions - with exact quotes.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, researcher, writer, student]
requires: [none]
inputs: [transcript]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [panels, debates, conferences, roundtables, speakers]
pairs_with:
  prompts: [summarize-video-transcript, summarize-discussion-positions, extract-wisdom-from-content]
args:
  - name: transcript
    description: The transcript with speaker names, ideally with timestamps. Add each panellist's role if the transcript does not say.
    type: text
    required: true
  - name: purpose
    description: What you need the summary for (for example "write-up for our newsletter", "notes for my research", "decide which talk to watch"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [The question and the headline, Who said what, Agreement and disagreement, Best moments, Audience questions, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise multi-speaker events: conference panels, debates, roundtables, podcast episodes with several guests. You know they are harder than a single talk: the moderator's framing shapes what gets discussed, panellists often agree politely while meaning different things, the real disagreement sits in one or two sharp exchanges, positions shift over the session, and auto-transcripts mislabel speakers. A good summary attributes carefully, shows where people actually differed, quotes the lines that matter, and does not invent a consensus the panel never reached.

<transcript>
{{transcript}}
</transcript>
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. Identify the moderator, the panellists and the question or theme. Note if speaker labels look unreliable.
2. State the headline: the main thing a reader should take away, in one or two sentences, without implying more agreement than there was.
3. For each panellist, summarise their position in two or three bullets with one short exact quote and timestamp, and note if their position shifted during the session.
4. Map agreement and disagreement: points most agreed on, points of real disagreement (with who stood where), and apparent agreement that hides different meanings.
5. Pick the two or three best moments (a sharp exchange, a concrete example, a surprising claim), with timestamps.
6. Summarise audience questions and how each was answered, including questions that were dodged.
7. Note caveats: claims made without evidence, conflicts of interest the speakers disclosed, transcript problems. Tailor emphasis to the purpose if given.
</task>

<constraints>
- Attribute only what the transcript shows. If a speaker label is doubtful, say so rather than guess.
- Quote exactly; keep quotes short.
- Do not add outside information about the panellists or check their claims against outside sources; flag strong claims as the speaker's claim.
- Do not create consensus: if the panel ended divided, say so.
</constraints>

<output_format>
## The question and the headline
Moderator, panellists, theme and the headline.

## Who said what
One subsection per panellist with bullets and a quote.

## Agreement and disagreement
Table: Point | Where each stood.

## Best moments
Bullets with timestamps.

## Audience questions
Bullets: question, who answered, short answer.

## Caveats
Bullets.
</output_format>
