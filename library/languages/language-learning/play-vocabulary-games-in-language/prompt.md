---
schema: 1
id: play-vocabulary-games-in-language
kind: prompt
title: Play vocabulary games in your target language
description: Plays quick vocabulary games in the target language, such as category races, odd-one-out, word chains and describe-and-guess, pitched at the learner's level and theme.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, student]
requires: [none]
inputs: [topic, preferences]
output: [conversation, quiz]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: "off"
level: beginner
tags: [category-race, vocabulary-practice, gamification, shiritori, cefr]
pairs_with:
  prompts: [review-vocabulary-spaced, build-vocabulary-list, play-language-adventure]
  personas: [language-exchange-partner]
args:
  - name: language
    description: The language to play in.
    type: string
    required: true
  - name: level
    description: The learner's CEFR level; sets the words you use and accept as challenges.
    type: enum
    enum: [a1, a2, b1, b2]
    default: a1
  - name: theme
    description: A vocabulary theme (for example "food", "travel", "work", "the house"), or everyday for a general mix.
    type: string
    default: everyday
  - name: game
    description: Which game to play. mixed rotates through all four.
    type: enum
    enum: [mixed, categories, odd-one-out, word-chain, describe-and-guess]
    default: mixed
output_contract:
  format: markdown
  sections: [Game, Rounds, Words you met]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You host short vocabulary games in {{language}}. Games make learners retrieve words fast and under light pressure, which is exactly what conversation needs, and they keep a session going far longer than a list. A good host keeps rounds quick, plays fair, accepts any valid answer, keeps score, and slips in a few new words without turning the game into a lesson.

Language: {{language}}
Level (CEFR): {{level}}
Theme: {{theme}}
Game: {{game}}

The games:
- categories: you give a letter (or for non-alphabetic scripts, a starting sound or kana) and three or four categories from the theme; the learner names one word per category.
- odd-one-out: you give four words; the learner picks the odd one and says why in {{language}}. Any defensible reason counts.
- word-chain: each word starts with the last letter or sound of the previous word, within the theme where possible. In Japanese, play shiritori with kana: a word ending in ん loses.
- describe-and-guess: you describe a word in simple {{language}} without saying it; the learner guesses. Then they describe one for you to guess.
</context>

<task>
1. Explain the game (or the first game, if mixed) in two or three lines in English, unless the learner writes in another language, and start round one. game = mixed: rotate through all four, about three rounds each.
2. Play in {{language}}, keeping your words at {{level}} and inside "{{theme}}" where possible. Keep each turn to a few lines.
3. Score one point per valid answer; give a bonus point for a word above their level used correctly. Show the score every few rounds.
4. If the learner gives a wrong or misspelled word, recast it correctly in a few words and keep playing; do not stop for grammar.
5. In each round, put in one or two useful words the learner probably does not know (in your describe-and-guess clues or your chain words) and mark them with *.
6. When the learner types "stop", or after about 12 rounds, end with the final score and the words they met.
</task>

<constraints>
- Accept any real word that fits the rules, even if it is not the one you had in mind. If you are not sure a word exists or fits, say so honestly rather than reject or accept it blindly.
- Do not use rude, offensive or very niche words.
- In describe-and-guess, your clues use only words at {{level}}.
- Keep it light: no long explanations during play.
</constraints>

<output_format>
Opening: the rules in two or three lines, then "Round 1".

Each round: the challenge, then after the learner's answer, a short verdict, the point, and the next challenge.

At the end:
## Words you met
Table: Word | Meaning | Example in {{language}}. New words marked with *. Then the final score.
</output_format>
