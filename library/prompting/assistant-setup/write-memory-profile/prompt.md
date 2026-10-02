---
schema: 1
id: write-memory-profile
kind: prompt
title: Write a memory profile for your assistant
description: Writes a concise profile of your standing preferences, context and facts for an AI assistant's memory, flags what to leave out for privacy and what goes stale, and gives a review routine.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, student, founder]
requires: [none]
inputs: [preferences, text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [ai-memory, personalization, privacy, assistant-profile, data-minimization]
pairs_with:
  prompts: [write-custom-instructions, build-project-instructions]
args:
  - name: about_me
    description: Anything you would like your assistant to know about you - work, projects, tools, how you like answers, people you mention often, recurring tasks. Rough notes are fine.
    type: text
    required: true
  - name: privacy_preferences
    description: Optional - what you never want stored (for example health, finances, family details, employer name) and whether the assistant is a work or personal account.
    type: text
output_contract:
  format: markdown
  sections: [Memory profile, Left out and why, Review routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assistant memory works best as a short list of durable, useful facts and preferences, each stated so the assistant can act on it. It works badly when it fills with stale project details, one-off requests, sensitive data the person would not want stored, or vague traits ("I'm detail-oriented") that change nothing. Memory is different from custom instructions: instructions say how the assistant should behave; memory says what is true about the person and their world. A good profile is written for an assistant to read, contains only what earns its place, and keeps sensitive information out unless the person deliberately chooses otherwise.

<about_me>
{{about_me}}
</about_me>
{{#privacy_preferences}}
<privacy_preferences>
{{privacy_preferences}}
</privacy_preferences>
{{/privacy_preferences}}
</context>

<task>
1. Sort everything in about_me into:
   - Standing facts: role, field, location at the level of country or time zone, languages, tools and systems used, long-running projects, recurring tasks.
   - Preferences: answer length, format, tone, units, spelling variant, what to always or never do.
   - People and names: recurring collaborators by first name and role only, if the user wants them remembered.
   - Short-lived details: deadlines, current drafts, one-off events. These usually do not belong in memory.
   - Sensitive information: health, finances, precise address, identity numbers, other people's private details, political or religious beliefs, sexuality, legal matters, employer secrets.
2. Write the memory profile: one fact or preference per line, in the third person ("Works as …", "Prefers …"), specific enough to change an answer ("Uses metric units and British spelling" rather than "Likes precision"). Group lines under short headings. Aim for 10 to 25 lines.
3. Apply privacy: leave out sensitive information by default, and everything the privacy preferences exclude. If something sensitive seems genuinely useful (for example a dietary restriction for recipe help), list it under "Left out and why" as an optional line the user can add deliberately, with the trade-off.
4. Flag lines likely to go stale and give each a "review by" hint.
5. Explain briefly how to add the profile: paste lines into the assistant's memory or personalisation settings, or tell the assistant "Remember that …" one line at a time, and how to check what it has stored.
</task>

<constraints>
- Use only what the user wrote. Do not infer traits, diagnoses, relationships or beliefs.
- Never include passwords, keys, account numbers, ID numbers or full addresses, even if supplied; list them under "Left out" and say why.
- For work accounts, keep out confidential client and employer details unless the user's employer permits it; say so if the input suggests a work context.
- Keep each line under about 20 words.
- Do not claim how a specific product stores or uses memory; tell the user to check their assistant's privacy settings.
</constraints>

<output_format>
## Memory profile
One fenced code block, lines grouped under headings: About me, How I like answers, Work and projects, Tools, People.
## Left out and why
A table: Item | Reason (sensitive, short-lived, too vague, excluded by you) | Optional line if you want to add it.
## Review routine
Three bullets: when to review, what to prune, how to check what the assistant has stored.
</output_format>
