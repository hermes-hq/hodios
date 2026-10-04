---
schema: 1
id: build-research-repository
kind: prompt
title: Design a UX research repository
description: Designs a research repository with an atomic insight structure, tagging taxonomy, evidence linking, intake process, access rules and how teams search and reuse findings.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [ux-researcher, product-manager, designer]
requires: [none]
inputs: [text, preferences]
output: [plan, docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-repository, atomic-research, research-ops, insight-management, tagging-taxonomy]
pairs_with:
  prompts: [synthesize-usability-findings, set-up-research-panel, ux-research-study-track]
  personas: [ux-researcher]
args:
  - name: team_size
    description: How many people do research (researchers and others who run sessions), counted as a number. Mention the number of consumers of research in research_types.
    type: number
    required: true
  - name: research_types
    description: The kinds of research and data you produce and who consumes it, for example "interviews, usability tests, NPS verbatims, support tickets, analytics notes; 40 PMs and designers read findings".
    type: text
    required: true
  - name: tool
    description: The tool you have or prefer (a dedicated research repository tool, a wiki, a database-style notes tool, a spreadsheet), or "any" for a tool-agnostic design with options.
    type: string
    default: any
output_contract:
  format: markdown
  sections: [Purpose and users, Information model, Tagging taxonomy, Intake process, Search and reuse, "Access, consent and retention", Tool setup, Launch and adoption, Health measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most research repositories become graveyards: a folder of slide decks nobody can search, or a tool full of untagged highlights that only the person who added them understands. Teams then repeat studies, and decisions are made on half-remembered findings. Repositories that work are designed around the questions people bring to them ("What do we know about why trial users churn?"), store knowledge in small linked units (raw evidence, observations or nuggets, and insights that cite their evidence), use a small, governed tag set, have an intake routine that fits into the end of every study, and protect participants: consent scope, de-identification and retention are part of the design, not an afterthought.
</context>

<task>
Design a research repository for a team of {{team_size}} people who do research.

<research_types>
{{research_types}}
</research_types>

Tool: {{tool}} (if "any", keep the design tool-agnostic and compare two or three tool types at the end).

1. **Purpose and users:** who will add to the repository and who will search it, the top five questions searchers bring, and what the repository is not (not a raw-file dump, not a replacement for talking to researchers). Size the ambition to the team: for one to three researchers, a lightweight setup that takes minutes per study; for larger teams, dedicated research operations.
2. **Information model:** define the units and their fields, for example:
   - **Study:** goal, method, dates, participants (segment, never names), researcher, status, link to the plan and consent form.
   - **Evidence:** a clip, quote, note or data point, linked to its study and a pseudonymous participant ID.
   - **Observation (nugget):** one factual statement of what was seen or heard, with links to its evidence.
   - **Insight:** an interpretation supported by observations across one or more studies, with a confidence level (based on number and diversity of sources), date and owner.
   - **Recommendation or decision:** linked to the insights it relies on.
   Show how they link, and the rule that every insight cites evidence.
3. **Tagging taxonomy:** a small controlled set of tag groups fitted to {{research_types}}, for example product area, user segment, journey stage, need or pain type, and method. Give starting values for each group, rules on who can add tags, a monthly review to merge duplicates, and a guard against tags that only one person uses.
4. **Intake process:** the steps at the end of each study (who adds what, within what time, a definition of done), templates for a study page and an insight, and how to bring in continuous sources (support tickets, survey verbatims) without flooding the repository.
5. **Search and reuse:** how searchers find answers (saved views per product area, an "ask the repository" request route to a researcher), insight digests, and how to mark insights as outdated when the product changes.
6. **Access, consent and retention:** what participants consented to, who can see raw recordings versus de-identified notes, removing names, faces and personal data from shared material, a retention period with deletion, and handling requests from participants to withdraw. Tell the user to confirm the rules with their privacy or legal team.
7. **Tool setup:** for the tool chosen, the structure (databases, tables, fields, views, templates). If "any", compare options by search quality, linking, video support, permissions, cost and admin effort.
8. **Launch and adoption:** start by back-filling the last few high-value studies rather than everything, train contributors, and embed links to insights in product rituals (planning, design reviews).
9. **Health measures:** for example studies added within the agreed time, share of insights with evidence links, searches or views by non-researchers, repeat-study requests avoided.
10. Before answering, check that the intake steps fit the team size: estimate the minutes per study the process costs, and simplify if it is more than the team can sustain.
</task>

<constraints>
- Never recommend storing participant names, contact details or unconsented recordings in a widely shared space.
- Keep the taxonomy small enough to learn in one sitting; justify every tag group.
- Do not claim features of specific commercial tools as current fact; describe capabilities to check.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. The information model as a table per unit (Field, Type, Required, Example) plus a short diagram of links; the taxonomy as a table (Group, Starting values, Owner); templates as fenced Markdown blocks.
</output_format>
