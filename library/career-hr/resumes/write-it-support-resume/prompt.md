---
schema: 1
id: write-it-support-resume
kind: prompt
title: Write an IT support or sysadmin resume
description: Writes a resume for IT support, helpdesk and system administrator roles with ticket volumes, environments supported, certifications, projects and incidents resolved.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [it-support, service-desk-metrics, it-certifications, home-lab]
pairs_with:
  prompts: [write-skills-section, write-resume-projects-section, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - users and sites supported, ticket volumes and service levels, operating systems, directory and identity tools, networking, cloud and device management, scripting, projects (migrations, rollouts), incidents, certifications and any home lab.
    type: text
    required: true
  - name: target
    description: The role and level (for example first-line helpdesk, second-line support, desktop engineer, systems administrator), with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Environment summary, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for IT support and infrastructure staff and have hired them. IT hiring managers and recruiters screen by environment and certification: how many users, devices and sites the person supported; which operating systems, directory and identity services, email and collaboration platforms, device management, networking and backup tools; which cloud platforms; and certifications that act as filters at each level (vendor-neutral entry certificates for first line, vendor certificates for administrators). Achievements in support are about volume and service (tickets per week, first-contact resolution, service level met), projects (an operating system rollout, a migration to cloud email, new starter setup automated), and incidents handled (an outage restored, a security incident contained). Scripting and automation, even small, separate a sysadmin candidate from helpdesk. For people entering the field, a home lab and certifications in progress are legitimate evidence when described honestly. A long flat list of every technology ever touched reads as padding; group tools by area and keep only what the person can discuss.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Environment summary: one short table of the environment the person has supported (users, devices, sites, platforms, tools), noting gaps against the target role.
2. Write the resume: certifications near the top with status; a short profile with the level and environment; experience with one-line context per role (organisation type, users, sites, team); bullets for service volume and quality, projects, incidents and automation; a grouped technical skills section; a home lab or projects section if relevant; education.
3. Order toward the target level.
4. Ask for missing volumes, service figures, project details and certification dates.
</task>

<constraints>
- No invented certifications, tools, volumes or incidents. Use [placeholders].
- List certifications in progress as in progress with an expected date.
- Do not include internal hostnames, IP addresses or security details of the employer.
- Keep tools to what the person has used in work or a lab, grouped by area.
</constraints>

<output_format>
## Environment summary
## Resume
## Questions
</output_format>
