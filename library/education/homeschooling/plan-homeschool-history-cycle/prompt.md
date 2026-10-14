---
schema: 1
id: plan-homeschool-history-cycle
kind: prompt
title: Plan a homeschool history cycle
description: Plans a multi-year chronological history cycle that siblings of different ages study together, with eras per year, a family spine, reading and output by age, and a timeline that grows.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [history]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [chronological-history, four-year-cycle, book-of-centuries, family-learning, classical-education]
pairs_with:
  prompts: [design-homeschool-unit-study, plan-multi-age-homeschool-week, write-narration-prompts]
args:
  - name: children
    description: "Children's ages and reading levels, and any who will need history for exams."
    type: text
    required: true
  - name: preferences
    description: "Approach, country or heritage to include, faith or values context if relevant, and time per week."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cycle shape, Year by year, Weekly routine, Work by age, Timeline, Projects and outings, The second time round]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling families teach history chronologically in a cycle, a common classical and Charlotte Mason pattern: the whole family moves through history from ancient times to the present over about three or four years, then repeats at greater depth as children grow. Siblings share the same era, which saves the parent's time and makes for family discussion, while reading and written work differ by age. Families who make it work keep one family spine (a read-aloud or narrative history), add living books, maps and primary sources for older children, keep a single timeline or book of centuries, and resist the urge to cover everything. The main weaknesses of a typical cycle are a narrow, one-region view of the world and running out of steam in the modern era, so a good plan deliberately includes several world regions in each era and protects time for recent history. Families also often want their own country's or heritage's history woven in.

Children: {{children}}
Preferences: {{preferences}}
</context>

<task>
1. Choose the cycle length (three or four years) and divide history into eras per year, with a reason for the split and where the family should start given the children's ages.
2. For each year, list the main themes and make sure several world regions appear, plus the family's own country or heritage if given.
3. Describe the family spine for each year (what kind of narrative history to look for) and the weekly routine: read-aloud, discussion, map work, timeline.
4. For each age band, give the reading level and output: narration, drawing, notebooking, short essays, primary-source work for teens.
5. Set up a timeline or book of centuries that lasts through the whole cycle.
6. Suggest one hands-on project and one outing type per term, and how history links to literature, art and geography.
7. Explain how the second time round goes deeper for each child.
</task>

<constraints>
- Do not present invented book titles as real; describe what to look for or flag any title as one to check.
- Avoid a single-region or single-perspective cycle; include multiple viewpoints and handle difficult history (war, slavery, colonisation) honestly and in an age-appropriate way.
- Keep the weekly load realistic, typically two to four short sessions.
- Respect the family's stated values while keeping historical facts accurate.
</constraints>

<output_format>
## Cycle shape
## Year by year
Table: Year | Era | Themes | Regions | Family spine.
## Weekly routine
## Work by age
Table: Age band | Reading | Output.
## Timeline
## Projects and outings
## The second time round
</output_format>
