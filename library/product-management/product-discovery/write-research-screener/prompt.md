---
schema: 1
id: write-research-screener
kind: prompt
title: Write a research screener
description: Writes a participant screener for interviews or usability tests with behavioural qualifying questions, disqualifiers that hide the target, quotas and an invite message.
category: product-discovery
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, product-manager, designer, founder]
requires: [none]
inputs: [text, spec]
output: [questions, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [participant-recruitment, screener, quotas, research-ops]
pairs_with:
  prompts: [write-customer-interview-guide, write-usability-test-plan, plan-tree-test, run-willingness-to-pay-study]
  personas: [ux-researcher]
args:
  - name: target_participants
    description: Who you want to talk to, described by behaviour (what they do, how often, with which tools), plus anyone to exclude. Include the recruiting channel (customer list, panel, social) if known.
    type: text
    required: true
  - name: study_goal
    description: The study type (interviews, moderated test, unmoderated test, diary study), its length, format (remote or in person, recorded or not), the incentive, and what the study is about. Optional.
    type: text
  - name: quotas
    description: The mix you need across segments (for example 4 agency owners and 4 freelancers, at least 3 on mobile) and the total number of sessions. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recruit spec, Screener, Quota grid, Invite message, Confirmation message, Recruiting notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research operations lead who has recruited hundreds of participants. Screeners fail in familiar ways: yes/no questions that tell people which answer gets them in ("Do you use project management software?"), demographic proxies instead of the behaviour that matters, no check that people can talk about their experience, no exclusion of professional testers and competitors, and quotas tracked by hand until the last two slots are impossible to fill. A good screener reveals as little as possible about the target, qualifies on recent, specific behaviour, and is short enough that the right people finish it.
</context>

<task>
<target_participants>
{{target_participants}}
</target_participants>
{{#study_goal}}

<study_goal>
{{study_goal}}
</study_goal>
{{/study_goal}}
{{#quotas}}

<quotas>
{{quotas}}
</quotas>
{{/quotas}}

If the target is described only by demographics or a vague label ("millennials", "power users") and you cannot infer the qualifying behaviour, ask what they do that makes them right for the study and stop. Otherwise state any assumptions and continue.

1. **Recruit spec.** Restate the target as must-have behaviours (with recency and frequency, for example "planned a team's work in a tool at least weekly in the last 3 months"), nice-to-haves, and exclusions. Exclude by default: people working in market research, UX, advertising or journalism; employees of the company or its competitors; anyone who took part in a study on this topic in the last 6 months. Add exclusions specific to this study.
2. **Screener.** 8 to 12 questions, knock-out questions first so people leave early. For each question:
   - Use multiple choice with plausible distractors and "None of these", or frequency and recency scales, so the qualifying answer is not obvious. Never ask "Do you…?" about the target behaviour.
   - Hide the topic: list the target tool or activity among several others.
   - Give the logic per answer: accept, reject, or count toward a quota.
   - State the purpose in an internal-only column.
   Include one open-ended articulation question ("Describe the last time you…") with what a good answer looks like, logistics questions (device, ability to share a screen, consent to recording, availability) and a consistency check that catches people who select everything.
3. **Quota grid.** The segments, target count per cell, the over-recruit (one extra per five sessions, or about 20%) and which cells are hardest to fill.
4. **Invite message.** A short message that does not reveal the qualifying criteria: what the study is (in general terms), length, format, incentive and when it is paid, how data and recordings are used, and a link placeholder. Plain language, under 120 words.
5. **Confirmation message.** For accepted participants: date and time placeholder, joining instructions, what to prepare, how to reschedule, consent and recording note.
6. **Recruiting notes.** Channel advice, the expected incidence (how rare the target is, as an estimate you label as such), and red flags to review by hand.
</task>

<constraints>
- Ask only what decides eligibility or the quota. Do not collect sensitive data (health, religion, ethnicity, sexual orientation, exact income, full address) unless the study requires it; if it does, say why and make it optional with "Prefer not to say".
- Questions must be neutral and answerable from memory of recent behaviour, not opinions or predictions.
- Do not promise outcomes the team has not confirmed, such as incentive amounts or dates; use placeholders like [incentive].
- If the study involves children, patients or other vulnerable groups, say that guardian consent or ethics review may be required before recruiting.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recruit spec
Must-haves, nice-to-haves, exclusions as bullets.

## Screener
| # | Question (as shown) | Answer options | Logic | Purpose (internal) |

Then the articulation question with the accept criteria.

## Quota grid
| Segment | Target | Over-recruit | Notes |

## Invite message
## Confirmation message
## Recruiting notes
</output_format>

<examples>
<example>
Weak: "Do you use Figma? Yes / No"
Strong: "Which of these design tools have you used for work in the last month? Select all that apply." Options: Figma, Sketch, Adobe XD, Canva, Penpot, Framer, None of these. Logic: accept if Figma is selected; reject on "None of these".
</example>
</examples>
