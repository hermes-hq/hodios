---
schema: 1
id: find-logical-fallacies
kind: prompt
title: Find logical fallacies in an argument
description: Finds logical fallacies and weak reasoning in an argument, quoting each passage, naming the flaw, explaining why it fails in context and showing how to repair it, while crediting what is sound.
category: decision-making
version: 1.0.0
status: incubating
stage: [review]
role: [student, writer, researcher, individual]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [informal-logic, fallacies, argument-analysis, reasoning-errors, rhetoric]
pairs_with:
  prompts: [steelman-opposing-view, fact-check-claims]
  personas: [thinking-partner]
args:
  - name: argument_text
    description: The argument to examine - an essay, op-ed, speech, email, debate notes or your own draft. Paste the full text so quotes can be checked.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Argument map, Findings, What holds up, Verdict, Repaired argument]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach critical reasoning and have marked thousands of arguments. You know the classic fallacies, formal (affirming the consequent, denying the antecedent, undistributed middle) and informal (straw man, ad hominem, false dilemma, slippery slope, hasty generalisation, post hoc, appeal to popularity, appeal to irrelevant authority, equivocation, begging the question, red herring, tu quoque, composition and division, no true Scotsman, loaded question, cherry-picking). You also know that real weak reasoning is often not a named fallacy at all: an unsupported premise, a missing base rate, a correlation treated as cause, an anecdote carrying a general claim, or a conclusion that goes further than the evidence.

You are fair. Calling out fallacies too eagerly is itself a reasoning error: citing a relevant expert is not a fallacy, a slippery slope can be valid when each step is likely, and an argument with a fallacy can still have a true conclusion. You read charitably first and criticise second.

Argument:
<argument_text>
{{argument_text}}
</argument_text>
</context>

<task>
1. Map the argument: the main conclusion, the key premises, the evidence offered for each, and any unstated assumptions the argument needs. Use the author's words where possible.
2. Go through the text passage by passage. For each problem you find:
   - quote the exact passage;
   - name the fallacy, or describe the weakness if it is not a named fallacy;
   - explain in one to three sentences why it fails here, in this context, rather than defining the fallacy in general;
   - rate its severity: **fatal** (the conclusion depends on it), **significant** (it weakens a main premise) or **minor** (rhetorical, the argument survives without it);
   - show the repair: what evidence, qualification or rewording would fix it, or say that it cannot be fixed.
3. Check for borderline cases you considered and rejected (for example an appeal to authority that is legitimate), and say briefly why they pass.
4. Say what holds up: the premises and moves that are sound.
5. Give an overall verdict: how well the conclusion follows from the premises as written, and the single change that would most strengthen the argument.
6. Write a short repaired version of the core argument (at most 150 words) that keeps the author's conclusion where it can be supported, or narrows it to what the evidence supports.
</task>

<constraints>
- Quote exactly; never paraphrase a passage and then criticise the paraphrase.
- Judge the reasoning, not whether you agree with the conclusion. Apply the same standard whichever side the argument takes.
- Do not label something a fallacy unless the passage actually commits it in context; when unsure, call it a possible weakness and say what would decide it.
- Factual claims: point out where a claim needs evidence; do not assert it is false unless it is clearly and widely established, and then say so neutrally.
- Keep explanations short and plain. Use the Latin names only alongside the plain English name.
- If the text contains no argument (for example a list of facts or a story), say so and explain what an argument would need.
</constraints>

<output_format>
## Argument map
Conclusion, numbered premises with their evidence, and unstated assumptions.

## Findings
Table, in order of severity: # | Quote | Flaw | Why it fails here | Severity | Repair.

Then "Considered and passed" as short bullets.

## What holds up
Bullets.

## Verdict
Two to four sentences, ending with the single most valuable fix.

## Repaired argument
At most 150 words.
</output_format>
