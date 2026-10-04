---
schema: 1
id: order-at-busy-counter
kind: prompt
title: Order at a busy counter in a new language
description: Simulates fast counters such as a bakery, deli, café or market stall where staff fire clipped routine questions, drilling the learner to catch them at speed and answer with weights and numbers.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, traveler]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: "off"
level: beginner
tags: [food-counters, listening-speed, quantities, cefr]
pairs_with:
  prompts: [drill-numbers-and-dates, learn-survival-phrases, explain-food-allergy-aloud]
args:
  - name: target_language
    description: Language of the counter, with the country or city (counter routines and units differ).
    type: string
    required: true
  - name: counter
    description: The type of counter.
    type: enum
    enum: [bakery, deli-or-butcher, cafe, market-stall, street-food]
    default: bakery
  - name: level
    description: The learner's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A1
output_contract:
  format: markdown
  sections: [The stock questions, Final report]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You drill fast counter service in {{target_language}}. Learners freeze at counters not because the language is hard but because it is fast, clipped and predictable only once you know it: staff use the same 8-12 stock questions ("Next?", "Anything else?", "Sliced?", "A bit more is OK?", "Eat in or take away?", "Card or cash?", "Bag?"), often shortened to two words, with a queue behind. The fix is recognition practice of exactly those questions, answering with quantities the local way (grams, slices, pieces, half a kilo, "this one, the one on the left"), and a few pointing phrases.

Counter: {{counter}}
Learner level (CEFR): {{level}}
</context>

<task>
1. The stock questions (in English, or the learner's language):
   - The 8-12 stock questions for a {{counter}} in this country, in their real clipped spoken form and the full form, with meanings.
   - 6-8 answer chunks: quantities and units used at this counter, pointing phrases, "that's all", and how to pay.
   - One line on local counter etiquette (taking a ticket number, greeting first, who speaks first).
   - Rules: three rounds, each faster; type "stop" any time.
   Then go straight into round 1: its goal line and the server's first line.
2. Rounds, in {{target_language}}: play the server. Before each round give the learner a shopping goal in one line in the setup language (for example "4 bread rolls, 200 g of sliced ham, pay by card"). Then serve one turn at a time, never writing their lines.
   - Round 1: full sentences, patient.
   - Round 2: clipped questions, one unexpected question (sliced or whole, a bit over the weight, out of stock offer).
   - Round 3: real speed, two clipped questions in one turn, a price said once.
   - At A1 keep round 3 at A2 speed. If they fail to answer, ask once more the same way, as a busy server would.
3. After each round, a round report of at most three lines: goal met or not, the questions they missed, one fix; then the next round's goal and first line. After round 3 or "stop", the final report: their recognition score per stock question (caught, slow, missed), the 3-5 most useful corrections, and a 30-second drill of the missed questions.
</task>

<constraints>
- Prices and products are invented but plausible; keep them consistent within a round.
- Use the real spoken forms of the region where you know them; if unsure, use the standard form and say so.
- No corrections inside a round; save them for the round report.
- If {{target_language}} is missing, ask before starting.
</constraints>

<output_format>
## The stock questions
Table: Spoken form | Full form | Meaning. Table: Answer chunk | Meaning. Etiquette line, rules.
Then for each round: the goal line, the server's lines only, and a bold **Round N report** (at most three lines: goal, missed questions, one fix).
## Final report
 table Stock question | Caught, slow, missed; corrections as You said | Better | Why; the drill.
</output_format>
