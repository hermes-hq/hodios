---
schema: 1
id: write-pitch-deck-outline
kind: prompt
title: Outline an investor pitch deck
description: Outlines an investor pitch deck slide by slide - headline, content, the evidence each slide needs and the investor question it answers - tailored to the round. Use before designing slides.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, executive]
inputs: [notes, text, document]
output: [outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pitch-deck, startup-fundraising, storytelling, venture-capital]
pairs_with:
  prompts: [prepare-investor-qa, estimate-market-size, model-unit-economics]
  personas: [startup-mentor]
args:
  - name: company
    description: What the company does, customers, traction and key metrics, team, business model, competitors, and anything distinctive. Notes are fine.
    type: text
    required: true
  - name: stage
    description: The round you are raising.
    type: enum
    enum: [pre-seed, seed, series-a, later]
    default: seed
  - name: raise
    description: How much you are raising and what it funds (for example "2m to reach 1m ARR in 18 months"). Leave empty if undecided.
    type: string
output_contract:
  format: markdown
  sections: [Narrative, Slides, Evidence gaps, Appendix slides]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have helped founders raise from pre-seed to growth rounds and have sat on the investor side of the table. A deck is a story in which each slide answers the question the previous slide raised, and investors spend a few minutes on a first read, so every slide needs one clear claim as its headline. What investors need to believe changes by stage: at pre-seed the team and insight, at seed early proof of demand, at series A a repeatable growth engine with healthy unit economics, and later, efficient scale.
</context>

<task>
Outline a {{stage}} pitch deck for this company:

<company>
{{company}}
</company>

Raise: {{raise}}

1. Write the narrative in three to five sentences: the problem, the insight, why now, the proof, and what the money unlocks.
2. Choose 10 to 14 slides for this stage. A typical order is: title, problem, solution, why now, market, product, traction, business model, go-to-market, competition, team, financials, the ask and use of funds. Reorder to lead with the strongest material (for example traction early if it is exceptional; team early at pre-seed), and drop or merge slides that the stage does not need.
3. For each slide give:
   - the headline as a full-sentence claim ("Clinics lose 18% of revenue to no-shows"), not a topic label;
   - the content: two to four points, the visual (chart, screenshot, diagram) if one helps;
   - the evidence it needs, using what the company provided and naming what is missing;
   - the investor question it answers.
4. Calibrate to stage:
   - pre-seed: founder-market fit, the insight, early signals (interviews, waitlist, letters of intent);
   - seed: early revenue or usage, retention, a credible go-to-market hypothesis;
   - series A: growth rate, retention cohorts, unit economics, repeatable channels, path to the next milestone;
   - later: efficiency, margins, market leadership, expansion.
5. The ask slide: amount, the milestones it funds, and runway in months. If the raise is empty, outline what the ask slide needs and how to decide it.
6. List evidence gaps in priority order and a short set of appendix slides for diligence questions.
</task>

<constraints>
- Use only facts from the input. Every missing number becomes `[NEEDED: …]`; never invent traction, market sizes, customers or team credentials.
- Headlines must be claims supported by the evidence on that slide.
- Market sizing should be bottom-up; flag any top-down "1% of a huge market" logic.
- Competition must show honest alternatives (including doing nothing or spreadsheets), not a chart where the company wins every axis.
- If the company description is too thin to outline a deck (no product, customer or problem), ask for those three things and stop.
</constraints>

<output_format>
## Narrative
Three to five sentences.

## Slides
Numbered. For each: **Headline**, Content, Visual, Evidence (have / need), Investor question.

## Evidence gaps
Numbered, most important first, with how to get each.

## Appendix slides
Bullets.
</output_format>
