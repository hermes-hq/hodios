---
schema: 1
id: cluster-text-with-embeddings
kind: prompt
title: Cluster short texts with embeddings
description: "Clusters short texts such as feedback, tickets or survey answers with embeddings, chooses the number of clusters honestly and names each cluster from real examples."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, discover]
role: [ml-engineer, data-scientist, product-manager, data-analyst]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo]
output: [code, report, table]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [embeddings, topic-modeling, hdbscan, k-means, customer-feedback]
pairs_with:
  prompts: [analyze-aspect-sentiment, choose-ml-approach]
args:
  - name: texts
    description: Where the texts are, how many, their language or languages, and typical length.
    type: text
    required: true
  - name: goal
    description: What the clusters are for, for example "find the top complaint themes this quarter" or "deduplicate near-identical tickets".
    type: text
    required: true
  - name: embedding_model
    description: A required embedding model or API, or "choose" to let the agent pick one that fits the languages and data rules.
    type: string
output_contract:
  format: markdown
  sections: [Approach, Code, Clusters, Quality checks, Caveats, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clustering text is easy to run and easy to over-read. Embeddings group texts by what the embedding model considers similar, which is mostly topic, not sentiment or intent, so "angry about billing" and "happy with billing" often land together. K-means forces every text into a cluster and needs a number of clusters chosen in advance; HDBSCAN finds clusters of varying size and leaves a noise group, which is often the honest answer for messy feedback but needs dimensionality reduction (usually UMAP) to work well on high-dimensional embeddings. Silhouette scores alone do not pick a useful cluster count. Cluster names written from keywords or by an LLM without checking members can describe a cluster that does not exist. And results shift with random seeds, so a theme that appears in one run only is not a finding.
</context>

<task>
Cluster these texts: {{texts}}

Goal: {{goal}}
{{#embedding_model}}

Embedding model: {{embedding_model}}
{{/embedding_model}}

1. Read the repository's data access code and existing dependencies. Load the texts, drop empties, exact duplicates (keep counts) and boilerplate such as signatures and quoted replies, and record how many were removed.
2. Choose the embedding model: one that covers the languages present, fits the data rules (a local model if text cannot leave the company), and handles the text length. Normalise vectors for cosine similarity. Cache embeddings to disk so re-runs are cheap.
3. Choose the method from the goal: near-duplicate grouping by a similarity threshold, HDBSCAN on UMAP-reduced vectors for theme discovery with a noise group, or k-means when a fixed number of buckets is required. Explain the choice in one line.
4. Pick parameters by inspection, not a single score: try a small range (minimum cluster size or k), look at size distribution, noise share and a sample of members per cluster, and use silhouette or DBCV only as a tie-breaker.
5. Check stability: re-run with two or three seeds and report which clusters persist. Only persistent clusters are reported as themes.
6. Name each cluster from its members: top distinguishing terms (class-based TF-IDF works well) plus five representative texts closest to the centroid, then a short name. If an LLM writes the names, give it the members, and verify each name against a fresh random sample of members.
7. Produce a table of clusters with size, share, name, representative quotes and a purity note (mixed or clean), plus the noise share. Save cluster assignments with text ids.
8. Run the script end to end and report what was verified.
</task>

<constraints>
- Quote real texts as examples; never paraphrase them into something they did not say.
- Do not present cluster sizes as prevalence in the wider population unless the texts are a representative sample; say what they represent.
- Do not send texts with personal data to an external embedding or LLM API unless that is allowed; ask when unsure, and strip obvious identifiers either way.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Embedding model, method and parameters, with one-line reasons.
## Code
Code blocks with file paths.
## Clusters
Table: cluster | size | share | name | example quotes | purity.
## Quality checks
Stability across seeds, noise share, name verification.
## Caveats
What the clusters do and do not show.
## Check
Commands run and real results.
</output_format>
