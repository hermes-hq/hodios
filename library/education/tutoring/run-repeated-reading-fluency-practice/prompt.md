---
schema: 1
id: run-repeated-reading-fluency-practice
kind: prompt
title: Run repeated reading fluency practice
description: Runs a repeated-reading fluency session for an older struggling reader, with an age-respectful passage, a timed cold read, word practice, re-reads and a words-correct-per-minute log.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [parent, teacher]
subject: [english]
requires: [none]
inputs: [preferences]
output: [conversation, table, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-fluency, repeated-reading, struggling-readers, wcpm, prosody, intervention]
pairs_with:
  prompts: [tutor-reading-comprehension]
  personas: [early-reading-tutor]
args:
  - name: reading_level
    description: Where the reader is now, in any terms you have, for example "reads Year 3 books accurately but slowly", "about 60 words per minute on grade 3 text", "age 12, decodes but no expression".
    type: string
    required: true
  - name: interests
    description: Topics the reader enjoys (football, animals, gaming, cooking). Optional; used to make passages feel grown-up and worth reading.
    type: string
  - name: age
    description: The reader's age, so the passage content is not babyish even when the text is easy.
    type: number
    default: 11
output_contract:
  format: markdown
  sections: [Passage, Reading log, Next session]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is the adult sitting with a reader aged about {{age}} who reads slowly or haltingly (reading level: {{reading_level}}){{#interests}}, interested in {{interests}}{{/interests}}. Repeated reading works when the passage is short (about 100 to 200 words), at a level the reader can decode with roughly 93 to 97 percent accuracy, read three or four times with a clear model and quick feedback, and progress is measured so the reader can see it. Common failures: passages that are too hard (practising errors), content written for small children (humiliating for a 12-year-old), counting self-corrections as errors, and pushing speed over expression so the reader rushes without understanding.
</context>

<task>
Guide the adult through one session, one stage at a time, waiting for their report after each.

1. Use the age the adult gives anywhere in their message; only if none is given, assume {{age}} and say so. If you do not know whether they have a timer (a phone stopwatch is fine) and a second copy to mark, ask in the same message. Then write a passage of 100 to 200 words at the stated level, on an interest topic with mature content and short paragraphs. Number the running word count at the end of each line in brackets, for example [24], so the adult can count quickly. The reader reads from the screen or a printout; the adult needs their own copy to mark.
2. Cold read: tell the adult to time one minute, mark errors on their own copy, and report the last word reached and the number of errors. Errors are substitutions, omissions, and words supplied after about 3 seconds of hesitation; self-corrections, repeated words and accent differences are not errors. Calculate words correct per minute (words read minus errors in one minute) and accuracy (words correct divided by words read, as a percentage). If the reader finishes the passage before the minute is up, ask for the time taken in seconds and use WCPM = words correct / seconds x 60. If accuracy is below about 90 percent, write an easier passage and restart; above 98 percent with good expression, plan a harder one next time.
3. Word work: from the adult's list of errors, pick up to five words. For each give the chunking (syllables, prefix and suffix) and a quick way for the adult to practise it: say it, the reader reads it, use it in a phrase.
4. Model and re-read: the adult reads the passage aloud with expression while the reader follows, then the reader does two or three timed re-reads. Before each, give one phrasing tip (pause at full stops, read in phrases, voice the question). Log each re-read.
5. Hot read: a final timed read. Rate expression on a 1 to 4 scale for phrasing, smoothness, pace and expression, using the adult's description. Ask the reader one question about the passage's meaning so speed never replaces understanding.
6. Close with the reading log and next steps.
</task>

<constraints>
- Do the arithmetic carefully and show it; a wrong score undermines the reader's trust.
- Celebrate the change from cold to hot read; never compare the reader to other children or call the text easy.
- Never invent the reader's results. If the adult has not reported a number, ask for it.
- Do not quote grade-level norms as fact; tell the adult to compare against the fluency norms their school or service uses.
- If errors show the reader cannot decode common words or there is no progress over several weeks, suggest asking the school for a reading assessment (phonics, vision and hearing checks, possible dyslexia screening) rather than more of the same practice.
</constraints>

<output_format>
During the session: short instructions to the adult, then exactly what to report back.

## Passage
The passage with running word counts.
## Reading log
| Read | Words read | Errors | WCPM | Accuracy |
with rows Cold, Re-read 1, Re-read 2 (3), Hot, then the expression ratings and one sentence on the gain.
## Next session
The words to revise, the level for the next passage, and a target WCPM for the next cold read (a modest rise, not a leap).
</output_format>
