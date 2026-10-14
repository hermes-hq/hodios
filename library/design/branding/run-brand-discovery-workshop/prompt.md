---
schema: 1
id: run-brand-discovery-workshop
kind: prompt
title: Run a brand discovery workshop
description: Plans a brand discovery workshop with goals, participants and pre-work, a timed agenda, exercises such as this-not-that sliders and competitor walls, facilitation notes and how to synthesise outputs.
category: branding
version: 1.0.0
status: incubating
stage: [discover]
role: [consultant, marketer, graphic-designer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [workshop-facilitation, brand-discovery, stakeholder-alignment, brand-strategy, co-creation]
pairs_with:
  prompts: [build-brand-platform, run-brand-audit]
  workflows: [brand-identity-track]
  personas: [brand-strategist]
args:
  - name: company
    description: The organisation, why it is working on its brand now (new business, rebrand, merger, growth), and what is already known.
    type: text
    required: true
  - name: participants
    description: Who will attend (roles, number, seniority), and any known disagreements.
    type: text
    required: true
  - name: time
    description: Time available and format, for example "one 4-hour in-person session" or "two 90-minute video calls". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Goals, Participants and pre-work, Agenda, Exercises, Facilitation notes, Materials, Synthesis and outputs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A discovery workshop gets leaders to agree on what the brand is before anyone designs. It fails when it becomes a brainstorm of adjectives (everyone picks "innovative, trustworthy, friendly"), when the most senior person speaks first and everyone follows, when customers are absent from the conversation, and when the output is a wall of sticky notes nobody synthesises. Good facilitators collect evidence first (stakeholder interviews, customer quotes, competitor examples), use exercises that force trade-offs (this-not-that sliders, from-to statements, ranking), have people write silently before discussing, and end with clear decisions and open questions.
</context>

<task>
Plan a brand discovery workshop.

<company>
{{company}}
</company>

<participants>
{{participants}}
</participants>
{{#time}}Time and format: {{time}}{{/time}}

If no time is given, plan one half-day in-person session and say how to split it for video calls.

1. **Goals.** The three decisions or agreements the workshop must produce (for example audience priority, the brand's role in customers' lives, personality trade-offs) and what is out of scope.
2. **Participants and pre-work.** Who should attend (decision-makers plus people close to customers, 5 to 10 people), short pre-interviews or a survey to run beforehand, and customer evidence to bring.
3. **Agenda.** A timed agenda with breaks, for the stated time and format.
4. **Exercises.** For each block: the exercise, instructions, time, and what it produces. Use trade-off exercises such as this-not-that sliders, from-to statements, a competitor wall to place the brand, customer journey or quotes review, the brand as a host or a person, and a headline from the future; include silent individual work before group discussion and a prioritisation method such as dot voting.
5. **Facilitation notes.** How to handle the most senior voice, disagreements and tangents (a parking area), quiet participants, and remote participation; what to say at the start to set rules.
6. **Materials.** Room or online board setup, printed competitor examples, templates and anything to prepare.
7. **Synthesis and outputs.** How to turn the material into a short summary within a few days: agreements, tensions, open questions, quotes, and next steps for strategy and design; and how to play it back to participants for confirmation.
</task>

<constraints>
- Do not prescribe the brand's answers; the workshop draws them out.
- Keep exercises that need no special software or paid tools unless the user has them.
- Respect participants' time: every exercise must feed a stated goal.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Agenda as a table (Time, Block, Exercise, Output). Materials as a checklist.
</output_format>
