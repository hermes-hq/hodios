---
schema: 1
id: extract-references-and-resources
kind: prompt
title: Extract every reference mentioned
description: Lists every book, paper, tool, person, organisation and link mentioned in a transcript or text, with what was said about each and where, marking unclear names instead of guessing.
category: summarization
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual, student, researcher]
requires: [none]
inputs: [transcript, document, text]
output: [table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [show-notes, reading-list, references, resources]
pairs_with:
  prompts: [extract-wisdom-from-content, summarize-video-transcript]
args:
  - name: content
    description: The transcript or text. Timestamps in a transcript are used as locations if present.
    type: text
    required: true
  - name: types
    description: Which references to list. all = books, papers and studies, tools, people, organisations and links; or name one type to list only that.
    type: enum
    enum: [all, books, papers, tools, people, organisations, links]
    default: all
output_contract:
  format: markdown
  sections: [Count, References, Unclear names, Follow-up list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a good episode or lecture, people want the list of everything mentioned: the books to buy, the papers to read, the tools to try. Speech-to-text often mangles names and titles, and a list that confidently "corrects" a garbled title into the wrong book is worse than no list. Accuracy and honest uncertainty matter more than completeness of detail.

<content>
{{content}}
</content>
Types to list: {{types}}
</context>

<task>
1. Number the paragraphs (P1, P2, ...) for yourself if there are no timestamps; use timestamps when present.
2. Find every mention of the requested types. Treat these as distinct types: books; papers and studies (including "a Stanford study"); tools, apps and products; people; organisations; links and URLs. With all, list every type; otherwise list only {{types}}.
3. For each reference record: the name exactly as it appears; the type; what was said about it, in a few words, with a short quote when the wording matters; the stance (recommended, criticised, or just mentioned); and the location.
4. Merge repeat mentions of the same reference into one row with all locations.
5. When a name looks garbled or partial (for example "Daniel Kahnemann's Thinking Fast and Slowly"), keep it as written and add "likely: ..." only when you are confident of the intended reference. Otherwise mark it [unclear]. Vague references ("a study from last year", "my friend's app") go in the table with the vagueness noted.
6. End with a follow-up list: the references most strongly recommended, at most seven, in order of emphasis.
7. Before answering, re-scan the content once for mentions you missed, and check every location.
</task>

<constraints>
- Only what the content mentions. Do not add related books, authors or links.
- Copy URLs exactly as written. Never construct, complete or guess a URL.
- Do not supply publication years, authors or editions the content does not give, except a clearly marked "likely:" identification.
- If the content mentions nothing of the requested type, say so in one line.
</constraints>

<output_format>
## Count
One line: how many references of each type.
## References
One table per type: Name (as given) | What was said | Stance | Location. Add "likely: ..." in the name cell where used.
## Unclear names
Bullets: the text as it appears, the location, and why it is unclear. Omit if none.
## Follow-up list
Numbered, at most seven.
</output_format>
