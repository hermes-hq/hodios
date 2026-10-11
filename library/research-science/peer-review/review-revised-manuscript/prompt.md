---
schema: 1
id: review-revised-manuscript
kind: prompt
title: Review a revised manuscript
description: Reviews a revised manuscript in a second or later round by checking each earlier comment against the authors' response and the revised text, and flags new problems the revision introduced.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [revise-and-resubmit, second-round-review, response-letter, manuscript]
pairs_with:
  prompts: [write-peer-review, respond-to-reviewers, write-meta-review]
  personas: [peer-reviewer]
args:
  - name: my_previous_review
    description: Your report from the earlier round, in full.
    type: text
    required: true
  - name: response_letter
    description: The authors' point-by-point response.
    type: text
    required: true
  - name: revised_text
    description: The revised manuscript, or the changed passages with tracked changes. Paste what you were sent.
    type: text
    required: true
  - name: other_reviews
    description: Other reviewers' earlier comments and the editor's letter, if the venue shares them.
    type: text
output_contract:
  format: markdown
  sections: [Status of previous comments, Claims in the response not found in the text, New issues from the revision, Remaining major issues, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A second-round review has a narrower job than the first: decide whether the authors dealt with the issues raised, not re-review the paper from scratch or raise points that could have been raised the first time. Good second-round reviewers check the response letter against the actual text, because responses sometimes describe changes that never made it into the manuscript, soften a claim in the letter but not in the abstract, or add an analysis that answers a different question. Revisions also introduce new problems: a new analysis with its own flaws, numbers that no longer match between abstract, tables and text, or a reframed contribution. A reasonable rebuttal deserves acceptance even if you would have done it differently. Editors dislike reviewers who move the goalposts.
</context>

<task>
Review this revision.
<previous_review>
{{my_previous_review}}
</previous_review>
<response_letter>
{{response_letter}}
</response_letter>
<revised_text>
{{revised_text}}
</revised_text>
{{#other_reviews}}
<other_reviews>
{{other_reviews}}
</other_reviews>
{{/other_reviews}}

1. List every comment from my previous review, numbered as in the original.
2. For each, find the authors' response and the corresponding change in the revised text. Classify it: resolved, partly resolved, rebutted reasonably, rebutted unconvincingly, or not addressed.
3. Flag any response that claims a change you cannot find in the revised text, quoting the claim and naming where you looked.
4. Check consistency after revision: abstract, results, tables, figures and conclusions still agree, and softened claims are softened everywhere.
5. Review only the new or changed material for new problems, for example a new analysis, new data or a reframed contribution.
6. Decide what still blocks publication and recommend accept, minor revision, major revision or reject.
</task>

<constraints>
- Do not raise new issues about unchanged material unless they are serious enough to change the conclusions; if you do, label them clearly as new and explain why they were not raised before.
- Accept a reasonable rebuttal even if you disagree on taste; reserve "unconvincing" for rebuttals that leave a conclusion unsupported.
- Quote the response and the revised text when judging; never assume a change was made or not made without looking.
- If only part of the revised manuscript was provided, say which comments cannot be checked.
- Start with one line reminding the reviewer that the manuscript is confidential and to check the venue's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Status of previous comments
A table: comment | response summary | where in the text | status | note.
## Claims in the response not found in the text
Bullets with quotes, or "None found".
## New issues from the revision
Numbered: location, problem, why it matters, what would resolve it.
## Remaining major issues
Numbered, or "None".
## Recommendation
The recommendation and the deciding reasons in two or three sentences.
</output_format>
