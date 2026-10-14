---
schema: 1
id: check-finding-replication-status
kind: prompt
title: Check whether a famous finding has replicated
description: Checks whether a well-known research finding has held up, using direct replications, multi-lab projects and meta-analyses corrected for bias, and says how to describe it today.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, researcher, teacher, student]
requires: [web]
inputs: [text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [replication-crisis, meta-analysis, effect-sizes, pop-psychology]
pairs_with:
  prompts: [explain-state-of-evidence, check-science-news-against-paper, assess-preprint-reliability]
  personas: [fact-checker]
args:
  - name: finding
    description: The finding as people usually state it, for example "power posing raises testosterone" or "willpower is a limited resource that gets depleted".
    type: text
    required: true
  - name: use
    description: Optional. Where you want to mention it, for example a lecture, a book chapter or a training course.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, The original finding, Replication record, Why it may not have held up, How to describe it now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many famous findings, especially in social psychology, nutrition and some areas of biomedicine, failed when tested again with larger samples and pre-registered methods. The strongest evidence comes from direct, pre-registered replications with large samples and from multi-lab projects (such as the Many Labs projects and Registered Replication Reports), because they remove the flexibility that inflates original effects. Meta-analyses of the original literature can mislead if they pool small, selectively published studies; look for ones that test for publication bias and report a corrected estimate. A finding can be partly true: the effect may exist but be far smaller than first claimed, hold only under narrow conditions, or survive for one outcome (feeling more powerful) but not another (hormone changes). Popular retellings often describe the original, larger claim long after researchers revised it.
</context>

<task>
Check the replication record of this finding.
<finding>
{{finding}}
</finding>
{{#use}}Planned use: {{use}}{{/use}}

1. Identify the original study or studies: authors, year, design, sample size and the exact effect reported. Separate the original claim from the popular version.
2. Search for direct and conceptual replications, multi-lab or registered replication projects, and meta-analyses, noting for each the sample size, pre-registration, result and effect size.
3. Weigh them: large pre-registered direct replications count most; small conceptual replications count least; meta-analyses count for more when they correct for publication bias.
4. Note any later debate: original authors' responses, moderators proposed, and whether the field's view has settled.
5. Give a verdict and wording that matches the current evidence for the planned use.
</task>

<constraints>
- Cite only studies and projects you opened or found records of in this session, with links. Never invent a replication, sample size or effect size.
- If you have no web access, say so at the top, give only a provisional view marked as such for well-known cases, name no specific figures, and list what to search.
- Distinguish "failed to replicate" from "disproved": a null replication with a wide interval may still be compatible with a small effect. Say which applies.
- Do not judge the original researchers' honesty. Describe methods, not motives.
- If the finding has replicated well, say so plainly.
</constraints>

<output_format>
## Verdict
One of: replicated well, replicated with a smaller effect, mixed or contested, did not replicate, or not yet tested. Then two sentences.
## The original finding
What was claimed, by whom, with what design and sample, and how the popular version differs.
## Replication record
Table: study or project (linked) | year | type (direct, conceptual, multi-lab, meta-analysis) | sample | pre-registered | result.
## Why it may not have held up
Short bullets, or "Not applicable" if it held up.
## How to describe it now
One or two sentences ready to use.
</output_format>
