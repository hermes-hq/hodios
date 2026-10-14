---
schema: 1
id: choose-embedding-model
kind: prompt
title: Choose an embedding model
description: Chooses an embedding model for search or RAG by shortlisting candidates on hard constraints, then testing them on the user's own queries for recall, latency, cost and storage.
category: ai-ml
version: 1.0.0
status: incubating
stage: [design, plan]
role: [ml-engineer, backend-engineer, architect, data-scientist]
stack: [llm-apps]
requires: [none]
inputs: [spec, dataset]
output: [plan, table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [embeddings, semantic-search, model-selection, benchmarking]
pairs_with:
  prompts: [design-rag-pipeline, choose-llm-for-feature]
args:
  - name: use_case
    description: What is being embedded (document types, languages, average length, corpus size, growth) and what queries look like.
    type: text
    required: true
  - name: constraints
    description: Hosting rules (hosted API allowed or self-hosted only, data residency), latency and cost limits, the vector store in use and its dimension limits.
    type: text
    required: true
  - name: candidates
    description: Models already under consideration, if any.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Shortlist, Bake-off plan, Storage and cost, Decision rule, Migration notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams pick embedding models from a public leaderboard, then find the winner does poorly on their own data: leaderboards average many tasks, and domain vocabulary, languages, query style (short keywords versus full questions) and document length change the ranking. The decision has long-lived costs: dimensions drive vector storage and memory, the maximum input length caps chunk size, some models need a different prefix for queries and documents, and switching later means re-embedding the whole corpus because vectors from two models are not comparable. A small bake-off on 50 to 200 real queries with known relevant documents settles the choice better than any leaderboard.
</context>

<task>
Choose an embedding model for: {{use_case}}

Constraints: {{constraints}}
{{#candidates}}
Candidates already considered: {{candidates}}
{{/candidates}}

1. Turn the use case and constraints into requirements: languages, domain, maximum input tokens needed by the chunk size, hosting and residency, latency per query, budget, and vector store dimension limits.
2. Shortlist 3 or 4 candidates that meet the hard constraints, mixing hosted and open-weight options if both are allowed. For each, list what to verify in its documentation: dimensions and whether they can be reduced, maximum input, languages, query and document prefixes or task types, licence and pricing. Mark anything you are not sure of as "check".
3. Bake-off plan: build 50 to 200 real queries with labelled relevant chunks (from logs, support tickets or written by domain experts), including exact-term queries, paraphrases and non-English queries if relevant. Embed the same chunks with each candidate and measure recall@k and MRR, plus query latency and embedding throughput.
4. Storage and cost: vectors x dimensions x bytes per value per candidate, with and without reduced dimensions or quantisation, and the embedding cost for the initial corpus and monthly updates, using given prices or symbols.
5. Decision rule: the smallest or cheapest model within a stated margin of the best recall, with tie-breakers.
6. Migration notes: store the model name and version with every vector, plan full re-embedding on change, and keep the old index until the new one passes the eval.
</task>

<constraints>
- Do not quote leaderboard scores, prices or dimensions from memory as facts; say what to check and where.
- Hybrid search with a keyword component may matter more than the model choice for exact identifiers; mention it if queries contain codes or names.
- Name models only as candidates to test, never as the answer without the bake-off.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Bullets, each traced to the use case or constraints.
## Shortlist
Table: candidate | hosting | why included | facts to verify.
## Bake-off plan
Query set, metrics, procedure, and the script outline.
## Storage and cost
Table per candidate with the arithmetic.
## Decision rule
The rule and tie-breakers.
## Migration notes
What to store and how to switch later.
</output_format>
