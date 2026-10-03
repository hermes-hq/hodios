---
schema: 1
id: summarize-earnings-call
kind: prompt
title: Summarise an earnings call
description: Summarises an earnings call transcript into results versus stated expectations, guidance changes, management tone, analyst concerns and what to watch, for learning rather than trading advice.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, financial-analyst, student]
requires: [none]
inputs: [transcript]
output: [summary, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [earnings-call, guidance, quarterly-results, equity-research]
pairs_with:
  prompts: [read-company-financials, evaluate-stock-tip, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: transcript
    description: The earnings call transcript, ideally including both prepared remarks and the analyst Q&A. Paste the full text; partial transcripts are summarised with a note on what is missing.
    type: text
    required: true
  - name: company
    description: Company name and the quarter or period the call covers.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In one paragraph, Results, Guidance, Management tone, What analysts pushed on, Questions not fully answered, What to watch next, Terms explained, Limits of this summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An earnings call has two halves with different value. The prepared remarks are scripted and polished; the analyst Q&A is where pressure shows - which topics analysts return to, which questions get vague answers, and whether management's tone shifts. A useful summary separates what was **reported** (numbers), what was **promised** (guidance), what was **implied** (tone, emphasis, omissions) and what is **still open**, and every claim is traceable to a line in the transcript. It never invents analyst consensus figures or share-price reactions that are not in the text.

Company and period: {{company}}

<transcript>
{{transcript}}
</transcript>
</context>

<task>
1. Check the input: say whether it contains prepared remarks, Q&A or both, and whether it looks complete. If it is not an earnings call (for example a press release or a news article), say so and summarise it as what it is.
2. Results: extract the headline metrics actually stated (revenue, growth rates, margins, earnings per share, cash flow, segment figures, key operating metrics such as customers or units). For each, give the figure, any comparison the transcript states (prior year, prior quarter, prior guidance, expectations), and a short supporting quote. If no comparison to expectations is stated, write "not stated in transcript" rather than supplying one.
3. Guidance: list every forward-looking figure or range, mark it raised, maintained, lowered, introduced or withdrawn when the transcript makes that clear, and note the assumptions management attached.
4. Management tone: describe confidence and caution with evidence - hedging words, repeated themes, topics given more or less time than expected, differences between the script and the Q&A. Quote briefly. Separate observation from interpretation.
5. What analysts pushed on: group the Q&A into 3-6 themes, each with who asked (firm if given), the core concern, and the gist of the answer.
6. Questions not fully answered: questions answered vaguely, deflected or deferred, with the quote.
7. What to watch next: 4-6 specific, checkable items for the next quarter (a metric, a promised milestone, a guidance assumption).
8. Terms explained: define the jargon used in this call in one line each (for example non-GAAP, free cash flow, net revenue retention, backlog, gross margin), for a learner.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the transcript. Do not add numbers, consensus estimates, share-price moves, or facts about the company from memory. If something important is missing, list it under limits.
- Quote accurately and keep quotes short; attribute them to the speaker when the transcript names one.
- Do not say whether to buy, sell or hold, give price targets, or predict the share price. If the user's framing asks for that, explain that this summary is for understanding, not a trading signal.
- Distinguish company-adjusted (non-GAAP or similar) figures from statutory ones whenever the transcript does.
{{> output/uncertainty}}
</constraints>

<output_format>
## In one paragraph
Plain-language summary for someone who has not read the call.

## Results
Table: metric | reported | comparison stated | quote.

## Guidance
Table: item | figure or range | change | assumptions.

## Management tone
Bullets with evidence; mark interpretations as such.

## What analysts pushed on
Table: theme | concern | answer gist.

## Questions not fully answered
Bullets with quotes.

## What to watch next
Numbered.

## Terms explained
Short glossary.

## Limits of this summary
Bullets.
</output_format>
