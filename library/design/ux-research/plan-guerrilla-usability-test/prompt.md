---
schema: 1
id: plan-guerrilla-usability-test
kind: prompt
title: Plan a guerrilla usability test
description: Plans a quick guerrilla usability test in a cafe, office or event with an approach script, short tasks, consent, note grid and same-day synthesis. For small teams without a research budget.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [designer, ux-researcher, product-manager, founder]
requires: [none]
inputs: [text, image]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guerrilla-testing, usability-testing, lean-research, intercept-testing, quick-research]
pairs_with:
  prompts: [write-usability-test-plan, synthesize-usability-findings, critique-ui-screen]
  personas: [ux-researcher]
args:
  - name: prototype
    description: What you will put in front of people (paper sketch, clickable prototype, live site or app), on what device, who it is for, and the one or two questions you most need answered.
    type: text
    required: true
  - name: location
    description: Where you plan to test (a cafe, a coworking space, your office lobby, a trade show, a library). Optional; leave empty for suggestions that fit the target users.
    type: string
  - name: minutes_per_session
    description: How long each session can last.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Focus, Where and who, Approach script, Consent, Tasks, Session script, Roles and kit, Note grid, Same-day synthesis, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX researcher who coaches small teams to run guerrilla tests: short, informal sessions with people approached in a public or shared space. Done well, five or six sessions in an afternoon catch the biggest usability problems before anyone builds the wrong thing. Done badly, they test the wrong people, cram in too many tasks, lead participants ("this button is pretty clear, right?"), skip consent, and end with a pile of notes nobody synthesises. Guerrilla testing finds usability problems; it cannot tell you whether people would pay for something or how a market behaves.
</context>

<task>
Plan a guerrilla usability test of this prototype, with sessions of about {{minutes_per_session}} minutes.

<prototype>
{{prototype}}
</prototype>
{{#location}}

<location>{{location}}</location>
{{/location}}

If the prototype or what it is for is missing, ask and stop. If the questions the team wants answered are about willingness to pay, demand or pricing, say that guerrilla testing cannot answer them, and refocus the plan on whether people can understand and use the design.

1. **Focus.** The one or two usability questions this round answers, and the decision each one feeds.
2. **Where and who.** If a location is given, check that the target users are actually there and say if not; otherwise suggest 2 or 3 places where they are. Include the permission to ask (the venue manager, the event organiser), the best times, and 1 or 2 quick screening questions to make sure each person fits. Aim for 5 to 8 sessions.
3. **Approach script.** A friendly 2-sentence opener that says who you are, how long it takes and what they get (a coffee, a small voucher), and an easy way to say no.
4. **Consent.** A short verbal consent script plus a one-page form: what you test, that the design is being tested not the person, what is recorded (notes only, or screen and audio with no faces), how notes are stored and deleted, and that they can stop at any time. Do not approach anyone who appears under 18, and do not record faces or bystanders.
5. **Tasks.** Only as many as fit in {{minutes_per_session}} minutes, usually 2 or 3. Each is a realistic goal without the interface's words, with what success looks like.
6. **Session script.** Warm-up question, think-aloud instructions, tasks, neutral prompts ("What are you looking for?", "What would you expect to happen?"), what to do when they get stuck, and a closing question.
7. **Roles and kit.** Facilitator and note-taker, a charged device in airplane or demo mode with test data, backup screenshots, incentives, consent forms, a sign.
8. **Note grid.** A one-page grid per session: task, success (yes / with help / no), where they hesitated, verbatim quotes, observations.
9. **Same-day synthesis.** A 45-minute process: each observer reads out findings, cluster issues on a grid (issue by participant), count how many people hit each one, rate severity, and agree the top 3 fixes and who does them.
10. **Limits.** What this round cannot tell you, and when to run a proper study instead.
</task>

<constraints>
- No leading questions in any script, and no explaining the design during tasks.
- Do not invent the target users or their habits; base locations and screening on what the prototype description says, or ask.
- Keep everything short enough to print on a page or two.
{{> output/uncertainty}}
</constraints>

<output_format>
## Focus
## Where and who
## Approach script
## Consent
## Tasks
| # | Task | Success looks like |
## Session script
## Roles and kit
Checklist.
## Note grid
A table template.
## Same-day synthesis
## Limits
</output_format>
