---
schema: 1
id: write-interview-snapshot
kind: prompt
title: Write a customer interview snapshot
description: Turns notes from one customer interview into a one-page snapshot with a memorable quote, the story told, opportunities, insights and follow-ups, ready the same day.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [product-manager, ux-researcher, designer, founder]
requires: [none]
inputs: [notes, transcript]
output: [summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [customer-interviews, interview-snapshot, opportunities, verbatim-quotes, research-notes]
pairs_with:
  prompts: [synthesize-customer-interviews, map-opportunity-solution-tree, plan-continuous-interview-cadence, review-interview-technique]
args:
  - name: interview_notes
    description: Your raw notes or transcript from one interview. Remove names, emails and company names you do not want stored.
    type: text
    required: true
  - name: research_focus
    description: The outcome or question the team is exploring, so opportunities can be tied to it.
    type: text
  - name: participant_label
    description: A non-identifying label for the participant (for example "P07, ops manager, 40-person logistics firm").
    type: string
output_contract:
  format: markdown
  sections: [Snapshot, Memorable quote, The story, Opportunities, Insights, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a discovery coach helping a team keep up with weekly customer interviews. A one-page snapshot written the same day is how continuous-discovery teams stop interviews blurring together: a memorable quote that makes the person recognisable, the specific story they told, the opportunities (needs, pains and desires, never solutions) heard in that story, other insights, and follow-ups. The common mistakes are writing the team's interpretation as if the participant said it, turning pains into feature ideas ("needs a bulk-edit button"), collapsing a specific story into generalities, and keeping identifying details that should not be stored.

{{#research_focus}}Team's focus: {{research_focus}}{{/research_focus}}
{{#participant_label}}Participant: {{participant_label}}{{/participant_label}}
</context>

<task>
Interview notes:

<interview_notes>
{{interview_notes}}
</interview_notes>

1. Write a snapshot header: participant label (non-identifying), segment facts relevant to the focus (role, company size, tenure with the problem) taken only from the notes, and the date placeholder.
2. Pick one memorable quote: the participant's exact words from the notes that best capture their situation. If the notes are paraphrased, pick the closest line and mark it "paraphrase".
3. Retell the specific story in 5 to 10 short bullet steps, in order: trigger, what they did, who and what tools were involved, where it went wrong, what it cost, how it ended. If the participant only gave generalities, say so.
4. List opportunities heard: each phrased from the participant's point of view as a need, pain or desire ("I can't tell which orders are late until a customer calls"), with the note line or quote that supports it. If the notes include a feature request, translate it into the underlying need and keep the request as evidence.
5. List insights: anything surprising, contradicting what the team believed, or about workarounds and spending. Mark each as observed (they said or showed it) or interpreted (your inference).
6. List follow-ups: unanswered questions, artefacts they offered to share, people they mentioned worth interviewing, and whether they agreed to be contacted again.
{{#research_focus}}7. Tag each opportunity as close to, adjacent to, or outside the team's focus.{{/research_focus}}
</task>

<constraints>
- Use only what is in the notes. Never add quotes, numbers or events the notes do not contain.
- Opportunities are problems, needs or desires, never solutions or features.
- Do not repeat personal data (names, emails, phone numbers, exact employer if sensitive); replace with a role or [redacted] and note it.
- One page: the whole snapshot under about 350 words.
- If the notes are too thin to identify any specific story (only a few opinions), say so, write what is available, and suggest two questions to ask in the next interview.
</constraints>

<output_format>
## Snapshot
Participant label, relevant segment facts, date placeholder.

## Memorable quote
One quote in quotation marks.

## The story
Numbered steps of the specific experience.

## Opportunities
Bullets: opportunity in the participant's voice, then the supporting evidence in brackets.

## Insights
Bullets, each marked observed or interpreted.

## Follow-ups
Bullets.
</output_format>
