---
schema: 1
id: learn-business-etiquette-abroad
kind: prompt
title: Learn business etiquette abroad
description: Prepares a professional for meetings in another country with greetings, hierarchy, punctuality, gifts, negotiation style, dining and follow-up norms, framed as tendencies.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, sales-rep, executive, founder]
requires: [none]
inputs: [topic, preferences]
output: [explanation, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [business-etiquette, cross-cultural, international-meetings, negotiation-style, business-travel]
pairs_with:
  prompts: [plan-business-trip, prepare-deal-negotiation, learn-local-etiquette]
  personas: [local-culture-guide, negotiation-coach]
args:
  - name: country
    description: Country where the meetings take place, or the counterpart's country if meeting remotely.
    type: string
    required: true
  - name: meeting_type
    description: The kind of meeting. It shifts the emphasis between relationship-building, negotiation and protocol.
    type: enum
    enum: [sales, partnership, internal, conference]
    default: sales
  - name: seniority
    description: Your seniority and your counterparts', for example "I'm a mid-level account manager meeting their head of procurement". Optional.
    type: string
  - name: from_country
    description: Your own business culture, so the brief can flag where you will need to adjust most. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The five that matter most, First contact, Hierarchy and decisions, Meeting style, Negotiation, Dining and hospitality, Gifts and compliance, Follow-up, Phrases]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Business meetings across cultures fail more often on process than on product: a deal stalls because the visitor pushed for a decision in a culture where decisions are aligned before the meeting, a senior person was addressed out of turn, silence was mistaken for refusal, a contract was treated as final where it is a starting point, or a generous gift ran into anti-corruption rules. Useful preparation explains how decisions get made, how directly people disagree, how time and relationships work, and what is expected at the table and afterwards, while staying honest that individuals, sectors and multinational firms vary a lot.

Country: {{country}}
Meeting type: {{meeting_type}}
{{#seniority}}Seniority: {{seniority}}{{/seniority}}
{{#from_country}}Your business culture: {{from_country}}{{/from_country}}
</context>

<task>
1. The five that matter most for a {{meeting_type}} meeting in {{country}}: the norms where a misstep costs the most.
2. First contact: greetings, names and titles, business cards and how they are handled, small talk that works and topics to avoid, dress.
3. Hierarchy and decisions: who speaks for whom, how decisions are usually made (top-down, consensus, pre-alignment before the meeting), who to address, and what this means given the seniority described.
4. Meeting style: punctuality and agenda flexibility, directness and how disagreement or a "no" is usually expressed, silence, interruptions, use of interpreters (speak to the counterpart, short segments).
5. Negotiation (for sales and partnership, briefer otherwise): relationship versus task focus, opening positions and room to move, pace, attitudes to written contracts, what pressure tactics backfire.
6. Dining and hospitality: who invites and pays, seating, toasts, alcohol and declining gracefully, dietary needs.
7. Gifts and compliance: whether gifts are customary, what is appropriate, presentation, and a clear note that the traveller's company policy and anti-bribery laws apply, with extra care for public officials and state-owned companies.
8. Follow-up: timing, written summaries, how quickly to chase, and channels (email versus messaging apps).
9. If a home business culture is given, mark the two or three adjustments that will feel least natural.
10. Before writing, check that each point is phrased as a tendency, notes variation, and is relevant to the meeting type.
</task>

<constraints>
- Every generalisation is a tendency ("often", "in many firms"), with variation by sector, region, generation and company (multinationals and startups often differ from family firms and the public sector).
- No national character claims or stereotypes about ethnicity or religion.
- Do not invent customs. Say when you are unsure.
- Gifts and hospitality: never suggest anything that could look like a bribe; defer to company policy and applicable law.
</constraints>

<output_format>
## The five that matter most
Numbered, one or two lines each.

## First contact
## Hierarchy and decisions
## Meeting style
## Negotiation
## Dining and hospitality
## Gifts and compliance
## Follow-up
Each: short bullets. Mark the adjustments for your own culture with "Adjust:" if a home culture is given.

## Phrases
Table: Phrase | Pronunciation | Meaning | When. Five or six phrases for greetings, thanks and toasts in the local language, if it is not English.
</output_format>
