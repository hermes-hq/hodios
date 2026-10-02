---
schema: 1
id: write-business-plan
kind: prompt
title: Write a lean business plan
description: Writes a lean business plan - problem, solution, market, model, go-to-market, financials and risks - tailored to its reader. Use for your own planning, a bank, an investor or a partner.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, individual, executive]
inputs: [notes, text, document]
output: [docs, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [lean-plan, financial-projections, cash-flow, bank-loan]
pairs_with:
  prompts: [estimate-market-size, model-unit-economics, write-pitch-deck-outline]
  personas: [startup-mentor]
args:
  - name: business
    description: Everything you have - what the business does, customers, pricing, traction, team, costs, funding needed and for what. Notes, bullets and rough numbers are fine.
    type: text
    required: true
  - name: reader
    description: Who the plan is for, which changes emphasis, tone and level of financial detail.
    type: enum
    enum: [self, bank, investor, partner]
    default: self
output_contract:
  format: markdown
  sections: [Summary, Problem, Solution, Market, Business model, Go-to-market, Operations and team, Financial summary, Risks and mitigations, Milestones, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write business plans that people actually read: short, specific and honest about risk. A plan is persuasive when its numbers trace back to stated assumptions, not when it is long. Different readers look for different things, and you shape the plan for the stated reader without changing the facts.
</context>

<task>
Write a lean business plan for this business:

<business>
{{business}}
</business>

The reader is: {{reader}}.

1. Shape emphasis for the reader:
   - `self`: decisions, assumptions to test, milestones and the cash needed to reach each one.
   - `bank`: ability to repay - stable cash flow, conservative projections, owner's contribution, collateral, a monthly cash-flow view for the first year, and what happens in a downside case.
   - `investor`: size of the opportunity, traction and growth, why this team, how the money accelerates growth, and the path to the next round or profitability.
   - `partner`: what each side brings and gets, how the partnership creates value neither can alone, roles, and how success is measured.
2. Write each section in short paragraphs or bullets, using the facts provided. Where a fact is missing, insert a visible placeholder such as `[TO FILL: monthly rent for the unit]` rather than inventing it.
3. Build the financial summary from stated assumptions: list the assumptions (price, volume, growth, costs, hiring) first, then a three-year annual table (revenue, gross margin, operating costs, operating profit, cash at year end). Use a monthly view for year one when the reader is a bank. Show how the main lines are derived.
4. Write the risks honestly: the three to five most serious, each with likelihood, impact and mitigation.
5. Write the summary last: half a page that a reader could stop after, stating what the business is, why it will work, what is needed and what it delivers.
</task>

<constraints>
- No invented numbers, customers, partners or market statistics. Projections follow from assumptions you list; every assumption not in the input is marked `assumption`.
- Keep it lean: about 1,500 to 2,500 words plus tables, unless the input clearly needs less.
- Plain language, no hype ("revolutionary", "disruptive"). A bank plan in particular should read as cautious.
- This is a planning document, not financial, legal or tax advice. If the plan depends on a regulatory licence, a specific loan product or tax treatment, add a line recommending the relevant professional check it.
</constraints>

<output_format>
Markdown with these headings in order: Summary, Problem, Solution, Market, Business model, Go-to-market, Operations and team, Financial summary (assumptions list, then the tables), Risks and mitigations (table: Risk | Likelihood | Impact | Mitigation), Milestones (table: Milestone | Date | Cash needed), Missing information (every placeholder you used, as a checklist).
</output_format>
