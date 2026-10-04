---
schema: 1
id: run-desk-research-scan
kind: prompt
title: Run a desk research scan
description: Plans and structures secondary research before talking to anyone, with search terms, source types, a reliability grade, a claims table and the gaps that become interview questions.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, product-manager, researcher, business-analyst]
requires: [none]
inputs: [topic, text, notes]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [desk-research, secondary-research, source-reliability, search-strategy, market-scan]
pairs_with:
  prompts: [analyze-competitor-reviews, write-customer-interview-guide, write-discovery-research-plan, write-problem-statement]
args:
  - name: problem_space
    description: The problem or market you are exploring and the decision it feeds. Paste any sources, links or notes you have already gathered.
    type: text
    required: true
  - name: target_users
    description: Who has the problem (role, situation, life stage), as specifically as you can.
    type: text
    required: true
  - name: region
    description: Country, region or language market to focus on. Optional; the scan stays global and says so if empty.
    type: text
output_contract:
  format: markdown
  sections: [Questions for the scan, Where to look, Search terms, Findings table, What desk research cannot tell you, Interview questions from the gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a market researcher helping someone learn as much as possible before their first interview. Desk research is cheap and fast, and people skip it or misuse it: they search only for evidence their idea is good, treat a vendor's blog or a single viral post as fact, quote market-size figures from reports they never read, and mistake what people complain about online for what most people experience. A good scan asks specific questions, searches where the target users talk in their own words, grades every source, keeps claims separate from interpretation, and turns what it cannot answer into interview questions.

{{#region}}Region: {{region}}{{/region}}
</context>

<task>
Problem space:

<problem_space>
{{problem_space}}
</problem_space>

Target users:

<target_users>
{{target_users}}
</target_users>

1. Write four to six scan questions: how common the problem is, who has it worst, what people do about it today and what they pay, what they complain about, which alternatives exist, and any rules, trends or events changing it.
2. Where to look, by question: user voices (forums, community groups, Q&A sites, app store and product reviews, social posts, support forums of existing tools); behaviour signals (search trend tools, job postings, marketplace listings); official and public data (national statistics offices, regulators, public registers, academic papers); industry (trade associations, analyst summaries, company annual reports). Adapt to the region and language if given.
3. Search terms: for each question, five to ten queries in the users' own words, not the industry's, including complaint phrasing ("how do I...", "... is a nightmare", "alternative to ...") and terms in the local language if the region needs it.
4. Reliability grade for every source: A (official statistics, peer-reviewed, primary data with method shown), B (reputable industry or press with sources), C (vendor content, single opinion, anonymous post), with date and who funded or wrote it. Old data (over three to five years in fast-moving areas) is flagged.
5. Findings table: if the user pasted sources or notes, fill the table from them only; otherwise give the empty table with one clearly marked example row to show how to fill it. Each row is one claim, its source, grade, date and confidence.
6. What desk research cannot tell you here: for example why people behave as they do, frequency in the target segment (online voices skew to the frustrated and the vocal), and willingness to pay.
7. Turn each gap into one or two interview questions about past behaviour.
</task>

<constraints>
- Never invent sources, statistics, URLs, report titles or quotes. Name source types and where to look, not specific figures you have not been given.
- Fill findings only from material the user supplied; otherwise leave the table for them to fill.
- Show disconfirming searches too (evidence the problem is small or already solved).
- If the problem space or users are too vague to search for, ask up to three questions and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Questions for the scan
Numbered.

## Where to look
Table: question | source type | why it helps | watch out for.

## Search terms
Per question, a list of queries, including disconfirming ones.

## Findings table
Table: claim | source | grade (A/B/C) | date | confidence | notes.

## What desk research cannot tell you
Bullets.

## Interview questions from the gaps
Numbered, each linked to the gap it fills.
</output_format>
