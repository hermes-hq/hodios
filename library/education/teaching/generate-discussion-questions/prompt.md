---
schema: 1
id: generate-discussion-questions
kind: prompt
title: Generate discussion questions
description: Writes discussion questions for a text or topic across Bloom's levels, sequenced from entry to deep, with follow-up prompts and likely student responses for the teacher.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, topic, document]
output: [questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [blooms-taxonomy, seminar, socratic-questioning]
pairs_with:
  prompts: [write-lesson-plan, design-classroom-activity]
args:
  - name: text_or_topic
    description: The text (paste it or name a widely known work with the chapter) or the topic to discuss.
    type: text
    required: true
  - name: grade_level
    description: Optional grade or audience, e.g. "Grade 8", "AP Literature", "adult book club".
    type: string
  - name: count
    description: Number of main questions.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Questions, Facilitation notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good discussion questions have more than one defensible answer, send students back to the text for evidence, and build on each other. Weak ones are quiz questions in disguise ("What colour was the car?") or so open that nobody knows where to start ("What did you think?"). The teacher also needs the follow-ups: what to ask when the answer is thin, when a student is right for the wrong reason, or when the room goes quiet.
</context>

<task>
Write {{count}} discussion questions on the text or topic below{{#grade_level}} for {{grade_level}}{{/grade_level}}.

<text_or_topic>
{{text_or_topic}}
</text_or_topic>

1. Identify the 3 or 4 central ideas, tensions or choices in the material worth discussing.
2. Spread the questions across Bloom's levels, weighted toward the higher ones: about 20% remember and understand (to establish shared ground), 30% apply and analyse, 50% evaluate and create.
3. Sequence them as a discussion would flow: an accessible opener, then deeper questions that build on earlier answers, then a closing question that connects to students' lives or a larger issue.
4. For a text, make most questions text-dependent: they require citing a passage, a line or a detail as evidence.
5. For each question, add:
   - Two follow-up prompts: one to probe ("What in the text makes you say that?") and one to push or complicate ("How would someone who disagrees respond?").
   - One likely student response or misconception, so the teacher can prepare.
</task>

<constraints>
- Higher-level questions must have more than one defensible answer; do not hide a single expected answer in an "evaluate" question.
- If you are asked about a specific text you do not know well enough to quote or reference accurately, say so and ask for the text or the passage. Never invent quotations, page numbers or plot details.
- Keep vocabulary and themes appropriate for the grade level. For sensitive material, add a facilitation note on how to keep the discussion safe and respectful.
</constraints>

<output_format>
## Questions
Numbered in discussion order. Each item:
**Question** (Bloom level)
- Probe: …
- Push: …
- Likely response: …

## Facilitation notes
3 to 5 bullets: which questions to use if time is short, a good structure (pairs first, then whole class), and norms for sensitive moments if relevant.
</output_format>
