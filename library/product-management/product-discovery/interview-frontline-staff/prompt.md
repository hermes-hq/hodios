---
schema: 1
id: interview-frontline-staff
kind: prompt
title: Interview frontline staff about their work
description: Writes a discovery guide and session plan for interviewing frontline staff at their workstation before changing their tools or processes, with anonymity, shift timing and last-real-case questions.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, business-analyst, operations-manager, ux-researcher]
subject: [retail, healthcare, public-sector, supply-chain]
requires: [none]
inputs: [text]
output: [questions, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [frontline-staff, internal-tools, contextual-interviews, power-dynamics, service-change]
pairs_with:
  prompts: [map-internal-tool-workarounds, plan-contextual-inquiry, synthesize-customer-interviews, translate-request-into-problem]
  personas: [service-designer]
args:
  - name: roles_and_setting
    description: Which staff you will talk to (role, shift pattern, site), what their day involves and the tools they use. Rough notes are fine.
    type: text
    required: true
  - name: change_being_considered
    description: The tool, system or process change under consideration and the decision this research will inform.
    type: text
    required: true
  - name: session_length_minutes
    description: Time available per person, in minutes, usually limited by shifts and cover.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Research questions, Before you go, Session plan, Interview guide, Observation checklist, Handling what you hear]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a service researcher who has interviewed warehouse pickers, call-centre agents, clinic receptionists and store staff before their tools changed. Frontline interviews fail differently from customer interviews: staff tell you the official process when a manager is nearby or when they fear the change is about headcount; sessions that ignore shift patterns take people off the floor and leave colleagues short; meeting-room interviews miss the screens, paper and shortcuts that only show up at the workstation; and opinion questions ("what would make your job easier?") produce wish lists instead of evidence.

Session length: {{session_length_minutes}} minutes per person
</context>

<task>
Roles and setting:

<roles_and_setting>
{{roles_and_setting}}
</roles_and_setting>

Change being considered:

<change_being_considered>
{{change_being_considered}}
</change_being_considered>

1. Turn the change into three to five research questions the team needs answered (internal only, never read out).
2. Before you go: agree access with managers but ask them not to attend or choose participants alone; get a mix of experience levels, shifts and at least one sceptic; arrange cover so the session is paid work time; plan the timing around peaks (avoid shift start, handover and rush periods); prepare a plain explanation of what the research is and is not for (not a performance review, no names in reports).
3. Session plan: aim to spend most of the time at the workstation during real or recent work, then a short sit-down. Fit everything in {{session_length_minutes}} minutes; if that is under 20, split observation and interview into two visits.
4. Interview guide with timed sections: opening and consent (anonymity, they can skip any question or stop); their role in their own words; the last real case ("Walk me through the last order/call/patient you handled that didn't go smoothly"), followed in sequence with probes; tools and workarounds ("Show me where you actually keep that"); what new starters struggle with; and close ("What would you be worried about if this changed?").
5. Observation checklist: interruptions, switching between systems, paper or sticky notes, re-keying, waiting, asking colleagues, safety or compliance steps, and the time each task really takes.
6. Handling what you hear: how to respond to complaints about managers or pay (acknowledge, do not promise), what to do if someone reports a safety, fraud or wellbeing issue (follow the organisation's reporting route), and how to share findings back with staff.
</task>

<constraints>
- Every main question asks about specific past events or shows-me-how tasks, never hypotheticals or "would you like" questions. No leading questions about the proposed change.
- Do not suggest recording audio or video at a workstation that shows customer, patient or personal data; suggest notes instead and say what to blank out.
- Reports must not identify individuals by name or by detail that makes them easy to spot in a small team.
- If the roles or the change are too vague to write questions for, ask up to three questions and stop. Do not invent tools or process steps.
</constraints>

<output_format>
## Research questions
Numbered, internal.

## Before you go
Checklist covering access, sampling, cover, timing and the explanation to staff (one short paragraph they could be read).

## Session plan
Timed outline that fits the session length, with where each part happens.

## Interview guide
Sections with minutes, numbered questions, two or three neutral probes each, and the research question each serves in brackets.

## Observation checklist
Table: what to watch | example signal | note.

## Handling what you hear
Bullets for complaints, serious reports, anonymity in reporting and feeding back to staff.
</output_format>
