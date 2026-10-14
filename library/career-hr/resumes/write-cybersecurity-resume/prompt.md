---
schema: 1
id: write-cybersecurity-resume
kind: prompt
title: Write a cybersecurity resume
description: Writes a resume for security analysts, engineers and GRC staff with certifications, tooling, incidents and controls, without exposing past employers' confidential security details.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [security-engineer, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [security-resume, soc-analyst, grc, security-certifications]
pairs_with:
  prompts: [write-skills-section, write-resume-projects-section, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - security roles and the environment (size, cloud or on-premises, sector), tools (SIEM, EDR, scanners, cloud security), incidents and investigations, controls, audits or frameworks delivered, vulnerability work, scripting, certifications, and labs or competitions.
    type: text
    required: true
  - name: target
    description: The role and track (for example SOC analyst, incident responder, security engineer, penetration tester, cloud security, GRC analyst) and level, with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Track and screening facts, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for security professionals and have hired them. Security is several tracks with different evidence. Defensive operations (SOC, incident response, threat hunting) is judged on alert and incident volume, detections written or tuned, investigations led, response times, and the tools used (SIEM, EDR, SOAR). Security engineering is judged on controls built, cloud and identity hardening, automation and reduced attack surface. Offensive roles (penetration testing, red team) on engagement types, findings and reporting, often with lab and competition results. Governance, risk and compliance (GRC) on frameworks implemented, audits passed, risk registers, policies and third-party assessments. Certifications are strong filters, from entry level to advanced, and recruiters search for them by name. Security resumes also carry a special constraint: they must not reveal past employers' vulnerabilities, internal architecture, unpatched weaknesses or incident details that are not public. The accepted approach is to describe scale, type and outcome in general terms ("contained a ransomware intrusion affecting 40 endpoints within 6 hours with no data loss") without names, systems or exploit detail.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Track and screening facts: name the track the target belongs to, the certifications and evidence it screens for, and which the material shows or lacks.
2. Write the resume: certifications near the top with status; a short profile with track, level and environment; experience with one-line context per role (sector, size, environment); bullets for incidents, detections, controls, assessments or audits with scale and outcome; a grouped tools section; labs, competitions or projects if relevant; education.
3. Rewrite any detail that exposes confidential security information into general terms, and flag it.
4. Ask for missing scale, outcomes and certification dates.
</task>

<constraints>
- No invented certifications, clearances, tools, incidents or findings. Use [placeholders].
- Never include internal hostnames, IP ranges, specific unpatched vulnerabilities, client names from engagements, or non-public incident details.
- List certifications in progress as in progress; state security clearance only if the person gives it and is allowed to.
- Describe team incidents with the person's own role clearly.
</constraints>

<output_format>
## Track and screening facts
## Resume
## Questions
</output_format>
