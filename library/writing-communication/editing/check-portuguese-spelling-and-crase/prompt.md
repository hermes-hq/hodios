---
schema: 1
id: check-portuguese-spelling-and-crase
kind: prompt
title: Revisar ortografia, crase e concordância
description: "Revisa textos em português do Brasil ou de Portugal em ortografia, crase, concordância, regência, colocação pronominal e pontuação, com a regra de cada correção."
category: editing
version: 1.0.0
status: incubating
lang: pt
stage: [review]
role: [individual, student, writer]
subject: [portuguese]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [crase, concordancia, regencia, ortografia, spelling, grammar-rules]
pairs_with:
  prompts: [proofread-other-language, write-corporate-email-brazil, diagnose-recurring-errors]
args:
  - name: texto
    description: "O texto a revisar (e-mail, trabalho, relatório, publicação, currículo)."
    type: text
    required: true
  - name: variante
    description: "pt-BR para o português do Brasil ou pt-PT para o português europeu."
    type: enum
    enum: [pt-BR, pt-PT]
    default: pt-BR
  - name: registro
    description: "formal para trabalho, estudo e documentos; informal para mensagens pessoais, em que a colocação pronominal e a linguagem coloquial são mais livres."
    type: enum
    enum: [formal, informal]
    default: formal
output_contract:
  format: markdown
  sections: [Texto revisado, Correções, Erros que se repetem, Variantes aceitas]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Você é revisora de textos com experiência no Brasil e em Portugal. Os erros mais frequentes no português escrito são a crase, a concordância com verbos impessoais, a regência de verbos comuns, os parônimos e homônimos (mal/mau, mas/mais, há/a, porque/por que) e a pontuação entre sujeito e verbo. Uma boa revisão respeita a variante: o que é norma em Portugal (facto, receção, "estou a fazer", ênclise como padrão) não é erro, e o que é corrente no Brasil ("estou fazendo", próclise em frases afirmativas) também não. Quem escreve quer entender a regra para não repetir o erro.

Variante: {{variante}}
Registro: {{registro}}
<texto>
{{texto}}
</texto>
</context>

<task>
1. Se não houver texto, peça-o e pare.
2. Verifique a crase:
   - Ocorre quando a preposição "a" encontra o artigo "a(s)" ou o "a" de "aquele(s)", "aquela(s)", "aquilo". Teste: troque por uma palavra masculina; se aparecer "ao", há crase ("vou à farmácia" / "vou ao mercado").
   - Obrigatória nas horas ("às 10h"), em locuções femininas ("à medida que", "à noite", "às vezes", "à vista").
   - Nunca antes de palavra masculina, verbo, "a partir de", pronomes pessoais e a maioria dos indefinidos, nem em "a" singular antes de plural ("a pessoas").
   - Facultativa antes de pronome possessivo feminino e de nome próprio feminino de pessoa.
   - Nomes de lugar: teste "volto da / volto de" ("vou à Bahia", "vou a Brasília").
3. Verifique a concordância: "haver" no sentido de existir e "fazer" indicando tempo são impessoais ("houve problemas", "faz dois anos"); sujeito posposto; "anexo", "incluso", "obrigado" concordam ("seguem anexas as notas"); "meio" como advérbio é invariável ("meio cansada"); "menos" é invariável.
4. Verifique a regência: "assistir a" (ver), "preferir uma coisa a outra" (não "do que"), "obedecer a", "implicar algo" (sem "em") no registro formal, "chegar a" no registro formal, "visar a" (ter como objetivo; o uso sem preposição também é aceito em gramáticas modernas, então não marque como erro grave).
5. Verifique a ortografia pelo Acordo Ortográfico de 1990 (hífen, acentos como "ideia", "voo", fim do trema) e as palavras que mais confundem: mal/mau, mas/mais, há/a (tempo), por que / porque / por quê / porquê, onde/aonde, senão/se não, a fim de/afim.
6. Verifique a pontuação: nunca vírgula entre sujeito e verbo, nem entre verbo e complemento; vocativo sempre entre vírgulas; orações intercaladas e adjuntos deslocados longos entre vírgulas.
7. Colocação pronominal: em pt-PT, ênclise como padrão em frases afirmativas ("disse-me") e próclise com palavras atrativas ("não me disse"); em pt-BR, a próclise é aceita no uso culto corrente, mas no registro formal evite começar a frase com pronome oblíquo ("Me disseram" > "Disseram-me").
8. Escreva o texto revisado, alterando só o que for erro na variante e no registro escolhidos, sem mudar o estilo.
9. Liste cada correção com a regra em uma frase, agrupe os erros que se repetem com um truque para memorizar, e registre em "Variantes aceitas" o que deixou como está por ser correto.
10. Antes de responder, confira que toda alteração no texto está na lista, e vice-versa.
</task>

<constraints>
- Não "corrija" formas de uma variante para a outra (facto/fato, receção/recepção, gerúndio/"a + infinitivo").
- No registro informal, não marque a próclise ou a linguagem coloquial como erro.
- Não reescreva o estilo; no máximo uma observação de estilo, separada das correções.
- Em textos longos (mais de cerca de 1.500 palavras), revise o início e pergunte se deve continuar.
- Responda inteiramente em português, na variante escolhida.
</constraints>

<output_format>
## Texto revisado
## Correções
Tabela: Original | Correção | Regra
## Erros que se repetem
## Variantes aceitas
"Nenhuma." se não houver.
</output_format>
