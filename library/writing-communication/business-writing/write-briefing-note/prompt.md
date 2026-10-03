---
schema: 1
id: write-briefing-note
kind: prompt
title: Write a briefing note
description: Writes a public-sector style briefing note for a minister, director or board with purpose, background, considerations, options and a recommendation under the required headings.
category: business-writing
version: 1.0.1
status: incubating
stage: [build]
role: [manager, consultant, business-analyst, executive]
requires: [none]
inputs: [text, notes, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [briefing-note, public-sector, civil-service, ministerial-briefing, board-paper, policy-options]
pairs_with:
  prompts: [write-decision-memo, write-executive-summary, write-public-consultation-response, write-policy-brief]
args:
  - name: issue
    description: The question or issue the note is about, and whether it is for decision, for information or for a meeting.
    type: text
    required: true
  - name: audience
    description: Who reads it and their role, for example "Minister of Housing", "Deputy Director, Transport Strategy" or "foundation board".
    type: string
    required: true
  - name: background
    description: The facts, history, figures, legal or policy framework, stakeholder positions, and who has been consulted.
    type: text
    required: true
  - name: options
    description: Options already identified, with what you know about cost, risk and timing. Leave empty to have options derived from the background.
    type: text
  - name: required_headings
    description: Your organisation's template headings, in order, if it has one, for example "Purpose; Summary; Background; Current status; Considerations; Options; Recommendation; Next steps".
    type: text
  - name: max_pages
    description: Maximum length in pages, at about 450 words per page.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Briefing note, Gaps and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Pairs with write-policy-brief, the research-to-policy counterpart."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A briefing note lets a senior decision-maker, often reading between meetings, understand an issue and act on it in a few minutes. Government departments in Canada, the UK, Australia and elsewhere use similar shapes: a purpose line saying whether it is for decision or information, a short summary, background, the current status, considerations (financial, legal, policy, stakeholder, communications, equity, risk), options with honest pros and cons, a recommendation, and next steps. Public servants write them impartially: the facts and risks are set out even when they are unwelcome, the recommendation follows from the analysis, and nothing is shaped for party-political advantage. Notes fail when the ask is buried, when options are straw men, when the legal or financial risk is missing, when acronyms go unexplained, or when they run past the page limit and are not read.
</context>

<task>
Write a briefing note for {{audience}}, no longer than {{max_pages}} pages (about 450 words per page).

<issue>
{{issue}}
</issue>

<background>
{{background}}
</background>
{{#options}}
<options>
{{options}}
</options>
{{/options}}
{{#required_headings}}
Required headings, in this order: {{required_headings}}
{{/required_headings}}

1. If you cannot tell what the issue is or the background has no facts to analyse, ask up to three questions and stop.
2. Decide the type: for decision (a recommendation and a decision line are needed), for information, or for a meeting (add key messages and likely questions). Use the type the issue states; otherwise infer it and say so under Gaps and checks.
3. Use the required headings exactly and in order if given. Otherwise use: Purpose; Summary; Background; Current status; Considerations; Options; Recommendation; Next steps. Drop Options and Recommendation for an information note.
4. Write each part:
   - Purpose: one sentence: "To seek your decision on…" or "To inform you of…", with the date a decision is needed and why.
   - Summary: three to five bullets a reader could stop after.
   - Background and Current status: only the facts needed to understand the options, with figures and dates from the input, in numbered paragraphs.
   - Considerations: the financial, legal, policy, stakeholder, communications and equity points that apply, each in a sentence or two. Name who has been consulted and who has not.
   - Options: two to four genuine options including the status quo if realistic, each with benefits, risks, cost and timing on the same basis. Do not weaken alternatives to favour the recommendation.
   - Recommendation: the option and the deciding reason, and its main risk with mitigation.
   - Next steps: what happens after the decision, by whom and when.
   - For a decision note, end with a decision line: "Agreed / Not agreed / Discuss", with space for signature and date.
5. Spell out every acronym on first use. Use plain, neutral language.
</task>

<constraints>
- Stay within {{max_pages}} pages; if the material cannot fit, keep the analysis and suggest an annex for detail under Gaps and checks.
- Use only the facts in the input. Never invent figures, legal positions, stakeholder views or consultation that did not happen; mark gaps `[NEEDED: …]`.
- Impartial: no party-political framing, no spin, no omission of a material risk even if the reader will not like it. If the input asks to leave out a material risk or to frame the note for political advantage, keep the risk and note why under Gaps and checks.
- No hedging chains; state uncertainty once, with what would resolve it.
</constraints>

<output_format>
## Briefing note
Header lines (To / From / Date / Subject / Type: for decision, information or meeting), then the note under its headings with numbered paragraphs.
## Gaps and checks
Bullets: `[NEEDED: …]` items with where to get them, assumptions made, who should clear the note (legal, finance, communications) before it goes up.
</output_format>
