---
schema: 1
id: write-spanish-business-email
kind: prompt
title: Redactar un correo profesional en español
description: "Redacta correos profesionales en español con el saludo, el trato de usted o tú, la estructura y la despedida adecuados al país y a la relación: solicitudes, seguimientos, disculpas, rechazos y citas."
category: email
version: 1.0.0
status: incubating
lang: es
stage: [build]
role: [individual, manager, sales-rep]
subject: [spanish]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [correo-profesional, tuteo-ustedeo, saludo-y-despedida, business-spanish, latam-espana]
pairs_with:
  prompts: [correct-spanish-accents-and-spelling, write-corporate-email-brazil, write-follow-up-email]
args:
  - name: proposito
    description: "Para qué es el correo: solicitud, seguimiento, rechazo, cita (proponer o cambiar una reunión), disculpa o informacion."
    type: enum
    enum: [solicitud, seguimiento, rechazo, cita, disculpa, informacion]
    default: solicitud
  - name: destinatario
    description: "A quién va y cuál es la relación: nombre, cargo, empresa, si es cliente, proveedor, jefe o colega, si es el primer contacto y si ya se tutean (por ejemplo «Lic. Martha Ríos, gerente de compras de un cliente en Monterrey, primer contacto»)."
    type: string
    required: true
  - name: pais
    description: "País del destinatario (España, México, Colombia, Argentina, Chile, Perú, etc.); cambia el trato, los títulos y algunas fórmulas."
    type: string
  - name: contenido
    description: "Lo que quiere decir o conseguir con todos los datos: fechas, plazos, importes, números de pedido o expediente, y quién firma con su cargo y empresa. Puede escribirlo en español, inglés o mezclado."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Asunto, Correo, Notas sobre el tono, Antes de enviar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
El español profesional cambia según el país. En España el tuteo es habitual entre colegas e incluso con clientes de confianza, y el tono suele ser directo («Buenos días, Javier:»). En México, Colombia, Perú y buena parte de Latinoamérica el usted y los títulos profesionales («Lic.», «Ing.», «Dr.») pesan más en el primer contacto, y un saludo cordial antes del asunto se considera cortesía, no relleno. En Argentina y Uruguay el voseo es normal en lo informal, pero en un correo profesional a alguien desconocido se usa usted. Errores frecuentes: «Estimado Sr. García,» con coma (la norma es dos puntos tras el saludo), mezclar tú y usted en el mismo correo, calcos del inglés («aplicar a un puesto», «Espero que este correo le encuentre bien»), el gerundio de posterioridad y las despedidas anticuadas («Sin otro particular, me despido atentamente…»). Un buen correo pone el motivo en las primeras líneas y las fechas y montos de forma explícita.
</context>

<task>
Redacta un correo profesional en español. Propósito: {{proposito}}. Destinatario: {{destinatario}}.{{#pais}} País: {{pais}}.{{/pais}}

<contenido>
{{contenido}}
</contenido>

1. Si falta algo imprescindible para el propósito (en solicitud: qué y para cuándo; en seguimiento: fecha del primer mensaje; en rechazo: qué se rechaza; en disculpa: qué pasó y qué se hará), haz hasta tres preguntas breves y detente. Si solo falta el nombre o la empresa de quien firma, usa [marcadores].
2. Trato: elige usted o tú según país y relación; si no se sabe el país o es primer contacto, usa usted. Explica la elección en las notas.
3. Asunto concreto con número de pedido, expediente o fecha si existe.
4. Saludo con dos puntos: «Estimada Sra. Ríos:», «Estimado Ing. Pérez:» (título si se conoce y se usa en ese país), «Buenos días, Javier:» en trato cercano. «Estimados señores:» solo si no hay nombre.
5. Primera o segunda frase: el motivo. En Latinoamérica, si es primer contacto, una sola línea cordial antes está bien.
6. Según el propósito:
   - solicitud: petición clara con «¿Podría…?» o «Le agradecería que…», plazo con fecha y motivo.
   - seguimiento: referencia al mensaje anterior con fecha, sin reproche, nuevo plazo.
   - rechazo: agradecimiento, el no claro en la segunda frase, motivo breve si se quiere, puerta abierta si es real.
   - cita: dos o tres opciones concretas con día, fecha, hora, zona horaria si aplica y formato.
   - disculpa: qué pasó, una disculpa, la solución y el siguiente paso; sin excusas.
   - informacion: lo esencial primero y qué debe hacer el destinatario.
7. Despedida natural: «Saludos cordiales», «Un saludo» (España), «Quedo atento/a a sus comentarios» solo si se espera respuesta. Firma con [marcadores] si faltan datos.
</task>

<constraints>
- Escribe todo en español, aunque la entrada esté en inglés. Notas también en español.
- No inventes datos, fechas, importes, nombres ni títulos; usa [marcadores].
- Ortografía y tildes correctas, signos de apertura (¿ ¡), fechas como «15 de noviembre de 2026», cifras con el separador habitual del país indicado.
- Sin calcos del inglés ni fórmulas arcaicas; un solo trato en todo el correo.
- Cuerpo en general por debajo de unas 150 palabras.
</constraints>

<output_format>
## Asunto
Una línea.
## Correo
Saludo, cuerpo, despedida y firma.
## Notas sobre el tono
Dos a cuatro puntos: trato, saludo, despedida, alguna expresión que cambia por país.
## Antes de enviar
Marcadores, adjuntos y plazos por revisar.
</output_format>
