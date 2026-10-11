---
schema: 1
id: assess-study-applicability
kind: prompt
title: Judge whether a study applies to your setting
description: Judges whether a study's findings transfer to the user's own population, setting and practice, listing the differences that matter, those that probably do not, and what to check locally.
category: literature-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student, manager]
requires: [none]
inputs: [document, notes]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [external-validity, generalisability, transferability, evidence-based-practice]
pairs_with:
  prompts: [appraise-study-quality, identify-study-design, write-critically-appraised-topic]
  personas: [research-methodologist]
args:
  - name: study
    description: The study's methods and results, or as much as you have - who took part, where, what was done, compared with what, the outcomes and the results.
    type: text
    required: true
  - name: context
    description: Your own setting, for example "community mental health team in a rural area, mostly older clients, no psychologists on staff", or "secondary schools in a low-income country with large classes".
    type: text
    required: true
  - name: decision
    description: The decision the evidence is meant to inform, for example "whether to adopt this programme next year".
    type: text
output_contract:
  format: markdown
  sections: [Fit in brief, Differences that matter, Differences that probably do not, What to check locally, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A study can be well done and still not apply to you. Risk-of-bias tools judge whether the result is true for the people studied; applicability (external validity, transferability) asks whether it will hold for your people, in your setting, delivered your way. The differences that matter are specific: who was excluded (often the older, sicker, poorer or more complex people a service actually sees), how the intervention was delivered (expert staff, extra funding, high fidelity in a trial), what the comparator was (usual care in another country may be much better or worse than yours), how long outcomes were followed, and baseline risk, which changes the absolute benefit even when the relative effect holds. Explanatory trials run under ideal conditions transfer less well than pragmatic ones. Not every difference matters: the question is whether there is a plausible reason the mechanism or the size of the effect would change.
</context>

<task>
Judge whether this study applies to my setting.
<study>
{{study}}
</study>
<my_context>
{{context}}
</my_context>
{{#decision}}The decision: {{decision}}{{/decision}}

1. Summarise the study's population, setting, intervention or exposure as delivered, comparator, outcomes and follow-up from the text, noting exclusion criteria and how many screened people were enrolled if stated.
2. Compare each dimension with the user's context: population (age, severity, comorbidity, socioeconomic and cultural factors), setting (country, system, level of care or schooling, era), delivery (who delivered it, training, intensity, fidelity, resources), comparator (what "usual practice" meant), outcomes (whether they are the ones the user cares about, and over what time), and baseline risk.
3. For each difference, say whether there is a plausible reason it would change the direction or size of the effect, and which way.
4. Say how pragmatic or explanatory the study looks and what that means for transfer.
5. List what to check locally before relying on the result: data on the local population's baseline rates, capacity to deliver as in the study, acceptability, costs, and any local pilot or audit that would test it.
6. Give a verdict: likely applicable, applicable with adaptations (name them), or unclear or unlikely (and why), tied to the decision if given.
</task>

<constraints>
- Use only the study text and the context given. Where the study does not report something needed (exclusions, delivery details), say "not reported" and treat it as uncertainty, not as a match.
- Do not judge the study's internal validity here beyond a one-line note if a serious flaw is obvious; point to a risk-of-bias appraisal instead.
- Do not decide for the user. The verdict concerns transfer of evidence; costs, values, local guidance and professional judgement also shape the decision.
- Avoid generic caveats such as "results may not generalise"; every difference listed must be specific to this study and this context.
- If the context is too vague to compare (for example "my clinic"), ask for the three or four facts that matter most.
</constraints>

<output_format>
## Fit in brief
Two or three sentences.
## Differences that matter
Table: dimension | study | your setting | likely effect on the result.
## Differences that probably do not
Bullets with one-line reasons.
## What to check locally
Checklist.
## Verdict
One line verdict, then two or three sentences.
</output_format>
