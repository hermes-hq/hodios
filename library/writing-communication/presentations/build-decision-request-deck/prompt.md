---
schema: 1
id: build-decision-request-deck
kind: prompt
title: Build a deck that asks for a decision
description: Builds a short deck that gets a leadership or committee decision, with the ask on slide two, real options with costs and risks, a recommendation and what happens if nobody decides.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, product-manager, project-manager, consultant]
requires: [none]
inputs: [notes, document]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [approval, options-analysis, recommendation, stakeholders, executive-audience]
pairs_with:
  prompts: [outline-presentation, drill-presentation-qa, critique-slide-deck]
  personas: [presentation-designer]
args:
  - name: decision_needed
    description: The decision you need, in one sentence, for example "approve hiring two contractors for Q3" or "choose vendor A or B".
    type: text
    required: true
  - name: background
    description: The facts, numbers, options you have considered and constraints such as budget, deadline or policy. Paste notes or a document.
    type: text
    required: true
  - name: decision_makers
    description: Who decides and what they care about, for example "CFO, cares about cash this year; COO, worried about delivery risk".
    type: text
    required: true
  - name: time_slot
    description: How long you have on the agenda, for example "10 minutes including discussion".
    type: string
    default: 15 minutes including discussion
output_contract:
  format: markdown
  sections: [The ask, Slide plan, Options compared, Objections to prepare for, Gaps in the case]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who need a yes, a no or a choice from a leadership team, steering group or committee. Decision meetings fail for predictable reasons: the ask arrives on slide fourteen, the options are a straw man plus the favourite, costs appear without the cost of doing nothing, and the deck answers questions nobody asked while skipping the one the most senior person cares about. Experienced presenters put the ask and the recommendation up front, give each option the same honest treatment, show what changes on what date if the decision slips, and leave at least a third of the slot for discussion. The deck should still make sense if it is forwarded to someone who missed the meeting.

Decision needed: {{decision_needed}}

<background>
{{background}}
</background>

Decision makers: {{decision_makers}}
Time slot: {{time_slot}}
</context>

<task>
1. Restate the ask as a question the room can answer with yes, no or a choice. If {{decision_needed}} is really an update with no decision in it, say so, suggest what decision could be asked for, and stop.
2. Identify the options in the background. If only one option is present, add "do nothing / delay" as an honest alternative and ask whether a real second option exists. Never invent options that the background does not support; mark any you suggest as "to explore".
3. For each option, list from the background only: cost, benefit, main risk, time to effect, and who is affected. Mark every missing value as a gap.
4. State the recommendation and the one or two reasons it wins for these decision makers, tied to what they care about.
5. Plan the slides: title slide with the ask, then the ask and recommendation on slide two, context only as much as the decision needs, the options compared side by side, the recommendation with its conditions, the cost of delay, and the exact decision wording to record. Put supporting detail in an appendix. Fit the main slides into about two thirds of {{time_slot}}.
6. List the objections each decision maker is likely to raise and the slide or appendix item that answers each.
7. List what is missing from the case before it is ready to present.
</task>

<constraints>
- Do not invent figures, dates, quotes or approvals. Use placeholders such as [cost estimate needed] for anything not in the background.
- Treat options fairly; do not weaken the non-recommended options to make the recommendation look better.
- Slide titles are full-sentence assertions, not topics.
- Do not decide on behalf of the decision makers or present the recommendation as already agreed.
</constraints>

<output_format>
## The ask
The question for the room and the recommendation, each in one sentence.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes. Then a line for discussion time and the appendix list.

## Options compared
Table: Option | Cost | Benefit | Main risk | Time to effect | Who is affected. Gaps marked.

## Objections to prepare for
Bullets: decision maker, likely objection, where it is answered.

## Gaps in the case
Bullets of missing facts or numbers to get before the meeting.
</output_format>
