---
schema: 1
id: build-image-similarity-search
kind: prompt
title: Build image similarity and duplicate search
description: "Builds image similarity or near-duplicate search with perceptual hashes and learned embeddings, a vector index, and a threshold calibrated on labelled pairs."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, image]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [computer-vision, embeddings, vector-search, deduplication, perceptual-hash]
pairs_with:
  prompts: [design-rag-pipeline, cluster-text-with-embeddings]
args:
  - name: goal
    description: What "similar" means here, for example "the same photo resized or cropped", "the same product from another angle" or "visually similar style".
    type: text
    required: true
  - name: data
    description: Where the images are, how many, how often new ones arrive, and query volume.
    type: text
    required: true
  - name: infrastructure
    description: Any existing vector database or search service, and the hardware available for embedding.
    type: string
output_contract:
  format: markdown
  sections: [Approach, Code, Evaluation, Threshold, Operations, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Similar image" means different things, and the method follows from which one. Exact and lightly edited copies (resized, recompressed, small crops) are found cheaply and precisely by perceptual hashes compared by Hamming distance. Self-supervised visual embeddings (DINO-style) are strong for same-object and near-duplicate matching; image-text models (CLIP-style) capture semantic similarity and allow text queries but rate two different red dresses as near-identical. A cosine threshold that works on one embedding model means nothing on another and must be calibrated on labelled pairs. Exact search is fine up to around a million vectors on modest hardware; beyond that an approximate index (HNSW or IVF) trades a little recall for speed, and its recall should be measured. Ignored details: EXIF orientation, transparent PNG backgrounds, and embedding preprocessing that differs between indexing and querying.
</context>

<task>
Build image similarity search for: {{goal}}

Data: {{data}}
{{#infrastructure}}

Infrastructure: {{infrastructure}}
{{/infrastructure}}

1. Read the repository and any existing storage, search or vector database code. Reuse the existing vector store if there is one.
2. Choose the method from the goal: perceptual hash for copies and light edits, a visual embedding model for near-duplicates and same object, an image-text model for semantic or text-to-image search, or a hash first pass followed by embeddings. Say why.
3. Write the ingestion: load with EXIF orientation applied, convert colour mode consistently, apply the model's exact preprocessing, batch on GPU if available, L2-normalise vectors, and store id, vector, hash and source path. Make it incremental for new images and idempotent on re-runs.
4. Build the index: exact search for small collections, HNSW or IVF for large ones with parameters stated, and measure the approximate index's recall against exact search on sample queries.
5. Build a labelled evaluation set: at least 100 query images with known matches and known non-matches, including hard negatives (similar but different items).
6. Evaluate precision and recall at k and the distribution of similarity scores for matching versus non-matching pairs; choose the duplicate threshold from that, stating the expected precision and recall at it.
7. Expose a query function or endpoint returning ids, scores and a match or no-match flag at the threshold, and write tests for orientation, resized copies and an unrelated image.
8. Run the evaluation and tests, and report the real numbers and indexing throughput.
</task>

<constraints>
- Do not reuse a threshold from another model or article; calibrate it on this data.
- Use the same preprocessing at indexing and query time; test it.
- Check the licence of the embedding model before recommending it for commercial use.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Method, model and index, with reasons.
## Code
Code blocks with file paths.
## Evaluation
Precision and recall at k, index recall versus exact.
## Threshold
Chosen value, expected precision and recall, and score distributions summary.
## Operations
Incremental indexing, re-embedding when the model changes, storage size.
## Check
Commands run and real results.
</output_format>
