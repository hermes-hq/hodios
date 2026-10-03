---
schema: 1
id: write-recognition-message
kind: prompt
title: Write a recognition message
description: Writes public recognition for a colleague or team, such as a channel shout-out or an all-hands mention, naming the specific contribution and its impact rather than generic praise.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive, project-manager, individual]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [recognition, shout-out, kudos, appreciation, team-morale, all-hands]
pairs_with:
  prompts: [write-thank-you-note, write-award-nomination, give-feedback-sbi]
args:
  - name: person_or_team
    description: Who is being recognised, with names as they should appear and anyone else who contributed.
    type: string
    required: true
  - name: contribution
    description: What they did, specifically, for example "rebuilt the returns process over two weekends when the warehouse flooded".
    type: text
    required: true
  - name: impact
    description: What it made possible or prevented, with numbers if you have them, for example "no customer waited more than 2 days for a refund".
    type: text
  - name: channel
    description: Where it will appear. Chat is a team channel post; email may copy their manager; all-hands is spoken aloud; card is a handwritten or e-card message.
    type: enum
    enum: [chat, email, all-hands, card]
    default: chat
output_contract:
  format: markdown
  sections: [Message, Check before posting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recognition motivates when it is specific, timely and credible: it names what the person did, the effect it had, and what it says about how they work. "Great job, rockstar!" tells the person nothing and tells everyone else that recognition is a formality. Public recognition also has social risks the writer has to manage: leaving out quieter contributors, implicitly comparing people, praising heroics that came from poor planning in a way that encourages more of them, or putting someone who dislikes attention on the spot. The best messages are short, concrete and generous to everyone who helped.
</context>

<task>
Write a {{channel}} recognition message for {{person_or_team}}.

<contribution>
{{contribution}}
</contribution>
{{#impact}}
Impact: {{impact}}
{{/impact}}

1. If the contribution is generic ("always great", "works hard"), ask for one specific thing they did and what it led to, and stop.
2. Structure the message as: who, what they did (specific actions, not traits), and the impact on customers, colleagues or the organisation. Add one line on what it shows about how they work only if the input supports it.
3. Credit everyone named as contributing. If the input suggests one person did most of the work in a team, recognise the team and name that person's specific part without ranking the others.
4. If the contribution involved working excessive hours or weekends, thank the effort without celebrating overwork as the norm (praise the outcome and the judgement, not the hours).
5. Fit the channel:
   - chat: two to four sentences, with @mentions as placeholders, and one emoji at most.
   - email: a short paragraph, suggest copying their manager, subject line included.
   - all-hands: 30 to 45 seconds spoken (about 80 to 110 words), written for the ear, ending with an invitation to applaud or thank them.
   - card: two or three warm, personal sentences.
6. Under Check before posting, remind the sender to confirm the person is comfortable with public recognition (if not, send it privately), and to check nobody who contributed is missing.
</task>

<constraints>
- Use only the facts given; never invent numbers, quotes or details of the work. If impact is unknown, describe the contribution and leave impact out rather than guessing.
- No clichés or superlatives: "rockstar", "ninja", "above and beyond", "crushing it", "the best team ever".
- No comparison with other people or teams ("unlike some…").
- Sincere, plain and short; the facts carry the praise.
</constraints>

<output_format>
## Message
The message, ready to post (with subject line for email).
## Check before posting
Two or three bullets.
</output_format>

<examples>
Weak: "Huge shout-out to Priya for going above and beyond as always! You're a rockstar!"
Strong: "Thank you @Priya for rebuilding the returns process over two weekends after the warehouse flood. Because of it, no customer waited more than two days for a refund during the worst week of the year."
</examples>
