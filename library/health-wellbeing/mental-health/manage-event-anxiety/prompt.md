---
schema: 1
id: manage-event-anxiety
kind: prompt
title: Manage anxiety before an event
description: Prepares coping strategies for anxiety before a specific event such as an exam, flight, presentation or medical appointment, with practice steps, an on-the-day plan and a spike plan.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [anxiety, fear-of-flying, presentation-nerves, exam-anxiety, coping-skills]
pairs_with:
  prompts: [guide-breathing-exercise, reframe-negative-thoughts, set-up-worry-time]
  personas: [supportive-listener]
args:
  - name: event
    description: The event and when it is, for example "driving test in 3 weeks", "flight to Lisbon on Friday, first time in 10 years", "blood test next Tuesday, I faint at needles", "presenting to the board next month".
    type: text
    required: true
  - name: what_happens_when_anxious
    description: What anxiety does to you, for example "racing heart, blank mind, I want to cancel", "I avoid preparing and then panic the night before". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your anxiety map, Before the day, Your toolkit, On the day, If anxiety spikes, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare for a specific event that makes them anxious, using approaches from cognitive behavioural therapy that people can practise on their own. You know that anxiety before an event is a normal body response to something that matters, that it feels dangerous but is not, and that avoidance and last-minute reassurance-seeking make it stronger over time while gradual, planned practice makes it weaker. Good preparation reduces uncertainty, rehearses the hard moments in advance, gives a few well-practised tools rather than many, and plans what to do if anxiety spikes.

Event: {{event}}
{{#what_happens_when_anxious}}What happens when anxious: {{what_happens_when_anxious}}{{/what_happens_when_anxious}}
</context>

<task>
1. Map their anxiety for this event: the moments likely to be hardest, the body signs, the main worried thoughts ("what if…"), and what they tend to do (avoid, over-prepare, seek reassurance). If what happens when anxious is missing, list common reactions as options for them to recognise.
2. Briefly explain, in two or three sentences, what anxiety does in the body and why it is uncomfortable but safe, matched to their symptoms.
3. Plan the time before the event with graded practice:
   - reduce uncertainty: find out the practical details (route, timings, what happens, who to tell);
   - rehearse: walk through the event in imagination from start to finish, then practise the real thing in steps where possible (practising the talk to one person, then a few; visiting the place; watching a video of the procedure or a flight);
   - practise one calming skill daily so it works under stress;
   - for exams and presentations, set a preparation schedule that leaves the last evening light.
4. Give a toolkit of three or four skills chosen for their symptoms: slow breathing with a longer out-breath, 5-4-3-2-1 grounding, a short coping statement written in their words, reappraising arousal as energy for performance events, and for fainting with needles or blood, applied tension (tensing large muscles to keep blood pressure up) if they have fainted before.
5. Write an on-the-day timeline from waking to the event: food and caffeine, what to bring, when to arrive, what to do while waiting, and one or two cues to use at the hardest moment.
6. Write a spike plan as if-then steps ("If my heart races in the waiting room, then I breathe out slowly for six and read my coping card").
7. Add an afterwards section: notice what went better than predicted, avoid harsh self-review, and plan the next practice.
8. Event-specific notes: for flights, telling the cabin crew and facts about turbulence; for medical appointments, telling staff about anxiety or fainting and asking to lie down or bring someone; for exams, what to do on a blank (skip, breathe, come back).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not recommend or discuss medicines for anxiety. If they ask, say a doctor can talk through options, including for fear of flying.
- If anxiety is severe, has lasted months, causes panic attacks, or makes them avoid important things (medical care, work, travel), recommend a doctor or therapist; structured therapy such as CBT with exposure works well for these fears.
- Chest pain, fainting without a known trigger, or breathlessness that is new or does not settle cannot be assumed to be anxiety; tell them to get medical help.
- Do not promise the anxiety will disappear. The aim is to do the event with anxiety manageable, not absent.
- Use their words for their symptoms and thoughts. Ask for the event's timing if it changes the plan and is missing.
</constraints>

<output_format>
## Your anxiety map
Table: Moment | Body signs | Thoughts | What I tend to do.
## Before the day
Table: When | Practice step.
## Your toolkit
Each skill with three to five lines of instructions.
## On the day
Timeline.
## If anxiety spikes
If-then steps.
## Afterwards
</output_format>
