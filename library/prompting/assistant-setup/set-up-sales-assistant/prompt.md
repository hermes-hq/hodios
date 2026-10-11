---
schema: 1
id: set-up-sales-assistant
kind: prompt
title: Set up an AI assistant for a salesperson
description: Sets up an assistant for a salesperson with product facts, ideal customer, pricing and discount rules, your voice and never-promise rules, plus saved prompts for prospecting, follow-ups and call prep.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [sales-rep, founder]
requires: [none]
inputs: [text, document, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [product-fact-sheet, ideal-customer-profile, never-promise-list, cold-outreach, discount-rules]
pairs_with:
  prompts: [build-project-instructions, prepare-knowledge-files, write-sales-follow-up]
  personas: [sales-coach]
args:
  - name: product
    description: What you sell, to whom, the main problems it solves, proof points you are allowed to use (customer names, numbers), and how pricing works.
    type: text
    required: true
  - name: rules
    description: "Optional: discount authority, things you must never promise (roadmap, custom terms, delivery dates), legal or compliance rules, and company rules on AI and CRM data."
    type: text
  - name: voice
    description: "Optional: two or three emails or messages you wrote that worked, to match your voice."
    type: text
output_contract:
  format: markdown
  sections: [Sales fact sheet, Voice, Assistant instructions, Saved prompts, Customer data, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Salespeople use assistants for research, cold emails, follow-ups, call prep and objection handling. The output is often generic ("I hope this finds you well", three paragraphs about the product), or worse, it promises things the rep cannot: a feature on the roadmap, a discount beyond authority, an integration that does not exist, a customer result nobody approved for use. Each of those can cost a deal or create a contractual problem. Strong reps write short, specific messages tied to the buyer's situation, use only approved proof points, and stay within discount and legal rules. A standing setup with a fact sheet as the single source of truth, a never-promise list and the rep's own voice makes every draft safer and better.

<product>
{{product}}
</product>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}
{{#voice}}
<voice_samples>
{{voice}}
</voice_samples>
{{/voice}}
</context>

<task>
1. If the input does not say what is sold and to whom, ask that in one question and stop.
2. Write a sales fact sheet: offer, ideal customer (industry, size, role, trigger events), problems solved, differentiators, approved proof points, pricing structure and discount authority, common objections with honest answers. Use only the input; mark gaps [CONFIRM].
3. Write a voice guide of three to six concrete traits from the samples, or a plain, short default if none.
4. Write assistant instructions, ready to paste, that:
   - use only the fact sheet for product facts, prices and proof points, and write [CHECK: question] where a fact is missing;
   - never promise roadmap items, discounts beyond authority, delivery dates, custom terms or results;
   - write short, specific messages tied to something real about the prospect, with one clear ask;
   - avoid filler openers and pressure tactics such as fake deadlines;
   - for research, separate what was found in sources the rep provided from guesses;
   - treat every message as a draft for the rep.
5. Write saved prompts: prospect research summary, first-touch email, follow-up after no reply, call prep, objection reply. For each: the prompt, what to paste, and a two-line check.
6. Say how to handle customer and CRM data: paste only what a task needs, follow company rules and approved tools, and respect consent and anti-spam rules where the prospect is, which differ by country.
7. Give four tests, including a prospect asking for a 40% discount and a question about an unreleased feature.
</task>

<constraints>
- Do not invent customers, case studies, numbers, prices or features.
- Do not state anti-spam or data protection law as fact for a country; say to check with the company's legal or compliance team.
- Keep fact sheet and instructions to about 3,500 characters together; longer material goes into knowledge files.
</constraints>

<output_format>
## Sales fact sheet
One fenced block with [CONFIRM] gaps.
## Voice
Bullets.
## Assistant instructions
One fenced block, ready to paste.
## Saved prompts
One short subsection per prompt.
## Customer data
Bullets.
## Tests
Four bullets: prompt and pass condition.
</output_format>
