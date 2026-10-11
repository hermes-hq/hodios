---
schema: 1
id: write-long-form-generation-prompt
kind: prompt
title: Write a long-form generation prompt
description: Writes a prompt set for getting long documents such as reports, guides or manuals from an AI past output limits - outline first, section by section, continuity notes and a final consistency pass.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [writer, technical-writer, consultant, content-creator]
requires: [none]
inputs: [text, topic]
output: [prompt, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [long-form-writing, output-limits, outline-first, continuity, consistency-check]
pairs_with:
  prompts: [design-prompt-chain, write-long-document-prompt, write-task-prompt]
  personas: [prompt-engineer]
args:
  - name: document
    description: What the long document is, who reads it, its purpose and the target length, for example "a 40-page onboarding manual for new warehouse supervisors".
    type: text
    required: true
  - name: materials
    description: Optional - source notes, facts, data, style guide or an existing outline the document must be built from.
    type: text
  - name: tool
    description: Optional - where you will run it (chat assistant, API script, document editor with AI) and any length limits you have hit.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Outline prompt, Section prompt, Consistency pass prompt, Running it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompt sets for long documents. A single "write a 30-page report" request fails in predictable ways: the model stops early or summarises the second half, later sections repeat earlier ones, terminology and numbers drift between sections, the voice changes after a pause, and when asked to "continue" it restarts or skips. What works is splitting generation into stages: an approved outline with a word budget and a one-line purpose per section; a style sheet (audience, terms, spelling, tone, formatting) and a facts sheet (figures, names, decisions) carried into every call; one section per request with the outline, the summary of what came before and the next section's purpose for handover; and a final pass that checks the whole for contradictions, repetition, gaps and terminology. The author's sources are the ceiling: sections that need facts the materials do not hold should be marked, not filled.

Document: {{document}}
{{#materials}}

<materials>
{{materials}}
</materials>
{{/materials}}
{{#tool}}

Tool: {{tool}}
{{/tool}}
</context>

<task>
1. Plan: the number of sections, a word budget per section that adds up to the target, which sections can be written from the materials and which need input from the author, and the shared style sheet and facts sheet to carry into every call.
2. Write the outline prompt: produce a numbered outline with a purpose line, key points, sources from the materials and a word budget for each section, then stop for approval.
3. Write the section prompt: insert the approved outline, the style and facts sheets, a short running summary of sections written so far (not their full text), the current section's brief and the next section's purpose. It writes only that section, within budget, marks missing facts as [NEEDS INPUT: ...] and ends with a two-sentence summary to append to the running summary.
4. Write the consistency pass prompt: given the full draft (or sections in batches), list contradictions, repeated passages, terminology and number drift, broken cross-references, sections over or under budget and every [NEEDS INPUT] marker, without rewriting the document.
5. Running it: the order of calls, what to check after each section, how to recover if output cuts off mid-section (ask for the section from its last complete paragraph, never "continue" with no anchor), and how to handle edits so the running summary stays true.
</task>

<constraints>
- The prompts must not invent facts, figures, quotes or sources missing from the materials; they use the NEEDS INPUT marker.
- Model-agnostic; output limits vary by tool and change, so section size is set by what the tool reliably produces, tested once.
- Do not offer to fake authorship or bypass academic or publication rules on AI use; if the document is for assessment or publication, remind the user to check the applicable disclosure rules.
- Keep each prompt under about 300 words excluding inserted materials.
</constraints>

<output_format>
## Plan
Section table with budgets, and the style and facts sheets.
## Outline prompt
Fenced code block.
## Section prompt
Fenced code block with placeholders [OUTLINE], [STYLE_SHEET], [FACTS_SHEET], [SUMMARY_SO_FAR], [SECTION_BRIEF], [NEXT_SECTION].
## Consistency pass prompt
Fenced code block.
## Running it
Numbered steps.
</output_format>
