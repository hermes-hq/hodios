---
schema: 1
id: implement-game-ai-behavior
kind: prompt
title: Implement game AI behaviour
description: Implements enemy or NPC behaviour with a fitting technique (state machine, behaviour tree, utility AI or GOAP), perception, pathfinding hooks and debug views, tuned for fun over optimal play.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [game-developer]
stack: []
requires: [none]
inputs: [text, file]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [npc, behaviour-trees, state-machines, utility-ai, pathfinding, enemy-design]
pairs_with:
  personas: [game-developer]
  prompts: [implement-state-machine, generate-procedural-levels]
args:
  - name: behaviour_description
    description: The enemy or NPC, what the player should experience ("guards that are scary but beatable by stealth"), its actions and senses, how many run at once, and any existing code.
    type: text
    required: true
  - name: engine
    description: Engine and version, plus navigation tools in use (NavigationAgent, NavMesh, A* grid).
    type: string
    default: engine-agnostic
output_contract:
  format: markdown
  sections: [Player experience goals, Technique choice, Behaviour design, Perception, Code, Debug tools, Tuning and playtest]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants enemy or NPC behaviour for a game. Engine and navigation: {{engine}}. Game AI is a performance for the player, not a search for the optimal move: enemies that aim perfectly, flank flawlessly and never lose track feel unfair. Experienced designers telegraph intent (wind-ups, barks, alert states), give the player reaction time, limit how many enemies attack at once (attack tokens), add deliberate imperfection, and make state readable. Technique follows complexity: a finite state machine for a few clear states; a hierarchical state machine or behaviour tree when behaviours share sub-behaviours and need priorities and interrupts; utility AI when many options compete on context (needs-based NPCs, tactical choice); GOAP when NPCs must chain actions toward goals in varied worlds. Common failures: perception that reads the player's position directly (no line of sight, no memory, no hearing), every agent pathfinding every frame, and no debug view, making tuning guesswork.
</context>

<task>
<behaviour_description>
{{behaviour_description}}
</behaviour_description>

1. Write the player experience goals: what the player should feel, how they can read and counter the AI, and difficulty levers. If the intended experience is missing, ask.
2. Choose the technique with a short comparison and why; prefer the simplest that fits.
3. Design the behaviour: states or tree nodes or utility considerations with response curves, transitions and priorities, interrupts (taking damage, hearing noise), telegraphs and cooldowns, and group coordination (attack tokens, spacing, roles) if several agents act at once.
4. Design perception: a vision cone with line-of-sight raycasts at a limited rate, hearing from noise events with radius, a memory of last known position that decays, suspicion levels that rise over time instead of instant detection, and team sharing of information if wanted.
5. Write the code for {{engine}}: a data-driven structure so designers can tune without code changes, pathfinding through the engine's navigation with path requests throttled and staggered across frames, and an update budget (for example AI think rates of 5-10 Hz with movement every frame).
6. Add debug tools: on-screen state label, vision cone and hearing radius gizmos, last known position marker, utility scores, and a log of decisions.
7. Give tuning knobs and a playtest plan: what to watch for (unfair deaths, enemies stuck, predictable loops) and which parameter to change.
</task>

<constraints>
- Do not give AI access to information the player would consider cheating unless the design calls for it, and say when it does.
- Do not invent engine APIs; state versions assumed.
- Keep agents within a stated CPU budget for the number running at once.
</constraints>

<output_format>
## Player experience goals
Bullets.
## Technique choice
Table: Technique | Fit | Cost; then the choice.
## Behaviour design
A text diagram of states or the tree, then a transitions or priority table.
## Perception
Bullets with values.
## Code
Files with names.
## Debug tools
Bullets.
## Tuning and playtest
Table: Knob | Default | Effect; then playtest checks.
</output_format>
