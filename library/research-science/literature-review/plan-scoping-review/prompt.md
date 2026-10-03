---
schema: 1
id: plan-scoping-review
kind: prompt
title: Plan a scoping review
description: Plans a scoping review from a topic, first testing whether scoping is the right review type, then the PCC question, iterative search, selection, charting form and PRISMA-ScR reporting.
category: literature-review
version: 1.0.1
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scoping-review, prisma-scr, pcc-framework, evidence-mapping, data-charting, jbi]
pairs_with:
  prompts: [write-systematic-review-protocol, build-search-string, screen-studies, find-research-gaps, write-prisma-flow-report]
  personas: [research-librarian, research-methodologist]
args:
  - name: topic
    description: The area you want to map, and what you already know about how much has been published on it.
    type: text
    required: true
  - name: purpose
    description: Why you are doing the review, for example "to see whether a systematic review is feasible", "to map how a concept is defined", "to inform a funding priority", or "a master's dissertation".
    type: text
output_contract:
  format: markdown
  sections: [Is a scoping review right, Question and PCC, Plan, Charting form, Reporting and registration, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Says when to continue with a scoping plan after recommending a different review type, and when to stop."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Scoping reviews map the extent, range and nature of evidence on a topic, clarify concepts, or identify gaps; they do not answer a question about effectiveness. The usual framework is Arksey and O'Malley as refined by Levac and colleagues and JBI: identify the question, identify relevant studies, select studies, chart the data, collate and report, with optional stakeholder consultation. They are reported with PRISMA-ScR and the protocol is usually registered on OSF or published. The common mistakes are using a scoping review because a systematic review sounds like too much work, writing a question too vague to set eligibility criteria, appraising quality and then drawing effectiveness conclusions, and charting forms that collect everything and summarise nothing.
</context>

<task>
Plan a scoping review on this topic.
<topic>
{{topic}}
</topic>
{{#purpose}}
<purpose>
{{purpose}}
</purpose>
{{/purpose}}

1. Decide whether a scoping review fits. Compare it with a systematic review, rapid review, evidence gap map and narrative review for this purpose, and recommend one. If another type fits better, say so plainly and give the reason. Continue with the scoping plan only if mapping still serves the purpose (for example to check whether enough studies exist before a systematic review), and say what it can and cannot conclude; otherwise stop after the recommendation and list what the better-fitting review needs next.
2. Write the review question and two or three sub-questions, and the PCC elements (Population, Concept, Context) with definitions precise enough to apply consistently.
3. Write eligibility criteria per PCC element plus evidence sources (primary studies, reviews, grey literature, policy documents), languages and dates, each with a reason.
4. Plan the search: databases suited to the field, grey literature and registries, the three-step JBI approach (initial limited search to harvest terms, full search, reference lists), a draft concept-block structure with [TERM TO CONFIRM] placeholders, and the role of an information specialist.
5. Plan selection: pilot on 25 to 50 records until agreement is acceptable, two reviewers, how criteria may be refined iteratively and how that is documented.
6. Design the charting form: fields that each map to a sub-question, with a definition and allowed values, plus a pilot on a few sources and a rule for when the form may change.
7. Plan collation: descriptive counts, tables and charts by key characteristics, and a basic qualitative content analysis where it serves the sub-questions; state whether critical appraisal will be done and why (it is optional and never turns findings into effectiveness claims).
8. Optional consultation with stakeholders: who, when and what for.
9. Give a realistic timeline for the team size implied.
</task>

<constraints>
- Do not invent existing reviews, study counts or thesaurus terms; tell the user to search for existing and ongoing scoping reviews (for example in OSF, JBI Evidence Synthesis and databases) before going further.
- Every criterion must be one two reviewers would apply the same way; replace vague words like "relevant" with definitions.
- Keep conclusions within scope: the plan must not promise to establish what works.
- Name PRISMA-ScR and the registration route; say that PROSPERO does not register scoping reviews.
</constraints>

<output_format>
## Is a scoping review right
The comparison in a short table (review type | answers | fits this purpose?) and the recommendation.
## Question and PCC
The question, sub-questions, and a table: element | definition | include | exclude.
## Plan
Numbered sections for search, selection, collation, consultation and timeline, with the draft search structure in a code block.
## Charting form
A table: field | definition | allowed values or format | sub-question served.
## Reporting and registration
PRISMA-ScR items to plan for now, and the registration route.
## Open decisions
Choices left to the team, with the options.
</output_format>
