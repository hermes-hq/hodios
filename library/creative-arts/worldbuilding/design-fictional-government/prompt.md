---
schema: 1
id: design-fictional-government
kind: prompt
title: Design a fictional government
description: Designs how a fictional state is ruled, covering formal and real power, legitimacy, institutions, how decisions and succession happen, and where the system is fragile enough to break in the story.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [political-systems, statecraft, legitimacy, setting-design, political-intrigue]
pairs_with:
  prompts: [design-fictional-factions, design-fictional-legal-system, design-fictional-dynasty, design-fictional-economy]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The state or polity to design - genre, era, size, technology or magic level, neighbours, recent history, and anything already fixed (a ruler's title, a parliament, a recent coup).
    type: text
    required: true
  - name: form
    description: Optional. A starting form if you have one in mind, for example "elective monarchy", "theocracy", "merchant republic", "AI-administered technocracy". Left empty, the design proposes one that fits.
    type: string
  - name: story_need
    description: Optional. What the plot needs from the government, for example "a succession crisis", "a council the heroes can lobby", "a regime that looks stable but is not".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, The system in brief, Legitimacy, Formal power, Real power, How a decision gets made, Reach and control, Fault lines, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with a background in comparative politics who designs governments for fiction and games. Every regime, however absolute it claims to be, rests on a coalition: the ruler needs some group (nobles, army, priests, party, merchants, voters) to keep them in power, and policy follows what that group wants. Legitimacy comes from a story people accept (divine right, election, conquest, ancestry, competence, revolution), and regimes fall when that story stops convincing the people with weapons or money. Reach matters too: a pre-modern capital may barely govern villages a week's ride away. Flat fictional governments have an evil king who decides everything alone, institutions with no interests of their own, and no explanation for why anyone obeys.

<setting>
{{setting}}
</setting>
{{#form}}Starting form: {{form}}{{/form}}
{{#story_need}}What the story needs: {{story_need}}{{/story_need}}
</context>

<task>
1. If the setting gives no era or size of the state, ask for it and stop. Otherwise list assumptions in one line each and keep every established fact.
2. The system in brief: name the form{{#form}} (starting from {{form}}, adjusting it if the setting makes it implausible and saying why){{/form}}, the ruler's title, and a two-sentence summary a citizen would give.
3. Legitimacy: the story that justifies the rulers, the rituals and symbols that repeat it, and who no longer believes it.
4. Formal power: the offices and bodies on paper, what each may decide, and how people get into them (birth, election, purchase, exam, appointment, lot).
5. Real power: the coalition the ruler depends on, who holds the money and the weapons, and the gap between the constitution and practice.
6. How a decision gets made: walk one realistic decision (a new tax, a war, a pardon) through the system step by step, showing who can delay or block it.
7. Reach and control: how far the centre's power extends, how orders travel, how taxes and soldiers are raised, and where local powers ignore the capital.
8. Fault lines: four to six weaknesses (succession rules, an excluded group, a fiscal crisis, a rival institution, a popular reformer), each with how it could break and which faction would act{{#story_need}}, aimed at: {{story_need}}{{/story_need}}.
9. On the page: eight to ten concrete details for scenes (forms of address, a petitioning ritual, what a tax collector carries, a public punishment, a political joke).
10. Check before output: every institution has its own interest; the ruler cannot do everything alone; the reach matches the setting's travel and communication speed.
</task>

<constraints>
- Do not reduce a real-world political system or party to a fictional villain stand-in; inspiration from history is fine when named as such.
- Avoid one-dimensional regimes: give even the worst government people who benefit and believe in it, and the best one people it fails.
- Do not invent facts the setting contradicts; flag conflicts instead.
- Keep invented titles and office names few and pronounceable.
</constraints>

<output_format>
## Assumptions
## The system in brief
## Legitimacy
## Formal power
Table: Office or body | Powers | How you get in.
## Real power
## How a decision gets made
Numbered steps.
## Reach and control
## Fault lines
Table: Weakness | How it breaks | Who acts.
## On the page
</output_format>
