---
schema: 1
id: plan-participatory-research
kind: prompt
title: Plan a community-based participatory research partnership
description: Plans a community-based participatory research partnership with shared decisions, roles, fair pay for community partners, ethics, data governance and returning findings to the community first.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher]
requires: [none]
inputs: [text, topic]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cbpr, participatory-research, community-partnership, data-governance, co-production]
pairs_with:
  prompts: [design-citizen-science-project, write-ethics-application, write-informed-consent-form, write-focus-group-guide]
  personas: [research-methodologist]
args:
  - name: community
    description: The community and your relationship with it so far - who they are, existing organisations or leaders you know, past research with them, and whether the community raised this issue.
    type: text
    required: true
  - name: question
    description: The research question or issue as it stands now, for example "barriers to mental health services for young refugees". It may change with partners.
    type: string
    required: true
  - name: resources
    description: Funding, timeline, staff, and any funder requirements for community involvement.
    type: text
output_contract:
  format: markdown
  sections: [Readiness check, Partnership structure, Roles, Compensation, Co-designing the question and methods, Ethics and data governance, Capacity building, Timeline, Returning findings, Ending well, Questions to take to partners]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Community-based participatory research shares power across the whole project: community partners help set the question, choose methods, interpret results and decide how findings are used. It fails when it is participatory in name only: researchers arrive with a funded question, ask for "input" once, pay community members in gift vouchers for skilled work, publish before the community has seen the results, and leave when the grant ends. Communities that have been studied many times without benefit are rightly wary. Good partnerships start from relationships and the community's priorities, write down how decisions are made and who owns the data, pay people fairly and on time, and plan from the start how findings return to the community and what happens after the project.
</context>

<task>
Plan a participatory research partnership on: {{question}}

<community>
{{community}}
</community>
{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. Readiness check: is there evidence the community wants this research, what relationships exist, what history of research the community may have, and what the researcher should do before proposing anything (listen, attend community events, meet existing organisations). Say plainly if the plan should begin with relationship-building rather than research.
2. Partnership structure: a steering or advisory group with community majority or parity, how members are chosen, how decisions are made (consensus, voting, which decisions belong to whom), how disagreements are resolved, and the items for a written partnership agreement (purpose, decision-making, data ownership and access, publication and authorship, credit, conflict resolution, exit).
3. Roles: a table of who does what - community partners, community researchers or peer researchers, academic team, partner organisations - including who can speak publicly about the project.
4. Compensation: pay community researchers as staff or at a fair hourly rate for skilled work, pay advisory members for meetings and preparation, cover costs (travel, childcare, food, data), pay promptly and in a form that suits people (and flag checking whether payments affect benefits or immigration status, as a question for the institution's finance and legal teams).
5. Co-designing the question and methods: how partners refine the question, choose methods that fit the community (including language and literacy), and help design instruments and recruitment.
6. Ethics and data governance: institutional ethics review plus any community review process, consent that is genuinely voluntary in close-knit communities, confidentiality where people know each other, risks of stigma for the community as a whole, data ownership and control (including Indigenous data sovereignty principles where they apply), storage, and who approves secondary use.
7. Capacity building: what community partners gain (training, credentials, paid roles) and what the academic team must learn from them.
8. Timeline: phases from relationship-building to after the project, with decision points that partners approve.
9. Returning findings: community-first sharing before publication, partners reviewing interpretations, accessible formats (events, short reports in the community's languages, visual summaries), and how findings feed into action.
10. Ending well: what happens to data, relationships and any services or tools after funding ends.
11. Questions to take to partners: open questions to decide together, not to answer for them.
12. Before you answer, check that no decision in the plan has been made for the community that the partnership should make together; mark any such item as a proposal.
</task>

<constraints>
- Do not invent facts about the community, its leaders or its history; mark assumptions.
- Write proposals as options for partners to decide, not as settled terms.
- Do not state legal rules on payments, benefits or data protection as fact; list them for the institution to confirm.
- If the community has not raised the issue and no relationship exists, say that the first phase is building one, and keep later phases provisional.
</constraints>

<output_format>
Markdown with the sections in the output contract. Roles and the timeline as tables, the partnership agreement items as a checklist, and the rest as short bullets.
</output_format>
