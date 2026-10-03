---
schema: 1
id: tell-hero-story-series
kind: prompt
title: Tell a hero story series starring your child
description: Tells an ongoing story series where your child is the hero, keeping a story bible of recurring characters and weaving in real milestones so episodes stay consistent across nights.
category: kids-activities
version: 1.0.0
status: incubating
stage: [build, operate]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [script, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [personalised-story, story-series, read-aloud, continuity, story-bible, milestones]
pairs_with:
  personas: [bedtime-storyteller]
  prompts: [explain-hard-topic-to-child]
args:
  - name: child_name
    description: The first name or nickname to use for the hero. A nickname is fine if you prefer not to use a real name.
    type: string
    required: true
  - name: age
    description: The child's age in years. Sets vocabulary, length and how much adventure the story holds.
    type: number
    required: true
  - name: interests
    description: What the child loves right now - animals, places, a toy, a favourite colour, a game - and anything to avoid (a fear, a sensitive topic). To continue a series, paste the story bible from the last episode here too.
    type: text
    required: true
  - name: theme_this_week
    description: A real-life theme or milestone to weave in, for example "first day at school", "learning to ride a bike", "new baby sister", "being brave at the dentist".
    type: string
    default: courage
output_contract:
  format: markdown
  sections: [Episode, Story bible]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write an ongoing story series in which a child is the hero, for a parent or carer to read aloud or tell. Children love hearing themselves as the hero who is brave, kind and clever, and a series becomes powerful when familiar characters return and the stories mirror what is happening in the child's own life, so the child rehearses a real challenge safely through the hero. A series only works if it stays consistent: names, places, powers and past events must not drift between episodes, which is why you keep a story bible.

Hero: {{child_name}}, age {{age}}
Interests and series notes:
{{interests}}
This week's theme: {{theme_this_week}}
</context>

<task>
1. If the input contains a story bible from a previous episode, continue from it: keep every established name, trait, place and rule, refer back to one past event, and advance one running thread. If it does not, start a new series: create a world built from the child's interests, two or three recurring companions (a loyal friend, a wise helper, a funny sidekick) and one gentle running thread that can span episodes.
2. Before writing, ask the grown-up at most two quick questions only if something important is unclear (for example whether the theme is a sensitive one such as a new sibling or a move, or whether to include a real pet or family member). If they say "go", proceed with stated assumptions.
3. Write one episode sized to the age: about 300 to 500 words for ages 3 to 5, 500 to 800 for ages 6 to 8, and up to 1,200 for ages 9 to 11. Give it a title and a clear shape: a problem that matters to the hero, a try that does not quite work, a choice that shows courage, kindness or cleverness, and a warm resolution.
4. Weave in the theme through the story, not as a lesson: the hero faces a version of the real challenge, feels the real feelings (nervous, cross, unsure), and finds a way through that the child could use in real life. Never lecture or end with a moral spelled out.
5. Offer one moment where the child can choose what happens, marked [Ask: …] for the reader, with two options and a note that any idea the child invents works too.
6. End calmly enough for bedtime and with a small hook for the next episode that is exciting, not worrying.
7. Update the story bible after the episode: characters with one-line traits and appearance notes, places, rules of the world, events so far by episode, the running thread, and the hero's growing list of brave and kind moments, including this week's milestone.
8. Before answering, check the episode against the bible for contradictions (a name, a colour, a power, who knows what) and fix any.
</task>

<constraints>
- Gentle stakes: no real danger, injury, death, abandonment or villains who frighten. Problems are solvable and adults in the story are safe and kind.
- Use only the name or nickname supplied; do not ask for the child's surname, school, address or other identifying details, and keep any real people named by the grown-up in kind, small roles.
- The hero succeeds through effort, kindness and ideas, not magic that removes the real-life challenge.
- Read-aloud craft: short sentences, rhythm, a repeated line the child can join in with, and sound words.
- Not a one-off calming bedtime story; this is a continuing series with continuity across episodes.
</constraints>

<output_format>
## Episode
Title, then the story with [Ask: …] at the choice point.
## Story bible
A compact block the grown-up can copy and paste next time, with these labelled lines: Hero, Companions, Places, World rules, Episodes so far, Running thread, Brave and kind moments.
</output_format>
