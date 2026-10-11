---
schema: 1
id: add-semantic-cache-to-llm-app
kind: prompt
title: Add a semantic cache to an LLM feature
description: Adds a semantic cache in front of an LLM call, with an exact-match layer, cache keys scoped by tenant, prompt and model version, a threshold tuned on labelled pairs, invalidation and a shadow rollout.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, ml-engineer, fullstack-engineer]
stack: [llm-apps]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [code, tests, report]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [semantic-cache, embeddings, cost-reduction, similarity-threshold, cache-invalidation]
pairs_with:
  prompts: [reduce-llm-costs, estimate-llm-feature-cost, choose-embedding-model, implement-redis-cache-aside]
args:
  - name: feature
    description: The LLM feature to cache - what users ask, whether answers depend on the user, account, retrieved documents or live data, and how often similar questions repeat.
    type: text
    required: true
  - name: stack
    description: Language, framework, the LLM and embedding providers, and the stores already in use (Redis, Postgres with pgvector, a vector database).
    type: text
  - name: sample_queries
    description: A sample of real user queries (anonymised), ideally a few hundred, used to estimate hit rate and tune the threshold.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Design, Code, Threshold tuning, Rollout and monitoring, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A semantic cache returns a stored answer when a new query embeds close to an earlier one. It saves money and latency only when users really repeat the same question in different words, and it has a failure mode an exact cache does not: it confidently serves the wrong answer. Queries that are near in embedding space can differ in exactly the detail that matters: a negation ("how do I cancel" versus "how do I not get cancelled"), a number, a date, a product name, a plan tier. Cosine similarity alone cannot tell these apart, so the threshold must be tuned on labelled query pairs by measuring the false-hit rate, not picked as "0.9". The second failure is leakage: if the key does not include everything the answer depends on (tenant, user permissions, system prompt version, model, retrieved document versions, locale), one customer gets an answer built from another customer's data, or an answer from last month's prompt. Features whose answers are personal, built on live data or expected to vary on purpose should not be semantically cached at all. An exact-match cache on a normalised query catches most repeats for free and should come first.
</context>

<task>
Add a semantic cache to this feature:
<feature>
{{feature}}
</feature>
{{#stack}}
<stack>
{{stack}}
</stack>
{{/stack}}
{{#sample_queries}}
<sample_queries>
{{sample_queries}}
</sample_queries>
{{/sample_queries}}

1. If you can read the repository, find the LLM call, the prompt construction and everything that goes into it (user and tenant context, retrieved documents, tool results), and the stores and embedding client already in use. Reuse them rather than adding a new vector database.
2. Fit check: decide whether the feature is cacheable. List each input the answer depends on. If answers depend on per-user data, live data or tool calls with side effects, say semantic caching does not fit (or fits only a named subset, such as general product questions) and stop at that recommendation. If `sample_queries` are given, estimate the repeat rate from them; otherwise say it is unknown.
3. Design two layers: an exact-match cache keyed on a normalised query (case, whitespace, punctuation) plus the scope, then the semantic layer. The scope that both layers partition by: tenant or permission group, prompt template version, model id, retrieval index or document version, locale. Never compare embeddings across scopes.
4. Semantic lookup: embed the query with the same model used for stored entries, search the nearest neighbour within the scope, and accept only above the threshold. Add guards that reject a hit when numbers, dates, negations or named entities differ between the two queries.
5. Writes: store only successful, non-refused, policy-checked answers, with the query, embedding, answer, scope, model and created time. Set a TTL that fits how fast the underlying facts change.
6. Invalidation: bump the scope version when the prompt template, model or source documents change, and provide a way to purge one entry when a user reports a wrong answer.
7. Threshold tuning: build a labelled set of query pairs (same answer acceptable or not), including hard negatives that differ in one detail. Pick the threshold for a target false-hit rate (for example under 1%) and report the hit rate it gives. Write the script or test that reruns this.
8. Rollout: shadow mode first (look up and log would-be hits without serving them, and compare against the fresh answer), then serve. Metrics: exact and semantic hit rates, false-hit rate from sampled review and user feedback, latency saved, embedding cost against LLM cost saved.
9. Tests: scope isolation (a hit never crosses tenants), the detail-difference guards, TTL expiry and version-bump invalidation, and the cache failing open (an outage of the cache store falls back to the LLM).
</task>

<constraints>
- Do not invent hit rates, savings or thresholds; derive them from the sample or label them as targets to measure.
- Never cache across tenants or permission scopes, and never cache answers containing personal data unless the scope is that single user.
- Use the provider SDKs and stores already in the project; if the embedding model or API details are unknown, ask rather than guess method names.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Fit check
Cacheable or not, the inputs the answer depends on, and the expected repeat rate (measured or unknown).
## Design
Key and scope fields, the two layers, the lookup flow in numbered steps, TTL and invalidation.
## Code
Code blocks with file paths.
## Threshold tuning
How the labelled pairs are built, the script or test, and the rule for picking the threshold.
## Rollout and monitoring
Shadow phase, switch-on criteria, metrics and alerts.
## Open questions
Numbered, or "None".
</output_format>
