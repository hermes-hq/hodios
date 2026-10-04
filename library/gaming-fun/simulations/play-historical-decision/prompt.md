---
schema: 1
id: play-historical-decision
kind: prompt
title: Play a historical turning point
description: Places the player as an adviser at a real historical turning point, lets them choose a course, then compares their path with what happened, labelling documented, disputed and invented details.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
subject: [history]
requires: [none]
inputs: [topic, preferences]
output: [conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [counterfactual-history, decision-game, source-labelling, history-class]
pairs_with:
  prompts: [explain-historical-event]
  personas: [history-tutor]
args:
  - name: event
    description: The historical moment, for example "the Cuban Missile Crisis, October 1962", "Rome after Caesar's assassination" or "the 1854 Broad Street cholera outbreak".
    type: text
    required: true
  - name: role
    description: The player's position, for example "chief-adviser", "a city council member", "the ship's surgeon". Always an adviser or participant role, never the person responsible for an atrocity.
    type: string
    default: chief-adviser
  - name: level
    description: beginner = plain background and clear options; intermediate = more actors and context; expert = primary-source detail, competing historiography and open-ended choices.
    type: enum
    enum: [beginner, intermediate, expert]
    default: intermediate
  - name: turns
    description: Number of decision points before the comparison with history.
    type: number
    default: 6
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a historical decision game. The player stands inside a real turning point, without hindsight, and must advise on what to do next. Its value is twofold: the player feels the uncertainty the people of the time faced, and then learns what really happened and why. Accuracy is the whole point, so every statement you make carries a label that tells the player how much to trust it.

Event: {{event}}
Player's role: {{role}}
Level: {{level}}
Decision points: {{turns}}
</context>

<task>
1. If the event is missing or too vague to place in time, ask for it and stop. If it is within roughly the last twenty years, or so contested that a game would mislead, say so and suggest an earlier moment with a similar dilemma.
2. Open with a briefing written as of the starting date: where things stand, the main actors and what each wants, what is known and not known at that moment, and the player's position and access. Keep it to what people then could know.
3. Run {{turns}} decision points. Each one: the date, the new situation, two to four options that were genuinely considered or plausible at the time, and the chance to propose something else. After the player chooses, narrate the consequences up to the next decision point.
4. Label every factual statement: [Documented] for what the historical record supports, [Disputed] where historians disagree (name the disagreement in a few words), [Invented] for game dialogue, private thoughts and every consequence of a choice that departs from history. Once the player diverges from history, all later events are [Invented] counterfactuals, kept plausible.
5. Real people may appear, but anything they say in the game is [Invented] unless you are quoting something documented, and you never invent private motives as fact.
6. After the last decision, compare: a side-by-side of the player's choices and what actually happened at each point, why the real decision-makers chose as they did according to the record, what historians debate about it, and one or two sources or kinds of sources the player could read next.
</task>

<constraints>
- Never present invented detail as documented. If you are unsure whether something is documented, label it [Disputed] or say you are unsure.
- Treat atrocities, wars and suffering with seriousness; the player is never cast as the perpetrator of an atrocity, and violence is described without gore.
- Do not moralise at the player during play; save evaluation for the comparison, and keep it about consequences and context.
- Keep each turn to about 200 words before the options.
- Before each turn, check every label: anything after a divergence is [Invented]; no invented quote is attributed as real.
</constraints>

<output_format>
Each turn: a header "[Date: … | Decision n of {{turns}}]", the situation with inline labels, the options as a numbered list, and "What do you advise?".
Final comparison: a table with columns Decision point, Your choice, What happened [Documented], Why; then sections Debates among historians and Read next.
</output_format>
