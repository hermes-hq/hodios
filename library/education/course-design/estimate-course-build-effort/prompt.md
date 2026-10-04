---
schema: 1
id: estimate-course-build-effort
kind: prompt
title: Estimate course build effort
description: Estimates the effort to build a course by format (instructor-led, e-learning by interactivity level, video) using hours-per-finished-hour ranges, roles, review cycles and risks, given as a range.
category: course-design
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, consultant, teacher]
requires: [none]
inputs: [text, spec]
output: [table, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [effort-estimation, development-ratios, learning-and-development, scoping, review-cycles, freelance-quoting]
pairs_with:
  prompts: [design-elearning-module, design-course-outline, plan-course-pilot]
  personas: [instructional-designer]
args:
  - name: course_scope
    description: What will be built - topic, audience, finished learning time per format (e.g. "2 hours instructor-led, 45 minutes e-learning with branching scenarios, 6 short videos"), source material state (ready, scattered, none), languages, accessibility and LMS needs, and deadline.
    type: text
    required: true
  - name: team
    description: Optional. Who is available (designer, developer, SME, video, reviewer), their hours per week, tools, and how many stakeholders sign off.
    type: text
output_contract:
  format: markdown
  sections: [Scope as understood, Estimate by component, Effort by role, Schedule, Assumptions, Risks and contingency, Ways to reduce effort]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Course build estimates go wrong in the same ways: one number is given instead of a range, "1 hour of e-learning" is treated the same whether it is page-turning or a branching simulation, subject-matter expert time and review rounds are left out, scattered source material is assumed ready, and translation, accessibility, LMS testing and pilot fixes appear only at the end. A defensible estimate breaks the work into components, applies hours-per-finished-hour ranges by format and interactivity, adds the roles and review cycles explicitly, and states assumptions so the client or manager can see what moves the number.
</context>

<task>
<course_scope>
{{course_scope}}
</course_scope>
{{#team}}
<team>
{{team}}
</team>
{{/team}}

1. Restate the scope as components with finished learning time each: instructor-led sessions (with facilitator guide, slides, activities, handouts), e-learning by interactivity (basic: text, images, simple questions; moderate: scenarios, interactions, audio; advanced: branching simulations, custom media), video (talking head, screen capture, animation), job aids and assessments.
2. Apply rough hours-per-finished-hour ranges as starting points, labelled as commonly quoted industry rules of thumb that vary widely: for example instructor-led about 25-80 hours per hour, basic e-learning about 50-125, moderate about 125-275, advanced 200-700 or more; short video by minute of finished footage depending on style. Adjust up or down for the source material state, the team's experience, reuse of templates and stakeholder count, and say why.
3. Split effort by role: instructional design, development or authoring, media, subject-matter expert time (often underestimated: interviews, reviews, checking accuracy), project management (10-15% is common), quality assurance and accessibility, LMS set-up and testing, translation or localisation if needed.
4. Add review cycles explicitly (for example design document, storyboard or script, alpha, beta, final), with the time each takes and who reviews.
5. Build a schedule from the team's hours per week, showing the critical path and whether the deadline holds.
6. Give the total as low, likely and high, and a contingency for the top risks.
7. Suggest ways to reduce effort without hurting learning: fewer interactivity levels, job aids instead of modules, templates, cutting nice-to-know content, piloting a slice first.
</task>

<constraints>
- Always a range; show the arithmetic behind each component. If the user insists on one number, give the likely figure as the number to quote, with the range and the two or three assumptions that move it in one short line underneath.
- If team hours per week are not given, assume them, state the assumption, and show how the schedule changes if they differ.
- Label every ratio as an assumption to calibrate against the team's own past projects.
- Do not quote day rates or prices unless the user gives them; if they do, convert hours to cost with the arithmetic shown.
- If finished learning time or format is unknown, ask for it, or estimate two clearly different scenarios and say which questions would decide between them.
</constraints>

<output_format>
## Scope as understood
Table: Component | Format and level | Finished time.
## Estimate by component
Table: Component | Hours per finished hour (range) | Low | Likely | High. Totals row.
## Effort by role
Table: Role | Low | Likely | High.
## Schedule
Bullets or table by phase and week, with review cycles and critical path.
## Assumptions
Bullets.
## Risks and contingency
Table: Risk | Effect on effort | Mitigation.
## Ways to reduce effort
Bullets with the hours each saves.
</output_format>
