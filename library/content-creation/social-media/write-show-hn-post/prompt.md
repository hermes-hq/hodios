---
schema: 1
id: write-show-hn-post
kind: prompt
title: Write a Show HN post
description: Checks whether a project qualifies for Show HN, then prepares the title, link, maker-comment notes and answers to likely objections within Hacker News rules. Use before posting to HN.
category: social-media
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer, founder, software-engineer]
requires: [none]
inputs: [text, url]
output: [post, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, hacker-news, show-hn, launch-post, maker-comment]
pairs_with:
  prompts: [plan-open-source-launch, respond-to-project-criticism, audit-readme-conversion]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it is, the link people will try (repo, demo, download), the license, how long the try-it path takes, what is new if it was posted before, and the backstory of why you built it.
    type: text
    required: true
  - name: known_weaknesses
    description: Limits, missing platforms, rough edges or likely criticisms you already know about.
    type: text
  - name: prior_posts
    description: Earlier HN submissions of this project, with dates and how they did.
    type: text
output_contract:
  format: markdown
  sections: [Eligibility, Title options, Link, Maker comment notes, Likely questions, Before you post, In the thread]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Show HN is for something you made that people can try: the rules exclude blog posts, sign-up pages, newsletters, lists and other reading material, say that new features and upgrades are generally not substantive enough, and ask that people can try it easily, ideally without signing up or giving an email. The title begins with "Show HN:" and the maker should be in the thread answering questions. Hacker News bans soliciting upvotes, comments or submissions; its software detects voting rings, and booster comments from friends get flamed. Since 2026 Show HN has been restricted for accounts without much HN history, and the moderators ask makers to write their post text by hand, without an LLM generating or polishing it. A new version is worth a new Show HN only when it is significantly different, about once or twice a year at most. Moderators can put overlooked posts into a second-chance pool. Studies of launches find an HN post raises stars and forks for days, with spikes fading within about two days; analyses of Show HN timing found weekends and roughly 11:00 to 16:00 UTC did slightly better. The audience is technical, sceptical and direct: they reward specifics, honest trade-offs and a maker who engages, and they punish hype, evasive answers and defensiveness.
</context>

<task>
<project>
{{project}}
</project>
{{#known_weaknesses}}
Known weaknesses:
{{known_weaknesses}}
{{/known_weaknesses}}
{{#prior_posts}}
Earlier submissions:
{{prior_posts}}
{{/prior_posts}}

If you cannot tell what the project is or what link people will try, ask and stop.

1. **Eligibility.** Check each rule and give a verdict: can people try it now; is the try path free of sign-up or email walls; is it the maker posting from an account with real HN history (comments, not only submissions); is it a thing and not reading material; if posted before, is this version significantly different and has enough time passed. If it fails, say exactly what to change first, and stop after the fix list.
2. **Title options.** Five titles in the form "Show HN: Name – what it is, in plain words", each under 80 characters, no superlatives, no exclamation marks, no clickbait, no "revolutionary". Recommend one.
3. **Link.** Choose the URL that gets people trying fastest (usually the repo or a no-login demo, not a marketing page) and say why.
4. **Maker comment notes.** HN asks for text written by hand, so do not write finished prose for the maker to paste. Give a skeleton of 150 to 300 words' worth of points in order: who they are and why they built it, what it does in concrete terms, how it works technically (the interesting part for this audience), what is different from the obvious alternatives, honest limitations and what is not done, the license and whether it is free, and the specific feedback they want. Under each point, list the facts from the input to use and one question that helps the maker say it in their own words. Flag marketing words to avoid.
5. **Likely questions.** The eight hardest questions this audience will ask (comparisons to named alternatives, license, privacy and telemetry, business model, platform support, performance claims, why not use X, security), each with the facts from the input that answer it, as bullet notes the maker turns into their own reply. Mark answers that need facts you do not have as [NEED FACT].
6. **Before you post.** A checklist: try path tested from a clean machine and a logged-out browser, the README answers the top questions, the site will survive a traffic spike, the maker wrote the text themselves, and they have three free hours to stay in the thread. Suggest a slot with the timing evidence above as a weak tie-breaker, not a rule.
7. **In the thread.** How to respond: thank people for criticism, concede valid points, correct factual errors once without arguing, never ask for upvotes, never use other accounts, and disclose affiliation in any reply about competitors.
</task>

<constraints>
- Never suggest asking anyone to upvote, sharing the direct HN link with a request to vote, coordinated timing with friends, or posting from multiple accounts.
- Do not claim the project is "open source" if its license is not OSI-approved; say "source-available" or name the license.
- Use only facts from the input; no invented numbers, users or benchmarks.
- Tell the user to check the current Show HN rules and guidelines, since details change.
</constraints>

<output_format>
## Eligibility
| Rule | Pass / fail | Note |
## Title options
## Link
## Maker comment notes
## Likely questions
| Question | Facts for the answer |
## Before you post
- [ ] items
## In the thread
</output_format>
