---
schema: 1
id: prepare-for-meeting
kind: prompt
title: Prepare for a meeting
description: Writes a one-page pre-meeting brief with your goal and fallback, each attendee's likely position, questions to ask, objections to expect and what a good outcome looks like.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, individual, founder, consultant]
inputs: [text, notes]
output: [report, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
tags: [meeting-prep, stakeholders, objection-handling, negotiation-prep]
pairs_with:
  prompts: [run-weekly-review, steelman-opposing-view]
  personas: [thinking-partner]
args:
  - name: meeting
    description: What the meeting is, who will attend (names or roles and what you know about them), the history so far and the time available.
    type: text
    required: true
  - name: my_goal
    description: What you want to walk out with - a decision, approval, information, agreement or a relationship outcome.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The meeting in one line, Outcomes, Attendees, Questions to ask, Opening, Likely objections, Bring and prepare, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People walk into meetings knowing what they want to say, but not what the others want, what will stop a yes, or what they will settle for. A short brief fixes that: a clear target, a fallback, a read on each attendee, and a few good questions. The brief is for the user's eyes only, but it should still be fair to the other people in it.

<meeting>
{{meeting}}
</meeting>
<my_goal>
{{my_goal}}
</my_goal>
</context>

<task>
1. Sum up the meeting in one line: who, what and the decision or result at stake.
2. Turn the goal into outcomes at three levels: ideal, acceptable and the minimum worth walking away with (for example a date for the decision). If the goal is unclear, sharpen it and state your interpretation.
3. For each attendee or group: what they probably want, how they are likely to see the user's goal, what they may worry about, and what would make a yes easier for them. Base this on what the user wrote; where you infer, mark it as a guess, and say what the user could check beforehand.
4. Write five to eight questions to ask, ordered for the meeting, mixing questions that reveal the others' priorities with questions that move toward a decision.
5. Draft a 60-second opening: purpose, the decision needed, and why now.
6. List the three most likely objections with a short, honest response to each and any evidence to have ready.
7. List what to prepare or bring, and anything to send in advance.
8. Plan the follow-up: what to write down, and a draft first line of the follow-up message.
</task>

<constraints>
- Do not invent facts about attendees, numbers or history. Missing facts become "check before the meeting" items.
- Keep tactics honest: persuasion through clarity, evidence and others' interests, never deception or pressure.
- Fit the brief to the time available; a 15-minute meeting gets a short opening and three questions.
- Keep it to about one page.
</constraints>

<output_format>
## The meeting in one line
## Outcomes
Three bullets: Ideal, Acceptable, Minimum.
## Attendees
Table: Person or role | Likely wants | Likely view of my goal | Concerns | What helps (mark guesses with "(guess)").
## Questions to ask
Numbered.
## Opening
A short script in quotes.
## Likely objections
Table: Objection | Response | Evidence to have ready.
## Bring and prepare
Checklist, including "check before the meeting" items.
## Afterwards
</output_format>
