---
schema: 1
id: rate-content-worth-my-time
kind: prompt
title: Rate whether content is worth my time
description: Rates a long article, video or podcast transcript against the reader's interests for relevance, novelty, density and evidence, then says read it, skim named parts, or skip.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [document, transcript, text]
output: [report, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-triage, information-diet, read-later, skim-plan]
pairs_with:
  prompts: [extract-wisdom-from-content, summarize-video-transcript]
args:
  - name: content
    description: The full text or transcript. Paste the text, not a link; a title or teaser is not enough to judge.
    type: text
    required: true
  - name: interests
    description: What you care about and already know, for example "product management for B2B SaaS, I've read the usual books on discovery".
    type: text
    required: true
  - name: time_available_minutes
    description: How many minutes you are willing to spend on it.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Verdict, Scorecard, Skim plan, What you would miss, The gist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The reader has a queue of saved articles, videos and podcasts and less time than the queue needs. They want an honest triage call on this one piece, judged against what they care about and already know, not against how well it is written or how popular it is.

<content>
{{content}}
</content>
<interests>
{{interests}}
</interests>
Time available: {{time_available_minutes}} minutes.
</context>

<task>
1. If the content is only a link, a title or a short teaser, say you cannot judge content you cannot see, and ask for the text. Stop there.
2. Estimate the time it takes in full: about 230 words per minute for reading, about 150 words per minute for a spoken transcript. State the estimate.
3. Score four criteria from 1 to 5, each with a one-line reason that points to a passage:
   - **Relevance:** how directly it bears on the stated interests.
   - **Novelty:** how much is new to someone who already knows what the reader says they know. Recycled common advice scores low.
   - **Density:** useful content per minute, after filler, repetition, tangents and promotion.
   - **Evidence:** whether claims rest on data, examples, named sources or direct experience, or on assertion.
4. Decide the verdict from the scores, not from the tone:
   - **Read in full** when relevance and novelty are both 4 or more and the full time fits the budget.
   - **Skim** when value is concentrated in parts. Name the parts (headings, timestamps or locating phrases) and how long each takes, keeping the total within {{time_available_minutes}} minutes.
   - **Skip** when relevance or novelty is 2 or less, or density is 1.
   If the content is valuable but longer than the budget, say so and give the best-value parts that fit.
5. Say what the reader would miss by skipping or skimming, and give the gist in one sentence so even a skip leaves them with the main point.
6. Before answering, check that the verdict follows the rule in step 4 and that the skim plan adds up within the budget.
</task>

<constraints>
- Judge only what is in the content. Do not import outside opinions about the author or outlet.
- A catchy headline or confident tone is not evidence of value; a dry piece can still be dense.
- Do not summarise the whole piece. The output is a decision aid that fits on one screen.
- If the stated interests are too vague to judge relevance ("interesting stuff"), score relevance as uncertain, say why, and ask one question at the end.
</constraints>

<output_format>
## Verdict
**Read in full | Skim | Skip**, then one sentence why, and the estimated full time.
## Scorecard
Table: Criterion | Score (1-5) | Reason (with a pointer).
## Skim plan
Only for Skim: Part | Where | Minutes | Why it is worth it. Total minutes on the last row.
## What you would miss
One or two bullets.
## The gist
One sentence.
</output_format>
