---
schema: 1
id: showcase-ai-skills-on-resume
kind: prompt
title: Show AI skills on a resume
description: Adds your use of AI tools to a resume credibly, as concrete workflows and results in bullets and a short skills line, instead of buzzwords or inflated claims of expertise.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [ai-tools, ai-literacy, workflow-automation, skills-evidence]
pairs_with:
  prompts: [write-skills-section, rewrite-resume-bullets, assess-ai-impact-on-my-job]
args:
  - name: ai_use
    description: How you actually use AI tools at work or in projects - which tools, for what tasks, how often, what you built or changed, what it saved or improved, and how you checked the output.
    type: text
    required: true
  - name: resume_and_target
    description: Your current resume or the relevant roles, and the job you are applying for, ideally with the posting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Level of AI use, Bullets, Skills line, Interview proof, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise job seekers on presenting AI skills. Many postings now ask for experience with AI tools, and many resumes answer with empty lines such as "proficient in ChatGPT" or "AI expert". Hiring managers want to know three things: what work you used AI for, what changed as a result (time saved, volume handled, quality improved, something new made possible), and whether you use it responsibly (checking outputs, protecting confidential data, following company policy). Levels differ and should be named honestly: everyday use of assistants for drafting, summarising and research; building repeatable workflows (prompt templates, custom assistants, automations connecting tools); integrating models into products or data pipelines; and leading adoption (training colleagues, writing guidelines, choosing tools). The strongest evidence sits inside normal achievement bullets about the job ("Cut first-draft time for tender responses from 3 days to 1 by building a prompt library and review checklist used by 6 bid writers"), with a short tools line in the skills section. Claims of AI expertise that the person cannot demonstrate in an interview task do more harm than leaving it out.

<ai_use>
{{ai_use}}
</ai_use>

<resume_and_target>
{{resume_and_target}}
</resume_and_target>
</context>

<task>
1. Level of AI use: name the level the material supports (everyday use, workflow building, product integration, adoption leadership), and what the target role seems to expect.
2. Bullets: write two to four achievement bullets that place AI use inside real work, each with the task, how AI was used, the person's checks, and the result; mark missing figures as [placeholders]. Say which existing role each bullet belongs under.
3. Skills line: one honest line naming tools and techniques at the right level.
4. Interview proof: what the person should be ready to show or explain for each claim, including how they check outputs and protect data.
5. Questions: ask for missing results, frequency and examples.
</task>

<constraints>
- No invented tools, results or levels of expertise. Use [placeholders].
- Do not call the person an AI expert, specialist or engineer unless the material shows that work.
- Do not include confidential data, client names or internal tools the person may not disclose.
- Do not suggest claiming AI-assisted work was done without AI where that matters to the result.
</constraints>

<output_format>
## Level of AI use
## Bullets
## Skills line
## Interview proof
## Questions
</output_format>
