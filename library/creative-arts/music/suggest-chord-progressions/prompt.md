---
schema: 1
id: suggest-chord-progressions
kind: prompt
title: Suggest chord progressions with the theory behind them
description: Suggests chord progressions and voicings for a mood or a melody, spells every chord, and explains why each progression creates the feeling. Use when writing or arranging a song.
category: music
version: 1.0.0
status: incubating
stage: [build, learn]
role: [artist, student]
subject: [music-theory]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chord-progressions, voicings, reharmonisation, voice-leading]
pairs_with:
  prompts: [write-song-lyrics, write-music-prompt]
args:
  - name: mood_or_melody
    description: The mood, scene or genre you want, or a melody as note names with rhythm or bar lines (e.g. "| E E F G | G F E D |"), solfège or ABC notation.
    type: text
    required: true
  - name: key
    description: The key, e.g. "A minor" or "Eb major". Optional; without it a key is chosen for the instrument and mood, or inferred from the melody.
    type: string
  - name: instrument
    description: The instrument the voicings are for, e.g. piano, guitar, ukulele.
    type: string
    default: piano
output_contract:
  format: markdown
  sections: [Starting point, Progressions, Voicings, Theory, Try next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Chord suggestions are only useful if they are correct and playable. Common failures are misspelled chords (a "D minor" containing F sharp), progressions that clash with the melody on strong beats, voicings that jump around the keyboard or fretboard, and explanations that say "this sounds sad" without saying why. Good suggestions name the function of each chord, show how the voices move, and explain the specific device (a borrowed chord, a suspended resolution, a deceptive cadence) that produces the feeling.
</context>

<task>
Suggest chord progressions for {{instrument}}.

<input>
{{mood_or_melody}}
</input>
{{#key}}Key: {{key}}
{{/key}}If no key was given, infer it from the melody, or choose one that suits the mood and is comfortable on {{instrument}}, and say why.

1. **Starting point:** say whether the input is a mood or a melody. For a melody, identify the key and the notes that fall on strong beats in each bar; those notes should usually be chord tones, while passing notes on weak beats need not be. If the melody's rhythm or bar lines are unclear, state your assumption, or ask if it changes the harmony substantially.
2. **Progressions:** give 3 to 4 options that differ in character (for example one simple diatonic, one with a borrowed or chromatic chord, one with extended or suspended colours, one with a different harmonic rhythm). For each give Roman numerals, chord symbols in the key, the bars or melody segment each chord covers, and a one-line description of the feel.
3. **Spell and check:** list the notes of every chord, and for melodies, confirm the strong-beat melody note is a chord tone or name it as a deliberate tension (for example the 9th). Fix any chord that clashes.
4. **Voicings** for {{instrument}}:
   - piano: left-hand bass note or shell and right-hand voicing, with note names in register (for example C3 in the left hand, E4 G4 B4 in the right), chosen for smooth voice leading with common tones held;
   - guitar or ukulele: chord shapes as fret numbers from the lowest string (for example x32010) with capo suggestions where they help;
   - other instruments: what that instrument can play (bass lines, arpeggios, double stops).
5. **Theory:** for each progression, explain the function of each chord (tonic, predominant, dominant), the device that creates the mood (modal mixture such as iv or bVI in a major key, secondary dominants, suspensions, pedal points, the Andalusian cadence, a deceptive cadence, a Picardy third), and how the voice leading supports it. Keep it clear to someone who knows basic triads.
6. **Try next:** a rhythm or strumming pattern idea for one progression, and one reharmonisation trick to try.
</task>

<constraints>
- Every chord must be spelled correctly in the key; double-check accidentals and enharmonic spelling (use Bb, not A#, in F major).
- Do not claim a progression is unique or yours; common progressions are shared musical language.
- If you are unsure of a melody note's rhythm or octave, say so instead of building on a guess.
</constraints>

<output_format>
## Starting point
## Progressions
| Option | Roman numerals | Chords | Bars / melody | Feel |
## Voicings
One table or block per option, chord by chord, with notes or fret shapes.
## Theory
A short paragraph per option.
## Try next
</output_format>

<examples>
<example>
Mood "bittersweet, nostalgic" in C major: I - V6 - vi - IV - iv - I, chords C - G/B - Am - F - Fm - C. Notes: Fm = F Ab C. The Fm is borrowed from C minor (modal mixture): the A falling to Ab as the F major chord turns minor gives the bittersweet pull before home.
</example>
</examples>
