---
schema: 1
id: score-conference-abstracts
kind: prompt
title: Score a batch of conference abstracts
description: Scores a batch of conference abstracts consistently against the committee's criteria, with a short evidence-based justification each and flags for borderline cases, conflicts and missing information.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [abstract-review, programme-committee, scoring-rubric, calibration, conference]
pairs_with:
  prompts: [write-meta-review, write-peer-review, review-grant-proposal]
  personas: [peer-reviewer]
args:
  - name: abstracts
    description: The abstracts to score, each with an id or number. Author names and affiliations can be left in or removed; they are ignored for scoring.
    type: text
    required: true
  - name: criteria
    description: The committee's scoring criteria and any weights or descriptors, for example "originality, methodological rigour, relevance to the theme, clarity; rigour counts double". Include the track or theme.
    type: text
    required: true
  - name: scale
    description: The score scale per criterion, for example "1-5", "1-7" or "accept / weak accept / weak reject / reject".
    type: string
    default: "1-5"
  - name: my_affiliations
    description: Your institution, close collaborators and recent co-authors, so possible conflicts of interest can be flagged. Leave empty to flag only conflicts visible in the abstracts.
    type: text
output_contract:
  format: markdown
  sections: [Scoring anchors, Scores, Flags, Ranking and calibration notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Abstract scoring drifts. The first abstracts get scored harder or softer than the last, a well-known lab's name nudges the score up, a fluent abstract is mistaken for a rigorous one, and borderline submissions get the same flat middle score with no reason. Committees need scores that apply one standard to every abstract, a short justification that points to the text, and honest flags where a human must decide: borderline cases, possible conflicts, missing results, or work outside the call. These scores are a first pass to help a reviewer, who signs off every score; final decisions stay with the committee.
</context>

<task>
Score these abstracts on a {{scale}} scale per criterion.

<criteria>
{{criteria}}
</criteria>

<abstracts>
{{abstracts}}
</abstracts>
{{#my_affiliations}}
Reviewer's affiliations and collaborators, for conflict checks: {{my_affiliations}}
{{/my_affiliations}}

1. Write scoring anchors before scoring: for each criterion, one line per score level (or for the lowest, middle and top levels if the scale is long) describing what an abstract at that level looks like. Apply weights exactly as the criteria state.
2. Score each abstract against the anchors, criterion by criterion. Base every score on what the abstract states: the question, the method, the sample or data, the results (or whether results are still pending), and the relevance to the track. Ignore author names, institutions and writing polish beyond what the clarity criterion covers.
3. Justify each abstract in one to three sentences that cite specific content ("n=12 single-site pilot, no comparison group" rather than "weak methods").
4. Flag, without letting the flag change the score:
   - Borderline: total within one point of the likely cut-off, or criteria that disagree sharply.
   - Conflict: an author or institution matching the reviewer's affiliations, or an obvious personal connection.
   - Missing information: no results, no method, or claims that cannot be judged from the abstract.
   - Scope: outside the call or track.
   - Integrity: possible duplicate submission, results that look implausible, or ethics concerns (for example human participants with no mention of approval where the field expects it).
5. Calibration pass: sort by total, reread the top three, the bottom three and every borderline abstract against the anchors, and adjust any score that drifted. Report what you changed.
6. Before you answer, check that every abstract has a score for every criterion, totals add up with the weights, and no justification relies on author identity.
</task>

<constraints>
- Start with one line reminding the user that submissions are confidential, to check the conference's policy on AI tools, and that they are responsible for the final scores.
- Never infer quality from author names, institutions, countries or language fluency.
- Do not invent results or details missing from an abstract; score what is there and flag what is missing.
- Use the committee's scale and criteria exactly; do not add criteria of your own.
- If the criteria or scale are missing or unclear, ask for them before scoring and stop.
</constraints>

<output_format>
One reminder line, then:
## Scoring anchors
A table per criterion: Score | What it looks like.
## Scores
Table: Abstract id | one column per criterion | Weighted total | Justification.
## Flags
Table: Abstract id | Flag type | Detail. "None" if there are none.
## Ranking and calibration notes
The abstracts ranked by total, the adjustments made in the calibration pass and why, and any pattern the committee should know (for example many abstracts with pending results).
</output_format>
