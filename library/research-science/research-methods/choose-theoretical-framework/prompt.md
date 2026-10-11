---
schema: 1
id: choose-theoretical-framework
kind: prompt
title: Choose a theoretical framework
description: Picks and justifies a theoretical or conceptual framework for your own study from its question, then shows how the lens shapes questions, measures, analysis and discussion.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [student, researcher]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [theoretical-framework, conceptual-framework, theory, dissertation, constructs]
pairs_with:
  prompts: [compare-theories, refine-research-question, operationalize-variables, write-theoretical-framework-section]
  personas: [research-methodologist, thesis-advisor]
args:
  - name: research
    description: Your research question, field, population and planned methods, plus any theories you have already come across or your supervisor suggested. You do not need to know any theories yet.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the framework must do, Shortlist, Recommendation and justification, How it shapes the study, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A theoretical framework is not a list of theories in the literature review; it is the lens that decides which concepts the study looks at, what the questions and measures are, and how findings are interpreted. Students often choose a famous theory and use it decoratively, or pick one that does not fit the level of analysis (an individual behaviour model for an organisational question), the method (a variance model with fixed constructs for an open inductive study), or the population. Good selection starts from what the framework must do: explain behaviour, guide implementation, describe a process, structure a comparison or sensitise an inductive analysis. Then each candidate is judged on fit, its core constructs, how it has been used in similar studies, and its known critiques. A conceptual framework built by the student, combining constructs from several sources, is legitimate when each link is justified.
</context>

<task>
Recommend a theoretical framework for:
<research>
{{research}}
</research>

1. State what the framework must do for this study (explain, predict, guide, sensitise, structure comparison), the level of analysis (individual, group, organisation, system) and whether the study is deductive or inductive.
2. Shortlist three to five theories or frameworks well established in or near this field that could do that job. For each, one line on what it explains and a fit rating against the criteria from step 1; keep this brief, since the aim is a decision, not a survey of theories. If the user wants a detailed side-by-side comparison of named theories, point them to a theory comparison instead.
3. Recommend one, a justified combination, or a conceptual framework built from named constructs, and argue the choice against the criteria from step 1 and against the runner-up. Draft a short justification paragraph the user can adapt for the framework section of their proposal or thesis, with [cite: ...] placeholders.
4. Show how the chosen lens shapes the study: which constructs become research questions, interview topics or measures; what codes or variables follow; and how findings would be interpreted against it.
5. Say how to avoid decorative use (return to the framework in the discussion, say where findings extend or challenge it).
6. List what the user must verify in the original sources before relying on it.
</task>

<constraints>
- Only name theories you are confident exist and describe their constructs accurately; if unsure of a detail, say so.
- Do not invent citations, publication years or prior studies that used the framework; give the originating author names only as search leads.
- Do not force a deductive theory onto an inductive design; for grounded theory or reflexive approaches, frame theory as a sensitising lens.
- If the user's preferred theory fits poorly, say so plainly.
</constraints>

<output_format>
## What the framework must do
Bullets on purpose, level of analysis and logic.
## Shortlist
A table: framework | what it explains | fit to the criteria (high / medium / low) | main reason.
## Recommendation and justification
The choice, why it beats the runner-up, and a draft justification paragraph with placeholders.
## How it shapes the study
Construct to question, measure or code mapping, and interpretation.
## To verify
Bullets of what to check in the original sources.
</output_format>
