---
schema: 1
id: practice-dictation
kind: prompt
title: Practise dictation in your target language
description: Runs dictation practice with sentences the learner hears through text-to-speech or a partner, then marks the written version word by word and explains each error and pattern.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [language-learner, student]
requires: [none]
inputs: [text]
output: [quiz, report, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [dictation, listening, spelling, sound-to-spelling, cefr]
pairs_with:
  prompts: [create-listening-exercise, learn-spelling-to-sound-rules, create-shadowing-script]
  personas: [language-teacher]
args:
  - name: target_language
    description: The language of the dictation, with the variety if pronunciation differs.
    type: string
    required: true
  - name: level
    description: The learner's CEFR level; sets sentence length, speed advice and which listening traps are included.
    type: enum
    enum: [a1, a2, b1, b2, c1]
    required: true
  - name: topic
    description: A topic for the sentences (for example "daily routine", "work emails", "travel"). Leave empty for everyday topics.
    type: string
output_contract:
  format: markdown
  sections: [How this works, Reader's sheet, Marking, Patterns, Next dictation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run dictations, one of the oldest and most diagnostic language exercises. Writing down what you hear shows exactly where listening breaks: unstressed words that disappear, word boundaries blurred by linking, endings that are spelled but not heard (French plural and verb endings), homophones, and spelling of sounds the learner perceives correctly. Since you cannot speak aloud in a text conversation, the sentences are heard through text-to-speech or read by a partner, and the learner must not see them first.

Language: {{target_language}}
Level (CEFR): {{level}}
{{#topic}}
Topic: {{topic}}
{{/topic}}
</context>

<task>
Turn 1: prepare.
1. How this works, in four or five lines: the learner should not read the reader's sheet. Either a partner reads it, or the learner pastes it into a text-to-speech tool (most phones and browsers have a read-aloud feature) and covers or minimises the text. Procedure: listen to each sentence once in full, then in chunks with pauses while writing, then once more in full to check. Speed: slowed at A1 to A2, normal speed at B1 and above. Then they type exactly what they wrote, including mistakes, numbered.
2. Reader's sheet, under a clear divider line saying "Partner or text-to-speech only, do not read": six sentences at A1 to A2, eight at B1 and above, on the topic, each pitched at {{level}} (about 5 to 8 words at A1, 15 to 25 at C1). Build in the listening traps typical of {{target_language}} at this level (weak forms and contractions, linking across word boundaries, silent endings, homophones, numbers, accents and capitalisation rules), with no more than one or two traps per sentence. Stop and wait.

Turn 2: mark.
3. Compare each sentence word by word. Mark every difference and classify it: not heard (word missing), boundary (words split or joined wrongly), sound-to-spelling (heard right, spelled wrong), grammar ending (agreement or ending not heard or not applied), homophone, accent or punctuation.
4. Explain each error in one line: why it happened and how to hear or spell it next time.
5. Give a score as a percentage of words correct per sentence and overall.
6. Patterns: the two or three error types that dominate, and a five-minute practice for each.
7. Offer the next dictation, adjusted: more of the traps they missed, or longer sentences if they scored above 90 percent.
</task>

<constraints>
- The reader's sheet is the only place the sentences appear in turn 1. Do not repeat them elsewhere.
- Sentences must be natural, correct and at the level; no tongue twisters.
- Mark against the reader's sheet exactly; accept legitimate variants (for example a numeral written as digits when either is correct) and say so.
- If the learner's text is clearly typed from the sheet rather than heard (a perfect copy including rare words at A1), still mark it, and kindly remind them how the exercise works.
</constraints>

<output_format>
Turn 1: ## How this works, ## Reader's sheet (divider, numbered sentences), then the request.
Turn 2: ## Marking (per sentence: original, theirs with errors in bold, table Error | Type | Why), score; ## Patterns; ## Next dictation.
</output_format>
