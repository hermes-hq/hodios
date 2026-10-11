---
schema: 1
id: prepare-prototype-for-usability-test
kind: prompt
title: Prepare a prototype for usability testing
description: Checks a prototype is ready for usability sessions against the test tasks, covering task paths, realistic data, dead ends, reset steps, device setup and fallbacks, and lists fixes before the pilot.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [designer, ux-researcher]
requires: [none]
inputs: [text, notes, image]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [prototype-testing, test-readiness, pilot-session, clickable-prototype, session-prep]
pairs_with:
  prompts: [write-usability-test-plan, plan-mobile-usability-test, brief-usability-test-observers]
  personas: [ux-researcher]
args:
  - name: tasks
    description: The usability test tasks and the expected path for each.
    type: text
    required: true
  - name: prototype
    description: What the prototype covers, the tool and fidelity, how navigation works, and known gaps. Screens or a flow description help.
    type: text
    required: true
  - name: format
    description: Moderated or unmoderated, remote or in person, and devices. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Readiness verdict, Task path coverage, Content and data, Dead ends and off-path behaviour, Technical and device setup, Reset and session logistics, Fix list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many usability sessions are spoiled by the prototype, not the design. Participants take a reasonable alternative path that was never linked and the moderator has to rescue them; placeholder text and "John Doe" data make people comment on the fake content; hotspot hints flash when someone clicks the wrong place, revealing the answer; typed fields do not accept input so tasks that depend on typing feel broken; the prototype keeps state from the last participant; large files load slowly on a participant's phone. Unmoderated tests are least forgiving because nobody can explain a dead end. Walking every task path, including the likely wrong turns, against the actual test tasks, then running a pilot session, catches most of this.
</context>

<task>
<tasks>
{{tasks}}
</tasks>

<prototype>
{{prototype}}
</prototype>
{{#format}}

<format>
{{format}}
</format>
{{/format}}

1. Readiness verdict: ready, ready with fixes, or not ready, with the main reason.
2. Task path coverage: for each task, the expected path, the 1 to 3 most likely alternative paths, and whether each is built, needs a "not available in this prototype" screen, or must be handled by the moderator.
3. Content and data: realistic names, numbers, images and copy that fit the scenario; consistent data across screens; no lorem ipsum where people need to read to decide.
4. Dead ends and off-path behaviour: unlinked elements, hotspot hinting turned off, form fields and how typing is simulated, back button behaviour, scroll and fixed elements.
5. Technical and device setup: device and screen size, sharing method, load time, offline or slow-network risk, accessibility of the prototype if testing with assistive technology.
6. Reset and session logistics: how to reset state between participants, a starting link per task if needed, a backup copy, and what the moderator does if it breaks.
7. Fix list ordered by impact on the tasks, then a pilot session plan.
</task>

<constraints>
- Judge readiness against the given tasks only; do not ask for the whole product to be built.
- Do not invent prototype tool features; describe the need (for example "disable click hints") and say to check the tool's setting.
- If tasks reveal the answer through their wording or the prototype gives no way to fail, say so.
</constraints>

<output_format>
## Readiness verdict
## Task path coverage
| Task | Expected path | Likely alternative paths | Status |
## Content and data
## Dead ends and off-path behaviour
## Technical and device setup
## Reset and session logistics
## Fix list
| Fix | Affects task | Priority |
</output_format>
