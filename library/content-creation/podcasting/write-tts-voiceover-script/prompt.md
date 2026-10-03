---
schema: 1
id: write-tts-voiceover-script
kind: prompt
title: Prepare a script for text-to-speech voice-over
description: Prepares a script for text-to-speech voice-over with spelled-out numbers, pronunciations, pauses, emphasis and natural sentence lengths, plus optional SSML markup.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, teacher]
requires: [none]
inputs: [text]
output: [rewrite, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [text-to-speech, voice-over, ssml, pronunciation]
pairs_with:
  prompts: [write-explainer-animation-prompts, plan-ai-presenter-video, adapt-script-for-teleprompter]
args:
  - name: script
    description: The script as written for reading. Include names, product terms and acronyms as they appear.
    type: text
    required: true
  - name: voice_style
    description: "The delivery you want, e.g. warm-neutral, upbeat-promo, calm-instructional, documentary."
    type: string
    default: warm-neutral
  - name: ssml
    description: When true, also returns an SSML version using common tags. Check which tags your voice engine supports.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Changes made, Speech-ready script, Pronunciation table, SSML version, Listening check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Synthetic voices read exactly what is on the page. They stumble on things a human narrator fixes without thinking: "1/2" read as a date, "Dr." as "drive", "live" and "read" with the wrong vowel, acronyms spelled or pronounced inconsistently, long sentences with nested clauses that lose their shape, and parentheses that have no sound. Pauses come only from punctuation or markup, and emphasis from word order or explicit tags. Preparing a script for synthesis means rewriting it for the ear without changing its meaning.
</context>

<task>
Prepare this script for a `{{voice_style}}` synthetic voice-over. SSML version requested: {{ssml}}.

<script>
{{script}}
</script>

1. If the script contains names, brands or technical terms whose pronunciation you cannot be sure of, list them in the pronunciation table with your best respelling marked "confirm". Do not stop for them.
2. **Rewrite for speech**, keeping meaning, facts and claims unchanged:
   - numbers, dates, times, currencies, units and fractions written as they should be spoken ("£4.50" → "four pounds fifty", "3–5 days" → "three to five days");
   - abbreviations expanded ("e.g." → "for example", "Dr." → "Doctor"), and acronyms written as said: letters spaced ("U R L") or as a word ("NASA");
   - sentences split to one idea each, mostly under about 20 words, with the main point at the end where stress falls naturally;
   - parentheses and slashes turned into spoken phrases or removed;
   - lists given a spoken shape ("three things: first..., second..., and finally...");
   - homographs disambiguated by rewording where possible ("read" past tense → "went through" if ambiguous);
   - pauses marked with punctuation: commas for short breaths, full stops for longer, an ellipsis or a line break between sections;
   - emphasis created by word order first, and marked with *asterisks* only where the voice must stress a word.
   Match the rhythm to `{{voice_style}}`: shorter, punchier sentences for promo; even pace and clear step markers for instructional.
3. **Pronunciation table.** Each tricky word with a plain-English respelling (stressed syllable in capitals, e.g. "Nguyen → WIN") and, if the SSML version is requested, an IPA or alias form.
4. **SSML version.** Only if {{ssml}} is true: wrap the speech-ready script in SSML using widely supported tags (speak, break with times, emphasis, say-as for dates, numbers and characters, sub for aliases, phoneme for IPA, prosody for rate sparingly). Note that tag support differs between voice engines and that unsupported tags may be read aloud or ignored, so test a short section first. If {{ssml}} is false, write "Not requested" under that heading.
5. **Changes made.** A short list of the kinds of changes and any line where the meaning could have shifted, for the author to confirm.
6. **Listening check.** A checklist for the first render: names and numbers correct, no robotic run-ons, pauses at section breaks, emphasis landing on the intended words, overall pace (about 140 to 160 words per minute for most voice-over), and any word to fix with a respelling.
7. Before answering, compare the speech-ready script with the original line by line and confirm that no fact, number or claim changed.
</task>

<constraints>
- Do not change the message, add claims or cut content beyond what speech requires; flag any cut.
- Use only voices the user has the right to use. Never help clone or imitate a real person's voice without their documented consent, and do not describe the target voice as a named real person.
- No tool, engine or version names.
</constraints>

<output_format>
## Changes made
## Speech-ready script
In a code block.
## Pronunciation table
Table: Word | Say it as | Notes.
## SSML version
Code block, or "Not requested".
## Listening check
Checklist.
</output_format>
