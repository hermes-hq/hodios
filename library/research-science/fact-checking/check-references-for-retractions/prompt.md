---
schema: 1
id: check-references-for-retractions
kind: prompt
title: Check a reference list for retracted papers
description: Checks a reference list for retracted, corrected or expression-of-concern papers and says how to handle each one in the text, from dropping the claim to citing the retraction.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student, writer, editor]
requires: [web]
inputs: [text, document]
output: [report, table]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [retractions, reference-checking, research-integrity, expression-of-concern, citations]
pairs_with:
  prompts: [verify-citations, check-wiki-article-sources, evaluate-source-credibility]
  rules: [source-citation-rules]
args:
  - name: references
    description: The reference list, ideally with DOIs, as it appears in your manuscript, thesis, report or article.
    type: text
    required: true
  - name: how_used
    description: Optional. The sentences where the key references are cited, so the advice can say whether each claim still stands.
    type: text
output_contract:
  format: markdown
  sections: [Result, Status of each reference, What to do in the text, Not checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Retracted papers keep being cited for years after the retraction, mostly because authors copy references from older papers or reference managers that never update. A retraction is not always fraud: papers are retracted for honest errors, duplicated publication, authorship disputes or ethics problems, and the reason changes what you should do. Other notices matter too: a correction (erratum or corrigendum) may change the number you quoted, and an expression of concern means the journal has doubts but no conclusion yet. The notice is usually on the article's own page at the publisher, linked from the DOI record, and indexed in the Retraction Watch database (now available through Crossref) and in PubMed for biomedical papers. Preprints can be withdrawn on their server even when no journal is involved. Citing a retracted paper is acceptable only when the retraction is the point, and then the notice should be cited too.
</context>

<task>
Check these references:
<references>
{{references}}
</references>
{{#how_used}}
<how_used>
{{how_used}}
</how_used>
{{/how_used}}

1. Parse each reference and identify it by DOI, or by title, authors, journal and year when there is no DOI. Flag references you cannot identify.
2. For each one, look up its current status on the publisher's article page and the DOI record, and search the Retraction Watch database and, for biomedical papers, PubMed. Record: no notice found, corrected, expression of concern, retracted, or withdrawn (preprints), with the notice date and stated reason.
3. For each notice, read what it changes. For a correction, say whether it affects the figure or finding the user cites. For a retraction, note whether the reason was error, misconduct, duplication or something else.
4. Recommend an action per flagged reference: keep as is; keep and update the quoted figure; cite the correction; replace with a sound source for the same claim (search for one, and say if none was found); drop the claim; or, when the retraction itself is relevant, cite both the paper and the retraction notice and say so in the text.
5. If citing sentences were given, say for each flagged reference whether the claim still stands on the remaining evidence.
</task>

<constraints>
- Report a status only from a page you opened in this session, with its link and date. Never declare a paper retracted or clean from memory.
- "No notice found" is not "safe": say which sources you checked.
- If you have no web access, say so at the top, give no statuses, and give the exact lookups to run per reference (DOI page, Retraction Watch database search, PubMed record) and what to look for.
- Do not suggest replacement references you have not opened and checked.
- Describe retraction reasons as the notice states them. Do not call anything misconduct that the notice does not.
- For long lists, prioritise the references that carry key claims and say how many were checked.
</constraints>

<output_format>
## Result
One line: how many references checked, how many with notices, and the mode (checked against sources, or not checked).
## Status of each reference
Table: reference | status | notice date and reason | source checked (linked). Flagged rows first.
## What to do in the text
One numbered item per flagged reference with the recommended action and, where given, whether the citing claim still stands.
## Not checked
References that could not be identified or looked up, and why.
</output_format>
