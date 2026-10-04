---
schema: 1
id: rehearse-speech-with-feedback
kind: prompt
title: Rehearse a speech section by section
description: Rehearses a speech section by section as the speaker delivers or pastes each part, giving feedback on clarity, rhythm, length and memorability while keeping a running tally against the target time.
category: public-speaking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual]
requires: [none]
inputs: [text, transcript]
output: [conversation, report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [speech-rehearsal, delivery, wedding-speech, toast, speech-timing]
pairs_with:
  prompts: [write-speech, critique-speech-recording, mark-up-script-for-delivery, drill-presentation-qa]
  personas: [speaking-coach, speechwriter]
args:
  - name: speech
    description: The full text of the speech as written, or detailed notes if you speak from bullet points.
    type: text
    required: true
  - name: occasion
    description: Where and to whom it will be given, for example "best man speech at a 120-guest wedding", "retirement send-off for my manager", "keynote at a regional nursing conference", "eulogy for my grandmother".
    type: string
    required: true
  - name: target_minutes
    description: How many minutes the speech should last.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Speech map, Section feedback, Timing, Final notes, Cut list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Speeches are written to be read but have to work when heard once, at speaking pace, by people who cannot scroll back. Rehearsing section by section catches the problems a full read-through hides: a sentence too long to say in one breath, a joke whose punchline is buried, a list of names that drags, an opening that takes a minute to get going, and a speech that is quietly twice as long as it should be. Most people speak at roughly 120 to 150 words per minute in a speech, slower with pauses and laughter.

Occasion: {{occasion}}
Target length: {{target_minutes}} minutes
<speech>
{{speech}}
</speech>
</context>

<task>
1. Speech map. Split the speech into four to eight sections (opening, each main part, close). For each, show the first few words, the word count and an estimated time at 130 words per minute, plus the total against {{target_minutes}} minutes. Ask whether the speaker knows their own pace (they can read a section aloud with a timer and tell you the seconds) and whether they want to deliver each section live and paste what they actually said, or work from the written text. Then ask for section 1 and wait.
2. Section by section, after each delivery or confirmation:
   - Clarity: is the point of the section clear on one hearing? Any sentence the audience would lose?
   - Rhythm: sentences too long to say in one breath, tongue-twisters, places for a pause, where a list of three or a short sentence would land better.
   - Length: time used against this section's share of the target.
   - Memorability: the one line or image people will remember from this section, or the lack of one.
   - Fit for the occasion: anything that might land badly with this audience (inside jokes most guests will not get, a remark that could embarrass someone, the wrong tone for a sad or formal occasion).
   Give a marked-up version of the one or two weakest sentences, with / for short pauses and // for long pauses, and update the running timing tally. Then ask for the next section and wait.
3. After the last section, give the final notes and, if the speech is over the target, a cut list.
</task>

<constraints>
- Keep feedback per section short and specific, quoting the speaker's words. No more than three changes per section, most important first.
- Keep the speaker's voice. Suggest edits, not a rewrite of the whole speech, unless they ask.
- If the speaker pastes what they actually said and it differs from the written text, compare them: note where the spoken version was better and suggest keeping it.
- For a eulogy or another emotional speech, be gentle, include advice for getting through hard moments (a pause, a breath, a glass of water, a backup reader), and never make it feel like a performance review.
- Timing estimates are approximations; say so once, and use the speaker's own pace if they give it.
</constraints>

<output_format>
First message:
## Speech map
Table: Section | Starts with | Words | Est. time. Then total vs target and the two questions.

After each section:
**Section N feedback** with lines labelled Clarity, Rhythm, Length, Memorability, Fit; then **Marked up:** in a quote block; then **Running time:** X of {{target_minutes}} minutes.

At the end:
## Timing
Total estimate and how far over or under.
## Final notes
The three changes that matter most across the whole speech, and the opening and closing lines as they should be said.
## Cut list
Only if over time: cuts ranked by time saved and least loss, with seconds saved for each.
</output_format>
