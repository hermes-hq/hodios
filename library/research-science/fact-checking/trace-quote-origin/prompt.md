---
schema: 1
id: trace-quote-origin
kind: prompt
title: Trace a quote to its origin
description: Traces a quotation to its original source and context, checks for misattribution and paraphrase drift, and reports confidence with the full source trail. For writers, editors and researchers.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher, content-creator]
requires: [web]
inputs: [text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [misattribution, quotations, primary-sources, source-trail]
pairs_with:
  prompts: [fact-check-claims, evaluate-source-credibility]
  rules: [source-citation-rules]
args:
  - name: quote
    description: The quote exactly as you found it, and where you found it if you know.
    type: text
    required: true
  - name: attributed_to
    description: Who it is attributed to, for example "Albert Einstein" or "Maya Angelou". Leave empty if the attribution is unknown.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Source trail, Original wording and context, How to cite it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Famous quotes drift. Words get polished, paraphrases become quotations, a line from a character is attributed to the author, a lesser-known person's words migrate to a famous name, and an apocryphal line is repeated on so many sites that it looks established. Quote researchers work backwards in time: they look for the earliest dated appearance in print or recording, compare its wording and context with the modern version, and check whether the attributed person could have said it. Quote-aggregator sites and social posts are not evidence; specialist sources such as Quote Investigator and the "disputed" and "misattributed" sections of Wikiquote are useful leads but should be followed to the primary sources they cite.
</context>

<task>
Trace this quote{{#attributed_to}}, attributed to {{attributed_to}}{{/attributed_to}}:
<quote>
{{quote}}
</quote>

1. Search for the exact wording and for key distinctive phrases, since wording often changes. Search the attributed person's works, speeches, letters and interviews; digitised books and newspaper archives with date limits to find the earliest appearances; and specialist quote research.
2. Build a source trail from earliest to latest: each appearance with its date, the exact wording, who it is attributed to there, and a link to the page you opened.
3. Compare the earliest version with the modern one: changes in wording, meaning, speaker (for example a character in a novel, an interviewer, or someone the person was quoting) and context (sarcasm, a longer passage that changes the sense).
4. Give a verdict:
   - **Verified:** found in a primary source by the person, with matching wording.
   - **Paraphrase:** the idea is theirs but the popular wording is not.
   - **Misattributed:** an earlier or primary source shows someone else said it.
   - **Apocryphal or unverified:** no evidence they said it; earliest appearances are late and unsourced.
   - **Out of context:** genuine, but the context changes what it means.
   State the confidence and the main evidence.
5. Show how to cite it accurately: the original wording and source, or how to attribute it honestly if it cannot be verified ("often attributed to…").
</task>

<constraints>
- Cite only pages you opened in this session, with URL and date where available. Never cite from memory or construct a URL, and never invent a book, page number or speech.
- If you have no web access, say so at the top, give no verdict, and instead list the searches and sources the user should check, with what to look for.
- Treat absence of evidence carefully: "I found no evidence that X said this" is not the same as "X never said it". Say how thorough your search was.
- Quote the original exactly, including punctuation and any non-English original, with a translation if needed.
- Do not treat repetition across quote sites as corroboration.
</constraints>

<output_format>
## Verdict
The rating in bold, then two or three sentences with the key evidence and confidence.
## Source trail
Table: date | source (linked) | exact wording | attributed to.
## Original wording and context
The original passage and what it meant in context.
## How to cite it
A suggested citation or attribution line.
</output_format>
