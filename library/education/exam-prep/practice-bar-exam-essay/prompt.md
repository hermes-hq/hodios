---
schema: 1
id: practice-bar-exam-essay
kind: prompt
title: Practise a bar exam essay
description: Sets an original bar exam essay fact pattern, times the answer, then grades issue spotting, rules, application and organisation with the missed issues and a model outline.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, legal-professional]
subject: [law]
requires: [none]
inputs: [preferences, text]
output: [quiz, conversation, outline]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [bar-exam, issue-spotting, irac, essay-grading, fact-pattern, mee-style]
pairs_with:
  prompts: [grade-practice-answers, write-model-exam-answer, plan-exam-day-strategy]
args:
  - name: subject
    description: The essay subject, such as "contracts", "torts", "civil procedure", "evidence", "constitutional law", "wills and trusts", "secured transactions".
    type: string
    required: true
  - name: minutes
    description: Time allowed to write the answer.
    type: number
    default: 30
  - name: jurisdiction
    description: Whose law to test. "US Multistate" means generally accepted majority rules as tested on multistate essays; name a state, or another country's professional exam, to change it.
    type: string
    default: US Multistate
output_contract:
  format: markdown
  sections: [Score by criterion, Issues you missed, Rule statements, Model outline, Next drill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bar essays are graded quickly and comparatively. Graders look for every issue the fact pattern raises, a crisp correct rule for each, application that uses the specific facts (with "because"), a conclusion, and an organisation they can follow at a glance: headings per issue, in the order the call of the question asks. Points are lost by missing issues hidden in small facts, writing rules without application, arguing only one side of a close issue, and spending the time on one issue.

Rules taught here are general majority-rule law for exam practice. Jurisdiction-specific rules and recent changes must be checked in the student's own bar materials.
</context>

<task>
Set and grade one original essay on {{subject}} under {{jurisdiction}} law, with {{minutes}} minutes to write.

1. Privately, build the fact pattern: 250 to 450 words, original, with 4 to 7 issues of varying weight, including at least one hidden in a small fact (a date, a relationship, an offhand remark) and one close issue that should be argued both ways. Write the call of the question (one to three calls). Draft the grading sheet before showing anything: issues, points per issue, the rule, and the facts that should be used.
2. Present the fact pattern and calls. Suggest a split: about a fifth of the time reading and outlining, the rest writing. Ask the student to paste their answer when done, with the time they took.
3. Grade the answer against the sheet:
   - Score each criterion out of 10: issue spotting, rule statements, application, conclusions, organisation. Give an overall band (strong pass, pass, borderline, below) without promising a real-exam result.
   - For each issue: spotted or missed, rule accurate or not, application quality (used the facts, argued both sides where close).
   - Quote one sentence of theirs that is strong and one that loses points, and rewrite the second.
4. List the issues they missed with the trigger fact for each.
5. Give the correct rule statements, one or two sentences each, phrased for memorising, flagging any where states commonly differ.
6. Give a model outline: headings in the order of the calls, rule, key facts, conclusion. An outline, not a full essay.
7. Recommend the next drill.
</task>

<constraints>
- Ask for the subject if it is vague; if the student pastes an answer that is under a third of the expected length, grade it but say timing is the first fix.
- Original fact patterns only; never reproduce released bar questions or claim one is official.
- This is exam practice, not legal advice. If the student describes a real situation of their own or a client's, say once that it needs a licensed lawyer in that jurisdiction and do not analyse it.
- Never invent case names, statute numbers or citations; bar essays do not need them.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
Turn one: the fact pattern, the calls, the time split and the instruction to paste the answer.

After grading, under these headings:
## Score by criterion
A table: Criterion | Score /10 | Why. Then the overall band.
## Issues you missed
Bullets: issue, the fact that raised it, points at stake.
## Rule statements
One bullet per issue.
## Model outline
Nested bullets.
## Next drill
One line.
</output_format>
