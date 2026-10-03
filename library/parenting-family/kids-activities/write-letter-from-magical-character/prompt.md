---
schema: 1
id: write-letter-from-magical-character
kind: prompt
title: Write a letter from a magical character
description: Writes a letter to a child from the tooth fairy, a holiday figure or a favourite toy, personalised to their milestone, in a voice and reading level they can enjoy alone or read aloud.
category: kids-activities
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [tooth-fairy, letter-to-child, family-traditions, milestones, childhood-magic, keepsake]
pairs_with:
  prompts: [tell-hero-story-series, write-jokes-for-kids]
args:
  - name: character
    description: Who is writing, for example "the tooth fairy", "an elf from the North Pole", "the Easter bunny", "her teddy bear Mr Buttons", or a character your family made up.
    type: string
    required: true
  - name: child_name
    description: The child's first name or nickname.
    type: string
    required: true
  - name: age
    description: The child's age in years. Sets the reading level and length.
    type: number
    required: true
  - name: occasion
    description: The milestone or moment, with any details to mention, for example "lost first tooth at school, was very brave", "started swimming lessons", "moving house next week and feeling worried", "first night in a big bed".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Letter, Presentation ideas]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write letters that parents leave for their children from magical or beloved characters: a tooth fairy note under the pillow, a message from a toy left on the breakfast table, a letter for a holiday. These become keepsakes. The letters children treasure notice something specific and true about them (how brave they were, what they have been practising), have a playful voice with one or two magical details from the character's world, and leave the child feeling seen and proud. They should never make promises the parents may not keep.

Character: {{character}}
Child: {{child_name}}, age {{age}}
Occasion: {{occasion}}
</context>

<task>
1. If the character, the child's name, the age or the occasion is missing, ask for it and stop.
2. Give the character a consistent voice: the tooth fairy might be tiny, busy and sparkly; a toy speaks as the child's loyal friend who saw everything; a holiday figure is warm and a little mysterious. If the character is one the family made up, use only the details given and keep everything else open.
3. Write the letter at the child's reading level: for ages 3 to 5, very short (about 40 to 80 words) and meant to be read aloud, with simple words; for ages 6 to 8, about 80 to 150 words, with short sentences a new reader can tackle; for 9 and up, up to about 200 words, with more playful detail.
4. Include: a greeting by name, the specific milestone and something real the child did (from the occasion details), one or two magical details from the character's world (what happens to teeth in fairyland, what the toy does at night), encouragement linked to the moment, and a signature with a small flourish.
5. For a worry (moving house, a new sibling, starting school), validate the feeling first, offer one simple idea the child can try, and remind them that the grown-ups who love them are there to help.
6. Presentation ideas: two or three ways to make the letter feel magical (tiny handwriting, a dusting of glitter, a sealed envelope, a tiny footprint), all cheap and easy.
7. Before answering, check that the letter makes no promises of gifts, money amounts, visits or future events, and matches the reading level for the age.
</task>

<constraints>
- Keep the magic gentle and kind; never use the character to threaten, monitor behaviour ("I am watching you") or set conditions for gifts.
- No promises of presents, money, visits or replies; the parent can add those if they choose.
- Use only details from the occasion; do not invent facts about the child's life.
- Do not ask for or include the child's surname, school, address or other identifying details.
- Respect that families differ in traditions and beliefs; keep religious content out unless the parent asks for it.
</constraints>

<output_format>
## Letter
The letter alone, ready to copy, with line breaks as it should be written.
## Presentation ideas
</output_format>

<examples>
A line that works, from the tooth fairy to a 6-year-old: "Your tooth was the shiniest one I collected all week. I am using it to build a tiny window in my house, so the moonlight can get in."
</examples>
