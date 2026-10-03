---
schema: 1
id: chase-citations
kind: prompt
title: Chase citations from seed papers
description: Plans backward and forward citation chasing from seed papers with the right tools, screening, iteration rounds, a stopping rule and a search log fit for reporting.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [citation-searching, snowballing, forward-citation, backward-citation, search-strategy, tarcis]
pairs_with:
  prompts: [build-search-string, screen-studies, write-prisma-flow-report, build-literature-matrix]
  personas: [research-librarian]
args:
  - name: seed_papers
    description: The seed papers, one per line, with DOI or full reference, plus what your review is about and whether citation chasing supplements a database search or is your main method.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Seed set check, Chasing plan, Stopping rule, Search log template, Reporting text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Citation searching follows the links between papers: backward through the reference lists of seed papers, and forward to the later papers that cite them. It finds studies that keyword searches miss because of inconsistent terms, and the TARCiS statement recommends it as a supplementary method for most systematic searches, with its terms and processes reported precisely. Results depend on the seed set: seeds that are all from one group or one database will reproduce that group's citation network. Tools differ in coverage (Web of Science, Scopus, Google Scholar, OpenAlex, Semantic Scholar, Lens) and visual tools such as citation-network mappers help with discovery but are hard to report reproducibly. Without a stopping rule, chasing never ends; without a log, it cannot be reported.
</context>

<task>
Plan citation chasing from these seeds:
<seed_papers>
{{seed_papers}}
</seed_papers>

1. Check the seed set: how many, whether each meets the review's eligibility criteria, spread across years, authors, countries, designs and terminology. Point out clusters (for example three seeds from the same lab) and the kinds of seed to add. If the review topic or the role of chasing is not stated, ask before planning.
2. Plan backward chasing: extract reference lists (from full texts or a database's reference export), deduplicate against records already screened, and screen with the same criteria and process as the main search.
3. Plan forward chasing: which two complementary sources to use for "cited by" and why (one curated index plus one broad open index is a good default), export format, deduplication, and how to handle preprints and later versions of the same work.
4. Plan iteration: what counts as a new seed for the next round (newly included studies only), how many rounds are allowed, and how to record the generation each record came from.
5. Set the stopping rule: stop when a round yields no new included studies, or at a stated maximum of rounds, or when the remaining yield per hour drops below a stated level; state which applies.
6. Mention optional adjacent methods (co-citation and similar-article features, contacting authors) and how to report them separately if used.
</task>

<constraints>
- Do not invent references, citation counts or DOIs, and do not claim which papers cite the seeds; that comes from running the searches.
- Name tools by what they do and their coverage limits; mark any feature or limit you are unsure about as "to check".
- Keep screening identical to the main search (same criteria, same reviewers) so results are comparable.
- The plan must be reportable: every step leaves a date, source, count and file.
</constraints>

<output_format>
## Seed set check
A table: seed | eligible? | year | group or country | note. Then the gaps and suggested additions.
## Chasing plan
Numbered steps for backward, forward and iteration, each with tool, export, deduplication and screening.
## Stopping rule
The rule in one sentence, with the numbers.
## Search log template
A table with columns: round | direction | seed | source | date | records retrieved | after deduplication | screened in | included.
## Reporting text
A short methods paragraph describing the citation searching, with [placeholders] for dates and counts.
</output_format>
