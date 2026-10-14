---
schema: 1
id: triage-course-reading-load
kind: prompt
title: Triage a week's course reading
description: Sorts a week's assigned readings across courses into read closely, skim for structure and skip for now, with a time budget and what to extract from each.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [reading-list, skimming, time-budget, seminar-reading]
pairs_with:
  prompts: [read-textbook-actively, plan-reading-week, prepare-seminar-contribution, plan-semester-workload]
  personas: [study-coach]
args:
  - name: readings
    description: Every reading assigned this week, per course, with its length in pages or minutes, whether it is required or recommended, and what it is for (seminar discussion, lecture background, essay source, examinable content) if you know.
    type: text
    required: true
  - name: hours_available
    description: Realistic hours you have for reading this week after classes, work and other deadlines.
    type: number
    required: true
  - name: upcoming_assessments
    description: Optional assessments coming up in these courses, so readings that feed them get priority.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Triage, Time budget, What to extract, If you fall further behind]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most university reading lists are longer than any student can read closely, and lecturers know it. Students who try to read everything start at the top of the list, fall behind by week three and then read nothing. Experienced students triage: they read closely what they will be asked to discuss, write about or be examined on, skim the rest for its argument (introduction, conclusion, headings, first sentences of paragraphs, figures), and set aside what is optional. Reading speed for dense academic text is often only 10 to 20 pages an hour when reading closely, so a time budget built on page counts alone fails. The output should tell the student exactly what to do with each reading and what to come away with.
</context>

<task>
Triage this week's reading into a plan that fits {{hours_available}} hours.

<readings>
{{readings}}
</readings>
{{#upcoming_assessments}}
<upcoming_assessments>
{{upcoming_assessments}}
</upcoming_assessments>
{{/upcoming_assessments}}

1. State your assumptions: the reading speeds used (for example about 15 pages an hour close reading and 40 to 60 skimming, adjusted for how dense each text looks), and anything unclear about a reading's purpose.
2. Sort every reading into one of three groups, with a one-line reason:
   - Read closely: needed for a seminar where you must contribute, a source for an assessment due soon, or examinable core content.
   - Skim for structure: background to a lecture, one of several readings making the same point, or useful later.
   - Skip for now: recommended or optional with no near use. Say when it would become worth reading.
3. Estimate the time for each reading in its group and total it. If the close-reading group alone exceeds the hours available, cut it further: split long readings into the sections that matter (named by chapter or section if the student gave them) and say plainly what is being left.
4. Lay out a time budget across the week: which reading on which day, closest-use first (tomorrow's seminar before next week's lecture).
5. For each close and skim reading, say what to extract: the author's main claim, the evidence type, two points to raise in the seminar, a definition, or a quotation for the essay. Keep it to what the reading's purpose needs.
6. Say what to do if the week goes worse than planned: the minimum viable version of each close reading.
</task>

<constraints>
- Use only the readings and purposes the student gave. Do not invent page numbers, chapter titles or what a text argues.
- Never tell the student a required reading does not matter; frame skimming and skipping as "for now" with the reason and the risk.
- If the hours available cannot cover even the close-reading group, say so and suggest asking the lecturer which readings matter most.
- Keep it short enough to act on in five minutes.
</constraints>

<output_format>
## Assumptions
## Triage
A table: Reading | Course | Group | Reason | Est. time.
## Time budget
A table: Day | Reading | Time.
## What to extract
One line per reading kept.
## If you fall further behind
</output_format>
