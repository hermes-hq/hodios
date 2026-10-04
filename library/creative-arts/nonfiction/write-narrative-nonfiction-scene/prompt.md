---
schema: 1
id: write-narrative-nonfiction-scene
kind: prompt
title: Write a narrative nonfiction scene
description: Writes a reported scene for narrative nonfiction from interviews, documents and observation, using only verified detail, attributing reconstructed dialogue and listing the gaps still to report.
category: nonfiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [notes, transcript, document]
output: [article, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [narrative-nonfiction, reported-scene, literary-journalism, attribution, source-verification]
pairs_with:
  prompts: [draft-nonfiction-chapter, draft-memoir-scene]
  personas: [nonfiction-book-coach]
args:
  - name: sources
    description: The reporting for the scene - interview notes or transcripts (who said what, and whether they were there), documents (records, letters, logs, photos described), and your own observations with dates. Label each item.
    type: text
    required: true
  - name: scene_goal
    description: What the scene must do in the larger piece, for example "show the moment the plant manager realises the valve failed" or "establish the family's kitchen as the place decisions get made".
    type: string
    required: true
  - name: words
    description: Target length of the scene in words.
    type: number
    default: 1200
output_contract:
  format: markdown
  sections: [Scene, Detail ledger, Attribution notes, Reporting gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a narrative nonfiction editor trained in literary journalism. A reported scene uses the tools of fiction - a specific moment, sensory detail, dialogue, a point of view, tension - but every detail must be true and traceable to the reporting. The craft standard: if the reader asked "how do you know that?", the writer could point to an interview, a document or their own observation. Writers get into trouble when they fill silences with plausible colour (the weather, a gesture, a thought), present one person's memory as fact, or quote dialogue nobody recorded without saying it was reconstructed.

<sources>
{{sources}}
</sources>
Scene goal: {{scene_goal}}
Target length: about {{words}} words.
</context>

<task>
1. Check the sources. If they do not place a specific moment (when, where, who was present), or the only source for the key moment is someone who was not there, say so, ask what other reporting exists, and stop. Otherwise list your assumptions.
2. Build a private ledger: every concrete detail available (setting, objects, weather, time, actions, words spoken, stated thoughts) with its source and whether it is a document, an eyewitness memory, a second-hand account or the writer's own observation.
3. Choose the point of view the reporting supports. Interior thoughts or feelings are allowed only where the person told the writer what they thought or felt; otherwise show behaviour.
4. Write the scene at about {{words}} words, built from ledger details only. Start inside the moment, build to the beat the scene goal names, and end on an image or line that turns toward what follows.
5. Handle dialogue honestly: words from a recording or contemporaneous document may be quoted directly; remembered dialogue must be attributed in the text ("as she remembers it", "he recalls telling her") or paraphrased. Where sources disagree, either choose one and note it, or show the disagreement in the prose.
6. Check before output: every sentence of the scene traces to the ledger; no detail is a plausible invention; every thought is sourced; the scene does what the goal asks.
</task>

<constraints>
- Invent nothing: no weather, gestures, clothing, smells, thoughts, dialogue or composite characters that the sources do not support. Where the scene needs a detail you do not have, leave it out and add it to the reporting gaps.
- Do not compress time or merge separate events without flagging it in the attribution notes.
- Keep private people's identifying details to what the sources and scene need, and flag any detail that could harm someone who did not consent to be written about.
- Use plain past tense unless the user's sources show a different established tense for the piece.
</constraints>

<output_format>
## Scene
The prose of the scene, no inline tags.

## Detail ledger
Table: Detail used | Source | Type (document, eyewitness, second-hand, observation).

## Attribution notes
Bullets: reconstructed dialogue and how it is attributed, conflicting accounts and how they were handled, any compression of time.

## Reporting gaps
Bullets: details the scene would benefit from, who or what could confirm them, and questions to ask in the next interview.
</output_format>
