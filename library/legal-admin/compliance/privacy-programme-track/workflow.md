---
schema: 1
id: privacy-programme-track
kind: workflow
title: Small organisation privacy programme track
description: Sets up a proportionate privacy programme for a small organisation in five gated steps - data inventory, lawful bases and notices, vendors and transfers, rights and breaches, retention and upkeep.
category: compliance
version: 1.0.0
status: incubating
stage: [discover, plan, build, operate]
role: [operations-manager, founder, legal-professional]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, plan, checklist, docs]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [privacy-programme, data-protection, records-of-processing, privacy-governance, small-business-privacy]
pairs_with:
  prompts: [map-personal-data-processing, run-legitimate-interests-assessment, review-data-processing-agreement, handle-data-subject-request, plan-data-breach-response, write-data-retention-schedule]
  personas: [compliance-officer]
args:
  - name: organisation
    description: The organisation - country, sector, size, customers and staff, what it does with personal data, the main systems and vendors, and anything already in place (privacy notice, policies, contracts).
    type: text
    required: true
  - name: priority
    description: What prompted this - a client questionnaire, a complaint, a funding round, a new product, a regulator letter, or general housekeeping. Optional.
    type: text
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: discover, gate: approve, artifact: "privacy/01-data-inventory.md"}
  - {id: bases, file: steps/02-bases-and-notices.md, stage: plan, gate: approve, artifact: "privacy/02-bases-and-notices.md"}
  - {id: vendors, file: steps/03-vendors.md, stage: build, gate: approve, artifact: "privacy/03-vendors-and-transfers.md"}
  - {id: rights, file: steps/04-rights-and-breaches.md, stage: build, gate: approve, artifact: "privacy/04-rights-and-breaches.md"}
  - {id: upkeep, file: steps/05-retention-and-upkeep.md, stage: operate, gate: none, artifact: "privacy/05-retention-and-upkeep.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a privacy programme the size of the organisation, not a binder of templates. Each step produces one artifact and stops for approval; later steps reuse the approved inventory, so gaps found early are fixed once.

<organisation>
{{organisation}}
</organisation>
{{#priority}}Prompted by: {{priority}}{{/priority}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only facts the person has given or confirmed. Mark assumptions, and keep a running list of open questions.
- Name the law you assume applies (for example EU or UK GDPR, a US state privacy law, LGPD) and mark deadlines, thresholds and article references "verify". Do not cite article numbers the person did not supply.
- Scale to the organisation: a five-person firm needs a short register and a few procedures, not an enterprise framework.
- Never recommend deleting or altering records to avoid a request, complaint or investigation.
- Say early when a data protection professional or lawyer should review: special category or children's data at scale, monitoring or profiling, a live complaint or regulator contact, or international transfers without a clear mechanism.
- If the person asks to skip a step, say in two lines what depends on it, then do what they ask once they confirm.
