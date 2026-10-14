---
schema: 1
id: set-up-research-assistant
kind: prompt
title: Set up an assistant for an ongoing research topic
description: Sets up an assistant project for a research topic you keep coming back to, with a question log, source rules, a citation format, verified-versus-unverified labels and a running notes file.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [researcher, student, writer, individual]
requires: [none]
inputs: [topic, preferences]
output: [prompt, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [source-discipline, citations, research-log, fabricated-references]
pairs_with:
  prompts: [build-project-instructions, prepare-knowledge-files, write-new-chat-handoff]
  rules: [candid-feedback-rules]
args:
  - name: topic
    description: The topic or question you are researching, why, and what you will produce at the end (a report, a decision, an article, a talk).
    type: text
    required: true
  - name: sources
    description: "Optional: sources you trust or must use, sources to avoid, and whether the assistant has web search."
    type: text
  - name: citation_style
    description: "Optional: the citation style you need, for example APA, Chicago, numbered links, or 'just title, author, year and link'."
    type: string
output_contract:
  format: markdown
  sections: [Research brief, Project instructions, Notes file, Question log, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Research with an assistant goes wrong in three ways. It cites papers, statistics and quotes that do not exist or do not say what it claims, especially without web search. It blends what a source says with its own inference, so the user cannot tell fact from guess. And over weeks the thread is lost: every chat starts from zero and old conclusions are repeated or contradicted. Experienced researchers keep a question log, separate notes from claims, record where each fact came from, and label confidence. An assistant project can do the same if its instructions require a source for every factual claim, a clear "unverified" label otherwise, and a notes file the user updates after each session.

<topic>
{{topic}}
</topic>
{{#sources}}
<sources>
{{sources}}
</sources>
{{/sources}}
{{#citation_style}}
Citation style: {{citation_style}}
{{/citation_style}}
</context>

<task>
1. If the topic is too broad to research (for example "history" or "AI"), ask one question to narrow it to a question with an end product and stop.
2. Write a research brief: the main question, two to five sub-questions, the end product, scope limits (dates, regions, types of evidence) and what would count as a good answer.
3. Write project instructions, ready to paste, that:
   - give a source for every factual claim in the chosen citation style, or label it [UNVERIFIED] when no source is in hand;
   - never invent titles, authors, DOIs, page numbers, quotes or statistics; when web search is off, say that references must be found and checked by the user;
   - keep three labels apart: what a source says, what the assistant infers, and open questions;
   - rate evidence strength briefly (for example a single study, a review, official data, opinion) and note disagreement between sources;
   - check the notes file before answering, and say when a new finding contradicts it;
   - end each session with three lines to add to the notes file.
4. Write the notes file template: brief, key findings with sources, contradictions, open questions, and a dated "last session" line.
5. Write the question log format: question, date, status, answer summary with sources.
6. Give four tests, including a request for a statistic the assistant cannot source and a request to quote a paper by title.
</task>

<constraints>
- Do not cite any real sources in the setup itself unless the user gave them.
- If the user's trusted sources are given, use them as preferred, but tell the user to still verify claims against the original.
- Keep the instructions under about 2,000 characters; the notes file holds the rest.
</constraints>

<output_format>
## Research brief
Bullets.
## Project instructions
One fenced block, ready to paste.
## Notes file
A template in a fenced block.
## Question log
A table header and one example row with placeholders.
## Tests
Four bullets: prompt and pass condition.
</output_format>
