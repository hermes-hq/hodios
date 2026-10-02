---
schema: 1
id: write-decision-memo
kind: prompt
title: Write a decision memo
description: Writes a one-page decision memo with the decision needed and by when, context, options with honest trade-offs, a recommendation and next steps. Use when asking a manager to approve something.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, product-manager, operations-manager, executive]
requires: [none]
inputs: [text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [decision-memo, options-analysis, recommendation, approval]
pairs_with:
  prompts: [write-executive-summary, write-project-proposal, write-escalation-email]
  personas: [editor]
args:
  - name: situation
    description: What needs deciding and why now, with the facts you have (costs, dates, numbers, constraints, who is affected, what happens if nobody decides).
    type: text
    required: true
  - name: options
    description: The options you are considering and what you lean toward, if you know. Leave empty to have options proposed from the situation.
    type: text
  - name: decision_maker
    description: Who decides and what they care about, for example "COO, cares about cost and customer churn" or "my manager, new to the project".
    type: string
output_contract:
  format: markdown
  sections: [Memo, Gaps to fill, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A decision memo exists to get a clear yes, no or choice from a busy person in a few minutes. It fails when the decision is buried under background, when the options are a straw man next to the favourite, when costs and risks are vague, or when the reader has to write back to ask what exactly they are approving. Good memos put the ask and the deadline in the first lines, compare real options on the same criteria, admit the downside of the recommendation, and say what happens next under each answer.
</context>

<task>
Write a one-page decision memo.

<situation>
{{situation}}
</situation>
{{#options}}
<options>
{{options}}
</options>
{{/options}}
{{#decision_maker}}Decision-maker: {{decision_maker}}{{/decision_maker}}

1. If you cannot tell what decision is needed, who makes it, or what the main option is, ask up to three short questions and stop.
2. State the decision as one question with a yes, no or choice answer, and the date it is needed by (with the reason for that date). If no date is given, mark `[NEEDED: decide-by date]`.
3. Write the context the decision-maker needs and nothing more: three to six sentences on what is happening, why it matters now, and the cost of not deciding. Fit it to what the decision-maker already knows and cares about.
4. Lay out two to four genuine options. Always include "do nothing" or "delay" if it is realistic. Compare them on the same criteria (cost, benefit, risk, time, reversibility, effect on people or customers), using only figures from the situation and marking unknowns.
5. Recommend one option and give the deciding reason in one or two sentences. Name its main downside and how it will be managed. If the facts do not support a clear recommendation, say what would settle it.
6. Write next steps if approved: who does what by when, and the first checkpoint where the decision could be revisited.
</task>

<constraints>
- One page: about 350 to 500 words for the memo itself.
- Use only the facts supplied. Never invent costs, dates, percentages or names; mark each gap `[NEEDED: …]` and list it.
- Present options fairly. Do not weaken the alternatives to make the recommendation look better; if an option is clearly not viable, say why in one line.
- Plain, neutral language. No hype, no hedging, no "synergies". Numbers in figures, with units.
- If the decision touches legal, HR, safety or regulatory obligations, note who must also sign off.
</constraints>

<output_format>
## Memo
**To / From / Date / Decision needed by**
**Decision needed:** one question.
**Recommendation:** one sentence.
**Context:** short paragraph.
**Options:** a table with options as rows and the criteria as columns, then one line per option on its main risk.
**Why this recommendation:** two to four sentences, including its downside.
**Next steps if approved:** numbered, each with owner and date.
## Gaps to fill
Each `[NEEDED: …]` with what it is and where to get it. "None" if none.
## Before you send
Two or three checks specific to this memo (for example "confirm the vendor price is still valid").
</output_format>
