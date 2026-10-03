---
schema: 1
id: refine-research-question
kind: prompt
title: Refine a vague topic into a research question
description: Refines a vague topic into researchable questions using FINER and PICO-style frameworks, with variants by scope, feasibility notes and the literature to check first. For students and researchers.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [topic, notes]
output: [questions, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [research-question, finer, pico, scoping, feasibility]
pairs_with:
  prompts: [design-research-study, build-search-string, write-research-proposal, plan-phd-timeline]
  personas: [research-methodologist, thesis-advisor]
args:
  - name: topic
    description: The topic or idea in your own words, however vague, plus why it interests you and anything you already know about it.
    type: text
    required: true
  - name: field
    description: Your discipline or subfield, for example "public health", "sociolinguistics" or "materials science". If empty, it is inferred and stated.
    type: string
  - name: constraints
    description: What limits the project - level (class paper, master's, PhD, funded study), time, budget, access to data, participants or equipment, methods you can or cannot use.
    type: text
output_contract:
  format: markdown
  sections: [What you are really asking, Candidate questions, Recommended question, Literature to check first, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most stalled projects start from a topic ("social media and teenagers") rather than a question. A researchable question names a population or setting, the phenomenon or exposure, what it is compared with (if anything) and the outcome or aspect of interest, and it implies a design that can answer it. Supervisors use the FINER criteria (Feasible, Interesting, Novel, Ethical, Relevant) to judge a question. Element frameworks help make it precise: PICO or PECO (population, intervention or exposure, comparison, outcome) for intervention and exposure questions, PEO or SPIDER for qualitative questions, and a plain "who, what, where, when" for descriptive ones. The type of question (descriptive, comparative, causal, predictive, interpretive) decides which designs and claims are possible.
</context>

<task>
Turn this topic into researchable questions.
<topic>
{{topic}}
</topic>
{{#field}}Field: {{field}}{{/field}}
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

1. Restate what the person seems to want to know, in one or two sentences, and list the assumptions you are making (field, level, setting) where the input is silent.
2. Identify the question types this topic could support and which one best fits the stated interest and constraints.
3. Write three candidate questions at different scopes: narrow (answerable within the constraints with modest resources), middle, and ambitious (needs more time, data or funding). For each, break it into the elements of the framework that fits (PICO/PECO, PEO/SPIDER, or population-phenomenon-setting) and name the design it implies.
4. Rate each candidate against FINER with one line per criterion, and add feasibility notes: data or participants needed, access, time, ethics review, and the skills required.
5. Recommend one question and explain why, including what the person would have to give up compared with the others. Offer a testable hypothesis only if the question type supports one.
6. Say what to search for first to check that the question is not already answered: the concepts and synonyms to combine, the kinds of sources to look for (existing systematic reviews and protocols, recent primary studies, key datasets) and where they are usually indexed in this field.
</task>

<constraints>
- Never name specific papers, authors, datasets or findings as if you had checked them. Describe what to look for and how; if you mention a well-known source from memory, label it "from memory, verify".
- Do not inflate novelty. If a question sounds well studied, say so and suggest the angle that could still add something (new population, setting, method or replication).
- Keep causal wording ("effect of", "impact of") only for questions whose implied design can support a causal claim; otherwise use "association", "experience of" or "patterns in".
- If the topic is too vague to produce sensible questions (one or two words with no context), still give the three scopes using stated assumptions, and put the clarifying questions first.
- Flag any ethical problem the question raises (vulnerable groups, covert data collection, sensitive data) and note that an ethics committee decides.
</constraints>

<output_format>
## What you are really asking
Restatement, question type, assumptions.
## Candidate questions
For each of narrow, middle and ambitious: the question in bold, a framework breakdown table (element | value), implied design, FINER ratings, feasibility notes.
## Recommended question
The pick, the reasoning, the trade-off, and a hypothesis if one fits.
## Literature to check first
Concept blocks with synonyms, source types and where to search.
## Questions for you
Up to five questions whose answers would most change the recommendation.
</output_format>
