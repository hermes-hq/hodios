---
schema: 1
id: talk-to-someone-who-is-grieving
kind: prompt
title: Talk to someone who is grieving
description: Gives words for talking in person to someone who has lost someone, at the funeral, when you next see them or weeks later, with what to say, what to avoid, practical offers and how to keep showing up.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, teacher, parent]
advice_risk: [mental-health]
requires: [none]
inputs: [text]
output: [script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [grief, bereavement, what-to-say, funeral, sympathy, showing-up]
pairs_with:
  prompts: [write-condolence-message, process-grief, support-grieving-employee, respond-supportively-to-disclosure]
  personas: [supportive-listener]
args:
  - name: situation
    description: Who died and how, if known, who the grieving person is to you, how close you are, and anything you know about how they are coping.
    type: text
    required: true
  - name: moment
    description: When you will see them.
    type: enum
    enum: [funeral-or-wake, first-time-since, back-at-work-or-school, weeks-or-months-later, anniversary-or-holiday]
    required: true
  - name: details
    description: Optional - their faith or culture and mourning customs, whether the death was sudden, a suicide, a child or a pregnancy loss, whether you have not been in touch since it happened, and what you worry about saying wrong.
    type: text
output_contract:
  format: markdown
  sections: [What to say, If they want to talk, Avoid saying, Practical offers, Keep showing up, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many people avoid a grieving person because they fear saying the wrong thing, and the avoidance hurts more than any clumsy words. In person, the most helpful things are short: say you are sorry, use the name of the person who died, share a brief memory if you have one, and let them lead on whether to talk. Silence and a hand on the arm or a hug (if welcome in the relationship and culture) are fine. Common harmful phrases are well-meant: explaining the death ("they're in a better place", "everything happens for a reason"), comparing ("I know exactly how you feel, my grandad..."), rushing them ("you'll feel better soon", "at least..."), and asking for details of how it happened. Open offers ("let me know if you need anything") rarely get taken up; specific offers do ("I'll drop dinner on Tuesday", "can I walk the dog this week?"). Grief does not end after the funeral: support often drops away after a few weeks, and anniversaries, birthdays and holidays are hard. Mourning customs and what is appropriate to say differ across faiths and cultures. Deaths by suicide, of a child, or pregnancy losses often bring extra silence and stigma, and need especially gentle, non-judgemental words.

Situation: {{situation}}
Moment: {{moment}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. What to say: two or three short openings for this moment and relationship, each under about 25 words, including the name of the person who died if given. If the user has not been in touch since the death, include a line that acknowledges the silence simply ("I didn't know what to say, and I'm so sorry").
2. If they want to talk: how to listen, two or three open questions or prompts ("What was she like?", "How are you doing today?"), and what to do if they cry or if they change the subject.
3. Avoid saying: phrases to avoid for this specific kind of loss, with a short reason each and a better alternative.
4. Practical offers: three or four specific offers that fit the situation and the user's relationship, with a line to make each one.
5. Keep showing up: what to do in the coming weeks and months, including dates worth noting (birthdays, the anniversary, holidays), and a short message for one of those days.
6. Notes: any cultural or faith customs from the details to respect, and signs that the grieving person may need more support than friends can give, with how to raise it gently.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the grieving person as well as to the user: if the details suggest the grieving person is talking about not wanting to live, help the user respond and get help.
- Do not invent memories of the person who died or details of how they died.
- Do not offer religious comfort unless the user says the grieving person shares that faith.
- Keep every line short enough to say naturally in person.
- Do not tell the user how the grieving person should feel or how long grief should last.
</constraints>

<output_format>
## What to say
## If they want to talk
## Avoid saying
A table: Avoid | Why | Instead.
## Practical offers
## Keep showing up
## Notes
</output_format>
