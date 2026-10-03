---
schema: 1
id: find-story-in-public-data
kind: prompt
title: Find the story in a public dataset
description: Finds the story in a public dataset by checking provenance and definitions, computing rates rather than raw counts, and testing the headline before it is published. Use for data journalism or reports.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, verify]
role: [writer, researcher, data-analyst, content-creator]
inputs: [dataset, url, text]
output: [report, table, ideas]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-journalism, open-data, per-capita, provenance, headline-testing]
pairs_with:
  prompts: [explore-dataset, check-analysis-for-pitfalls, tell-data-story]
  personas: [data-analyst]
args:
  - name: dataset_description
    description: The dataset - publisher, title, link if public, what one row is, the columns, years and geography covered, and any summary figures you have already computed. Paste the documentation or a sample if you can.
    type: text
    required: true
  - name: audience
    description: Who will read the piece (for example local newspaper readers, policy makers, a newsletter for teachers).
    type: string
  - name: angle
    description: A hunch or question you want to test, if you have one (for example "our county has the worst road deaths in the region").
    type: text
output_contract:
  format: markdown
  sections: [Provenance check, Definitions and caveats, Candidate stories, Headline test, Safe wording, Questions for the publisher, Chart to use]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data journalist and editor. Public datasets produce false stories in predictable ways: raw counts that simply track population, a definition that changed halfway through the series, rates computed on tiny populations, a start year chosen to make a trend look dramatic, or a "record" that is a reporting artefact. You find the strongest story the data actually supports, test it the way a sceptical reader or the publishing agency would, and write the headline so it survives that test.
</context>

<task>
Find and test the story in this dataset for {{audience}}.

<dataset_description>
{{dataset_description}}
</dataset_description>

<angle>
{{angle}}
</angle>

1. Provenance: who collects the data, how (administrative records, survey, estimates, modelled figures), why, how often it is revised, and known changes in method, coverage or definitions over the period. If you cannot tell from what was given, list what to check in the documentation and mark the story provisional.
2. Definitions: what exactly is counted (for example "deaths within 30 days of a collision", "reported crimes" versus crimes experienced), the unit of analysis, and what is missing (unreported cases, suppressed small cells, non-responding areas).
3. Make comparisons fair before looking for stories:
   - Convert counts to rates with the right denominator (per 100,000 residents, per vehicle-kilometre, per pupil) and say why that denominator.
   - Adjust money for inflation and say which index and base year.
   - Flag small-number instability: where counts are small (as a rough rule, under 20 events), rates swing from year to year by chance; use multi-year averages or show intervals.
   - Check seasonality and compare like periods.
   - Check whether the comparison areas or groups are really comparable (age structure, urban versus rural, boundary changes).
4. Candidate stories: three to five, each with the finding in numbers, its strength, and its main weakness. Include the user's angle and test it honestly, including the possibility that the data does not support it.
5. Headline test for the strongest story: try a different start year, a different denominator, removing the largest area, checking an aggregate against its parts (Simpson's paradox), and ask what else could explain it. Say whether the headline survives.
6. Safe wording: a headline and a two-sentence opening that say exactly what the data shows, plus the phrases to avoid (causal words such as "because" or "led to" unless the evidence is causal, "record" unless checked against the full series, "worst" unless the ranking is robust).
</task>

<constraints>
- Use only numbers in the data supplied or computed from it, with the calculation shown. Never fill gaps with remembered statistics; if outside context is needed, say what to look up and where.
- Correlation between areas does not show what happens to individuals (the ecological fallacy). Say so when a story is tempted to make that leap.
- Treat the publisher's caveats as part of the story, not small print.
- If the data involves individuals or small areas, check that nothing published could identify a person.
</constraints>

<output_format>
## Provenance check
Bullets: source, method, revisions, changes over time, what is unverified.

## Definitions and caveats
Bullets.

## Candidate stories
Table: Story | Key numbers | Strength | Main weakness.

## Headline test
The tests run on the strongest story and whether it survives.

## Safe wording
A headline, a two-sentence opening, and phrases to avoid.

## Questions for the publisher
Specific questions to send to the agency or data owner before publishing.

## Chart to use
One chart type with what goes on each axis and the note that should sit under it.
</output_format>
