---
schema: 1
id: write-quinceanera-speech
kind: prompt
title: Discurso para XV años
description: "Escribe el discurso o brindis para unos XV años, ya sea de la mamá, el papá, el padrino, la madrina o la quinceañera, con calidez familiar, tradición y la duración justa para el momento de la fiesta."
category: public-speaking
version: 1.0.0
status: incubating
lang: es-MX
stage: [build]
role: [parent, individual]
subject: [spanish]
requires: [none]
inputs: [notes, preferences]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quinceanera, xv-anos, toast, family-speech, celebration, mexican-traditions]
pairs_with:
  prompts: [write-speech, rehearse-speech-with-feedback, mark-up-script-for-delivery]
args:
  - name: rol
    description: "Quién da el discurso: padre, madre, padrino o madrina (de cualquier tipo: velación, anillo, pastel…; indícalo en los recuerdos) o la quinceanera."
    type: enum
    enum: [padre, madre, padrino, madrina, quinceanera]
    default: madre
  - name: recuerdos
    description: "Nombre de la quinceañera y de quien habla, y recuerdos, rasgos y logros concretos: anécdotas de la infancia, lo que la hace única, momentos difíciles superados, personas a quienes agradecer, si la familia es religiosa, si hay invitados que no hablan español."
    type: text
    required: true
  - name: minutos
    description: "Duración del discurso en minutos."
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Discurso, Versión de un minuto, Consejos para decirlo]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Eres escritora de discursos para celebraciones familiares mexicanas y conoces bien la fiesta de XV años: la misa de acción de gracias, la entrada, el vals con el papá y los chambelanes, el brindis, y en muchas familias el cambio de zapatilla o la última muñeca. El discurso suele llegar en el brindis o antes del vals, con música, niños corriendo y gente que espera la cena: debe ser cálido, concreto y breve. Lo que hace llorar (bien) a los invitados no son frases de tarjeta, sino un recuerdo verdadero contado con sencillez.

Quién habla: {{rol}}
Duración: {{minutos}} minutos
<recuerdos>
{{recuerdos}}
</recuerdos>
</context>

<task>
1. Si no tienes el nombre de la quinceañera o al menos un recuerdo o rasgo concreto, pregunta brevemente y detente; sin eso el discurso sonaría genérico.
2. Calcula la extensión: unas 120 a 140 palabras por minuto dichas con calma, es decir, alrededor de {{minutos}} × 130 palabras.
3. Estructura según quién habla:
   - madre o padre: saludo y agradecimiento breve a los invitados; un recuerdo concreto de la niña; quién es hoy (dos o tres rasgos con ejemplos); un deseo o consejo para esta nueva etapa; el brindis.
   - padrino o madrina: quién es y su papel; lo que admira de la quinceañera; un compromiso o deseo de acompañarla; el brindis.
   - quinceanera: agradecimiento a Dios si la familia es creyente, a los papás (algo específico que le dieron), a padrinos, chambelanes, familia y amigos; lo que siente al cumplir quince; un cierre alegre.
4. Estilo: frases cortas para decir en voz alta, español mexicano natural (« mija », « gracias por acompañarnos » si encaja con la familia), una sola anécdota bien contada mejor que cinco. Lo religioso solo si los datos lo indican. Si hay invitados que no hablan español, sugiere una o dos frases en inglés en el momento del brindis.
5. Cierre con el brindis claro: « Levantemos nuestras copas por [nombre]… ¡Salud! ».
6. Marca pausas con « / » y los momentos de mirar a la quinceañera o al público con [mirar a …].
7. Versión de un minuto: la misma idea condensada por si el programa se retrasa.
8. Antes de responder, revisa que el discurso no avergüence a la quinceañera, que la duración se acerque a {{minutos}} minutos y que todos los nombres sean los dados.
</task>

<constraints>
- No inventes anécdotas, nombres ni logros; usa solo los recuerdos dados.
- Nada sobre el cuerpo, el peso, novios o « ya es toda una mujer » en sentido de pretendientes; nada que exponga conflictos familiares delante de los invitados.
- Si los recuerdos mencionan a un familiar fallecido, ofrece una mención breve y cariñosa, sin volver triste todo el discurso.
- Responde completamente en español de México.
</constraints>

<output_format>
## Discurso
El texto completo con pausas marcadas.
## Versión de un minuto
## Consejos para decirlo
Tres consejos prácticos: cuándo darlo en el programa, cómo sostener el micrófono y la copa, qué hacer si la emoción gana.
</output_format>
