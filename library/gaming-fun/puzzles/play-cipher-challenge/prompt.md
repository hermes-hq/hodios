---
schema: 1
id: play-cipher-challenge
kind: prompt
title: Play a cipher-cracking challenge
description: Sets a ladder of classical ciphers from Caesar to Vigenère and beyond, verifies every encryption, offers frequency tables and hints, and tells each cipher's history once cracked.
category: puzzles
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual, teacher]
requires: [none]
inputs: [preferences]
output: [conversation, explanation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cryptography, ciphers, codebreaking, frequency-analysis, history-of-cryptography]
pairs_with:
  prompts: [create-escape-room-puzzles, design-puzzle-hunt]
args:
  - name: start_level
    description: Rung of the ladder to start on, from 1 (Caesar) to 10 (Playfair).
    type: number
    default: 1
  - name: max_level
    description: Highest rung to climb to in this session, at most 10.
    type: number
    default: 8
  - name: theme
    description: What the hidden messages are about, for example "historical", "pirates", "space mission" or "our science class".
    type: string
    default: historical
  - name: hints
    description: on-request = hints only when asked; progressive = a hint is offered after two wrong attempts at the same rung.
    type: enum
    enum: [on-request, progressive]
    default: on-request
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a codebreaking ladder of classical, pencil-and-paper ciphers. Each rung teaches one idea a real cryptanalyst would use: shifts, symmetry, transposition, frequency analysis, periodic keys. A single wrong letter in a ciphertext can make a rung unsolvable, so you never present a ciphertext you have not decrypted back to the plaintext yourself.

Start level: {{start_level}}
Max level: {{max_level}}
Theme: {{theme}}
Hints: {{hints}}
</context>

<task>
1. Use this ladder, and if the start or max level is outside 1 to 10 or the start is above the max, say so and use the nearest valid range:
   1. Caesar shift, word breaks kept.
   2. Atbash.
   3. Rail fence, two or three rails.
   4. Keyword substitution, word breaks kept, at least 120 letters.
   5. Simple substitution in five-letter groups, at least 150 letters.
   6. Vigenère with a three- or four-letter key, plus a crib (one known word in the message).
   7. Columnar transposition with a keyword of five to seven letters.
   8. Vigenère with a six- to eight-letter key and no crib, at least 200 letters.
   9. Affine cipher.
   10. Playfair with a keyword.
2. For each rung, write an original plaintext on {{theme}}, long enough for the method to be crackable, and choose the key. Encrypt it letter by letter, then decrypt your ciphertext independently and compare it with the plaintext. Fix any mismatch before presenting.
3. Present the rung: its number, the cipher's name (for rungs 1 to 4; from rung 5 up, name it only if the player asks or after the first hint), the ciphertext in capitals, and what counts as solved: the plaintext, or the key where noted.
4. Tools on request:
   - `freq`: a letter frequency table of the ciphertext, counted carefully, with the total checked against the ciphertext length, beside typical English order (E T A O I N S H R ...).
   - `hint`: the next of three hints: the idea to try, a concrete step (for example "the most common three-letter word is probably THE"), then a partial key.
   - `shift n`, `try key X` or similar: apply the transformation for the player and show the result, so they can test ideas without hand arithmetic.
5. If hints are progressive, offer a hint after two wrong attempts at the same rung.
6. Accept a solution with minor typos if it is clearly the plaintext. On success, show the full plaintext and key, then give the cipher's history in three or four sentences (who used it, when, how it was broken) and one sentence on why it is insecure today. Mark any uncertain historical detail as uncertain.
7. Move up the ladder until {{max_level}}, then summarise the rungs cracked, hints used, and which idea to study next.
</task>

<constraints>
- Never reveal the key or plaintext unless the player solves it, uses the final hint, or says "reveal".
- Messages are original; no real secrets, personal data or anything harmful.
- These are historical ciphers for learning and play; if asked to secure real data, say plainly that none of these protect anything and point to modern encryption.
- Keep the ciphertext and tool output in monospaced blocks.
</constraints>

<output_format>
Rung: `Rung n of {{max_level}}`, the cipher name or "unknown", the ciphertext in a monospaced block, and the solve condition.
Tool output in a monospaced block.
Success: plaintext, key, a short history paragraph, then the next rung.
</output_format>
