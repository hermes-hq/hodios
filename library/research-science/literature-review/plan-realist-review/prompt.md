---
schema: 1
id: plan-realist-review
kind: prompt
title: Plan a realist review
description: Plans a realist review of a complex intervention, from initial programme theory to purposive searching, relevance and rigour appraisal, and context-mechanism-outcome configurations.
category: literature-review
version: 1.0.0
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
level: expert
tags: [realist-synthesis, programme-theory, complex-interventions, context-mechanism-outcome, rameses, evidence-synthesis]
pairs_with:
  prompts: [build-search-string, chase-citations, plan-process-evaluation, write-systematic-review-protocol]
  personas: [research-methodologist]
args:
  - name: intervention
    description: The programme or intervention and the question, for example "how social prescribing link workers work, for whom and in what circumstances".
    type: text
    required: true
  - name: context
    description: Optional. Who commissioned it, stakeholders you can involve, the team, deadline and any programme documents or theories you already have.
    type: text
output_contract:
  format: markdown
  sections: [Is a realist review right, Review questions, Initial programme theory, Searching, Selection and appraisal, Extraction and analysis, Stakeholders and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A realist review asks how and why a complex intervention works, for whom and in what circumstances, rather than whether it works on average. It is theory-driven: it starts with an initial programme theory (how the designers think the programme produces change), then tests and refines it against evidence. Its unit of analysis is the context-mechanism-outcome configuration (CMOC), where a mechanism is the response a resource triggers in people's reasoning, not an activity or a component. Novices go wrong by calling programme components "mechanisms", by running a conventional systematic search and quality filter (realist reviews search iteratively and purposively, and judge each source on relevance to the theory and the rigour of the specific piece of data used), and by producing a thematic summary with no explanatory theory at the end. Reporting follows the RAMESES publication standards for realist syntheses.
</context>

<task>
Plan a realist review of:
<intervention>
{{intervention}}
</intervention>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Check fit: is the question about how and why outcomes vary? If the user only needs an average effect, recommend a systematic review with meta-analysis instead and explain briefly.
2. Write realist review questions ("what works, for whom, in what circumstances, how and why") and note what is out of scope.
3. Plan how to build the initial programme theory: sources (programme documents, policy, stakeholder interviews, existing substantive theories), how to draft if-then statements, and show one illustrative CMOC clearly labelled as a hypothetical example to be tested.
4. Plan searching in stages: a background search for theories, a main search for evidence to test the theory, and further targeted searches as the theory develops, including grey literature and citation chasing. Say when searching stops (theoretical saturation for each part of the theory, not exhaustiveness).
5. Plan selection and appraisal: relevance (does this source contribute to testing part of the theory) and rigour (is the specific data used credible and trustworthy), judged per fragment of evidence, recorded with a reason.
6. Plan extraction and analysis: coding text to CMOC elements in qualitative software or a spreadsheet, the retroductive reasoning (juxtaposing, reconciling, adjudicating, consolidating sources), how middle-range theory is used, and how the refined programme theory is presented with the evidence behind each CMOC.
7. Plan stakeholder involvement at theory building and refinement, team training in realist methods, the protocol registration, and RAMESES reporting.
</task>

<constraints>
- Distinguish mechanisms (reasoning and responses to resources) from intervention components and from contexts; correct the user if their notes conflate them.
- Do not invent programme theories or findings as if established; any example CMOC is labelled hypothetical.
- Do not recommend excluding sources by study design alone.
- Be honest that realist reviews take substantial time and skill, and suggest a realist-trained adviser when the team lacks experience.
</constraints>

<output_format>
## Is a realist review right
Recommendation with reasoning.
## Review questions
Numbered questions and scope.
## Initial programme theory
Sources, method, and one labelled hypothetical CMOC.
## Searching
A table: search stage | purpose | sources | stopping point.
## Selection and appraisal
Relevance and rigour criteria and how they are recorded.
## Extraction and analysis
Coding approach and retroductive analysis steps.
## Stakeholders and reporting
Involvement plan, registration and RAMESES.
</output_format>
