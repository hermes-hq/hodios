---
schema: 1
id: plan-developer-community-posts
kind: prompt
title: Plan posts to developer communities
description: Picks the subreddits, forums and chat communities that fit an open-source project, checks each one's self-promotion rules and writes one tailored post per community. Use for a launch.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [maintainer, developer-advocate, founder]
requires: [none]
inputs: [text, url]
output: [plan, post, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, reddit, self-promotion-rules, community-launch, lobsters, discord]
pairs_with:
  prompts: [write-reddit-post, write-show-hn-post, plan-open-source-launch, respond-to-project-criticism]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it is, who it is for, license, platforms, the try-it link, and what is new if it is a release.
    type: text
    required: true
  - name: candidate_communities
    description: Communities you are considering, with each one's rules pasted if you have them, and your own history in each (member since, past contributions).
    type: text
  - name: max_communities
    description: The most communities to post in for this launch.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Community shortlist, Rules check, Posts, Schedule, Do not post]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developer communities welcome makers who participate and remove those who only drop links. Each community writes its own rules: some ban self-promotion outright, some allow it only on a set day or in a weekly thread, some require a flair, a minimum account age or karma, or a ratio of other participation to self-promotion, and some (such as Lobsters) are invite-only and expect authors to tag their own work. By 2026 many developer subreddits also ban AI-written post text, set a minimum project age (30 days or three months), require disclosed affiliation, or push project posts into a weekly thread or a set day; Reddit's own help pages give no fixed ratio, so the ratio rules that exist are per community. Reddit's site-wide rules forbid spam, vote manipulation and ban evasion, and posting the same link to many subreddits at once looks like spam to both moderators and filters. The communities that work best are the narrow ones where the project solves a problem people there actually have. A post that teaches something or tells a real build story does better than an announcement.
</context>

<task>
<project>
{{project}}
</project>
{{#candidate_communities}}
Candidate communities and rules:
{{candidate_communities}}
{{/candidate_communities}}
Post in at most {{max_communities}} communities.

If you cannot tell who the project is for, ask and stop.

1. **Shortlist.** Propose up to ten communities where this audience gathers (subreddits, Lobsters, language or framework forums, official Discord or Slack showcase channels, mailing lists), ranked by fit. For each, say who is there and why they would care. Prefer narrow, relevant communities over large general ones.
2. **Rules check.** For each shortlisted community, list what its rules say about self-promotion, required flairs, days or threads, minimum project age, account requirements (karma, age, prior participation), AI-written text and link versus text posts. Quote rules the user pasted. For rules you have not seen, write "UNVERIFIED: read the sidebar and rules page" and never guess them. Drop any community where self-promotion is banned or the user has no history and the rules require it.
3. **Posts.** For the top {{max_communities}}, write a post tailored to that community: a title in its style, a body that leads with the problem or a lesson, what the project does, honest limits, the license, the link, and a question that invites real discussion. Disclose "I built this" in the first lines. Vary the angle per community; never paste the same text twice. Where a community bans AI-written text, give the maker an outline with the facts and angle instead of finished prose, and say they must write it themselves.
4. **Schedule.** Space posts over one to two weeks, respecting any set days, with the best slot for each community's main time zones, and no more than one community per day so the maker can answer every comment.
5. **Do not post.** List communities that look tempting but would be a mistake, and why.
</task>

<constraints>
- Never suggest vote manipulation, asking friends to upvote, alternate accounts, posting as a "happy user", or cross-posting the same link to many communities at once.
- Never invent a community's rules; mark unverified rules clearly.
- Use only facts from the input; no invented users or numbers.
- If the license is not OSI-approved, do not call the project open source.
</constraints>

<output_format>
## Community shortlist
| Community | Audience | Why they would care | Fit |
## Rules check
| Community | Self-promotion rule | Flair, day or thread | Project age and account needs | AI text allowed? | Verdict |
## Posts
One section per community: title, body.
## Schedule
| Day | Community | Slot (time zone) |
## Do not post
</output_format>
