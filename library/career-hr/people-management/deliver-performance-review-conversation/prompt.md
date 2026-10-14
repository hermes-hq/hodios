---
schema: 1
id: deliver-performance-review-conversation
kind: prompt
title: Deliver a performance review in person
description: Plans the performance review meeting itself - the opening, delivering the rating, discussing evidence, handling disagreement or upset, and agreeing next steps and a written record.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [document, notes]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [review-meeting, rating-delivery, hard-conversations, appraisal, next-steps]
pairs_with:
  prompts: [write-performance-review, set-goals-for-direct-report, handle-defensive-employee]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: review
    description: The written review or its summary - the rating, the main strengths and gaps with examples, and goals for next period.
    type: text
    required: true
  - name: expected_reaction
    description: How you expect the person to react (for example they think they deserve a higher rating, they are anxious, this is their first review), and anything about pay or promotion tied to the rating. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before the meeting, Opening and the rating, Walking through the evidence, Their view, If they disagree or get upset, Next steps and close, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers through the review meeting, which is where most of a review's value is won or lost. Common mistakes: burying the rating at the end so the person spends the whole meeting anxious, reading the document aloud, padding criticism between praise until the message disappears, debating the rating as if it were negotiable when it has been calibrated, or promising to "see what I can do" without meaning it. A good meeting lets the person read the review beforehand (if the company allows), states the rating early and plainly, spends most of the time on two or three themes with examples, listens properly to their view, and ends with agreed goals and support. The person should leave knowing where they stand, why, and what to do next. Nothing in the meeting should surprise them; if it would, the manager has a feedback gap to own.

<review>
{{review}}
</review>
{{#expected_reaction}}Expected reaction and context: {{expected_reaction}}{{/expected_reaction}}
</context>

<task>
1. Before the meeting: whether to share the written review in advance (and how long before), timing and setting, length (45 to 60 minutes), and a check: is anything in the review a surprise to the person? If so, say how to acknowledge that honestly.
2. Opening and the rating: the first two minutes, including the rating stated plainly with a one-sentence reason. No compliment sandwich.
3. Walking through the evidence: two or three themes from the review, each with an example and its impact, phrased for speaking, not reading.
4. Their view: questions that invite their perspective and what they would add, and how to show you have listened.
5. If they disagree or get upset: lines for disagreement with the rating (explain process, take new evidence seriously, what can and cannot change), tears, silence, anger, and questions about pay or promotion the manager cannot answer yet. Say how the formal appeal or rebuttal route works if the company has one, marked [X] if unknown.
6. Next steps and close: agreeing goals and support for the next period, and a closing line that is honest and forward-looking.
7. After the meeting: a short follow-up note summarising what was discussed and agreed, and what to record.
</task>

<constraints>
- Use only the content of the review given; do not add new criticism or evidence.
- Do not change the rating in the meeting or hint that it is negotiable if it has been calibrated; new evidence is taken away and considered through the proper process.
- Do not promise pay, bonus or promotion outcomes not already confirmed. Mark them [X].
- Describe work and behaviour, not personality.
</constraints>

<output_format>
## Before the meeting
## Opening and the rating
## Walking through the evidence
## Their view
## If they disagree or get upset
Table: If they… | You say….
## Next steps and close
## After the meeting
</output_format>
