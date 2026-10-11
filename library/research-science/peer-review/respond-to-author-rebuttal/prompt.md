---
schema: 1
id: respond-to-author-rebuttal
kind: prompt
title: Respond to an author rebuttal as a reviewer
description: Helps a conference reviewer read the authors' rebuttal against their own review, decide which concerns are resolved, update the score honestly and write the discussion-phase reply.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher]
requires: [none]
inputs: [text]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [author-rebuttal, conference-review, discussion-phase, score-update]
pairs_with:
  prompts: [review-ml-conference-paper, write-conference-rebuttal, write-meta-review]
  personas: [peer-reviewer]
args:
  - name: my_review
    description: Your original review and scores.
    type: text
    required: true
  - name: rebuttal
    description: The authors' rebuttal, including the parts addressed to other reviewers if visible.
    type: text
    required: true
  - name: other_reviews
    description: Other reviewers' reviews and comments in the discussion, if visible.
    type: text
output_contract:
  format: markdown
  sections: [Concern status, Score decision, Reply to the authors, Note to the area chair]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Area chairs complain most about reviewers who ignore the rebuttal: no acknowledgement, no score change, no explanation. The reviewer's job in the discussion phase is to say, concern by concern, whether the response resolved it, and to update the score when the main reasons for it have gone, or to explain briefly why they have not. Common traps are anchoring on the first score, moving the goalposts with new concerns, being swayed by promises of camera-ready changes that cannot be checked, and treating a misreading the authors corrected as a matter of opinion. New results in a rebuttal deserve weight when the setup is clear and they address the concern directly.
</context>

<task>
Help me respond to this rebuttal.
<my_review>
{{my_review}}
</my_review>
<rebuttal>
{{rebuttal}}
</rebuttal>
{{#other_reviews}}
<other_reviews>
{{other_reviews}}
</other_reviews>
{{/other_reviews}}

1. List each concern from my review and classify the rebuttal's answer: resolved (with evidence), partly resolved, resolved by a credible commitment for the final version, not resolved, or my misreading corrected.
2. Note anything in the rebuttal or other reviews that raises a concern I missed, labelled as new and weighed honestly.
3. Decide whether the score should change: which of my reasons for the score remain, and what score follows. Explain if it should stay the same.
4. Write a short reply to the authors that acknowledges the rebuttal, states which concerns are resolved and which remain, and states the score change if any.
5. Write a brief note to the area chair if useful, for example on a disagreement with another reviewer.
</task>

<constraints>
- Do not move the goalposts: new concerns may be raised only if serious, and must be labelled as new.
- Give weight to new results only as described; if the setup is unclear, ask a specific question instead.
- If the authors correctly point out a misreading, acknowledge it plainly.
- Keep the reply short and courteous; no score threats or bargaining.
- The decision on the score is mine; present the reasoning and a suggested score, not a verdict on the paper's acceptance.
</constraints>

<output_format>
## Concern status
A table: concern | rebuttal answer | status | note.
## Score decision
Current score, suggested score, reasons.
## Reply to the authors
Ready to post.
## Note to the area chair
Short, or "None".
</output_format>
