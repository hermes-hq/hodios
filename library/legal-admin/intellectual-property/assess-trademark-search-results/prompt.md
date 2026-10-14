---
schema: 1
id: assess-trademark-search-results
kind: prompt
title: Assess trademark search results
description: Sorts the hits from your own trademark register search into likely conflicts, ones to watch and ones to set aside, by mark, goods and status, and lists what to take to a trademark attorney.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer, designer]
subject: [law]
requires: [none]
inputs: [text, dataset]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trademark-clearance, likelihood-of-confusion, nice-classes, brand-name]
pairs_with:
  prompts: [apply-for-trademark, vet-brand-name, evaluate-trademark-opposition]
args:
  - name: your_mark
    description: The name or logo you want to use, exactly as it will appear, and the goods or services you sell or plan to sell under it.
    type: text
    required: true
  - name: search_results
    description: The hits you found, pasted as a list or table - each mark, owner, office or country, classes, goods or services listed, status (filed, registered, expired, opposed) and dates. Include common-law hits (businesses, domains, shops) if you have them.
    type: text
    required: true
  - name: markets
    description: Countries or regions where you sell or plan to sell. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How to read this, Sorted results, Closest conflicts, Gaps in the search, Questions for a trademark attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a founder make sense of a trademark search they ran themselves, the way a trademark paralegal triages hits before an attorney's review. Novices make three mistakes with search results: they only worry about identical names and miss phonetic, visual and translated similarity; they only look at their own class when related goods in other classes can conflict (clothing and bags, software and online services, beer and wine); and they treat a "dead" or expired record as safe, or a live one as fatal, without looking at the goods, the owner's actual use and the market. Confusion risk is judged on the overall impression of the marks together with how close the goods and customers are, and on the dominant part of a composite mark rather than every word. The final view belongs to an attorney; your job is a clear, honest triage.
{{#markets}}

Markets: {{markets}}
{{/markets}}
</context>

<task>
<your_mark>
{{your_mark}}
</your_mark>

<search_results>
{{search_results}}
</search_results>

1. How to read this: two or three lines on what this triage can and cannot tell them.
2. Sort every hit into three groups: likely conflict, watch, set aside. For each give mark, owner, status, classes, and the reasons on four points: similarity of the marks (sight, sound, meaning, dominant element), closeness of the goods or services and customers, status and territory, and any sign of actual use. Do not drop hits the user listed.
3. Closest conflicts: for the top hits, explain in plain words why they matter, and what options people commonly discuss with an attorney (adjusting the name or specification, a different market, approaching the owner, checking whether an old mark is still used). Present options, not a recommendation.
4. Gaps in the search: variants, classes, markets or common-law sources the results suggest were not checked (spellings, translations, phonetic forms, the dominant word alone, company registers, marketplaces, social handles).
5. Questions for a trademark attorney: the five or so most useful questions, specific to these results.
</task>

<constraints>
{{> guardrails/professional-limits}}
- You cannot search registers. Work only from the results given; never add marks, owners or statuses that the user did not provide.
- Do not say the mark is clear, available, registrable or safe, or that a hit will or will not block it. Use "higher risk", "lower risk" and "unclear".
- Do not state class numbers for goods the user has not listed as fact; say "check against the current Nice classification".
- If a hit is an identical or near-identical mark for the same goods in a market the user sells in, say plainly that this needs an attorney before any launch spend or filing.
{{> output/uncertainty}}
</constraints>

<output_format>
## How to read this
Two or three lines.

## Sorted results
Table: group | mark | owner | status and territory | classes | marks similar? | goods close? | notes.

## Closest conflicts
Up to five short paragraphs.

## Gaps in the search
Bullets.

## Questions for a trademark attorney
Numbered list.
</output_format>
