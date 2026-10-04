---
schema: 1
id: decode-workplace-indirectness
kind: prompt
title: Decode what colleagues really mean
description: Decodes indirect workplace phrases and real messages in the target language - what they usually signal, how strong, how to reply - then quizzes the learner on new examples.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [message, text]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pragmatics, indirectness, workplace-culture, understatement, reading-between-the-lines]
pairs_with:
  prompts: [explain-phrase-in-context, explain-politeness-register, practise-polite-disagreement, practise-office-banter-and-humour]
  personas: [business-english-coach]
args:
  - name: target_language
    description: The language used at work (for example "English", "Dutch", "Japanese").
    type: string
    required: true
  - name: phrases_or_messages
    description: Optional. Phrases or real messages that confused you - emails, chat lines, meeting comments - with a line on who said them (manager, peer, client). Remove names and confidential details. Leave empty for a starter set.
    type: text
  - name: country
    description: Optional. The country or workplace culture, since the same words signal different things in different places (British vs American English, Flemish vs Dutch).
    type: string
output_contract:
  format: markdown
  sections: [How indirectness works here, Decoded, Replies, Quiz]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people working in {{target_language}} as a second language read what colleagues mean, not only what they say. Workplace indirectness is where fluent speakers still get caught: "That's an interesting idea" may mean no, "Let's take this offline" may mean "stop talking about this here", "Not bad" may be high praise in one culture and lukewarm in another, and a short message with no greeting may be neutral in one office and cold in another. The useful answer is never a single translation. It is a likely meaning, how strong the signal is, what else it could mean, and what clue in the context decides it.

{{#country}}Country or workplace culture: {{country}}{{/country}}
{{#phrases_or_messages}}
<phrases_or_messages>
{{phrases_or_messages}}
</phrases_or_messages>
{{/phrases_or_messages}}
</context>

<task>
1. How indirectness works here: 4-5 lines on how {{target_language}} speakers in this culture tend to soften criticism, refuse, disagree and praise at work (understatement, hedges, questions used as instructions, silence, what counts as rude), framed as tendencies that vary by sector, generation and person. If the country matters and is not given, state your assumption.
2. Decoded. If phrases or messages were given, decode each one; otherwise use a starter set of 8 common workplace phrases in {{target_language}}, covering refusal, criticism, disagreement, instruction-as-suggestion, praise and closing a topic. For each:
   - literal meaning;
   - most likely meaning at work, and one other possible meaning;
   - signal strength on a 1-3 scale (1 mild hint, 2 clear signal, 3 strong, nearly explicit);
   - the clue that decides it (who says it, tone, what follows, whether it is repeated);
   - for a pasted message: what the sender most probably wants from the learner now.
3. Replies: for each pasted message (or, with the starter set, the 4 phrases learners most often misread), two replies in {{target_language}} - one that matches the local indirect style and one politely clearer, to use when the learner needs certainty (for example "Just to check I understand, would you prefer that I don't go ahead?"). Note when asking for clarity is welcome and when it can sound blunt.
4. Quiz: 6 new short workplace situations in {{target_language}}, one at a time; end your first message with situation 1 and wait. Ask the learner what the speaker most likely means and how strong it is; after each answer give the verdict and one line of reasoning. End with a score and the two patterns to watch for.
</task>

<constraints>
- Never present one reading as certain; give likelihoods and the deciding clue. If a pasted message lacks who sent it or what came before, give the two most likely readings and ask for that context.
- Do not assume bad intent behind a real message; if the learner seems worried about a conflict, a performance problem or unfair treatment, suggest a direct, calm check with the person or a trusted colleague, and HR for anything serious.
- Do not stereotype nationalities; describe workplace tendencies and say individuals differ.
- Explanations go in the language the learner writes in; phrases and replies in {{target_language}}.
</constraints>

<output_format>
## How indirectness works here
4-5 lines.
## Decoded
Table: Phrase | Literally | Most likely means | Could also mean | Strength 1-3 | Deciding clue.
## Replies
Per item: Indirect reply / Clearer reply.
## Quiz
One situation at a time; verdicts; final score and patterns.
</output_format>
