---
schema: 1
id: plan-tax-move-abroad
kind: prompt
title: Plan the tax side of moving abroad
description: Lists the tax questions to resolve when moving countries - residency tests, exit rules, treaties, double taxation, pensions and foreign-asset reporting - with a timeline and who to ask.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, consultant]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tax-residency, relocation, double-taxation, expat]
pairs_with:
  prompts: [organize-tax-documents, explain-tax-on-investments, compare-retirement-accounts]
args:
  - name: from_country
    description: The country you are leaving (and state or region if it taxes income separately).
    type: string
    required: true
  - name: to_country
    description: The country you are moving to (and state or region if relevant).
    type: string
    required: true
  - name: income_and_assets
    description: "Optional: your citizenships, planned move date, how you will earn (employed locally, remote for a foreign employer, self-employed), and assets you keep: home, rental property, pensions, investment accounts, company shares or options, crypto."
    type: text
output_contract:
  format: markdown
  sections: [The big picture, Questions to resolve, Timeline, Documents to gather, Who to ask, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people moving between countries see the tax questions they need answered, in time to act on them. Most expensive cross-border mistakes come from timing and assumptions: becoming tax resident in two countries at once; triggering an exit tax or a gain on deemed disposal by leaving; selling or receiving something in the wrong tax year; keeping investments or pensions that the new country taxes harshly or requires to be reported; missing foreign-account reporting; or assuming a tax treaty solves everything automatically. Rules differ greatly by country pair and change often, so your value is a complete, well-ordered list of questions with why each matters, not definitive answers.

Moving from: {{from_country}}
Moving to: {{to_country}}
</context>

<task>
{{#income_and_assets}}
Situation:

<situation>
{{income_and_assets}}
</situation>

{{/income_and_assets}}
1. Give the big picture in a short paragraph: how each country generally decides tax residency (for example days present, a home, family and economic ties, domicile, or citizenship-based taxation as in the United States), whether a double tax treaty between them is known to exist (say "check" if unsure), and the main risk for this move.
2. Build the list of questions to resolve, grouped by theme. For each, say why it matters for this move and what decides the answer. Cover at least:
   - Residency: when residency ends in the old country and starts in the new one, split-year or part-year treatment, treaty tie-breaker rules, and proof of departure (deregistration, closing a home).
   - Exit and timing: exit or departure taxes on unrealised gains, company shares or options; timing sales, bonuses, option exercises and property disposals around the move date.
   - Income after the move: where employment, remote work for a foreign employer, self-employment and rental income are taxed; withholding; double taxation relief by credit or exemption.
   - Social security: which country's system you pay into, totalisation agreements or certificates of coverage, and effects on future state pensions.
   - Pensions and investment accounts: whether tax-advantaged accounts keep their status abroad, how the new country taxes them, whether a provider will keep a non-resident customer, and fund rules that can be punitive for foreign residents.
   - Reporting: foreign bank and asset reporting duties, wealth or exit declarations, and filing duties that continue in the old country (for example for rental property or citizens taxed on worldwide income).
   - Property and other assets: renting out or selling the old home, crypto, inheritance and gift rules where relevant.
   - Any special regimes for newcomers in the destination that need an application within a deadline.
3. Build a timeline: before the move (6-12 months, 1-3 months), the move itself, the first tax year in the new country, and the first filing deadlines in both countries, with the action for each.
4. List documents to gather and keep (proof of dates, contracts, statements at the move date, cost bases).
5. Say who to ask for which question: a cross-border tax adviser covering both countries, the tax authorities, the pension provider, the employer's payroll or mobility team.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give a final answer on residency, tax owed or the best timing. Frame each item as a question with the factors that decide it.
- Mention specific rules (for example a named exit tax, a 183-day test, US citizenship-based taxation and foreign account reporting, or a newcomer regime) only if you are confident they exist for these countries, mark them "verify", and give the tax year your knowledge reflects. Never invent thresholds, rates or deadlines.
- Prioritise items that are irreversible or deadline-bound and mark them clearly.
- If the person holds US citizenship or a green card, or the move involves company equity, trusts or a business, flag that specialist advice is especially important.
- Keep it practical: no generic advice about moving that has nothing to do with tax or money.
{{> output/uncertainty}}
</constraints>

<output_format>
## The big picture
One short paragraph.

## Questions to resolve
For each theme, a table: question | why it matters for this move | what decides it | deadline-bound? (yes or no).

## Timeline
Table: when | action | country.

## Documents to gather
Checklist.

## Who to ask
Bullets: professional or body, and which questions go to them.

## Assumptions
Bullets, including the tax year your knowledge reflects.
</output_format>
