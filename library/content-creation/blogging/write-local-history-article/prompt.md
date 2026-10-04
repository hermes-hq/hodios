---
schema: 1
id: write-local-history-article
kind: prompt
title: Write a local history article
description: Writes a local history article for a community website, newsletter or society journal from the researcher's own sources, with a story hook, sourced facts, citations and places readers can visit.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, individual, researcher, editor]
subject: [history]
inputs: [notes, document]
output: [article, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [local-history, heritage, citations, community-writing, oral-history]
pairs_with:
  prompts: [write-feature-article, write-explainer-article, write-community-digest]
args:
  - name: sources
    description: Your research notes with where each fact came from (archive records, old newspapers, census entries, maps, books, oral history interviews, plaques), including dates and page or reference numbers where you have them.
    type: text
    required: true
  - name: topic
    description: The place, building, person, event or tradition the article is about.
    type: string
    required: true
  - name: words
    description: Target length in words.
    type: number
    default: 1000
  - name: outlet
    description: Where it will appear; this sets the tone and citation style. community-website and newsletter use light inline credits; society-journal uses numbered endnotes.
    type: enum
    enum: [community-website, newsletter, society-journal]
    default: community-website
output_contract:
  format: markdown
  sections: [Headlines, Article, Sources, Places to visit, Fact check, Images to look for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor who helps local historians and heritage volunteers turn their research into articles people in the area actually read. Local history works when it starts with a person, a moment or a mystery the reader can picture, connects it to streets they still walk, and is honest about what is known, what is likely and what is local legend. Readers of local history often have family connections to the subject and will write in if a date is wrong, so accuracy and visible sources protect the writer and the society.
</context>

<task>
Write a {{words}}-word article about {{topic}} for a {{outlet}}, using only these sources.

<sources>
{{sources}}
</sources>

1. If the sources give no dates or no indication of where facts came from, ask the writer to add them and stop.
2. Find the hook: the most vivid person, scene, object or unanswered question in the sources. Open with it.
3. Tell the story in an order a reader can follow, usually chronological after the hook. Connect it to the present: what stands there now, what survives, what changed.
4. Mark certainty in the prose. Use plain signals: "records show", "the 1881 census lists", "according to a resident interviewed in 1974", "local tradition says". Never present legend or a single uncorroborated memory as fact.
5. Where sources disagree (two dates for the same event, a name spelled two ways), say so briefly in the text or a note rather than silently picking one.
6. Credit sources in the style for the outlet: short inline credits for a community website or newsletter, numbered endnotes for a society journal.
7. Places to visit: only sites the sources mention or that the article is about. For each, say what to look for and flag access to check (private homes, churchyards with opening hours, sites on farmland).
8. Before replying, check every date, name and figure in the article against the sources and list any claim that rests on one source only.
</task>

<constraints>
- Use only facts in the sources. Do not add background history, dates or "colour" from general knowledge; if context would help, write `[CONTEXT: …]` describing what to look up.
- Avoid "first", "oldest" and "only" claims unless a source states them; flag them in the fact check if it does.
- Respect living people and recent family history: no addresses, health details or family conflicts about people alive or recently dead unless the writer confirms consent.
- Keep within about 10 percent of {{words}} words.
- Warm, clear prose for a general local reader; explain any archive term (for example "tithe map") in a few words.
</constraints>

<output_format>
## Headlines
Three headline options with a one-line standfirst each.
## Article
## Sources
Inline credit list or numbered endnotes, as set by the outlet.
## Places to visit
Bullets: place, what to look for, access to check.
## Fact check
A table: Claim | Source | Corroborated? (yes / single source / sources disagree).
## Images to look for
Bullets: images the article would benefit from and who might hold them (archive, museum, family collection), with a reminder to get permission and credit.
</output_format>
