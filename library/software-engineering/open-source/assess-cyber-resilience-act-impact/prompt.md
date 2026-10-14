---
schema: 1
id: assess-cyber-resilience-act-impact
kind: prompt
title: Assess what the EU Cyber Resilience Act means for an open-source project
description: Works out how the EU Cyber Resilience Act likely applies to an open-source project or a company using one, by role (manufacturer, steward, non-commercial), with duties, dates and lawyer questions.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, engineering-manager, legal-professional, founder]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [cyber-resilience-act, eu-regulation, open-source-steward, vulnerability-reporting, sbom, regulatory-compliance]
pairs_with:
  prompts: [write-security-policy, write-open-source-usage-policy, coordinate-security-release]
args:
  - name: situation
    description: Who you are (individual maintainer, company that develops a project, foundation, company that ships products using open source), how the software is funded or monetised, whether it is placed on the EU market as or in a product, and what security processes exist today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Likely role, Why, Obligations that may apply, Timeline, Gaps today, Next steps, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The EU Cyber Resilience Act (Regulation (EU) 2024/2847) sets security requirements for products with digital elements made available on the EU market. Its effect on open source depends on role, not on licence. Free and open-source software developed or supplied outside a commercial activity is generally outside its scope, which protects most volunteer maintainers. Manufacturers, meaning those who place a product on the market as part of a commercial activity, carry the full obligations: secure design, vulnerability handling, a support period, technical documentation including an SBOM, conformity assessment, and reporting actively exploited vulnerabilities and severe incidents within short deadlines. Manufacturers that integrate open-source components must exercise due diligence on them and report vulnerabilities they find to the component's maintainers. The Act also defines open-source software stewards: legal persons, such as foundations or companies, that systematically support open-source projects intended for commercial activities; they have lighter duties, such as a cybersecurity policy and cooperation with authorities. The Act entered into force on 10 December 2024. Manufacturers' duty to report actively exploited vulnerabilities and severe incidents to their CSIRT and ENISA (an early warning within 24 hours, a notification within 72 hours, then a final report) applies from 11 September 2026, so it is already in force; most other obligations apply from 11 December 2027. Stewards must also report those vulnerabilities and incidents to the extent they are involved in development, and are not subject to the Act's administrative fines. Where the line falls for commercial activity (donations, paid support, a company employing maintainers) is the area most people need a lawyer and official guidance for.

{{> guardrails/professional-limits}}

Situation:
<situation>
{{situation}}
</situation>
</context>

<task>
1. Likely role: out of scope (non-commercial), open-source steward, manufacturer, or a company integrating open source into its own products. Give the most likely reading and the alternatives.
2. Why: the facts in the situation that point to that role, and which facts would change it (monetisation, who places the product on the market, the legal entity involved).
3. Obligations that may apply for that role, in plain language, grouped as policies and processes, vulnerability handling and reporting, documentation and SBOM, support period, and due diligence on components.
4. Timeline: the application dates above, which obligations already apply on the date of the request and which come later, telling the user to confirm them against the official text and current guidance.
5. Gaps today: compare against the processes described (security policy, private reporting route, advisories, SBOM generation, release support statements).
6. Next steps: practical actions that are useful whatever the final legal reading (a security policy, private vulnerability reporting, SBOMs in releases, a stated support period), plus anything specific to the role.
7. Questions for a lawyer: the specific questions whose answers decide the role and obligations.
</task>

<constraints>
- Do not give a definitive legal classification; present the likely reading, the uncertainty and what decides it.
- Do not invent article numbers, deadlines in hours or days, fines or guidance documents beyond what you are sure of; where unsure, describe the obligation and say to check the official text.
- Say that implementing guidance and standards are still being published and may change the practical requirements.
- Do not suggest restructuring a project or blocking EU users to avoid the law without stating that this needs legal advice and has costs for users.
</constraints>

<output_format>
Use the contract's section headings in order. Obligations as a table: Area | What it means | Applies to you? | Status today. Next steps as a checklist. Questions for a lawyer as a numbered list.
</output_format>
