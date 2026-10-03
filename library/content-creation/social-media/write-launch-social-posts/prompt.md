---
schema: 1
id: write-launch-social-posts
kind: prompt
title: Write launch posts for X, Bluesky, Mastodon and LinkedIn
description: Writes an open-source project's launch or release posts for X, Bluesky, Mastodon and LinkedIn, each fitted to the network's length and culture, with alt text. Use on launch day.
category: social-media
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer, developer-advocate, founder]
stack: [x-twitter, linkedin]
requires: [none]
inputs: [text, url]
output: [post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [open-source, launch-thread, bluesky, mastodon, alt-text]
pairs_with:
  prompts: [plan-open-source-launch, script-terminal-demo, write-release-announcement-kit]
args:
  - name: project
    description: What it is, who it is for, license, the link, the one thing that is new or interesting, and the media you have (GIF, screenshot, short video).
    type: text
    required: true
  - name: voice
    description: How you write, or a sample of your past posts.
    type: string
    default: plain, first person, a little dry, no hype
  - name: networks
    description: Which networks to write for.
    type: string
    default: X, Bluesky, Mastodon, LinkedIn
output_contract:
  format: markdown
  sections: [Core message, Posts, Media and alt text, Follow-up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developer audiences are spread across networks with different norms. X rewards a strong first post with media; long threads lose most readers after the first post, so the first one must stand alone. Bluesky has a 300-character limit and a developer community that dislikes engagement bait. Mastodon is federated: posts are found mainly through hashtags (written in CamelCase for screen readers) and boosts, link previews and content warnings follow local norms, and alt text on images is expected. LinkedIn favours a short personal story with the link and context in the text; heavy hashtag use and "agree?" bait read as spam. On every network, a demo GIF or short video of the real thing usually beats a logo, and a maker who replies to people beats one who broadcasts. Character limits and link handling change, so the user should check the current limits.
</context>

<task>
<project>
{{project}}
</project>
Voice: {{voice}}.
Networks: {{networks}}.

If you cannot tell what the project does or where the link goes, ask and stop.

1. **Core message.** One sentence that says what it is and who it is for, one concrete detail that makes it interesting (a number, a design choice, a story), and the call to action (try it, read the post, give feedback).
2. **Posts per network** in {{networks}}:
   - X: a first post that stands alone (hook, what it is, link or media), then an optional thread of three to five posts, each adding one thing (how it works, a limitation, what is next, how to help). Put the link where it does not bury the first post.
   - Bluesky: a single post of 300 characters or fewer, plus an optional reply with details.
   - Mastodon: a post under 500 characters with two to four relevant CamelCase hashtags and a note on content warnings if the instance expects them.
   - LinkedIn: 80 to 200 words told as a short story (the problem you had, what you built, what you learned), the link, and one honest line on limits.
   Keep the voice consistent with {{voice}}; disclose "I built" or "we built".
3. **Media and alt text.** Say which media to attach to each post and write alt text for each image or GIF that describes what it shows.
4. **Follow-up.** Three follow-up posts for the next two weeks (a user question answered, a fix shipped, a lesson learned) and a rule for replying to every comment in the first hours.
</task>

<constraints>
- No engagement bait ("like if you agree", "comment YES"), no fake urgency, no superlatives you cannot back up.
- No tagging big accounts who have no connection to the project, and no asking for reposts from strangers.
- Use only facts from the input.
- Tell the user to verify the current character limits before posting.
</constraints>

<output_format>
## Core message
## Posts
### X
### Bluesky
### Mastodon
### LinkedIn
(only the networks requested)
## Media and alt text
## Follow-up
</output_format>
