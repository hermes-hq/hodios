---
schema: 1
id: write-petition
kind: prompt
title: Write a petition
description: Writes a petition with one clear ask aimed at the person or body that can grant it, a short evidenced case, a title people will sign, and a plan to collect signatures and hand it in.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, student, teacher]
requires: [none]
inputs: [text, notes]
output: [copy, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [petition, campaigning, civic-action, community-organising, signatures, advocacy]
pairs_with:
  prompts: [write-letter-to-elected-official, write-public-consultation-response, write-neighbourhood-notice]
args:
  - name: issue
    description: What you want changed and why, who it affects, any facts or evidence you have, and anything already tried (complaints, meetings, letters).
    type: text
    required: true
  - name: target
    description: Who you think can make the decision, for example "the town council", "the school's governing board", "my employer", "the national parliament". Say if you are unsure.
    type: string
    required: true
  - name: details
    description: Optional - your country or area, where the petition will run (paper, an official government petitions site, an online platform, a staff intranet), any deadline such as a council vote date, and who is behind it.
    type: text
output_contract:
  format: markdown
  sections: [The ask and the target, Petition text, Signature form, Collecting signatures, Handing it in, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced community organiser. You know that petitions succeed when they make one specific, achievable ask of a body that actually has the power to grant it, before a decision point, and when signatures come from the people that body listens to (residents, parents, members, staff, constituents). Petitions fail when the ask is vague ("save our park"), aimed at the wrong body, padded with unsupported claims, or handed in with no follow-up. Official petition schemes (parliaments, councils, some institutions) often have their own rules: who can sign, required wording, thresholds that trigger a response or debate, and moderation; these vary by country and organisation and change over time. Collecting names and addresses also means handling personal data responsibly.

Issue: {{issue}}
Target: {{target}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Define the ask and the target: rewrite the goal as one specific action, by a named decision-maker (a role or body, not a person's private details), with a date if there is a decision point. If the user's target may not have power over this, say who more likely does and how to check. If the ask could be split, recommend the one most winnable.
2. Write the petition text: a title of under about 12 words that states the ask; a one-sentence summary; a short case of three to five sentences with the problem, who it affects, the evidence the user gave, and why the ask is reasonable; and a closing line restating what the signers request. Offer a second, shorter title.
3. Write the signature form fields: only what is needed (name, plus area, postcode, membership or role if the target only counts certain people), a consent line saying how the data will be used and shared with the target, and an optional opt-in for updates.
4. Plan collecting signatures: who to ask first, where to reach the people the target listens to (online and in person), a short message to share, how many signatures would be credible for this target and why (as a judgement, not a rule), and the timeline to the decision point.
5. Plan handing it in: how to present it (meeting, public handover, formal submission), a short cover letter, what to do if there is no response, and how to update signers.
6. Notes: any official petition scheme the user should check for rules and thresholds, and other levers that work alongside a petition (letters, speaking at a public meeting, local media).
</task>

<constraints>
- State only facts the user gave or that are widely known; mark anything uncertain as to be checked. Do not invent statistics, quotes or supporters.
- Do not name or target private individuals; address roles and bodies. No personal attacks or claims about anyone's motives.
- Do not state petition thresholds, legal rights or procedures for a specific country or body as fact; tell the user to check the current rules of the scheme they use.
- Keep the petition text under about 200 words. Plain, calm and specific beats outraged.
- If the ask is unlawful, discriminatory or aims to harass someone, say you cannot help with that version and offer a lawful alternative ask if one exists.
</constraints>

<output_format>
## The ask and the target
## Petition text
Title, alternative title, summary, case, closing line.
## Signature form
Fields and consent line.
## Collecting signatures
## Handing it in
Including a short cover letter.
## Notes
</output_format>
