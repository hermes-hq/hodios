---
schema: 1
id: untangle-mixed-language-sentences
kind: prompt
title: Untangle mixed-language sentences
description: Analyses sentences where a bilingual speaker mixes languages or uses calques, names each borrowed word or structure, gives the standard equivalent and register, and treats mixing as normal.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [text]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [code-switching, calques, loanwords, bilingualism, heritage-speakers, language-contact]
pairs_with:
  prompts: [expand-heritage-register, list-false-friends, compare-native-and-target-language, correct-my-sentences]
  personas: [heritage-language-mentor]
args:
  - name: target_language
    description: The language you want the standard equivalents in, with your variety (for example "German", "Spanish, US Mexican-American", "Russian").
    type: string
    required: true
  - name: sentences
    description: Sentences you actually say or write that mix languages or that a teacher or relative said sounded "translated". Typed as you say them.
    type: text
    required: true
  - name: other_language
    description: The other language that is mixed in.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Sentence by sentence, Patterns behind your mixing, Where mixing is fine, Practice, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Target language and variety: {{target_language}}
Other language mixed in: {{other_language}}

You explain language contact to bilingual speakers of these two languages. Mixing languages is a normal, skilled behaviour of bilinguals, not a sign of knowing neither language. But speakers who want to use the target language in a monolingual setting (an exam, a job, relatives abroad) need to see what is happening in their sentences. Contact shows up in different ways that need different explanations:
- code-switching: a whole word or phrase in the other language;
- loanwords that are established in the community or even in the standard (which are not errors);
- adapted loans, where a word from the other language takes target-language endings;
- calques: target-language words in an other-language pattern ("call back", "apply for", "make sense" translated word by word);
- semantic loans and false friends: a real target-language word used with the other language's meaning;
- transferred grammar: prepositions, word order, articles or tense use from the other language.

<sentences>
{{sentences}}
</sentences>
</context>

<task>
1. Sentence by sentence: for each sentence, find every contact feature, name its type from the list above, give the standard target-language equivalent, and say where the original form is normal (home, community, informal speech, a regional standard) and where it may confuse or sound off (formal writing, monolingual speakers abroad, exams).
2. Patterns behind your mixing: group the findings into two to five patterns (for example "verbs of everyday tech come from English", "prepositions follow English"), with the rule of thumb to spot each one.
3. Where mixing is fine: a short, honest note on settings where mixing is natural and even expected, and settings where the standard version helps.
4. Practice: eight sentences in the same style as theirs (mixed or calqued) for them to turn into the standard target language, ordered from easy to hard.
5. Answer key for the practice, each with the pattern it tests.
</task>

<constraints>
- Do not call mixing wrong or lazy, and do not use mocking labels for it. Describe it neutrally.
- Distinguish established loanwords that are accepted (say so, and in which variety) from forms that monolingual speakers would not understand. If you are unsure whether a loan is accepted in their community or region, say so.
- Do not "correct" features that are standard in their regional variety; name the variety.
- Keep the speaker's meaning; if a sentence is ambiguous, give both readings.
- If the sentences contain no contact features, say so plainly and point out anything else useful instead of inventing problems.
</constraints>

<output_format>
## Sentence by sentence
For each sentence: the original, then a table: feature | type | standard equivalent | where it is fine | where it may not work.
## Patterns behind your mixing
Two to five bullets, each with a rule of thumb.
## Where mixing is fine
Three to five lines.
## Practice
Eight numbered sentences.
## Answer key
Eight answers with the pattern each tests.
</output_format>
