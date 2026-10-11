---
schema: 1
id: write-personal-fundraiser-page
kind: prompt
title: Write a personal fundraiser page
description: Writes a personal fundraising page for medical bills, a funeral, recovery after a disaster or a community need, with an honest story, a costed goal, privacy care and update posts.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text]
output: [copy, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [fundraiser, medical-bills, funeral-costs, crowdfunding-page, donation-appeal]
pairs_with:
  prompts: [write-donation-page-copy, write-how-we-spent-it-post]
args:
  - name: cause
    description: Who the money is for, what happened, what it will pay for with rough costs, any deadline, and your relationship to the person.
    type: text
    required: true
  - name: consent_and_privacy
    description: Whether the person (or their family) has agreed to the fundraiser, what they are happy to share (names, photos, medical details), and who will receive and manage the money.
    type: text
    required: true
  - name: audience
    description: Optional. Who will mainly see it - friends and family, a workplace, a school, a local community, a wider online audience - and the platform if chosen.
    type: text
output_contract:
  format: markdown
  sections: [Title options, Goal and breakdown, Page story, Short share messages, First update, Checks before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a personal fundraising page that people trust and share. Personal fundraisers succeed or fail on a few things. Trust: who is organising, their relationship to the beneficiary, and who receives the money must be clear; a vague "help my friend" page with no breakdown reads like a scam. Specificity: a goal built from real costs (a hospital deposit, three months of rent, travel to treatment, funeral director's quote) with a breakdown beats a round number. Story: one or two concrete moments in plain words, not a list of adjectives or melodrama; readers give to a person, not a situation. Dignity and privacy: the beneficiary should agree to the page and to what is shared; medical details, children's names and photos, and addresses need care. Momentum: most money comes from the organiser's own network in the first days, through direct personal messages more than public posts, and regular honest updates keep giving going. Donations to individuals are usually not tax-deductible, and platforms charge fees, so the page should not imply otherwise.
</context>

<task>
Cause:

<cause>
{{cause}}
</cause>

Consent and privacy:

<consent_and_privacy>
{{consent_and_privacy}}
</consent_and_privacy>

{{#audience}}
Audience and platform:

<audience>
{{audience}}
</audience>
{{/audience}}

1. If the beneficiary has not agreed, or who receives the money is unclear, say so first and draft the page only once that is settled (or write it with placeholders and a clear warning).
2. Write three title options: specific, human and under 60 characters, naming the person only if they agreed.
3. Build the goal and breakdown from the costs given, with each line and the total, plus a note on platform fees to check and what happens to any money left over or if the goal is not reached.
4. Write the page story in 250 to 400 words: who the organiser is and their relationship, what happened in one or two concrete details, what the money pays for, who receives it and how, the timeline, and a simple ask with suggested amounts and a non-money way to help (share, meals, lifts). Plain, warm, no exaggeration.
5. Write three short share messages: a personal text or DM to close friends, a social post, and a workplace or community group message.
6. Write a first update to post within a week, with a template for later updates on progress and how money has been spent.
7. List checks before publishing: consent, privacy (no address, no children's full names or images without permission, medical detail only as agreed), accuracy of every figure, who withdraws funds, and that the page does not promise tax deductibility.
</task>

<constraints>
- Use only facts given; never invent diagnoses, costs, quotes from the beneficiary or events. Put missing figures in [brackets].
- Do not exaggerate urgency or suffering to raise more; it erodes trust and can breach platform rules.
- Do not claim donations are tax-deductible or that funds go to a charity unless the user says so.
- Keep the tone dignified; avoid pity language and graphic medical detail.
</constraints>

<output_format>
## Title options
Three numbered titles.

## Goal and breakdown
Table: Cost | Amount | Source of the figure. Then the total and notes.

## Page story
The story text.

## Short share messages
Three labelled messages.

## First update
The update, then the later-update template.

## Checks before publishing
Checklist.
</output_format>
