---
schema: 1
id: audit-prompt-for-bias
kind: prompt
title: Audit a prompt for bias
description: "Audits a prompt for biased framing, stereotyped examples, proxy attributes, exclusionary assumptions and unequal treatment across groups, then suggests neutral rewrites and paired tests."
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [review, verify]
role: [ml-engineer, individual]
requires: [none]
inputs: [text]
output: [report, rewrite, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fairness, bias-audit, counterfactual-testing, responsible-ai, inclusive-language]
pairs_with:
  prompts: [red-team-prompt, build-prompt-test-set, improve-prompt, write-judge-prompt]
  styles: [{id: neutral, level: 2}]
args:
  - name: prompt
    description: The full prompt to audit, including any examples, rubrics or output categories it contains.
    type: text
    required: true
  - name: use_context
    description: "Who uses the prompt and on whom: the decisions or content it affects, the people whose data or requests pass through it, and the countries or languages involved, for example 'screens job applications for a UK retailer'."
    type: text
    required: true
  - name: groups_of_concern
    description: "Optional: groups you especially want checked, for example non-native English speakers, older applicants, disabled users or people from particular regions."
    type: text
output_contract:
  format: markdown
  sections: [Stakes, Findings, Rewritten prompt, Counterfactual tests, What a prompt fix cannot cover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prompts carry bias in ways their authors rarely see: an example set where every engineer is "he" and every nurse is "she", a rubric that rewards "polished, native-level English", an instruction to judge "professional appearance" or "culture fit", a request to consider postcode, school prestige or employment gaps, output categories that leave some people out, or a persona whose "default user" is assumed to be young, Western and non-disabled. Models amplify these cues. Where the output feeds decisions about people, such as hiring, lending, housing, grading, moderation or access to services, the harm is concrete and may also be unlawful. An audit names each problem precisely, separates real bias from attributes the task legitimately needs, fixes the wording, and sets up paired tests to check whether the fix changed behaviour.

<prompt_under_audit>
{{prompt}}
</prompt_under_audit>

<use_context>
{{use_context}}
</use_context>
{{#groups_of_concern}}
<groups_of_concern>
{{groups_of_concern}}
</groups_of_concern>
{{/groups_of_concern}}
</context>

<task>
1. If the use context is too thin to judge the stakes (who is affected, what decisions follow), ask up to two questions and stop.
2. Rate the stakes: high when the output affects people's access to jobs, money, housing, education, health, legal outcomes or safety; medium when it shapes how people are described or served; low for internal or creative use.
3. Audit the prompt for:
   - loaded or stereotyped framing and word choice;
   - default assumptions about the user or subject (gender, age, nationality, language, ability, religion, family structure, income, education);
   - examples and personas that are homogeneous or stereotyped;
   - proxy attributes that stand in for protected characteristics (names, postcode, accent or dialect, school, gaps in employment, photos, age signals);
   - subjective criteria that invite bias ("culture fit", "professional", "articulate", "well-spoken");
   - instructions that treat groups differently, or ask the model to infer protected traits;
   - output categories, forms or options that exclude people;
   - missing instructions, such as no rule to ignore irrelevant personal attributes.
4. For each finding: quote the text, explain the problem and who it affects, rate severity in light of the stakes, and give a concrete rewrite. Leave alone attributes the task genuinely needs (for example age for paediatric dosing, language when the task is language assessment) and say why they stay.
5. Produce the rewritten prompt with all fixes applied and the author's intent, structure and placeholders kept.
6. Design paired counterfactual tests: inputs that are identical except for one attribute (name, gender marker, dialect, age signal, disability mention, country), with the expected result that outputs are equivalent; include at least one pair per high-severity finding and per group of concern.
</task>

<constraints>
- Report only real issues; do not flag neutral wording to look thorough. If the prompt is sound, say so and still give the tests.
- Do not remove group-specific content that serves the group, such as accessibility support or women's health information.
- Do not claim the prompt is "bias-free" after rewriting; model behaviour must be measured.
- For high-stakes uses in employment, credit, housing, insurance or education, note in one line that local anti-discrimination and AI rules may apply and that legal or compliance review is needed; do not give legal conclusions.
- Use fictional names and data in the tests.
</constraints>

<output_format>
## Stakes
Rating and one-sentence reason.
## Findings
Table: # | Quote | Problem | Who is affected | Severity | Rewrite.
## Rewritten prompt
One fenced block.
## Counterfactual tests
Table: Pair | Input A | Input B | Attribute varied | Expected equivalence.
## What a prompt fix cannot cover
Three to five bullets: for example bias in the model or data, the need to measure outcome rates by group on real traffic, human review of decisions, and an appeal route for affected people.
</output_format>
