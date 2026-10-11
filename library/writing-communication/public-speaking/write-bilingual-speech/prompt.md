---
schema: 1
id: write-bilingual-speech
kind: prompt
title: Write a bilingual speech
description: Writes a speech for a room that shares two languages, such as a mixed-family wedding or a community event, switching languages by section so nobody is lost and the length does not double.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, language-learner]
requires: [none]
inputs: [notes, preferences]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bilingual, code-switching, multicultural-wedding, mixed-family, toast]
pairs_with:
  prompts: [write-wedding-toast, mark-up-script-for-delivery]
args:
  - name: occasion
    description: The occasion and your role, for example "father of the groom at a Polish-English wedding", "welcome speech at a Korean-American church anniversary".
    type: string
    required: true
  - name: languages
    description: "The two languages, which one you speak better, roughly how the room splits (for example 'half only speak Portuguese, half only English, young people speak both'), and the regional variety if it matters (Brazilian or European Portuguese, Mexican or Castilian Spanish)."
    type: string
    required: true
  - name: material
    description: Stories, names, the message, things to avoid, and any phrases or blessings you already want to use in either language.
    type: text
    required: true
  - name: minutes
    description: Target total length.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Speech, Language plan, Length, Native-speaker check, Pronunciation help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The obvious way to do a bilingual speech, saying everything twice, doubles the length and bores half the room at any moment. Experienced bilingual speakers and interpreters use other techniques: split the content so each section is said once, in the language of the people it most concerns (a story about the bride's family in her family's language, a welcome to the groom's family in theirs), give a short bridge sentence in the other language before each switch so nobody is lost, put the emotional peak and the toast in both languages because everyone needs to understand that moment, and use a printed or projected summary for longer speeches. Jokes rarely survive translation; wordplay should stay in one language and be explained or dropped. Speakers are usually less fluent in one of the two languages, so that part should use simpler sentences they can say confidently. Machine-quality translation of idioms, honorifics and blessings is the most common embarrassment; a native speaker from the right region should check every line in their language.
</context>

<task>
Write a bilingual speech for: {{occasion}}. Languages and room: {{languages}}. Target: {{minutes}} minutes.
<material>
{{material}}
</material>

1. If you do not know which language the speaker is weaker in, or how the room splits, ask and stop.
2. Plan the language split: assign each section to one language based on who it concerns and who must understand it, with both languages for the opening greeting, the emotional peak and the toast or close. Aim for no more than about 25 percent of the content said in both languages.
3. Before each switch, write a one-sentence bridge in the language being left or entered so both halves of the room stay with the speaker.
4. Write the speaker's weaker language in short, simple sentences; keep any joke or wordplay in the language it works in.
5. Keep the total within the target at about 120 words per minute for the speaker's stronger language and 100 for the weaker one.
6. Mark every line in each language that a native speaker must check (idioms, honorifics, formal or informal address, religious phrases) and give a simple pronunciation guide for words the speaker may find hard.
</task>

<constraints>
- Use only the stories and names given; never invent details.
- Do not claim the translation is final; say plainly that a native speaker of the right regional variety should check it.
- Use the formal or informal address the culture expects for elders and in-laws; when unsure, choose the more formal form and flag it.
- If you cannot write one of the languages well, say so and write that part as an English text marked for translation instead of producing low-quality text.
</constraints>

<output_format>
## Speech
Full text with each section labelled by language, bridge sentences, and [pause] marks.
## Language plan
Table: Section | Language | Why.
## Length
Words in each language and estimated minutes.
## Native-speaker check
Lines that must be checked and why.
## Pronunciation help
Hard words or names with a simple guide.
</output_format>
