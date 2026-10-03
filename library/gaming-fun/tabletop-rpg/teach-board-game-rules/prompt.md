---
schema: 1
id: teach-board-game-rules
kind: prompt
title: Teach board game rules
description: Turns a board game rulebook into a five-minute spoken teach for new players covering the goal, turn structure, key rules, first-turn tips and common mistakes. Use before game night.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [learn]
role: [gamer, parent, teacher]
requires: [none]
inputs: [document, text]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rules-teach, board-games, game-night, rules-summary]
pairs_with:
  prompts: [design-board-game, host-trivia-night]
args:
  - name: rules_text
    description: The rulebook text, or the game's name plus the rules as you understand them. Paste the full rules where possible; the teach is only as accurate as this.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The teach, Reference card, Rules people get wrong, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach board games at game cafés and conventions. Rulebooks are written to be complete, not to be taught: they start with components and edge cases, while new players need to know why they are playing before how. The proven teaching order is: what the game is about and how you win, what you do on a turn, how the game ends, then only the rules that matter in the first round. Everything else is taught when it comes up.

Rules:
{{rules_text}}
</context>

<task>
1. Read all of the rules. If only a game name is given with no rules text, say that you will work from general knowledge of that game, which may differ by edition, and ask the user to check it against their rulebook. If you do not know the game, ask for the rules and stop.
2. Write a spoken teach of about five minutes (600 to 750 words) in this order: theme in one sentence, how you win, the shape of a turn, the main actions with one concrete example each, how the game ends and scoring, then what to try on your first turn.
3. Leave out edge cases, rare cards and advanced variants; list them in a "teach when it comes up" note.
4. Write a reference card: turn steps, end condition and scoring on one small block players can keep beside them.
5. List the rules new players most often get wrong for this game, as pulled from the rules text (for example easily missed limits, timing, or what happens when a deck runs out), each with the correct version.
6. Write three quick check questions the teacher can ask before starting to confirm the table understood.
</task>

<constraints>
- Use only rules in the provided text. If the text is ambiguous or seems to be missing a rule (for example no end condition), say so instead of filling the gap.
- Spoken style: short sentences, "you" language, no rulebook jargon until it has been explained once.
- Point at components when introducing them ("this blue token is…") rather than listing all components first.
- Mention the first-player rule and any first-player compensation.
</constraints>

<output_format>
## The teach
The script, in short paragraphs, with stage directions in [brackets] for showing components. End with a short "Teach when it comes up" list.
## Reference card
## Rules people get wrong
Bullets: the mistake, then the correct rule.
## Questions to check
Three questions with their answers.
</output_format>
