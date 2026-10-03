---
schema: 1
id: write-linkedin-recommendation
kind: prompt
title: Write a LinkedIn recommendation
description: Writes a LinkedIn recommendation for a colleague, report or manager built on one specific story, the skills it shows and a length that suits the platform. Use when someone asks you for one.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager]
stack: [linkedin]
requires: [none]
inputs: [notes]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [recommendation, endorsement, personal-brand]
pairs_with:
  prompts: [write-reference-letter, optimize-linkedin-profile]
args:
  - name: person
    description: The first name (or how you address them) of the person you are recommending, and their role or the role they are aiming for.
    type: string
    required: true
  - name: relationship
    description: How you worked together and for how long, for example "I managed her for two years", "peer on the data team", "she was my manager", "client on a 6-month project".
    type: string
    required: true
  - name: story
    description: One specific moment or project where you saw them at their best - what the situation was, what they did and what changed because of it.
    type: text
    required: true
  - name: skills
    description: Optional skills or qualities you want the recommendation to highlight, ideally ones that match the roles they are going for.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Short version, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write recommendations that recruiters actually read. On a LinkedIn profile, recommendations are skimmed: the first two or three lines show before "see more", and a reader decides from those lines whether this is a real endorsement or polite filler. Filler sounds like "X is a great team player who always goes above and beyond". A real endorsement makes one specific, checkable claim, shows it with a short story, and says why it matters to a future employer.

The angle depends on the relationship:
- Manager about a report: ownership, growth, the scope they handled, and whether you would hire them again.
- Peer: collaboration, what it was like to depend on them, how they raised the team's work.
- Report about a manager: how they developed people, made decisions and shielded the team; specific and grounded, never flattering.
- Client or partner: reliability, outcome delivered, how they handled problems.

Person: {{person}}
Relationship: {{relationship}}

<story>
{{story}}
</story>
{{#skills}}
<skills_to_highlight>
{{skills}}
</skills_to_highlight>
{{/skills}}
</context>

<task>
1. From the story, identify the single strongest claim about the person (what they are unusually good at) and the evidence for it: action, scope and result. If skills to highlight were given, choose the claim that best matches them; otherwise pick the two or three skills the story actually demonstrates.
2. Write the recommendation, 80 to 180 words, in first person:
   - Opening line: the claim plus your vantage point, so it stands on its own in the preview ("I managed Priya for two years, and she is the person I trusted with our messiest launches.").
   - The story in two to four sentences: situation, what they did, what changed.
   - One or two sentences naming the skills the story shows, in words a recruiter would search for.
   - A closing endorsement that fits the relationship: "I would hire her again tomorrow" for a manager, "any team would be lucky to work with him" only if earned by the story.
3. Write a short version of 40 to 60 words for people who prefer brevity, keeping the opening line and the result.
</task>

<constraints>
- Use only facts in the story. Do not invent numbers, titles, projects or outcomes; if a number would help, write [number] and mention it under Check before posting.
- Use the person's first name, not "this person" or the full name every time.
- No confidential details: no internal revenue figures, client names or unreleased products unless they are clearly public. Flag any you find and suggest neutral wording.
- No generic praise without proof: drop "hard-working", "passionate", "rockstar", "goes above and beyond" unless the story shows it.
- Match the platform register: warm, professional, conversational; no headings or bullet points inside the recommendation.
- If the story is too vague to support any specific claim, write a draft with [placeholders] and ask two or three questions that would recover the details.
</constraints>

<output_format>
## Recommendation
Ready to paste, then "Words: N".
## Short version
## Check before posting
Bullets: placeholders to fill, any detail that might be confidential, and the skills it signals.
</output_format>
