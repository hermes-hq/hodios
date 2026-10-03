---
schema: 1
id: plan-media-literacy-lesson
kind: prompt
title: Plan a media literacy lesson
description: Plans a lesson on evaluating online sources, AI-generated content, digital footprints or advertising, with realistic invented examples and a practical checklist students keep.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [media-literacy, digital-citizenship, lateral-reading, misinformation, ai-literacy, online-safety]
pairs_with:
  prompts: [write-class-ai-policy, teach-study-skills-lesson, generate-discussion-questions]
args:
  - name: focus
    description: What the lesson teaches. source-evaluation covers judging websites and posts; ai-content covers AI-generated text, images and audio; digital-footprint covers privacy and permanence; advertising covers ads, sponsorships and influencers.
    type: enum
    enum: [source-evaluation, ai-content, digital-footprint, advertising]
    required: true
  - name: grade_level
    description: Grade, year or age, e.g. "Grade 4", "Year 8", "Grade 11".
    type: string
    required: true
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Objective, Hook, Teach and model, Practice examples, Discussion, Student checklist, Exit task, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Media literacy lessons fail when they teach checklists of surface features (does it look professional, is there an "About" page, does the URL end in .org) that misleading sites easily fake. Professional fact-checkers instead read laterally: they leave the page early and check what other sources say about the source and the claim. Useful habits are short and portable, for example SIFT (Stop; Investigate the source; Find better coverage; Trace claims to the original). For AI-generated content, no tool or visual tell reliably detects it, so students should learn to check provenance, look for the original source and corroboration, and treat a convincing image, voice or quote as unverified until traced. Digital footprint and advertising lessons work best with concrete scenarios students recognise, at the right age, without scare tactics.
</context>

<task>
Plan a {{minutes}}-minute lesson for **{{grade_level}}** with the focus **{{focus}}**.

1. **Objective:** one objective and 2 or 3 "I can…" statements that name a habit students will use, not just knowledge.
2. **Hook** (about 5 minutes): a short, realistic invented example (a post, headline, image description, ad or profile) that is tempting to believe or share, and a quick poll on whether students would trust it.
3. **Teach and model:** the core habit for the focus, kept to 3 to 5 steps students can remember. Model it with a think-aloud on the hook example, showing exactly what you would search for or check and what you would conclude.
   - source-evaluation: lateral reading and SIFT, why surface features mislead.
   - ai-content: how generated text, images and audio can be convincing and wrong, why detectors and visual tells are unreliable, how to trace provenance and find corroboration, and when it is fine to use AI with disclosure.
   - digital-footprint: what is collected and shared, permanence and screenshots, privacy settings, thinking before posting about others.
   - advertising: spotting ads, sponsored posts and influencer deals, disclosure labels, persuasive techniques, and what the advertiser wants.
4. **Practice examples:** 4 to 6 invented examples at varied difficulty for pairs to evaluate with the habit, each with the "answer" and the reasoning a teacher wants to hear. Include at least one example that is actually trustworthy, so students do not learn blanket cynicism.
5. **Discussion:** 3 or 4 questions that connect the habit to students' own online lives, without requiring them to share personal accounts.
6. **Student checklist:** a short, memorable card students keep, in language for {{grade_level}}.
7. **Exit task:** a new example to evaluate in writing, with a short success rubric.
8. Timings add up to {{minutes}} minutes.
</task>

<constraints>
- All examples are invented and labelled as invented in the teacher notes. Do not use real people, real brands' fake claims, or real misinformation that could spread if copied out of context. Use fictional names and organisations.
- Do not invent real-world facts, statistics or URLs to "check against". When students would search, describe what they would look for.
- Match the content to {{grade_level}}: younger students focus on asking a trusted adult and simple checks; older students on lateral reading and evaluating evidence.
- No scare stories or shaming. Present safe, practical habits.
- If students under the minimum age for common social platforms are involved, frame examples around games, video sites and messaging used at that age, and mention age limits neutrally.
</constraints>

<output_format>
## Objective
Objective and "I can…" statements.
## Hook
Time, then the example and the poll.
## Teach and model
Time, the habit steps, and the think-aloud.
## Practice examples
Time, then numbered examples, each with the expected verdict and reasoning.
## Discussion
Questions.
## Student checklist
A short checklist formatted to print.
## Exit task
The example and success rubric.
## Teacher notes
Which examples are invented, sensitivities, and how to extend the lesson.
</output_format>
