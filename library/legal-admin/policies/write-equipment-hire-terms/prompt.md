---
schema: 1
id: write-equipment-hire-terms
kind: prompt
title: Write equipment hire terms
description: Drafts rental terms for a business hiring out tools, plant, party and event gear, bikes, cameras or other equipment - deposits, condition checks, damage, late returns, insurance and safe use.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
subject: [law, retail, hospitality]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [equipment-hire, rental-terms, damage-deposits, condition-reports, damage-waiver, safe-use]
pairs_with:
  prompts: [write-liability-waiver, write-booking-terms, write-health-and-safety-policy]
args:
  - name: business
    description: What you hire out, to whom (consumers, trade customers or both), hire periods and pricing, delivery or collection, deposits or card pre-authorisations, whether you offer a damage waiver, and problems you have had (late returns, damage disputes, theft, misuse).
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or province where you trade.
    type: string
    required: true
  - name: current_process
    description: How handover and return work now - checks, photos, paperwork, ID taken. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key decisions, Hire terms, Handover and return checklist, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft hire terms for a business that rents out equipment. Most hire disputes are about damage, late returns and missing items, and they are won or lost on evidence: a condition report with dated photos at handover and at return, signed or acknowledged by the customer, and a clear line between fair wear and tear and damage. Good terms define the hire period and what counts as late, set late return charges that reflect real loss rather than penalties, explain deposits or card pre-authorisations and when they are released, state who insures the equipment while on hire (the customer's own insurance, a damage waiver the business sells that reduces but rarely removes liability, or both) and what is excluded from any waiver (negligence, theft from unlocked vehicles, misuse), require loss or theft to be reported promptly with a police reference, and set safe use rules: only competent people, the required licences or training, personal protective equipment, following instructions, no sub-hire, no moving it off the agreed site, and stopping use and reporting at once if it breaks down rather than attempting repairs. The hire business also has duties: supplying equipment that is safe, inspected and maintained, with instructions, which for items such as lifting gear, electrical tools and gas appliances often means statutory inspections and records. With consumers, terms cannot remove statutory rights or exclude liability for death or injury caused by negligence, and charges must be fair and transparent.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Business:
<business>
{{business}}
</business>
{{#current_process}}

Current process:
<process>
{{current_process}}
</process>
{{/current_process}}

1. Key decisions: deposit level or pre-authorisation, damage waiver offer and price structure, late return charging, cleaning and refuelling charges, ID checks, cancellation of bookings, with recommendations and trade-offs.
2. Hire terms: numbered sections in plain language covering definitions, booking and cancellation, hire period, delivery and collection, deposit, customer's responsibilities and safe use, condition and inspection, damage, fair wear and tear, loss and theft, damage waiver and insurance, breakdowns, late return, charges and payment, our responsibilities (safe, maintained equipment and instructions), liability, ending the hire early, and governing law. Separate consumer and trade wording where the rules differ. Use [BRACKETS] for anything not supplied.
3. Handover and return checklist: what staff check, photograph and record, the customer's acknowledgment, and how disputes are handled.
4. Points to confirm, including inspection and certification duties for the equipment types listed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not exclude liability for death or personal injury caused by negligence, or the business's duty to supply safe equipment.
- Do not set charges that are disproportionate to likely loss; explain that such penalties are often unenforceable and damage trust.
- Do not state statutory inspection intervals or deposit rules as fact unless confident; mark "confirm for {{jurisdiction}}".
- If the equipment is high risk (powered access, chainsaws, vehicles, boats), say that operator competence checks and specialist insurance advice are needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key decisions
Table: decision | recommendation | trade-off.

## Hire terms
Numbered sections with headings.

## Handover and return checklist
Checklist for handover, then for return.

## Points to confirm
Numbered list.
</output_format>
