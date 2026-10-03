---
schema: 1
id: prepare-witness-interview
kind: prompt
title: Prepare a witness interview
description: Prepares a fact-witness interview plan with objectives, an opening script, topic-by-topic open questions, documents to show, and how to record the account accurately and without leading.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [plan, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [witness-interview, fact-gathering, witness-statements, litigation-support, interview-technique]
pairs_with:
  prompts: [prepare-deposition-outline, index-case-documents]
  personas: [paralegal]
args:
  - name: witness_role
    description: Who the witness is in relation to the matter (an eyewitness, an employee of the client, a former employee of the other side, an expert's assistant), whether they are friendly, neutral or reluctant, and any vulnerability or language needs.
    type: string
    required: true
  - name: case_issues
    description: The matter in brief, the disputed facts this witness may know about, the documents they may have seen or written, and what the lawyer needs from the interview.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Objectives, Before the interview, Opening script, Interview plan, Documents to show, Recording the account, After the interview]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan fact-witness interviews for lawyers and investigators. The goal of an early interview is the witness's own account, complete and uncontaminated: what they saw, heard and did, how they know it, and what documents support or contradict it. Memory is easily shaped by leading questions, by showing documents too early, and by an interviewer who signals the answer they want, and an account that was shaped will fall apart in cross-examination or a later statement. Good practice draws on cognitive-interview technique: build rapport, ask for a free narrative first, then probe with open questions topic by topic, then show documents, then close. Rules on contacting witnesses (especially represented parties, current or former employees of the other side, and children or vulnerable adults) and on what may be said to them differ by jurisdiction and professional rules, so they are flagged for the lawyer.
</context>

<task>
Witness: {{witness_role}}

Matter and issues:
<issues>
{{case_issues}}
</issues>

1. Objectives: what this interview must establish, in priority order, and what would be a useful "I don't know".
2. Before the interview: checks for the lawyer (whether the witness may be contacted directly, whether they are represented, whether privilege applies to the interview, interpreter or support person, venue), and materials to prepare.
3. Opening script: who the interviewer is and whom they act for, the purpose, that the witness should say "I don't know" or "I don't remember" rather than guess, that there are no right answers, how notes will be taken, and, where appropriate, that the interviewer does not represent the witness. Keep it short and plain.
4. Interview plan:
   - Free narrative prompt for the main events, with instructions not to interrupt.
   - Topics in a sensible order, each with open questions (who, what, when, where, how, how do you know), probing questions for detail (sequence, exact words used, distance, lighting, timing), and source questions (saw it, heard it from someone, assumed).
   - Questions to test reliability without hostility (opportunity to observe, notes made at the time, conversations with others since).
   - Closing questions: anything not asked about, other people who know, documents or messages they hold.
5. Documents to show: which documents, at which point (after the free account on that topic), and the neutral question to ask with each.
6. Recording the account: how to take notes (the witness's words, not summaries, with uncertain answers recorded as uncertain), what to keep separate (interviewer's impressions), and how a later draft statement should be checked with the witness.
7. After the interview: follow-ups, document requests and a list of points that conflict with other evidence.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No leading questions in the narrative and topic sections. Leading questions appear only, if at all, as clearly labelled clarification after the open account.
- Never draft content that pressures, coaches, intimidates or offers inducements to a witness, or that suggests what they should say.
- Flag contact restrictions and any need for an appropriate adult, interpreter or trauma-informed approach for the lawyer to confirm; do not assert specific professional rules as certain.
- Use only the facts given; where the matter summary is thin, ask up to three questions and give a general plan.
- Keep the questions short enough to read at the table.
{{> output/uncertainty}}
</constraints>

<output_format>
## Objectives
Numbered.

## Before the interview
Checklist.

## Opening script
A short script in plain language.

## Interview plan
Free narrative prompt, then ### per topic with numbered questions, then reliability and closing questions.

## Documents to show
Table: document | when | neutral question.

## Recording the account
Bullets.

## After the interview
Checklist.
</output_format>
