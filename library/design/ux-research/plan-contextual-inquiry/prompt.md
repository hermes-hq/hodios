---
schema: 1
id: plan-contextual-inquiry
kind: prompt
title: Plan contextual inquiry sessions
description: Plans contextual inquiry or shadowing sessions in participants' real environments, covering focus, recruitment, site logistics, an observation guide, consent and artefact capture.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contextual-inquiry, field-research, shadowing, observation-guide, ethnography]
pairs_with:
  prompts: [build-service-blueprint, build-user-journey-map, design-diary-study, build-empathy-map]
  personas: [ux-researcher, service-designer]
args:
  - name: context
    description: Where and how the work or activity happens, for example "warehouse pickers on night shifts using handheld scanners" or "parents planning weekly meals at home". Include access constraints such as safety rules, confidentiality or shift patterns.
    type: text
    required: true
  - name: questions
    description: What you need to learn and the decision it will inform, for example "where time is lost between picking and packing, to prioritise the scanner app roadmap".
    type: text
    required: true
  - name: sessions
    description: Number of sessions planned.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Focus, Participants and sites, Logistics and access, Consent and ethics, Session structure, Observation guide, Capturing artefacts, Field notes template, Debrief and analysis, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Contextual inquiry means watching people do real work where it happens and talking with them while they do it, in a master-and-apprentice relationship: the participant is the expert, the researcher learns. It reveals what interviews miss: workarounds, sticky notes on monitors, interruptions, the spreadsheet that really runs the process, the colleague everyone asks. It goes wrong when it turns into an interview in a different room, when the researcher asks people to demonstrate tasks instead of doing them, when site access, safety or confidentiality are not arranged in advance, or when photos of screens and documents capture personal or confidential data without permission.
</context>

<task>
Plan {{sessions}} contextual inquiry sessions.

<work_context>
{{context}}
</work_context>

<questions>
{{questions}}
</questions>

1. **Focus:** restate the research questions as two to four focus areas to observe (for example handoffs, workarounds, tools and artefacts, interruptions) and the decision they inform. Say what is out of scope.
2. **Participants and sites:** the mix of participants and sites across {{sessions}} sessions (roles, experience levels, site types, shifts), the reason for each, and screener criteria. If {{sessions}} is too few to cover the variation that matters, say so and suggest how to prioritise.
3. **Logistics and access:** permission from site owners or managers, safety inductions and protective equipment, confidentiality agreements, how to avoid disrupting work or customers, session length (typically one and a half to three hours), the researcher pair (a lead and a note-taker), equipment, and a schedule that covers different times of day or week if the work varies.
4. **Consent and ethics:** informed consent from each participant observed, the right to stop or ask the researcher to leave, consent for audio, photos and copies of artefacts, how to handle bystanders (customers, patients, colleagues who did not consent), not reporting individual performance back to managers, incentives that fit the workplace's rules, and secure storage. Remind the user to follow their organisation's ethics and privacy process.
5. **Session structure:** a short conventional interview opening (role, a typical day), the transition to observation of real work as it happens, interpretation moments where the researcher shares their understanding and the participant corrects it, and a wrap-up with a summary and a check of what was misunderstood.
6. **Observation guide:** for each focus area, what to watch for and example prompts that ask about what just happened rather than in general ("I noticed you checked the paper list there - what were you looking for?"). Include prompts for breakdowns, workarounds and artefacts, and a list of questions to avoid (leading, hypothetical, solution-seeking).
7. **Capturing artefacts:** what to photograph or collect (forms, labels, screens, notes, physical layout), how to ask permission each time, how to redact personal data, and how to sketch the workspace and flows.
8. **Field notes template:** a template separating observation from interpretation, with time stamps, quotes, artefacts and questions to follow up.
9. **Debrief and analysis:** a debrief within 24 hours after each session, interpretation sessions, and the models to build afterwards (flow, sequence, artefact, physical and cultural models, or an affinity diagram), linked back to the research questions.
10. **Risks:** observer effect and how to reduce it, access withdrawn, sensitive situations witnessed (unsafe practice, distress) and what to do, and researcher safety.
11. Before answering, check every part of the plan against the context's access constraints; flag anything that would need permission not yet mentioned.
12. If the context or questions are too vague to plan observation (for example no idea where the work happens), ask up to three questions and stop.
</task>

<constraints>
- Observation of real work, not demonstrations; say how to get there if the site only allows demos.
- Never plan covert observation or recording.
- Keep artefact capture minimal and redacted; no photos of people without explicit consent.
</constraints>

<output_format>
Markdown with the contract's sections in order. Participants and sites as a table (Session, Role, Site, Shift or time, Why). The observation guide as a table (Focus area, Watch for, Example prompts). The field notes template as a fenced Markdown block.
</output_format>
