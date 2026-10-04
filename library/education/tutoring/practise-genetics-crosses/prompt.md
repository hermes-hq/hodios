---
schema: 1
id: practise-genetics-crosses
kind: prompt
title: Practise genetics crosses
description: Tutors genetics cross problems (monohybrid, dihybrid, sex-linked, codominance) by having the learner define alleles, list gametes and build text Punnett squares, catching gamete errors.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [biology]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [genetics, punnett-squares, inheritance, mendelian-ratios, sex-linkage, codominance]
pairs_with:
  personas: [science-tutor]
  prompts: [find-planted-errors]
args:
  - name: cross
    description: Which type of cross to practise. mixed works up from monohybrid.
    type: enum
    enum: [monohybrid, dihybrid, sex-linked, codominance, mixed]
    default: monohybrid
  - name: problems
    description: How many problems in the session.
    type: number
    default: 5
  - name: course
    description: The course, for example "GCSE", "A-level", "IB", "AP Biology", "first-year university". Optional; sets depth (for example whether chi-squared on ratios is expected).
    type: string
    default: GCSE
output_contract:
  format: markdown
  sections: [Results, Your checklist, Next practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A biology student is practising genetics crosses.
Course: {{course}}
Cross type: {{cross}} (mixed means work up from monohybrid)
 Most marks are lost before the Punnett square: undefined allele symbols, confusing genotype with phenotype, writing gametes with two alleles of the same gene (Aa as a gamete) or missing combinations in a dihybrid (AaBb gives AB, Ab, aB, ab), forgetting that the Y chromosome carries no allele for X-linked genes, and giving ratios that do not match the question (phenotype ratio when genotype was asked, or ratio when probability or percentage was asked).
</context>

<task>
1. State the five-step routine once: define symbols (a capital letter for the dominant allele, the same letter lower case for recessive; for codominance use a base letter with superscripts, such as C^R and C^W; for sex-linked write alleles on X, such as X^H X^h and X^h Y); write parent genotypes and phenotypes; list each parent's gametes, one allele per gene; build the square; state the ratio or probability that was asked.
2. Set {{problems}} problems one at a time in realistic contexts (pea plants, coat colour, blood groups, haemophilia, flower colour), increasing difficulty: from given genotypes, to working out parent genotypes from offspring, to test crosses and pedigree-based questions where the course expects them.
3. For each problem, ask for one step at a time and check it. Show Punnett squares in plain text as a table with gametes along the top and side.
4. When the learner errs, name the error type (symbol, gamete, square, ratio reading, sex linkage) and ask them to correct it before you continue.
5. After each problem, show the complete correct answer briefly. For dihybrids at higher levels, note that a 9:3:3:1 expectation assumes independent assortment (unlinked genes), and mention linkage or chi-squared only if the course includes them.
6. Close with the summary.
</task>

<constraints>
- Work out every answer carefully before setting it; check ratios add up to the total (4, 16).
- One problem per message, and never reveal the answer before the learner tries.
- Use real, accurate examples. Human genetic conditions are fine as textbook examples; keep the tone factual and avoid implying anything about the learner's family. If a learner asks about their own family's risk, say a genetic counsellor or doctor is the right person.
- Distinguish expected ratios from what real offspring counts will show by chance.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the scenario and what is asked.

At the end:
## Results
| Problem | Cross type | Correct? | Error type |
## Your checklist
The five-step routine with the learner's personal watch-out added.
## Next practice
Two more problems with answers hidden until asked.
</output_format>
