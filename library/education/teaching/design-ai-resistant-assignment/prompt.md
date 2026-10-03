---
schema: 1
id: design-ai-resistant-assignment
kind: prompt
title: Redesign an assignment for the AI era
description: Redesigns an assignment so learning stays visible when students have AI tools, with process checkpoints, local or personal data, an oral defence and a clear class AI-use policy.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [text, spec]
output: [plan, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-in-education, academic-integrity, assessment-design, authentic-assessment, ai-use-policy]
pairs_with:
  prompts: [create-rubric, align-lesson-to-standards]
args:
  - name: current_assignment
    description: The assignment as students receive it now, including the task, length, timeline and how it is marked.
    type: text
    required: true
  - name: learning_goals
    description: What the assignment is meant to show students can do, e.g. "construct an argument from primary sources", "debug a program", "write a lab conclusion".
    type: text
    required: true
  - name: ai_stance
    description: The class position on AI tools for this assignment.
    type: enum
    enum: [banned, allowed-with-disclosure, required]
    default: allowed-with-disclosure
output_contract:
  format: markdown
  sections: [Diagnosis, Redesigned assignment, Process checkpoints, Oral check, AI-use policy for students, Disclosure statement, Marking changes, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
No take-home assignment is AI-proof, and AI-text detectors are unreliable enough that they should not be the basis for accusing a student. What works is design: assess the process as well as the product, tie the work to things a general model does not know (local data, class discussions, the student's own experience or fieldwork), make thinking visible at checkpoints, and include a short oral or in-class component where students explain and extend their work. Equally important is clarity: students need to know exactly which uses of AI are allowed, how to disclose them, and why the rules serve their learning.
</context>

<task>
Redesign this assignment with the AI stance **{{ai_stance}}**.

<current_assignment>
{{current_assignment}}
</current_assignment>

<learning_goals>
{{learning_goals}}
</learning_goals>

1. **Diagnosis:** say which parts of the current assignment a general AI tool could produce convincingly with little student thinking, and which learning goals the current design therefore cannot evidence.
2. **Redesigned assignment:** rewrite the student-facing brief. Keep the learning goals and roughly the same workload. Use the strategies that fit the goals best, typically several of:
   - grounding in specific, local or class-generated material (data the class collected, a local issue, an in-class discussion, a text annotated in class);
   - personal connection or reflection that is part of the learning, not decoration;
   - visible process: proposals, notes, drafts, version history or annotated decisions;
   - in-class components under normal conditions for the part that most needs to be the student's own;
   - a product that requires judgement about sources or outputs, not just generation.
3. **Process checkpoints:** 3 to 5 dated checkpoints with what students submit and the quick feedback they get.
4. **Oral check:** a 3 to 5 minute conversation or mini-viva protocol with 5 or 6 questions that ask students to explain choices, extend to a new case, or fix a deliberately introduced flaw, with what a secure answer sounds like.
5. **AI-use policy for students** fitted to the stance:
   - banned: what counts as AI use, why it is excluded for this task, and which tools remain fine (spell check, for example);
   - allowed-with-disclosure: permitted uses (brainstorming, feedback on a draft, explaining a concept) and not permitted uses (generating the submitted text or answers), plus the disclosure rule;
   - required: the specific AI task students do, how they evaluate and correct the output, and what they submit to show their judgement (prompts, outputs, critique).
6. **Disclosure statement:** a short template students complete describing any AI use (tool, purpose, what they changed).
7. **Marking changes:** how the rubric shifts weight toward process, reasoning and the oral check, with criteria wording.
8. **Teacher notes:** what to do if you suspect misuse (talk to the student about the work and process first; follow school policy; do not rely on detector scores alone) and equity notes (access to tools at home, students with accommodations).
</task>

<constraints>
- Never claim the design makes AI use impossible or detectable. Say how it makes learning visible instead.
- Do not recommend AI-detection software as evidence of misconduct.
- Keep total student workload close to the original; if the redesign adds time, take something out and say what.
- Do not require students to share private or sensitive personal information; personal-connection tasks must have an alternative.
- If allowed or required AI use needs tools the school has not approved, or students below a tool's minimum age, flag it.
- If the learning goals are unclear, infer them from the assignment, mark them "inferred", and proceed.
</constraints>

<output_format>
## Diagnosis
Bullets: vulnerable parts → goals not evidenced.
## Redesigned assignment
The new student-facing brief.
## Process checkpoints
Table: Checkpoint | Due | Students submit | Feedback.
## Oral check
Protocol, questions, what a secure answer sounds like.
## AI-use policy for students
Student-facing, under about 200 words.
## Disclosure statement
Template.
## Marking changes
Criteria and weights.
## Teacher notes
Bullets.
</output_format>
