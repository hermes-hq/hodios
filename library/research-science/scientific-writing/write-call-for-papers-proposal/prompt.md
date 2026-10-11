---
schema: 1
id: write-call-for-papers-proposal
kind: prompt
title: Write a conference paper proposal for a call for papers
description: Writes a conference paper proposal or abstract answering a call for papers for work in progress, matching the theme, word limit and review criteria without overpromising results.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [call-for-papers, conference-abstract, work-in-progress, academic-conferences, panel-proposal]
pairs_with:
  prompts: [write-abstract, plan-research-talk, design-research-poster]
args:
  - name: cfp
    description: The call for papers text, including theme, strands, word limit, required fields and review criteria.
    type: text
    required: true
  - name: work
    description: Your project, its question, sources or data, method, what is done so far and what you expect to have by the conference.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Proposal, Fit with the call, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many conferences, especially in the humanities, social sciences and education, select papers from short proposals (often 250 to 500 words) written months before the work is finished. Programme committees score them quickly on fit with the theme, a clear question or argument, a credible method or source base, and a contribution the audience will care about. Strong proposals name the question in the first two sentences, say what material and approach are used, state the argument or expected contribution with appropriate tentativeness ("I will argue", "preliminary analysis suggests"), and connect explicitly to the call's theme in its own terms. Weak ones restate the call, describe a topic without a claim, promise findings not yet obtained as if certain, or overrun the word limit. Results described in a proposal must be what the author can honestly present at the conference.
</context>

<task>
Write a proposal for this call:
<cfp>
{{cfp}}
</cfp>
<work>
{{work}}
</work>

1. Extract from the call: theme and strands, word limit, required fields (title, keywords, bio, strand choice) and stated review criteria.
2. Choose the best-fitting strand and say why.
3. Write a title that signals the topic and the argument.
4. Write the proposal: question and why it matters, material and method, the argument or expected contribution with honest tentativeness for unfinished work, and the explicit link to the theme.
5. Fill any other required fields from what the author supplied, with placeholders for missing ones.
6. Check the word count against the limit and give it.
</task>

<constraints>
- Do not present expected results as findings; distinguish completed analysis from planned work.
- Do not invent data, sources or citations; use placeholders.
- Stay within the word limit.
- Echo the call's theme with substance, not by repeating its keywords.
</constraints>

<output_format>
## Proposal
Title, strand, the proposal text and any other required fields, with the word count.
## Fit with the call
Bullets matching the proposal to each review criterion.
## Risks
What could weaken the proposal or the talk (unfinished analysis, scope), with how to handle each.
</output_format>
