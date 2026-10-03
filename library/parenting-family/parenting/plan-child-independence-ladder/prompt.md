---
schema: 1
id: plan-child-independence-ladder
kind: prompt
title: Plan a child's independence ladder
description: Builds a step-by-step ladder of freedoms for a child or teen, such as walking to school, staying home alone or going out with friends, with readiness checks and a safety agreement.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [independence, free-range, home-alone, walking-to-school, safety-agreement, teenagers, child-development]
pairs_with:
  prompts: [teach-child-life-skill, write-family-agreement-with-teen, set-screen-time-plan, talk-to-teen-about-online-safety]
  personas: [parenting-coach]
args:
  - name: age
    description: The child's age in years.
    type: number
    required: true
  - name: area
    description: Which kind of freedom to build a ladder for.
    type: enum
    enum: [getting-around, home-alone, going-out, money, phone]
    default: getting-around
  - name: local_context
    description: The neighbourhood and practicalities, for example "quiet suburb, school 800 m away with one busy crossing, buses every 15 minutes, we both work until 6". Optional.
    type: text
  - name: child_notes
    description: What the child already does and their temperament, for example "walks to a friend's two doors down, a bit dreamy, very sensible with money, anxious in crowds". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where they are now, Readiness signs, The ladder, Safety agreement, Check-ins, If something goes wrong, Rules to check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents give children freedom in small, deliberate steps. Readiness depends on skills and judgement more than on a birthday, so each rung of the ladder names the skills to show first, the freedom itself, the agreement that goes with it, and when to review. Children who practise independence gradually become more competent and less anxious; children who get no practice and then sudden freedom are less safe. The aim is a child who knows what to do when something goes wrong, and knows they can always call home without getting in trouble.

Child's age: {{age}}
Area: {{area}}
{{#local_context}}Local context: {{local_context}}{{/local_context}}
{{#child_notes}}About the child: {{child_notes}}{{/child_notes}}
</context>

<task>
1. Where they are now: from the notes, say which rung the child is probably on for {{area}}. If there are no notes, ask two or three quick questions at the end and assume the first rung.
2. Readiness signs: skills and behaviours to see before moving up, specific to {{area}}, such as crossing roads safely without reminders, knowing the address and a parent's number by heart, following a plan and calling if it changes, handling a small problem calmly, making change, or keeping a phone charged.
3. The ladder: six to ten rungs from what the child does now to a sensible goal for the next year or two, each a small change in distance, time, company or responsibility. Use these anchors for {{area}}:
   - getting-around: walking with an adult who hangs back, then a friend, then alone on a practised route, then new routes and public transport;
   - home-alone: ten minutes while a parent pops out, then an hour in daylight, then after school, then evenings, then caring for a younger sibling (only when local rules and maturity allow);
   - going-out: a known place with a known friend, then town centre in daylight with check-in times, then evenings with a pickup plan;
   - money: pocket money and a jar, then a debit card or app with parental view, then a budget for clothes or travel;
   - phone: a basic phone for calls, then messaging with known contacts, then apps one at a time with agreed settings.
4. Safety agreement: a short, friendly agreement in the child's words for the current and next rung: where, when, with whom, how to check in, what to do if lost, scared or approached, and the "call me any time, no trouble" promise.
5. Check-ins: how to debrief after each new freedom (what went well, anything weird, what would you do if), and how long to stay on a rung.
6. If something goes wrong: how to respond so the child keeps telling you things: thank them for calling, solve the problem first, and if a step back is needed, frame it as more practice rather than punishment.
7. Rules to check locally: some places set or recommend a minimum age for leaving children home alone or babysitting, travelling alone on public transport, or holding a bank account; give these as "check your local rules" items with where to look (local government, police or child-safety guidance, the transport operator, the bank). Do not state an age as law.
</task>

<constraints>
- Base every rung on skills and the child's notes, not only on age; if the child seems far behind or ahead of typical, say so gently.
- Never suggest a freedom that would leave a young child unsupervised in a way that is unsafe or likely unlawful; when unsure, put the rung later and say why.
- Keep safety advice concrete and calm, without frightening the child about strangers; most help comes from trusted adults and shop staff.
- For the phone area, keep to independence and agreements and point to set-screen-time-plan or talk-to-teen-about-online-safety for detailed controls.
- Before answering, check that every rung has a readiness sign and a review point.
</constraints>

<output_format>
## Where they are now
## Readiness signs
Checklist.
## The ladder
Table: Rung | Freedom | Show these skills first | Agreement | Review after.
## Safety agreement
Short, in the child's words, ready to print.
## Check-ins
## If something goes wrong
## Rules to check locally
</output_format>
