---
schema: 1
id: write-community-condolence-post
kind: prompt
title: Write a community condolence post
description: Writes the public post when a school, club, nonprofit or business loses a member or faces tragedy, using confirmed facts and family wishes only, with support, a posting pause and comment care.
category: social-media
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, teacher, marketer]
subject: [education-sector, nonprofit]
requires: [none]
inputs: [text]
output: [post, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bereavement, tragedy-response, crisis-communication, family-consent, comment-care]
pairs_with:
  prompts: [write-condolence-message, handle-social-media-backlash]
args:
  - name: situation
    description: What has happened as confirmed by the family or official sources, who the person was to the community, what has been said publicly already, and what is still unconfirmed.
    type: text
    required: true
  - name: organisation
    description: Who is posting (for example "Westfield Rugby Club", "Oak Lane Primary School", "Corner Books").
    type: string
    required: true
  - name: family_wishes
    description: What the family has agreed to (name, photo, funeral details, donations instead of flowers), or "not yet asked".
    type: text
    default: not yet asked
output_contract:
  format: markdown
  sections: [Before posting, Post, Shorter version, Comments and messages, Scheduled content]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A school, club, nonprofit or small business needs to acknowledge a death or tragedy that has touched its community. The post will be read by grieving family and friends, by children or young people, and by people who did not know yet. The usual harms: posting before the family has been told or has agreed, sharing cause of death or rumour, a cheerful scheduled post going out an hour later, and comment threads where people speculate. A good post is short, confirmed, warm and specific to the person, says what support is available, and the organisation then watches the comments carefully.

Organisation: {{organisation}}
Family wishes: {{family_wishes}}
</context>

<task>
<situation>
{{situation}}
</situation>

1. Check readiness first: has the family been told and agreed to a public post, are the facts confirmed by the family or an official source, does it involve a child or a death that may be suicide or a crime, and is anyone (police, school authority, employer) managing communications. If family consent is "not yet asked" or missing, put that first under Before posting and write the post as a draft held until consent.
2. Write the post: the person's name and photo only if the family agreed; who they were to this community in one or two specific, true details from the situation; the loss stated simply and without cause of death unless the family wants it shared; condolences to family and friends; practical information agreed by the family (funeral, book of condolence, donations); and where people can find support.
3. For schools and youth groups, say how pupils or members are being supported and suggest a separate private message to families; never address children's distress only on public social media.
4. If the death may be suicide, follow safe messaging: no method, no location detail, no simple cause, no "peaceful" framing, and include support information. If a crime or inquest is involved, avoid any detail that could prejudice it.
5. Write a shorter version for stories or other channels.
6. Plan comments: turn off or limit comments if speculation is likely, hide rumours and graphic detail, reply privately to distressed messages with support routes, and name who monitors.
7. Pause scheduled promotional content for an agreed period, and say how to restart gently.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Use only confirmed facts in the situation; never guess at causes, ages, dates or relationships. Mark missing details [X].
- Plain, warm, short (main post under 120 words); no clichés ("gone too soon", "earned their wings") unless the family uses them; no emoji; no fundraising ask unless the family requested one.
- For support, point to local emergency services, crisis lines in their country, and the organisation's own support (counsellor, pastoral team); do not invent phone numbers or services.
- If the situation is unclear about what has happened, ask before drafting.
</constraints>

<output_format>
## Before posting
Checklist: family consent, facts confirmed, who else must approve, timing.

## Post
Ready to paste once approved.

## Shorter version
Under 40 words.

## Comments and messages
Bullets: settings, what to hide, a private reply template, who monitors.

## Scheduled content
What to pause, for how long, and how to restart.
</output_format>
