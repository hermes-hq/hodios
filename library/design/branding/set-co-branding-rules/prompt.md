---
schema: 1
id: set-co-branding-rules
kind: prompt
title: Set co-branding rules for a partnership
description: Sets the rules for two brands appearing together - hierarchy, logo lock-ups, colour, voice, joint product naming, approvals, points for the agreement, and removal when the partnership ends.
category: branding
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, graphic-designer, founder, executive]
advice_risk: [legal]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [co-branding, brand-partnership, logo-lockup, trademark-use, partner-marketing]
pairs_with:
  prompts: [build-brand-guidelines, design-brand-architecture, write-partnership-proposal]
  personas: [brand-strategist]
args:
  - name: partnership
    description: The two brands, the type of partnership (sponsorship, joint product, ingredient brand, charity partner, technology integration), its length and what will be produced together.
    type: text
    required: true
  - name: guidelines
    description: What each brand's guidelines say about partner use (logo clear space, minimum size, approval rules), if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and limits, Partnership type and hierarchy, Lock-ups, Visual rules, Voice and naming, Approvals, Points for the agreement, Exit and removal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Co-branding goes wrong in small ways that add up: two logos set at the same height but looking unequal because one is a wide wordmark and the other a compact symbol, partner logos recoloured or stretched to fit a layout, joint products named in a way that neither brand can own afterwards, approvals that take three weeks and miss print deadlines, and old co-branded materials still circulating after the partnership ends. The first decision is hierarchy: equal partners, a lead brand with a partner, or an endorsement ("in partnership with", "powered by"). Each party's trademark use is normally governed by the partnership agreement and their own guidelines, so the brand rules and the contract must agree.
</context>

<task>
Set co-branding rules for this partnership.

<partnership>
{{partnership}}
</partnership>
{{#guidelines}}

<guidelines>
{{guidelines}}
</guidelines>
{{/guidelines}}

1. **Scope and limits.** One or two sentences: these are brand and design rules plus points to raise with lawyers, not a contract or legal advice.
2. **Partnership type and hierarchy.** Classify the partnership and recommend equal, lead-and-partner or endorsed hierarchy, with the reason and how it shows in each material.
3. **Lock-ups.** Arrangements (side by side with a divider, stacked, "in partnership with" line, "powered by" tag), optical size balancing rather than equal heights, clear space between logos, which logo comes first and when, background and colour versions, and minimum sizes.
4. **Visual rules.** Whose layout system and palette leads in which materials, shared elements, photography, and what neither side may alter (no recolouring, stretching or combining logos into a new mark unless agreed).
5. **Voice and naming.** Whose voice leads, how each brand is named in copy, joint product or campaign naming, and who owns a joint name.
6. **Approvals.** Who approves what, turnaround times, a single shared asset folder, the version of each partner's logo to use, and an escalation path.
7. **Points for the agreement.** Issues to raise with the lawyers drafting or reviewing the partnership agreement: trademark licence scope and territory, approval rights, quality control, ownership of joint names and creative, use of each other's name in press and social, and what happens to materials and stock at the end.
8. **Exit and removal.** A removal plan for both digital and physical materials when the partnership ends, sell-off periods for printed stock, and archived files.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not draft contract clauses or state what the law requires; list points for legal review.
- Respect each brand's existing guidelines; where they conflict, flag the conflict for the two brand owners to resolve.
- Do not invent the partners' guideline values (clear space, colours); use placeholders where unknown.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Lock-ups as a table (Arrangement, When used, Order, Spacing, Notes). Approvals as a table (Item, Approver, Turnaround). Agreement points and removal as checklists.
</output_format>
