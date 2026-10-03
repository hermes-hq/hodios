---
schema: 1
id: organize-crypto-tax-records
kind: prompt
title: Organise crypto tax records
description: Organises crypto transaction records for tax reporting, listing the exchanges and wallets to export, how to classify events, cost basis method questions and the data gaps to fix.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, dataset]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crypto, cost-basis, capital-gains, record-keeping]
pairs_with:
  prompts: [explain-crypto-risks, explain-tax-on-investments, organize-tax-documents]
args:
  - name: platforms
    description: Every exchange, broker, wallet, chain and DeFi or staking service you have used (including closed accounts), and roughly what you did on each (bought, sold, swapped, staked, received airdrops, paid for things, moved between wallets).
    type: text
    required: true
  - name: country
    description: Country where you are tax resident (and state if relevant), plus any country you lived in during the period.
    type: string
    required: true
  - name: tax_year
    description: The tax year to prepare, for example 2025 or 2025-26. Optional; without it, the most recent completed tax year is assumed and stated.
    type: string
output_contract:
  format: markdown
  sections: [Source inventory, Export checklist, How each event is usually treated, Cost basis questions, Gaps and how to fix them, Reconciliation checks, Questions for your tax preparer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone turn scattered crypto activity into a complete, defensible record before a tax return. The hard part is rarely the tax rate; it is completeness. Gains are computed from cost basis, and cost basis breaks whenever a source is missing: a closed exchange, a wallet nobody exported, a transfer between your own wallets that a tax tool reads as a sale, or tokens that arrived with no known purchase price. Tax authorities increasingly receive exchange data directly, so gaps become mismatches.

Country: {{country}}
{{#tax_year}}Tax year: {{tax_year}}{{/tax_year}}
If no tax year is given, assume the most recent completed tax year and say which one you assumed.
</context>

<task>
Platforms and activity:

<platforms>
{{platforms}}
</platforms>

1. Build a source inventory: every exchange, broker, wallet (by chain) and DeFi, lending or staking service named, plus any implied by the activity (for example, a swap implies a wallet or DEX). Ask about likely missing sources: old or closed exchanges, hardware wallets, payment cards, peer-to-peer trades.
2. For each source, say what to export (full transaction history from the first ever transaction, not just the tax year; fiat deposits and withdrawals; fees; staking or interest reports), the usual export route (CSV, read-only API key, public address for on-chain history), and what to do when the platform no longer exists.
3. Classify the event types present and how they are commonly treated, marking "verify for {{country}}": disposals to fiat, crypto-to-crypto swaps, spending crypto, transfers between your own wallets (usually not a disposal, but must be matched), income such as staking, mining, airdrops and rewards, fees, lending, bridging and wrapped tokens, NFTs, lost or stolen assets.
4. List the cost basis questions to settle for {{country}}: which methods are allowed or required (for example FIFO, specific identification, average or pooling with matching rules), whether basis is tracked per wallet or across all holdings, how fees are treated, and whether holding periods change the rate or exempt the gain.
5. List the gaps visible so far and the fix for each: unmatched transfers, missing purchase prices, negative balances in a tool, airdropped tokens with no value at receipt, missing fiat history.
6. Give reconciliation checks before anything is filed: end-of-year balances in the records match the real wallets and exchange statements; every outgoing transfer has a matching incoming one or is a disposal; fiat in and out roughly matches bank statements.
7. End with questions for a tax preparer who handles crypto.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never ask for, accept or store private keys, seed phrases or passwords. If the user pastes one, tell them to move the funds to a new wallet now, because the old one should be treated as compromised. API keys for exports must be read-only.
- Do not compute gains or tax due; this prompt builds the record that a preparer or tax software will use.
- Mark every country-specific rule "verify" unless you are confident it is current, and name the official source. If you do not know the country's treatment, say "I don't know" and give the common questions.
- Do not suggest ways to hide activity or avoid reporting. If the user mentions unreported gains from earlier years, recommend a tax professional and the authority's voluntary disclosure route.
- Do not recommend any specific crypto tax software; describe what to look for (supports the user's chains and platforms, handles the country's matching rules, exports an audit trail).
{{> output/uncertainty}}
</constraints>

<output_format>
## Source inventory
Table: source | type (exchange, wallet, DeFi, other) | chains or assets | still open? | export route.

## Export checklist
Checklist per source.

## How each event is usually treated
Table: event | typical treatment | confidence | verify.

## Cost basis questions
Numbered.

## Gaps and how to fix them
Table: gap | why it matters | fix.

## Reconciliation checks
Checklist.

## Questions for your tax preparer
Numbered.
</output_format>
