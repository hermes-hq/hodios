---
schema: 1
id: audit-readme-conversion
kind: prompt
title: Audit a README for conversion
description: Audits an open-source README or landing page as a funnel from first glance to first successful run, and returns ranked fixes with rewritten sections. Use before a launch.
category: docs
version: 1.0.0
status: incubating
stage: [review]
role: [maintainer, developer-advocate, software-engineer]
requires: [none]
inputs: [document, url, repo]
output: [report, rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, readme, conversion, time-to-first-success, github-repo]
pairs_with:
  prompts: [write-readme, sharpen-project-pitch, script-terminal-demo]
  personas: [developer-advocate, technical-writer]
args:
  - name: readme
    description: The README text (or landing page copy) to audit. A repo or page URL works if the assistant can fetch it.
    type: text
    required: true
  - name: repo_metadata
    description: The GitHub description, topics, website field, license, latest release, and whether there is a social preview image, Discussions, issue templates and a CONTRIBUTING file.
    type: text
  - name: goal
    description: The action that counts as a conversion.
    type: enum
    enum: [install-and-run, star-and-watch, contribute, sponsor]
    default: install-and-run
output_contract:
  format: markdown
  sections: [Verdict, Five-second test, Funnel walk-through, Ranked fixes, Rewrites, Repo page checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A README is the landing page for most open-source projects: people arrive from a link, decide in seconds whether to keep reading, and leave if they cannot get it running quickly. Studies of GitHub READMEs find that many never state the project's purpose or status, and that popular projects tend to use clear "what" and "how" sections, images and links (correlation, not proof of cause). Developers rely on documentation more than any other learning resource, and incomplete or outdated docs are the problem contributors report most often. Badges help only when they carry real signal (build status, release, license); a wall of them is noise.
</context>

<task>
<readme>
{{readme}}
</readme>
{{#repo_metadata}}
Repo metadata:
{{repo_metadata}}
{{/repo_metadata}}
Conversion goal: {{goal}}.

If the README is empty or you cannot tell what the project is, say so and ask for the README or the project facts, then stop.

1. **Five-second test.** Read only the title, the first two lines and the first image. Write what a stranger would conclude: what it is, who it is for, why it matters. Mark each as clear, vague or missing.
2. **Walk the funnel.** Go through the README as a first-time visitor heading for {{goal}}, and note every point where they would stall:
   - Promise: is there one concrete sentence with a category noun, or a slogan?
   - Proof: a screenshot, GIF or short demo of the real thing working; honest status (alpha, stable); real signals such as releases or users only if true.
   - Path: count the steps and prerequisites from landing to the first successful result. Flag missing platform notes, an install command that would fail when copied, sign-ups or API keys required before any value, and build-from-source steps placed before a binary download.
   - Next step: where to go after the first run (docs, examples, community), and how to report a problem.
   - For contribute or sponsor goals: is the ask visible, specific and honest?
3. **Rank the fixes** by expected effect on {{goal}} divided by effort. Name at most ten. For each, quote the current text, say what is wrong in one line and give the fix.
4. **Rewrite the top three sections** (usually the opener, the quick start and the demo placement), ready to paste. Keep every technical fact from the original; mark anything you cannot verify as [CHECK].
5. **Check the repo page** around the README: description, topics, website link, license detection, latest release with notes, social preview image, issue templates, CONTRIBUTING, Discussions or another help channel, and a security policy.
</task>

<constraints>
- Judge only what is in the input. Do not invent features, install commands or numbers; if a command looks wrong, flag it as [CHECK] instead of correcting it from memory.
- Do not recommend vanity badges, fake social proof, star-count banners or "trending" claims that are not true.
- Prefer cutting to adding: a shorter README that gets people running beats a longer one.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Two sentences: the biggest leak and the first fix.
## Five-second test
| Question | Answer a stranger would give | Clear / vague / missing |
## Funnel walk-through
Promise, proof, path (with step count), next step.
## Ranked fixes
| # | Current text | Problem | Fix | Effort |
## Rewrites
The three rewritten sections.
## Repo page checklist
- [ ] items, each marked present, missing or unknown.
</output_format>
