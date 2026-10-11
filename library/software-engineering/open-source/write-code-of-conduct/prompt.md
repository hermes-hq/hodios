---
schema: 1
id: write-code-of-conduct
kind: prompt
title: Write a code of conduct for an open-source project
description: Writes a project's CODE_OF_CONDUCT.md from an established template, with real reporting contacts, scope, an enforcement ladder, conflict-of-interest handling and the work needed before adopting it.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contributor-covenant, moderation, enforcement, community-health, incident-reporting]
pairs_with:
  prompts: [handle-code-of-conduct-report, write-contributing-guide, write-project-governance]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, its size, who maintains it (one person, a team, a company, a foundation), where the community talks (issues, chat, forum, events) and whether a parent organisation already has a code of conduct.
    type: text
    required: true
  - name: responders
    description: Who will receive and handle reports, and whether there is anyone outside the core team who could take reports about maintainers. Optional; placeholders are used if missing.
    type: text
output_contract:
  format: markdown
  sections: [Template choice, Code of conduct, Before you publish, Responder notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A code of conduct is only as good as its enforcement section. Most projects copy the Contributor Covenant and leave the contact as a placeholder, or point reports to a single maintainer who may be the person being reported, so the document signals safety it cannot deliver. What makes one work: a reporting route that reaches more than one person and has an alternative when a responder is involved; a clear scope (project spaces, and when behaviour elsewhere counts); a graduated enforcement ladder (correction, warning, temporary ban, permanent ban) so responses are proportionate and predictable; a promise of confidentiality that the team can actually keep; and responders who have agreed to the job. Using a widely known template is better than writing a custom one, because people recognise it and it has been tested; adapting means filling it in honestly, not rewriting it. If the project belongs to a foundation or company with its own code, the project usually adopts that one and only adds local contacts.

Project:
<project>
{{project}}
</project>
{{#responders}}Responders: {{responders}}{{/responders}}
</context>

<task>
1. Recommend a template: the parent organisation's code if one exists, otherwise the current Contributor Covenant or another widely used code, and say why. Name the version you are basing it on and tell the maintainer to check it against the published text.
2. Write the CODE_OF_CONDUCT.md: pledge and standards kept close to the template, scope fitted to the project's real spaces (repository, chat, forum, events, official social accounts, representing the project elsewhere), and the enforcement ladder with what each step means here.
3. Write the reporting section with real routes from the responders given: a shared address or private form reaching at least two people, what to include in a report, what happens next and roughly when, confidentiality and its limits, and an alternative route when a responder is involved or the project has only one maintainer.
4. Add conflict-of-interest handling: responders step aside from reports involving themselves or close collaborators.
5. List what must be true before publishing: responders have agreed, the address works and is monitored, the file is linked from README and CONTRIBUTING, and event or chat spaces point to it.
6. Write short responder notes: first-response steps and where to record decisions, pointing to a fuller report-handling process.
</task>

<constraints>
- Do not invent contact addresses or names. Use [REPORT EMAIL] or [RESPONDER NAMES] placeholders where the input does not give them, and list them under Before you publish.
- Keep the template's substance; do not water down standards or remove the enforcement ladder to make the document shorter.
- Do not promise response times or confidentiality the stated team cannot keep.
- If there is only one maintainer, say plainly that a single-person reporting route is weak and suggest a realistic alternative (a trusted outside person, the hosting foundation, a fiscal host).
</constraints>

<output_format>
Use the contract's section headings in order. Put the full code of conduct in a fenced markdown block. Before you publish as checkbox lines. Responder notes as a numbered list of no more than eight steps.
</output_format>
