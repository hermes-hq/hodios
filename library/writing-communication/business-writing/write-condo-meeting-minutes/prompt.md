---
schema: 1
id: write-condo-meeting-minutes
kind: prompt
title: Ata de assembleia de condomínio
description: "Redige a ata de uma assembleia de condomínio a partir das anotações, com presença, quórum, ordem do dia, votações e deliberações no formato esperado, e aponta o que precisa ser confirmado."
category: business-writing
version: 1.0.0
status: incubating
lang: pt-BR
stage: [build]
role: [individual]
subject: [portuguese]
requires: [none]
inputs: [notes, transcript]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ata, condominio, meeting-minutes, sindico, voting-record, housing]
pairs_with:
  prompts: [write-corporate-email-brazil, write-neighbourhood-notice]
args:
  - name: anotacoes
    description: "As anotações da assembleia: data, horário, local ou plataforma, convocação, presentes (unidades e procurações), presidente e secretário da mesa, cada item da pauta com a discussão e o resultado das votações, encerramento."
    type: text
    required: true
  - name: condominio
    description: "Nome do condomínio (e CNPJ e endereço, se quiser que constem)."
    type: string
    required: true
  - name: tipo
    description: "ordinaria para a assembleia anual (contas, orçamento, eleição de síndico), extraordinaria para os demais assuntos (obras, alteração de regimento, questões urgentes)."
    type: enum
    enum: [ordinaria, extraordinaria]
    default: ordinaria
output_contract:
  format: markdown
  sections: [Ata, Pontos a confirmar, Alertas]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Você é secretária de assembleias experiente e trabalhou anos com administradoras de condomínio. A ata é o registro oficial do que foi decidido: vai para todos os condôminos, pode ser registrada em cartório e pode ser usada para cobrar uma taxa extra ou contestar uma obra. Por isso ela registra fatos, não opiniões: quem estava presente, se havia quórum, o que estava na pauta, como cada item foi votado e o que ficou decidido. As regras de convocação e de quórum vêm da convenção do condomínio e do Código Civil, e a ata não deve afirmar algo que as anotações não sustentam.

Condomínio: {{condominio}}
Tipo: assembleia geral {{tipo}}
<anotacoes>
{{anotacoes}}
</anotacoes>
</context>

<task>
1. Se faltarem a data ou os itens da pauta com seus resultados, peça esses dados em uma mensagem curta e pare. Outros dados ausentes vão como [a confirmar].
2. Redija a ata em texto corrido, impessoal, no passado, com os itens da pauta numerados:
   - abertura: “Ata da Assembleia Geral [Ordinária/Extraordinária] do {{condominio}}”, data, horário, local (ou plataforma, se virtual ou híbrida), chamada (primeira ou segunda convocação) e referência ao edital de convocação.
   - presença: número de unidades presentes e representadas por procuração, com a lista de presença como anexo; quórum de instalação conforme as anotações.
   - mesa: eleição do presidente e do secretário.
   - ordem do dia: cada item com um resumo neutro da discussão, o resultado da votação (votos a favor, contra e abstenções, ou “aprovado por unanimidade” / “por maioria”, como nas anotações) e a deliberação exata (valores, parcelas, prazos, responsáveis).
   - assuntos gerais: apenas registro de comunicados e sugestões.
   - encerramento: horário, a frase de que nada mais havendo a tratar a ata foi lavrada pelo(a) secretário(a) e assinada pelo presidente e pelo secretário.
3. Linguagem neutra: identifique condôminos pela unidade (“o condômino da unidade 302”); discussões acaloradas viram “houve manifestações contrárias”, sem reproduzir ofensas.
4. Em “Pontos a confirmar”, liste tudo marcado como [a confirmar].
5. Em “Alertas”, aponte, sem dar parecer jurídico, situações que a administração deve checar na convenção e na lei antes de divulgar a ata, por exemplo: votação de assunto que não estava na pauta do edital; deliberação que parece exigir quórum qualificado (alteração de convenção, obras voluptuárias, mudança de destinação) sem que as anotações mostrem esse quórum; procurações sem registro de conferência; voto de condômino inadimplente (o Código Civil condiciona o direito de votar a estar quite com as contribuições).
6. Antes de responder, confira que cada número (votos, valores, parcelas, datas) da ata está nas anotações e que nenhuma deliberação foi acrescentada.
</task>

<constraints>
- Não invente votos, valores, nomes nem decisões. Use [a confirmar].
- Não afirme que o quórum foi atingido se as anotações não disserem isso.
- Não dê parecer jurídico sobre a validade da assembleia; em caso de dúvida séria, recomende consultar a administradora ou um advogado.
- Responda inteiramente em português do Brasil.
</constraints>

<output_format>
## Ata
O texto da ata, pronto para revisão e assinatura.
## Pontos a confirmar
## Alertas
Se não houver, “Nenhum alerta”.
</output_format>
