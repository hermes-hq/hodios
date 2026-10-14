---
schema: 1
id: practise-distress-tolerance-skills
kind: prompt
title: Practise distress tolerance skills
description: Teaches skills for getting through intense emotion without making things worse, such as STOP, cold water, paced breathing, distraction and self-soothing, with a personal crisis card and practice plan.
category: mental-health
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [distress-tolerance, dbt-skills, emotional-regulation, urges, coping-skills]
pairs_with:
  prompts: [build-coping-plan, make-panic-attack-plan, guide-breathing-exercise, manage-anger]
  personas: [supportive-listener]
args:
  - name: situations
    description: When emotions spike and what you usually do, for example "after arguments with my mum I send angry texts", "at night I feel overwhelmed and drink", "at work I want to walk out".
    type: text
    required: true
  - name: health
    description: Any heart condition, eating disorder, pregnancy, injury or other health issue that might make cold water or intense exercise unsuitable. Optional.
    type: text
output_contract:
  format: markdown
  sections: [When to use these skills, The skills, Your crisis card, Practice plan, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach distress tolerance skills, drawn from dialectical behaviour therapy (DBT), for moments when emotion is so intense that the person is about to do something that makes things worse (sending a message they regret, drinking, lashing out, quitting on the spot). These skills are not for solving the problem; they are for getting through the next minutes without adding damage, until the emotion falls enough to think. Core skills include STOP (stop, take a step back, observe, proceed mindfully), TIPP, the fast body-based skills that lower arousal (temperature: cold water on the face or holding something cold; intense exercise for a few minutes; paced breathing with a longer out-breath; paired muscle relaxation, tensing and releasing muscles while breathing out), distraction (the ACCEPTS set: activities, contributing, comparisons, other emotions, pushing away for now, other thoughts, sensations), self-soothing through the five senses, and listing pros and cons of acting on the urge versus riding it out. Skills work far better when practised while calm, so they are available when needed. Cold-water and intense-exercise skills are not suitable for everyone, for example with heart problems or eating disorders.

Situations: {{situations}}
{{#health}}Health: {{health}}{{/health}}
</context>

<task>
1. When to use these skills: two or three sentences: for crisis moments of high emotion and a strong urge, not as a way to avoid all feelings or to solve the underlying problem. Name the high-risk moments from {{situations}}.
2. The skills: teach five or six skills with a one-line purpose, exact steps, and when each fits their situations: STOP; one or two TIPP skills (adapted or replaced if the health details they gave suggest it may be unsafe, with "check with your doctor"); paced breathing (for example in for four, out for six, for two minutes); a distraction set matched to their life; self-soothe with one idea per sense; pros and cons of acting on the urge versus tolerating it.
3. Your crisis card: a short card to keep on their phone: their warning signs, the first skill to use, two backups, one person to contact, what not to do in that state (for example "no texts until the morning"), and the crisis number for their country.
4. Practice plan: a one-week plan to practise one or two skills a day while calm (two to five minutes), with a quick rating of how well each worked, so they know which ones to rely on.
5. When to get more help: if crises are frequent, if urges include self-harm or harming others, or if they rely on alcohol or drugs to cope, recommend a doctor or therapist; DBT skills groups exist in many places.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If the situations mention self-harm, suicidal thoughts or urges to harm someone, respond to that first with care and crisis guidance; skills are a supplement, never a replacement for urgent help.
- Flag that cold water and intense exercise are not suitable for some health conditions, and offer alternatives.
- Do not suggest substances, risky activities or anything harmful as distraction.
- Do not frame the skills as a cure or the person as the problem; intense emotion is human.
</constraints>

<output_format>
## When to use these skills
## The skills
Table: Skill | What it does | Steps | Best for.
## Your crisis card
## Practice plan
Table: Day | Skill to practise | How it went 0-10.
## When to get more help
</output_format>
