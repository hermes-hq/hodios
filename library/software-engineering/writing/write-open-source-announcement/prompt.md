---
schema: 1
id: write-open-source-announcement
kind: prompt
title: Announce a new open-source project
description: Writes the launch post for a project going open source for the first time, new or released by a company, with a first-screen example, honest maturity, the maintainers' commitment and a readiness list.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, project-launch, launch-post, developer-community, open-sourcing]
pairs_with:
  prompts: [write-readme, write-contributing-guide, write-launch-social-posts, plan-developer-community-posts, write-release-announcement-kit]
args:
  - name: project
    description: The problem and what the project does, install and a real usage snippet, license, what is stable or experimental, known limits, who maintains it and how much time they give, the repository link and where people talk. Paste the README if there is one.
    type: text
    required: true
  - name: audience
    description: Who should care, in their own terms, for example "backend developers running Postgres at scale" or "people who write Python CLIs".
    type: string
    required: true
  - name: origin
    description: "new-project: built in the open from the start. company-internal-tool: a tool a company used internally and is now releasing. formerly-closed-product: a product that was closed source or commercial and is now open, fully or in part."
    type: enum
    enum: [new-project, company-internal-tool, formerly-closed-product]
    default: new-project
output_contract:
  format: markdown
  sections: [Title options, Launch post, Reusable summary, Launch readiness, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A launch post is the one long piece that introduces a project to strangers. Readers decide within the first screen whether to try it. Launch posts lose them in a few common ways. Some open with the author's journey. Some pile up adjectives instead of showing code. Some hide what is unstable until a reader runs into it, or compare unfairly with alternatives. Some never say who maintains the project or for how long, and some send readers to a repository that is not ready for visitors, with an empty README, no license file and no issue templates. A project released by a company faces harder questions: why release it now, what was removed, whether the company will keep investing, and who decides what gets merged. Release announcements for later versions and per-network social posts are separate jobs; this prompt writes the first introduction.
</context>

<task>
Write the launch post for this project, aimed at {{audience}}. Origin: {{origin}}.

<project>
{{project}}
</project>

1. Open with the problem as {{audience}} experiences it, in one or two sentences. Follow with one sentence on what the project does about it.
2. Show it working within the first screen: the install command and the shortest real snippet that shows the core value, with its output where useful. Use only commands and APIs found in the project details. If there are none, put a clearly marked placeholder and list it under Facts to confirm.
3. Explain in a short paragraph how it works or what it does differently. Compare with named alternatives only where the details support it. Keep the comparison specific and fair, and say when an alternative is the better choice.
4. State maturity honestly: what is stable, what is experimental, known limits, supported versions or platforms, and the license in plain words (for example "MIT: use it commercially, keep the notice").
5. Say who maintains the project and what they can commit to, such as response times, release rhythm or "maintained in spare time". If the details do not say, add a placeholder and list it under Facts to confirm. A launch that implies support nobody will give does lasting damage.
6. Address what the origin raises:
   - new-project: why it exists alongside what is already out there, and what feedback you most want.
   - company-internal-tool: why the company is releasing it, what was removed or changed for the public version, how internal and public development stay in sync, and who reviews outside contributions.
   - formerly-closed-product: exactly what is open and what stays proprietary, the license and whether contributions need a CLA or DCO, and what existing customers should expect. Do not call the project open source if the license in the details is not an open-source license. Say "source-available" and flag it.
7. End with how to take part: try it, report issues, good first issues or the contributing guide, and where discussion happens.
8. Write a reusable summary in two or three plain sentences. The author can reuse it in social or community posts.
9. Check launch readiness against the details: the README's first screen matches the post's example, a license file exists, contribution and conduct guidelines exist, issue templates and good-first-issue labels are set up, the discussion channel exists, and there is a security contact. Mark each item ready, missing or unknown.
10. Before answering, check every claim in the post against the project details. This covers numbers, benchmarks, compatibility, adopters and comparisons. Move anything unsupported to Facts to confirm and keep it out of the text.
</task>

<constraints>
- No hype adjectives or superlatives without evidence, and no emoji.
- Never invent benchmarks, adopters, quotes, stars, download numbers or maintainer commitments. If the author asks for them, leave them out and say why in Facts to confirm.
- The launch post should take about three to four minutes to read, roughly 600 to 900 words.
- Do not write per-network social posts or a changelog. Say in one line that they belong in separate pieces.
</constraints>

<output_format>
## Title options
Three titles: plain, problem-led and example-led. No clickbait.

## Launch post
The post in Markdown with short sections, ready to publish once the placeholders are filled.

## Reusable summary
Two or three sentences.

## Launch readiness
| Item | Status (ready, missing, unknown) | What to do |

## Facts to confirm
Claims, placeholders and requests the author must settle before publishing, or "None".
</output_format>
