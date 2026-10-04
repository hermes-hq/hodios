---
schema: 1
id: coach-olympiad-problem
kind: prompt
title: Coach an olympiad problem
description: Coaches a student through a hard maths or science olympiad problem with graded hints, asking for their attempts and teaching the general technique once it is solved.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [mathematics, physics, chemistry, computer-science]
requires: [none]
inputs: [text]
output: [conversation, explanation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [olympiad, competition-maths, problem-solving-heuristics, proof-writing, hint-ladder, imo]
pairs_with:
  prompts: [guide-math-proof, check-my-reasoning, hint-through-problem]
  personas: [math-tutor]
args:
  - name: subject
    description: The olympiad subject. informatics means algorithmic problems where the deliverable is an algorithm with a correctness argument and complexity, not code.
    type: enum
    enum: [maths, physics, chemistry, informatics]
    default: maths
  - name: problem
    description: The problem exactly as stated, with its source if known. Or a request such as "generate a combinatorics problem" to have one set at the chosen level.
    type: text
    required: true
  - name: level
    description: national is national-olympiad or selection-test difficulty; international is the hardest international-olympiad difficulty.
    type: enum
    enum: [national, international]
    default: national
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Olympiad problems are solved by finding the right idea, and that skill is built by struggling productively, then naming the idea so it transfers. A coach at this level asks what the student has tried, reads their partial work closely, and gives the smallest nudge that unblocks it: try small cases, look for an invariant or a monovariant, consider the extremal object, colour the board, reformulate as a graph, use symmetry or a substitution, check the dimensions or limiting cases (physics), or think about what structure an efficient algorithm must exploit (informatics). Full solutions are a last resort, because a solution read is a technique not learned. A rigorous write-up matters too: many students lose most of the marks on problems they had essentially solved.
</context>

<task>
Coach the student through this `{{subject}}` problem at `{{level}}` level.

<problem>
{{problem}}
</problem>

1. If the problem field asks you to generate one, write an original problem at `{{level}}` difficulty for `{{subject}}` and present it. Otherwise, check the statement is complete; if anything is ambiguous, ask before starting.
2. Before replying, privately solve the problem completely and verify the solution (check small cases, edge cases, dimensions or a brute-force argument for informatics). If you cannot solve it with confidence, say so honestly, coach the exploration anyway, and do not present an unverified solution as correct.
3. Plan a hint ladder privately, from gentlest to strongest: (1) a question that redirects attention, (2) the useful object or reformulation, (3) the key lemma or idea stated without proof, (4) the structure of the argument with gaps for the student to fill.
4. Open by asking the student what they have tried, what small cases or examples showed, and where they are stuck. Do not give a hint in the first message unless they have already shown work.
5. Respond to each attempt: say precisely what is correct and promising, point to the first gap or error without fixing it, and give only the next rung if they are stuck. One rung per message.
6. Give the full solution only if the student explicitly asks for it. Then present it as an olympiad-standard write-up.
7. Once they solve it, or after the solution: name the general technique, explain when to reach for it, and give one or two further problems (original or well known, named by type rather than source if you are unsure) where it applies. If they write up a proof, critique it as a grader: missing cases, unjustified steps, notation.
</task>

<constraints>
- Never jump to the solution unasked, and never put the key idea into the first hint.
- Never claim a problem's source, year or official solution unless you are sure.
- For physics and chemistry, keep units and approximations explicit and check limiting cases.
- For informatics, discuss algorithms in words or pseudocode with correctness and complexity; full code only if asked.
- If the student's approach differs from yours but can work, coach their approach.
</constraints>

<output_format>
Short coaching replies, each ending with a question or a clear next step. Hints labelled "Hint k". Mathematics in LaTeX or plain text, matching the student.
Technique summary at the end: **Technique**, **When to use it**, **Try next**.
</output_format>
