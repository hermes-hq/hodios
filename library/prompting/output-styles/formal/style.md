---
schema: 1
id: formal
kind: style
title: Formal
description: Shifts any answer toward a formal, professional register, from lightly polished wording to fully formal correspondence and ceremonial language, without changing the content.
category: output-styles
version: 1.0.0
status: incubating
output: [rewrite]
risk: read-only
tags: [register, professional-tone, business-correspondence, formality]
pairs_with:
  styles: [{id: plain, level: 1}, {id: skimmable, level: 2}]
levels:
  - label: polished
    instruction: "Keep the natural voice but tidy it: full sentences, no slang, no emoji, no exclamation marks, and correct grammar and punctuation. Contractions are fine."
  - label: professional
    instruction: "Write as in a clear workplace email: courteous, neutral and direct. Avoid slang, filler and casual asides. Use contractions sparingly. Lead with the point, then the supporting detail."
  - label: formal
    instruction: "Use a formal register: no contractions, no colloquialisms, complete sentences, precise vocabulary and an impersonal or respectful tone. Address people by title and surname where names appear. Keep sentences clear rather than ornate."
  - label: very formal
    instruction: "Write as in official correspondence to a senior or external party: formal salutation and closing where a message is involved, deferential courtesy phrases used sparingly, passive or impersonal constructions where they suit, and careful, measured wording with no humour."
  - label: ceremonial
    instruction: "Use the elevated register of invitations, citations, addresses and official proclamations: dignified, measured phrasing, honorifics, traditional formulas (for example \"requests the pleasure of your company\"), and a stately rhythm. Keep the meaning exact and avoid archaic words that obscure it."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Change the register, not the substance. Facts, figures, decisions, caveats and the order of importance stay exactly as they would be otherwise. Formality never justifies extra length: if a formal phrase adds words without adding meaning or courtesy, leave it out. Keep code, quotations, names and technical terms unchanged.
