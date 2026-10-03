---
schema: 1
id: agree-authorship-order
kind: prompt
title: Agree authorship and author order
description: Drafts an authorship agreement for a research team with eligibility criteria, CRediT roles, author order, how changes are handled and a fair route for disputes. Use at the start of a project.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student, manager]
requires: [none]
inputs: [text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [authorship, credit-taxonomy, icmje, contributorship, research-integrity, collaboration]
pairs_with:
  prompts: [write-data-management-plan, plan-research-dissemination, write-journal-cover-letter]
  personas: [thesis-advisor]
args:
  - name: team
    description: Everyone involved and what each person has done or is expected to do (idea, funding, design, data collection, analysis, writing, supervision, technical support), with career stage and institution.
    type: text
    required: true
  - name: project
    description: The project and its planned outputs (papers, datasets, software), with any existing disagreements or expectations about who goes where.
    type: text
    required: true
  - name: field
    description: The discipline and target venues, which decide author-order conventions, for example "biomedicine", "economics (alphabetical)", "computer science conferences".
    type: string
output_contract:
  format: markdown
  sections: [Conventions that apply, Contribution matrix, Proposed authorship, Agreement text, Points to discuss]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authorship disputes are among the most common research integrity complaints, and most start with expectations nobody wrote down. Widely used standards help: the ICMJE criteria (substantial contribution, drafting or critical revision, final approval, and accountability, all four required) in biomedicine and many other fields, the CRediT taxonomy of fourteen contributor roles, and COPE guidance for handling disputes. Author-order conventions differ by field: first and last positions carry weight in biomedicine and life sciences, alphabetical order is common in mathematics and economics, and equal-contribution and corresponding-author designations mean different things in different places. Gift, guest and ghost authorship are all misconduct risks. Good agreements are made early, tied to contributions, revisited when roles change, and include a fair way to resolve disagreement.
</context>

<task>
Draft an authorship agreement.
<team>
{{team}}
</team>
<project>
{{project}}
</project>
{{#field}}Field and venues: {{field}}{{/field}}

1. State the conventions that apply in this field and the likely venues, and ask the team to check their target journals' authorship policies. If the field is unknown, say which conventions differ and ask.
2. Map each person's actual and planned contributions to CRediT roles, and judge each person against the authorship criteria that apply. Separate authors from contributors to acknowledge (for example funding acquisition or general supervision alone, technical help, data provision without intellectual contribution).
3. Propose author order with the reasoning for each position, equal-contribution designations if justified, and the corresponding author. Where the information supports more than one defensible order, show the options and the trade-offs instead of choosing.
4. Write agreement text the team can adapt: eligibility criteria, how order is decided, CRediT statement, how and when the agreement is revisited (for example at each milestone and before submission), what happens when someone joins, leaves or does not deliver, rules for derivative outputs (follow-up papers, datasets, theses), and a dispute route that starts with a team conversation and escalates to a neutral senior colleague, then the institution's research integrity office or ombudsperson, with COPE guidance as reference.
5. Flag risks: gift or guest authorship, ghost authorship (including uncredited writers or students), power imbalances affecting junior members, and any contested claim in the input.
</task>

<constraints>
- Base judgements on the contributions described. Where a contribution is unclear, mark it "[TO CONFIRM]" rather than assuming.
- Be fair to junior members and students: substantial intellectual work earns authorship regardless of seniority, and seniority alone does not.
- Do not decide a live dispute as if you were an adjudicator; lay out the criteria, the facts given, and the process.
- Note that institutional and journal policies take precedence over this draft.
</constraints>

<output_format>
## Conventions that apply
Field conventions and policies to check.
## Contribution matrix
A table: person | CRediT roles | meets authorship criteria? | note.
## Proposed authorship
Order with reasoning, or options with trade-offs; equal-contribution and corresponding author.
## Agreement text
The adaptable agreement in numbered clauses.
## Points to discuss
Open questions and risks for the team meeting.
</output_format>
