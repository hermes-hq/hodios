---
schema: 1
id: write-grant-resubmission-response
kind: prompt
title: Write the response-to-review section of a grant resubmission
description: Writes the introduction or response-to-review section of a grant resubmission, grouping criticisms by theme, stating each change and where it is, and disagreeing with evidence.
category: peer-review
version: 1.0.0
status: incubating
stage: [build, review]
role: [researcher]
requires: [none]
inputs: [document, notes]
output: [rewrite, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [grant-resubmission, summary-statement, response-to-review, funding, revise-and-resubmit]
pairs_with:
  prompts: [review-grant-proposal, write-grant-application, respond-to-reviewers]
  personas: [grant-writer]
args:
  - name: reviews
    description: The summary statement, panel comments or individual critiques from the previous round, including any scores, the discussion summary and the parts the panel said drove the score.
    type: text
    required: true
  - name: changes_made
    description: What you changed in the new application and where (aim, section, figure, page), new preliminary data, and any criticism you chose not to act on and why.
    type: text
    required: true
  - name: page_limit
    description: Space allowed for the response section, in pages.
    type: number
    default: 1
  - name: funder
    description: Funder and scheme, for example "NIH R01 resubmission (A1)" or "national research council, second submission". Used to follow its conventions; leave empty for a funder-neutral format.
    type: string
output_contract:
  format: markdown
  sections: [Gaps to close first, Response to review, Criticism to change map, Notes for the applicant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A resubmission is read by a panel that may include new members who never saw the first version. The response section has to work on its own: it shows that the applicants understood the critique, that the application is now stronger, and exactly where to find each change. Panels mark down responses that go reviewer by reviewer and repeat every minor point, that grovel or argue, that claim changes the new text does not contain, or that ignore the criticisms that actually drove the score. Strong responses lead with the issues that mattered most, group overlapping criticisms into themes, answer each with a concrete change and its location, and disagree rarely, briefly and with evidence. Funders set their own rules for this section (length, whether to mark changes in the text, what may be included), and those rules change, so the applicant must check the current instructions.
</context>

<task>
Write the response-to-review section for this resubmission{{#funder}} to {{funder}}{{/funder}}, within {{page_limit}} page(s).

<reviews>
{{reviews}}
</reviews>

<changes_made>
{{changes_made}}
</changes_made>

1. Extract every distinct criticism from the reviews. Note who raised it, whether more than one reviewer or the panel discussion raised it, and whether it was named as a major weakness or a reason for the score.
2. Group the criticisms into themes (for example rationale, approach and feasibility, rigour and statistics, team and environment, preliminary data). Rank themes by how much they drove the score.
3. Match each criticism to an item in the changes made. List any criticism with no matching change as a gap. Do not invent a change to fill it.
4. Draft the response:
   - An opening of two or three sentences: thank the reviewers once, name the main improvements, and say how the changes are shown in the text if the funder's instructions allow marking.
   - One short paragraph per theme, in rank order. Start with a neutral paraphrase of the concern (not a long quote), then the change, then its location (aim, section, page or figure).
   - Where the applicants did not make a change, say so plainly and give the evidence: a citation, new data, a feasibility argument or a design reason. Keep the tone factual and never suggest the reviewer misread the application.
   - Mention strengths the reviewers praised only if a change might seem to threaten them.
5. Fit the space: estimate the length (about 500 words per page at typical grant formatting, to be checked against the funder's font and margin rules) and cut minor points into a single closing sentence if needed.
6. Before you answer, check that every change you state appears in the changes made, every location matches, every major criticism is answered or listed as a gap, and the draft fits the page limit.
</task>

<constraints>
- Never state a change, a result or new data that is not in the changes made.
- Do not reveal or guess reviewers' identities, and do not quote critiques at length.
- Avoid flattery, apology and defensiveness; one line of thanks is enough.
- Do not state the funder's formatting rules as fact; tell the applicant to check the current instructions for this scheme.
- If the reviews or changes are too thin to match (for example only a score, or "we revised everything"), ask for the specific critiques or the list of changes and stop.
</constraints>

<output_format>
## Gaps to close first
Criticisms with no matching change, each with a suggested action (change the application, add a sentence of rebuttal with evidence, or accept and explain). "None" if there are none.
## Response to review
The section text, ready to paste, with theme headings in bold if space allows. State the estimated length.
## Criticism to change map
Table: Criticism | Raised by | Theme | Change made | Location.
## Notes for the applicant
Up to five points: funder rules to check, places where the new application should be strengthened to match the response, and any tone risk.
</output_format>
