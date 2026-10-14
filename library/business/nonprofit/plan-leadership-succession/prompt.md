---
schema: 1
id: plan-leadership-succession
kind: prompt
title: Plan nonprofit leadership succession
description: Builds a succession plan for a nonprofit's chief executive or founder, covering an emergency cover plan, key-person risks, a planned handover timeline and what the board must do.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [succession-planning, founder-transition, key-person-risk, chief-executive, governance]
pairs_with:
  prompts: [build-board-skills-matrix, run-board-self-assessment]
  personas: [nonprofit-advisor]
args:
  - name: situation
    description: The leader's role and tenure, whether they are the founder, any planned departure date, what only they know or do (funder relationships, finance, signatures, passwords, partnerships), the senior team, and the board's involvement.
    type: text
    required: true
  - name: scope
    description: What to plan.
    type: enum
    enum: [emergency-cover, planned-departure, both]
    default: both
output_contract:
  format: markdown
  sections: [Key-person risks, Emergency cover plan, Planned transition, Founder considerations, Board actions, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit board and its chief executive plan for the leader's departure, whether sudden (illness, accident, resignation) or planned. Many small and mid-sized nonprofits depend on one person for funder relationships, bank access, knowledge of contracts and the organisation's story. Experienced chairs plan two things separately: an emergency cover plan that keeps the organisation running for 90 days if the leader is suddenly unavailable, and a planned transition that starts 12 to 18 months before a known departure. Founder transitions are the hardest: the founder may struggle to let go, the board may defer to them, and funders may be loyal to the person rather than the organisation. The board owns the process; the departing leader contributes but does not choose their successor.

Situation: {{situation}}
Scope: {{scope}}
</context>

<task>
1. Key-person risks: list what depends on the leader alone (relationships, authority to sign and bank, systems access, knowledge, external roles), rate each, and give the fix (document, delegate, introduce a second contact, add a signatory).
2. Emergency cover plan (if in scope): who acts as interim lead and with what authority, the first week checklist, who tells staff, funders, partners and the regulator if needed, where critical information is kept, and how the board supports the interim lead.
3. Planned transition (if in scope): a timeline from decision to the new leader's first 100 days: board agreement on the role and profile for the next strategy, internal candidates and development, open recruitment, overlap or no overlap and why, relationship handovers, and announcing the change.
4. Founder considerations (if the leader is a founder): honouring their contribution, agreeing a future role or clear exit, avoiding a shadow leader, and transferring relationships from the person to the organisation.
5. Board actions: decisions, owners and dates, including review of the plan each year.
6. Open questions.
</task>

<constraints>
- Be candid about dependency on one person, without blaming the leader.
- Do not decide on internal candidates; give criteria for the board.
- Employment terms, notice and any regulator notifications vary by country and contract; say to check.
- Never suggest sharing passwords informally; recommend secure access arrangements.
</constraints>

<output_format>
## Key-person risks
Table: Dependency | Risk (high, medium, low) | Fix | Owner.
## Emergency cover plan
## Planned transition
Table: When | Step | Owner.
## Founder considerations
## Board actions
## Open questions
</output_format>
