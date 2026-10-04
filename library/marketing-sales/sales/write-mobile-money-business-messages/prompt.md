---
schema: 1
id: write-mobile-money-business-messages
kind: prompt
title: Ujumbe wa malipo kwa simu
description: "Huandika jumbe za Kiswahili kwa biashara ndogo ya Afrika Mashariki inayopokea malipo kwa simu: kuthibitisha bei, maelekezo ya kulipa, risiti, vikumbusho vya upole na tahadhari dhidi ya utapeli."
category: sales
version: 1.0.0
status: incubating
lang: sw
stage: [build]
role: [founder]
requires: [none]
inputs: [text, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mobile-money, payment-reminders, scam-safety, east-africa]
pairs_with:
  prompts: [write-whatsapp-business-service-scripts, write-fcommerce-facebook-post]
args:
  - name: biashara
    description: Biashara yako - unauza nini, uko nchi na mji gani (Kenya, Tanzania, Uganda), unawasiliana na wateja kupitia SMS, WhatsApp au simu, na jinsi wateja wanavyokulipa (Till, Paybill au Lipa Namba, jina la biashara linaloonekana kwenye malipo).
    type: text
    required: true
  - name: huduma
    description: Bidhaa au huduma na bei zake, kama kuna malipo ya awali au ya awamu, muda wa kufikisha bidhaa, na sera ya kurejesha pesa ikiwa ipo.
    type: text
    required: true
  - name: lugha_mtindo
    description: Mtindo wa lugha. rasmi = Kiswahili sanifu na cha heshima (kwa ofisi, shule, kliniki); kawaida = Kiswahili cha kirafiki cha kila siku.
    type: enum
    enum: [rasmi, kawaida]
    default: kawaida
output_contract:
  format: markdown
  sections: [Jumbe kwa wateja, Ujumbe wa usalama, Kanuni kwa anayepokea malipo, Taarifa zinazokosekana]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Toleo la kwanza."}
---
<context>
Unasaidia biashara ndogo za Afrika Mashariki (maduka, saluni, mafundi, wauzaji wa mtandaoni, shule ndogo) kuandika jumbe za malipo kwa simu. Kwa biashara hizi, pesa ya simu ndiyo njia kuu ya malipo: mteja anaagiza kwa WhatsApp au SMS, analipa kwa Till, Paybill au Lipa Namba, kisha anasubiri bidhaa. Ujumbe usio wazi huleta malipo kwenye namba isiyo sahihi, maswali mengi na kutoaminiana.

Mambo muhimu:
- Maelekezo ya malipo yawe hatua kwa hatua: namba ya Till au Paybill, namba ya akaunti kama ipo, kiasi kamili, na jina la biashara litakaloonekana kabla ya mteja kuweka namba ya siri. Mteja ahakikishe jina hilo kabla ya kutuma.
- Biashara ithibitishe malipo kwa ujumbe rasmi wa mtoa huduma au kwenye programu au taarifa ya akaunti, si kwa picha ya skrini (screenshot) wala ujumbe uliotumwa na mteja, kwa sababu ujumbe bandia ni utapeli wa kawaida.
- Utapeli mwingine wa kawaida: "nimekutumia pesa kimakosa, nirudishie". Usirudishe chochote kabla ya kuona pesa kwenye salio halisi; mwambie mtu huyo awasiliane na mtoa huduma ili kurejesha muamala.
- Biashara haitamwomba mteja namba ya siri (PIN), msimbo wa uthibitisho, wala kumtaka apige namba fulani ili "kupokea" pesa.
- Vikumbusho vya malipo viwe vya upole na vya heshima; aibu na vitisho huharibu uhusiano na sifa ya biashara.
- Gharama za kutuma na kupokea, na kanuni za kila nchi, hubadilika; zithibitishwe kwa mtoa huduma.
</context>

<task>
Andika jumbe za malipo kwa biashara hii.

<biashara>
{{biashara}}
</biashara>

<huduma>
{{huduma}}
</huduma>

Mtindo wa lugha: {{lugha_mtindo}}

1. Ikiwa haijulikani biashara inauza nini, bei, au wateja hulipa kwa njia gani (Till, Paybill au Lipa Namba), uliza kwa ujumbe mmoja kisha usimame.
2. Andika jumbe hizi, kila moja fupi na tayari kutumwa: (a) kuthibitisha oda na bei, (b) maelekezo ya kulipa hatua kwa hatua, (c) kuthibitisha kwamba malipo yamepokelewa (risiti), (d) kikumbusho cha kwanza cha upole, (e) kikumbusho cha pili, (f) malipo hayajaonekana bado, (g) kurejesha pesa ikiwa sera ipo.
3. Tumia [mabano] kwa sehemu zinazojazwa wakati wa kutuma: jina la mteja, kiasi, namba ya muamala, tarehe.
4. Andika ujumbe mfupi wa usalama ambao biashara inaweza kuuweka kwenye hali (status), bango au mwisho wa jumbe.
5. Andika kanuni fupi kwa mtu anayepokea malipo dukani au kwenye simu ya biashara.
6. Tumia mtindo {{lugha_mtindo}}, na msamiati unaofaa nchi iliyotajwa katika biashara (kwa mfano Kenya au Tanzania).
7. Kabla ya kutoa, hakikisha: kiasi na namba ni sehemu za kujaza au zimetoka kwenye taarifa, hakuna ujumbe unaomwomba mteja namba ya siri, na ujumbe wa risiti unatumwa tu baada ya kuthibitisha malipo.
</task>

<constraints>
- Usibuni namba za Till, Paybill, akaunti, bei wala sera ya kurejesha pesa; acha [mabano] na uzitaje kwenye taarifa zinazokosekana.
- Kamwe usimwombe mteja namba ya siri, msimbo wa uthibitisho au taarifa za kadi.
- Vikumbusho visiwe na vitisho, aibu wala kutaja kumtangaza mteja hadharani.
- Jumbe ziwe fupi kiasi cha kusomeka kwenye skrini moja ya simu.
</constraints>

<output_format>
## Jumbe kwa wateja
Kila ujumbe na kichwa chake (a hadi g) na wakati wa kuutuma.

## Ujumbe wa usalama
Ujumbe mfupi kwa wateja.

## Kanuni kwa anayepokea malipo
Kanuni nne hadi sita.

## Taarifa zinazokosekana
Taarifa ambazo biashara inapaswa kujaza. Andika "Hakuna" ikiwa zimekamilika.
</output_format>
