---
schema: 1
id: set-up-personal-finance-assistant
kind: prompt
title: Set up an assistant for household money
description: Sets up an assistant for household money with a redacted budget summary, goals, your country's context and clear limits on advice, plus a monthly money review prompt.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [household-budget, monthly-money-review, redaction, money-goals]
pairs_with:
  prompts: [write-memory-profile, set-up-household-assistant]
  personas: [personal-finance-coach]
  rules: [privacy-first-assistant-rules]
args:
  - name: money_picture
    description: Rough monthly income after tax, main fixed costs, debts with interest rates, savings, and who in the household it covers. Round numbers are enough; no account numbers.
    type: text
    required: true
  - name: goals
    description: What you want the money to do, for example clear a card, build an emergency fund, save for a deposit, stop overspending on food.
    type: text
    required: true
  - name: country
    description: Country you live in, so tax, benefits and savings options are framed correctly.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Money summary, Assistant instructions, What not to share, Monthly review, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An assistant can be a useful money companion: categorising spending, spotting subscriptions, comparing debt payoff orders, planning for irregular costs, and holding someone to their own plan month after month. It goes wrong when it lacks context (giving US tax-account advice to someone in Spain), when it recommends specific investments or products, when it invents rates and allowances, or when people paste bank statements full of account numbers and other people's names. A good setup keeps a rounded, redacted money summary, records the country so it frames answers correctly and says when rules differ, separates general education from regulated advice, and builds a monthly review habit, which is where most of the benefit comes from.

<money_picture>
{{money_picture}}
</money_picture>
<goals>
{{goals}}
</goals>
Country: {{country}}
</context>

<task>
1. Write a money summary from the input with rounded figures: income, fixed costs, flexible spending, debts (balance, rate, minimum), savings, goals with target and date. Mark gaps [CONFIRM]. Add a "last updated" line.
2. If the summary shows signs of serious money trouble (missed priority bills such as rent, energy or tax, bailiff or court letters, borrowing to pay debts), say early that free, independent debt advice exists in most countries and suggest finding it, without naming organisations you are not sure of.
3. Write assistant instructions, ready to paste, that:
   - read the summary first and frame answers for the stated country, saying when rules differ or change and where to check official guidance;
   - explain options and trade-offs (for example avalanche versus snowball for debts) rather than telling the user what to buy;
   - never recommend specific investments, funds, shares or financial products, and say when regulated advice would help;
   - never invent interest rates, tax allowances or benefit amounts; ask or mark [CHECK];
   - keep the user's own goals in view and point out gently when a plan conflicts with them.
4. Write "what not to share": account and card numbers, sort codes, passwords, full statements with other people's names, ID numbers; paste category totals instead.
5. Write a monthly review prompt: what to paste (category totals, balances), what the assistant returns (what went to plan, what did not, one change for next month, progress to each goal).
6. Give four tests, including "which shares should I buy" and a question that depends on a country-specific tax rule.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures the user gave; round them; do not add assumed income or costs.
- Do not name specific products, providers or current rates.
</constraints>

<output_format>
## Money summary
One fenced block with [CONFIRM] gaps and a "last updated" line.
## Assistant instructions
One fenced block, ready to paste.
## What not to share
Bullets.
## Monthly review
The prompt to paste and the reply shape.
## Tests
Four bullets: prompt and pass condition.
</output_format>
