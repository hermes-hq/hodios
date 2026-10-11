---
schema: 1
id: work-through-guilt
kind: prompt
title: Work through guilt
description: Helps someone sort fitting guilt from excessive guilt with a responsibility check, make amends where they are due, and let go of the part that is not theirs to carry.
category: mental-health
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, plan, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [guilt, responsibility, making-amends, self-forgiveness, cbt-skills]
pairs_with:
  prompts: [learn-from-a-regret, apologize-effectively, practice-self-compassion, process-grief]
  personas: [supportive-listener]
args:
  - name: situation
    description: What you feel guilty about, in your own words, for example "I put my dad in a care home", "I snapped at my kids this morning", "I survived the redundancy and my team didn't", "I wasn't there when my friend needed me".
    type: text
    required: true
  - name: done_so_far
    description: Anything you have already done about it, for example "apologised", "can't talk to them any more", "nothing yet". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What happened, Is the guilt fitting, Responsibility check, Making amends, Letting go of the rest, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone work through guilt. Guilt is useful when it fits: it points to a real harm the person caused and moves them to repair it. But much guilt does not fit. People feel guilty for things outside their control, for decisions that were the best available option (such as arranging care for a parent), for surviving or doing well when others did not, for setting reasonable limits, or with hindsight they did not have at the time. Excessive guilt often comes with low mood or anxiety and inflates one's own share of responsibility. Guilt also differs from shame: guilt says "I did something bad", shame says "I am bad", and shame tends to lead to hiding rather than repair. Cognitive behavioural approaches use a responsibility check (listing every factor and person that contributed and giving each a share before placing yourself), the hindsight question (what did I know then?), and the friend test. Fitting guilt is resolved by amends and changed behaviour, not by endless self-punishment; the rest can be acknowledged and set down.

Situation: {{situation}}
{{#done_so_far}}Done so far: {{done_so_far}}{{/done_so_far}}
</context>

<task>
1. What happened: restate the situation plainly and kindly in their words, separating facts (what happened, what they did or did not do) from the judgements they attach ("I'm a terrible daughter").
2. Is the guilt fitting: walk through the questions: Did I cause harm, or does it just feel that way? Did I break my own values or a reasonable standard? What did I know and what choices did I actually have at the time? Would I judge a friend this harshly? Is this guilt or shame? Give a fair, balanced view: which parts look like real responsibility and which look like excessive guilt, without dismissing either.
3. Responsibility check: a table listing every factor and person that contributed (circumstances, other people, systems, chance, their own actions), with an estimated share, filling in their own share last. Explain that this is a way to see the whole picture, not to shift blame.
4. Making amends: for the fitting part, concrete options: an apology (acknowledge, take responsibility, name the impact, say what will change, without demanding forgiveness), practical repair, or changed behaviour going forward. If direct amends are impossible or would hurt the other person, symbolic options (a letter not sent, an act in their honour, helping others). If what they have done so far shows amends were made, say the guilt has done its job.
5. Letting go of the rest: a short practice for the excessive part: a sentence they can say when the guilt returns, a self-compassion phrase, and permission to stop paying for it once amends are made.
6. When to get more help: guilt that is constant, out of proportion, mixed with worthlessness or low mood most days, or linked to trauma or bereavement is worth talking through with a doctor or therapist.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Be honest: do not tell them they did nothing wrong if they describe real harm, and do not agree they are a bad person. Separate actions from worth.
- If the situation involves a crime, ongoing harm to someone, or a legal or safeguarding duty, say so plainly and point to the right service; do not help hide harm.
- If the guilt is about something done to them (abuse, assault), say clearly that responsibility lies with the person who harmed them, and suggest specialist support.
- Do not push contact with anyone; amends must not harm the other person.
</constraints>

<output_format>
## What happened
Facts | Judgements.
## Is the guilt fitting
## Responsibility check
Table: Contributing factor or person | Estimated share | Notes.
## Making amends
## Letting go of the rest
## When to get more help
</output_format>
