---
schema: 1
id: implement-hybrid-search
kind: prompt
title: Implement hybrid keyword and vector search
description: Implements hybrid retrieval that runs keyword (BM25) and vector search, merges them with reciprocal rank fusion and shared filters, and proves on a query set that it beats each alone.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, ml-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, dataset]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hybrid-search, bm25, reciprocal-rank-fusion, retrieval]
pairs_with:
  prompts: [design-rag-pipeline, rerank-retrieved-passages, rewrite-search-query]
args:
  - name: current_search
    description: The current retrieval (vector only, keyword only), the store or stores (Postgres, Elasticsearch, OpenSearch, a vector database), and where the code lives.
    type: text
    required: true
  - name: queries
    description: Example queries that fail today, especially ones with exact identifiers, names or codes, and any labelled query set.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Code, Evaluation, Results, Tuning, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vector search finds paraphrases but misses exact strings: error codes, SKUs, function names, people, clause numbers and rare jargon. Keyword search (BM25) finds those but misses paraphrases. Hybrid retrieval runs both and merges the lists. Reciprocal rank fusion (score = sum of 1 / (k + rank) across lists, with k around 60) is the safe default because it ignores the incomparable raw scores; weighted score blending needs normalisation and tuning. Typical bugs: filters (tenant, permissions, language) applied to one retriever but not the other, a keyword analyser that strips the very codes users search for (tokenising "E-4012" into "e" and "4012"), duplicate chunks counted twice, and no measurement, so nobody knows whether hybrid helped.
</context>

<task>
Add hybrid retrieval to: {{current_search}}
{{#queries}}
Example queries: {{queries}}
{{/queries}}

1. Read the current retrieval code, the index definitions and how results reach the model. Prefer the hybrid features of the store already in use (for example full-text search alongside a vector index in Postgres, or a search engine's built-in hybrid query) before adding a second system.
2. Keyword side: set up or check the full-text index and analyser so identifiers survive tokenisation (test with the example codes), with language-appropriate stemming for prose.
3. Vector side: keep the existing embedding search.
4. Fusion: run both with the same filters and a candidate depth (for example top 50 each), merge with reciprocal rank fusion keyed by chunk id, deduplicate, and return the top k with both ranks attached for debugging. Make depth, k and the RRF constant configurable.
5. Evaluation: build or extend a labelled query set (at least 50 queries, with identifier queries and paraphrase queries both represented), and measure recall@k and MRR for keyword only, vector only and hybrid, broken down by query type.
6. Run the evaluation and the tests (filter parity between both retrievers, identifier queries, deduplication), and report.
7. Tuning: if one side dominates harmfully, try candidate depth and weighting, and say when a reranker on the fused list is the next step.
</task>

<constraints>
- Apply access and tenant filters inside both retrievers, never only after fusion.
- Do not claim improvement without the side-by-side numbers; if the query set is small, say so.
- No new search infrastructure unless the current store cannot do keyword search adequately; justify it if proposed.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Where each search runs, the fusion method and parameters.
## Code
Code blocks with file paths.
## Evaluation
The query set, metrics and procedure.
## Results
Table: method | recall@k | MRR | by query type. Real numbers, or a plain statement that the eval was not run.
## Tuning
What to try next and when to add a reranker.
## Open questions
Numbered, or "None".
</output_format>
