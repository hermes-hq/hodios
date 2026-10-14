---
schema: 1
id: test-content-comprehension
kind: prompt
title: Test whether users understand your content
description: Plans a test of whether people understand written content such as policies, instructions or terms, using highlighter, paraphrase, cloze or task-based questions instead of asking if it is clear.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [designer, ux-researcher, writer, technical-writer]
requires: [none]
inputs: [document, text]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [content-testing, comprehension, plain-language, highlighter-test, cloze-test]
pairs_with:
  prompts: [write-ux-microcopy, plan-five-second-test, write-usability-test-plan]
  personas: [ux-researcher]
args:
  - name: content
    description: The text to test (or a description of it) and the key messages people must take away, for example "cancellation policy - must know they can cancel free within 14 days".
    type: text
    required: true
  - name: readers
    description: Who reads it, in what situation, and any literacy, language or accessibility considerations. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key messages to check, Method, Tasks and questions, Participants and setup, Scoring, What to change based on results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Asking "is this clear?" produces polite yeses: people overrate their own understanding and do not want to look slow. Comprehension has to be shown. Proven techniques: the highlighter test, where people mark phrases that make them more or less confident (green and red, or clear and confusing); paraphrase, where they explain a section in their own words; task-based questions that apply the content to a realistic situation ("you bought this 20 days ago, can you return it?"); and cloze tests, where every fifth or so word is blanked and the share filled correctly indicates readability for that audience. Readability formulas only estimate sentence and word length and miss jargon, structure and assumptions. Testing in the reader's real situation matters: stressed, skimming on a phone, or reading in a second language changes everything.
</context>

<task>
<content>
{{content}}
</content>
{{#readers}}

<readers>
{{readers}}
</readers>
{{/readers}}

1. Key messages: list the 3 to 6 things readers must understand or be able to do, each with what a misunderstanding would cost them.
2. Method: choose and justify a mix (highlighter, paraphrase, task-based scenarios, cloze, recall after reading) for this content and audience; moderated or unmoderated.
3. Tasks and questions: for each key message, a realistic scenario question that requires applying the content, plus one paraphrase prompt; no yes/no and no wording copied from the text.
4. Participants and setup: who, how many (around 5 to 8 per segment for moderated diagnosis, more for unmoderated scoring), device and reading conditions that match real use, and including readers with lower literacy or second-language readers where relevant.
5. Scoring: a rubric per question (correct, partly correct, wrong), a target comprehension rate proposed for the team to agree, and how to log the exact phrases that caused errors.
6. What to change: how to turn findings into edits (rewrite, restructure, add an example) and retest.
</task>

<constraints>
- Never use "Did you understand this?" or similar self-ratings as the measure.
- Scenario questions must not be answerable by matching words from the text.
- Do not invent results or legal readability requirements; mention that some sectors have their own plain-language rules to check.
- If the content is legal or medical, note that wording changes need sign-off from the responsible expert.
</constraints>

<output_format>
## Key messages to check
| Message | Cost of misunderstanding |
## Method
## Tasks and questions
## Participants and setup
## Scoring
## What to change based on results
</output_format>
