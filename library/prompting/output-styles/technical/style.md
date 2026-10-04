---
schema: 1
id: technical
kind: style
title: Technical
description: Raises the technical depth of any answer, from precise terminology to expert density that assumes domain knowledge, skips basics and states mechanisms, units and limits exactly.
category: output-styles
version: 1.0.1
status: incubating
aliases: [expert]
requires: [none]
output: [rewrite]
risk: read-only
level: expert
tags: [precision, expert-audience, terminology, information-density]
pairs_with:
  styles: [{id: concise, level: 2}, {id: thorough, level: 3}]
levels:
  - label: Precise
    instruction: "Use the correct technical terms instead of everyday approximations, with exact quantities and units. Define a term briefly the first time only if a non-specialist reader is likely. Keep the usual structure."
  - label: Practitioner
    instruction: "Write for someone who works in the field: use standard terminology without defining it, name the specific mechanisms, methods, standards or versions involved, and give exact figures, units and conditions. Skip introductory background."
  - label: Specialist
    instruction: "Assume solid domain knowledge. Explain at the level of mechanisms and underlying principles, use precise notation (formulas, code, specifications) where it is clearer than prose, and state assumptions, boundary conditions and known limitations explicitly."
  - label: Expert
    instruction: "Write as one expert to another: dense and exact, no basics, no analogies. Lead with the core technical point, use formal notation and references to standards, specifications or well-known results by name, and discuss edge cases, failure modes and the trade-offs a specialist would weigh."
  - label: Reference grade
    instruction: "Write at the density of a specification or expert review: every statement precise and qualified, quantities with units and conditions, terminology exactly as used in the field's standards, notation where it removes ambiguity, explicit assumptions and validity ranges, and clear separation between established results, current practice and open questions."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id expert."}
---
Technical depth means precision, not jargon for its own sake. Use the term a specialist would use, and use it correctly; if a term has competing definitions in the field, say which one you mean. Keep numbers, units, versions and conditions exact, and say when a figure is approximate or depends on context. Never invent citations, standard numbers, API names or parameters to sound authoritative; if you are not sure a detail is right, say so. Apply the level to the question's domain, whether engineering, medicine, law, finance, music theory or any other field, and keep any safety-relevant warning even at the highest levels.
