---
schema: 1
id: fix-dialogue-punctuation-and-tags
kind: prompt
title: Fix dialogue punctuation and tags
description: Corrects dialogue punctuation, paragraphing, speech tags and action beats in fiction to US or UK convention, explaining each rule once so the writer stops repeating the error.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, student]
requires: [none]
inputs: [text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dialogue, speech-tags, action-beats, punctuation, fiction-manuscript]
pairs_with:
  prompts: [punch-up-dialogue, line-edit-prose, proofread-text]
args:
  - name: text
    description: The scene or passage with dialogue.
    type: text
    required: true
  - name: convention
    description: us uses double quotation marks first; uk uses single quotation marks first, as most British publishers do; match keeps whichever the manuscript already uses consistently.
    type: enum
    enum: [us, uk, match]
    default: match
output_contract:
  format: markdown
  sections: [Corrected text, Rules applied, Queries]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dialogue mechanics are the most common error in unedited fiction, and agents and editors notice them on the first page. The rules are few and fixed:
- A speech tag (said, asked, whispered) is part of the same sentence as the speech: "I'm leaving," she said. The comma goes inside the closing quotation mark and the tag starts lower case. A question mark or exclamation mark replaces the comma, and the tag still starts lower case: "Are you coming?" he asked.
- An action beat is a separate sentence, not a tag: "I'm leaving." She grabbed her coat. Verbs that cannot produce speech (smiled, laughed, shrugged, sighed) make beats, not tags.
- A tag in the middle of one sentence takes commas on both sides: "I think," she said, "we should go." If the speech is two sentences, the tag ends with a full stop: "I'm tired," she said. "Let's go."
- Each change of speaker starts a new paragraph, and a character's action stays in the same paragraph as their speech.
- When one speaker's speech runs across paragraphs, each paragraph opens with a quotation mark but only the last one closes.
- Interrupted speech ends in a dash inside the quotation mark; speech that trails off ends in an ellipsis.
- US style uses double marks with single marks for quotes inside quotes; UK publishing usually reverses this. In fiction, both put the comma or full stop that ends the spoken words inside the closing mark.

Convention: {{convention}}
<text>
{{text}}
</text>
</context>

<task>
1. If the text is missing, ask for it and stop. If {{convention}} is match, state which convention the text mostly uses; if it is evenly mixed, use US and say so.
2. Correct punctuation around every line of dialogue: commas, terminal marks, quotation marks, capitalisation after tags, and mid-sentence and two-sentence tags.
3. Turn non-speech verbs used as tags into beats (or a proper tag plus a beat), changing the punctuation to match. Change only the punctuation and capitalisation; keep the writer's words.
4. Fix paragraphing: new paragraph for each new speaker; keep a character's beat with their own line; apply the multi-paragraph speech rule.
5. Fix interruptions and trailing speech, and nested quotations.
6. Note but do not change tag style choices that are not errors (adverbs on tags, "said" versus fancier tags); mention them in one line under Queries only if they distract.
7. List each rule you applied once, with one example from the text, so the writer learns it.
</task>

<constraints>
- Do not rewrite dialogue content, add or remove tags, or change word choice; this is mechanics only.
- Where it is unclear who is speaking after a paragraph change, ask rather than guess.
- Leave deliberate stylistic choices (dialogue without quotation marks, dashes for dialogue in the manner of some literary fiction) alone if consistent, and say so.
</constraints>

<output_format>
## Corrected text
## Rules applied
Numbered: the rule in one sentence, then one before and after example from the text.
## Queries
Bullets: unclear speakers, distracting tag habits, or "None".
</output_format>
