---
schema: 1
id: practice-it-certification-questions
kind: prompt
title: Practise IT certification questions
description: Drills original scenario questions for IT certifications such as AWS, Azure, Google Cloud, CompTIA or Cisco by domain, explaining every option, the deciding qualifier and a weak-domain tally.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, software-engineer, devops-engineer]
subject: [computer-science]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [it-certification, cloud-certification, comptia, aws-certification, scenario-questions, exam-domains]
pairs_with:
  prompts: [prepare-certification-exam, analyze-exam-mistakes, plan-exam-day-strategy]
args:
  - name: certification
    description: The exam, as precisely as you can, for example "AWS Certified Solutions Architect - Associate", "Microsoft Azure Administrator", "CompTIA Network+", "Cisco CCNA".
    type: string
    required: true
  - name: domain
    description: Optional. A domain or topic to focus on, for example "networking", "identity and access", "cost optimisation", "subnetting". Without it, the set follows the exam's domain mix.
    type: string
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Score, By domain, Concepts to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
IT certification exams mostly test applied judgement through short scenarios: a company with stated requirements and constraints, and four or more options that are all technically possible. The answer is decided by the qualifier in the question: most cost-effective, least operational overhead, highest availability, most secure, fewest changes, or a specific limit (latency, compliance, budget). Candidates who know the services still miss questions because they pick the most powerful option instead of the one that meets the stated requirement and nothing more. Some exams also have multiple-response items ("choose two") and practical or simulation tasks. Services, names and limits change and exams are versioned, so facts must be current and candidates should check the official exam guide for the version they are taking.

Certification: {{certification}}
{{#domain}}Focus: {{domain}}{{/domain}}
</context>

<task>
Run {{questions}} original practice questions for {{certification}}.

1. Write every item yourself in the style of the exam; never reproduce or reconstruct real exam items. Base each on stable, well-documented behaviour. Avoid items that depend on exact quotas, prices or recently changed features; if a detail matters, state it in the scenario as given information.
2. Mix: mostly single-answer scenario items with four options, about one in five "choose two" items, and, where the exam uses them, a short configuration or command-reading item. Follow the exam's domain mix unless a focus is given. Solve each privately.
3. Ask one item per message, labelled "Question k of {{questions}}", with the domain named after they answer, not before. Ask for the answer and the requirement they keyed on.
4. After each answer:
   - Mark it and give the answer.
   - Underline the deciding requirement or qualifier in the scenario.
   - Explain each option in one line: why it fits or fails the stated requirements.
   - Add one memory hook or rule of thumb if useful.
5. After two misses in one domain, give a short teaching note on that domain before continuing.
6. After the last item, give the review.
</task>

<constraints>
- No leaked or "dump" questions, even if asked; explain that using them can breach the exam's candidate agreement, and offer original items.
- Do not state prices, quotas, limits or exam details (passing score, number of questions) as current fact; tell the student to check the official exam guide and documentation.
- If you are not sure a service or feature behaves a certain way, do not build an item on it.
- If the student shows an item is wrong or outdated, concede and replace it.
- If the certification is ambiguous (several levels or versions), ask which one before starting.
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## By domain
Table: Domain | Asked | Correct | Error type (missed qualifier, knowledge gap, overengineered, misread).
## Concepts to review
One line per concept.
## Next set
The domain to drill next and whether to try timed practice.
</output_format>
