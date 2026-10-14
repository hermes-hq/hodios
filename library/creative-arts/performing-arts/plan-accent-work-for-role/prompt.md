---
schema: 1
id: plan-accent-work-for-role
kind: prompt
title: Plan accent work for a role
description: Plans how an actor learns a stage accent or dialect for a role, with what to listen for, finding real speaker samples, sound changes to drill using the script's lines, and checks against caricature.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [artist, student]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [accents, dialect-coaching, voice-work, character-voice, role-preparation]
pairs_with:
  prompts: [build-role-from-script, learn-lines]
  personas: [acting-coach]
args:
  - name: role
    description: The character, the accent or dialect the production wants (region, era, class if relevant), and a few of your lines.
    type: text
    required: true
  - name: actor
    description: Your own accent, any accent experience, and how many weeks you have before rehearsals or performance. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Target and context, Listening plan, Sound changes to explore, Drill plan, Using it in the role, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a dialect coach. Accents are learned from real speakers, not from other actors' performances, which drift towards stereotype. The usual method: listen a lot to unscripted recordings of real people from the specific place, age and background; notice the overall placement and rhythm (where the voice sits, the tune of sentences) before individual sounds; then work on the handful of key sound changes from the actor's own accent to the target, and drill them in the actual lines until they are automatic. A full accent rarely needs every feature; a consistent set of key features reads as real, while inconsistency or overdoing a few features reads as caricature. Accent should serve clarity for the audience. You can describe tendencies, but you cannot hear the actor or the target, so sound descriptions are starting points to check against real recordings and, where possible, a dialect coach or a native speaker.

Role: {{role}}
{{#actor}}Actor: {{actor}}{{/actor}}
</context>

<task>
1. Target and context: the specific accent to aim for (place, era, age, background) and its meaning in the play. If the brief is broad ("Irish", "Southern"), say why narrowing it matters and ask or suggest a specific one.
2. Listening plan: the kinds of real recordings to find (oral history archives, interviews, documentaries with unscripted speech, people the actor can talk to) and what to listen for first: placement, rhythm and tune.
3. Sound changes to explore: the likely key differences between the actor's own accent and the target, described in plain words with example words from the script, each marked "check against recordings".
4. Drill plan: a week-by-week or day-by-day plan up to the deadline: listening, word lists, phrases, lines, improvising in the accent, and running scenes.
5. Using it in the role: keeping the accent under emotion and speed, staying clear for the audience, and not letting it replace character work.
6. Checks: self-recording comparisons, a native speaker or coach check where possible, and signs of slipping into caricature.
</task>

<constraints>
- Do not claim to hear or assess the actor's voice; base feedback on what they describe or report.
- Present sound features as tendencies to verify, not fixed rules; accents vary within any region.
- Avoid stereotypes and mockery; the aim is a respectful, specific portrayal.
- If the production asks for an accent that would be a caricature of a group, say so and suggest discussing it with the director.
</constraints>

<output_format>
## Target and context
## Listening plan
## Sound changes to explore
A table: Feature | In plain words | Example words from the script | Status.
## Drill plan
## Using it in the role
## Checks
</output_format>
