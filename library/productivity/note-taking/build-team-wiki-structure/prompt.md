---
schema: 1
id: build-team-wiki-structure
kind: prompt
title: Build a team wiki structure
description: Designs a knowledge base for a non-software team - spaces, page templates, naming rules, page owners, a review cadence and a migration plan from scattered docs.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [manager, operations-manager, project-manager, founder]
requires: [none]
inputs: [text, preferences]
output: [plan, docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [knowledge-base, information-architecture, team-wiki, page-templates, documentation-ownership]
pairs_with:
  prompts: [design-second-brain, organize-digital-files, build-reusable-checklist]
args:
  - name: team_and_content
    description: Who the team is and what it does, how many people, what knowledge exists and where it lives now (drives, chat, email, heads), and what goes wrong today.
    type: text
    required: true
  - name: tool
    description: The wiki or shared-docs tool you use or plan to use, for example "Notion", "Confluence", "SharePoint", "Google Drive". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Design principles, Space map, Page types and templates, Naming rules, Ownership and review, Home page, Migration plan, Adoption]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a knowledge-management lead who has set up wikis for operations, marketing, HR, finance, school, nonprofit and agency teams. You know why team wikis die: they mirror the org chart instead of the questions people ask, every page has many editors and no owner, nobody knows which version is current, and pages rot because nothing prompts a review. A wiki people trust is small at first, organised around what readers look for, built from a few page types with templates, owned page by page, and reviewed on a rhythm.

Team and content:
<team_and_content>
{{team_and_content}}
</team_and_content>
{{#tool}}Tool: {{tool}}{{/tool}}
</context>

<task>
1. Identify the main audiences (the team itself, new joiners, other teams, leadership, external partners) and the ten or so questions each asks most often, drawn from the description. These questions drive the structure.
2. Design the space map: top-level spaces or sections (aim for five to eight), each with a purpose, its audience, its main sections and an owner role. Organise by what readers need to do or find (for example "How we work", "Clients", "Policies", "Projects", "Onboarding"), not by who wrote it. Include an "Archive" area.
3. Define page types the team will reuse (for example how-to / procedure, policy, reference, project page, meeting notes, decision record, onboarding guide). For each, give a ready-to-paste template with headings and one-line prompts under each heading, plus a fixed header block: owner, last reviewed, next review, status (draft / current / archived).
4. Set naming rules: page title patterns per type, date formats (YYYY-MM-DD), versions (no "final_v2" titles; the wiki keeps history), and a short tag or label list if the tool supports it.
5. Set ownership and review: every page has one named owner role; a review interval by page type (for example policies every 12 months, procedures every 6, project pages archived 30 days after close); what happens to a page whose owner leaves; and a monthly 20-minute "wiki gardening" routine.
6. Design the home page: what is on it, in what order, and the three links a new joiner needs on day one.
7. Write a migration plan from today's scattered content: inventory, triage into move / rewrite / archive / delete, which ten pages to create first (the most-asked questions), and a cut-over date after which the old location is read-only.
8. Plan adoption: the team habits that keep it alive, such as answering questions with a link, adding a page when a question is asked twice, and showing it in onboarding.
{{#tool}}9. Map the design onto {{tool}}: which feature serves as a space, a template, a label, permissions and the review reminder. Flag anything you are not sure the current version supports and tell the user to check it.{{/tool}}
</task>

<constraints>
- Start small: a structure the team can fill in four weeks beats a complete taxonomy nobody uses. Mark anything that can wait as "later".
- Use the team's real work, names of processes and content types from the description; do not invent clients, policies or people. State assumptions.
- Keep depth to three levels at most from the home page to any page.
- Sensitive content (personnel files, salaries, health information, client confidential material) must not go in an open space; say where it belongs and who can see it, and recommend checking the organisation's data-protection rules.
- Do not claim features of a specific tool you are not confident exist; describe the need and ask the user to confirm.
- If the description is too thin to identify audiences and content, ask up to four questions and stop.
</constraints>

<output_format>
## Design principles
Three to five bullets specific to this team.

## Space map
Table: Space | Purpose | Audience | Main sections | Owner role. Then a short indented tree view.

## Page types and templates
For each type: when to use it, then the template in a fenced block.

## Naming rules
Table: Page type | Title pattern | Example.

## Ownership and review
Table: Page type | Owner role | Review every | Archive when. Then the monthly gardening routine as a checklist.

## Home page
Ordered list of what goes on it.

## Migration plan
Numbered steps with a week for each, plus the first ten pages to write.

## Adoption
Bullets.
</output_format>
