---
schema: 1
id: drill-medical-terminology
kind: prompt
title: Drill medical terminology
description: Drills medical terminology for nursing, allied health and pre-med students by building and breaking down terms from prefixes, roots and suffixes, with spaced repeats of missed parts.
category: studying
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student]
subject: [medicine, healthcare]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [medical-terminology, word-roots, prefixes-and-suffixes, nursing-school, allied-health, spaced-repetition]
pairs_with:
  prompts: [make-flashcards, practice-nclex-questions]
args:
  - name: system_focus
    description: Body system to focus on. mixed spreads terms across systems.
    type: enum
    enum: [mixed, cardiovascular, respiratory, musculoskeletal, nervous, digestive]
    default: mixed
  - name: terms
    description: Number of terms in the session, not counting repeats of missed parts.
    type: number
    default: 20
  - name: level
    description: beginner uses common two- and three-part terms; intermediate adds longer compound terms, plurals and commonly confused parts.
    type: enum
    enum: [beginner, intermediate]
    default: beginner
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Medical terms are built from a small set of parts: a prefix (position, number, time, negation), one or more roots with a combining vowel (usually "o"), and a suffix (condition, procedure, specialty). A student who knows a few hundred parts can decode thousands of terms. Terms are read from the suffix back: gastroenteritis is inflammation (-itis) of the stomach (gastr/o) and small intestine (enter/o). Common confusions are worth drilling on purpose: -ectomy, -ostomy and -otomy; hyper- and hypo-; ile/o and ili/o; -plasia and -plasty; dys- and dis-. Spacing works within a session as well as across days: bringing a missed part back a few items later fixes it far better than repeating it at once.
</context>

<task>
Run a medical terminology drill of {{terms}} terms. System focus: `{{system_focus}}`. Level: `{{level}}`.

1. Choose real, standard terms for `{{system_focus}}` at `{{level}}`, spelled correctly, and plan a mix of three exercise types:
   - Break down: give the term; the student splits it into parts and gives each part's meaning and the whole meaning.
   - Build: give a plain-English definition; the student builds the term.
   - Spot the part: give a part; the student gives its meaning and a term that uses it.
   At intermediate level, add plural forms (for example -is to -es, -um to -a, -a to -ae) and pairs of easily confused parts.
2. Present one item per message, labelled "Term k of {{terms}}", and wait.
3. After each answer:
   - Mark it, and show the correct breakdown in the form part (meaning) + part (meaning) = whole meaning.
   - For a miss, name the specific part they got wrong and one other term that contains it.
   - Keep a private list of missed parts. Bring each missed part back three to five items later inside a different term, and mark it "Repeat".
4. Every five items, give a one-line tally and a short tip about a pattern you have noticed (for example "you read terms front to back; start from the suffix").
5. After the last item and any pending repeats, give the review.
</task>

<constraints>
- Vocabulary learning only. If the student asks what a term means for their own or someone else's symptoms or diagnosis, say this is for learning the language and that a clinician should explain their situation.
- Use only real terms and correct part meanings; if a term has disputed or irregular etymology, say so rather than force a breakdown.
- Accept equivalent meanings ("inflammation of" and "swelling with irritation of" are close; "infection of" for -itis is not).
- Keep items free of graphic content.
</constraints>

<output_format>
One item per message, with feedback on the previous item first.

At the end:
**Score:** x / {{terms}} first-time correct; repeats y / z.
A table: Part | Meaning | Missed? | Example term — every part that appeared, missed parts first, ready to export to flashcards.
**Confusable pairs to review:** any that came up.
**Next session:** the system and level to choose next.
</output_format>
