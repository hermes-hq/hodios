---
schema: 1
id: design-elearning-module
kind: prompt
title: Design an e-learning module
description: Designs a self-paced e-learning module with objectives, a screen-by-screen storyboard, interactions, knowledge checks and accessibility notes. For instructional designers and L&D teams.
category: course-design
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, consultant, manager]
requires: [none]
inputs: [topic, document, notes]
output: [table, quiz, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [storyboard, elearning, l-and-d, multimedia-learning, wcag, scenario-based-learning]
pairs_with:
  prompts: [write-learning-objectives, design-workshop, write-multiple-choice-questions]
  workflows: [course-design-track]
args:
  - name: topic
    description: What the module teaches, plus any source content (policy, procedure, SME notes) and the behaviour change it should produce.
    type: text
    required: true
  - name: audience
    description: Optional learners' roles, prior knowledge, motivation, devices and context, e.g. "warehouse staff on shared tablets, English as a second language for many".
    type: text
  - name: duration_minutes
    description: Target completion time in minutes.
    type: number
    default: 20
  - name: authoring_tool
    description: Optional authoring tool, e.g. "Articulate Storyline", "Rise", "Adobe Captivate", "H5P". Used only to keep interactions feasible.
    type: string
output_contract:
  format: markdown
  sections: [Design summary, Objectives, Module structure, Storyboard, Knowledge checks, Accessibility, Developer notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most self-paced e-learning is "click next" reading with a quiz at the end: it informs, but it rarely changes what people do. Modules that work are built backwards from the behaviour on the job, use realistic decisions and scenarios rather than click-to-reveal, follow the evidence on multimedia learning (cut what is not needed, signal what matters, do not read on-screen text aloud word for word, break content into learner-paced segments), and are accessible from the start, not retrofitted.
</context>

<task>
Design a self-paced module of about {{duration_minutes}} minutes on this topic{{#authoring_tool}}, to be built in {{authoring_tool}}{{/authoring_tool}}.

<topic>
{{topic}}
</topic>
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. **Design summary:** the performance goal (what learners will do differently on the job), who the learners are, and whether e-learning is the right fix. If the problem is really a process, tool or motivation issue, say so briefly.
2. **Objectives:** 2 to 5 objectives with observable verbs, each tied to the performance goal.
3. **Module structure:** sections with estimated minutes that add up to about {{duration_minutes}}. Allow roughly one minute per content screen and more for scenarios. Open with relevance (a realistic situation or a problem), not a list of objectives.
4. **Storyboard:** every screen in order. For each: on-screen text (short), narration if any (complementing, not duplicating, the on-screen text), visuals, the interaction and its purpose, branching and feedback, and notes for the developer. Prefer interactions that make learners decide (scenarios with consequences, sorting, spotting the error) over click-to-reveal and drag-and-drop for its own sake.
5. **Knowledge checks:** at least one per objective, at application level, written as realistic situations. Give each option tailored feedback that explains why, and state the completion and passing criteria.
6. **Accessibility:** to WCAG 2.2 AA: captions and transcripts for audio and video, alt text for meaningful images, keyboard operability for every interaction (with an accessible alternative to drag-and-drop), colour contrast and no meaning carried by colour alone, no time limits, readable plain language and reading order. Note any interaction that needs an alternative.
7. **Developer notes:** tracking (completion and score as SCORM or xAPI, according to the LMS), assets to source or create, variables and branching logic, and points to check with a subject-matter expert.
</task>

<constraints>
- Base content on the source material given; mark anything you added from general knowledge so a subject-matter expert can verify it, and never invent policy details, figures or legal requirements.
- Keep interactions feasible for the stated tool; if you are not sure the tool supports something, say "check that your tool supports this" rather than asserting it.
- If the topic is too large for {{duration_minutes}} minutes, propose a series of shorter modules and design the first.
- Write for the audience's reading level and language background.
</constraints>

<output_format>
Use the section headings from the output contract. Module structure as a table: Section | Objective | Minutes. Storyboard as a table: Screen | On-screen text | Narration | Visual | Interaction and feedback | Dev notes. Knowledge checks as numbered items with options and per-option feedback.
</output_format>
