---
schema: 1
id: plan-branch-by-branch-rollout
kind: prompt
title: Plan a branch-by-branch rollout
description: Plans rolling out a product, process or service change across stores, branches, clinics or depots in waves, with pilot criteria, readiness checks, halt rules, learning loops and rollback.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, operations-manager, project-manager, manager]
subject: [retail, hospitality, healthcare]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [phased-rollout, pilot-sites, rollout-waves, halt-criteria, rollback, multi-site]
pairs_with:
  prompts: [brief-frontline-staff-on-release, plan-internal-tool-rollout, plan-release]
  workflows: [service-go-live-track]
args:
  - name: change_and_sites
    description: What is changing (a new till system, a menu, a booking process, a service), how many sites, how they differ (size, region, format, staffing, performance), and any sites with special conditions.
    type: text
    required: true
  - name: constraints
    description: Optional. Deadlines, blackout periods (peak trading, holidays, audits), support team size, budget, equipment lead times and who must approve.
    type: text
output_contract:
  format: markdown
  sections: [Rollout summary, Pilot sites, Wave plan, Site readiness checklist, Halt and rollback rules, Learning between waves, Governance, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan multi-site rollouts for retail, hospitality, banking, healthcare and public services. Rolling out in waves lets the organisation learn before it scales, but only if the pilot is honest and the learning is used. Common failures: piloting in the best-run site so the pilot proves nothing; moving to the next wave on a date rather than on evidence; sites quietly adapting the change into local versions; and no plan for undoing the change at a site where it fails. A good plan has representative pilots, waves that grow in size and difficulty, a readiness check before each site goes live, clear halt rules, and one controlled version of the change.
</context>

<task>
Change and sites:

<change_and_sites>
{{change_and_sites}}
</change_and_sites>

{{#constraints}}
Constraints:

<constraints>
{{constraints}}
</constraints>
{{/constraints}}

1. Pilot sites: choose two or three that together represent the network (one typical, one hard: busy, small, remote or with weaker results), each with a strong local lead. Say why each, and the pilot length (usually two to six weeks, long enough to cover a full trading or service cycle).
2. Pilot success criteria set in advance: operational (transaction times, error rates, queue or wait times), customer (complaints, satisfaction), staff (confidence, overtime), and financial if relevant, each with baseline and threshold.
3. Wave plan: group the remaining sites into waves that grow in size (for example 10%, 30%, the rest), clustered so the support team can reach them, avoiding blackout periods. Each wave starts only when the previous one meets its exit criteria, not on a date alone.
4. Site readiness checklist, completed and signed off before each site goes live: people trained, equipment installed and tested, stock or materials, systems and data, signage and customer communication, local lead named, support contacts.
5. Halt and rollback rules: what pauses a site, what pauses the whole rollout (safety, data, money or customer harm thresholds), who decides, and how a site returns to the old way.
6. Learning between waves: a single learning log, a short review after each wave, changes approved centrally and issued as a new version to all sites. Sites do not modify the change locally; they raise ideas through the log.
7. Governance: owner, decision-makers for go and halt, reporting rhythm.
</task>

<constraints>
- Use only the user's sites and data; do not invent site names or performance figures. Where site detail is missing, describe the criteria and mark selections [X].
- Every wave has entry and exit criteria; never schedule waves on dates alone.
- Keep any safety, clinical, financial or data-protection checks as hard halt rules, and say to confirm them with the relevant specialists.
- If the change or the number and kind of sites are unclear, ask for them and stop.
</constraints>

<output_format>
## Rollout summary
Five bullets: what, how many sites, waves, expected duration, main risk.

## Pilot sites
Table: site or criteria | why | local lead placeholder | length.

## Wave plan
Table: wave | sites | start condition | exit criteria | support needed.

## Site readiness checklist
Checklist with sign-off line.

## Halt and rollback rules
Table: trigger | scope (site or all) | who decides | action.

## Learning between waves
Bullets, including the version control rule.

## Governance
Bullets.

## Risks and questions
Bullets.
</output_format>
