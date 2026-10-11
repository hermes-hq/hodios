---
schema: 1
id: set-up-report-row-level-security
kind: prompt
title: Set up row-level security in a BI report
description: Sets up row-level security in Power BI, Tableau or Looker so each viewer sees only their rows, with a mapping table, the tool-specific setup, a test matrix and the usual bypasses to close.
category: reporting
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [data-analyst, data-engineer, business-analyst, security-engineer]
stack: [power-bi, tableau]
inputs: [schema, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [row-level-security, access-control, data-access, bi-governance]
pairs_with:
  prompts: [design-power-bi-data-model, plan-self-service-reporting, write-dax-measure]
args:
  - name: tool
    description: The BI tool (Power BI, Tableau or Looker), edition or licence if relevant, and whether reports are shared in the service, embedded or exported.
    type: text
    required: true
  - name: access_rules
    description: "Who should see what, in plain words: for example regional managers see their region, area directors see all regions below them, finance sees everything; plus where user-to-region information lives."
    type: text
    required: true
  - name: model
    description: The tables and relationships in the model or data source that the rules apply to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Security model, Mapping table, Implementation, Test cases, Gaps and risks, Maintenance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Row-level security in a BI tool is usually built once, tested by the author looking at their own view, and then leaks in ways nobody checked. Robust setups are dynamic: one rule driven by a mapping table of user identity to allowed values, kept up to date from an authoritative source, rather than one hard-coded role per region. Each tool has its own mechanics and its own bypasses. In Power BI, roles hold DAX filter expressions, dynamic rules compare USERPRINCIPALNAME() with the mapping table, filters flow along relationships from the one side to the many side (bi-directional flow needs the "apply security filter in both directions" setting), users must be added to the role in the service, and the rules apply only to people who consume the content (workspace Viewers, app users, people the report or semantic model is shared with): workspace Admins, Members and Contributors see all rows. In Tableau, rules are user filters or, better, an entitlement table joined to the data with a data source filter using USERNAME() or ISMEMBEROF(); people who can edit or download the data source may bypass a filter set only in a workbook. In Looker, access_filter on an explore ties a field to a user attribute, and access grants restrict fields. Hierarchies (a director sees all regions below them), users in several groups, and users missing from the mapping need explicit rules; the safe default is that an unmapped user sees nothing. Testing means viewing as specific users, not as the author.
</context>

<task>
Tool: {{tool}}

<access_rules>
{{access_rules}}
</access_rules>
{{#model}}

<model>
{{model}}
</model>
{{/model}}

1. Restate the access rules as a security model: user groups, the column or columns that restrict rows, hierarchy rules, people who see everything, and the default for unmapped users (see nothing).
2. Design the mapping table: columns (user identity in the format the tool sees, allowed value, scope level), source of truth, refresh, and owner. For hierarchies, describe how they are expanded (one row per allowed value, or a path column).
3. Write the implementation for the named tool: the role or filter definitions with code (DAX filter, Tableau calculated field and data source filter, or LookML access_filter and user attribute), where the mapping table joins the model, and how filters propagate to related tables.
4. Close the tool's known bypasses: workspace or project permissions, data source download or edit rights, exports, subscriptions and embedded use. Say which ones apply and what to check in the tool's settings.
5. Write a test matrix: for each test user type, the filter state, the rows and totals expected, and the result, including a user in two regions, a hierarchy user, an unmapped user, and a user who is removed from the mapping.
6. List gaps and risks, including whether column-level restrictions are also needed (for example salary columns) and how they would be handled in this tool.
7. Define maintenance: who updates the mapping, how joiners, movers and leavers are handled, and a periodic access review.
</task>

<constraints>
- Write code only for the tool named; mark tool features or settings whose names or availability depend on edition or version as "check in your version".
- Never treat a hidden page, hidden column or report-level filter as security.
- Default to deny: no rule should give an unmapped user all rows.
- Do not use real user identities in examples; use placeholders.
- Testing must be done as the viewer, not the author; say so explicitly.
</constraints>

<output_format>
## Security model
Table: group | sees | rule.

## Mapping table
Table: column | meaning | example placeholder value. Then source, refresh and owner.

## Implementation
Steps with code blocks.

## Test cases
Table: test user | filters | expected rows or totals | result.

## Gaps and risks
## Maintenance
</output_format>
