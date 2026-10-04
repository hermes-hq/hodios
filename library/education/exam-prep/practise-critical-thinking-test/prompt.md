---
schema: 1
id: practise-critical-thinking-test
kind: prompt
title: Practise a critical thinking test
description: Drills critical thinking test items on assumptions, flaws, conclusions and strengthening or weakening, in the style of tests such as the TSA or Watson-Glaser, with the logic behind each answer.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, job-seeker]
subject: [philosophy]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [argument-analysis, logical-flaws, admissions-test, aptitude-test, assumptions]
pairs_with:
  prompts: [practice-lsat-logical-reasoning, quiz-me-interactively]
args:
  - name: item_type
    description: Which item family to drill.
    type: enum
    enum: [assumption, flaw, conclusion, strengthen-weaken, mixed]
    default: mixed
  - name: questions
    description: Number of items in the set.
    type: number
    default: 10
  - name: format
    description: Answer format. five-option follows admissions-test style; graded follows graduate-recruitment style (such as true, probably true, insufficient data, probably false, false; or assumption made or not made).
    type: enum
    enum: [five-option, graded]
    default: five-option
output_contract:
  format: markdown
  sections: [Set review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Critical thinking tests present a short argument and ask about its logic, not its truth. The families: identify the main conclusion (not just the last sentence); find the unstated assumption the conclusion depends on; name the flaw (generalising from a sample, confusing correlation with cause, false dichotomy, circular reasoning, attacking the person, appeal to authority, assuming what is necessary is sufficient); and pick the statement that most strengthens or weakens. Candidates go wrong by using outside knowledge, choosing an answer that is true but irrelevant, or picking an assumption the argument does not need. A reliable check for assumptions is the negation test: if denying the statement breaks the argument, it is assumed.
</context>

<task>
1. Run {{questions}} original items of type `{{item_type}}` in `{{format}}` format. The graded format suits inference items (true, probably true, insufficient data, probably false, false) and assumption items (made or not made); for flaw, conclusion and strengthen-weaken items use five options even if graded was chosen, and say so once. Write each argument (60-120 words) on everyday, policy or science topics with no specialist knowledge needed. Solve privately, making sure exactly one option is best and each distractor fails for a nameable reason.
2. One item per message, labelled "Item k of {{questions}}", and wait.
3. After each answer:
   - Mark it.
   - Break down the argument: conclusion, premises, the gap.
   - Explain why the right answer is right with the relevant test (negation test, "if true, would it make the conclusion more likely?").
   - Say in one line why each wrong option fails: out of scope, too strong, true but irrelevant, reverses the logic, or assumes what is not needed.
4. Track the families and distractor types the student falls for. If they fall for the same trap twice, name the trap and give a 20-second check.
5. After the last item, give the review.
</task>

<constraints>
- Original items only; never reproduce published test questions.
- Keep arguments self-contained; tell the student to judge only what is on the page.
- If the student disputes an answer and their reasoning is sound, reconsider openly and correct if needed.
- Do not claim the items match any test exactly; say the format is a style approximation and point to the official practice materials.
</constraints>

<output_format>
Item: the argument, the question stem, options A-E (or the graded scale).

At the end:
## Set review
**Score:** x / {{questions}}.
Table: Item | Family | Result | Trap fallen for.
**Your traps:** the two most common, each with its check.
**Next set:** the family to drill next.
</output_format>
