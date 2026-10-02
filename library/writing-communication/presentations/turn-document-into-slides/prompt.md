---
schema: 1
id: turn-document-into-slides
kind: prompt
title: Turn a document into slides
description: Turns a document or report into a slide outline with one message per slide, action titles that tell the story, suggested visuals from the document's own data, and an appendix plan.
category: presentations
version: 1.0.0
status: incubating
stage: [design, build]
role: [consultant, manager, researcher, business-analyst]
requires: [none]
inputs: [document, text]
output: [outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [action-titles, document-to-deck, storyline, appendix]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, critique-slide-deck, write-executive-summary]
args:
  - name: document
    description: The document or report to present, in full.
    type: text
    required: true
  - name: audience
    description: Who will see the slides, what they already know, and what they should decide or do afterwards.
    type: text
  - name: slide_count
    description: Target number of main slides, excluding title and appendix. Leave empty to have one proposed from the content and audience.
    type: number
output_contract:
  format: markdown
  sections: [Storyline, Slides, Appendix, Left out, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A document and a deck do different jobs. A document is read at the reader's pace and can hold every detail; a deck is a sequence of single messages, usually seen while someone talks, and often skimmed later by title alone. Converting one into the other fails when each document section becomes a slide of shrunken paragraphs, when titles are topic labels ("Methodology", "Results") instead of the point, and when every finding gets equal weight. The working method is to find the document's governing message, rebuild the argument as a sequence of action titles that tell the story when read alone, give each slide one piece of evidence, and push supporting detail to an appendix.
</context>

<task>
Turn this document into a slide outline.
{{#audience}}Audience and goal: {{audience}}{{/audience}}
{{#slide_count}}Target: {{slide_count}} main slides.{{/slide_count}}

<document>
{{document}}
</document>

1. If the document is too short or fragmentary to present, say so and ask what the presentation should achieve; then stop.
2. State the governing message in one sentence: what the audience should conclude. If no audience was given, assume the document's own intended reader and say so.
3. Choose the storyline order for this audience: answer first for executives and decision-makers; context, then findings, then implications for less familiar audiences. Explain the choice in one line.
4. Write the action titles first: one full-sentence takeaway per slide, ideally under 15 words, so that reading only the titles tells the whole story. If no slide count was given, propose one that fits the content (often 8 to 15 for a 20-minute slot) and say why.
5. For each slide, specify: the single supporting element (a chart type with what to plot from the document's data, a diagram, a short table, an image, or up to three bullets of at most 10 words each), the source section of the document, and one line of what the speaker would say.
6. Plan the appendix: detail, methodology, full tables and caveats that someone may ask about, each with the main slide it supports.
7. List what you left out of the main flow and why.
</task>

<constraints>
- Use only content from the document. Do not invent data, examples or conclusions, and do not round or change numbers. If a visual would need data the document lacks, say so in Gaps.
- One message per slide. If a slide needs two, split it.
- Keep caveats and limitations that change the meaning of a finding on the main slide, not only in the appendix.
- Chart choices must suit the data: comparisons as bars, change over time as lines, parts of a whole only when they truly sum to 100%.
- No decorative slides (agenda, "thank you", "questions?") unless the audience or format requires them; mention them in one line if so.
</constraints>

<output_format>
## Storyline
Governing message, chosen order and why, and the titles alone as a numbered list.
## Slides
For each: **N. Action title**; Visual or content; Source (document section); Say (one line).
## Appendix
Numbered: A1, A2… title, content, supports slide N.
## Left out
Bullets with reasons.
## Gaps
Data or material the deck needs that the document does not supply. "None" if none.
</output_format>
