---
schema: 1
id: write-fundraiser-progress-posts
kind: prompt
title: Write fundraiser progress posts
description: Writes a run of fundraising campaign posts from launch to close, with honest milestone totals, consented donor thanks, what each amount does and a result post, without guilt or fake urgency.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, content-creator, individual]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [post, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [fundraising-campaign, donor-thanks, milestones, appeal-posts, transparency]
pairs_with:
  prompts: [plan-nonprofit-social-media, plan-capital-campaign]
  personas: [nonprofit-advisor]
args:
  - name: campaign
    description: What the money is for, the target, start and end dates, the donation link, what different amounts pay for (only real figures), any match funding and its terms, and who is running it.
    type: text
    required: true
  - name: current_total
    description: Amount raised so far and number of donors, if the campaign has started.
    type: string
    default: not started
  - name: days_left
    description: Days until the campaign closes. Leave at 0 if you do not know.
    type: number
    default: 0
output_contract:
  format: markdown
  sections: [Campaign arc, Posts, Thank-you rules, Result post, Gaps to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A nonprofit, school, club or community group is running a fundraiser and needs to keep posting without exhausting supporters. Campaign posts fail when they repeat "please donate" with the same picture, shame people ("only 3% of our followers have given"), inflate urgency, round totals up, or thank donors by name without asking. People give more when they see progress, know exactly what their money does, and trust the numbers. Momentum usually dips in the middle, so the middle posts need a new story, not a louder ask.

Current total: {{current_total}}
Days left: {{days_left}}
</context>

<task>
<campaign>
{{campaign}}
</campaign>

1. Lay out the arc for the time left: launch, early momentum (first donors, why it matters), the middle (a story from someone the money helps, behind the scenes, a milestone), the final push (last days, match deadline if real), close and result. If days left is 0 or unknown, use a four-week arc and say so.
2. Write each post: day, hook, caption, image idea, and the ask. Each post gives one new reason to give or share.
3. Show progress honestly: exact totals and donor counts as supplied, with [total] slots for future posts; percentage of target worked out correctly; never round up.
4. Tie amounts to outcomes only where the campaign states them ("25 pays for one family's food parcel"); otherwise describe what the overall target funds.
5. Use match funding only on its real terms (cap, deadline). Real deadlines may be stated plainly; no invented countdowns.
6. Give thank-you rules: thank donors as a group by default; name individuals or businesses only with their consent; never show amounts per person without consent.
7. Write the result post for both cases: target reached (what happens next, when supporters will see the impact) and target missed (what the money raised will still do, honestly), plus a follow-up impact post to schedule later.
</task>

<constraints>
- No guilt, shame or pressure tactics; no "if you don't give, X will suffer"; dignity for the people the money helps (no pity images, consent for their stories and photos).
- Never invent figures, beneficiaries, quotes or matched funds; mark gaps as [X].
- Point to the official donation link only; warn against sharing personal bank details in posts.
- Captions under 110 words.
- If the purpose, target or donation route is missing, ask for it and stop.
</constraints>

<output_format>
## Campaign arc
Table: day | beat | format | new reason to care.

## Posts
Numbered, matching the arc, ready to paste with [slots].

## Thank-you rules
Bullets.

## Result post
Target reached version, target missed version, and the later impact post outline.

## Gaps to fill
Checklist.
</output_format>
