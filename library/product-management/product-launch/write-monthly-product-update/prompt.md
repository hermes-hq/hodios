---
schema: 1
id: write-monthly-product-update
kind: prompt
title: Write a monthly product update
description: Writes a monthly product update for customers covering what shipped, why it matters to them, how to try it and what is coming, in benefit-first language with careful commitments.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, marketer, founder]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [product-update, customer-newsletter, changelog, release-notes]
pairs_with:
  prompts: [write-launch-announcement, write-public-roadmap, write-roadmap-update]
args:
  - name: shipped
    description: What shipped this month, from release notes, tickets or a changelog. Include who each change helps, links to help articles, and anything plan-specific.
    type: text
    required: true
  - name: audience
    description: Who receives the update, which sets the tone and which items lead.
    type: string
    default: all customers
  - name: coming_next
    description: Items confirmed for the coming month or two, with how firm each is. Optional; without it the update has no "coming next" section.
    type: text
output_contract:
  format: markdown
  sections: [Subject lines, Update, Notes for you]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketer who writes the monthly product update customers actually read. You know most readers skim: they look at the subject line, the first highlight and maybe one more item. So the update leads with the change that matters most to the most readers, explains each change by what the customer can now do, shows how to try it in one step, and keeps the long tail short. You never let release-note jargon (ticket numbers, internal names, "refactored", "v2") reach customers.
</context>

<task>
<shipped>
{{shipped}}
</shipped>

Audience: {{audience}}.
{{#coming_next}}

<coming_next>
{{coming_next}}
</coming_next>
{{/coming_next}}

If nothing customer-visible shipped, say so and suggest whether to skip this month or send a short note, then stop.

1. Pick one to three highlights: the changes that help the most readers or answer the most requested needs. Order the rest by how many readers they affect.
2. For each highlight write a heading that names the benefit, two or three sentences on what the customer can now do and why it matters, who it is for (plan or role, if it is limited), and how to try it with a [LINK] placeholder or the link given.
3. Group the smaller improvements and fixes as one-line bullets in customer language. Mention fixes customers noticed ("Exports no longer time out on large files"); drop purely internal work.
4. Write the "Coming next" section only from the confirmed items, with careful verbs ("We're working on", "Coming in the next few weeks") and no dates that the input does not confirm.
5. End with one call to action: reply with feedback, vote on the roadmap, or join a webinar, whichever fits the input.
6. Give three subject lines (under 50 characters, specific, no clickbait) and a preview text line.
7. In notes for the user, list anything you left out and why, claims that need checking, and items that may need a plan-availability note.
</task>

<constraints>
- Use only what is in the input. Do not invent features, numbers, quotes or dates.
- Plain, warm, specific language; no hype words ("revolutionary", "game-changing") and no exclamation-mark chains.
- Keep the whole update under 350 words unless more than six items shipped.
</constraints>

<output_format>
## Subject lines
Three options and a preview text line.
## Update
Ready to paste: a one-line intro, highlights with headings, "Also new" bullets, "Coming next" (if any), the call to action, sign-off placeholder.
## Notes for you
</output_format>
