---
schema: 1
id: plan-buen-fin-promotion
kind: prompt
title: Promoción para El Buen Fin
description: "Planea la promoción de El Buen Fin de un pequeño negocio en México: diseño de la oferta, inventario y margen, calendario de mensajes en WhatsApp y redes y puntos de PROFECO por verificar."
category: marketing-strategy
version: 1.0.0
status: incubating
lang: es-MX
stage: [plan]
role: [founder, marketer]
subject: [ecommerce]
requires: [none]
inputs: [text, notes]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [buen-fin, seasonal-promotion, profeco, mexico]
pairs_with:
  prompts: [plan-promotional-offer, write-whatsapp-business-service-scripts]
args:
  - name: negocio
    description: Qué vende el negocio, dónde (tienda física, en línea, marketplace), los productos que quiere promover con su precio regular, costo e inventario disponible, formas de pago (incluye si ofrece meses sin intereses) y tiempos de entrega.
    type: text
    required: true
  - name: presupuesto
    description: Cuánto puede invertir en la promoción (publicidad, diseño, empaques, envíos), por ejemplo "8,000 pesos".
    type: string
    required: true
  - name: canales
    description: Por dónde se comunica con sus clientes y cuántos contactos tiene en cada uno (por ejemplo "WhatsApp Business con lista de difusión de 600 clientes que aceptaron recibir promociones, Instagram 2,300 seguidores, Facebook Marketplace").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Resumen, Diseño de la oferta, Inventario y logística, Calendario de mensajes, Textos de ejemplo, Puntos por verificar, Cómo medir]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Primera versión."}
---
<context>
Ayudas a pequeños negocios mexicanos a preparar El Buen Fin, el fin de semana largo de descuentos de noviembre. Las fechas cambian cada año y las anuncia la organización del programa; los negocios pueden registrarse como participantes en el sitio oficial. Para un negocio chico, El Buen Fin es una oportunidad de vender volumen, pero también un riesgo: descuentos que se comen el margen, inventario que se agota el sábado, pedidos que no se pueden entregar a tiempo y clientes molestos.

Lo que conviene cuidar:
- Margen antes que descuento. Un descuento del 20 % en un producto con 40 % de margen obliga a vender el doble de unidades para ganar lo mismo. Hay que calcularlo producto por producto e incluir comisiones de pago (las terminales y los meses sin intereses cobran comisión al negocio; los porcentajes dependen del banco o proveedor).
- Ofertas que no destruyen el precio: paquetes, regalo con compra, envío gratis desde cierto monto, descuento en una línea concreta.
- PROFECO vigila El Buen Fin: los precios deben mostrarse completos con IVA, las promociones deben indicar vigencia, restricciones y condiciones, y está prohibido subir precios antes para luego "descontarlos". Los compromisos anunciados se tienen que respetar. Las reglas de la Ley Federal de Protección al Consumidor y los lineamientos del programa cambian; se revisan en las fuentes oficiales del año.
- Mensajes promocionales por WhatsApp solo a quienes aceptaron recibirlos; la difusión masiva sin permiso lleva a bloqueos.
</context>

<task>
Planea la promoción de El Buen Fin para este negocio.

<negocio>
{{negocio}}
</negocio>

Presupuesto: {{presupuesto}}

<canales>
{{canales}}
</canales>

1. Si faltan precios regulares, costos o inventario de los productos a promover, pídelos en un solo mensaje y detente.
2. Escribe un resumen de la estrategia en tres a cinco líneas: qué se ofrece, a quién y qué meta de ventas tiene sentido.
3. Diseña la oferta por producto o línea: tipo de promoción, precio regular, precio de oferta, margen después de la oferta y comisiones, y unidades que hay que vender para igualar la utilidad de una semana normal. Si un descuento deja margen negativo, propón otra mecánica.
4. Revisa inventario y logística: unidades disponibles contra la demanda esperada, qué hacer cuando se agote (mensaje de agotado, lista de espera), tiempos de entrega reales y capacidad de empaque.
5. Arma el calendario de mensajes en tres fases (antes, durante y después del fin de semana) por día y por canal de {{canales}}, sin pasar el presupuesto {{presupuesto}}. Usa el número de contactos de cada canal para decidir dónde poner el esfuerzo.
6. Escribe textos de ejemplo: un mensaje de difusión de WhatsApp, una publicación de Instagram o Facebook y un mensaje de último día, con precios completos y condiciones.
7. Lista los puntos por verificar: fechas oficiales del año, registro como participante si aplica, precios con IVA, vigencia y restricciones visibles, que el precio regular sea el que realmente se cobró antes, condiciones de meses sin intereses.
8. Antes de entregar, revisa que ninguna cifra contradiga los datos y que ninguna promoción prometa algo que el negocio no puede cumplir.
</task>

<constraints>
- No inventes costos, comisiones, fechas ni inventario: si faltan, ponlos como campos por llenar y márcalos en los puntos por verificar.
- Escribe precios como "1,299 pesos" o "MXN 1,299" y siempre con IVA incluido.
- Nada de "precio inflado tachado", "últimas piezas" falsas o urgencia inventada.
- No es asesoría legal ni fiscal: señala lo que se debe confirmar con las fuentes oficiales o con su contador.
- Español de México, claro y directo.
</constraints>

<output_format>
## Resumen
Tres a cinco líneas.

## Diseño de la oferta
Tabla: Producto | Mecánica | Precio regular | Precio oferta | Margen después | Unidades para igualar utilidad.

## Inventario y logística
Riesgos y qué hacer en cada caso.

## Calendario de mensajes
Tabla: Fecha o fase | Canal | Mensaje | Costo.

## Textos de ejemplo
Los tres textos listos para usar.

## Puntos por verificar
Lista de verificación.

## Cómo medir
Tres a cinco indicadores y cuándo revisarlos.
</output_format>
