---
schema: 1
id: plan-inclusive-usability-study
kind: prompt
title: Plan an inclusive usability study
description: Plans a usability study with disabled participants and assistive technology users, covering recruitment, accommodations, prototype readiness, tasks and ethics. For UX researchers.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [usability-testing, inclusive-design, assistive-technology, screen-readers, participant-recruitment, research-ethics]
pairs_with:
  prompts: [write-usability-test-plan, write-research-screener, audit-web-accessibility, synthesize-usability-findings]
  personas: [ux-researcher, accessibility-specialist]
args:
  - name: product
    description: What is being tested (live product, coded prototype or design prototype), who it is for, the platform, and the questions the team needs answered.
    type: text
    required: true
  - name: assistive_tech
    description: Assistive technologies or access needs to include, if already decided (for example screen readers, magnification, voice control, switch access, captions, cognitive or low-literacy needs). Optional; leave empty to get a recommended mix.
    type: text
  - name: sessions
    description: Number of sessions you can run.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Objectives and scope, Participant mix, Recruitment, Screener, Prototype readiness, Accommodations and logistics, Tasks, Session guide, Consent and data, Facilitator preparation, Analysis and reporting, Pilot]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX researcher who has run many studies with disabled people and assistive technology (AT) users. Inclusive studies fail in predictable ways: the prototype cannot be operated with a screen reader, so the session tests the prototyping tool instead of the design; participants are asked to use a lab machine instead of their own configured device and AT; recruitment goes through generic panels that have few AT users; the screener asks for medical diagnoses instead of how people use technology; sessions are timed like standard ones and exhaust people; incentives are lower than for other specialist participants; and findings are reported as "the disabled user", as if one person stood for everyone. A usability study with AT users is also not an accessibility audit: it shows how real people complete real tasks, and complements conformance testing rather than replacing it.
</context>

<task>
Plan an inclusive usability study for this product with {{sessions}} sessions.

<product>
{{product}}
</product>
{{#assistive_tech}}

<assistive_tech>
{{assistive_tech}}
</assistive_tech>
{{/assistive_tech}}

If the product or the research questions are missing, ask for them and stop. If the stimulus is a design-tool prototype and AT users are included, say plainly in Prototype readiness that it is likely unusable with screen readers or voice control, and propose a coded prototype, the live product or a facilitator-driven alternative.

1. **Objectives and scope.** The decisions the study informs and 3 to 5 research questions. State what {{sessions}} sessions can and cannot show: name the AT and access needs covered, and the ones explicitly out of scope for this round.
2. **Participant mix.** If assistive_tech is empty, recommend a mix based on the product's tasks and platform, with the reason for each group. Allocate the {{sessions}} sessions across groups in a table, aiming for at least 2 people per AT group you include rather than one of everything. Include proficiency (new versus expert AT users) and note people who use more than one AT.
3. **Recruitment.** Channels that reach AT users (disability-led organisations, specialist recruiters, AT user communities, existing customers who opt in), with a note to pay partner organisations for their help. Incentive: at least the rate for other specialist participants, adjusted for longer sessions and travel, paid in an accessible way.
4. **Screener.** 6 to 10 questions about the technology people use, for what, how often, and how confident they are, plus the accommodations they need. Do not ask for diagnoses or medical details; ask about functional needs only, and make the screener itself accessible.
5. **Prototype readiness.** A checklist the stimulus must pass before any session: keyboard and focus order, accessible names, headings and landmarks, zoom and reflow, captions or transcripts, and a run-through by the team with each AT in scope.
6. **Accommodations and logistics.** Remote on the participant's own setup by default, in person only when needed; session length (usually 60 to 90 minutes with breaks); materials sent in advance in accessible formats; sign language interpreters, captioning or a support person when requested; travel and venue access for in-person sessions; a backup plan if the AT or screen sharing fails.
7. **Tasks.** 3 to 5 realistic tasks tied to the research questions, written in plain language, with success criteria. No task asks people to "test accessibility".
8. **Session guide.** Introduction, consent check, a few minutes for participants to show their setup and settings, tasks with think-aloud adapted to AT (screen reader users may prefer to pause speech and comment between steps), neutral probes, and a wrap-up that asks what would make the biggest difference.
9. **Consent and data.** Accessible consent in plain language, offered in the participant's preferred format; disability information treated as sensitive personal data (collected only if needed, stored separately, limited access, deletion date); recording consent covering screen and audio; the right to stop at any time without losing the incentive.
10. **Facilitator preparation.** Basic fluency with each AT in scope, respectful language, patience with pace, not taking over the participant's device, and a cap of 1 or 2 observers.
11. **Analysis and reporting.** Code issues by task, AT and severity; separate problems in the design from problems in the AT or prototype; report patterns with participant counts, not percentages; avoid inspirational or deficit framing; link each issue to the relevant accessibility guideline where one applies, and to a recommended fix.
12. **Pilot.** One pilot session with an AT user, paid at the same rate, to test the setup, timing and task wording.
</task>

<constraints>
- Do not invent participant numbers, recruiting partners, rates in a specific currency or legal requirements; give ranges or criteria and say what to confirm locally.
- Never recommend simulated disability (blindfolds, sighted staff using a screen reader) as a substitute for disabled participants; it can be a team-learning exercise only.
- Keep it specific to this product's tasks and platform; skip generic advice that changes no decision.
{{> output/uncertainty}}
</constraints>

<output_format>
## Objectives and scope
## Participant mix
| Group (AT or access need) | Sessions | Proficiency | Why this group |
## Recruitment
## Screener
Numbered questions with answer options and the qualifying answers.
## Prototype readiness
Checklist.
## Accommodations and logistics
## Tasks
| # | Task in plain language | Research question | Success criterion |
## Session guide
## Consent and data
## Facilitator preparation
## Analysis and reporting
## Pilot
</output_format>
