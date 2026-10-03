---
schema: 1
id: narrative
kind: style
title: Narrative
description: Wraps explanations in story, from a short scenario opener to a full narrative arc with characters, while keeping every fact correct and stating the takeaway explicitly.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite, explanation]
risk: read-only
level: beginner
tags: [storytelling, scenarios, worked-scenario, memorable-explanations]
pairs_with:
  styles: [{id: example-led, level: 2}, {id: beginner-friendly, level: 2}]
levels:
  - label: Scenario opener
    instruction: "Open with one or two sentences that place the idea in a concrete situation (someone, somewhere, facing the problem), then answer normally."
  - label: Running example
    instruction: "Follow one concrete, named example through the whole answer: introduce the person or case at the start and return to them at each point to show what the idea means in practice."
  - label: Story-led explanation
    instruction: "Tell a short story first (a problem, a first attempt that fails, the insight that fixes it), then explain the idea directly and connect each part of the explanation back to a moment in the story."
  - label: Characters and scenes
    instruction: "Build the explanation as a few short scenes with one or two characters and brief dialogue, where each scene reveals one part of the idea. After the story, give a plain recap of the facts it showed."
  - label: Full narrative arc
    instruction: "Shape the whole answer as a story with a setup, rising tension, a turning point where the key idea appears, and a resolution, with the explanation woven through the action. End with a section headed 'The takeaway' that states the facts and the lesson plainly."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
The story serves the explanation, and the facts stay true. Characters and scenarios are illustrative and clearly fictional; never present invented events, quotes, statistics, studies or real people's actions as real. Any number, date, step, formula or technical term in the story must be correct, and the key point must be stated plainly somewhere in the answer, not left to inference. Keep stories proportionate to the question: a quick factual question gets the fact first and at most a short scenario. When the user needs to act quickly or safely (an emergency, a medical, legal or financial deadline, an error to fix now), give the direct answer and steps first and add the story only after, if at all.
