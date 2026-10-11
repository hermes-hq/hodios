---
schema: 1
id: handle-code-of-conduct-report
kind: prompt
title: Handle a code of conduct report
description: Guides maintainers through one code of conduct report, from safety and conflicts of interest to evidence, a proportionate decision on the enforcement ladder and messages to everyone involved.
category: open-source
version: 1.0.0
status: incubating
stage: [operate]
role: [maintainer, manager]
requires: [none]
inputs: [message, text]
output: [plan, message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [code-of-conduct, moderation, enforcement, community-health, harassment]
pairs_with:
  prompts: [draft-maintainer-issue-replies]
  personas: [open-source-maintainer]
args:
  - name: report
    description: The report as received, with what happened, where (issue, chat, conference), links or quotes the reporter gave, and who reported. Remove names you do not need to share.
    type: text
    required: true
  - name: conduct_code
    description: The project's code of conduct and its enforcement section, or its name and version if it is a standard one. Optional.
    type: text
  - name: context
    description: Who handles reports, any relationship between them and the people involved, prior incidents, and anything you already did. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Urgency and safety, Who should handle it, What is established, Evidence still needed, Options and recommendation, Messages, Incident record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most projects adopt a code of conduct and never plan how to enforce it, so the first report is handled badly: the reporter waits weeks, a friend of the reported person decides the case, or a maintainer posts a public verdict that makes things worse. Experienced moderators work in this order: make people safe, remove conflicts of interest, acknowledge the reporter quickly, separate what is documented from what is claimed, hear the reported person when it is safe to do so, decide on impact rather than intent, choose the lightest step on the ladder that stops the harm (correction, warning, temporary ban, permanent ban, in the style of the Contributor Covenant's enforcement guidelines), and keep a private record. Moderators are not a court: they decide who may take part in the project's spaces, not guilt.

Report:
<report>
{{report}}
</report>
{{#conduct_code}}
Code of conduct:
<conduct_code>
{{conduct_code}}
</conduct_code>
{{/conduct_code}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Urgency and safety: say whether anything needs action today, such as threats, doxxing, sexual harassment, a minor involved, or ongoing abuse. For threats of violence or self-harm, tell them to contact local emergency services or the platform's trust and safety team first, and to preserve evidence.
2. Who should handle it: name the conflicts of interest (reported person is a maintainer, a friend, an employer's colleague) and who should step aside. If the project has only one or two maintainers, suggest a trusted outside moderator.
3. What is established: separate facts backed by links or screenshots from claims, and note anything that might be deleted soon and should be captured now.
4. Evidence still needed: the questions to ask the reporter and, if it is safe, the reported person, worded neutrally.
5. Options and recommendation: map the behaviour to the code's clauses{{#conduct_code}} using the supplied text{{/conduct_code}}, list the proportionate options from the ladder with consequences, and recommend one with reasons. If the facts are disputed and unsupported, say that no sanction is justified yet and what would change that.
6. Messages: a same-day acknowledgement to the reporter (no promised outcome, confidentiality explained), the message to the reported person, and a short public note only if the behaviour was public and needs a visible response.
7. Incident record: a private record entry with date, people (by role), evidence links, decision, decided by, and review date.
</task>

<constraints>
- Do not decide guilt from one account alone, and do not dismiss a report because the reported person is valued or prolific.
- Keep the reporter's identity confidential unless they agree otherwise; never quote them to the reported person without consent.
- Public statements name behaviour and the action taken, not private details, and never speculate.
- Do not give legal advice. If there is a legal threat, possible crime, or employment issue, say to involve the appropriate person (a lawyer, the employer, a foundation's staff or the police).
- If no code of conduct was supplied, say decisions should rest on the project's published rules and recommend adopting one with an enforcement section.
</constraints>

<output_format>
Use the contract's section headings in order. Options and recommendation as a table: Option | What it means | Fits because | Risk. Messages as separate fenced blocks with a one-line label each.
</output_format>
