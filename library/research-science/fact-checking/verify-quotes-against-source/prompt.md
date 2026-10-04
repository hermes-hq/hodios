---
schema: 1
id: verify-quotes-against-source
kind: prompt
title: Verify quotes against the source
description: Checks the quotes in an article or report against the supplied transcript or original, flagging misquotes, splices, lost context, wrong speakers and paraphrases presented as quotes.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [editor, writer, researcher]
requires: [none]
inputs: [document, transcript]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quote-checking, misquotes, journalism, accuracy]
pairs_with:
  prompts: [trace-quote-origin, check-paraphrase-faithfulness, write-fact-check-article]
args:
  - name: article
    description: The article, report, press release or post containing the quotes.
    type: text
    required: true
  - name: source
    description: The transcript, recording notes, speech text, email or document the quotes are said to come from.
    type: text
    required: true
  - name: strictness
    description: verbatim = any wording difference is flagged (for direct quotation in publishing); meaning = transcription-level differences are accepted if the meaning is unchanged.
    type: enum
    enum: [verbatim, meaning]
    default: verbatim
output_contract:
  format: markdown
  sections: [Summary, Quote check, Problems in detail, Corrected quotes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A quote can be word-perfect and still misrepresent someone: cut before the "but", lifted from a hypothetical, spliced from two answers, or put in the wrong mouth. Editors and fact-checkers need every quotation in a piece compared against the source they have, with each problem located and a fix proposed, before it is published or cited.

<article>
{{article}}
</article>
<source>
{{source}}
</source>
Strictness: {{strictness}}
</context>

<task>
1. Extract every direct quotation (text in quotation marks attributed to someone) and every attributed paraphrase ("she said that ..."), with the speaker the article names.
2. Find each in the source. Compare word by word for direct quotes, and by meaning for paraphrases.
3. Classify each:
   - **Exact:** matches the source word for word (punctuation aside).
   - **Minor variance:** filler words removed, tense or grammar tidied, transcription-level differences. Acceptable with meaning strictness; flagged with verbatim strictness.
   - **Altered:** words changed, added or dropped in a way that shifts meaning or strength.
   - **Spliced:** joined from separate parts of the source without an ellipsis or with the gap hidden.
   - **Out of context:** accurate words whose surrounding context changes their meaning (the speaker was quoting someone else, describing a view they reject, speaking hypothetically, joking, or continued with a qualification).
   - **Paraphrase as quote:** in quotation marks but not what was said.
   - **Wrong speaker:** said in the source by someone else.
   - **Not found in source:** no matching passage in the material supplied.
   - For attributed paraphrases: **Fair** or **Distorted**.
4. For each problem, quote the source passage with its location (timestamp, paragraph or page) and explain the difference in one or two sentences.
5. Propose a correction: the exact source wording, a legitimate ellipsis, added context, or conversion to a fair paraphrase without quotation marks.
6. Before answering, recheck each "Exact" quote character by character and each "Not found" by searching the source again for partial matches.
</task>

<constraints>
- Compare only against the supplied source. "Not found" means not found in this material, not fabricated; say the source may be incomplete.
- An ellipsis is legitimate when it removes words without changing the meaning; flag it when the removed words qualify or reverse what remains.
- Do not rewrite the article beyond the quotes.
- If the source is clearly a different event or document from the one the article quotes, say so and stop.
</constraints>

<output_format>
## Summary
Counts by classification and the one problem that most needs fixing.
## Quote check
Table: # | Article text | Speaker (article) | Source match and location | Classification.
## Problems in detail
For each problem: the article text, the source text, what changed, and why it matters.
## Corrected quotes
Numbered: the corrected version, ready to paste.
</output_format>
