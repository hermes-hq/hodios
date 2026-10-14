---
schema: 1
id: write-board-paper
kind: prompt
title: Write a board paper
description: Writes one board agenda paper with its purpose, recommendation, options, financial, risk and legal implications, and the exact resolution the board is asked to pass.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [executive, manager, founder, operations-manager]
requires: [none]
inputs: [notes, text, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [board-paper, governance, board-resolution, cover-sheet, directors]
pairs_with:
  prompts: [prepare-board-meeting, write-trustee-board-report, write-decision-memo, write-executive-summary]
args:
  - name: matter
    description: What the paper is about and the facts you have, such as figures, dates, options looked at, who has been consulted and what management recommends.
    type: text
    required: true
  - name: purpose
    description: What the board is asked to do with the paper.
    type: enum
    enum: [decision, approval, discussion, noting]
    default: decision
  - name: board_context
    description: The organisation type and anything about the board that matters, for example "private company, 7 directors, risk-averse on debt" or "charity trustees, finance committee has reviewed". Optional.
    type: string
  - name: house_format
    description: Your organisation's required board paper headings or cover sheet, if it has one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Board paper, Gaps to fill, Before it goes in the pack]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A board paper is read the weekend before the meeting by non-executives who know the organisation but not the detail. Company secretaries and chairs see the same failures again and again: the ask is on page four, the paper narrates management activity instead of framing a decision, options are a straw man next to the favourite, financial and risk implications are a single line saying "none", and the board cannot tell what exactly it is resolving. Good papers open with a cover block that states the purpose (decision, approval, discussion or noting) and the resolution in words the minutes can copy, give the board the information it needs to discharge its duties (alternatives considered, risks, who was consulted, conflicts of interest), and stay short, with detail in appendices.
</context>

<task>
Write a board paper.

<matter>
{{matter}}
</matter>
Purpose: {{purpose}}
{{#board_context}}Board context: {{board_context}}{{/board_context}}
{{#house_format}}
<house_format>
{{house_format}}
</house_format>
{{/house_format}}

1. If you cannot tell what the board is being asked to do or there are no facts to put before it, ask up to three short questions and stop.
2. If a house format is given, use its headings exactly and in order; fit the content below into them. Otherwise use the structure in the output format.
3. Write the cover block: title, meeting date, agenda item, author and sponsoring executive, purpose, and for a decision or approval the draft resolution, phrased so the secretary can minute it ("The Board approves ... subject to ..."). For discussion or noting papers, state the question for discussion or what the board is asked to note.
4. Write an executive summary of no more than five sentences: the issue, the recommendation and the main reason, the money involved, and the biggest risk.
5. Background: only what a director needs to understand why this is coming now, including any earlier board decisions mentioned in the matter.
6. Options: two to four genuine options including doing nothing where realistic, assessed on the same criteria. Then the recommendation and why it beats the others.
7. Implications, each under its own label, written from the facts given or marked `[NEEDED: …]`: financial (cost, funding source, budget impact), risk (main risks and mitigations), legal and regulatory (flag anything needing legal sign-off without stating the law yourself), people, stakeholders and reputation, and consultation (who has reviewed it, such as a committee or auditors).
8. Conflicts of interest: state any the matter mentions, or add a line asking the author to confirm none.
9. Next steps and reporting back: what happens after the decision, who owns it, and when the board will hear about it again.
</task>

<constraints>
- Use only facts in the matter. Never invent figures, dates, committee approvals or legal positions; mark gaps `[NEEDED: …]`.
- Body of the paper about 600 to 1,200 words; suggest appendices for detail instead of growing the body.
- Neutral, factual tone addressed to directors, not a sales pitch. No "exciting opportunity" language.
- Do not give a legal opinion on directors' duties or regulations in any jurisdiction; point to where the company secretary or counsel must confirm.
- If the matter suggests the board is being asked to approve something already done, say so plainly in Gaps to fill, since it changes the resolution to ratification.
</constraints>

<output_format>
## Board paper
Cover block (as a short table), then headed sections: Executive summary, Background, Options, Recommendation, Implications (sub-labelled), Conflicts of interest, Next steps and reporting, Appendices (suggested list).
## Gaps to fill
Each `[NEEDED: …]` with where to get it. "None" if none.
## Before it goes in the pack
Three checks specific to this paper, such as who must review it and any number to reconcile with the finance pack.
</output_format>
