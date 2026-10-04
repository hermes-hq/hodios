---
schema: 1
id: write-menu-del-dia-board
kind: prompt
title: Pizarra del menú del día
description: "Redacta la pizarra del menú del día de un bar o restaurante en España y su publicación para redes: primeros, segundos, postre, bebida y precio, con nombres cortos y apetecibles y alérgenos."
category: copywriting
version: 1.0.0
status: incubating
lang: es
stage: [build]
role: [founder]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [copy, post, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [menu-del-dia, chalkboard, allergens, spain]
pairs_with:
  prompts: [write-menu-descriptions, write-local-business-facebook-posts]
args:
  - name: platos
    description: Los platos de hoy con sus ingredientes principales, separados en primeros, segundos y postres, y qué incluye el menú (pan, bebida, café). Si un plato tiene suplemento, indícalo.
    type: text
    required: true
  - name: precio
    description: Precio del menú, IVA incluido (por ejemplo "13,50 euros"), y si cambia según el día o si hay medio menú.
    type: string
    required: true
  - name: alergenos
    description: Alérgenos de cada plato según la ficha de cocina (de los 14 de declaración obligatoria) y avisos de contaminación cruzada. Opcional; sin estos datos no se indica ningún alérgeno.
    type: text
output_contract:
  format: markdown
  sections: [Pizarra, Publicación para redes, Alérgenos, A confirmar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primera versión."}
---
<context>
Ayudas a bares y restaurantes de España a escribir su menú del día. El cliente de mediodía lee la pizarra desde la puerta o la barra en unos segundos: necesita ver rápido qué hay de primero y de segundo, si entra postre o café, la bebida y el precio. En redes y estados de mensajería la publicación tiene que hacer lo mismo en una imagen o unas pocas líneas, y salir antes de las doce.

Cómo se escribe bien:
- Nombres cortos y reconocibles, con el ingrediente estrella y la elaboración: "Lentejas estofadas con chorizo", "Merluza a la romana", "Arroz con leche casero". Sin adjetivos de relleno.
- Orden fijo: primeros, segundos, postres, y al final qué incluye (pan, bebida, café) y el precio con IVA incluido. Los suplementos, junto al plato.
- Una pizarra tiene poco espacio: cuatro o cinco opciones por bloque como mucho, una línea por plato.
- Alérgenos: el Reglamento (UE) 1169/2011 obliga a informar de los 14 alérgenos de declaración obligatoria también en comida sin envasar, y en España el Real Decreto 126/2015 permite hacerlo por escrito en la carta o pizarra o tener la información disponible y avisarlo de forma visible. Solo se indican los alérgenos que constan en la ficha de cocina.
- "Casero", "de temporada", "del día" o "de lonja" son afirmaciones: solo si la cocina lo confirma.
</context>

<task>
Prepara la pizarra y la publicación del menú de hoy.

<platos>
{{platos}}
</platos>

Precio: {{precio}}

{{#alergenos}}
<alergenos>
{{alergenos}}
</alergenos>
{{/alergenos}}

1. Si no está claro qué platos son primeros y cuáles segundos, o falta lo que incluye el menú, pregúntalo en un solo mensaje y para.
2. Reescribe cada plato con un nombre corto y apetecible, una línea por plato, conservando el nombre de la casa si lo tiene.
3. Monta la pizarra en el orden primeros, segundos, postres, qué incluye y precio {{precio}}. Añade la frase de alérgenos que corresponda.
4. Escribe una publicación breve para redes o estado de mensajería: una línea de entrada, el menú resumido, precio, horario si se indica y una llamada a reservar o pasar.
5. Si hay datos de alérgenos, haz la tabla por plato usando los nombres de los 14 alérgenos oficiales; si no los hay, no pongas ninguno y escribe el aviso "Consulte al personal sobre alérgenos e intolerancias".
6. Revisa: precio idéntico en pizarra y publicación, ningún alérgeno ni ingrediente inventado, ningún plato marcado como "sin gluten" o "vegano" sin datos.
</task>

<constraints>
- Ningún ingrediente, procedencia o técnica que no esté en los platos.
- No declares un plato "sin gluten", "sin lactosa" o "vegano" si los datos no lo dicen, y menciona cualquier aviso de contaminación cruzada.
- Nada de relleno ("delicioso", "exquisito", "espectacular"); como mucho una palabra que dé apetito por plato.
- Español de España, tono cercano de barrio. Emojis solo en la publicación y con moderación.
</constraints>

<output_format>
## Pizarra
El texto de la pizarra, línea a línea, tal como se escribiría.

## Publicación para redes
El texto listo para publicar.

## Alérgenos
Tabla: Plato | Alérgenos, o el aviso para consultar al personal.

## A confirmar
Datos de alérgenos que faltan, afirmaciones que la cocina debe confirmar y dudas. "Nada" si está completo.
</output_format>
