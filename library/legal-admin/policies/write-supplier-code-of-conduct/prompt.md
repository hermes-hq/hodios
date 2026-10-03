---
schema: 1
id: write-supplier-code-of-conduct
kind: prompt
title: Write a supplier code of conduct
description: Writes a supplier code of conduct sized for a small or mid-sized buyer, covering labour and human rights, health and safety, environment, ethics, data, subcontracting, audit rights and remediation.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, founder, executive, legal-professional]
subject: [law]
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
level: intermediate
tags: [supplier-code, responsible-sourcing, modern-slavery, supply-chain-due-diligence, esg]
pairs_with:
  prompts: [compare-vendors, prepare-supplier-negotiation, build-compliance-checklist]
args:
  - name: organisation
    description: The buying organisation - what it does, size, where it operates, its values or commitments already made (for example a net-zero target), customers' requirements passed down to it, and what leverage it has over suppliers.
    type: text
    required: true
  - name: supply_chain
    description: What it buys and from where - main supplier categories and countries, known risk areas (for example garment factories, farm labour, electronics, cleaning contractors), and whether suppliers subcontract. Optional; without it the code stays general and risk sections are flagged.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Supplier code of conduct, Rollout and verification, Points to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write supplier codes of conduct for small and mid-sized buyers. Large-company codes copied wholesale do not work for them: they promise audit programmes the buyer cannot run, demand certifications small suppliers cannot afford, and so become paperwork nobody enforces. A useful code is short, states clear minimum standards drawn from widely recognised international frameworks (such as the ILO core labour standards and the UN Guiding Principles on Business and Human Rights), sets proportionate expectations for verification, and treats remediation as the first response to problems rather than instant termination, which can harm the very workers the code is meant to protect. Laws on supply chain due diligence, modern slavery reporting and forced-labour import bans vary by country and size threshold, so you flag which may apply rather than asserting it.
</context>

<task>
Buying organisation:
<organisation>
{{organisation}}
</organisation>
{{#supply_chain}}

Supply chain:
<supply_chain>
{{supply_chain}}
</supply_chain>
{{/supply_chain}}

1. Approach: three to five sentences on the scope (which suppliers it applies to), the tone (partnership with minimum standards), and how strict verification will be given the buyer's size and leverage. If the organisation input is missing size, sector or supplier countries, ask for them and draft a general version meanwhile.
2. Draft the code in plain language, each section with short "must" statements:
   - Purpose and scope, including the expectation that suppliers pass the standards down to their own subcontractors.
   - Compliance with law, and the principle that where the code is stricter than local law the code applies, and where local law is stricter the law applies.
   - Labour and human rights: no forced, bonded or prison labour; no recruitment fees charged to workers; no retention of identity documents; no child labour, with protections for young workers; freedom of association; non-discrimination and no harassment; working hours and wages that at least meet legal requirements; written terms in a language workers understand.
   - Health and safety: safe workplaces, training, emergency preparedness, accommodation standards where provided.
   - Environment: permits, waste and pollution, and data on energy or emissions only if the buyer needs it.
   - Business ethics: anti-bribery, gifts and hospitality, conflicts of interest, fair competition, accurate records.
   - Data protection and confidentiality.
   - Grievance mechanisms for workers, and a channel to report breaches to the buyer, with protection from retaliation.
   - Verification: self-assessment questionnaires, documentation requests, and audits proportionate to risk, with reasonable notice except where serious concerns arise.
   - Breaches and remediation: a corrective action plan with timelines, support, and termination as a last resort or for zero-tolerance breaches named in the code.
   - Acknowledgement block.
3. Rollout and verification: a practical plan for this buyer (risk-rank suppliers by country and category, start with the top tier, how to collect acknowledgements, a one-page self-assessment, what to do with red flags).
4. Points to confirm: laws that may require due diligence or reporting for this buyer, and contract changes needed to make the code enforceable.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Keep the code proportionate to the buyer. Do not promise audit programmes, certifications or reporting the input does not support; offer them as optional upgrades.
- Use recognised standards by name only in general terms; do not quote conventions or cite statute sections unless the user supplied them.
- Do not state that a law applies to the buyer as fact; flag it with the size or sector trigger to check.
- Do not write requirements designed to shift all cost or liability onto small suppliers without support; note where the buyer's own purchasing practices (prices, lead times) affect compliance.
- Use [BRACKETS] for company names and contacts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Short paragraph.

## Supplier code of conduct
The full code with numbered sections.

## Rollout and verification
Numbered plan.

## Points to confirm
Numbered.
</output_format>
