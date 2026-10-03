---
schema: 1
id: respond-to-project-criticism
kind: prompt
title: Respond to public criticism of your project
description: Sorts criticism of an open-source project in an HN, Reddit, GitHub or social thread into valid, mistaken and hostile, then drafts short honest replies and fixes. Use when a thread turns critical.
category: social-media
version: 1.0.0
status: incubating
stage: [operate]
role: [maintainer, developer-advocate, founder]
requires: [none]
inputs: [text, url]
output: [message, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, criticism, hacker-news, reddit, maintainer-replies, community]
pairs_with:
  prompts: [write-show-hn-post, handle-social-media-backlash, choose-community-channels]
  personas: [open-source-maintainer]
args:
  - name: thread
    description: The critical comments (pasted, with their context), where they were posted, and how much attention the thread has.
    type: text
    required: true
  - name: facts
    description: The facts that bear on the criticism - what the project does and does not do, license, data handling, roadmap decisions already made.
    type: text
  - name: maker_voice
    description: How you usually write.
    type: string
    default: plain, first person, calm
output_contract:
  format: markdown
  sections: [Triage, Replies, Do not reply, Fixes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Launch threads on Hacker News, Reddit and GitHub attract blunt criticism: comparisons with alternatives, license and telemetry questions, "why not just use X", and occasionally hostility. Readers judge the project by how the maker responds more than by the criticism itself. Replies that concede valid points, correct facts once with evidence, and stay short build trust; long defensive replies, arguing every point, or friends and alternate accounts jumping in to defend do lasting damage, and communities treat booster comments and sock puppets as manipulation. Research on toxicity in open source finds it often comes from entitled or demanding users and from technical disagreements that turn personal; the maker cannot fix those threads, only decline to escalate them. Criticism is also free user research: repeated complaints usually point to a README, docs or product fix.
</context>

<task>
Thread and context:
<thread>
{{thread}}
</thread>
{{#facts}}
Facts:
{{facts}}
{{/facts}}
Voice: {{maker_voice}}.

1. **Triage** each critical comment into one of:
   - valid: the critic is right, fully or partly;
   - mistaken: based on a factual error or a misunderstanding the docs may cause;
   - preference: a fair difference in taste or priorities;
   - hostile: insults, bad faith or harassment.
   Note how many people raised the same point.
2. **Replies.** Draft replies only where a reply helps readers, in {{maker_voice}}, each under 100 words:
   - valid: thank them, say they are right (or what part is right), say what you will do or why you will not, and link an issue if one exists;
   - mistaken: correct the fact once, with a link to the doc or code, without implying the person is foolish, and note if the docs caused the confusion;
   - preference: acknowledge the trade-off and say who the project is and is not for;
   - comparisons: say when the other tool is the better choice, disclose that you build this one.
   Group repeated points into one reply where the platform allows.
3. **Do not reply.** List comments that should get no reply (hostile, bad faith, already answered), and when to report to moderators or apply the code of conduct instead.
4. **Fixes.** The README, docs, FAQ or product changes the criticism points to, ranked by how many people raised them.
</task>

<constraints>
- Never suggest alternate accounts, asking friends or users to defend the project, mass downvoting critics, or deleting fair criticism in your own spaces.
- Never misstate facts to win an argument; if the facts are not given, write [NEED FACT] instead of guessing.
- One reply per point; no arguing in long chains.
- The maker posts replies personally; on platforms that ban AI-written text, the drafts are notes to rewrite in their own words.
</constraints>

<output_format>
## Triage
| Comment (short quote) | Type | Raised by how many | Reply? |
## Replies
## Do not reply
## Fixes
</output_format>
