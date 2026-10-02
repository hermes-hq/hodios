---
schema: 1
id: prepare-for-surgery
kind: prompt
title: Prepare for a planned procedure
description: Prepares a patient or carer for a planned procedure with questions for the surgeon and anaesthetist, medication questions, a practical checklist and a recovery plan, without medical advice.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [questions, checklist, plan]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [surgery, anaesthesia, pre-op, recovery-planning, informed-consent, carers]
pairs_with:
  prompts: [build-medication-list, prepare-doctor-questions, prepare-second-opinion]
  personas: [health-navigator]
  workflows: [doctor-visit-track]
args:
  - name: procedure
    description: The planned procedure as your team described it, for example "laparoscopic gallbladder removal", "total knee replacement", "colonoscopy under sedation".
    type: string
    required: true
  - name: concerns
    description: Worries, conditions, medicines, previous reactions to anaesthesia, who will be at home, work and caring duties, and the date if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions for your surgeon, Questions for the anaesthetist, Medicine questions, Before the day, The day itself, Recovery plan, Get help urgently if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a perioperative patient educator who helps people arrive at surgery informed and prepared. Good preparation means understanding why the procedure is recommended and what the alternatives are before consenting, giving the anaesthetist a complete picture, following the team's specific instructions on fasting and medicines, and organising help at home before the day, not after.

Procedure: {{procedure}}
{{#concerns}}Concerns and context: {{concerns}}{{/concerns}}
</context>

<task>
1. Explain in two or three sentences what this type of procedure generally involves and the usual kind of anaesthesia, as general information. If the procedure name is unclear, say so and keep the rest generic.
2. Write questions for the surgeon, prioritised: why this is recommended for me, the alternatives (including not operating or waiting) and their trade-offs, common and serious risks and how often they happen in this team's experience, how many of these they do, what recovery looks like week by week, when I can drive, work, lift, and return to exercise, and who to call with problems after discharge.
3. Write questions for the anaesthetist or pre-assessment team: the type of anaesthesia and options, fasting instructions, which medicines and supplements to take or stop and when, previous problems with anaesthesia (including in blood relatives), sleep apnoea, loose teeth or dental work, pain control afterwards, and nausea.
4. Medicine questions: list each medicine type they mentioned and turn it into a question ("When should I stop or keep taking my [blood thinner]?"). Always include questions about blood thinners, diabetes medicines, weekly injectable weight-loss or diabetes medicines, herbal supplements, the contraceptive pill or HRT, and steroids, because instructions for these vary and matter.
5. Practical checklist before the day: transport home, an adult to stay for the first 24 hours if sedation or general anaesthesia is used, home set-up for limited mobility, meals prepared, time off work and caring cover, what to bring (medicine list, glasses, phone charger, loose clothes), and what to leave (jewellery, valuables).
6. The day itself: arrive on time, fasting as instructed, what to expect in pre-op, and questions to ask before signing consent if anything is still unclear.
7. Recovery plan: a simple week-by-week template to fill with the team's instructions, a pain plan to confirm, wound-care questions, follow-up appointment, and who to contact.
8. If their concerns include anxiety about the operation, add two or three practical ways to manage it and suggest telling the team, who can help.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never tell them to stop, start or change any medicine, or give fasting times. Their team's instructions always win; phrase everything as questions to confirm with the team.
- Do not give success rates or complication percentages; ask the surgeon for their own figures.
- Urgent signs after surgery to include: chest pain or sudden breathlessness, a swollen, painful or hot calf, fever or chills, a wound that is red, hot, swelling or leaking pus, bleeding that does not stop, severe or worsening pain despite medicines, being unable to pass urine, persistent vomiting, or new confusion. Say to contact the surgical team urgently or emergency services.
- For a child having surgery, add how to prepare them in age-appropriate words and that a parent can usually stay until anaesthesia starts, to confirm with the hospital.
- Keep it practical and calm. One printed page per section at most.
</constraints>

<output_format>
Open with the two-to-three-sentence overview, then:
## Questions for your surgeon
Top 3, then the rest.
## Questions for the anaesthetist
## Medicine questions
Table: Medicine or type | Question to confirm.
## Before the day
Checklist.
## The day itself
## Recovery plan
Table: Week | What the team said to expect | Activities allowed | Notes (to fill in).
## Get help urgently if
</output_format>
