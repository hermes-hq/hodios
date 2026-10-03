---
schema: 1
id: write-site-visit-report
kind: prompt
title: Write a site visit report
description: Turns field or site visit notes into a structured report with observations, evidence, issues rated by severity and owned follow-ups. For consultants, inspectors, auditors and area managers.
category: business-writing
version: 1.0.1
status: incubating
stage: [review]
role: [consultant, operations-manager, manager, project-manager]
requires: [none]
inputs: [notes, image]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [site-visit, field-report, inspection, audit-findings, follow-ups]
pairs_with:
  prompts: [write-workplace-incident-report, write-status-report, write-executive-summary]
args:
  - name: visit_notes
    description: Your notes from the visit, such as what you saw by area, conversations, measurements, photo numbers, documents checked and anything that worried you. Fragments and shorthand are fine.
    type: text
    required: true
  - name: site_and_purpose
    description: Which site, the visit date, who visited, and why, for example "Lisbon store, 12 May, quarterly standards check against the store operations manual".
    type: string
    required: true
  - name: report_audience
    description: Who receives the report, for example the client, head office, the site manager or a regulator.
    type: string
    default: client
output_contract:
  format: markdown
  sections: [Visit report, Questions for the visitor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Says how to use attached photos as evidence."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A site visit report has two jobs: give someone who was not there an accurate picture of the site, and turn what the visitor found into actions that get done. Readers trust it when every finding is anchored in evidence (what was seen, measured, photographed or shown in a document) and when the report is honest about what was only heard from site staff. It loses value when findings are vague ("housekeeping could be better"), when minor and serious issues sit in one undifferentiated list, when good practice goes unrecorded, and when follow-ups have no owner or date.

Severity scale, applied consistently:
- **Critical:** immediate risk to people's safety, legal compliance or the core purpose of the site; act now.
- **Major:** a significant gap against the standard or objective that will cause harm, loss or failure if left; act within an agreed short period.
- **Minor:** an isolated lapse with limited impact; fix in normal course.
- **Observation:** not a breach; an improvement opportunity or something to watch.
</context>

<task>
Write a site visit report for {{report_audience}}.

<site_and_purpose>
{{site_and_purpose}}
</site_and_purpose>

<visit_notes>
{{visit_notes}}
</visit_notes>

1. If the notes contain no findings at all, or you cannot tell which site or what the visit was for, ask in one short message and stop.
2. Group observations by area or topic in the order a reader would walk the site or follow the purpose of the visit.
3. For each observation, record the evidence type: seen, measured, photo (keep the visitor's photo references), document reviewed, or stated by site staff (by role). Keep statements by staff clearly attributed; do not present them as verified. If photos are attached, describe only what is visible in them, cite them by their number or file name, and do not infer readings, dates or causes the image does not show.
4. Turn problems into issues. Each issue states the condition found, the standard or expectation it falls short of (only if the notes or purpose name one; otherwise describe the expectation in plain terms and do not cite a regulation or clause that was not given), the impact, and a severity from the scale above. Explain any Critical rating in one line.
5. Record what is working well, with the same specificity. Good practice is a finding too and helps the site accept the rest.
6. Write follow-ups for every Critical and Major issue and any Minor issue the notes suggest acting on: the action, the owner (role), the due date and how completion will be shown. Use `[need: owner]` or `[need: date]` when the notes do not say.
7. Write a summary for a reader who reads nothing else: overall impression in one sentence, the number of issues by severity, the most important one or two actions, and any Critical item.
8. If anything in the notes points to immediate danger to people, put it first in the summary marked as Critical and say what should happen today.
</task>

<constraints>
- Use only what is in the notes. Never invent measurements, names, clause numbers, photos or conversations.
- Neutral, specific language: describe conditions and actions, not people's attitudes. "Two of six fire extinguishers had no inspection tag dated within the last 12 months" rather than "fire safety is sloppy".
- Do not rate an issue Critical or Major without evidence in the notes that supports it; if the severity depends on a fact you lack, give the likely rating and the question that would settle it.
- Match the register to {{report_audience}}: a client report avoids internal shorthand; a report to the site itself can be more operational.
- Keep the body under about 900 words; put long lists of minor items in a table rather than prose.
</constraints>

<output_format>
## Visit report
- **Header:** site, date, visitor(s), people met (roles), purpose, scope (what was and was not covered).
- **Summary:** three to five sentences as described in step 7.
- **Observations by area:** short subsections with bullet findings, each ending with its evidence in brackets.
- **Issues:** table with # · Area · Issue · Evidence · Severity · Impact.
- **Good practice:** bullets.
- **Follow-ups:** table with # · Action · Owner · Due · Evidence of completion.
- **Next visit or review:** what to check next time, if the notes suggest it.
## Questions for the visitor
Bullets: facts you need to confirm, including each `[need: …]`, any severity that depends on a missing fact, and any finding where the notes were ambiguous. "None" if none.
</output_format>
