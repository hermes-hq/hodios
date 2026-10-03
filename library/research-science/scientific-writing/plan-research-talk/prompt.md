---
schema: 1
id: plan-research-talk
kind: prompt
title: Plan a conference or lab-meeting research talk
description: Plans a short research talk for a conference or lab meeting with a one-sentence message, timed slide sequence, figure choices, opening and close, and Q&A preparation. For researchers presenting work.
category: scientific-writing
version: 1.1.0
status: incubating
stage: [plan, ship]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [outline, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [conference-talk, slide-sequence, assertion-evidence, qa-prep, academic-presentation]
pairs_with:
  prompts: [design-scientific-figures, design-research-poster, explain-research-to-public]
  personas: [science-communicator]
args:
  - name: paper_or_project
    description: The paper, abstract or project notes the talk is about, including the key results and figures you have.
    type: text
    required: true
  - name: audience
    description: Who will be in the room, for example "specialists at a field conference", "my lab group", "mixed department seminar", "interdisciplinary job-talk committee".
    type: string
  - name: minutes
    description: Speaking time in minutes, not counting questions.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [The message, Structure and timing, Slide plan, Opening and closing, Q&A preparation, Rehearsal plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Plans within a format's own rules, such as the single static slide of a Three Minute Thesis, and drops Q&A when the format has none."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A short research talk is not the paper read aloud. In 10 to 20 minutes an audience can absorb one main message, the minimum context to care about it, enough method to trust it, two or three results that support it, and what it means. Talks fail when they try to cover everything, open with an outline slide and a literature review, show paper figures too dense to read from the back of the room, and run out of time before the conclusion. Assertion-evidence slides (a full-sentence headline stating the point, supported by a visual rather than bullets) are easier to follow and remember. Roughly one slide per minute is a useful ceiling, and talks run longer than rehearsed.
</context>

<task>
Plan a {{minutes}}-minute talk{{#audience}} for {{audience}}{{/audience}} about this work.
<work>
{{paper_or_project}}
</work>

1. Write the one-sentence message the audience should leave with, in plain words, and say what must be cut from the full paper to protect it.
2. Allocate the time: hook and question, context and gap, approach, results, implications and limitations, close. Keep at least 10 percent of the time as slack.
3. Plan each slide: an assertion headline (a full sentence), the visual (which figure, simplified how, or a diagram), what to say in two or three sentences, and seconds on screen. Simplify paper figures: one comparison per slide, larger labels, highlight the key contrast, build complex figures in steps.
4. Write the opening (a question, puzzle or concrete case, not an outline slide) and the closing slide that restates the message and stays up during questions with contact details and a pointer to the paper or preprint.
5. Prepare for questions: the eight most likely questions for this audience (including the hardest methodological one and "what would you do next"), a two- to three-sentence answer for each, and which backup slides to keep after the close.
6. Give a rehearsal plan with timing checkpoints.
</task>

<constraints>
- Use only results present in the input. If results are pending or missing, plan slides that present the question, design and expected analysis honestly, and mark [RESULT PENDING].
- Do not include more slides than about one per minute; explain any exception.
- Adjust depth to the audience: specialists need less context and more method; mixed audiences need more motivation, fewer acronyms and an explicit "why it matters".
- If the time given is very short (under about 7 minutes), plan a lightning format: problem, one result, takeaway.
- If the format has its own rules, plan within them and say so: for example a Three Minute Thesis allows one static slide and no props, so plan that slide and a spoken script instead of a slide sequence. If the format has no questions, replace the Q&A section with one line saying so.
- Do not invent audience questions that attack the work unfairly, but include the real weaknesses a fair critic would raise.
</constraints>

<output_format>
## The message
One sentence, plus what is cut.
## Structure and timing
A table: part | minutes | purpose.
## Slide plan
A table: # | headline (assertion) | visual | what to say | seconds.
## Opening and closing
The opening lines and the closing slide content.
## Q&A preparation
A table: likely question | short answer | backup slide.
## Rehearsal plan
Three or four steps with timing checkpoints.
</output_format>
