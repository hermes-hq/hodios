---
schema: 1
id: plan-account-takeover-day
kind: prompt
title: Plan an account takeover day
description: Plans handing an organisation's account to a guest for a day, with a brief, posting schedule, do and don't list, approvals, login safety without sharing passwords, a crisis plan and a recap.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, content-creator, teacher]
subject: [education-sector, nonprofit]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [account-takeover, guest-creator, safeguarding, approvals, content-brief]
pairs_with:
  prompts: [plan-live-event-coverage, plan-instagram-stories, recover-hacked-account]
  personas: [social-media-manager]
args:
  - name: guest
    description: Who is taking over (a staff member, student, artist, scientist, partner organisation), their experience with social media, what they will show, and the date.
    type: text
    required: true
  - name: account
    description: The account being handed over and its usual audience (for example "City Museum Instagram, 12k followers, families and teachers").
    type: string
    required: true
  - name: platform
    description: The platform (for example "Instagram stories", "TikTok", "LinkedIn").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Purpose and success, Guest brief, Run of the day, Access and approvals, Crisis plan, Promotion and recap]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A school, museum, nonprofit or brand is letting a guest run its account for a day: a curator behind the scenes, a student's day, an artist in residence, a partner's field visit. Takeovers feel authentic because the guest is not the usual voice, but they go wrong in predictable ways: shared passwords that never get changed, a guest who posts students' faces without consent or an unreleased plan, a day with no structure that fizzles out by lunch, and nobody watching comments. A good takeover keeps the guest's voice and protects the account with a clear brief, a schedule, a review route and a named person on call.

Account: {{account}}
Platform: {{platform}}
</context>

<task>
<guest>
{{guest}}
</guest>

1. State the purpose (what the audience should see or feel) and one or two measures of success (story completion, replies, follows, sign-ups).
2. Write the guest brief: who the audience is, tone, a hello and goodbye format, three to five content beats for the day, what they may post, and what they may not (people who have not agreed to be filmed, children without the organisation's consent list, faces of vulnerable people, security areas, unreleased news, personal opinions on behalf of the organisation, other brands, music they do not have rights to). Include disclosure rules if the guest is paid or a partner.
3. Plan the run of the day: times, beats, format (story, reel, live, post), and who checks each before it goes out. Suggest pre-recording some content in advance so the day survives a bad signal.
4. Access: never share the main password. Recommend platform tools that give limited roles or collaborator access where available, or the guest sending content to a staff member who posts it; if direct access is unavoidable, use a temporary password, two-step login controlled by staff, and a password change straight after. Say to check the platform's current role options.
5. Crisis plan: the named staff contact and their phone availability, when to pause posting, how to remove a post, how to handle abusive comments or a safety concern, and a holding message.
6. Promotion and recap: an announcement post the day before with the guest's consent, a highlights save or recap post, a thank-you, and the numbers to capture.
</task>

<constraints>
- Use only details given; mark missing items (date, staff contact, consent arrangements) as [X].
- For schools and youth settings, follow the organisation's safeguarding and photo-consent policy; if none is mentioned, flag it as a must-check before the day.
- Never advise sharing account passwords by message or keeping a guest's access afterwards.
- Keep the guest brief to one page they can read on their phone.
- If the guest, account or platform is missing, ask for it and stop.
</constraints>

<output_format>
## Purpose and success
Two or three lines.

## Guest brief
The one-page brief, with "Please do" and "Please don't" lists.

## Run of the day
Table: time | beat | format | checked by.

## Access and approvals
Bullets.

## Crisis plan
Bullets plus the holding message.

## Promotion and recap
The announcement, the recap outline and numbers to capture.
</output_format>
