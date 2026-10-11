---
schema: 1
id: find-citation-for-claim
kind: prompt
title: Find a source for a claim in your draft
description: Finds support for an uncited sentence in a draft by working out what kind of source it needs, planning the search and checking that each candidate supports the exact claim.
category: literature-review
version: 1.0.0
status: incubating
stage: [build, verify]
role: [researcher, student, writer]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [citations, citation-needed, claim-support, search-strategy]
pairs_with:
  prompts: [build-search-string, write-literature-review-section, verify-citations]
  personas: [research-librarian]
args:
  - name: claim
    description: The sentence that needs a citation, with the sentence before and after if they matter.
    type: text
    required: true
  - name: context
    description: The field and the kind of writing, for example "nursing dissertation, UK" or "economics journal article".
    type: string
  - name: candidates
    description: Sources you have already found, with abstracts or the relevant passage, so each can be checked against the claim.
    type: text
output_contract:
  format: markdown
  sections: [What the claim says, Source needed, Search plan, Candidate check, Suggested wording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Citation needed" is one of the commonest jobs in academic writing, and one of the riskiest to hand to a language model, which can produce a reference that looks right and does not exist, or a real paper that does not say what the sentence claims. Experienced writers work the other way round. They break the sentence into its parts (the number, the population, the direction of effect, the causal word, the time frame), decide what kind of source could carry each part (an official statistic, a primary study, a systematic review, a standard textbook, a primary historical source), search for that, and then read the passage to check it supports the exact wording. Often the honest outcome is to change the sentence: soften "causes" to "is associated with", add the population, or split the claim in two.
</context>

<task>
Help me find a source for this claim:
<claim>
{{claim}}
</claim>
{{#context}}Context: {{context}}{{/context}}
{{#candidates}}
Candidate sources found so far:
<candidates>
{{candidates}}
</candidates>
{{/candidates}}

1. Break the claim into its checkable parts and say what type of claim each is: a statistic, an empirical finding, a causal claim, a consensus statement, a definition, a historical fact.
2. For each part, say what kind of source would properly support it and which kind would be weak (for example a news article for a prevalence figure, or one small study for "research shows").
3. Flag parts that are probably too strong, too vague or too broad to support as written.
4. Give a search plan: where to search first (named databases, official statistics agencies, review collections), two or three search strings, and the filters to use.
5. If candidates are given, check each one against each part of the claim: supports, partly supports (and what is missing), does not support, or contradicts. Quote the passage you relied on. Note when a source is secondary and the primary source should be found.
6. Suggest wording that matches what the best available or likely evidence can carry, and say where two citations would be better than one.
</task>

<constraints>
- Never supply a reference from memory as if it were verified. If you name a likely source (for example a well-known report series), mark it "(verify)" and say what to check in it.
- Judge candidates only on the text provided. If a candidate is only a title, say it cannot be checked until the passage or abstract is read.
- Do not stretch a source: a study of one population, country or period supports a claim about that population, country or period.
- If the claim looks false or contested on current knowledge, say so and suggest how to check, rather than searching only for confirming sources.
- Respect the citation conventions of the field the user names; do not format references unless asked.
</constraints>

<output_format>
## What the claim says
Table: part | claim type | supportable as written (yes, needs narrowing, doubtful).
## Source needed
Bullets per part: best source type, weak source types to avoid.
## Search plan
Where to search, then search strings in a code block.
## Candidate check
Table: candidate | part | verdict | quoted passage. Write "No candidates given" if none.
## Suggested wording
The revised sentence, with a note on how many and which kinds of citations it needs.
</output_format>
