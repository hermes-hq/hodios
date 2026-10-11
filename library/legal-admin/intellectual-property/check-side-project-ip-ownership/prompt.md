---
schema: 1
id: check-side-project-ip-ownership
kind: prompt
title: Check who owns your side project
description: Checks whether an employer, client or university may claim a side project you built while employed or studying, from your contract and facts, and drafts a carve-out or disclosure request.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review, plan]
role: [software-engineer, designer, researcher, individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report, message, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [side-project, employer-ip-clause, invention-assignment, carve-out, moonlighting]
pairs_with:
  prompts: [review-employment-contract, audit-small-business-ip, choose-software-license]
args:
  - name: contract_clauses
    description: The IP, inventions, confidentiality, outside work and conflict-of-interest clauses from your employment contract, handbook, consulting agreement or university IP policy, pasted in full.
    type: text
    required: true
  - name: project_facts
    description: What the project is, how it relates to your job or the employer's business, when and where you worked on it (hours, devices, accounts, office), whether you used employer code, data, tools or know-how, and what you plan (sell, open-source, launch a company).
    type: text
    required: true
  - name: country
    description: Where you work (country and state or province). Some places limit how far employer IP clauses can reach.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Clause reading, Risk factors, Preliminary view, Steps to reduce risk, Message to your employer, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who built or is building a project on the side check whether their employer (or a client or university) could claim it. The answer usually turns on a few facts: how broad the IP clause is (only work in the course of employment, anything related to the employer's business, or everything created during employment); whether the project relates to the employer's actual or anticipated business; whether employer time, equipment, accounts, code, data or confidential information were used; and local law, since some places limit employer claims over inventions made on the employee's own time without employer resources, or require notice of such limits, and others enforce broad clauses. The risk shows up later, at a launch, sale or investment, when due diligence asks for a clean chain of ownership. The cleanest fix is often a written carve-out or release from the employer before launching.
</context>

<task>
<clauses>
{{contract_clauses}}
</clauses>

<project>
{{project_facts}}
</project>

Country: {{country}}

1. Clause reading: what each pasted clause appears to cover in plain words (scope of work captured, time period, prior-invention schedules, disclosure duties, post-employment reach), quoting the key words.
2. Risk factors: the project facts mapped against the clauses (relation to the employer's business, use of employer time, devices, accounts, code, data, confidential information), each rated as raising or lowering risk.
3. Preliminary view: low, medium or high risk of a claim, with the main driver, and whether local law may limit the clause (to check, not stated as fact).
4. Steps to reduce risk: stop using employer resources, separate accounts and devices, document dates and what was built where, avoid confidential information, check disclosure duties, and ask for a written carve-out or release where appropriate.
5. Message to your employer: a short, factual request describing the project at a level that does not oversell or hide relevant facts, asking for written confirmation that the employer claims no rights. Note when it may be wiser to get legal advice before sending (for example if the project competes with the employer).
6. Questions for an employment or IP lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not conclude who owns the project; give a preliminary view and what decides it.
- Do not state specific statutes or their effect for a place unless certain; say limits may exist and where to confirm.
- Do not help conceal relevant facts from the employer, delete evidence, or take employer code, data or confidential information.
{{> output/uncertainty}}
</constraints>

<output_format>
## Clause reading
Table: clause | what it seems to cover | key words.

## Risk factors
Table: factor | your facts | effect on risk.

## Preliminary view
Short paragraph.

## Steps to reduce risk
Checklist.

## Message to your employer
Ready to adapt, plus when to hold off.

## Questions for a lawyer
Numbered.
</output_format>
