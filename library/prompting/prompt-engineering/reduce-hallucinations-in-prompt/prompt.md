---
schema: 1
id: reduce-hallucinations-in-prompt
kind: prompt
title: Reduce made-up answers from a prompt
description: Rewrites a prompt so answers stay grounded, using source-only answering, quote-then-answer, an explicit not-found reply, known-versus-inferred labels and checkable citations.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [individual, ml-engineer, product-manager, researcher]
requires: [none]
inputs: [text]
output: [prompt, report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [grounding, fabrication, citations, not-found-handling, factual-accuracy]
pairs_with:
  personas: [prompt-engineer]
  prompts: [diagnose-prompt-failures, write-long-document-prompt, improve-prompt]
args:
  - name: prompt
    description: The prompt that produces made-up facts, as you send it, including any system prompt.
    type: text
    required: true
  - name: sources
    description: Optional - what the model has to work from (pasted documents, retrieved passages, a knowledge file, web search, nothing).
    type: text
  - name: bad_outputs
    description: Optional - examples of fabricated answers, with what was wrong in each.
    type: text
output_contract:
  format: markdown
  sections: [Where fabrication gets in, Fixes, Revised prompt, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Models make things up most when the prompt asks for specifics they do not have and gives them no honest way out. Common triggers: asking for citations, figures, names or quotes without supplying sources; requiring every field of a format to be filled; rewarding complete-sounding answers; long documents where the answer is far from the question; and questions that assume a false premise. Lowering temperature barely helps. What helps is giving the source, limiting answers to it, making "not found" an acceptable answer with a fixed wording, asking for supporting quotes before the answer, letting fields be empty, and separating what the source says from what the model infers. Some needs cannot be met by prompting at all: current facts need search or retrieval, and calculations need a tool.

<prompt_under_test>
{{prompt}}
</prompt_under_test>
{{#sources}}
Sources available to the model: {{sources}}
{{/sources}}
{{#bad_outputs}}
<bad_outputs>
{{bad_outputs}}
</bad_outputs>
{{/bad_outputs}}
</context>

<task>
1. Find where fabrication gets in: each place the prompt asks for a fact, number, name, date, quote or reference, and whether the model has a source for it. Check also for forced completeness, false premises, and missing permission to say it does not know.
2. Choose fixes that fit, from:
   - Supply or attach the source, or add search or retrieval if the facts are current or external.
   - Answer only from the source; anything else is labelled as general knowledge or left out.
   - For long sources, extract relevant quotes first, then answer from the quotes.
   - A fixed not-found reply, for example "Not in the provided material.", stated as a good outcome.
   - Allow empty or null fields and an "unknown" value in structured output.
   - Cite only provided sources by id or section; never produce references from memory.
   - Label each claim as stated in the source or inferred, and flag low confidence.
   - Check the premise of the question before answering it.
   For each fix, say what it costs (shorter or more cautious answers, more refusals).
3. Write the revised prompt with the fixes applied and the original intent kept.
4. Write five to eight tests: a question the source answers, one it does not, one with a false premise, one asking for a citation or number not in the source, and any failing inputs given, each with a pass condition.
</task>

<constraints>
- Do not promise the revised prompt eliminates fabrication; say that high-stakes outputs still need a human check against the source.
- If the task depends on facts the model cannot access, say the fix is a tool or retrieval, not wording.
- Keep the revision as small as the problem allows; do not rewrite parts that are not involved.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where fabrication gets in
Table: Prompt part | What it asks for | Source available? | Risk.
## Fixes
Numbered, each with the change, the reason and the trade-off.
## Revised prompt
Fenced code block.
## Tests
Table: Input | What it tests | Pass condition.
</output_format>
