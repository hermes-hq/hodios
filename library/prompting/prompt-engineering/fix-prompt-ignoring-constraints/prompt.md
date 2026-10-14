---
schema: 1
id: fix-prompt-ignoring-constraints
kind: prompt
title: Fix a prompt that keeps breaking a rule
description: Finds why a prompt keeps breaking a length, format or banned-word rule and fixes it with better placement, positive phrasing, matching examples and an output check where needed.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, content-creator, ml-engineer, marketer]
requires: [none]
inputs: [text]
output: [prompt, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [length-limits, format-rules, banned-words, prompt-debugging, output-checks]
pairs_with:
  personas: [prompt-engineer]
  prompts: [diagnose-prompt-failures, improve-prompt, write-structured-output-prompt]
args:
  - name: prompt
    description: The full prompt as sent, including any system prompt and examples.
    type: text
    required: true
  - name: rule
    description: The rule it keeps breaking, for example "under 150 words", "no bullet points", "never use the word 'delve'", "always end with a question".
    type: text
    required: true
  - name: bad_outputs
    description: Two or more outputs that broke the rule.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is breaking, Likely causes, Fixes, Revised prompt, How to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a model keeps breaking a clear rule, the cause is usually in the prompt around the rule, not the rule's wording. Typical causes: the rule is buried in the middle of a long prompt; an example breaks it (a 300-word example beats a "150 words" instruction); another instruction pulls the other way ("be thorough"); the rule is negative ("don't use bullets") with no alternative, and naming a banned word can prime it; the rule asks for something models do poorly, such as exact word or character counts; in a long chat, the rule drifts out of focus; or a maximum token setting is cutting the output rather than shaping it. Capital letters and repetition rarely help and can cause overcorrection elsewhere. If the rule must hold every time, the reliable fix is a check after generation (count, pattern match) with a retry or a fix-up step.

<prompt_under_test>
{{prompt}}
</prompt_under_test>
Rule being broken: {{rule}}
<bad_outputs>
{{bad_outputs}}
</bad_outputs>
</context>

<task>
1. Describe how each output breaks the rule, precisely (by how much, where, how often).
2. Test each likely cause against the prompt and the outputs: placement, conflicting instructions, examples that break the rule, negative phrasing or priming, a capability limit, long-conversation drift, settings such as output length limits, or the rule being unclear (does "150 words" include headings?). Name the most likely cause with the evidence.
3. Propose the smallest fixes, in order of likely impact, choosing from: move the rule next to the output format or the end of the prompt; state it once, positively, with what to do instead; give a reason; fix or remove examples that break it; resolve conflicts; replace exact counts with units the model handles (sentences, bullets, paragraphs) or a range; restate it in the last user turn for long chats; ask for a short self-check before the final answer only if the platform allows a hidden or separate step.
4. Give the revised prompt with only those changes.
5. Say how to check: run the prompt on five varied inputs and count breaks; if the rule is hard (legal, format parsed by code), add a check after generation such as a word count or pattern match with one retry, and describe it.
</task>

<constraints>
- Change only what relates to the rule; keep the rest of the prompt as it was.
- Do not claim the fix works; say what result would confirm it.
- If the rule is a known capability limit, say so and recommend the check after generation rather than more wording.
- Do not add all-caps warnings or repeat the rule several times as the fix.
</constraints>

<output_format>
## What is breaking
Table: Output | How it breaks the rule.
## Likely causes
Ranked, each with the evidence.
## Fixes
Numbered: Before, After, Why.
## Revised prompt
Fenced code block.
## How to check
Numbered steps, including any check after generation.
</output_format>
