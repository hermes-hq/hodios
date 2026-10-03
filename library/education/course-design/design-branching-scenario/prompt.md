---
schema: 1
id: design-branching-scenario
kind: prompt
title: Design a branching training scenario
description: Designs a branching decision scenario with a realistic situation, choices, consequences, feedback and a debrief. Use to train judgement in e-learning or a live facilitated session.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher, consultant, manager]
requires: [none]
inputs: [topic, notes]
output: [script, diagram, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scenario-based-learning, branching, judgement-practice, e-learning, debrief]
pairs_with:
  prompts: [design-elearning-module, design-onboarding-curriculum, design-workshop]
  personas: [instructional-designer, corporate-trainer]
args:
  - name: skill
    description: The judgement or skill to practise and the real situations where it is used, e.g. "handling an angry customer who wants a refund outside policy".
    type: text
    required: true
  - name: audience
    description: Who plays the scenario and what they already know, e.g. "new retail shift supervisors".
    type: string
    required: true
  - name: decision_points
    description: How many decisions the learner makes on the main path.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Scenario brief, Branch map, Scenes, Endings, Debrief, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A branching scenario trains judgement by letting people make the decisions they face at work and see what happens. It works when the situation is specific and believable, every option is something a real person might choose, and consequences unfold in the story before any instructional feedback appears. Weak scenarios have one obviously correct option, "wrong" choices nobody would make, and an instant "Incorrect!" that teaches nothing. Full branching explodes in size, so practical designs fold paths back together and let a poor choice make later decisions harder rather than spawning a whole new tree.
</context>

<task>
Design a branching scenario with {{decision_points}} decision points on the main path.

<skill>
{{skill}}
</skill>

Audience: **{{audience}}**

1. If the skill is too general to stage as one situation (for example "leadership" or "communication"), ask which specific situation to stage and stop. If real mistakes people make are not given, base distractors on common, plausible errors and mark them for a subject-matter expert to confirm.
2. **Scenario brief:** the learning goal as an observable behaviour, the setting, the learner's role, the other characters (with what they want), and what is at stake. Keep it to one situation the audience actually meets.
3. **Branch map:** a Mermaid flowchart of scenes, choices and endings, using a foldback structure: poor choices lead to a recovery scene with a harder state, then rejoin the main line, so the total stays manageable (about 2 to 3 times the number of decision points in scenes).
4. **Scenes:** for each decision point write:
   - the situation in 60 to 120 words, with realistic dialogue;
   - three options: the strongest choice, a plausible but flawed choice, and a common mistake. All three should be tempting to someone in the audience; none is silly or rude for no reason;
   - for each option, the consequence shown in the story (what the other character says or does next), then a short feedback note that explains the principle in plain terms.
5. **Endings:** a strong, a mixed and a poor ending, each showing realistic outcomes, with a path back ("try again from scene 2").
6. **Debrief:** 5 or 6 questions that move from what happened to why it worked and how it applies at work, plus the 2 or 3 principles the scenario teaches.
7. **Build notes:** how to run it as e-learning (variables to track, such as trust or time, and where they change) and as a live session (the facilitator reads scenes, groups vote, discuss, then reveal).
</task>

<constraints>
- Keep the options similar in length and tone so the best one is not given away by being longest or kindest-sounding.
- Show consequences before feedback. Feedback explains; it never scolds.
- Do not invent organisation-specific policy, legal rules or safety procedures; use placeholders such as [refund limit] where they matter.
- Characters are diverse and realistic without stereotypes; no character is a caricature villain.
- Write for {{audience}}: vocabulary, setting and stakes they recognise.
</constraints>

<output_format>
## Scenario brief
Short paragraphs and a character list.
## Branch map
A Mermaid `flowchart TD` code block with node ids that match the scene headings.
## Scenes
One `###` heading per scene: situation, then options A/B/C each with Consequence and Feedback.
## Endings
Strong, mixed, poor.
## Debrief
Numbered questions, then key principles.
## Build notes
E-learning bullets, then live-session bullets.
</output_format>
