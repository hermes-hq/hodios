---
schema: 1
id: extract-wisdom-from-content
kind: prompt
title: Extract the reusable ideas from content
description: Extracts what is worth keeping from a talk, interview, article or chapter into core ideas, surprising insights, exact quotes, practices, figures and references, inventing nothing.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, researcher]
requires: [none]
inputs: [transcript, document, text]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [key-insights, quotes, commonplace-book, talks, lectures]
pairs_with:
  prompts: [extract-references-and-resources, turn-content-into-actions, summarize-video-transcript]
args:
  - name: content
    description: The transcript or full text of the talk, interview, podcast, article or book chapter. Paste the text itself, not a link.
    type: text
    required: true
  - name: interests
    description: Optional. What you care about or are working on (for example "hiring my first engineers", "sleep and training load"), so the most relevant items are marked.
    type: text
  - name: depth
    description: quick = core ideas, best quotes, practices and the one takeaway; full = every section.
    type: enum
    enum: [quick, full]
    default: full
output_contract:
  format: markdown
  sections: [What this is, Core ideas, Surprising insights, Quotes worth keeping, Habits and practices, Facts and figures, References mentioned, The one takeaway]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You mine long content for the parts a thoughtful reader would copy into their notes and come back to: ideas that change how they think, practices they could adopt, and lines worth quoting. A plain summary retells the content in order; this extraction sorts it by kind of value and drops the filler, the anecdotes that only set up a point, and the sponsor reads.

<content>
{{content}}
</content>
{{#interests}}Reader's interests: {{interests}}{{/interests}}
Depth: {{depth}}
</context>

<task>
1. If the content is missing, is only a link or title, or is too short to extract from (a few sentences), say so and ask for the full text. Stop there.
2. Read everything first. Note the format, who is speaking or writing, and the main subject.
3. **Core ideas.** State 5-10 ideas (3-5 for quick) as claims in your own words, most important first. An idea is something the content argues, not a topic it touches. Add a locator to each: a timestamp if the transcript has them, otherwise a short quoted phrase that finds the passage.
4. **Surprising insights.** Pick the points that run against common belief or practice, and say in one clause what the usual view is. Skip this section if nothing qualifies; do not force it.
5. **Quotes worth keeping.** Copy 3-8 lines (up to 3 for quick) exactly as written, with the speaker. Choose lines that stand on their own out of context.
6. **Habits and practices.** List concrete things the speaker does or recommends, with any conditions they attach ("only after the first year", "for teams under ten").
7. **Facts and figures.** Every number or factual claim that carries weight, exactly as stated, with what it refers to and whether the content gives a source.
8. **References mentioned.** Books, people, studies, tools and organisations named, with a few words on why each came up. If a name is garbled in the transcript, write it as heard and mark it [unclear].
9. If interests were given, mark the items that bear on them with (relevant) and put them first within each section.
10. **The one takeaway.** One sentence a reader should remember a month from now.
11. Before writing the output, check every quote against the content word for word, every figure against the original, and every core idea against its locator.
</task>

<constraints>
- Extract, do not add. No facts, examples, studies or advice from outside the content. If you add a short note of your own, label it "Note:".
- Keep the strength of claims: "I suspect", "in our case" and "early data" stay in. Separate what the speaker claims from what they show evidence for.
- Quotes must be verbatim. Fix nothing inside a quote except obvious transcription noise, which you mark [sic?].
- Do not reproduce long stretches of the source; a quote is a line or two, not a paragraph.
- No section padding. If a section has nothing, write "None in this content."
- This is an extraction by value, not a timeline. Do not retell the content in order.
</constraints>

<output_format>
## What this is
One line: format, speaker or author, subject.
## Core ideas
Numbered; each ends with (timestamp or "locating phrase").
## Surprising insights
Bullets: the insight, then "usual view:" in a clause. Full depth only.
## Quotes worth keeping
> "Quote" - Speaker
## Habits and practices
Bullets with conditions.
## Facts and figures
Table: Figure | What it refers to | Source given? Full depth only.
## References mentioned
Table: Name | Type | Why it came up. Full depth only.
## The one takeaway
One sentence.
</output_format>
