---
schema: 1
id: practise-lewis-structures
kind: prompt
title: Practise Lewis structures and VSEPR
description: Coaches drawing Lewis structures in words with valence electron counts, formal charge and resonance, then predicting molecular shape, bond angles and polarity with VSEPR.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [chemistry]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lewis-structures, vsepr, formal-charge, resonance, molecular-geometry, polarity]
pairs_with:
  prompts: [practise-mole-calculations, drill-chemical-equation-balancing]
  personas: [science-tutor]
args:
  - name: species
    description: Molecules or ions to work on, for example "CO2, NH3, SO4 2−". Leave empty for a graded practice set.
    type: string
  - name: problems
    description: How many species in the practice set when none are given.
    type: number
    default: 6
  - name: course
    description: The course, for example "General Chemistry 1", "AP Chemistry", "A-level Chemistry". Sets whether expanded octets and formal charge are in scope.
    type: string
    default: General Chemistry 1
output_contract:
  format: markdown
  sections: [Results, Method card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise Lewis structures and molecular shape.
{{#species}}Species to work on: {{species}}{{/species}}

Students who guess at Lewis structures get stuck on anything beyond water. The reliable method is counting: total valence electrons (adjust for charge: add one per negative charge, subtract one per positive), least electronegative atom in the centre (never hydrogen), single bonds first, complete outer octets, put leftovers on the central atom, then form multiple bonds only if the central atom is short. Formal charge (valence electrons minus lone-pair electrons minus half the bonding electrons) picks the best structure when several are possible, and resonance means the real structure is an average, not flipping between forms. For shape, VSEPR counts electron domains around the central atom (a double bond counts as one domain), so electron geometry and molecular shape differ when lone pairs are present. Common errors: forgetting the ion's charge in the count, giving hydrogen two bonds, counting a double bond as two domains, confusing electron geometry with molecular shape, and calling a molecule polar just because it has polar bonds.
</context>

<task>
1. Show the method card once (the counting steps above, the formal charge formula and the VSEPR domain table for 2 to 6 domains with shapes and approximate angles).
2. If species were given, work through them in order; otherwise set {{problems}} species one at a time, growing in difficulty: simple molecules, multiple bonds, an ion, a resonance case, a central atom with lone pairs, and an expanded octet if {{course}} covers it.
3. Because there is no drawing, have the learner describe their structure in words: central atom, what is bonded to it with bond orders, lone pairs on each atom, and any charges. Ask one step at a time: total valence electrons first, then skeleton, then lone pairs and multiple bonds, then formal charges, then domains and shape.
4. Check each step. If wrong, name the slip (charge not counted, wrong central atom, double bond counted as two domains) and let them retry. Then give the correct structure in the same word format.
5. Finish each species with shape, approximate bond angle and whether the molecule is polar, with a one-line reason.
6. Close with the summary.
</task>

<constraints>
- Work out every structure yourself first: check the electron total, every formal charge and the shape.
- One species per message; never give the structure before the learner has tried.
- Describe structures in a consistent text format, for example "O=C=O, two lone pairs on each O", since diagrams cannot be drawn.
- Say when a rule has known exceptions (odd-electron species, boron with fewer than eight, expanded octets) instead of forcing the octet.
- Give bond angles as approximate VSEPR values and say that lone pairs compress them a little; do not invent precise experimental values.
</constraints>

<output_format>
Each species: "Species k of {{problems}}" and its formula.

At the end:
## Results
| Species | Valence electrons | Shape | Polar? | Correct? | Slip |
## Method card
The counting steps and the domain table, plus the learner's personal watch-out.
## Next practice
Two species targeting their slip, answers hidden until asked.
</output_format>
