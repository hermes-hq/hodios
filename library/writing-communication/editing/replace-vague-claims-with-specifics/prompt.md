---
schema: 1
id: replace-vague-claims-with-specifics
kind: prompt
title: Replace vague claims with specifics
description: Flags buzzwords and abstract claims in a draft, such as "world-class", "significant impact" and "many customers", and replaces each with a concrete fact or example, asking for what it cannot know.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, marketer, job-seeker, founder]
requires: [none]
inputs: [text, document]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [specificity, buzzwords, show-dont-tell, evidence, credibility]
pairs_with:
  prompts: [calibrate-claim-strength, tighten-prose, critique-draft]
  personas: [editor]
args:
  - name: text
    description: The draft, such as a CV, proposal, web page, cover letter or report.
    type: text
    required: true
  - name: facts
    description: Optional facts you have available, such as numbers, client names you may mention, dates and examples.
    type: text
output_contract:
  format: markdown
  sections: [Vague claims found, Edited text, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers discount vague claims to zero. "Significant cost savings", "a proven track record", "world-class team", "many satisfied customers", "improved efficiency" could be said by anyone, so they prove nothing. The fix is a specific: a number with its unit and timeframe, a named example, a comparison, a concrete before and after, or a short description of what actually happened. A smaller true specific beats a bigger vague claim: "cut invoice processing from five days to two" persuades more than "transformed finance operations". The risk when an AI does this is fabrication: it invents the number that would make the sentence work. Every specific must come from the writer.
</context>

<task>
Find vague claims in this text and make them specific.

<text>
{{text}}
</text>
{{#facts}}
<facts>
{{facts}}
</facts>
{{/facts}}

1. If the text is empty, ask for it and stop.
2. Flag every vague claim: buzzwords and superlatives, unquantified amounts ("many", "significant", "substantial"), abstract outcomes ("improved efficiency"), unsupported credentials ("expert", "leading"), and empty adjectives.
3. For each, decide what specific would prove it: a number and timeframe, an example, a comparison, or a description of the actual action.
4. If the supplied facts or the text itself contain that specific, rewrite the claim with it.
5. If not, rewrite the sentence with a clear placeholder such as `[NUMBER: invoices per week before and after]` and add a question for the writer. If the claim cannot be supported at all, suggest cutting it.
6. Return the full edited text.
</task>

<constraints>
- Never invent numbers, names, clients, awards, dates or outcomes. Use only the text and the supplied facts.
- Do not upgrade a claim when adding a specific; if the fact is smaller than the claim, the claim shrinks to the fact.
- Keep the author's voice and the length roughly the same.
- Leave claims that are already specific alone.
</constraints>

<output_format>
## Vague claims found
A table: Claim (quoted) | Why it is vague | What would prove it | Fixed with supplied fact, placeholder, or cut.
## Edited text
The full edited text with placeholders where facts are needed.
## Questions for you
Numbered questions, one per placeholder. "None" if none.
</output_format>
