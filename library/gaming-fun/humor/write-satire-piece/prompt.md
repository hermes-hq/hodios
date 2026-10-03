---
schema: 1
id: write-satire-piece
kind: prompt
title: Write a satire piece
description: Writes a satirical news article, op-ed, sketch or mock document that punches up, with a named target and thesis, a deadpan premise, escalating absurd beats and a clear satire label.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [topic, preferences]
output: [article, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [satire, parody-news, comedy-writing, punching-up, op-ed]
pairs_with:
  prompts: [write-comedy-sketch, write-comedy-bit, punch-up-with-humor]
args:
  - name: topic
    description: What you want to satirise and what bothers you about it, for example "companies that call layoffs 'right-sizing our family'" or "my city spending millions on a bike lane that ends in a wall".
    type: text
    required: true
  - name: format
    description: news-article (parody news), op-ed, sketch, press-release, listicle, memo or product-launch. Optional; defaults to a parody news article.
    type: string
    default: news-article
output_contract:
  format: markdown
  sections: [Target and thesis, Headline options, The piece, Beat map, Punching-up check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write satire in the tradition of parody newspapers and political sketch comedy. Satire is criticism wearing a disguise: it has a target (an institution, a powerful person's public conduct, a trend, a hypocrisy) and a point (what is actually wrong with it). Its engine is a premise that takes the target's own logic one step further than reality and then plays it completely straight, escalating until the absurdity reveals the truth. It punches up, at power and pretension, not down at people with less of it.

Topic: {{topic}}
Format: {{format}}
</context>

<task>
1. Name the target and state the thesis in one sentence each (what the piece argues underneath the jokes). If the topic gives no target or point of view, ask what bothers the user about it and stop.
2. Find the premise: the target's logic exaggerated into one absurd but internally consistent situation. Write three candidate premises and pick the strongest.
3. Write five headline options in the deadpan register of the format; the best satirical headlines state the absurd premise as plain news.
4. Write the piece in {{format}} conventions at 300 to 600 words (a sketch may run longer), keeping a straight face throughout. Use specific, mundane detail to sell the reality, invented spokespeople and officials with titles, and escalate in at least three beats, each more absurd than the last, ending on a sharp final line.
5. Map the beats so the user can see the escalation and cut or extend.
6. Run the punching-up check: who is the butt of each joke, is the target powerful relative to the audience, and could any line be read as mocking a group for who they are. Rewrite anything that fails.
</task>

<constraints>
- Do not put invented quotes in the mouths of real private individuals. Real public figures may be satirised for their public conduct, but keep the absurdity obvious so no reader could take an invented quote or event as fact.
- No jokes that target people for race, religion, disability, gender, sexuality or nationality; satirise ideas, institutions and behaviour.
- Avoid real company or product names in fabricated wrongdoing unless the user's topic is that company's documented public conduct, and then keep the satire clearly exaggerated.
- Add a line marking the piece as satire for publication, because satire travels without context online.
</constraints>

<output_format>
## Target and thesis
## Headline options
Numbered, with the chosen one marked.
## The piece
Headline, then the text in the format's conventions, then a closing `(Satire.)` label line.
## Beat map
Numbered beats with one line each on how it escalates.
## Punching-up check
Two to four bullets.
</output_format>
