---
schema: 1
id: audit-small-business-ip
kind: prompt
title: Audit a small business's IP
description: Inventories a small business's names, logos, content, code, designs, know-how and domains, checks who owns each and whether it is protected, and ranks the gaps to fix before a raise, sale or launch.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, executive, operations-manager]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ip-audit, ownership-chain, trade-secrets, domain-names, due-diligence]
pairs_with:
  prompts: [prepare-due-diligence-data-room, secure-rights-to-commissioned-work, apply-for-trademark]
args:
  - name: business
    description: What the business does, its brand names and logos, products, website and content, software, designs, recipes or processes, domains and social handles, who created each (founders, staff, freelancers, agencies) and on what terms, and any registrations held.
    type: text
    required: true
  - name: trigger
    description: Why now, for example fundraising, selling the business, international launch, a dispute, or a general check.
    type: string
    default: general check
output_contract:
  format: markdown
  sections: [IP register, Ownership gaps, Protection gaps, Priority fixes, Questions for an IP lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run an IP health check for a small business, the kind a buyer or investor will run anyway. The most common findings are not exotic: the logo and website were made by a freelancer with no written assignment; code was written by a founder before the company existed and never assigned to it; the domain and social accounts are registered to a former employee or an agency; the brand is used in markets where it was never cleared or registered; open-source components carry licence obligations nobody tracked; and the real competitive edge (recipes, pricing models, supplier lists, processes) is a trade secret with no confidentiality measures. The fix list is usually short: assignments, transfers of accounts, a few registrations in the markets that matter, and basic secrecy hygiene.

Trigger: {{trigger}}
</context>

<task>
<business>
{{business}}
</business>

1. IP register: list every asset in categories (brands, copyright works, software, designs, inventions, trade secrets and know-how, domains and accounts, licences in), with who created it, on what terms, who appears to own it now, and any registration. Mark unknowns.
2. Ownership gaps: assets created by non-employees or before incorporation, accounts held by individuals, missing assignments, third-party components (stock, fonts, open-source) whose licences need checking.
3. Protection gaps: key brands not cleared or registered in markets the business sells in or plans to, valuable know-how without confidentiality agreements or access controls, designs that may merit protection. Describe options; do not recommend specific filings as final.
4. Priority fixes: ranked by risk to the trigger event (for example ownership gaps first before a sale), each with the action, who does it, and whether a lawyer is needed.
5. Questions for an IP lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not conclude who legally owns an asset; describe the apparent position and what decides it.
- Do not invent registrations, filing costs or deadlines.
- Do not suggest backdating assignments or creating documents that misstate when rights were transferred; a current assignment that states the true dates is the honest fix.
{{> output/uncertainty}}
</constraints>

<output_format>
## IP register
Table: asset | type | creator | terms | apparent owner | registered? | notes.

## Ownership gaps
Bullets.

## Protection gaps
Bullets.

## Priority fixes
Table: priority | fix | owner | lawyer needed? | before trigger?

## Questions for an IP lawyer
Numbered.
</output_format>
