---
schema: 1
id: plan-homeschool-year
kind: prompt
title: Plan a homeschool year
description: Plans a homeschool year for a child's age and interests across core subjects, with a weekly rhythm, resources, projects, checkpoints and record keeping. For homeschooling parents.
category: course-design
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [homeschooling, home-education, curriculum-planning, portfolio, record-keeping]
pairs_with:
  prompts: [build-self-study-curriculum, design-unit-plan]
args:
  - name: child_profile
    description: Age and grade equivalent, where the child is in reading, writing and maths, interests, how they learn best, any learning differences already identified, and the family's goals for the year. First name or none.
    type: text
    required: true
  - name: jurisdiction_requirements
    description: Optional legal requirements where you live, as you understand them from official sources, e.g. "notify the district by 15 Aug; 180 days; required subjects...; annual assessment or portfolio review".
    type: text
  - name: hours_per_day
    description: Optional time for structured learning per day, e.g. "3 hours", "mornings only".
    type: string
  - name: approach
    description: Optional approach or mix, e.g. "eclectic", "classical", "Charlotte Mason", "project-based", "relaxed, interest-led".
    type: string
output_contract:
  format: markdown
  sections: [Goals for the year, Requirements check, Subjects and scope, Weekly rhythm, Year at a glance, Resources, Projects, Checkpoints, Record keeping]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Homeschooling parents often start with either a boxed curriculum followed page by page or no plan at all, and both tend to stall by midwinter. A year plan that holds up starts from the child (where they actually are in each subject, what absorbs them), sets a few clear goals, gives each day a sustainable rhythm, leaves room for projects and outings, checks progress at regular points so the plan can change, and keeps the records the law requires. Legal requirements vary enormously between countries, states and provinces, so they have to come from official sources.
</context>

<task>
Plan a homeschool year for this child{{#approach}} using a {{approach}} approach{{/approach}}{{#hours_per_day}}, with about {{hours_per_day}} of structured learning per day{{/hours_per_day}}.

<child>
{{child_profile}}
</child>
{{#jurisdiction_requirements}}
<requirements>
{{jurisdiction_requirements}}
</requirements>
{{/jurisdiction_requirements}}

1. **Goals for the year:** 4 to 6 goals across academics, skills and the child's wellbeing, specific enough to check in June ("reads chapter books independently for 20 minutes", not "improve reading").
2. **Requirements check:** if requirements were given, show how the plan meets each one (subjects, days or hours, assessment, notifications) with the dates to diary. If none were given, list the questions to answer from the official education authority where they live (registration or notification, required subjects, days or hours, assessment or evaluation, records to keep) and do not state any jurisdiction's law yourself.
3. **Subjects and scope:** for literacy, mathematics, science, history and geography (or social studies), plus arts, music, physical activity and any languages, give the year's focus pitched at the child's actual level in each subject, which may differ from their age grade.
4. **Weekly rhythm:** a realistic week, with daily core work (literacy and maths most days, short and focused for younger children), other subjects in blocks across the week, time for independent reading, play or free exploration, outings, and social time with other children (co-ops, clubs, sport). Fit the time per day{{#hours_per_day}} to {{hours_per_day}}{{/hours_per_day}}.
5. **Year at a glance:** terms or blocks of about 6 weeks with a break between them, around 36 weeks in total unless requirements say otherwise, with the main topics per block.
6. **Resources:** the type of resource for each subject (a structured maths programme, a phonics or spelling sequence, living books, library, documentaries, kits, local places). Mention specific well-known curricula only as examples to evaluate, and favour free and library options.
7. **Projects:** 3 or 4 longer projects built on the child's interests that integrate several subjects, each with a product to share.
8. **Checkpoints:** every 6 weeks or so, how to check progress (samples of work compared over time, a short informal assessment, a conversation with the child) and how to adjust the plan.
9. **Record keeping:** a simple system: attendance or hours log if required, a portfolio of dated work samples per subject, a reading list, and notes from checkpoints.
</task>

<constraints>
- Never assert what the law requires in any place; use only the requirements given and point to the official education authority to confirm.
- Pitch work to the child's actual level; if the profile suggests a possible learning difficulty that has not been assessed (such as persistent trouble decoding words at 8), suggest discussing it with a doctor or an educational psychologist, without diagnosing.
- Keep the plan sustainable for one parent; mark the essential core versus the optional extras.
- If the profile is too thin (no age or levels), ask for the missing details before planning.
- No affiliate links or promotional language.
</constraints>

<output_format>
Use the section headings from the output contract. Weekly rhythm as a table: Day | Morning | Afternoon. Year at a glance as a table: Block | Weeks | Literacy | Maths | Science | History and geography | Project. Record keeping as a checklist.
</output_format>
