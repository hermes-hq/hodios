---
schema: 1
id: debug-poor-rag-answers
kind: prompt
title: Debug poor RAG answers
description: Diagnoses bad answers from a RAG system by checking each stage in order (corpus, chunking, retrieval, ranking, context assembly, generation) on the failing questions, with a targeted fix per cause.
category: ai-ml
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [ml-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, shell]
inputs: [repo, logs, text]
output: [report, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rag-debugging, retrieval, root-cause, hallucination]
pairs_with:
  prompts: [design-rag-pipeline, check-answer-faithfulness, rerank-retrieved-passages]
args:
  - name: bad_answers
    description: The failing questions with the answers given, what the right answer is and where it lives in the corpus, plus retrieved chunks and the final prompt if logged.
    type: text
    required: true
  - name: pipeline
    description: How the RAG system is built (parsing, chunking, embedding model, retrieval, reranking, k, prompt) and where the code lives.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Stage-by-stage findings, Root causes, Fixes, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"The RAG bot gives wrong answers" has a different cause at each stage, and the fix for one does nothing for another. Checking in pipeline order finds it quickly: Is the answer in the corpus at all, and current? Did parsing keep it (tables and scanned PDFs often come out empty or garbled)? Did chunking keep the answer with its context, or split it from the heading that names the product? Is the right chunk in the top 50 but not the top k (a ranking problem), or nowhere (a retrieval problem: vocabulary mismatch, exact identifiers, a filter excluding it)? Did context assembly drop or truncate it? Was it in the prompt but ignored, contradicted by another chunk, or overridden by the model's own knowledge (a generation problem)? Teams often skip straight to rewriting the prompt, which fixes only the last category.
</context>

<task>
Debug these bad answers.

Failing cases:
{{bad_answers}}

Pipeline: {{pipeline}}

1. Read the pipeline code. If you can run it, reproduce each failing question and capture: parsed text of the source document, its chunks, the top 50 retrieval results with scores, the reranked list, the final prompt sent, and the answer.
2. For each failing case, walk the stages in order and stop at the first one that fails:
   - Corpus: the answer exists, is current, and only one version exists.
   - Parsing: the answer text survived extraction intact.
   - Chunking: the chunk containing the answer is self-contained (has the product, entity or section it refers to).
   - Retrieval: the right chunk is in the top 50; if not, why (vocabulary, identifier, filter, language).
   - Ranking: it is in the top 50 but not in the top k.
   - Context assembly: it was in the top k but truncated, dropped or buried among many chunks.
   - Generation: it was in the prompt but the model ignored it, mixed it with another source, or answered from general knowledge.
3. Summarise root causes across cases with counts.
4. Propose one fix per root cause, matched to the stage: re-parse or OCR, structure-aware chunking with heading paths, hybrid search for identifiers, query rewriting, filter fixes, a reranker, smaller or deduplicated context, or prompt changes (answer only from sources, cite chunk ids, say when not found, resolve conflicts by date).
5. For each fix, say how to verify it: which failing cases should now pass and which retrieval or answer metric to watch for regressions.
</task>

<constraints>
- Base each stage finding on captured evidence. If you could not run the pipeline, say which evidence is missing and give the exact steps to capture it, instead of guessing the stage.
- Do not change production indexes or data while debugging; inspect and reproduce locally.
- Do not recommend a prompt change for a case that failed before generation.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Stage-by-stage findings
Table: case | corpus | parsing | chunking | retrieval | ranking | context | generation, each marked pass, fail or not checked, with the first failing stage highlighted.
## Root causes
Ranked with counts and evidence.
## Fixes
One per root cause, with what to change and where.
## Verification
Cases that should pass after each fix and the metrics to watch.
## Open questions
Numbered, or "None".
</output_format>
