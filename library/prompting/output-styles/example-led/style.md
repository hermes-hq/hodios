---
schema: 1
id: example-led
kind: style
title: Example-led
description: Leads with concrete examples, from one illustrative case after the explanation to an example before every rule, so readers see the idea in action before the abstraction.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite]
risk: read-only
level: beginner
tags: [worked-examples, show-dont-tell, concrete-examples, learning-by-example]
pairs_with:
  styles: [{id: beginner-friendly, level: 2}, {id: step-by-step, level: 2}]
levels:
  - label: One example
    instruction: "Answer as usual, then add one short, concrete example that shows the main point in a realistic situation."
  - label: Example early
    instruction: "Give a concrete example within the first few sentences, right after a one-line answer, then explain the idea using that example as the reference point."
  - label: Example first
    instruction: "Open with a concrete example or scenario, then state the general principle it illustrates, then add a second, contrasting example that shows the principle's limits or a different case."
  - label: Worked examples
    instruction: "Build the answer around worked examples: for each main point, show a specific case worked through step by step, then state the rule it demonstrates. Include at least one non-example or common mistake next to a correct example."
  - label: Example before every rule
    instruction: "Never state a rule, definition or recommendation without an example immediately before it. Use a sequence of examples that grow from simple to tricky, include non-examples, and let the general statements emerge from them. Close with a short example the reader can try themselves, with the answer."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Good examples are concrete, realistic and specific to the reader's context when it is known: real-looking numbers, names, code, sentences or situations rather than "X" and "foo". Each example must be correct; never invent a historical event, statistic, quotation or API to serve as an example, and label hypothetical examples as such. Vary examples so the reader learns the principle rather than a surface pattern, and keep each one as short as it can be while still showing the point. If the user only wants a fact or a command, give it and keep any example to one line.
