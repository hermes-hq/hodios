---
schema: 1
id: review-mixed-methods-manuscript
kind: prompt
title: Referee a mixed-methods manuscript
description: Referees a mixed-methods manuscript on the rationale for mixing, the design type, the quality of each strand, how the strands are integrated, and whether the meta-inferences follow.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
subject: [social-sciences]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mixed-methods, integration, joint-displays, meta-inferences, manuscript]
pairs_with:
  prompts: [review-qualitative-manuscript, review-statistical-methods, write-peer-review]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: The manuscript, including the design description, both strands' methods and results, any joint display and the discussion.
    type: text
    required: true
  - name: field
    description: Optional. The field and journal, for example "health services research" or "education".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Rationale and design, Quantitative strand, Qualitative strand, Integration, Meta-inferences, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many papers labelled mixed methods are really two studies stapled together: a survey and some interviews reported in separate sections, with a discussion that mentions both. What makes a study mixed methods is integration, and referees in the field look for it at three levels: design (convergent, explanatory sequential, exploratory sequential, or a more complex design such as an intervention or case study framework, with a stated reason for mixing), methods (connecting strands through sampling, building one instrument from the other's findings, or merging data), and interpretation (joint displays, and meta-inferences that say what the combination shows that neither strand could). Each strand must still meet the quality standards of its own tradition, which reviewers from one tradition often misjudge. Divergent findings between strands are not a failure; they should be explained, not hidden. Good Reporting of A Mixed Methods Study (GRAMMS) and the Mixed Methods Appraisal Tool give checklists.
</context>

<task>
Referee this mixed-methods manuscript{{#field}} in {{field}}{{/field}}.
<manuscript>
{{manuscript}}
</manuscript>

1. Summarise the question, the two strands and the main integrated claim.
2. Assess the rationale for mixing and whether the design type is named, justified and actually followed (sequence, priority, points of interface).
3. Assess the quantitative strand on its own terms: sampling, measures, analysis and whether claims fit the sample.
4. Assess the qualitative strand on its own terms: sampling logic, data collection, analysis approach, reflexivity and whether quotes support themes.
5. Assess integration: where and how the strands connect, whether a joint display or other integration technique is used, and how convergence, complementarity or divergence is handled.
6. Assess the meta-inferences: whether they draw on both strands, whether they go beyond what either strand shows, and whether they are warranted.
7. Recommend a decision and say which reviewer expertise may be needed for one strand if you can judge only the other.
</task>

<constraints>
- Judge each strand by its own tradition's standards: do not ask a qualitative strand for statistical generalisability or a survey for thick description.
- Tie each issue to a location and propose a fix (for example a joint display, a clearer description of the sampling link, or reframing the claim).
- Do not ask for a different design unless the stated question cannot be answered by this one.
- Do not invent data or quotes.
- Start with one line reminding the reviewer about confidentiality and the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
## Rationale and design
## Quantitative strand
## Qualitative strand
## Integration
## Meta-inferences
Each section: numbered issues with location, problem and what would resolve it.
## Recommendation
Decision, deciding reasons, and any strand needing another specialist reviewer.
</output_format>
