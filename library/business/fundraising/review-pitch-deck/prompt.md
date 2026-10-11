---
schema: 1
id: review-pitch-deck
kind: prompt
title: Review an existing pitch deck
description: Reviews a finished investor pitch deck slide by slide the way a partner skims it - what lands, what is missing, numbers that do not tie out - and ranks the fixes before sending.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive]
inputs: [document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pitch-deck, deck-review, investor-materials, storytelling, deck-critique]
pairs_with:
  prompts: [write-pitch-deck-outline, prepare-investor-qa, write-investor-one-pager]
  personas: [venture-capitalist]
args:
  - name: deck
    description: The deck's text, slide by slide - titles, body text, numbers and a short description of each chart or image.
    type: text
    required: true
  - name: round
    description: The round and audience (for example "seed, sending to generalist seed funds", "Series A, partner meeting").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Three-minute read, Slide by slide, Numbers that do not tie out, Missing, Top fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review pitch decks the way an investor reads them: fast, sceptical and looking for reasons to keep going. A deck sent ahead of a meeting has to stand on its own without the founder talking over it. Investors usually decide within a few minutes whether the team, market and traction justify a meeting. The frequent problems are slide titles that label rather than claim ("Market" instead of "Mid-size clinics spend 40k a year on this"), traction buried late, market size built top-down from a huge number, numbers that differ between slides, competition slides that claim no competitors, and an ask with no milestones attached.
</context>

<task>
Review this deck for a {{round}}.

<deck>
{{deck}}
</deck>

1. Three-minute read: write what an investor would remember after skimming it: the one-line company, the strongest proof point, the biggest doubt. If you cannot state the one-liner from the deck, say so; that is the first fix.
2. Slide by slide: for each slide, what it claims, whether the title states the claim, what evidence supports it, and one concrete fix. Keep each to three short lines.
3. Numbers that do not tie out: list every inconsistency (revenue on one slide differs from another, growth rate does not match the monthly figures, use of funds does not add up to the raise, runway does not follow from burn). Show the arithmetic.
4. Missing: the questions this round's investors will ask that the deck does not answer (for example why now, retention, unit economics, competition, team gaps, use of funds tied to milestones).
5. Top fixes: the five changes with the most effect, ranked, each with a rewritten slide title or sentence where useful.
</task>

<constraints>
- Judge only what is in the deck. Do not invent market data, competitors or benchmarks to fill gaps; mark them as gaps for the founder to fill.
- Be direct and specific; no generic advice ("tell a story") without the exact change.
- Do not restructure the whole deck into a template; respect the founder's order unless the order hides the strongest evidence.
- Keep claims about what "investors want" general; tastes differ by fund and stage.
</constraints>

<output_format>
## Three-minute read
## Slide by slide
Table: # | Slide | Claim | Evidence | Fix.
## Numbers that do not tie out
## Missing
## Top fixes
Numbered, highest impact first.
</output_format>
