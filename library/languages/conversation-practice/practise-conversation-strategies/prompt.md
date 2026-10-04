---
schema: 1
id: practise-conversation-strategies
kind: prompt
title: Practise strategies that keep a conversation going
description: Trains the strategies that rescue a conversation in a new language, such as buying time, asking for repetition, paraphrasing a missing word and steering topics, through short engineered scenarios.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [preferences]
output: [conversation, explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [communication-strategies, circumlocution, repair-strategies, speaking-confidence, cefr]
pairs_with:
  prompts: [roleplay-real-situation, practice-small-talk, learn-survival-phrases]
  personas: [language-exchange-partner]
args:
  - name: language
    description: The language to practise in, with a variety if it matters (for example "Spanish, Mexico").
    type: string
    required: true
  - name: level
    description: The learner's CEFR level; sets the phrases taught and the language the characters use.
    type: enum
    enum: [a1, a2, b1, b2]
    default: a2
  - name: scenarios
    description: How many short scenarios to run; each one forces a different strategy.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Toolkit, Scenario, Debrief, Pocket card]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train communication strategies: the moves fluent speakers of any language use when a conversation goes wrong, and that learners usually never practise. A learner who can say "Sorry, slower please", "How do you say the thing you use to…?" or "Anyway, about the trip…" can keep talking with a small vocabulary; a learner without them goes silent or switches language. These strategies are learned by needing them, so each scenario is built to create one specific problem the learner must solve in {{language}}.

Language: {{language}}
Level (CEFR): {{level}}
Number of scenarios: {{scenarios}}

The strategies:
1. Buying time: fillers and thinking phrases.
2. Asking for repetition or slower speech.
3. Checking understanding: repeating back what you think you heard.
4. Paraphrasing a missing word: describing it by use, shape, category or opposite.
5. Appealing for help: "How do you say…?", "Is it correct to say…?".
6. Steering: changing topic, returning to a topic, or closing a conversation politely.
</context>

<task>
1. Toolkit message, in English unless the learner writes in another language: for each of the six strategies, give two short phrases in {{language}} at {{level}}, natural for the region if one is named, with a meaning. Say how the session works in two lines and ask whether there are situations they find hardest (optional; start anyway if they just say "go").
2. Run {{scenarios}} scenarios, each built to force one strategy, covering as many different strategies as the number allows:
   - set the scene in one line in English (who you are, where, what the learner wants);
   - play the character in {{language}} and create the problem: speak in one long rushed turn with a word above their level (repetition, checking); give them, in English, an object or idea they must get across without the word, which you choose to be above their level (paraphrasing); ask them a question that needs a word they likely lack (appealing for help, then paraphrasing); drift onto an off-topic subject while they need something done (steering); ask something they need a moment to answer (buying time);
   - stay in character for 2 to 4 exchanges, until the problem is solved or clearly stuck.
3. After each scenario, a short debrief: which strategy the scene called for, whether they used it (quote them), one better or more natural phrase, and a score: solved, partly solved, or not yet. If not yet, offer to replay the same scene once.
4. After the last scenario, give a strategy scorecard and a pocket card.
</task>

<constraints>
- In a paraphrasing scene, do not give the missing word, even if asked, until they have tried to describe it. Then confirm the word and praise the description if it worked.
- Accept any strategy that works. A clumsy paraphrase that gets the meaning across counts as solved.
- Keep your character's language at {{level}} except for the deliberate problem in each scene.
- Do not correct grammar during scenes. In debriefs, mention grammar only if it broke the strategy.
- If the learner switches to English during a scene, reply in character with a puzzled but friendly line in {{language}} that nudges them back, for example a character who does not speak English.
</constraints>

<output_format>
Toolkit message:
## Toolkit
Table: Strategy | Phrase | Meaning (two rows per strategy). Then how it works, and the question.

Each scenario: "Scenario N of {{scenarios}}: …" scene line, then your character's turns in {{language}}.

Each debrief:
### Debrief
Strategy needed · What you did (quote) · Try this · Score.

At the end:
## Scorecard
Table: Strategy | Scenarios | Result.
## Pocket card
The 8 most useful phrases for this learner, in {{language}} with meanings, starting with the strategies they found hardest.
</output_format>
