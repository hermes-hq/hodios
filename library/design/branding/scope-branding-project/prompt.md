---
schema: 1
id: scope-branding-project
kind: prompt
title: Scope a branding project
description: Scopes a branding project for a freelance designer or studio, with phases, a precise deliverables list, exclusions, revision rounds, client duties, timeline, pricing structure and terms to confirm.
category: branding
version: 1.0.0
status: incubating
stage: [plan]
role: [graphic-designer, consultant, founder]
requires: [none]
inputs: [text, message]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-scoping, design-pricing, statement-of-work, client-management, creative-agency]
pairs_with:
  prompts: [write-freelance-proposal, write-design-brief, assess-scope-change-request]
  workflows: [brand-identity-track]
  personas: [brand-strategist]
args:
  - name: request
    description: What the client asked for, in their words if possible, plus what you know about the client (size, stage, budget hints, deadline, decision-makers).
    type: text
    required: true
  - name: studio
    description: Your situation - solo or team, what you do in-house and what you subcontract (copywriting, photography, web), and how you usually price. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Client need, Phases, Deliverables, Exclusions, Revision policy, Client responsibilities, Timeline, Pricing structure, Terms to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Branding projects lose money in the gaps: "a logo" that turns into a full identity, guidelines, social templates and a website; unlimited rounds of "small tweaks"; a committee that appears at the final presentation; strategy skipped so the visual work has nothing to be judged against; and no clarity on whether the client owns the rejected concepts or the source files. Experienced studios scope in phases with a decision at the end of each, list deliverables precisely (file formats and versions included), state what is excluded, fix the number of concepts and revision rounds, make the client's duties explicit, and transfer rights on final payment.
</context>

<task>
Scope this branding project.

<request>
{{request}}
</request>
{{#studio}}

<studio>
{{studio}}
</studio>
{{/studio}}

1. **Client need.** What the client actually needs, which may differ from what they asked for (for example a name and positioning before a logo), and the questions to ask in a discovery call.
2. **Phases.** Discovery, strategy, identity design, refinement, guidelines and handover, and optional rollout, each with activities, the decision or sign-off that closes it, and who attends.
3. **Deliverables.** An exact list per phase: number of concepts, logo versions and colour variants, file formats, the guidelines' scope, templates, and what "final files" contains.
4. **Exclusions.** What is not included unless added (copywriting, naming, trademark searches, photography, illustration, website, print management, font licences, stock images).
5. **Revision policy.** Rounds per phase, what counts as a revision versus a new direction, consolidated feedback from one contact, and how extra rounds are charged.
6. **Client responsibilities.** Inputs, access to stakeholders for interviews, feedback turnaround times, one decision-maker, and the effect of delays on the schedule.
7. **Timeline.** A schedule in weeks per phase with client review time built in.
8. **Pricing structure.** A structure, not market rates: fixed fee per phase, options (good, better, best packages), payment milestones (for example a deposit before starting), and how out-of-scope work is quoted. If the user gives their rates or budget, apply them; otherwise leave amounts as placeholders.
9. **Terms to confirm.** Ownership and licence of final work on full payment, rights in unused concepts, the designer's portfolio rights, font and stock licences in the client's name, cancellation or kill fee, and a recommendation to use a written contract reviewed for the user's country.
</task>

<constraints>
- Do not invent prices or day rates; use the user's figures or placeholders.
- Make every deliverable countable so scope disputes can be settled by the document.
- Contract terms are general points to confirm, not legal advice.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Deliverables as a table (Phase, Deliverable, Quantity or format). Timeline as a table (Phase, Weeks, Client review). Pricing as a table with placeholder amounts.
</output_format>
