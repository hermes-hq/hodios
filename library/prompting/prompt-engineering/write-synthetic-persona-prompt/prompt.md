---
schema: 1
id: write-synthetic-persona-prompt
kind: prompt
title: Write a synthetic customer persona prompt
description: Writes a prompt that simulates a target customer to give early feedback on ideas, copy or flows, grounded in supplied research, with clear caveats on what simulated feedback cannot tell you.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [discover, design]
role: [product-manager, marketer, founder, ux-researcher]
requires: [none]
inputs: [text, notes]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [synthetic-users, customer-simulation, early-feedback, research-grounding, reusable-prompt]
pairs_with:
  prompts: [build-user-personas, write-expert-panel-prompt, write-character-roleplay-prompt]
  personas: [prompt-engineer]
args:
  - name: customer
    description: Who the simulated customer is - segment, situation, goals and frustrations - in your own words.
    type: text
    required: true
  - name: evidence
    description: Research to ground the simulation - interview notes, survey answers, support tickets, reviews - with personal data removed. The thinner this is, the weaker the simulation.
    type: text
    required: true
  - name: test_material
    description: Optional - what you want feedback on (landing page copy, pricing table, onboarding steps, a feature idea).
    type: text
output_contract:
  format: markdown
  sections: [Grounding summary, Prompt, What this can and cannot tell you, Validation plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that simulate a target customer for quick early feedback. Simulated customers are useful for catching unclear copy, missing information and obvious objections before spending time with real people. They are poor at what matters most: whether people will actually pay, switch or change behaviour. Out of the box they are agreeable, articulate and generic: they like the idea, say what a typical person "should" say, and echo the framing of the question. Grounding helps: feed real quotes and data, make the persona speak only from that evidence, give them a current alternative and switching costs, ask about past behaviour ("what did you do last time") rather than future intent, ask for confusion and objections first, and have them say "I don't know" when the evidence does not cover something. The output is a list of hypotheses to check with real customers, never validation.

Customer: {{customer}}

<evidence>
{{evidence}}
</evidence>
{{#test_material}}

<test_material>
{{test_material}}
</test_material>
{{/test_material}}
</context>

<task>
1. Grounding summary: what the evidence supports about this customer (goals, current alternatives, pains, words they use, budget signals), each traced to the evidence, and the gaps where the simulation would be guessing.
2. Write the prompt. It tells the assistant to: answer in the first person as this customer, using only the grounding summary and the evidence; name which piece of evidence shapes each reaction; reply "the research doesn't tell me that" for anything outside it; start feedback with what is confusing or missing, then objections and switching costs, then anything appealing; compare against their current alternative; avoid politeness and enthusiasm by default; and never predict purchase rates or willingness to pay as facts.
3. What this can and cannot tell you: a short list of each, specific to the test material.
4. Validation plan: turn the simulated objections into three to five questions or quick tests with real customers (interview questions about past behaviour, a five-second test, a fake-door or pre-order test where appropriate).
</task>

<constraints>
- Never present simulated responses as real customer data, quotes or survey results in reports or marketing.
- Do not build personas from stereotypes about age, gender, ethnicity or nationality; ground traits in behaviour and evidence.
- If the evidence is too thin, say so and recommend gathering more before relying on the simulation.
- Model-agnostic; keep the prompt under about 400 words excluding evidence.
</constraints>

<output_format>
## Grounding summary
Table: Trait | Evidence.
Then a list of gaps.
## Prompt
In a fenced code block with [EVIDENCE] and [TEST_MATERIAL] placeholders.
## What this can and cannot tell you
Two short lists.
## Validation plan
Numbered steps.
</output_format>
