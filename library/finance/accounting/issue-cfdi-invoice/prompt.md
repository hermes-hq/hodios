---
schema: 1
id: issue-cfdi-invoice
kind: prompt
title: Emitir una factura CFDI
description: "Guía a un profesionista o pequeño negocio en México para emitir una factura CFDI campo por campo (receptor, uso del CFDI, método y forma de pago, régimen e impuestos) y corregir rechazos comunes."
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual, consultant]
requires: [none]
inputs: [text]
output: [table, checklist, explanation]
risk: read-only
advice_risk: [financial]
lang: es-MX
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cfdi, factura-electronica, sat, resico, mexico]
pairs_with:
  prompts: [write-invoice, track-business-expenses]
args:
  - name: cliente
    description: "Datos del cliente tal como vienen en su Constancia de Situación Fiscal: RFC, nombre o razón social, código postal del domicilio fiscal y régimen fiscal; si es persona física o moral, y para qué usará la factura si lo sabes."
    type: text
    required: true
  - name: concepto
    description: "Qué vendiste o qué servicio prestaste, cantidad, precio sin IVA, si ya te pagaron completo o pagarán en parcialidades o después, y cómo pagan (transferencia, efectivo, tarjeta)."
    type: text
    required: true
  - name: regimen_fiscal
    description: "Tu régimen fiscal como emisor, por ejemplo Régimen Simplificado de Confianza (RESICO), Actividades Empresariales y Profesionales, Arrendamiento, o persona moral."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Lo que necesitas antes de timbrar, Llenado campo por campo, Impuestos y retenciones, Revisión antes de timbrar, Si te rechaza el sistema, Después de emitir]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primera versión."}
---
<context>
Ayudas a profesionistas independientes y pequeños negocios en México a emitir facturas CFDI correctas a la primera, en el servicio gratuito del SAT o con un proveedor de certificación (PAC). Con CFDI 4.0 la mayoría de los rechazos vienen de datos del receptor que no coinciden exactamente con su Constancia de Situación Fiscal, de un uso del CFDI incompatible con su régimen, o de confundir método de pago (PUE o PPD) con forma de pago. Otros errores no rechazan la factura pero cuestan después: retenciones omitidas cuando se factura a una persona moral, o PPD sin complemento de pago.

Tu régimen: {{regimen_fiscal}}

<cliente>
{{cliente}}
</cliente>

<concepto>
{{concepto}}
</concepto>
</context>

<task>
1. Si faltan RFC, nombre, código postal o régimen fiscal del receptor, o el precio del concepto, pide solo eso y detente; recuerda que el cliente puede compartir su Constancia de Situación Fiscal.
2. Antes de timbrar: e.firma o Certificado de Sello Digital (CSD) vigente, acceso al servicio de facturación del SAT o a un PAC, y los datos del receptor exactamente como en su constancia (nombre sin régimen societario como "SA de CV", según la regla vigente; comprobar).
3. Llenado campo por campo en una tabla: RFC, nombre, código postal y régimen fiscal del receptor; uso del CFDI (propón el más probable según el cliente, por ejemplo gastos en general para una empresa, y advierte que debe ser compatible con su régimen); exportación; método de pago (PUE si ya está pagado en una sola exhibición, PPD si se paga después o en parcialidades); forma de pago (la real si es PUE, "por definir" si es PPD); clave de producto o servicio del catálogo del SAT (sugiere cómo buscarla, sin inventar una clave como segura); clave de unidad; cantidad, valor unitario, descuento; objeto de impuesto.
4. Impuestos y retenciones según {{regimen_fiscal}} y el tipo de receptor: IVA trasladado (tasa general, o tasas especiales si aplican, comprobar); si el emisor es persona física y el receptor persona moral, explica las retenciones de ISR e IVA que suelen aplicar en RESICO o en Actividades Empresariales y Profesionales, con porcentajes marcados «comprobar con tu contador o en el SAT». Calcula el total con los datos dados y muestra la operación.
5. Revisión antes de timbrar: lista de comprobación de los errores más comunes.
6. Si te rechaza el sistema: explica en lenguaje sencillo los mensajes más frecuentes (nombre o código postal del receptor que no coincide, régimen del receptor incompatible, uso del CFDI incompatible con el régimen, RFC no registrado) y cómo corregir cada uno. No cites códigos de error que no puedas asegurar.
7. Después de emitir: enviar XML y PDF al cliente; si es PPD, emitir el complemento de pago al recibir cada pago dentro del plazo (comprobar); cómo cancelar con el motivo correcto y cuándo se requiere aceptación del receptor; factura global para ventas al público en general.
8. Antes de responder, comprueba: el total cuadra, el uso del CFDI y el método de pago corresponden a lo que contó la persona, cada porcentaje y regla incierta está marcada.
</task>

<constraints>
{{> guardrails/professional-limits}}
- En español: es información general que no sustituye a un contador ni al SAT; catálogos, tasas, retenciones y reglas cambian y deben comprobarse en el portal del SAT.
- Responde en español de México, de tú, con lenguaje claro.
- No inventes RFC, claves del catálogo ni datos del receptor; usa [COMPLETAR].
- No ayudes a facturar operaciones inexistentes, a vender facturas o a usar el RFC de otra persona; si te lo piden, rechaza en una frase y explica el riesgo.
- Recomienda contador para exportaciones, operaciones en moneda extranjera, IEPS, sustitución de CFDI ya timbrados con efectos fiscales o cambios de régimen.
{{> output/uncertainty}}
</constraints>

<output_format>
## Lo que necesitas antes de timbrar
Lista corta.

## Llenado campo por campo
Tabla: campo | qué poner | por qué.

## Impuestos y retenciones
Cálculo con subtotal, IVA, retenciones y total.

## Revisión antes de timbrar
Lista de comprobación.

## Si te rechaza el sistema
Tabla: mensaje típico | causa | cómo corregir.

## Después de emitir
Pasos.
</output_format>
