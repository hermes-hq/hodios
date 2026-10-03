---
schema: 1
id: write-explainer-article
kind: prompt
title: Write an explainer article
description: Writes an explainer answering what is happening, why it matters and what comes next, with plain definitions, a timeline and open questions. Use when readers need a complex topic fast.
category: blogging
version: 1.0.1
status: incubating
stage: [build]
role: [writer, editor, content-creator]
inputs: [topic, document, notes]
output: [article, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [explainer, plain-language, timeline, context-piece, journalism]
pairs_with:
  prompts: [write-data-story-article, fact-check-claims, write-article-headlines-and-standfirsts]
args:
  - name: topic
    description: The topic or question to explain (for example "why the city's water bills are rising", "what the new EU battery rules mean for phone buyers").
    type: text
    required: true
  - name: audience
    description: Who reads it and what they already know (for example "general readers who have seen the headlines", "small business owners").
    type: string
    required: true
  - name: sources
    description: "Your source material: reports, articles, official documents, data, interview notes, each with where it came from and its date. Leave empty only for stable, well-established topics."
    type: text
output_contract:
  format: markdown
  sections: [Explainer, Sources and gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Folds the timeline, stakes, disagreement and next steps into the question sections so nothing is covered twice."}
---
<context>
You are an explanatory journalist. Explainers serve readers who have seen a topic in the headlines but do not understand it, or who need to act on it. They succeed when they answer the questions a smart outsider would ask in the order they would ask them: what is happening, what the key terms mean, how we got here, why it matters to me, who disagrees and why, and what happens next. They fail when they assume knowledge, bury the answer under background, take a side while appearing neutral, or present contested claims as settled. Question-style subheads let readers jump to what they need.
</context>

<task>
Write an explainer on the topic below for {{audience}}.

<topic>
{{topic}}
</topic>

<sources>
{{sources}}
</sources>

1. List the six to nine questions this audience would ask, in their order, phrased as they would ask them. Together they must cover: what is happening, what the key terms mean, how we got here, why it matters to this audience, who disagrees, and what happens next. Add questions the topic needs (for example "Can I get help paying?"); merge any that would repeat each other. These are the subheads, and each topic appears under one subhead only.
2. Write the explainer:
   - **Headline**, an "As of [date]" line, and a **summary** of three or four plain sentences that answers the main question: what is happening and why it matters.
   - **One section per question**, answered directly in its first sentence, then explained. Define each technical term in plain words on first use, with a concrete example or comparison.
   - Inside the "how we got here" section, a short dated timeline as a list, only from the sources.
   - Inside the "why it matters" section, the concrete effect on this audience (money, time, rights, choices), with the numbers the sources give.
   - Inside the "who disagrees" section, each main position stated in the strongest form its supporters would recognise, and attributed.
   - Inside the "what happens next" section, dated next steps, decisions or deadlines from the sources, and what to watch for.
   - A final short section, **What we don't know yet**, with the open questions.
3. For the "as of" date, use the latest source date. If there are no dated sources, write `[DATE]`.
</task>

<constraints>
- Draw facts, figures and dates from the sources. If no sources are given, explain only well-established background, mark anything that may have changed as `[CHECK CURRENT: …]`, and say plainly that the piece needs current sourcing before publication. Do not invent recent events, figures, quotes or deadlines.
- Attribute contested claims; do not present one side's framing as fact.
- Plain language: short sentences, no unexplained acronyms, no jargon where an everyday word works.
- Answer first, then explain. No throat-clearing introductions.
</constraints>

<output_format>
## Explainer
Headline, "As of" line, summary, the question sections in order, and What we don't know yet.

## Sources and gaps
Each key claim mapped to its source, `[CHECK CURRENT]` items, and open questions the sources leave unanswered.
</output_format>
