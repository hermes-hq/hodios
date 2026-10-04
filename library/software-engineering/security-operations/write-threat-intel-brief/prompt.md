---
schema: 1
id: write-threat-intel-brief
kind: prompt
title: Write a threat intelligence brief
description: Writes a threat intelligence brief from supplied reports, summarising the threat, its relevance to the organisation, defanged indicators, recommended actions and a stated confidence level.
category: security-operations
version: 1.0.0
status: incubating
stage: [review]
role: [security-engineer, executive]
requires: [none]
inputs: [document, text, url]
output: [report, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [threat-intelligence, cti, tlp, indicators-of-compromise, executive-briefing]
pairs_with:
  prompts: [map-detection-coverage, write-threat-hunt-plan, write-sigma-rule]
args:
  - name: sources
    description: The reports, advisories, vendor blogs or intel feed entries to brief on, pasted as text, each with its title, publisher, date and any sharing label.
    type: text
    required: true
  - name: organisation_profile
    description: Who you are - sector, countries, size, internet-facing technology, key suppliers, and controls you already have - so relevance can be judged.
    type: text
    required: true
  - name: audience
    description: technical gives indicators, techniques and detection actions; executive gives business impact, decisions and plain language.
    type: enum
    enum: [technical, executive]
    default: technical
  - name: tlp
    description: The sharing label for the brief under the Traffic Light Protocol. It may not be less restrictive than the most restrictive source.
    type: enum
    enum: [clear, green, amber, amber-strict, red]
    default: amber
output_contract:
  format: markdown
  sections: [Header, Bottom line, The threat, Relevance to us, Indicators, Recommended actions, Confidence and gaps, Sources]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An intelligence brief is useful only if it answers "so what for us?". Many briefs summarise a vendor report faithfully and stop there, leaving readers to guess whether they are exposed or what to do. Others overstate: they treat one blog post as confirmed fact, merge claims from different sources without saying so, or copy indicators that are months old and long since reassigned. A good brief starts with the bottom line, ties every claim to a source, judges relevance against the organisation's real exposure, states confidence using consistent estimative language, and respects the sharing restrictions of its sources.
</context>

<task>
Write a {{audience}} brief, labelled TLP:{{tlp}}, from these sources:

<sources>
{{sources}}
</sources>

<organisation_profile>
{{organisation_profile}}
</organisation_profile>

1. Write the label in capitals as TLP 2.0 does: TLP:CLEAR, TLP:GREEN, TLP:AMBER, TLP:AMBER+STRICT (for `amber-strict`) or TLP:RED. Number the sources [S1], [S2] and note each one's publisher, date and sharing label. If any source carries a more restrictive label than TLP:{{tlp}}, say so at the top and use the stricter label. If the sources are not supplied as text (only links or titles), ask for the content and stop; do not summarise from memory.
2. Bottom line up front: two to four sentences on what is happening, whether it is relevant to this organisation, and the single most important action.
3. The threat: who (as named by the sources, attribution hedged as the sources hedge it), what they do, targets, and timeline, with a source reference on every claim. Where sources disagree, say so.
4. Relevance to us: compare the targeted sectors, regions and technologies with the organisation profile. Rate relevance as high, medium or low with the reason, and name the specific exposed assets or the reason none are exposed.
5. Indicators (technical audience only): defanged, each with type, source, first-seen date, and a note on shelf life (IP addresses and domains age quickly; hashes and behaviours last longer). For the executive audience, replace this with one sentence saying indicators were passed to the security team.
6. Techniques (technical audience): ATT&CK techniques by name with ids marked `[VERIFY]` if unsure, and which existing controls or detections would see each.
7. Recommended actions: prioritised, each with an owner role and timeframe (now, this week, this quarter). Executive actions are decisions and resources; technical actions are patches, detections, hunts and blocks.
8. Confidence and gaps: an overall confidence (high, moderate, low) with the reason, estimative words used consistently (almost certainly, likely, roughly even chance, unlikely), and the questions intelligence cannot yet answer.
9. Before answering, check that every factual claim carries a source reference and that no indicator appears undefanged.
</task>

<constraints>
- Use only the supplied sources and the organisation profile. Do not add facts, actors, indicators or campaigns from memory; if background would help, say what to look up.
- Separate facts reported by sources from your assessment, and label the assessment.
- Never lower the sharing restriction of a source's content.
- Executive version: no jargon without a plain explanation, no indicator lists, one page.
{{> output/uncertainty}}
</constraints>

<output_format>
## Header
Title, date placeholder, TLP label, audience, and author placeholder.

## Bottom line
Two to four sentences.

## The threat
Short paragraphs or bullets with [S#] references.

## Relevance to us
Rating, reason, exposed assets.

## Indicators
Technical: table Type | Value (defanged) | Source | First seen | Shelf life. Executive: one sentence.

## Recommended actions
Table: # | Action | Owner | When.

## Confidence and gaps
Overall confidence, reasoning, open questions.

## Sources
Numbered list with publisher, title, date and label.
</output_format>
