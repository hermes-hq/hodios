---
schema: 1
id: rewrite-in-simplified-technical-english
kind: prompt
title: Rewrite in Simplified Technical English
description: Rewrites maintenance, assembly or operating procedures in controlled language in the style of ASD-STE100, with short imperative steps, one meaning per word and clear warnings.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, operations-manager, editor]
subject: [engineering]
requires: [none]
inputs: [document, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [controlled-language, asd-ste100, procedures, maintenance-manuals, translation-ready]
pairs_with:
  prompts: [edit-step-by-step-instructions, simplify-to-plain-language, review-document-for-ambiguity]
args:
  - name: text
    description: The procedure or description to rewrite, with its warnings and cautions.
    type: text
    required: true
  - name: terminology
    description: Approved technical names and verbs your organisation uses (part names, tool names), so they are kept exactly. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rewritten text, Changes by rule, Words to check, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Simplified Technical English (the ASD-STE100 specification) was created for aerospace maintenance documentation so that readers with limited English, often working under pressure, read every instruction one way. It is now used in other industries for manuals and for text that will be translated. Its core writing rules are well known: procedural sentences of no more than 20 words and descriptive sentences of no more than 25; one instruction per sentence unless two actions happen at the same time; instructions in the imperative and in the active voice; paragraphs of no more than six sentences; noun clusters of no more than three words; articles and "that" kept rather than dropped; warnings and cautions that start with a clear command and then give the reason; and vertical lists for steps. Its dictionary approves a limited set of general words, each with one meaning and usually one part of speech (a word approved as a verb may not be approved as a noun or adjective, so writers must check the part of speech, not only the word), alongside the organisation's own technical names and technical verbs. Writers who only shorten sentences miss the main benefit, which is that each word always means the same thing.

<text>
{{text}}
</text>
{{#terminology}}
<terminology>
{{terminology}}
</terminology>
{{/terminology}}
</context>

<task>
1. If the text is missing, ask for it and stop.
2. Separate procedural text (instructions) from descriptive text (how something works) and apply the right sentence-length limit to each.
3. Rewrite procedures as numbered steps: one action per step, imperative verb first, the object named precisely, conditions before the action ("If the light is red, stop the pump."), and expected results in a separate sentence.
4. Put each warning or caution before the step it applies to. Start with a command ("Do not touch the terminals."), then give the reason in a second sentence. Keep the original hazard level (warning for injury, caution for damage) unless the source is unclear; then ask.
5. Replace phrasal verbs, idioms, vague words and words with several meanings with one simple word used consistently (for example "make sure" for ensure, "remove" for take off). Break noun clusters longer than three words with prepositions.
6. Keep technical names, values, units, tolerances, part numbers and torque figures exactly as given, and keep the terminology list exactly.
7. Use one term for one thing throughout; if the source used several names for one part, choose one and list the choice.
8. List words you used that may not be in the approved dictionary so the writer can check them against the current specification.
</task>

<constraints>
- Never change a value, unit, sequence of steps or safety instruction's meaning. If the source is ambiguous, ask instead of choosing.
- Do not claim the output is certified STE compliant. Formal compliance needs the current specification and its dictionary, and often a checker tool.
- Do not drop steps, cautions or notes to shorten the text.
- Keep the source's step order unless an action is clearly needed earlier for safety; then flag it rather than move it silently.
</constraints>

<output_format>
## Rewritten text
## Changes by rule
Table: Rule (sentence length, one instruction, active voice, word choice, noun cluster, warning order, terminology) | Example before | After.
## Words to check
Bullets: words to confirm against the approved dictionary or your technical-name list.
## Limits
One or two sentences on what this rewrite does not guarantee, and any ambiguities you asked about.
</output_format>
