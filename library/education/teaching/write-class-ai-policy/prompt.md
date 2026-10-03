---
schema: 1
id: write-class-ai-policy
kind: prompt
title: Write a classroom AI use policy
description: Writes a course or classroom AI use policy with allowed and not allowed uses by task type, how to disclose AI help, examples and consequences, in student-friendly language.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-policy, academic-integrity, ai-literacy, generative-ai, classroom-policy, disclosure]
pairs_with:
  prompts: [design-ai-resistant-assignment, plan-media-literacy-lesson, write-parent-email]
  rules: [academic-integrity-rules]
args:
  - name: course
    description: The course or class, e.g. "Grade 10 English", "AP Computer Science", "Year 6 class".
    type: string
    required: true
  - name: grade_level
    description: Grade, year or age, used to pitch the language and to consider tool age limits.
    type: string
    required: true
  - name: stance
    description: How permissive the policy is. restrictive allows AI only where named; guided allows it for some stages with disclosure; open allows most uses with disclosure and reflection.
    type: enum
    enum: [restrictive, guided, open]
    default: guided
  - name: school_policy
    description: Optional school or district rules on AI and academic integrity that this policy must follow. Paste the relevant parts.
    type: text
output_contract:
  format: markdown
  sections: [Why this policy, Uses by task type, How to disclose AI help, Examples, Privacy and safety, If the policy is not followed, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A classroom AI policy works when students can tell, for any assignment, what help is allowed and how to show what they used. Blanket bans are hard to enforce and leave students guessing, while "use it responsibly" is too vague to follow. Clear policies sort uses by task type and stage (brainstorming, research, drafting, revising, feedback, coding, tests), explain the reason in terms of learning (the point of a draft is the thinking it makes you do), require a simple disclosure, and treat misuse as a learning and integrity issue handled fairly. AI-detection tools are unreliable and produce false positives, particularly for multilingual writers, so a policy should not rely on them as proof. Many AI tools also have minimum ages and data practices that matter in schools.
</context>

<task>
Write a **{{stance}}** AI use policy for **{{course}}** ({{grade_level}}).
{{#school_policy}}

School or district policy that this classroom policy must follow:
<school_policy>
{{school_policy}}
</school_policy>
{{/school_policy}}

1. **Why this policy:** 3 to 5 sentences to students on what the course is trying to build in them and how AI can help or get in the way of that.
2. **Uses by task type:** a table with a row for each common task in this course (for example brainstorming, finding sources, outlining, drafting, revising and editing, getting feedback, translation, coding or problem solving, studying and practice, in-class assessments and tests, homework) and a column for each of Allowed, Allowed with disclosure, and Not allowed. Set the cells according to the {{stance}} stance, and adapt rows to the course (a coding course needs rows on generating and debugging code).
3. **How to disclose AI help:** a short disclosure template students attach to work (tool used, what they asked, what they used from it, what they changed and checked themselves), and when a disclosure is required.
4. **Examples:** 5 to 7 short, concrete scenarios specific to this course, each labelled as fine, fine with disclosure, or not fine, with a one-line reason.
5. **Privacy and safety:** do not enter personal information about yourself or others; check facts and sources because AI can be confidently wrong or invent citations; age limits and parental consent for tools; use school-approved tools where the school specifies them.
6. **If the policy is not followed:** a fair, proportionate process (a conversation first, the chance to show understanding orally or redo the work, escalation in line with the school's academic integrity policy for repeated or serious cases). State that AI-detector scores alone are not treated as evidence.
7. **Teacher notes:** how to introduce the policy, adapting it per assignment with a one-line label (for example a traffic-light icon on each task), and a short note for families.
</task>

<constraints>
- Write the student-facing sections in plain language a typical {{grade_level}} student can read, using "you".
- If a school policy is given, never contradict it; where the requested stance conflicts with it, follow the school policy and flag the conflict in Teacher notes.
- Do not name or recommend specific commercial AI products unless the school policy names them.
- Do not claim that any tool can reliably detect AI-written work.
- For students below the minimum age that common AI tools set (often 13, sometimes 18 or with parental consent), make teacher-led or school-approved use the default and say so.
</constraints>

<output_format>
## Why this policy
Short paragraph to students.
## Uses by task type
Table: Task | Allowed | Allowed with disclosure | Not allowed, with the ticks or brief notes in the cells.
## How to disclose AI help
Template and when to use it.
## Examples
Numbered scenarios with verdict and reason.
## Privacy and safety
Bullets.
## If the policy is not followed
Steps.
## Teacher notes
Rollout, per-assignment labels, family note, any conflicts with school policy.
</output_format>
