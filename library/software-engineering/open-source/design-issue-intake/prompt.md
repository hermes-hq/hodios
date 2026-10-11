---
schema: 1
id: design-issue-intake
kind: prompt
title: Design issue and pull request intake
description: Designs how issues and pull requests enter a project, with routed issue forms, a short pull request template, a label scheme, saved replies and a weekly triage routine.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text, config]
output: [config, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [issue-templates, labels, triage-routine, bug-reports, pull-request]
pairs_with:
  prompts: [triage-issue-backlog, write-security-policy, write-good-first-issues]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What the project is, where it is hosted (GitHub, GitLab, Codeberg or other), issue volume per week, and the bad reports you get most (no version, no reproduction, support questions, duplicates, feature requests filed as bugs).
    type: text
    required: true
  - name: current_setup
    description: Your existing templates, labels and any automation, pasted or described. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Problems to fix, Intake routes, Issue templates, Pull request template, Labels, Triage routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most triage pain is decided at intake. Projects that route support questions to a forum or discussions, send security reports to a private channel, and ask for version, environment and a minimal reproduction in required fields cut maintainers' back-and-forth sharply. The common mistakes are forms so long that people pick the blank option, labels nobody applies consistently (twelve priority levels, overlapping area labels), and no rule for issues that never get the information requested. A good label scheme has a few independent groups, usually type, area, status (needs triage, needs info, needs reproduction, accepted) and contributor-facing labels such as good first issue, and almost no priority labels on a volunteer project.

Project:
<project>
{{project}}
</project>
{{#current_setup}}
Current setup:
<current_setup>
{{current_setup}}
</current_setup>
{{/current_setup}}
</context>

<task>
1. List the intake problems to fix, tied to the bad reports described{{#current_setup}} and to gaps in the current setup{{/current_setup}}.
2. Define the intake routes: bug report, feature request, question or support (sent elsewhere), security report (private channel, never a public issue), and documentation. For each, where it goes and why.
3. Write the issue templates in the hosting platform's format (for GitHub, issue forms in YAML plus the template chooser config with contact links and blank issues decided; for GitLab, description templates in markdown; otherwise plain markdown). Keep required fields to what triage truly needs, with placeholders that show a good answer.
4. Write a pull request template under fifteen lines: what and why, linked issue, how it was tested, and a short checklist.
5. Propose the label scheme as groups with names, colours by group, meaning and who applies each, plus the renames and deletions needed from the current labels.
6. Write the triage routine: who triages and how often, the steps for a new issue, saved replies for needs info, duplicate, support question and out of scope, and the rule for closing needs-info issues after a stated number of days with a kind message.
</task>

<constraints>
- Use only template syntax you are confident the named platform supports; if unsure about a field type or key, say so and keep to the basics.
- Do not name third-party bots or marketplace actions unless the project already uses them; describe the automation instead.
- Never route security reports to a public form; point to the project's security policy or private reporting feature.
- Keep the number of labels small; justify every label you add.
</constraints>

<output_format>
Use the contract's section headings in order. Templates and config as fenced code blocks with the file path as a heading above each. Labels as a table: Label | Group | Colour | Meaning | Applied by.
</output_format>
