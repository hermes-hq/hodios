---
schema: 1
id: assess-community-information-needs
kind: prompt
title: Assess community information needs
description: Plans an information needs assessment for a local newsroom or community publisher, with listening sessions, a short survey, a source map, gaps by topic and language and coverage priorities.
category: content-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [editor, writer, content-creator, researcher]
subject: [public-sector, nonprofit]
requires: [none]
inputs: [text]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [local-news, community-listening, news-deserts, coverage-planning, survey-design, underserved-communities]
pairs_with:
  prompts: [write-news-story, write-local-history-article, plan-audience-interviews]
args:
  - name: area
    description: The place you cover - town, district or region, its rough population, languages spoken, main communities and any groups you know you reach poorly.
    type: text
    required: true
  - name: current_coverage
    description: What you publish now, how often, on which channels, which topics fill most of it, and who you think reads it.
    type: text
    required: true
  - name: resources
    description: Staff and volunteer time, budget and partners available for the assessment, for example "2 reporters, 10 hours a week for 6 weeks, a library that will host sessions".
    type: string
    default: one or two people part-time for about six weeks
output_contract:
  format: markdown
  sections: [Purpose and questions, Groups to prioritise, Listening sessions, Short survey, Information source map, Gap analysis, Coverage priorities, Reporting back, Timeline]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a local newsroom, community radio, hyperlocal newsletter or community publisher plan an information needs assessment: finding out what residents need to know to live their lives and take part in local decisions, who is not getting it, and where coverage should go. Newsrooms tend to cover what is easy to reach (council meetings, police statements, events that send press releases) and the residents who already read them. Assessments fail when they only survey existing readers, ask "what news do you want?" instead of "what did you need to know recently and how did you find out?", and end in a report nobody acts on. Good assessments go to people where they are, partner with trusted local organisations, map where people actually get information (including word of mouth, faith groups, group chats and community radio), and turn findings into a few concrete coverage commitments that are reported back to the people who took part.

Resources: {{resources}}
</context>

<task>
<area>
{{area}}
</area>

<current_coverage>
{{current_coverage}}
</current_coverage>

1. Purpose and questions: three to five assessment questions (for example: what decisions residents struggled to make for lack of information in the past year; which groups are least served; which topics and languages are missing).
2. Groups to prioritise: from the area description, the groups likely underserved (by language, age, neighbourhood, disability, income, rural or newcomer status) and why, with trusted partner organisations to approach for each (types, not invented names).
3. Listening sessions: format (60 to 90 minutes, small groups of 6 to 12, in partner spaces, interpretation where needed, food and childcare or travel costs covered), a facilitator guide of 6 to 8 questions centred on recent real situations, a note-taking method, and consent and anonymity rules.
4. Short survey: 8 to 12 questions, under 5 minutes, available on paper and in the main local languages, distributed through partners and not only the publisher's own channels. Include demographic questions as optional and minimal.
5. Information source map: the sources residents use today by group (official, media, community, informal), and how reliable and accessible each is.
6. Gap analysis: a matrix of topics (for example housing, health services, schools, jobs, transport, local government, safety, immigration services, culture) against groups, marking well served, partly served and unserved.
7. Coverage priorities: three to five commitments that follow from the gaps (a beat, a language edition, a service journalism series, a distribution partnership, a format such as audio or printed sheets), each with the effort it needs.
8. Reporting back to participants within a set time, in the formats and languages they used, and an annual repeat.
9. Timeline sized to the stated resources.
</task>

<constraints>
- Never invent local facts, statistics, population figures or partner names; use placeholders like [census data on languages] and say where to find them (census, local authority data, library, community organisations).
- Treat participants' data carefully: minimal collection, anonymous quotes unless consent is given, storage and deletion plan; data rules vary by country.
- Keep the newsroom's editorial independence: partners help reach people but do not set coverage.
- If the area or current coverage is too vague to plan from, ask for them and stop.
</constraints>

<output_format>
## Purpose and questions
Numbered questions.

## Groups to prioritise
Table: group | why likely underserved | trusted partner types | access needs.

## Listening sessions
Format bullets, then the facilitator guide as numbered questions.

## Short survey
Numbered questions with answer types.

## Information source map
Table: group | sources used now | reliability | access barriers.

## Gap analysis
Matrix with topics as rows and groups as columns (to fill after fieldwork), plus any gaps already visible from the coverage description.

## Coverage priorities
Table: commitment | gap it answers | effort | first step.

## Reporting back
Bullets.

## Timeline
Week-by-week table.
</output_format>
