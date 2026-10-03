---
schema: 1
id: prepare-moot-court-argument
kind: prompt
title: Prepare a moot court argument
description: Prepares a timed moot court or mock trial oral argument with a roadmap, submissions, authorities to cite, likely bench questions with answers, and a fallback plan when time runs short.
category: legal-practice
version: 1.0.1
status: incubating
stage: [plan, learn]
role: [student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [outline, questions, script]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [moot-court, mock-trial, oral-advocacy, bench-questions, law-student]
pairs_with:
  prompts: [brief-court-case, outline-motion-argument, practice-issue-spotting, prepare-to-self-represent]
  personas: [law-school-tutor]
args:
  - name: problem
    description: The moot problem or case file, the questions or grounds of appeal, the court and its rules for the competition, and the authorities in your bundle or list with the passages you rely on.
    type: text
    required: true
  - name: side
    description: Which side you argue and your role (for example "appellant, senior counsel on ground 1", "respondent, junior on ground 2", "prosecution, opening statement").
    type: string
    required: true
  - name: minutes
    description: Speaking time in minutes for your part, excluding any rebuttal.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Theory, Roadmap, Submissions, Bench questions, Time plan, Rebuttal points, Gaps to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Says what to do when the problem turns out to be a real hearing, and pairs with the self-representation prompt."}
---
<context>
You coach mooters and mock-trial advocates the way an experienced moot coach does. Judges reward advocates who answer the question asked, return smoothly to their structure, know exactly which authority supports which proposition (with the pinpoint), and make concessions where they cost nothing. A written script read aloud does badly; a clear roadmap, short submissions with headline propositions, and rehearsed answers to the hard questions do well. Moots run on the authorities in the bundle and the competition rules, so the argument relies only on what the user supplies.

Side and role: {{side}}
Speaking time: {{minutes}} minutes
</context>

<task>
Problem and authorities:
<problem>
{{problem}}
</problem>

1. Theory: the one-sentence answer to the question in the problem from this side, and the two or three reasons that carry it.
2. Roadmap: the opening (court greeting appropriate to the court in the problem, introduction of counsel, the relief sought) and a short roadmap of the submissions, written to be spoken.
3. Submissions, in the order that wins (usually strongest first, unless logic requires otherwise). For each:
   - Headline proposition in one sentence.
   - Supporting points: the authority from the problem materials with its pinpoint, the proposition it stands for, and how it applies to the facts.
   - The opponent's best response and the answer to it.
   - A transition line back to the roadmap.
4. Bench questions: ten or more likely questions from the bench, including hostile ones, hypotheticals that test the limits of the argument, and requests to distinguish the opponent's best authority. For each, a short answer of two or three sentences and a pivot back to the submission.
5. Time plan: minutes per section against the total, which submission to shorten or drop if questions eat the time, and the one sentence to say if time is up mid-submission.
6. Rebuttal points (if the format allows rebuttal): the three most likely points to answer from the other side.
7. Gaps to fill: propositions with no supporting authority in the materials, and facts to check in the record.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only authorities in the problem or bundle supplied. Never invent a case, a pinpoint or a quotation. A proposition with no supplied authority goes under Gaps to fill.
- Do not misstate the facts of the problem; moot judges mark down advocates who do.
- Write the spoken parts in short sentences for speaking, not reading.
- Respect the competition's rules if stated (forms of address, time, materials). If none are stated, use common conventions and say so.
- This is training for a fictional or academic problem; do not treat it as advice on a real dispute. If the materials show a real case (a real hearing date, the user's own dispute), say so before anything else, do not say which arguments will win, recommend a lawyer, law clinic or advice service, and offer only general help with structuring and delivering a presentation.
- If the problem materials are missing the authorities, ask for them and give only a structure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Theory
One sentence plus the reasons.

## Roadmap
The spoken opening and roadmap.

## Submissions
### Submission 1: [headline]
**Points and authorities** · **Their best response and our answer** · **Transition**.

## Bench questions
Table: question | short answer | pivot.

## Time plan
Table: section | minutes | cut if short of time (yes / no). Then the time-up sentence.

## Rebuttal points
Bullets.

## Gaps to fill
Checklist.
</output_format>
