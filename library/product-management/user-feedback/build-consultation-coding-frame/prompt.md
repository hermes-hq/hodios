---
schema: 1
id: build-consultation-coding-frame
kind: prompt
title: Build a consultation coding frame
description: Builds a coding frame for analysing public consultation responses, with codes per question, definitions, rules for campaign and off-topic responses, double-coding checks and a report shell.
category: user-feedback
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, product-manager, business-analyst]
subject: [public-sector, nonprofit]
requires: [none]
inputs: [text, document]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [public-consultation, coding-frame, qualitative-coding, campaign-responses, inter-coder-agreement, community-engagement]
pairs_with:
  prompts: [check-feedback-sampling-bias, design-feedback-tagging-taxonomy]
  personas: [customer-insights-analyst]
args:
  - name: consultation_questions
    description: The questions exactly as published (closed and open), plus one or two lines on the proposal being consulted on.
    type: text
    required: true
  - name: pilot_responses
    description: A pilot sample of real responses to build the frame from, ideally 30-60 across the open questions. Remove names and addresses first.
    type: text
    required: true
  - name: respondent_groups
    description: Optional. The groups you need to report separately (for example residents of the affected ward, businesses, community groups, statutory bodies) and how respondents identified themselves.
    type: text
output_contract:
  format: markdown
  sections: [Coding approach, Coding frame, Coding rules, Campaign and duplicate responses, Quality checks, Report shell, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an officer or analyst set up the analysis of a public consultation before the bulk of responses is coded. A consultation is evidence for a decision, not a vote: what matters is the range of views, the reasons behind them, new information, and who is affected, not just the count for and against. The frame you build decides what the final report can say.

Common failures: codes that only record stance, so the reasons and conditions are lost; a frame built from the officer's expectations rather than the responses, so new issues get pushed into "other"; organised campaign responses either discarded or counted as hundreds of separate views; and no consistency check, so two coders produce different numbers.
</context>

<task>
<questions>
{{consultation_questions}}
</questions>

<pilot_responses>
{{pilot_responses}}
</pilot_responses>

{{#respondent_groups}}
<respondent_groups>
{{respondent_groups}}
</respondent_groups>
{{/respondent_groups}}

1. For each open question, code stance separately from reasons: stance codes (support, support with conditions, oppose, mixed or unclear, not answered) and reason codes underneath.
2. Draft reason codes from two sources: the proposal (expected issues) and the pilot responses (what people actually raised). Mark which codes came only from responses. Aim for 10-30 reason codes per question, grouped under 3-7 themes. A response can carry several reason codes.
3. Give every code a short label, a definition, an include and an exclude rule, and one example quote from the pilot. Add standard codes for: suggestions and alternatives, factual corrections or new evidence, impacts on people with protected characteristics or on accessibility, comments on the consultation process itself, and out of scope.
4. Write coding rules: code what is said, not what you think they meant; when a response answers a different question, code it where it belongs and note it; how to handle sarcasm, very long submissions, attachments and responses in other languages.
5. Campaign handling: define a campaign response (identical or near-identical text, often from a template). Code the campaign text once, count signatories, report campaigns separately with their numbers, and code any extra personal text each respondent added.
6. Quality checks: double-code at least 10% of responses (minimum 50) with two coders, agreement above 80% per theme before full coding; review "other" when it passes 5% of responses to a question; log every new code with a date and recode earlier responses.
7. Draft the report shell: per question, the stance counts, themes in order of frequency with counts and quotes, views by respondent group, campaigns, new evidence and suggestions, and a limits note saying the respondents are self-selected and are not a representative sample of the population.
</task>

<constraints>
- Build codes only from the questions, the proposal and the pilot responses given; do not invent issues or quotes. Example quotes must be verbatim from the pilot.
- Do not recommend dropping or down-weighting responses because of their stance, tone or repetition; campaigns are reported, not discarded.
- Never present counts as a measure of public opinion or a referendum result.
- Keep personal data out of the frame and quotes; if the pilot contains names, addresses or health details, say to redact them.
- If the pilot sample has fewer than about 15 responses to an open question, draft provisional codes for it, mark the question as provisional and say how many more responses to read before fixing the frame.
- Legal duties for consultations differ by country and body; mention that the officer should check what their own rules require for showing responses were considered, without stating those rules.
</constraints>

<output_format>
## Coding approach
Five to eight bullets: units of coding, stance versus reasons, multi-coding, who codes.

## Coding frame
Per question, a table: code | theme | label | definition | include | exclude | example quote | source (proposal or responses).

## Coding rules
Numbered rules for coders.

## Campaign and duplicate responses
Definition, detection steps and how they appear in the report.

## Quality checks
Checklist with thresholds.

## Report shell
Headings and table layouts for the final report.

## Questions
Anything to confirm before full coding.
</output_format>
