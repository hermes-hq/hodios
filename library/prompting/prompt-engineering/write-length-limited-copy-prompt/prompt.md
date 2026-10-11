---
schema: 1
id: write-length-limited-copy-prompt
kind: prompt
title: Write a length-limited copy prompt
description: Writes a prompt that reliably produces copy within hard character or word limits - ads, SMS, meta descriptions, bios, form fields - using target ranges, counts, code checks and trimmed variants.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [marketer, copywriter, content-creator, individual]
requires: [none]
inputs: [text]
output: [prompt, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [character-limits, word-count, meta-description, sms-copy, ad-copy]
pairs_with:
  prompts: [cut-text-to-length-limit, write-headline-variations, write-spreadsheet-ai-prompts]
  personas: [prompt-engineer]
args:
  - name: copy_type
    description: What you write again and again and the hard limit, for example "Google Ads headlines, 30 characters" or "SMS reminders, 160 characters single segment".
    type: text
    required: true
  - name: content
    description: What the copy must say - key message, must-include items (brand, price, date, call to action) and tone.
    type: text
    required: true
  - name: tool
    description: Optional - the assistant you use and whether it can run code, or whether you work in a spreadsheet.
    type: text
output_contract:
  format: markdown
  sections: [How limits are counted, Prompt, Count check, Example output]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts for copy that must fit a hard limit. Language models do not see characters; they see chunks of text, so "under 155 characters" is a guess: outputs overshoot, a model's own count is often wrong, "50 words" becomes 70, and trimming afterwards cuts the call to action or the brand name. Limits also depend on how the platform counts: SMS segments shrink from 160 to 70 characters when one emoji or accented character outside the basic GSM set appears; some platforms count spaces and line breaks, some count wide characters double; search engines truncate meta text by pixel width, so a character limit is only a guide. What works: aim for a range below the hard limit, list must-include items first so they survive trimming, have the model output its own count and, where possible, count with code or a spreadsheet formula, produce a shorter fallback for each line, and reject anything over the limit rather than shipping it.

Copy type and limit: {{copy_type}}

Content: {{content}}
{{#tool}}

Tool: {{tool}}
{{/tool}}
</context>

<task>
1. How limits are counted: state how this copy type counts (characters with or without spaces, encoding effects such as SMS GSM-7 versus Unicode, pixel truncation, per-field limits), any facts the user must confirm in the platform's own documentation, and the target range to aim for.
2. Write the prompt: the message and must-include items in priority order; the target range and hard limit; a rule to write the must-include items first and cut from the lowest priority; no abbreviations or symbols that hurt clarity unless allowed; output each line with its character or word count and a shorter fallback version; when code execution is available, count with code and rewrite any line that fails; never return a line over the hard limit.
3. Count check: a spreadsheet formula (LEN for characters, a word-count formula) or a short code snippet for the user to verify counts, and what to check by eye (truncation preview, special characters).
4. Example output: run the prompt on the user's content and show lines with counts, verified as best as possible, noting that counts should still be checked.
</task>

<constraints>
- Do not state platform limits as current facts without telling the user to confirm them; limits and counting rules change.
- Must-include legal or regulatory text (price conditions, opt-out wording) is never trimmed to fit; if it does not fit, say so.
- No misleading shortening (dropping "from" in "from 9.99", dropping conditions).
- Model-agnostic; works with or without a code tool.
</constraints>

<output_format>
## How limits are counted
Bullets with the target range.
## Prompt
In a fenced code block with [CONTENT] and [LIMIT] placeholders.
## Count check
Formula or snippet in a fenced block, then bullets.
## Example output
Table: Line | Count | Shorter fallback | Count.
</output_format>
