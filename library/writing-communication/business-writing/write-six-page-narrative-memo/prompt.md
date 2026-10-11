---
schema: 1
id: write-six-page-narrative-memo
kind: prompt
title: Write a six-page narrative memo
description: Writes a narrative memo in the six-page style, with context, tenets, analysis, a proposal and an FAQ appendix, for a meeting that starts with silent reading.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [product-manager, manager, executive, engineering-manager]
requires: [none]
inputs: [notes, text, document]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [narrative-memo, six-pager, read-first-meeting, tenets, faq]
pairs_with:
  prompts: [write-decision-memo, write-executive-summary, write-project-proposal]
  personas: [editor]
args:
  - name: topic_and_material
    description: What the memo proposes or examines and everything you have on it, such as data, customer evidence, previous decisions, constraints, costs and the options you weighed.
    type: text
    required: true
  - name: audience_and_ask
    description: Who will read it in the meeting and what you need from them at the end, for example "VP and directors; approve funding for two teams for H1".
    type: string
    required: true
  - name: memo_type
    description: The kind of narrative.
    type: enum
    enum: [proposal, annual-plan, business-review, post-mortem]
    default: proposal
output_contract:
  format: markdown
  sections: [Memo, FAQ appendix, Weak spots, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The narrative memo replaces slides with up to six pages of full sentences, read silently at the start of the meeting. It works because prose forces the author to connect claims with "because" and "therefore", which bullets let them skip. Readers in these meetings are trained to hunt for weak spots: unsupported adjectives ("significant", "many customers"), numbers without a baseline or source, alternatives that were never considered, and an ask that only appears on the last page. Strong memos state the ask early, use tenets (short beliefs that guide the choice) to make trade-offs explicit, show data in context (against plan, last year, or a peer), answer the obvious objections in an FAQ appendix, and stay readable by someone new to the topic.
</context>

<task>
Write a narrative memo of type {{memo_type}} for: {{audience_and_ask}}

<material>
{{topic_and_material}}
</material>

1. If the material holds no facts or evidence to build a narrative on, or the ask is unclear, ask up to three short questions and stop.
2. Open with a paragraph that states the purpose of the memo and the ask in plain words, so a reader knows by line five what they will be asked to decide.
3. Write the context: the situation, who the customer or user is, the problem and its size, using figures from the material with a baseline or comparison for each.
4. Write three to six tenets as short, opinionated statements the proposal follows ("We prefer reversible decisions over fast ones"), each one a real trade-off rather than a platitude. Skip this for a post-mortem.
5. Analysis: what the evidence says, alternatives considered and why each was rejected, and the risks. For a business review, results against plan with causes; for a post-mortem, the timeline, root causes and contributing factors without blame.
6. Proposal or plan: what will be done, by whom, the cost or resources, milestones, and how success will be measured with specific metrics.
7. Close with the specific decisions the audience is asked to make.
8. Write an FAQ appendix of six to ten hard questions a sceptical reader would ask, each with a direct answer from the material or an honest "we do not know yet, and here is how we will find out".
9. Separately list the weak spots: claims you could only support weakly, where the narrative relies on an assumption.
</task>

<constraints>
- Full paragraphs in the memo body. Bullets only for the tenets and lists of metrics or milestones; tables only for data.
- Under six pages (about 3,000 words) for the body; the FAQ appendix does not count.
- No weasel words: replace "significant", "nearly all", "soon" with figures and dates from the material, or mark `[NEEDED: …]`.
- Never invent data, customer quotes, costs or dates. Every number traces to the material.
- Present rejected alternatives fairly; a memo with no serious alternatives will be sent back.
</constraints>

<output_format>
## Memo
Title, author placeholder, date; then the narrative with short headings (Purpose, Context, Tenets, Analysis, Proposal, Decisions needed).
## FAQ appendix
Numbered question and answer pairs.
## Weak spots
Bullets the author should shore up before the meeting.
## Gaps to fill
Each `[NEEDED: …]` with what it is. "None" if none.
</output_format>
