---
schema: 1
id: write-event-code-of-conduct
kind: prompt
title: Write an event code of conduct
description: Drafts a code of conduct for a conference, meetup, festival or retreat with expected behaviour, unacceptable conduct, how to report on the day, response steps and a responder guide.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [project-manager, manager, developer-advocate]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [conference-code-of-conduct, event-safety, incident-reporting, responder-guide, inclusive-events]
pairs_with:
  prompts: [plan-recurring-meetup, write-safeguarding-policy, write-community-guidelines]
args:
  - name: event
    description: Type of event, size, venue and whether there is alcohol, overnight stays, online spaces (chat, streams), minors attending, sponsors and exhibitors, and how many organisers or volunteers can respond to reports.
    type: text
    required: true
  - name: jurisdiction
    description: Country or state where the event takes place.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Code of conduct, Short version for badges and slides, Responder guide, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An event code of conduct only helps if attendees know it exists, can report quickly in person or privately, and see that organisers act. The failures are well known from tech and arts events: a nice statement with no named contacts, reports that go to the person who is the problem, organisers who promise confidentiality and then talk, no plan for the evening party where most incidents happen, and nothing about sponsors, speakers and staff (who are often in positions of power). A workable code covers everyone at the event and its online spaces, gives specific examples of unacceptable behaviour, offers several reporting routes including an anonymous one, says what organisers may do (warning, removal without refund, banning from future events, involving venue security or police), and is backed by a short responder guide and trained responders. Crimes and immediate danger go to emergency services first.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Event:
<event>
{{event}}
</event>

1. Code of conduct in plain language:
   - Purpose and who it covers: attendees, speakers, sponsors and exhibitors, volunteers, staff, and online spaces and official social events.
   - Expected behaviour.
   - Unacceptable behaviour with concrete examples relevant to this event (harassment, unwanted contact or photography, sexualised content in talks or booths, intimidation, disruptive drunkenness, sharing personal details online).
   - How to report: named roles with [CONTACT] placeholders, a phone or text line staffed during the event, a private form, anonymous option, and what to include.
   - What happens next: listening, safety first, options for the reporter, possible actions, and honest limits on confidentiality.
   - Immediate danger: call emergency services, then tell an organiser; venue and local emergency numbers as [BRACKETS].
   - Support available (quiet room, escort to transport).
   - No retaliation, and how false reports are handled without discouraging reports.
2. Short version for badges and slides: three or four lines with the reporting contact.
3. Responder guide: a one-page script for volunteers taking a report (find a private place, listen, ask what they need, write down facts, do not promise outcomes, escalate to the lead, record), the decision-making group, conflict-of-interest rule, and notes on minors if present.
4. Points to confirm: venue rules, alcohol licensing, photography consent, data handling of reports, safeguarding duties if minors attend.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise absolute confidentiality or a particular outcome; state limits honestly.
- Never route reports only to a single person; always give a second route in case that person is involved.
- If minors attend, add safeguarding contacts and say a safeguarding policy is needed.
- Use [BRACKETS] for names, numbers and contacts; do not invent emergency numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Code of conduct
The full code with headings.

## Short version for badges and slides
Three or four lines.

## Responder guide
Numbered steps, then decision-making rules.

## Points to confirm
Numbered.
</output_format>
