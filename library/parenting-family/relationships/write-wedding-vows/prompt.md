---
schema: 1
id: write-wedding-vows
kind: prompt
title: Write wedding vows
description: Writes personal wedding vows from your stories and feelings, sized to the ceremony's time limit, matched in tone to your partner's vows and easy to say aloud without stumbling.
category: relationships
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
inputs: [text, preferences]
output: [script, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [wedding-vows, wedding, personal-vows, speech-writing, read-aloud]
pairs_with:
  prompts: [plan-wedding]
args:
  - name: stories
    description: Your raw material, for example how you met, a moment you knew, what your partner does that no one else sees, what you are promising, inside jokes, and anything that must or must not be mentioned.
    type: text
    required: true
  - name: tone
    description: The tone you want, for example "heartfelt with a little humour", "simple and traditional", "funny", and anything agreed with your partner about their vows. Optional.
    type: string
    default: heartfelt with a light touch of humour
  - name: length
    description: Time limit or length, for example "1 minute", "about 2 minutes", "150 words".
    type: string
    default: about 1.5 minutes
output_contract:
  format: markdown
  sections: [The vows, Why it works, Alternative lines, Before you say them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write their own wedding vows. Good vows sound like the person saying them, not like a greeting card. They are specific: one real detail ("you still leave me the last piece of toast") moves a room more than "you are my everything". They usually move from who you are to each other, through a story or two, to promises, and they end on a line that is easy to say with a shaky voice. They are written to be heard, so sentences are short, there is a rhythm, and there are no words that are hard to pronounce under emotion. Couples usually agree a similar length and tone so that one set does not overshadow the other.

Stories and material: {{stories}}
Tone: {{tone}}
Length: {{length}}
</context>

<task>
1. Pick the strongest one or two stories or details from the material, the ones only this couple would have. Do not use everything.
2. Write the vows in this shape, adjusting to fit the tone: an opening that speaks directly to the partner; a short story or detail that shows who they are; what has changed in the writer because of them; three to five promises, mixing the serious with the specific and, if the tone allows, one light or funny one; and a closing line that is simple and strong.
3. Size it: about 130 words per minute spoken slowly, so check the word count against {{length}} and state it with the estimated speaking time.
4. Write for the voice: short sentences, natural pauses marked with a line break, nothing that is hard to say when crying, and no words the writer would never use.
5. Explain briefly why the key choices work, so the writer can edit with confidence.
6. Offer alternative lines: two other openings and two other closing lines, plus one funnier and one more serious alternative promise.
7. Give tips for the day: read aloud several times, print on a card, agree length and tone with the partner without sharing the words if they want a surprise, pause for laughter, and look up at the end.
</task>

<constraints>
- Use only the facts, names and stories given. Do not invent memories; if a section needs a detail that is missing, leave a [placeholder] with a question.
- Humour must be affectionate and understandable to guests; no jokes about exes, sex, or anything that would embarrass the partner or their family. If the material asks for such a line, leave it out, say briefly why, and offer a kinder joke instead. Leave out inside jokes that need explanation, or keep one that guests can follow.
- Keep promises honest and specific; avoid clichés such as "my best friend, my rock, my soulmate" unless the writer clearly wants them, and then use only one.
- Respect religious or cultural requirements mentioned, and say if a ceremony may require legal or traditional wording alongside personal vows.
- If the material is very thin, write the vows anyway with [placeholders] and ask three questions that would make them personal.
</constraints>

<output_format>
## The vows
Line breaks for pauses. Then: (word count, about N minutes spoken).
## Why it works
Three to five bullets.
## Alternative lines
## Before you say them
</output_format>
