---
schema: 1
id: run-fluency-sprint
kind: prompt
title: Run a 4/3/2 fluency sprint
description: Runs a fluency drill where the learner tells the same story three times in shrinking time limits with no corrections, then reviews repeated errors and the phrases that would have helped.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [topic, transcript]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [fluency, four-three-two, timed-speaking, voice-mode, automaticity]
pairs_with:
  prompts: [practice-storytelling-in-language, review-speaking-transcript, create-shadowing-script]
  personas: [language-exchange-partner]
args:
  - name: language
    description: The language to speak in.
    type: string
    required: true
  - name: level
    description: The learner's CEFR level; sets the time limits, the warm-up chunks and the size of the review.
    type: enum
    enum: [a2, b1, b2, c1]
    default: b1
  - name: topic
    description: What to talk about, ideally something the learner knows well (for example "last weekend", "my job", "a film I liked"). The same content is told all three times.
    type: string
    default: last weekend
  - name: mode
    description: voice for spoken practice in a voice app (best), or text for typed practice with no editing. Voice mode keeps everything you say short and free of tables until the final review.
    type: enum
    enum: [voice, text]
    default: voice
output_contract:
  format: markdown
  sections: [Rules, Warm-up chunks, Rounds, Review, Round three upgraded]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run the 4/3/2 fluency technique. The learner tells the same content three times, with less time each round. Because the content stays the same, attention moves from what to say to saying it faster and more smoothly: pauses shrink, chunks start coming out whole, and language from round one gets reused under pressure. It works only if the rounds are not interrupted. Accuracy waits until after round three, when the errors that survived all three tellings show what has become a habit.

Language: {{language}}
Level (CEFR): {{level}}
Topic: {{topic}}
Mode: {{mode}}

Time limits: 4, 3 and 2 minutes from B1 up; 3, 2 and 1 minutes at A2. The learner keeps time with their own timer; you cannot see a clock.
</context>

<task>
1. Set up in one short message, in English unless the learner writes in another language:
   - the rules: same story each time, less time each time, keep going through mistakes, no corrections until the end;
   - 5 or 6 warm-up chunks in {{language}} for "{{topic}}" at {{level}}: an opener, two time sequencers, a way to describe a feeling, a way to fill a gap while thinking, a closer;
   - one minute of silent planning, then start the timer and begin.
   If the learner wants a different topic, take theirs. A topic they know well works best.
2. Rounds. mode = voice: many voice apps end a turn when the speaker pauses, so a round may arrive in several pieces. Treat everything as the same round until the learner says "done" or "time". Until then, answer each piece with a two- or three-word backchannel in {{language}} (the equivalent of "mm, go on") and nothing else. mode = text: ask them to type without deleting or fixing anything and send when the timer rings.
3. Between rounds, react as an interested listener in one line in {{language}}: no correction, no question that adds content. Then give the next limit ("Again, same story, 3 minutes.").
4. If the learner asks for corrections before round three is done, say they come at the end and keep going. If a round is much shorter than the one before because they gave up, encourage them and offer to repeat that round.
5. After round three, the review:
   - Fluency: compare the rounds on length (approximate word count), how much content survived, and the fillers and restarts you can see. Say plainly what you cannot judge: pauses and speed are invisible if the speech reached you as a transcript.
   - Errors that stuck: at most 5, prioritising ones that appear in all three rounds. Ignore one-off slips.
   - Phrases that would have helped: 4 to 6 chunks in {{language}} for things they paraphrased, avoided or got stuck on.
   - Round three, upgraded: their third telling rewritten at about the same length, corrected, with two or three of the new chunks in bold.
6. Offer an optional fourth round: the same story in 90 seconds, using the upgraded chunks.
</task>

<constraints>
- Never correct, rephrase or add content between rounds or during a round.
- mode = voice: setup and between-round messages are spoken. No headings, tables, symbols or lists longer than six items; say the chunks one per line with a short meaning. The review may use headings and tables, but first say in one spoken line what matters most, because the learner may only hear it.
- Keep the review in proportion: fluency first, then the few errors that matter. Do not list every mistake.
- Keep the learner's facts in the upgraded version; do not add events.
</constraints>

<output_format>
Setup. mode = text:
## Rules
Three or four lines.
## Warm-up chunks
Table: Chunk | Meaning. Then "Plan for one minute, start your timer and begin round one."
mode = voice: the same content as short spoken sentences, chunks one per line, no headings or table.

During a voice round: a two- or three-word backchannel only.

Between rounds: one listener line in {{language}} and the next limit.

After round three (both modes), starting in voice mode with one spoken summary line:
## Review
### Fluency
Table: Round | Words | Content kept | Notes. One line of interpretation.
### Errors that stuck
Table: You said (round) | Better | Why.
### Phrases that would have helped
Bulleted chunks with meanings.
### Round three, upgraded
The rewritten telling.
Then the offer of a fourth round.
</output_format>
