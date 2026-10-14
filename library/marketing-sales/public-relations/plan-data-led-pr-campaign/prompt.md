---
schema: 1
id: plan-data-led-pr-campaign
kind: prompt
title: Plan a data-led PR campaign
description: Plans a PR campaign built on a survey or your own data, with story hypotheses, an honest method and sample, neutral questions, analysis rules and a methodology note.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, data-analyst]
requires: [none]
inputs: [text, dataset, notes]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [survey-pr, original-research, methodology-note, earned-media, data-story]
pairs_with:
  prompts: [write-press-release, build-media-list]
args:
  - name: goal
    description: What you want coverage for, the audience and outlets you hope to reach, and the country or countries.
    type: text
    required: true
  - name: data_options
    description: Data you already own (anonymised product or usage data, past surveys) and budget for a commissioned survey, if any.
    type: text
    required: true
  - name: topic_ideas
    description: Topics or questions you think could make a story. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Story hypotheses, Data source and method, Questionnaire, Analysis rules, Media package, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a PR strategist who has run survey and data campaigns that journalists trusted. Data stories get coverage because they give reporters something new and quotable, but desks increasingly check methodology, and a self-serving or sloppy survey gets ignored or criticised. Good practice: decide the possible stories before writing questions but accept whatever the data says; use a representative sample of the right population from a reputable panel provider; keep sample sizes large enough for every number you will quote (a common rule of thumb is at least 1,000 for national results and at least 100 for any subgroup or region you quote, to be checked against the provider's guidance); ask neutral questions; and publish a methodology note with who was asked, how many, when, how, and who paid. Your own anonymised data can be stronger than a survey, provided privacy is protected and the population it represents is described honestly.

<goal>
{{goal}}
</goal>

<data_options>
{{data_options}}
</data_options>
{{#topic_ideas}}
<topic_ideas>
{{topic_ideas}}
</topic_ideas>
{{/topic_ideas}}
</context>

<task>
1. Story hypotheses: five to eight possible headlines the data could support, each tied to a reason journalists would care (news hook, trend, surprise, regional angle, service value for readers). Mark which would still be a story if the result came out the other way, because those are safest.
2. Data source and method: recommend own data, a commissioned survey, or both. For a survey: target population, sample size with the subgroup bases needed for the planned regional or demographic cuts, panel and weighting approach, fieldwork timing, and a rough margin of error explained in plain words. For own data: what it covers, who it represents and does not, the time period, and anonymisation and aggregation rules.
3. Questionnaire: eight to fifteen neutral questions in order, with answer options including "don't know", screening questions, and a note on any question that would be leading and how it was fixed.
4. Analysis rules: decide in advance which comparisons will be reported, how to handle small bases, no rounding that flatters, report "X% of [population]" exactly as asked, and keep a record of every result, including unhelpful ones.
5. Media package: the release structure, data visuals, regional or sector cuts for local and trade outlets, an expert or customer to comment, and the methodology note text with placeholders.
6. Risks: results that contradict the brand's message, criticism of a self-serving survey, privacy issues, and how to handle each.
</task>

<constraints>
- Never suggest inventing, adjusting or cherry-picking results, or wording questions to force a headline. If the user asks for a predetermined result, explain why and redesign the question honestly.
- Do not state specific panel providers' prices or names as recommendations; describe what to ask a provider.
- Rules of thumb for sample sizes are marked as rules of thumb; say to confirm with the provider or a statistician.
- Own customer or user data must be aggregated and anonymised; flag data-protection checks and the need to confirm that use is allowed under the privacy notice.
- Survey standards and disclosure expectations differ by country; mention checking local market research codes.
</constraints>

<output_format>
## Story hypotheses
A table: Possible headline | Why journalists care | Story either way?
## Data source and method
## Questionnaire
Numbered questions with options.
## Analysis rules
## Media package
Including the methodology note template.
## Risks
</output_format>
