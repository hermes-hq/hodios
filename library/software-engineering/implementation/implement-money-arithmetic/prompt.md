---
schema: 1
id: implement-money-arithmetic
kind: prompt
title: Implement correct money handling in code
description: Implements money as integer minor units or decimals with currency, explicit rounding, allocation and safe totals, storage and serialisation. Use when code computes prices, splits, discounts or tax.
category: implementation
version: 1.0.0
status: incubating
stage: [build, design]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [money, currency, rounding, decimal-arithmetic, value-objects]
pairs_with:
  prompts: [review-diff-for-money-handling-bugs, introduce-value-objects, integrate-payments]
  personas: [backend-engineer]
args:
  - name: requirements
    description: What the code must compute (cart totals, invoice tax, revenue splits, currency conversion), which currencies, and any rounding rules already known.
    type: text
    required: true
  - name: stack
    description: Language, framework and database. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Questions for finance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer building money calculations that must add up to the cent. The rules experienced engineers follow:
- Never use binary floating point for money. Use integer minor units (cents) or an exact decimal type: `BigDecimal`, Python `Decimal`, .NET `decimal`, `NUMERIC` in the database. In JavaScript, use integers or a money library, and send amounts in JSON as integer minor units or strings, never floats.
- An amount without its currency is a bug waiting to happen. Keep amount and currency together in a value type, and refuse to add different currencies without an explicit conversion that records the rate, its source and its time.
- Minor units differ by currency (ISO 4217): JPY has 0 decimal places, most currencies have 2, KWD and BHD have 3. Do not hard-code 100.
- Rounding is a business and sometimes legal rule. Choose the mode deliberately (half-even, also called banker's rounding, or half-up) and the point where it happens. Tax rounded per line differs from tax rounded on the invoice total, and jurisdictions and accounting policies differ. Round once, at defined points, not at every intermediate step.
- Allocation must preserve the total: splitting 100.00 three ways is 33.34, 33.33, 33.33, with the remainder distributed by a stated rule (largest remainder or first parties), never three times 33.33.
- Percentages and discounts: compute on exact values, round once, and make sure discounts across lines add up to the discount on the total.
- Formatting for display (locale, symbol, separators) is separate from storage and calculation.
- Property-based tests catch what examples miss: allocations always sum to the original, conversions round-trip within a tolerance.
</context>

<task>
Implement money handling for:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing code that touches money: types, columns, serialisation, formatting, and any money library already installed. List every place that uses floats for money.
2. State the design: representation, currency handling, rounding mode and points, allocation rule, storage column types, API format, display formatting.
3. Implement a money value type (or adopt the installed library), the calculations required, the allocation function, and the storage and serialisation changes. Change the float-based code on the requested paths; list others without changing them.
4. Write example tests and property tests, then run them and the type check.
</task>

<constraints>
- Never invent tax rates, rounding laws or exchange rates. Where a rule depends on jurisdiction or accounting policy, make it configurable, choose a stated default, and list it under Questions for finance.
- Migrations that change column types on populated tables must preserve values exactly; flag them for review before running.
- Never invent library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed. Then the float-based money code left unchanged, with paths.
## Tests
One line per test. Include allocation summing to the total, a zero-decimal currency, a three-decimal currency, mixed-currency addition refused, and the rounding mode at its boundary (x.xx5).
## Verification
Commands run and their actual results.
## Questions for finance
Rules that need a decision from finance or an accountant, with the default implemented.
</output_format>
