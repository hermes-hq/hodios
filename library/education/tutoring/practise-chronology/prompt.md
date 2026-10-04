---
schema: 1
id: practise-chronology
kind: prompt
title: Practise historical chronology
description: Runs chronology games for a history period, such as ordering events, spotting the anachronism and putting causes before consequences, with verified dates and explained answers.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [history]
requires: [none]
inputs: [topic]
output: [conversation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [chronology, timelines, causation, anachronism, revision-game]
pairs_with:
  prompts: [explain-historical-event, take-time-travel-field-trip]
  personas: [history-tutor]
args:
  - name: period
    description: The period or topic being studied, e.g. "Tudor England 1485-1603", "the Cold War 1945-1991", "Ancient Egypt, New Kingdom".
    type: string
    required: true
  - name: level
    description: primary uses a few well-known events and plain language; secondary uses the main events of a course; university adds finer distinctions and historiographical debates about dating.
    type: enum
    enum: [primary, secondary, university]
    default: secondary
  - name: rounds
    description: How many rounds to play.
    type: number
    default: 10
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A secure sense of sequence underpins historical explanation: a student who does not know that one event came before another cannot argue that it caused it. Chronology games build that sense quickly, but only if the dates are right; a quiz that teaches a wrong date does lasting damage. This game covers {{period}} for {{level}} learners over {{rounds}} rounds.
</context>

<task>
1. **Check the period.** If {{period}} is too vague to build a timeline (for example "history" or "the old days"), ask for a period or course topic, offering two or three options.
2. **Build a timeline silently** of events from the period that you are confident about: well-established dates, or approximate dates marked "c." where the evidence only allows a range (common for ancient history). Leave out anything whose date you are unsure of. Prefer events that matter to explanations of the period, not trivia.
3. **Explain the game** in two lines, then play {{rounds}} rounds, one per message, rotating through these types:
   - **Put in order:** four to six events (fewer at primary) to arrange earliest to latest.
   - **Spot the anachronism:** a short scene or list set at a moment in the period with one thing that does not fit (an object, idea, person or event from the wrong time); the student finds it and says why.
   - **Cause before consequence:** two or three events; the student orders them and explains the causal link.
   - **What came between:** given two events, name or choose an event that happened between them.
   - **Before or after:** a quick-fire set of "did X happen before or after Y?".
4. **Mark each answer** after the student replies: correct or not, the correct order or answer with dates, and one sentence on why the sequence matters (what it made possible or ruled out). Accept a range when dates are approximate.
5. **Adapt.** If the student gets two rounds in a row fully right, make the next harder (closer dates, more events, subtler anachronisms). If they struggle, give fewer events with wider gaps, and revisit the events they misplaced.
6. **Finish** with a score, a compact timeline of every event used in the game, and the two or three events the student should revise.
</task>

<constraints>
- Use only dates you are confident of. Where historians date something differently, or a date is approximate, say so in the answer and accept reasonable answers.
- Anachronisms must be genuinely out of time and checkable; avoid trick questions that hinge on obscure dating disputes.
- Do not give away answers in the wording of the question (for example by listing events in order).
- Keep content appropriate to {{level}} and treat wars, persecution and atrocities factually and seriously, not as playful trivia.
- Before posting each round, check every date in it against your timeline and confirm the correct answer is unambiguous.
</constraints>

<output_format>
**Rules:** two lines.

**Each round:**
**Round N of {{rounds}}: game type**
The question. Wait for the answer.

**Marking:** correct or not; the answer with dates; one sentence on why the sequence matters.

**End:** score, a table of every event used (Date | Event), and the events to revise.
</output_format>
