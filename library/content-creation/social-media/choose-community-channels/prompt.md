---
schema: 1
id: choose-community-channels
kind: prompt
title: Choose community channels for an open-source project
description: Decides where an open-source project's community should live (GitHub Discussions, a forum, Discord, Matrix or nothing yet) by searchability and moderation load, then plans setup and routing.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, community, github-discussions, discord, matrix, code-of-conduct]
pairs_with:
  prompts: [plan-online-community-launch, write-community-guidelines, respond-to-project-criticism]
  personas: [community-manager, open-source-maintainer]
args:
  - name: project
    description: What the project is, who uses it, current support volume and where questions arrive today, the maintainers' time and time zones, and any channel you already run.
    type: text
    required: true
  - name: goals
    description: What the community is for.
    type: string
    default: users helping each other, fewer repeated questions, and a path to contributing
output_contract:
  format: markdown
  sections: [Recommendation, Options compared, Routing, Setup checklist, Health signals]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Where a community lives decides whether answers help the next person. Chat (Discord, Slack, Matrix) is fast and social but poorly searchable from the web and hard to export; Discord is a closed platform, and projects have moved support out of it for that reason. GitHub Discussions keeps support next to the code with marked answers and issue conversion, but some projects found it ranks poorly in web search and republished good answers on their own docs. Forums such as Discourse are searchable and asynchronous, with trust levels for moderation, and some large projects moved their core discussion there. Matrix is open and federated and can bridge to other chats, with harder onboarding for casual users. Every channel costs moderation time, and a dead channel is worse than none. A code of conduct with a named enforcement contact is the baseline; the Contributor Covenant is the most widely adopted. Studies of toxicity in open source find it often comes from entitled, demanding users, which moderation plans should expect.
</context>

<task>
<project>
{{project}}
</project>
Goals: {{goals}}.

If you cannot tell the support volume or the maintainers' time, ask and stop.

1. **Recommendation.** Pick the smallest setup that meets {{goals}} with the available time: often one asynchronous, searchable place for questions and one optional place for chat, or only GitHub issues and Discussions for a small project. Say what you would add later and at what signal (for example, more than a set number of questions a week, or volunteers ready to moderate).
2. **Options compared.** Compare GitHub Discussions, a forum, Discord, Matrix, Slack and "issues only" for this project on searchability, async friendliness, moderation load, onboarding for its users, data ownership and export, cost, and accessibility.
3. **Routing.** Where each kind of message goes: bug reports, feature ideas, usage questions, security reports (private, never public), show-and-tell, and chat. Write the issue template config text that sends questions away from the tracker and the one-paragraph "Getting help" section for the README.
4. **Setup checklist.** Categories or channels (few), the code of conduct and enforcement contact, moderator roles and response expectations the team can keep, saved replies, how good answers get promoted to docs, and the first two weeks of seeding (questions you answer publicly, a pinned "introduce yourself" or "show what you built" thread).
5. **Health signals** to review monthly: share of questions answered and by whom, time to first answer, repeated questions, members who start answering others, moderation incidents. Name the signal that would make you close or merge a channel.
</task>

<constraints>
- Do not recommend more channels than the stated time can moderate.
- Security reports always go to a private channel.
- Use only facts from the input; label assumptions.
</constraints>

<output_format>
## Recommendation
## Options compared
| Channel | Searchable | Async | Moderation load | Fit for this project |
## Routing
| Message type | Goes to | How |
Plus the template config and README section.
## Setup checklist
## Health signals
</output_format>
