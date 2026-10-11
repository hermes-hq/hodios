---
schema: 1
id: plan-original-research-content
kind: prompt
title: Plan original research content
description: Plans an original research piece, such as a survey report, data study or annual index, as flagship content, with a question worth answering, honest method, findings to publish and pieces cut from it.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [original-research, survey-design, data-journalism, flagship-content, digital-pr]
pairs_with:
  prompts: [plan-content-repurposing-system, build-content-measurement-plan, plan-thought-leadership, plan-data-led-pr-campaign]
  personas: [content-strategist]
args:
  - name: organisation
    description: "Who you are, who your audience is, and what the research should do for you."
    type: text
    required: true
  - name: idea
    description: "The research idea or question you have in mind."
    type: text
    required: true
  - name: data_access
    description: "Optional: data, customers, panels or lists you can use, and any limits on them."
    type: text
  - name: capacity
    description: "Optional: people, time and budget available."
    type: text
output_contract:
  format: markdown
  sections: [Research questions, Already answered?, Method, Survey questions, Data protection, Publishing rules, Content package, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a brand, creator, publication or nonprofit plan original research as content: a survey report, an analysis of their own anonymised data, a benchmark, an annual index or a field study. Done well, original research earns links, press, citations and trust because it offers something nobody else has. Done badly, it is a leading survey of 200 followers presented as an industry truth, which damages credibility when someone checks. Experienced teams start from a question the audience and journalists actually want answered, check whether it is already answered, choose a method they can defend (sample, who is missing, question wording, margin of uncertainty, data permissions), decide in advance how they will publish findings they do not like, and plan the derivative content (charts, posts, a webinar, a pitch to journalists) before collecting a single response. Privacy and consent rules for surveys and customer data apply and vary by jurisdiction.

Who you are and your audience: {{organisation}}
Research idea or question: {{idea}}
{{#data_access}}Data or panels you can access: {{data_access}}{{/data_access}}
{{#capacity}}Time and budget: {{capacity}}{{/capacity}}
</context>

<task>
1. Sharpen the question: rewrite the idea into one to three research questions, say who would care (audience, journalists, partners) and why, and list what to search to check it is not already well answered.
2. Choose a method that fits the data access and capacity: survey, own data analysis, interviews, public data, or a mix. For each, state the sample, who is likely missing or over-represented, and what claims it can and cannot support.
3. If a survey: draft neutral question principles and five to eight example questions, avoiding leading or double-barrelled wording, and plan screening and a minimum response target with the reason.
4. Plan data protection: consent, anonymisation, aggregation thresholds, and what to check with whoever handles privacy in the organisation.
5. Set the publishing rules in advance: how findings are reported (sample size, dates, method note), how uncomfortable results will be handled, and claims to avoid.
6. Plan the content package: the flagship report or page, charts, social posts, a newsletter, a talk or webinar, a short journalist pitch (a full press campaign is a separate PR plan), and an annual repeat if it works.
7. Write a timeline from question to launch, with the review and fact-check steps.
</task>

<constraints>
- Never invent findings, statistics, sample sizes or results; this prompt plans research, it does not produce data.
- Do not present convenience samples as representative; state limits plainly in the plan.
- Do not state privacy law for any place as fact; list what to confirm with the organisation's privacy lead or adviser.
- Commit to publishing the method and to not suppressing results that contradict the organisation's interests, or say plainly if that is not possible and what that means for credibility.
</constraints>

<output_format>
## Research questions
## Already answered?
## Method
Table: Method | Sample | Who is missing | Claims it supports | Claims it does not.
## Survey questions
Only if a survey is used.
## Data protection
## Publishing rules
## Content package
Table: Piece | Channel | Purpose | Timing.
## Timeline
</output_format>
