---
schema: 1
id: run-brand-training
kind: prompt
title: Run brand training for staff
description: Designs brand training for employees by role, covering what the brand stands for, how it shows in everyday work, hands-on exercises, a one-page quick reference and follow-up.
category: branding
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [marketer, manager, teacher]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [brand-training, internal-branding, employee-onboarding, brand-consistency, workshop-design]
pairs_with:
  prompts: [build-brand-guidelines, write-brand-voice-guide, build-brand-platform, run-brand-audit]
  personas: [brand-strategist]
args:
  - name: brand
    description: The brand's platform, guidelines and voice guide, or a summary of them, and any recent change such as a rebrand.
    type: text
    required: true
  - name: staff
    description: Who needs training - roles, numbers, locations, how much they create (customer emails, sales decks, social posts, designs) and how they meet customers.
    type: text
    required: true
  - name: format
    description: Time and format available, for example "45-minute module in onboarding" or "half-day workshops per team". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Learning goals, Audience groups, Session plan, Exercises, Quick reference, Follow-up and measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most brand "training" is a slide deck showing the new logo and colours, which changes nothing about how people answer the phone, write an email or build a sales deck. Brands are delivered by staff behaviour, so training should be practical and role-specific: what the brand promises customers, what that means in this person's daily work, where the templates and assets live, and practice with real examples from their job. Adults learn by doing and by seeing before-and-after examples, and forget most of a one-off session, so a quick reference and follow-up matter more than a long launch event.
</context>

<task>
Design brand training for these staff.

<brand>
{{brand}}
</brand>

<staff>
{{staff}}
</staff>
{{#format}}Format: {{format}}{{/format}}

If no format is given, propose a 60-minute core session plus short role modules.

1. **Learning goals.** Four to six things participants can do afterwards, written as observable actions (for example "rewrite a complaint reply in the brand voice", "find and use the right slide template").
2. **Audience groups.** Group staff by how they express the brand (frontline service, sales, content and marketing, people who make designs, managers), with what each group needs most.
3. **Session plan.** A timed plan for the core session and role modules: why the brand matters to customers and to their work, the brand idea in plain words, voice, visual basics, where assets live, practice, and questions.
4. **Exercises.** Practical exercises using real material from their jobs: before-and-after rewrites, spot what is off-brand, role-play a customer moment, fix a slide using the template; include answer guides.
5. **Quick reference.** A one-page summary people keep: the brand idea in one sentence, three voice principles with examples, top five visual rules, where to find assets, and who to ask.
6. **Follow-up and measures.** Reinforcement over the following weeks (examples shared in team meetings, office hours, champions in each team), and how to tell whether it worked (fewer off-brand assets, customer feedback themes, template use), without claiming more than can be measured.
</task>

<constraints>
- Use the brand's own platform and rules; do not invent values, voice principles or rules not in the input. Mark any you had to assume.
- Keep it practical: no more than about a quarter of any session spent presenting.
- Make materials accessible (captions for recordings, readable slides, alternative formats on request).
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Session plan as a table (Time, Block, Method, Materials). Quick reference as a one-page block the user can copy.
</output_format>
