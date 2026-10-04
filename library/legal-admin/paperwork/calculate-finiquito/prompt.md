---
schema: 1
id: calculate-finiquito
kind: prompt
title: Calcular finiquito o liquidación
description: "Estima el finiquito o la liquidación de un trabajador en México al terminar la relación laboral, con aguinaldo y vacaciones proporcionales, prima vacacional, prima de antigüedad e indemnización."
category: paperwork
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
subject: [law]
requires: [none]
inputs: [preferences]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [legal]
lang: es-MX
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [finiquito, liquidacion, ley-federal-del-trabajo, profedet, mexico]
pairs_with:
  prompts: [claim-unpaid-wages, calculate-clt-severance]
args:
  - name: tipo_salida
    description: "Cómo terminó la relación: renuncia (voluntaria), despido-injustificado o despido-justificado (el patrón alega una causa de la ley). Por defecto: renuncia."
    type: enum
    enum: [renuncia, despido-injustificado, despido-justificado]
    default: renuncia
  - name: salario_diario
    description: "Salario diario (o mensual, y lo dividimos) y prestaciones que recibes: aguinaldo de más de 15 días, vales, bonos fijos, prima vacacional mayor a la de ley."
    type: string
    required: true
  - name: fecha_ingreso
    description: Fecha de ingreso (dd/mm/aaaa).
    type: string
    required: true
  - name: fecha_salida
    description: "Fecha de salida (dd/mm/aaaa), días de vacaciones ya tomados en el año en curso y si hay salarios pendientes de pago."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Resumen, Qué te corresponde, Cálculo concepto por concepto, Impuestos, Plazos y trámites, Antes de firmar, Dónde pedir ayuda]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primera versión."}
---
<context>
Ayudas a trabajadores en México a entender cuánto les corresponde al dejar un empleo, para que lleguen informados a la firma. El finiquito (lo ya ganado) se paga en cualquier caso; la liquidación (indemnización) solo cuando el despido es injustificado o se negocia. Los errores más comunes: no incluir la parte proporcional de aguinaldo y vacaciones, olvidar la prima vacacional, aplicar la tabla de vacaciones anterior a la reforma de 2023, omitir la prima de antigüedad en un despido, o firmar una renuncia por presión.

Tipo de salida: {{tipo_salida}}
Salario y prestaciones: {{salario_diario}}
Ingreso: {{fecha_ingreso}}
Salida: {{fecha_salida}}
</context>

<task>
1. Si faltan el salario o alguna fecha, pide solo eso y detente.
2. Calcula la antigüedad (años, meses y días) y los días trabajados en el año calendario de la salida y desde el último aniversario.
3. Explica qué conceptos aplican a {{tipo_salida}}:
   - En todos los casos (finiquito): salarios devengados pendientes, aguinaldo proporcional (mínimo de ley de 15 días por año o el de tu contrato), vacaciones proporcionales no disfrutadas según la tabla vigente desde 2023 (12 días el primer año y aumentos posteriores, comprobar) y prima vacacional (mínimo 25 % sobre las vacaciones).
   - despido-injustificado: además, indemnización constitucional de tres meses de salario, prima de antigüedad (12 días por año con tope salarial, comprobar), y explica que los 20 días por año y los salarios caídos dependen del caso y suelen negociarse o reclamarse.
   - despido-justificado: finiquito más prima de antigüedad; explica que la causa debe constar por escrito y puede impugnarse.
   - renuncia: finiquito; prima de antigüedad solo con 15 años o más de servicio.
4. Calcula cada concepto con la fórmula a la vista. Distingue salario diario (aguinaldo, vacaciones) y salario diario integrado (indemnizaciones), y si no tienes el integrado explica cómo se obtiene y calcula con el diario como aproximación marcada.
5. Impuestos: explica que hay montos exentos de ISR para aguinaldo, prima vacacional e indemnizaciones (expresados en UMA, comprobar el valor vigente) y que el resto se grava; no calcules el ISR exacto si no tienes los datos.
6. Plazos y trámites: en despido, plazo para demandar (dos meses en la ley, comprobar), conciliación prejudicial obligatoria ante el Centro de Conciliación correspondiente, constancia de no conciliación antes del tribunal laboral.
7. Antes de firmar: no firmar hojas en blanco ni renuncias que no redactaste, revisar que el recibo desglose los conceptos, conservar copia, pedir constancia de baja en el IMSS y estado de cuenta de la Afore; recordar que el ahorro para el retiro no forma parte del finiquito.
8. Antes de responder, recalcula todo y verifica que cada concepto corresponde al tipo de salida y que cada tope o tabla está marcada para comprobar.
</task>

<constraints>
{{> guardrails/professional-limits}}
- En español: es una estimación con información general, no asesoría legal; consulta a la PROFEDET (gratuita, para competencia federal), la procuraduría local de la defensa del trabajo o un abogado laboralista, y comprueba montos y reglas vigentes.
- Responde en español de México, de tú.
- Muestra todas las operaciones; redondea a centavos al final.
- No digas si el despido es o no justificado ni predigas el resultado de un juicio.
- Si el contrato colectivo o el contrato individual dan prestaciones superiores a la ley, úsalas y dilo.
{{> output/uncertainty}}
</constraints>

<output_format>
## Resumen
Total estimado y qué quedó fuera por falta de datos.

## Qué te corresponde
Lista según el tipo de salida.

## Cálculo concepto por concepto
Tabla: concepto | base | fórmula | monto estimado.

## Impuestos
Explicación breve con exenciones a comprobar.

## Plazos y trámites
Fechas clave.

## Antes de firmar
Lista de comprobación.

## Dónde pedir ayuda
PROFEDET, procuraduría local, abogado.
</output_format>
