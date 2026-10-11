---
schema: 1
id: learn-speech-without-script
kind: prompt
title: Learn a speech well enough to give it without a script
description: Turns a written speech into a skeleton you can remember, picks the few lines to learn word for word, and builds a spaced rehearsal plan with recall tests and a recovery plan for going blank.
category: public-speaking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, executive, manager, student]
requires: [none]
inputs: [text, document]
output: [plan, outline, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [memorisation, rehearsal-plan, speech-structure, going-blank, spaced-practice]
pairs_with:
  prompts: [turn-script-into-cue-cards, rehearse-speech-with-feedback, mark-up-script-for-delivery]
  personas: [speaking-coach]
args:
  - name: speech
    description: The full text of the speech, or a detailed draft.
    type: text
    required: true
  - name: days_until
    description: Days left before you give the speech.
    type: number
    default: 7
  - name: notes_allowed
    description: Whether you may carry a small card or note on the day (yes, no, or not sure).
    type: text
output_contract:
  format: markdown
  sections: [Skeleton, Lines to learn exactly, Rehearsal schedule, Recall tests, If you go blank]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a speaking coach. Most people who try to give a speech without notes memorise it word for word, which is slow and fragile: one forgotten word breaks the chain, the speaker freezes, and the delivery sounds recited. Experienced speakers learn the structure instead. They hold a short skeleton of sections in a fixed order, each tied to a memorable image, story or phrase, and they learn word for word only the few lines where exact wording matters: the opening, the closing, quotes, figures and names. Recall improves with spaced sessions spoken aloud and standing, with practice starting from any section, and with sleep between sessions; silent rereading feels productive but builds little.

<speech>
{{speech}}
</speech>
</context>

<task>
1. Split the speech into 4 to 8 sections by idea, not by paragraph. For each, write a two-to-four-word label and one anchor (a story, image or phrase already in the text) that will bring the whole section back.
2. Check the order is logical enough to reconstruct: if a section could go anywhere, suggest a linking sentence that makes the next one follow naturally.
3. List the lines to learn exactly: the first two sentences, the last two sentences, every quote, figure, date and name. Keep this list short; if it is long, say which items can be paraphrased safely.
4. Build a rehearsal schedule over {{days_until}} days: short spoken sessions (about 15 to 20 minutes), spaced out, standing, from the skeleton rather than the text. Include starting from a random section, giving it to a person or a recording, and one full run at the venue or in similar conditions if possible. If there are fewer than three days, say so and propose keeping a keyword card as a safety net.
5. Give recall tests: say it from labels only, say it from anchors only, write the skeleton from memory, and explain each section in different words to prove it is understood rather than recited.
6. Plan for going blank: a pause is fine and looks deliberate; repeat or summarise the last point; move to the next anchor; and, {{#notes_allowed}}given notes allowed = {{notes_allowed}}, {{/notes_allowed}}say whether a small card with the skeleton is wise.
</task>

<constraints>
- Do not rewrite the speech's content. Suggest wording changes only where they make a section easier to recall, and mark them.
- Do not promise perfect recall. Say plainly that small wording changes on the day are normal and invisible to the audience.
- Keep anchors drawn from the speaker's own text.
</constraints>

<output_format>
## Skeleton
Numbered sections with label and anchor.
## Lines to learn exactly
## Rehearsal schedule
Day | Session | What to do | Minutes.
## Recall tests
## If you go blank
</output_format>
