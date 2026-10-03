---
schema: 1
id: review-custom-instructions
kind: prompt
title: Review custom instructions
description: Reviews existing custom or project instructions for an AI assistant, finds conflicts, vague rules, outdated facts and missing context, and returns a tighter version with test prompts.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [review, maintain]
requires: [none]
inputs: [text]
output: [report, prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [personalisation, instruction-audit, response-preferences, assistant-profile]
pairs_with:
  prompts: [write-custom-instructions, build-project-instructions, write-memory-profile, compress-prompt]
args:
  - name: current_instructions
    description: The full text of your custom, project or workspace instructions as they are now, including any "about me" section.
    type: text
    required: true
  - name: pain_points
    description: "Optional: what still annoys you about the assistant's answers, for example \"still writes essays\", \"keeps asking clarifying questions\" or \"ignores my British spelling\"."
    type: text
output_contract:
  format: markdown
  sections: [Findings, Revised instructions, Removed, Questions for you, Try it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Custom instructions grow by accretion: a line added after each annoying answer, a job title from two roles ago, a rule copied from a blog post. Over time they contradict each other ("be concise" next to "always explain your reasoning in detail"), use adjectives the model cannot act on ("be smart"), carry stale facts, and spend the character budget on things the assistant already does. Modern assistants follow instructions literally and apply them to every conversation, so a vague or over-broad rule shows up everywhere. A good review keeps the person's intent, turns each preference into an observable behaviour, scopes rules to when they apply, and cuts the rest.
</context>

<task>
Review these instructions.

<current_instructions>
{{current_instructions}}
</current_instructions>
{{#pain_points}}
<pain_points>
{{pain_points}}
</pain_points>
{{/pain_points}}

1. Read every line and classify any problem as one of:
   - conflict: two lines that cannot both be followed, or that pull in opposite directions;
   - vague: an adjective or goal with no behaviour attached ("be thorough", "be smart");
   - over-broad: a rule that should apply only in some situations but is stated for all;
   - outdated or unverifiable: dates, roles, tools, versions, projects or facts that look stale;
   - redundant: repeats another line or what assistants do by default;
   - counterproductive: shouting, threats, or rules likely to cause over-application;
   - missing: context the pain points or the rest of the instructions suggest is needed but absent.
2. Link each pain point to the line that causes it or the gap that allows it.
3. Write a revised version that keeps every preference I actually hold, resolves conflicts (choosing the reading that fits the rest of the text, and listing the choice as a question), turns adjectives into behaviours, scopes conditional rules ("When I share code…"), and groups related lines.
4. Write three to five test prompts that show the difference between the old and new versions.
</task>

<constraints>
- Do not add preferences I did not express. Put suggested additions in Findings as "missing", for me to accept or not.
- Do not silently update facts. Ask about anything that looks outdated rather than guessing the current value.
- The revised version should be the same length or shorter unless a missing item I clearly need requires more; give an approximate character count for both versions and remind me to check the exact count against my tool's limit.
- Keep my voice and my wording where it already works.
- Keep personal details already present, but flag sensitive ones (health, finances, exact address, other people's details) as worth removing, since instructions are sent with every conversation.
</constraints>

<output_format>
## Findings
A table: Line (quoted, shortened) | Problem | Why it matters | Fix.
## Revised instructions
The full revised text in one fenced block, then "Characters (approx.): old N → new M".
## Removed
Bullets of what was cut and why, one line each.
## Questions for you
Numbered questions on conflicts resolved, outdated facts and suggested additions.
## Try it
Test prompts, each with what should change in the answer.
</output_format>
