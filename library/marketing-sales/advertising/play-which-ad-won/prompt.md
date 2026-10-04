---
schema: 1
id: play-which-ad-won
kind: prompt
title: Play which ad won
description: Runs a guessing game where the player picks which of two ad variants would likely win a test, then reveals the principle behind it, adapting difficulty to train a beginner's ad judgement.
category: advertising
version: 1.0.0
status: incubating
stage: [learn]
role: [student, marketer, founder]
requires: [none]
inputs: [preferences]
output: [conversation, quiz]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [ad-judgement, ab-testing, guessing-game, copy-principles, practice-drill]
pairs_with:
  prompts: [plan-ad-creative-tests, check-ad-landing-message-match]
  personas: [ad-creative-strategist]
args:
  - name: industry
    description: The kind of business the ads come from, for example "cafes", "SaaS", "trades", "fashion", or mixed for a variety.
    type: string
    default: mixed
  - name: level
    description: beginner = clear-cut pairs teaching one principle each; intermediate = closer pairs where context (audience, platform, funnel stage) decides the winner.
    type: enum
    enum: [beginner, intermediate]
    default: beginner
output_contract:
  format: markdown
  sections: [Round, Reveal, Final score]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The player is learning to judge ads: a marketing beginner, a student, or a shop owner who writes their own. Judgement comes from seeing many pairs and naming why one works better. The principles that most often decide tests are: specificity over vagueness, proof over claims, message match with the audience's situation, a clear single call to action, offer framing (what the customer gets rather than what they give up), benefit before feature, and fit with the funnel stage. Real tests can surprise, so every pair is an invented illustration with the outcome that the principle predicts, never a claim about a real company's result.

Industry: {{industry}}
Level: {{level}}
</context>

<task>
1. If the player names a business or industry in their message, use it instead of the industry above. Open with three lines: how the game works (ten rounds; pick A or B and say why in a few words; one point for the right pick, one bonus point for naming the principle), that the ads are invented examples, and that the player can type "stop" at any time. Then start round 1.
2. Each round: give the setting (business, platform, audience and goal) in one line, then Ad A and Ad B as short ads of the same format, differing in one main way at beginner level and in subtler ways at intermediate level. Ask "A or B, and why?" and wait.
3. After the player answers, reply with the reveal for that round and then the next round in the same message. If they give only a letter, score the pick, skip the bonus and ask for a reason next time; never hold back the reveal. In the reveal: say which ad would likely win and score them; name the principle in one sentence; explain the mechanism in two or three sentences (what the viewer thinks or feels); and give a one-line rule of thumb they can reuse. If their reason was good but the pick differed, credit the reasoning and explain the context that tips it.
4. Adapt: after three right answers in a row, make the next pair closer; after two wrong in a row, make it clearer and revisit the principle they missed. Do not repeat a principle twice in a row.
5. At intermediate level, include at least two pairs where the "obvious" winner loses because of context (for example a long ad winning for a high-price considered purchase, or a plain image winning on a cluttered feed).
6. After round ten or "stop", give the final score, the principles they spotted and missed, and three practice tips for their own ads.
</task>

<constraints>
- Every ad, brand and result is fictional; do not use real company names or claim any figures came from real tests.
- Keep both ads honest and policy-safe; never use misleading claims as the winning example.
- One round per turn; never reveal the answer before the player picks.
- Keep each reveal under about 100 words.
</constraints>

<output_format>
## Round
`Round n of 10 - Score: x`, the setting line, then **Ad A** and **Ad B**, then the question.

## Reveal
Winner and points, Principle, Why it works, Rule of thumb.

## Final score
Score, principles spotted, principles missed, three tips.
</output_format>
