---
schema: 1
id: prepare-for-proctored-online-exam
kind: prompt
title: Prepare for a proctored online exam
description: Builds a checklist for a remotely proctored exam covering system checks, room and desk rules, ID, behaviour that gets flagged and a plan for connection drops, from the candidate's own rules.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student, individual]
requires: [none]
inputs: [document, text]
output: [checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [online-proctoring, remote-exam, system-check, exam-rules, tech-failure-plan]
pairs_with:
  prompts: [plan-exam-day-strategy, prepare-certification-exam, prepare-open-book-exam]
args:
  - name: exam_name
    description: The exam and the proctoring setup if known, such as "AWS Solutions Architect via online proctoring", "university final on a lockdown browser", "language test at home".
    type: string
    required: true
  - name: exam_rules
    description: Optional but strongly recommended. Paste the candidate rules, confirmation email or FAQ text from the exam provider.
    type: text
  - name: setup
    description: Optional. Your device, operating system, internet connection, room and household, for example "work laptop, Wi-Fi, shared flat, kids at home".
    type: text
output_contract:
  format: markdown
  sections: [Rules at a glance, One week before, The day before, Exam day setup, During the exam, If something goes wrong, Questions to ask the provider]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Remotely proctored exams fail more often on logistics than on content. Common problems: a work laptop whose security settings or VPN block the proctoring software, an ID whose name does not match the registration, a desk that fails the room scan, a second monitor or phone in view, someone walking in, the candidate reading questions aloud or looking away for long periods, and a connection drop with no record of what happened. Every provider's rules differ, and some breaches end the exam with no refund. The candidate needs a checklist built from their own rules, with anything not covered marked as a question to ask.
</context>

<task>
Build a remote proctoring checklist for {{exam_name}}.
{{#exam_rules}}
<exam_rules>
{{exam_rules}}
</exam_rules>
{{/exam_rules}}
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

1. Rules at a glance: extract from the rules every requirement on ID, check-in time, room, desk, devices, breaks, scrap paper or whiteboard, food and drink, and what ends the exam. Quote short phrases. If no rules were pasted, say the checklist uses common requirements and every item marked [check] must be confirmed in the provider's rules.
2. One week before: run the provider's official system test on the exact device, network and room; check admin rights to install software; on a work device, ask IT about VPN, firewall and endpoint software; check that the ID name matches the booking exactly and the ID is in date; request any accessibility accommodations or approved items in writing now.
3. The day before: rerun the system test; install updates now, not on the day; plan the room (door closed, sign on the door, household told the time), clear desk and walls as the rules require; charge and plug in; prepare a wired connection or a backup if the rules permit.
4. Exam day setup: check-in window, what to have on the desk, what to remove (phone out of reach unless it is required for check-in), close every other application, notifications off, single display.
5. During the exam: behaviours that commonly trigger a flag (looking away for long stretches, reading aloud, covering the mouth, leaving the camera view, another voice or person, headphones unless allowed) and what to do instead; how to ask the proctor a question; break rules.
6. If something goes wrong: connection drop, crash, proctor not appearing, a person entering. For each: what to do in the moment, to write down the time and any error message, to take a photo or screenshot only if the rules allow it afterwards, who to contact and by when (from the rules, or [check]).
{{#setup}}
7. Adjust every section for the risks in the setup given (shared home, work laptop, unstable Wi-Fi).
{{/setup}}
</task>

<constraints>
- Never invent a provider's rules, contact details or deadlines; mark unknowns [check] and list them under Questions to ask the provider.
- Do not help avoid detection, use unauthorised materials or get outside help. If asked, decline in one sentence and continue with the legitimate checklist.
- Keep each checklist item one line and actionable.
</constraints>

<output_format>
Markdown with these headings, each a checklist using "- [ ]":
## Rules at a glance
## One week before
## The day before
## Exam day setup
## During the exam
## If something goes wrong
A table: Problem | Do now | Record | Contact and deadline.
## Questions to ask the provider
Numbered, only the items still marked [check].
</output_format>
