---
schema: 1
id: check-historical-claim
kind: prompt
title: Check a popular history claim
description: Checks a popular history claim or "fun fact" against what historians can show, separating primary evidence, scholarly consensus and later myth, and explains how the myth arose.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, content-creator, teacher, individual]
subject: [history]
requires: [none]
inputs: [text]
output: [report, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [historical-myths, primary-sources, historiography, popular-history]
pairs_with:
  prompts: [trace-quote-origin, explain-state-of-evidence, fact-check-claims]
  rules: [source-citation-rules]
args:
  - name: claim
    description: The history claim as you met it, for example "Napoleon was very short" or "medieval people thought the Earth was flat".
    type: text
    required: true
  - name: use
    description: What you need it for (a video script, a lesson, a pub quiz, settling an argument), which sets how much detail to give.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, What the evidence shows, How the myth arose, How to say it accurately, What to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Popular history is full of claims that are vivid, repeated and weakly grounded: a misread unit of measurement, a satire taken literally, a nineteenth-century writer's invention, a later propaganda story, or a single anecdote stretched into "people used to". Historians ask what survives from the time (records, letters, objects, archaeology), who produced it and why, how much later accounts were written, and whether specialists broadly agree. Many claims are neither true nor false but simplified: true for one place, class or decade and wrong as a general statement. Anachronistic terms are a common tell.
</context>

<task>
Check this history claim{{#use}} for {{use}}{{/use}}:
<claim>
{{claim}}
</claim>

1. Restate the claim precisely: who, where, when, and whether it is a general claim ("people believed") or a specific one (an event, a quote, a number).
2. Describe the kinds of evidence historians would rely on for it, and what that evidence broadly shows, distinguishing sources from the period from later accounts.
3. Say how settled the question is: broad scholarly agreement, live debate, or genuinely unknown.
4. If the claim is a myth or a distortion, explain the likely origin and why it spread (a unit mix-up, later fiction, political use, a mistranslation, a textbook simplification), marking how confident you are.
5. Give an accurate version of the claim suited to the stated use.
</task>

<constraints>
- Answer from general historical knowledge only where it is well established, and say how confident you are on each point. Do not invent titles, archives, page numbers, historians' names or quotations.
- If you are unsure of a specific date, figure or attribution, say so rather than giving one.
- Do not swap one myth for another: avoid tidy counter-claims that are as oversimplified as the original.
- Treat claims about groups, nations and religions with the same evidential standard, and avoid present-day moral or political framing unless the user asks.
- Recommend checking against a recent scholarly or reputable reference before publishing.
</constraints>

<output_format>
## Verdict
One rating in bold (Accurate, Simplified, Myth, Disputed, Unknown), then two sentences.
## What the evidence shows
Short paragraphs: what survives from the period, what later sources say, and the state of scholarly agreement, with a confidence label for each point.
## How the myth arose
The likely origin and spread, or "not applicable".
## How to say it accurately
One to three sentences fit for the stated use.
## What to check
The kinds of sources to consult before publishing and the specific points most worth confirming.
</output_format>
