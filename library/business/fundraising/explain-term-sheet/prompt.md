---
schema: 1
id: explain-term-sheet
kind: prompt
title: Explain a startup term sheet
description: Explains a startup term sheet clause by clause - valuation, liquidation preference, board, vesting, protective provisions - what is common, what to question, and questions for your lawyer.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [term-sheet, venture-capital, liquidation-preference, dilution, cap-table, vesting]
pairs_with:
  prompts: [prepare-investor-qa, build-investor-pipeline, prepare-board-meeting]
  personas: [startup-mentor]
args:
  - name: term_sheet
    description: The term sheet text, pasted in full. Remove names if you prefer. Include your current cap table summary (founders, employee pool, prior investors, SAFEs or notes) if you have it.
    type: text
    required: true
  - name: stage
    description: The round and context (for example "pre-seed SAFE", "seed priced round", "Series A, two competing offers").
    type: string
output_contract:
  format: markdown
  sections: [What this deal is, Clause by clause, Economics worked example, Control summary, Points to raise, Questions for your lawyer, What we could not assess]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain venture term sheets to founders in plain language so they arrive at their lawyer and their investors prepared. Founders often focus on the headline valuation and miss terms that matter more over the life of the company: how the option pool is counted, liquidation preferences and participation, anti-dilution, board composition, protective provisions and vesting. You explain what each clause does, show the money with a worked example, describe how terms commonly appear in the market without claiming precise current norms, and leave legal judgement to the founder's lawyer.
</context>

<task>
Explain this term sheet{{#stage}} for a {{stage}}{{/stage}}.

<term_sheet>
{{term_sheet}}
</term_sheet>

1. What this deal is: in five sentences, the amount raised, the pre-money and post-money valuation, the investor's resulting ownership, the security type, and the two or three terms that matter most in this document.
2. Clause by clause: for every clause present (for example valuation and price per share, option pool, liquidation preference and participation, dividends, conversion, anti-dilution, board composition, protective provisions or veto rights, information rights, pro rata rights, founder vesting and acceleration, drag-along, right of first refusal and co-sale, no-shop and exclusivity, expenses, conditions to closing), explain in plain words what it does, then describe whether it reads as commonly seen, investor-favourable or founder-favourable, and why. Quote the clause text you are explaining. Name important clauses that are absent.
3. Economics worked example: using the numbers in the document, calculate the cap table after the round (including the option pool and any SAFEs or notes converting, if given), and show what founders, employees and investors receive at three exit values: a low exit near or below the amount invested, a moderate exit, and a large exit. Show the effect of the liquidation preference and participation. State every assumption.
4. Control summary: who controls the board after closing, which decisions need investor consent, and what that means in practice for raising the next round, selling the company or changing the budget.
5. Points to raise: the clauses worth discussing, ordered by impact, with the typical alternatives founders ask for and the trade-offs.
6. Questions for your lawyer: specific questions to bring, tied to clauses.
7. What we could not assess: missing information (for example the cap table, prior SAFEs, the definitive documents) and anything ambiguous in the wording.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain and compare; do not tell the founder to sign, reject or accept specific terms, and do not predict how a negotiation or a court would decide.
- Term sheets are usually non-binding except for clauses such as confidentiality, exclusivity and expenses. Say which clauses in this document appear to be binding and recommend confirming with the lawyer.
- Describe market practice in general terms ("commonly seen", "more investor-favourable"); do not cite precise market statistics or say what "every investor" does.
- Arithmetic must be exact, with formulas shown. If figures are missing, use clearly labelled assumptions.
- Legal effect and tax treatment depend on jurisdiction and the definitive agreements; recommend a startup lawyer reviews the term sheet before signing and an accountant for tax questions such as option pricing.
</constraints>

<output_format>
## What this deal is
## Clause by clause
For each clause: the quoted text, What it does, How it reads (common, investor-favourable or founder-favourable), Why it matters.
## Economics worked example
Cap table table: Holder | Shares or % before | After. Then the exit table: Exit value | Investors | Founders | Employee pool, with formulas.
## Control summary
## Points to raise
Table: Clause | Why raise it | Common alternatives | Trade-off.
## Questions for your lawyer
Numbered.
## What we could not assess
</output_format>
