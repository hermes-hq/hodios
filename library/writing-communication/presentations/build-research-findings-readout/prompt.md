---
schema: 1
id: build-research-findings-readout
kind: prompt
title: Build a research findings readout deck
description: Builds a readout deck for interview, survey or usability research with the key insights first, the evidence behind each, how confident to be, and recommendations the team can act on.
category: presentations
version: 1.0.0
status: incubating
stage: [review, plan]
role: [ux-researcher, product-manager, designer, researcher]
requires: [none]
inputs: [notes, document, transcript]
output: [outline, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [research-readout, insights, evidence-strength, stakeholders, recommendations]
pairs_with:
  prompts: [synthesize-usability-findings, write-discovery-readout, plan-backup-slides, drill-presentation-qa]
  personas: [presentation-designer]
args:
  - name: findings
    description: Your synthesised findings, notes, quotes, survey results or affinity-map themes. The research should already be analysed; this builds the presentation of it.
    type: text
    required: true
  - name: study_details
    description: Method, number and type of participants, dates and the research questions the study set out to answer.
    type: text
    required: true
  - name: audience
    description: Who attends the readout and what decision or work it should inform, for example "product trio and engineering leads deciding Q3 scope".
    type: text
    required: true
  - name: time_slot
    description: Length of the readout session.
    type: string
    default: 30 minutes including discussion
output_contract:
  format: markdown
  sections: [Headline, Slide plan, Insight cards, Confidence and limits, Recommendations and owners, Discussion prompts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help researchers present findings so a team acts on them. Readouts fail when they walk through the study chronologically or participant by participant, when every observation gets equal weight, when quotes stand in for patterns, and when confidence is never stated, so five interviews are heard as "users want X". The audience then picks the finding that matches their prior view. A strong readout opens with the headline answer to the research questions, presents a small number of insights (an insight explains why people behave as they do, not just what they did), shows the evidence for each (how many participants, a short quote or clip placeholder, a task metric), is honest about what the sample can and cannot support, and ends with recommendations tied to the decision at hand and time for the team to discuss.

<findings>
{{findings}}
</findings>

Study details: {{study_details}}
Audience and decision: {{audience}}
Time slot: {{time_slot}}
</context>

<task>
1. Write the headline: the answer to the research questions in two or three sentences. If the findings do not answer a stated research question, say so.
2. Choose the three to six insights that matter most for the audience's decision. Rank them by impact on that decision, not by how often they came up. Merge duplicates and drop observations that are interesting but irrelevant to the decision (list them in an appendix).
3. For each insight write an insight card: a claim-style title, the evidence (how many of how many participants, or survey figures as given), one or two short supporting quotes from the findings, what it means for the product or service, and a confidence level (strong, moderate, tentative) with the reason.
4. Plan the deck: headline and recommendation summary first, a single slide on method and sample, one slide per insight, recommendations, open questions and next research, then an appendix. Keep main slides to about two thirds of {{time_slot}} and leave the rest for discussion.
5. Write recommendations as actions with a suggested owner type (design, engineering, product) and mark which are direct consequences of evidence and which are the researcher's judgement.
6. State the limits: sample size and makeup, who was not included, method biases, and which claims would need quantitative data to confirm.
7. Write three or four discussion prompts that get the team deciding rather than debating whether the research is valid.
</task>

<constraints>
- Use only the findings provided. Do not invent quotes, participant counts, percentages or behaviours. Use [clip placeholder] or [quote needed] where evidence is thin.
- Do not turn small qualitative samples into percentages or population claims; say "4 of 6 participants", not "67% of users".
- Keep quotes short and anonymised; remove names, employers and other identifying details.
- Separate what participants did, what they said, and what you infer.
</constraints>

<output_format>
## Headline
Two or three sentences.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes. Discussion time stated.

## Insight cards
For each insight: title, evidence, quotes, implication, confidence and reason.

## Confidence and limits
Bullets.

## Recommendations and owners
Table: Recommendation | Based on | Evidence or judgement | Suggested owner.

## Discussion prompts
Numbered.
</output_format>
