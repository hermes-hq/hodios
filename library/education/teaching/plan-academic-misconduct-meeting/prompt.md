---
schema: 1
id: plan-academic-misconduct-meeting
kind: prompt
title: Plan an academic misconduct conversation
description: Plans a fair conversation with a student suspected of plagiarism or undisclosed AI use, with an evidence review, open questions, a meeting script and the process to follow afterwards.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, review]
role: [teacher]
requires: [none]
inputs: [notes, document]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [academic-integrity, plagiarism, ai-use, student-meeting, due-process, fairness]
pairs_with:
  prompts: [design-ai-resistant-assignment, respond-to-grade-appeal]
  personas: [instructional-coach]
args:
  - name: evidence
    description: What raised the concern - similarity report matches, sources found, inconsistencies with earlier work, fabricated references, style shifts, any detector score - described factually.
    type: text
    required: true
  - name: policy
    description: Optional academic integrity policy - what counts as misconduct, who decides, the student's rights, required steps and possible outcomes.
    type: text
  - name: student_context
    description: Optional relevant context - year, first language, known adjustments or disabilities, prior concerns, wellbeing issues.
    type: text
output_contract:
  format: markdown
  sections: [Evidence review, Before the meeting, Meeting plan, Questions, During the meeting, After the meeting, Record template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A misconduct conversation is an inquiry, not a verdict. The student may have cheated, may have misunderstood the rules, may have poor referencing skills, or may have done nothing wrong. Fairness means going in with an open mind, sharing the concern and the evidence, asking open questions that let the student show their knowledge of the work and their process, and following the institution's procedure exactly, because procedural mistakes can void an outcome. AI-text detector scores are unreliable, produce false positives (especially for non-native writers), and should never be the sole basis for an allegation. Strong evidence is concrete: copied passages with sources, references that do not exist, content the student cannot explain, or a process history that does not match the submission.
</context>

<task>
Plan my conversation with the student.

<evidence>
{{evidence}}
</evidence>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

{{#student_context}}
<student_context>
{{student_context}}
</student_context>
{{/student_context}}

1. **Evidence review:** rate each piece of evidence as strong, moderate or weak, with why, and list innocent explanations to keep in mind (common knowledge, shared notes, permitted tools, a language-support tool, poor citation practice). Say whether the evidence justifies a formal process, an informal conversation, or no action. If a detector score is the only evidence, say clearly that it is not enough on its own and suggest what else to look at. If you recommend no action, stop after the evidence review and say what new evidence would change that.
2. **Before the meeting:** what to prepare (the work, sources side by side, drafts or version history if available, the policy), whether the policy requires written notice, the student's right to be accompanied or supported, a quiet private space, and whether this conversation is permitted by the policy or must go straight to a formal panel. If no policy was given, list what to check in the institution's policy before meeting.
3. **Meeting plan:** a short opening script that states the purpose neutrally ("I want to understand how you produced this work"), the sequence (explain the process and their rights; let them talk about the work; show the specific concern; listen; explain next steps), and timing (about 20 to 30 minutes).
4. **Questions:** 8 to 12 open, non-leading questions about their process and understanding (how they chose sources, how they built a specific argument, what a specific term or step means, what tools they used, how they drafted), plus follow-ups if answers are vague. Include questions specific to the evidence given.
5. **During the meeting, what not to do:** accusing language, bluffing about evidence, promising outcomes, recording without consent, or deciding in the room if the policy reserves the decision for someone else.
6. **During the meeting, wellbeing and fairness:** adjustments for disability or language, and what to do if the student becomes very distressed (pause, offer support services, reschedule). If the student says anything suggesting they are at risk of harm, stop the meeting and follow the institution's safeguarding or welfare procedure.
7. **After the meeting:** possible outcomes under the policy (or typical ones if no policy: no case, educational outcome such as referencing support, formal referral), how to decide, and the timeline for informing the student.
8. **Record template:** a factual meeting note format.
</task>

<constraints>
- Never treat the student as guilty in the plan or the scripts; use neutral language throughout.
- Do not rely on AI-detector output as proof, and do not recommend running the student's other work through detectors as evidence.
- Do not invent the institution's rules; where the policy is missing, use placeholders and tell the teacher to check.
- Keep the student's information confidential; do not suggest discussing the case with other students or in public channels.
- Account for the student context: for non-native writers and students with relevant disabilities, consider how that affects both the evidence and the meeting.
</constraints>

<output_format>
## Evidence review
Table: Evidence | Strength | Why | Innocent explanations. Then a recommendation: formal, informal or no action.
## Before the meeting
Checklist.
## Meeting plan
Opening script, then the timed sequence.
## Questions
Numbered, with follow-ups indented.
## During the meeting
"What not to do" bullets, then wellbeing and fairness: adjustments for this student, what to do if they become distressed, and the safeguarding stop rule.
## After the meeting
Possible outcomes, decision criteria and timeline for informing the student.
## Record template
Headed fields to fill in.
</output_format>
