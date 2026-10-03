---
schema: 1
id: plan-phonics-lesson
kind: prompt
title: Plan a systematic phonics lesson
description: Plans a synthetic phonics lesson for one grapheme-phoneme correspondence with review, teach, practise and apply phases and fully decodable words and sentences.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [topic, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [phonics, synthetic-phonics, early-literacy, decoding, blending, segmenting, science-of-reading]
pairs_with:
  prompts: [write-decodable-text, create-spelling-pattern-list, plan-intervention-group]
args:
  - name: target_gpc
    description: The new grapheme-phoneme correspondence, e.g. "ai as in rain", "sh", "igh", "a-e (split digraph) as in cake".
    type: string
    required: true
  - name: previously_taught
    description: "The correspondences and tricky (common exception) words already taught, as a list or a scheme stage with its contents, e.g. 's a t p i n m d g o c k ck e u r h b f l ff ll ss; tricky words the, to, I, no, go'."
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age, e.g. "Reception", "Kindergarten", "Year 1", "Grade 1 intervention".
    type: string
    required: true
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 25
output_contract:
  format: markdown
  sections: [Overview, Review, Teach, Practise, Apply, Word check, Assessment and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Systematic synthetic phonics teaches one grapheme-phoneme correspondence (GPC) at a time and has children read and spell words by blending and segmenting all through the word. Lessons follow a predictable four-part routine (review, teach, practise, apply) so working memory goes on the new learning, not on the lesson format. The non-negotiable is decodability: every word children are asked to read must use only GPCs already taught plus the target, or be a tricky word already taught. A single undecodable word teaches children to guess. Teachers also need pure sounds (/m/ not "muh"), consistent actions or mnemonics if their scheme uses them, and quick responses that keep every child reading, not just the confident ones.
</context>

<task>
Plan a {{minutes}}-minute phonics lesson for **{{grade_level}}** introducing **{{target_gpc}}**.

Already taught:
<previously_taught>
{{previously_taught}}
</previously_taught>

1. Build the allowed set: list the taught GPCs and tricky words you will use, plus the target. If `previously_taught` names only a scheme stage or is ambiguous, state the GPCs you are assuming and flag them for the teacher to confirm.
2. **Review** (about 5 minutes): rapid flashcard review of 6 to 8 recent GPCs, with the target's likely confusions included; oral blending of 3 words; reading 4 previously taught tricky words.
3. **Teach** (about 5 minutes): introduce the phoneme orally first (a few words that contain it, with where in the word it appears), then the grapheme. Describe how to say the pure sound and any mouth cue, the letter formation if new, and a short mnemonic. Model blending 3 words with the target, saying exactly what the teacher says and points to.
4. **Practise** (about 8 to 10 minutes):
   - 8 to 12 words for reading, ordered from easiest to hardest (short words, then adjacent consonants or longer words if they are taught). Write each word followed by its graphemes split with a vertical bar, e.g. "ship (sh | i | p)", so the teacher can draw a dot under each single-letter grapheme and a dash under each digraph or trigraph.
   - 2 to 3 nonsense or alien words only if the scheme uses them for assessment, labelled as such.
   - 4 to 6 words for spelling by segmenting, with the routine (say the word, count the sounds on fingers, write each grapheme, check).
   - Choral, partner and individual responses so every child reads.
5. **Apply** (about 5 minutes): 2 or 3 fully decodable sentences to read, then 1 dictated sentence to write, using the target and taught tricky words only.
6. Timings must add up exactly to {{minutes}} minutes.
7. **Word check:** audit every word you used against the allowed set.
</task>

<constraints>
- Every word to read or spell is decodable from the allowed set plus the target. If a word needs an untaught GPC (including endings like -ed, -es, -ing, or y as /ee/), remove it. Plural -s is allowed only if s is taught.
- Watch for accent differences (for example the vowel in "bath" or rhotic r) and mention it if the target or a chosen word is affected.
- If {{target_gpc}} has more than one common pronunciation (ow, ea, ie), teach the one stated, or the first in a typical sequence, and say which.
- Pure sounds only; never add a schwa when modelling consonants.
- No pictures-as-clues, guessing strategies, or memorising whole words outside the taught tricky words.
</constraints>

<output_format>
## Overview
Target, allowed set, assumptions to confirm, materials.
## Review
Time, then the cards, words and tricky words in order.
## Teach
Time, then the teacher's script, mouth cue, formation, mnemonic, modelled words.
## Practise
Time, reading words with their grapheme split (sh | i | p), spelling words, response routine.
## Apply
Time, sentences to read, dictation sentence.
## Word check
Table: Word | GPCs used | Allowed (yes/no). Every row must be yes; list any word you removed.
## Assessment and next steps
What to listen for, how to spot children who need same-day catch-up, and what to review next lesson.
</output_format>
