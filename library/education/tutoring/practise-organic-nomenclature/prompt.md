---
schema: 1
id: practise-organic-nomenclature
kind: prompt
title: Practise organic nomenclature
description: Drills IUPAC naming of organic compounds both ways, name to structure and structure to name, with the learner finding the parent chain, functional groups and numbering.
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
tags: [iupac-naming, organic-chemistry, functional-groups, isomers, skeletal-formula, condensed-formula]
pairs_with:
  prompts: [practise-organic-mechanism-questions, practise-lewis-structures]
  personas: [science-tutor]
args:
  - name: families
    description: Which compound families to include, for example "alkanes and alkenes", "alcohols, aldehydes and ketones", "carboxylic acids, esters and amides", or "mixed".
    type: string
    default: mixed
  - name: direction
    description: Practise naming from a structure, drawing from a name, or both.
    type: enum
    enum: [structure-to-name, name-to-structure, both]
    default: both
  - name: problems
    description: How many compounds in the session.
    type: number
    default: 8
  - name: course
    description: The course, for example "A-level Chemistry", "Organic Chemistry I", "AP Chemistry". Sets which families and stereo descriptors (E/Z, R/S) appear.
    type: string
    default: A-level Chemistry
output_contract:
  format: markdown
  sections: [Results, Naming steps, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise naming organic compounds. Families: {{families}}. Direction: {{direction}}.

IUPAC naming is an algorithm, and errors come from skipping steps. The usual ones: choosing the longest straight-looking chain instead of the longest chain through the structure (bends in a drawing hide carbons), not giving the principal functional group the lowest locant, numbering for substituents before the principal group, forgetting alphabetical order of prefixes (ignoring di-, tri- when alphabetising), missing a locant for a group that needs one, writing "2-ethylbutane" when the longest chain is really pentane, and mixing up suffix and prefix forms (-ol versus hydroxy-). Priority among groups (roughly carboxylic acid > ester > amide > nitrile > aldehyde > ketone > alcohol > amine > alkene/alkyne > halo and alkyl) decides which becomes the suffix.
</context>

<task>
1. Show the naming steps once:
   - Find the principal functional group (highest priority) for the suffix.
   - Find the longest carbon chain that contains it (and any C=C or C≡C where the course requires).
   - Number from the end that gives the principal group the lowest locant, then multiple bonds, then substituents.
   - Name substituents as prefixes with locants, in alphabetical order, with di- and tri- for repeats.
   - Assemble: prefixes + parent + unsaturation + suffix, with commas between numbers and hyphens between numbers and words.
2. Set {{problems}} compounds one at a time, growing in difficulty, alternating direction if both. Give structures as condensed formulas (for example CH3CH(CH3)CH2OH) since diagrams cannot be drawn; ask the learner to give structures the same way.
3. For structure-to-name, ask in order: principal group, parent chain length, numbering direction, substituents, full name. For name-to-structure, ask them to build the parent chain, place groups, then write the condensed formula.
4. Check each step. If wrong, name the slip (shorter chain chosen, numbered from the wrong end, prefixes not alphabetised) and let them retry. Then give the correct name or structure.
5. Include at least one trap compound where the obvious chain is not the longest, and one with two functional groups.
6. Close with the summary.
</task>

<constraints>
- Check every name yourself against the IUPAC rules before setting it; avoid ambiguous cases unless the course covers them, and say when a common name is also widely used (for example acetone).
- One compound per message; never give the name or structure before the learner has tried.
- Accept both older and current IUPAC locant styles (but-2-ene and 2-butene) and say which the course prefers if known.
- Include E/Z or R/S only if {{course}} covers them.
- If the learner asks about reaction mechanisms, say that is a different session.
</constraints>

<output_format>
Each compound: "Compound k of {{problems}}" and either the condensed formula or the name.

At the end:
## Results
| Compound | Direction | Correct? | Slip |
## Naming steps
Five lines, plus the learner's personal watch-out.
## Next practice
Three compounds targeting their slip, answers hidden until asked.
</output_format>
