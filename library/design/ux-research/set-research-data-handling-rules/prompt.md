---
schema: 1
id: set-research-data-handling-rules
kind: prompt
title: Set UX research data handling rules
description: Sets rules for handling UX research data such as recordings, notes and participant details, covering consent scope, storage, access, clip sharing, redaction, retention and deletion.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [ux-researcher, product-manager, designer]
requires: [none]
inputs: [text, notes]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [research-ops, participant-privacy, session-recordings, data-retention, consent-scope]
pairs_with:
  prompts: [build-research-repository, set-up-research-panel, write-informed-consent-form]
  personas: [ux-researcher]
args:
  - name: practice
    description: What research the team runs, what it records (video, audio, screen, notes, surveys), where it is stored now, who watches or uses it, and tools in use.
    type: text
    required: true
  - name: context
    description: Countries where participants live, company privacy policy or data protection officer involvement, and any regulated sector (health, finance, children). Optional but important.
    type: text
output_contract:
  format: markdown
  sections: [Data inventory, Consent scope, Storage and access, Sharing clips and quotes, Redaction, Retention and deletion, Incidents, One-page team rules, Questions for privacy or legal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
UX research produces personal data that spreads fast: recordings with faces and voices dropped into chat channels, screen shares showing a participant's email or bank details, highlight reels reused in sales decks the participant never agreed to, and spreadsheets of names and incentive details kept forever. Good rules keep identifying details separate from findings, limit raw recordings to the people who need them, match every use to what the consent form said, redact before sharing, and set a retention period that someone actually enforces. Data protection law differs by country, and the organisation's privacy lead has the final word.
</context>

<task>
<practice>
{{practice}}
</practice>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}

1. Data inventory: each data type (contact details, screener answers, consent forms, recordings, transcripts, notes, incentives records, synthesised insights), whether it identifies people, and where it lives.
2. Consent scope: what uses the consent form must cover for the team's practice (internal analysis, sharing clips internally, external use), and the gaps in the current practice.
3. Storage and access: approved locations, who can see raw recordings versus anonymised findings, access reviews.
4. Sharing clips and quotes: rules for internal sharing, attribution as pseudonyms, no external use without specific consent.
5. Redaction: what to blur or cut (faces where not needed, names, emails, account numbers on screen), and asking participants to close other windows before screen sharing.
6. Retention and deletion: periods proposed per data type (to confirm with the privacy lead), who deletes, how deletion is logged, and handling withdrawal requests.
7. Incidents: what to do if a recording is shared wrongly.
8. One-page team rules.
9. Questions for privacy or legal.
</task>

<constraints>
- Do not state legal requirements or retention periods as fact for a jurisdiction; propose and mark "confirm with privacy lead", and ask for countries if missing.
- Treat research with children, health or financial data as needing extra approval; flag it.
- Do not recommend tools by brand; describe needed capabilities.
</constraints>

<output_format>
## Data inventory
| Data | Identifies people | Where now | Rule |
## Consent scope
## Storage and access
## Sharing clips and quotes
## Redaction
## Retention and deletion
## Incidents
## One-page team rules
## Questions for privacy or legal
</output_format>
