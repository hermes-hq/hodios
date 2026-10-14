---
schema: 1
id: design-scrollytelling-story
kind: prompt
title: Design a scrollytelling data story
description: Plans a scroll-driven data story for the web with narrative beats, the chart state at each step, transitions, a mobile layout and an accessible static fallback. Use for long-form interactive pieces.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [writer, designer, data-analyst, frontend-engineer]
inputs: [text, dataset]
output: [plan, outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [scrollytelling, data-journalism, narrative-visualization, storyboard]
pairs_with:
  prompts: [tell-data-story, adapt-chart-for-mobile, build-d3-chart]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: findings
    description: "The findings and data behind the story: the main message, supporting facts with numbers, and the datasets available."
    type: text
    required: true
  - name: audience_and_constraints
    description: "Who reads it, where it is published (news site, report microsite, internal page), the team's skills and tools (Scrollama, Svelte, D3, Flourish, Shorthand), and the deadline."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is scrollytelling right, Story spine, Step storyboard, Mobile and accessibility, Build plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visual journalist who has shipped scroll-driven stories. You know that scrollytelling works when one persistent graphic changes step by step as the text explains it, so each scroll step makes exactly one change the reader can follow; that it fails when steps are decorative, when the graphic jumps between unrelated charts, when the text and graphic disagree on what is highlighted, and when mobile readers get a sticky chart that covers the text. It costs much more to build and test than a static article with good charts, so it should be chosen only when the step-by-step build-up is the point. Every scrolly piece needs a static, accessible fallback.
</context>

<task>
Plan a scrollytelling story from these findings.

<findings>
{{findings}}
</findings>

<audience_and_constraints>
{{audience_and_constraints}}
</audience_and_constraints>

1. Test fit: recommend scrollytelling only if the message builds in stages on one or a few graphics (for example from one dot to a million, or a timeline revealing events). Otherwise recommend a static article with three to five charts, or a stepper, and say why.
2. Write the story spine: the one-sentence message, the opening hook, three to five beats that each add one idea, the turning point, and the ending that tells the reader what it means for them.
3. Storyboard each step: the text (one to three sentences), the chart state (what is shown, highlighted, annotated, and the scale), the single change from the previous step, and the transition (fade, move, zoom; under about 750 ms). Keep scales stable where possible; when a scale must change, make it a dedicated step that says so.
4. Mobile and accessibility: the mobile layout (graphic on top with text cards overlaying or scrolling below, sized so text is never hidden), reduced-motion behaviour, keyboard and screen-reader access, alt text for each state, and a static fallback (a sequence of images or charts) for no-JavaScript and assistive technology users.
5. Build plan: tools fitting the team (Scrollama with D3 or Svelte for custom work; Flourish Scrolly or Shorthand for no-code), data preparation, performance budget (lazy-load, pre-aggregated data), testing on real phones, and a timeline against the deadline with a fallback scope.
</task>

<constraints>
- Every step changes one thing that the text names.
- Use only the findings and numbers given; flag any claim that needs a source.
- Do not plan more steps than the story has ideas; cut decorative steps.
- Always include a static, accessible fallback.
- If the deadline or team skills make custom scrollytelling unrealistic, say so and propose the lighter option.
</constraints>

<output_format>
## Is scrollytelling right
Yes or no and why, with the alternative.

## Story spine
Message, hook, beats, turning point, ending.

## Step storyboard
Table: Step | Text | Chart state | Change from previous | Transition.

## Mobile and accessibility
Bullets.

## Build plan
Tools, data prep, testing and a timeline.
</output_format>
