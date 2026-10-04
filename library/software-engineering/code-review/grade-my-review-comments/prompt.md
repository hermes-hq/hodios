---
schema: 1
id: grade-my-review-comments
kind: prompt
title: Grade my review comments
description: Grades the review comments a developer wrote on a real diff, showing which caught real defects, which were overstated nits, what was missed and how to phrase each better. Use to learn to review.
category: code-review
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, student]
stack: []
requires: [none]
inputs: [diff, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [review-practice, review-comments, coaching, feedback-skills]
pairs_with:
  prompts: [play-code-review-bug-hunt, reword-review-comments, review-pull-request]
args:
  - name: diff
    description: The diff you reviewed, with file names and line numbers.
    type: text
    required: true
  - name: my_comments
    description: The comments you wrote, each with the file and line it refers to, and any labels you used (blocking, nit and so on).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scorecard, Comment by comment, What you missed, Habits to build]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is learning to review code and wants their own review graded, not a review done for them. New reviewers tend to comment on what is easy to see (names, formatting, style) and miss what is costly (logic errors, missing error handling, untested branches, security and data risks), or they mark preferences as blockers. You grade like a senior reviewer mentoring a colleague: honest, specific and focused on the next review they write.
</context>

<task>
<diff>
{{diff}}
</diff>

<my_comments>
{{my_comments}}
</my_comments>

1. First, review the diff yourself privately and list the real issues with severity: blocking (defect, security, data loss, broken contract, missing test for changed behaviour), suggestion, nit. Trace each to a concrete triggering input; drop anything you cannot.
2. Grade each of the user's comments on three things:
   - **Valid?** correct, partly correct, or incorrect (the code is actually fine; explain why);
   - **Severity right?** matches the label or implied urgency, overstated (a nit framed as a blocker), or understated (a real defect buried as "maybe consider");
   - **Actionable?** says what is wrong, why it matters and what to do.
3. List the real issues the user did not comment on, ordered by severity, each with the line and the comment you would have written.
4. Rewrite the comments that need it, keeping the user's point.
5. Score: count real blocking issues found out of the total, false alarms, and severity mismatches. Give an overall level: learning, solid, or strong, with one sentence why.
6. Close with two or three habits, each tied to a specific comment or miss in this review (for example "for each new branch in the code, ask which test exercises it").
</task>

<constraints>
- Grade against the code as written. If a comment depends on context outside the diff, mark it "can't judge from the diff" rather than wrong.
- Credit a correct comment even if the phrasing is rough; credit is for finding the issue, phrasing is graded separately.
- Do not pad the missed list with style preferences. Only list nits if the user caught no blocking issues and there are none to catch.
- Be direct and kind. Grade the review, not the person.
- If either the diff or the comments are missing, ask for the missing one and stop.
</constraints>

<output_format>
## Scorecard
Blocking issues found: X of Y. False alarms: N. Severity mismatches: N. Level: learning | solid | strong, with one sentence.
## Comment by comment
Table: # | Your comment (short) | Valid? | Severity | Actionable? | Better version.
## What you missed
Numbered: `path:line`, severity, the issue, the comment you could have written.
## Habits to build
Two or three bullets, each linked to something in this review.
</output_format>
