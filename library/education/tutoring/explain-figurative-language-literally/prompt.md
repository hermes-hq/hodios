---
schema: 1
id: explain-figurative-language-literally
kind: prompt
title: Explain figurative language literally
description: Explains idioms, metaphors, sarcasm and implied meaning in a text step by step for learners who take language literally, naming the clue that signals each non-literal meaning.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, parent]
subject: [english]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [figurative-language, idioms, autism, inference, sarcasm, neurodiversity]
pairs_with:
  prompts: [explain-phrase-in-context, tutor-reading-comprehension]
args:
  - name: text_or_phrases
    description: The passage, dialogue or list of phrases to explain, for example a page of a class novel, a text message, or "pull your socks up; break a leg".
    type: text
    required: true
  - name: age
    description: The reader's age or stage, for example "11", "Year 10", "adult".
    type: string
    required: true
  - name: reader
    description: Who will read the explanation. learner writes directly to the person; supporter writes for a parent, teacher or teaching assistant, with tips for teaching it.
    type: enum
    enum: [learner, supporter]
    default: learner
output_contract:
  format: markdown
  sections: [Phrase by phrase, Clues to look for, Check yourself]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The reader ({{age}}, explanation written for the {{reader}}) finds non-literal language confusing. Many autistic people, multilingual learners and others process language precisely and literally; that is a different style, not a fault, and the fix is to make the hidden rules explicit. Explanations fail when they say "it just means..." without showing how you could have worked it out, when they use more figurative language to explain figurative language ("it's a way of breaking the ice"), when they skip sarcasm and implied requests (which cause the most social trouble), or when they are condescending.
</context>

<task>
<text_or_phrases>
{{text_or_phrases}}
</text_or_phrases>

1. Find every non-literal item: idioms, metaphors and similes, personification, hyperbole, sarcasm and irony, understatement, indirect requests ("Is that your coat on the floor?" meaning "pick it up"), and implied meanings a reader is expected to infer. If the text is a story, keep the order they appear.
2. For each item, explain in plain, literal language:
   - What the words say literally.
   - What the speaker or writer actually means.
   - The clue that signals it is not literal: the literal meaning is impossible or makes no sense here; it is a fixed phrase; tone or exaggeration; the words contradict the situation (sarcasm); a question that is really an instruction.
   - What a person might be expected to do or feel in response, if anything.
3. Group the clues into a short list the reader can reuse with new texts.
4. Write 3 to 5 check questions using items from the text or close variations, with answers, so the reader can test themselves.
5. If the reader is a supporter, add two teaching tips (for example a visual of literal versus intended meaning, a personal idiom dictionary, role-playing indirect requests).
</task>

<constraints>
- Use literal, concrete language in every explanation. Do not explain one idiom with another.
- Be respectful and matter-of-fact. Never imply the reader is slow, odd or wrong for reading literally.
- Where a phrase could be literal or figurative, say both readings and how context decides.
- Idioms vary by country and community; if an idiom is regional (British, American, Australian), say so. Do not invent meanings or origins; if unsure, say so.
- Match vocabulary and sentence length to {{age}}.
</constraints>

<output_format>
## Phrase by phrase
| Phrase | Literally says | Actually means | The clue |
One row per item; sarcasm and indirect requests also get a "What to do" note under the table.
## Clues to look for
Up to six bullet clues in plain words.
## Check yourself
Numbered questions, then the answers under a separate "Answers" line.
</output_format>
