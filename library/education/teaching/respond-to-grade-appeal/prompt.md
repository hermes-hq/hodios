---
schema: 1
id: respond-to-grade-appeal
kind: prompt
title: Respond to a grade appeal
description: Drafts a teacher's or lecturer's reply to a grade appeal or complaint that explains the marking with evidence, acknowledges valid points and states the next steps in the process.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [message, notes, document]
output: [message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [grade-appeal, marking, student-complaint, reply-drafting, assessment-fairness]
pairs_with:
  prompts: [create-rubric, write-parent-email, build-feedback-comment-bank]
  personas: [instructional-coach]
args:
  - name: appeal
    description: The student's (or parent's) appeal or complaint, as received.
    type: text
    required: true
  - name: marking_rationale
    description: How the work was marked - the rubric or criteria, the marks per criterion and your comments, and anything notable about the submission.
    type: text
    required: true
  - name: policy
    description: Optional appeal or review policy - deadlines, grounds for appeal, who reviews and how to escalate.
    type: text
output_contract:
  format: markdown
  sections: [Assessment of the appeal, Draft reply, Notes for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good reply to a grade appeal is fair before it is persuasive. It takes the student's points one by one, checks each against the criteria and the work, admits errors (an arithmetic mistake, a criterion misapplied, feedback that was unclear) and corrects them, and explains academic judgement in terms of the published criteria rather than authority. It separates a disagreement about academic judgement, which most policies do not treat as grounds for appeal, from a procedural error, which they do. Tone matters: calm, respectful, specific and short enough to read. A reply should never reveal other students' marks or work.
</context>

<task>
Help me respond to this appeal.

<appeal>
{{appeal}}
</appeal>

<marking_rationale>
{{marking_rationale}}
</marking_rationale>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. **Assess the appeal privately first.** List each point the student makes. For each, check it against the marking rationale and say whether it is valid, partly valid or not supported, with the evidence. Note any marking error you can see (arithmetic, a criterion not applied, comments that contradict the mark). If the marking rationale is too thin to judge a point (no criteria, no per-criterion marks), say what you need and do not guess.
2. Classify the appeal: academic judgement, procedural or administrative error, extenuating circumstances, or a mix. If a policy was given, say whether the stated grounds fit it and note any deadline.
3. Recommend: uphold the mark, adjust it (by how much and why), or refer it on (second marker, head of department, appeals panel). If the mark was moderated, second-marked or already published, route any change through the moderation or second-marking step the policy sets instead of changing it alone, and say so in the reply.
4. **Draft the reply** to the student, matching the recommendation:
   - thank them and restate their concern in one sentence, neutrally;
   - respond to each point with reference to the criteria and specific parts of their work;
   - acknowledge what was valid and say what has been corrected, if anything;
   - give 1 or 2 concrete things that would raise the mark next time;
   - state the next step in the process (how to request a formal review, by when, and to whom), using the policy if given or a placeholder if not.
5. Flag in your notes anything that should not be handled by a reply alone: an allegation of bias or discrimination, a welfare concern, a disability-related adjustment that was not applied, or a threat. Say who should be told.
</task>

<constraints>
- Do not change the grade in the draft unless the assessment found an actual error or misapplied criterion; do not cave to pressure, and do not dig in on a real mistake.
- Never mention or compare other students' marks or work.
- Keep the reply under about 300 words, in plain, non-defensive language; no sarcasm, no legal threats, no "as I already explained".
- Do not invent policy, deadlines or names; use placeholders like [review deadline] where the policy is missing.
- If the appeal comes from a parent, adjust the address and keep the student's privacy and the institution's rules on parent contact in mind (for university students, do not discuss marks with a parent without the student's consent).
</constraints>

<output_format>
## Assessment of the appeal
Table: Student's point | Verdict (valid / partly / not supported) | Evidence. Then classification and recommendation.
## Draft reply
The message, ready to send after review.
## Notes for you
Bullets: anything to escalate, record or double-check.
</output_format>
