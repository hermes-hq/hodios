---
schema: 1
id: design-diary-study
kind: prompt
title: Design a diary study
description: Designs a diary study with research questions, daily and event prompts, recruitment, incentives, tactics to keep people logging, and an analysis plan. Use to study behaviour over weeks.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [ux-researcher, designer, product-manager, researcher]
requires: [none]
inputs: [text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [diary-study, longitudinal-research, experience-sampling, research-ops]
pairs_with:
  prompts: [build-user-personas, build-user-journey-map, synthesize-usability-findings]
  personas: [ux-researcher]
args:
  - name: research_questions
    description: What the team needs to learn, the behaviour or product being studied, who the participants are, and any constraints (budget, markets, devices).
    type: text
    required: true
  - name: duration_days
    description: How many days participants will log entries. Typical studies run 5 to 28 days; longer studies need more compliance effort.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Study overview, Research questions, Prompts schedule, Participants and recruitment, Incentives and compliance, Ethics and data, Analysis plan, Pilot and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Diary studies capture behaviour in context and over time, which interviews and usability tests cannot. They fail when the prompts are long and identical every day, so entries shrink to "same as yesterday" by day four; when the study logs on a schedule but the behaviour happens on events (or the reverse); when a third of participants drop out because nobody checked in; and when the team collects hundreds of entries with no plan for analysing them.
</context>

<task>
Design a {{duration_days}}-day diary study.

<research_questions>
{{research_questions}}
</research_questions>

1. **Fit check.** Confirm a diary study suits the questions: behaviour that unfolds over time, happens in context, or is rare or hard to recall. If a question is better answered by another method (a survey for prevalence, analytics for frequency, a usability test for task performance), say so and route it. If {{duration_days}} days cannot capture the behaviour (a monthly bill, a weekly shop observed only once), recommend a better length.
2. **Research questions.** Rewrite them into 3 to 6 answerable questions about behaviour, context, triggers, workarounds and feelings over time.
3. **Logging approach.** Choose event-contingent (log when the behaviour happens), interval-contingent (log at fixed times) or a mix, and say why. Define what counts as an event in plain words participants will understand.
4. **Prompts schedule.** A day-by-day plan: an onboarding entry on day 1 (context, current setup, a photo of where the activity happens if relevant), the core entry prompt, rotating deeper prompts on some days so entries do not become repetitive, and a reflection entry on the last day. Each entry must take under 5 minutes; mix short closed questions (rating, multiple choice) with one or two open prompts and optional photo, screenshot or voice notes. Write every prompt in full, in neutral, past-tense, behaviour-focused language ("What happened just before you...").
5. **Participants and recruitment.** Behaviour-based criteria, segments, a short screener, the target number (usually 10 to 20 completers per segment) and over-recruitment of 20 to 30 per cent for drop-outs. Include the device and tool requirements.
6. **Incentives and compliance.** Incentive structure staged across the study (part paid for onboarding, the rest on completion, with a bonus for full compliance) at a level fair for the total time asked; a kickoff call or video; reminder timing matched to the logging approach; a researcher check-in on days 2 and halfway with follow-up questions on entries; a rule for when a participant is replaced; and what counts as a complete entry.
7. **Ethics and data.** Consent covering photos and what may appear in them (other people, screens with personal data), how to avoid capturing third parties, storage and deletion, and when participants may skip a prompt.
8. **Analysis plan.** Read entries daily during the study for follow-ups, then code entries against the research questions, build a per-participant timeline, compare across segments, and look for triggers, patterns over time and breakdowns. Add optional exit interviews with 4 to 6 participants to explore the richest diaries.
9. If the research questions or the participants are too vague to write prompts, ask up to three questions and stop.
</task>

<constraints>
- Do not invent findings, benchmarks or compliance rates. Recommendations about sample size and drop-out are typical ranges; say so.
- Keep the total participant effort realistic and state it in minutes per day and in total.
- Never ask participants to capture other people, sensitive documents or anything illegal; design prompts so they do not need to.
{{> output/uncertainty}}
</constraints>

<output_format>
## Study overview
Goal, method, length, logging approach, total effort per participant, in under 8 lines.
## Research questions
## Prompts schedule
| Day | Trigger or time | Prompt (as participants will read it) | Response type | Research question |
## Participants and recruitment
## Incentives and compliance
## Ethics and data
## Analysis plan
## Pilot and risks
A 2- to 3-day pilot with 2 to 3 people, and the main risks with mitigations.
</output_format>
