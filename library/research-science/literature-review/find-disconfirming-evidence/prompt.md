---
schema: 1
id: find-disconfirming-evidence
kind: prompt
title: Search for evidence against your hypothesis
description: Plans searches for studies that contradict the user's hypothesis or favoured view, sets out what would count against it in advance, and weighs what turns up fairly.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, review]
role: [researcher, student]
requires: [none]
inputs: [text, notes]
output: [plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [confirmation-bias, counterevidence, null-results, search-strategy]
pairs_with:
  prompts: [reconcile-conflicting-studies, build-search-string, find-research-gaps]
  personas: [research-methodologist]
args:
  - name: hypothesis
    description: The claim or view you hold, as precisely as you can, for example "four-day weeks raise productivity in knowledge work".
    type: text
    required: true
  - name: evidence_so_far
    description: The sources supporting it that you already have, briefly, so the search targets what they might have missed.
    type: text
  - name: found
    description: Contradicting or null studies you have found, with abstracts or results, if you want them weighed.
    type: text
output_contract:
  format: markdown
  sections: [The claim and what would refute it, Rival explanations, Search plan, Weighing what you find, Commitments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Researchers search with the words of their own hypothesis and find what agrees with it. Publication bias makes this worse: null and negative results are published less, later and in lower-profile places, and replication failures are often buried in comments, letters or preprints. Deliberately seeking disconfirming evidence is a standard defence. It works best when the claim is stated precisely enough to be wrong, when the searcher decides in advance what result would count against it, and when the search uses the language of the alternative (no effect, null, failed to replicate, harms, reverse direction, boundary conditions) and the places null results hide: trial and study registries, preprint servers, theses, comment and correspondence sections, and meta-analyses that test for small-study effects. Disconfirming evidence is weighed by quality and fit, not by count; one strong null trial can outweigh several small positive studies, and one weak contrary study does not refute a body of good work.
</context>

<task>
Help me look for evidence against this hypothesis:
<hypothesis>
{{hypothesis}}
</hypothesis>
{{#evidence_so_far}}
Evidence I already have for it:
{{evidence_so_far}}
{{/evidence_so_far}}
{{#found}}
Contrary or null evidence I found:
<found>
{{found}}
</found>
{{/found}}

1. Restate the hypothesis precisely (population, conditions, direction, size) and list the predictions it makes that could fail.
2. State what findings would count against it: no effect with adequate power, effect in the other direction, effect only under narrow conditions, a confounder that explains it away, harms that offset it.
3. List rival explanations for the supporting evidence (confounding, selection, reverse causation, measurement artefacts, publication bias, a novelty or Hawthorne effect).
4. Give a search plan aimed at disconfirmation: search strings using the language of null and contrary results, the specific places null results hide, citation chasing from critical commentaries, and searching for who has argued the opposite.
5. If contrary evidence is given, weigh it: design, size, relevance to the precise hypothesis, risk of bias, and whether it contradicts the claim or only a broader or narrower version of it.
6. Give an honest verdict on what the user's current position can claim, and write down commitments: what result from the search would make them narrow or drop the hypothesis.
</task>

<constraints>
- Do not cite specific studies from memory as fact. Name likely contrary sources only as leads marked "(verify)".
- Do not strawman the hypothesis or the opposing view. State each in its strongest form.
- Weigh evidence by quality and fit, never by counting studies on each side.
- If the hypothesis is too vague to be wrong (for example "social media is bad"), make it testable first and ask the user to confirm the version to test.
- Keep the verdict proportionate; "the evidence is mixed" is acceptable only if you say what it is mixed about.
</constraints>

<output_format>
## The claim and what would refute it
The precise claim, then bullets of refuting findings.
## Rival explanations
Bullets.
## Search plan
Where to search, then search strings in a code block.
## Weighing what you find
Table if evidence was given: source | design | contradicts what exactly | weight; otherwise rules for weighing.
## Commitments
Two to four sentences: current verdict and what would change it.
</output_format>
