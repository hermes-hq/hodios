---
schema: 1
id: analyze-spin-in-article
kind: prompt
title: Analyse the spin in an article
description: Analyses one article for spin such as loaded words, selective quotes, buried caveats and missing context, describes the effect on the reader, and rewrites the headline and lede neutrally.
category: fact-checking
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, editor]
requires: [none]
inputs: [document, text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [media-bias, framing, loaded-language, news-analysis]
pairs_with:
  prompts: [compare-news-framing, label-fact-vs-opinion, check-statistics-in-article]
args:
  - name: article
    description: The full article text, including the headline, subheadings and any photo captions.
    type: text
    required: true
  - name: topic_context
    description: Optional. Background you know about the story (what happened, other reporting), used only to judge what context is missing.
    type: text
output_contract:
  format: markdown
  sections: [Spin level, Findings, What is solid, Missing context, Neutral headline and lede]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spin rarely means false statements. It is the choice of words, order, quotes and omissions that leads a reader to a conclusion the facts alone would not force. The reader wants to see those choices in one article, understand their effect, and read a version that states the same facts plainly. The analysis describes techniques and effects; it does not guess at the writer's motives, and it applies the same standard whichever side the article favours.

<article>
{{article}}
</article>
{{#topic_context}}
<topic_context>
{{topic_context}}
</topic_context>
{{/topic_context}}
</context>

<task>
1. Identify the article type. If it is labelled opinion, analysis or advocacy, say so: arguing a side is expected there, and the question becomes whether facts and opinion are kept distinguishable.
2. Check the article against these techniques, recording only what is present:
   - **Headline-body gap:** the headline claims more, or something different, than the body supports.
   - **Loaded language:** emotive or value-laden words where neutral ones exist ("slammed", "scheme", "radical", "admitted"), and euphemisms that soften.
   - **Selective quoting:** only one side quoted, or a quote trimmed so it reads differently; anonymous sources given heavy weight.
   - **Buried caveats:** key qualifiers, denials or counter-evidence placed late where most readers will not reach them.
   - **Missing context:** no baseline, trend, comparison, scale or time frame for numbers and events.
   - **Agency hiding:** passive voice or vague subjects that obscure who did what ("mistakes were made").
   - **Speculation as fact:** "could", "may" or a source's prediction promoted to a firm claim in the headline or lede.
   - **Framing by order and emphasis:** what leads, what is called the "real" issue, what images or captions suggest.
3. For each finding, quote the passage, name the technique, describe the likely effect on a reader, and give a neutral alternative wording.
4. Note what the article does well: clear sourcing, fair quotes, plain numbers.
5. List the context a reader would need to judge the story, as questions. Use topic_context only here, and label it as supplied by the user.
6. Rewrite the headline and the first paragraph neutrally, using only facts stated in the article.
7. Rate the overall spin as low, moderate or heavy, with the two or three findings that drive the rating.
8. Before answering, check every quote is verbatim and the neutral rewrite adds no fact absent from the article.
</task>

<constraints>
- Describe effects, never intent. Write "this wording suggests", not "the reporter wants readers to believe".
- Apply identical standards whatever the article's political direction or topic.
- Do not judge whether the story's facts are true; that needs outside sources. Mark any factual doubt as a question under Missing context.
- Do not call an outlet biased in general from one article.
</constraints>

<output_format>
## Spin level
**Low | Moderate | Heavy**, the article type, and two or three sentences on what drives the rating.
## Findings
Table: # | Quote | Technique | Effect on the reader | Neutral alternative.
## What is solid
Bullets.
## Missing context
Bullets as questions a reader should ask.
## Neutral headline and lede
**Headline:** ...
**Lede:** ...
</output_format>
