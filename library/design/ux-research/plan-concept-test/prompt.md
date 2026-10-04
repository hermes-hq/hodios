---
schema: 1
id: plan-concept-test
kind: prompt
title: Plan a concept test
description: Plans a concept test that checks early ideas or value propositions with target users before design, with stimulus formats, non-leading questions, a comparison method and decision criteria.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [ux-researcher, product-manager, designer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, questions, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [concept-testing, value-proposition, early-validation, stimulus-design, discussion-guide]
pairs_with:
  prompts: [write-usability-test-plan, design-diary-study, run-competitive-ux-audit]
  personas: [ux-researcher]
args:
  - name: concepts
    description: The ideas or value propositions to test, one per line or paragraph - what each offers, to whom, and how it differs from the others. Include any constraints such as price ranges or channels.
    type: text
    required: true
  - name: audience
    description: Who the target users are, for example "freelance designers who invoice clients monthly".
    type: string
    required: true
  - name: participants
    description: Number of participants for qualitative sessions. Quantitative concept surveys need far more and are covered as an option.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Decision and hypotheses, Method, Participants, Stimulus, Discussion guide, Comparison and bias controls, Analysis and decision criteria, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Concept tests check whether an idea solves a real problem for the right people before money goes into design and build. They are easy to get wrong. People are polite and say they like most ideas; they are poor at predicting what they will do or pay; a polished concept gets more praise than a rough one regardless of merit; the concept shown first anchors the rest; and "Would you use this?" produces false positives. A sound concept test anchors on the participant's current behaviour and problem first, presents concepts as neutral, comparable stimuli, rotates their order, asks for trade-offs and evidence of real intent rather than opinions, and sets decision criteria before the sessions so the results cannot be read to fit a favourite. This is not a usability test: the question is whether the idea is valuable, not whether people can use an interface.
</context>

<task>
Plan a concept test.

<concepts>
{{concepts}}
</concepts>

Audience: {{audience}}. Qualitative participants: {{participants}}.

1. **Decision and hypotheses:** state the decision the test informs (which concept to pursue, whether to pursue any, what to change) and, for each concept, the riskiest assumption as a testable hypothesis about the problem, the value or the willingness to switch.
2. **Method:** recommend moderated qualitative sessions, an unmoderated survey, or both, and explain why. Note that {{participants}} sessions can reveal reactions and reasons but cannot measure preference shares; if the decision needs numbers, add a survey design with a sample size rationale and say so.
3. **Participants:** screener criteria for {{audience}} based on behaviour (they have the problem now, how they solve it today), quotas to include people who use competing solutions and people who do nothing, and exclusions (industry insiders, friends).
4. **Stimulus:** the format for each concept (a one-paragraph concept statement with a headline, the problem, the benefit and how it works; a storyboard; a simple landing-page mock; a short video), kept at the same fidelity and length across concepts. Write the concept statements from the inputs in a neutral tone, and list what must not differ between them (price presence, imagery quality, length).
5. **Discussion guide:** timed sections:
   - warm-up on the participant's current behaviour and last real instance of the problem, before any concept is shown;
   - each concept: first reaction in their own words, what they think it does, who it is for, what it would replace, what worries them, and what would make it a must-have;
   - comparison: rank or allocate a fixed number of points across concepts and explain trade-offs;
   - intent probes based on behaviour (what they would do next, whether they would join a waitlist or pre-order, who else decides).
   Give the exact wording of each question, and list questions to avoid ("Would you use this?", "How much would you pay?" asked cold, "Do you like it?").
6. **Comparison and bias controls:** rotate concept order across participants (give the rotation table), separate the moderator from the concept owner where possible, record unprompted reactions before probes, and watch for politeness.
7. **Analysis and decision criteria:** define before fieldwork what result would mean go, iterate or stop for each concept (for example the problem confirmed by most participants with a recent instance, the concept understood without explanation, a clear switch trigger). Give a synthesis grid (participant by concept, with understanding, perceived value, objections, intent signals).
8. **Limits:** what this test cannot tell you (real adoption, pricing elasticity, long-term retention) and the next test that would.
9. Before answering, check the guide for leading or hypothetical questions and rewrite any you find.
10. If a concept is too vague to present (no clear user, problem or benefit), ask for those details and stop.
</task>

<constraints>
- Keep the concepts comparable; do not strengthen one in the stimulus.
- Do not promise statistical conclusions from qualitative sessions.
- Do not invent market data or results.
</constraints>

<output_format>
Markdown with the contract's sections in order. Concept statements in quoted blocks. The discussion guide with timings and exact question wording. The rotation as a table (Participant, Order). The synthesis grid as a table template.
</output_format>
