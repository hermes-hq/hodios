---
schema: 1
id: plan-career-with-neurodivergence
kind: prompt
title: Plan a career around how your mind works
description: Helps an autistic, ADHD, dyslexic or otherwise neurodivergent person plan a career around their strengths, the environments that suit them, disclosure choices and adjustments to ask for.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [neurodivergence, autism, adhd, dyslexia, disclosure, workplace-adjustments, job-fit]
pairs_with:
  prompts: [request-workplace-accommodation, plan-career-path, research-company, prepare-questions-for-interviewer]
  personas: [career-coach]
args:
  - name: profile
    description: Your strengths and challenges in your own words - what you are good at, what drains you, sensory and social needs, how you focus and organise, and any diagnosis or self-identification you want to mention.
    type: text
    required: true
  - name: current_situation
    description: Where you are now - studying, job hunting, in a job that does or does not fit, returning after burnout - plus your field, experience and any limits (location, income, hours).
    type: text
  - name: disclosure_comfort
    description: How comfortable you are telling employers. open means happy to say it from the start; selective means some people, when useful; private means you want to ask for what you need without naming a condition.
    type: enum
    enum: [open, selective, private]
    default: selective
output_contract:
  format: markdown
  sections: [Your strengths at work, Environment fit, Paths to explore, Disclosure plan, Adjustments to ask for, Applying and interviewing, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Neurodivergent people are often given career advice built on stereotypes ("autistic people should code", "ADHD people should be entrepreneurs") or on fixing weaknesses. Better plans start from the person's actual profile: the strengths they can show evidence for, the conditions under which they do their best work (sensory load, structure, pace, social demands, communication style, autonomy), and the specific adjustments that remove friction. Fit often depends more on the environment, the manager and the way work is organised than on the job title. Disclosure is a personal choice: many adjustments can be requested by describing the need without naming a diagnosis, and legal protections for disability differ by country.

<profile>
{{profile}}
</profile>
{{#current_situation}}
<current_situation>
{{current_situation}}
</current_situation>
{{/current_situation}}
Disclosure comfort: {{disclosure_comfort}}
</context>

<task>
1. If the profile is too thin to plan from (for example one line with a diagnosis and nothing about what they enjoy or find hard), ask up to four short questions and stop until they answer.
2. Your strengths at work: five to eight strengths from the profile, each translated into how an employer would describe it and the kind of evidence that would show it. Use only what they said.
3. Environment fit: a checklist they can use to judge any job or employer, covering sensory environment, structure and predictability, pace and interruptions, social and meeting load, communication (written or spoken, direct or implied), autonomy and supervision, hours and flexibility, and travel. Mark each as must-have, nice-to-have or deal-breaker from their profile, and add the questions to ask an employer to check each one.
4. Paths to explore: three to six roles or kinds of work that match both their strengths and environment needs, given their situation. For each, why it fits, what might be hard, and the environment variant that suits them best (for example the same role in a small team, remote, or with clear specifications). Avoid choosing roles because of a diagnosis label.
5. Disclosure plan for "{{disclosure_comfort}}": whether, when and to whom (application form, interview, offer stage, after starting, manager only, HR only), exact words they could use at that level, and the trade-offs. For private, show how to ask for adjustments by describing the need ("I work best with written instructions after meetings") without naming a condition. Note that disability protections and the right to adjustments depend on the country and should be checked with an official source.
6. Adjustments to ask for: a table of specific, low-cost adjustments matched to their challenges (for interviews and for the job), what each solves, and how to phrase the request.
7. Applying and interviewing: tactics that fit their profile, such as asking for questions in advance or in writing, a quiet room or camera-off options, extra time for tests, choosing employers with structured interviews, preparing examples in a fixed format.
8. Next steps: three to five actions for the next month.
</task>

<constraints>
- Use the person's own language about themselves (identity-first or person-first, diagnosis or self-identification) and never question whether they are "really" neurodivergent.
- Do not diagnose, suggest a diagnosis, or give medical or treatment advice. If they ask about assessment or medication, suggest a doctor or specialist.
- No stereotypes, no "superpower" framing, and no deficit framing. Treat challenges as practical facts to design around.
- Do not state legal rights as settled fact; say what to check and that it differs by country. For a written request, suggest the request-workplace-accommodation entry or an advice service.
- If they mention burnout, exhaustion or distress that sounds serious, acknowledge it first and suggest support before career planning.
- Be specific: every recommendation should trace back to something in their profile or situation. Mark assumptions.
</constraints>

<output_format>
## Your strengths at work
Table: Strength (your words) | How employers describe it | Evidence to show.
## Environment fit
Table: Factor | Your need | Must-have / nice-to-have / deal-breaker | Question to ask the employer.
## Paths to explore
One short block per path: why it fits, what might be hard, best environment.
## Disclosure plan
## Adjustments to ask for
Table: Challenge | Adjustment | What it solves | How to ask.
## Applying and interviewing
## Next steps
Numbered.
</output_format>
