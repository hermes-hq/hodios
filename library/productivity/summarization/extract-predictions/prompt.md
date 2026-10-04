---
schema: 1
id: extract-predictions
kind: prompt
title: Extract the predictions from a text
description: Lists every prediction in a text with who made it, the timeframe, how checkable it is and what would count as right or wrong, ready to score later.
category: summarization
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual, researcher]
requires: [none]
inputs: [document, transcript, text]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [forecasts, pundit-tracking, accountability, scorecard]
pairs_with:
  prompts: [make-calibrated-forecast, label-fact-vs-opinion]
args:
  - name: content
    description: The article, interview, report, earnings call or podcast transcript.
    type: text
    required: true
  - name: include_implied
    description: When true, also list predictions the text implies without stating (for example "lock in your rate before it's too late" implies rates will rise), marked as implied.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Count, Predictions, Scorecard, Not scorable]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Commentators, executives and experts make many predictions and are rarely held to them, partly because nobody writes them down precisely. The reader wants a record they can come back to and score: who said what would happen, by when, and what outcome would make them right or wrong. Vague predictions should be recorded as vague, not quietly sharpened into something the speaker never committed to.

<content>
{{content}}
</content>
Include implied predictions: {{include_implied}}
</context>

<task>
1. Find every statement about what will or will not happen in the future. Separate:
   - **Forecasts:** claims about outcomes the speaker does not control ("inflation will fall below 3%").
   - **Commitments:** plans or promises the speaker controls ("we will launch in Q3"). Keep these, labelled, because they are scorable too.
   - Goals, hopes and conditional scenarios presented as illustrations are not predictions; leave them out unless stated as expected.
2. If implied predictions are requested (true), add statements that only make sense if the speaker expects a future outcome, labelled "implied" with the reasoning in a few words. If false, leave them out.
3. For each prediction record: the verbatim quote; who made it ("author" if unattributed); the claim restated plainly; the timeframe (stated, implied, or none); the confidence language used ("will", "likely", "could", "I'd bet") without converting it to a number; any condition attached ("if rates stay high").
4. Rate **checkability**: high (specific outcome and date, publicly measurable), medium (outcome clear but date vague, or measure needs a choice), low (vague or unfalsifiable: "things will get harder").
5. Write **resolution criteria** for high and medium items: what observable result counts as right, what counts as wrong, and what kind of source would settle it (official statistics, company filings, election results). Suggest a check date.
6. Where a prediction is vague, you may add a "sharpened version" in the criteria column, clearly labelled as yours, so the reader can decide whether to hold the speaker to it.
7. Before answering, check every quote is verbatim and every timeframe matches the text.
</task>

<constraints>
- Do not judge whether predictions are likely to come true; this is a record, not a forecast.
- Keep conditions with their predictions. A conditional prediction is wrong only if the condition held and the outcome did not.
- Do not invent dates. If no timeframe is given, write "none stated" and suggest a reasonable check date labelled as a suggestion.
- If the text contains no predictions, say so in one line.
</constraints>

<output_format>
## Count
One line: forecasts, commitments, implied (if requested).
## Predictions
Table: # | Quote | Who | Type (forecast, commitment, implied) | Claim | Timeframe | Confidence language | Condition.
## Scorecard
Table: # | Checkability | Right if | Wrong if | Settled by | Check on | Outcome (left blank).
## Not scorable
Bullets: low-checkability items and why.
</output_format>
