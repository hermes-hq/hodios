---
schema: 1
id: plan-partner-co-selling
kind: prompt
title: Plan co-selling with a partner
description: Plans how to win deals together with an existing channel or technology partner - account mapping, who does what in a deal, lead registration rules, a joint pitch and a monthly rhythm.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, manager, consultant]
requires: [none]
inputs: [notes, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [co-selling, channel-partners, partner-sales, account-mapping, deal-registration, alliances]
pairs_with:
  prompts: [recruit-resellers, plan-joint-partner-launch, write-account-plan]
args:
  - name: partnership
    description: Who the partner is (reseller, consultancy, technology or integration partner, marketplace), what each side sells, the agreement you have (margins, referral fees, territory), and how deals have gone together so far.
    type: text
    required: true
  - name: goal
    description: What you want from co-selling this quarter or year (number of joint deals, pipeline, a segment or region), and your capacity on each side.
    type: text
    required: true
  - name: accounts
    description: Any overlap you know of - shared customers, target accounts, open deals where the partner is present. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Joint value, Account mapping, Roles in a deal, Rules of engagement, Joint pitch, Operating rhythm, Early warning signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a seller or partner manager turn a signed partnership into actual joint deals. Most partnerships produce a logo on a website and little pipeline, because nobody agreed which accounts to work, who leads in a deal, or how both sides get paid without fighting over credit. Partner sales leaders know that co-selling runs on account mapping (comparing customer and pipeline lists, usually only overlap counts at first, to protect data), a clear "why together" story the customer cares about, explicit rules on deal registration and conflicts, and a regular rep-to-rep rhythm. Partner reps sell what is easy and pays them; if your offer is hard to explain or slows their deal, they will not bring you in, whatever the agreement says.
</context>

<task>
<partnership>
{{partnership}}
</partnership>

<goal>
{{goal}}
</goal>

{{#accounts}}<accounts>
{{accounts}}
</accounts>{{/accounts}}

1. **Joint value:** the customer problem the two offers solve better together than apart, in two or three sentences a customer would accept, and the ideal joint customer profile.
2. **Account mapping:** how to compare lists safely (start with overlap counts or a neutral mapping tool, share account details only with both sides' agreement and within data protection rules), which overlaps to prioritise (shared customers for expansion, your customers who need their product, their customers who need yours, open deals both are in), and a first target list size per rep.
3. **Roles in a deal:** a table of who does what at each stage (sourcing, discovery, demo, proposal, pricing and paper, delivery), and who owns the customer relationship.
4. **Rules of engagement:** deal registration (how, when it expires, what counts as first), what happens when both sides already work the account, how credit and fees are recorded, and how conflicts are escalated.
5. **Joint pitch:** a short joint talk track and a co-branded intro email the partner rep can send to a customer, both checked for claims both sides can support.
6. **Operating rhythm:** a monthly pipeline review, enablement for partner reps (a 20-minute session, a one-page guide), and the two or three measures you track (registered deals, joint pipeline, win rate with partner present).
7. **Early warning signs:** signs the partnership is not working (no registrations after 60 days, channel conflict, partner reps not invited to calls) and what to do.
</task>

<constraints>
- Use only the terms the user gives about the agreement; do not invent margins, fees or contract clauses. Mark anything suggested as "to agree".
- Do not recommend sharing customer data beyond what both sides' agreements and data protection rules allow.
- No claims in the joint pitch that either side cannot back up.
- If the partnership has no agreement on fees or territory, say these must be settled before co-selling starts and list what to agree.
</constraints>

<output_format>
## Joint value
Short paragraph and the joint customer profile.

## Account mapping
Numbered steps and the priority order.

## Roles in a deal
Table: Stage | Our side | Partner side | Owner of next step.

## Rules of engagement
Bullets.

## Joint pitch
Talk track, then the intro email.

## Operating rhythm
Table: Cadence | Activity | Who | Measure.

## Early warning signs
Bullets: sign, response.
</output_format>
