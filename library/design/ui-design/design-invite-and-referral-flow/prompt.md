---
schema: 1
id: design-invite-and-referral-flow
kind: prompt
title: Design an invite and referral flow
description: Designs in-product flows for inviting teammates or referring friends, with entry points, invite states, the invitee's landing and sign-up, reminders, reward display and abuse limits.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [invitations, referrals, viral-loops, team-invites, growth]
pairs_with:
  prompts: [spec-team-invitation-flow, design-referral-program, write-referral-program-copy, design-sharing-and-permissions-ui, review-design-for-dark-patterns]
  personas: [product-designer]
args:
  - name: invite_context
    description: Whether this is team invites, friend referrals or both, who can invite, roles invitees get, any reward (amount, conditions, who gets it), channels (email, link, contacts, SMS), the invitee's sign-up path, and current invite numbers or problems.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, mobile-app, both]
    default: both
output_contract:
  format: markdown
  sections: [Entry points, Invite composer, Invite states, Invitee experience, Reminders, Rewards display, Abuse limits, Errors and edge states, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Invite flows usually fail on the receiving end, not the sending end. The sender is asked to invite at a random moment, invites go out with a generic message, and the invitee lands on a sign-up page with no idea who invited them or what they are joining. Team invites expire silently, go to the wrong email domain, or create a second account for someone who already has one. Referral rewards with vague conditions create support tickets and fraud. Good design asks at moments of shared value, makes the invite personal, shows the inviter clear status, gives the invitee context and the shortest path in, and states reward conditions plainly.
</context>

<task>
<invite_context>
{{invite_context}}
</invite_context>

Design for {{platform}}. If it is unclear whether this is team invites or friend referrals, ask and stop. Other gaps become assumptions marked [confirm].

1. **Entry points.** The moments to offer inviting (creating something meant to be shared, after a success moment, empty team list, settings) and the permanent location; when not to ask.
2. **Invite composer.** Fields (emails with paste of many, role picker for teams, optional personal note), copy-link option with its security trade-off, contacts access only with a clear reason, and preview of what the invitee receives.
3. **Invite states.** Pending, accepted, expired, revoked, bounced; how the inviter sees and acts on each (resend, change role, revoke), and seat or cost impact shown before sending if invites add paid seats.
4. **Invitee experience.** Email or message content (who, what they are joining, what to do), landing page with inviter name and context, the shortest sign-up, what happens if they already have an account or use a different email, and the first screen after joining.
5. **Reminders.** How many, when, and stopping conditions; the inviter's option to nudge.
6. **Rewards display.** If rewards exist: where the user learns the terms, progress (invited, signed up, qualified), when rewards are granted and why one was not.
7. **Abuse limits.** Rate limits, self-referral and duplicate detection, domain restrictions for teams, and the messages users see when a limit applies.
8. **Errors and edge states.** Invalid email, already a member, invite to a person outside allowed domains, link used twice, expired link, workspace full.
9. **Metrics.** Invites sent per active user, acceptance rate, time to accept, invitee activation, reward fraud rate.
</task>

<constraints>
- Never send invites or messages to contacts without an explicit action per send; no auto-inviting a whole address book.
- Do not invent reward amounts or terms; use given values or placeholders marked [confirm]. Mark referral-reward legal or tax questions to confirm.
- Invitee pages must not expose the inviter's private data beyond name and what they chose to share.
{{> output/uncertainty}}
</constraints>

<output_format>
## Entry points
## Invite composer
## Invite states
| State | What the inviter sees | Actions |
## Invitee experience
Message draft, landing layout, sign-up path.
## Reminders
## Rewards display
## Abuse limits
## Errors and edge states
| Situation | Message (exact copy) | Recovery |
## Metrics
</output_format>
