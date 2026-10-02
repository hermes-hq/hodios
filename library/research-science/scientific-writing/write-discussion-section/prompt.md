---
schema: 1
id: write-discussion-section
kind: prompt
title: Write a discussion section
description: Writes a paper or thesis discussion covering principal findings, comparison with prior work, mechanisms, limitations, implications and future work, matching claims to the evidence. For authors.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [manuscript, hedging, limitations, overclaiming, thesis]
pairs_with:
  prompts: [write-methods-section, write-abstract, respond-to-reviewers]
  personas: [research-methodologist, thesis-advisor]
args:
  - name: results
    description: Your results with the numbers (effect sizes, confidence intervals, key themes for qualitative work), plus a short note on design, sample and the research question.
    type: text
    required: true
  - name: prior_literature
    description: The studies you want to compare against, with citation details and their key findings. Without it, comparisons are left as placeholders.
    type: text
  - name: word_limit
    description: Target length for the discussion.
    type: number
    default: 1200
output_contract:
  format: markdown
  sections: [Discussion, Claims check, Citations to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A discussion interprets the results; it does not repeat them. Reviewers look for a clear statement of what was found, an honest comparison with what others found and why results might differ, plausible explanations offered as explanations rather than facts, limitations that say how they could have changed the result, and implications that do not outrun the design. The most common problems are overclaiming (causal language from observational data, generalising beyond the sample, treating non-significant results as proof of no effect), listing limitations without saying their likely impact, and a "future research is needed" ending with no specifics.
</context>

<task>
Write a discussion of about {{word_limit}} words from these results.
<results>
{{results}}
</results>
{{#prior_literature}}
<prior_literature>
{{prior_literature}}
</prior_literature>
{{/prior_literature}}

1. **Principal findings:** open with the answer to the research question in two or three sentences, using the key numbers, without restating all results.
2. **Comparison with prior work:** for each main finding, say whether it agrees or disagrees with the prior studies supplied and give plausible reasons for differences (population, design, measures, timing, power). Cite only the supplied studies. If none were supplied, write [CITE: studies on …] placeholders describing what kind of evidence is needed.
3. **Possible explanations:** offer mechanisms or interpretations, labelled as possible ("one explanation is…"), with what evidence would test them.
4. **Strengths and limitations:** the real strengths of the design, then each limitation with its likely direction and size of effect on the results (for example "non-response was higher among smokers, which would probably bias the association towards the null").
5. **Implications:** for research, practice or policy as the design supports. Match the strength of the recommendation to the strength of the evidence.
6. **Future work:** two or three specific studies that would resolve the main uncertainty.
7. **Conclusion:** two or three sentences that a reader could quote without misrepresenting the study.
Then check your own draft: list each claim that goes beyond the data and how you softened it.
</task>

<constraints>
- Use only the numbers in the results. Never invent statistics or findings.
- Match language to design: "associated with" for observational data unless a causal design justifies more; "we found no evidence of a difference" rather than "there is no difference" for non-significant results, with the confidence interval where available.
- Do not introduce new results that are not in the results section.
- Never cite a study that was not supplied, and never attribute findings to a supplied study beyond what the user wrote about it.
- Hedge where evidence is uncertain, but do not hedge every sentence into meaninglessness.
- If the results text lacks the research question or design, ask for them or state your assumption at the top.
</constraints>

<output_format>
## Discussion
The section, with optional subheadings (Principal findings, Comparison with other studies, Strengths and limitations, Implications, Conclusion) as the target journal or thesis expects.
## Claims check
Table: claim in the draft | evidence for it | adjustment made.
## Citations to add
Each [CITE: …] placeholder and what kind of source would fill it.
</output_format>
