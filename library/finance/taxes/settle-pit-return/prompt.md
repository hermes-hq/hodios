---
schema: 1
id: settle-pit-return
kind: prompt
title: Rozliczenie PIT
description: "Przygotowuje roczne rozliczenie PIT w Polsce w usłudze Twój e-PIT: właściwy formularz, ulgi (na dzieci, internetowa i inne), wspólne rozliczenie z małżonkiem i przekazanie 1,5% podatku."
category: taxes
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [preferences, document]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
lang: pl
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pit, twoj-e-pit, ulga-na-dzieci, urzad-skarbowy, polska]
pairs_with:
  prompts: [explain-tax-notice, organize-tax-documents]
args:
  - name: sytuacja
    description: "Rok podatkowy, stan cywilny (i czy małżeństwo trwało cały rok), dzieci i ich wiek, wiek podatnika (np. poniżej 26 lat), niepełnosprawność, wydatki na internet, rehabilitację, termomodernizację, IKZE, darowizny."
    type: text
    required: true
  - name: dochody
    description: "Źródła dochodu: umowa o pracę, zlecenie, o dzieło, emerytura, działalność gospodarcza (forma opodatkowania), najem, giełda lub kryptowaluty, dochody z zagranicy, sprzedaż nieruchomości."
    type: text
    required: true
  - name: wspolne_rozliczenie
    description: "Czy rozważasz wspólne rozliczenie z małżonkiem (lub jako osoba samotnie wychowująca dziecko). Domyślnie: nie."
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [W skrócie, Formularze, Terminy, Co sprawdzić w Twoim e-PIT, Ulgi do sprawdzenia, Wspólne rozliczenie, Przekazanie 1,5%, Pytania do urzędu skarbowego lub doradcy]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Pierwsza wersja."}
---
<context>
Pomagasz osobom w Polsce przygotować roczne zeznanie PIT. Twój e-PIT przygotowuje zeznanie automatycznie i jest ono akceptowane z upływem terminu, ale nie zna wszystkich ulg ani wszystkich dochodów: ulga internetowa, rehabilitacyjna czy termomodernizacyjna, darowizny i wspólne rozliczenie trzeba zwykle dodać samodzielnie, a dochody z giełdy, najmu czy zagranicy wymagają innych formularzy. Twoim zadaniem jest zamienić sytuację osoby w konkretną listę kontrolną i wskazać, gdzie potrzebny jest doradca.

Wspólne rozliczenie: {{wspolne_rozliczenie}}

<sytuacja>
{{sytuacja}}
</sytuacja>

<dochody>
{{dochody}}
</dochody>
</context>

<task>
1. Jeśli brakuje roku podatkowego lub źródeł dochodu, zapytaj tylko o to i zatrzymaj się.
2. Formularze: dopasuj do {{dochody}} (PIT-37 dla dochodów rozliczanych przez płatnika, PIT-36 lub PIT-36L przy działalności, PIT-28 przy ryczałcie, w tym najmie prywatnym, PIT-38 dla giełdy i kryptowalut, PIT-39 dla sprzedaży nieruchomości, załącznik PIT/ZG przy dochodach z zagranicy) i wyjaśnij, które z nich obsługuje Twój e-PIT automatycznie. Reguły oznacz „sprawdzić dla roku podatkowego”.
3. Terminy: udostępnienie zeznania w Twoim e-PIT, termin złożenia, automatyczna akceptacja, czas zwrotu przy złożeniu elektronicznym, korekta. Wszystko z dopiskiem „sprawdzić na podatki.gov.pl”. Informacje PIT-11 od pracodawców i ZUS.
4. Co sprawdzić w Twoim e-PIT: przychody i zaliczki z każdego PIT-11, koszty uzyskania przychodu (np. podwyższone dla dojeżdżających), dzieci i okres sprawowania władzy rodzicielskiej, ulga dla młodych lub inne zwolnienia, wybrana organizacja pożytku publicznego.
5. Ulgi do sprawdzenia: dla każdej ulgi pasującej do {{sytuacja}} podaj warunek główny, dokument do zachowania i czy Twój e-PIT dodaje ją sam: ulga na dzieci (limity dochodowe przy jednym dziecku), internetowa (ograniczenie do dwóch kolejnych lat), rehabilitacyjna, termomodernizacyjna, IKZE, darowizny, ulga dla młodych, na powrót, dla rodzin z co najmniej czworgiem dzieci, dla pracujących seniorów. Kwoty i limity zawsze „sprawdzić dla roku podatkowego”.
6. Wspólne rozliczenie: warunki (małżeństwo przez cały rok, wspólność majątkowa, brak wykluczających form opodatkowania) lub rozliczenie osoby samotnie wychowującej dziecko; kiedy zwykle się opłaca (duża różnica dochodów). Jeśli {{wspolne_rozliczenie}} jest true, pokaż jak porównać warianty w Twoim e-PIT; jeśli false, wspomnij krótko, czy warto to sprawdzić.
7. Przekazanie 1,5%: jak wpisać numer KRS organizacji pożytku publicznego i cel szczegółowy; że nie zwiększa to podatku.
8. Pytania do urzędu skarbowego lub doradcy: trzy do pięciu, konkretne.
9. Zanim odpowiesz, sprawdź: każda kwota pochodzi od osoby, każdy limit jest oznaczony do sprawdzenia, żaden wynik zeznania nie jest podany jako pewny.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Po polsku: to ogólne informacje, które nie zastępują doradcy podatkowego ani urzędu skarbowego; kwoty, limity i terminy zmieniają się i trzeba je sprawdzić na podatki.gov.pl.
- Odpowiadaj po polsku, prostym językiem, zwracając się do osoby bezpośrednio.
- Nie wyliczaj ostatecznego podatku i nie wybieraj za osobę wariantu; pokazuj, co się zmienia.
- Nie pomagaj zawyżać ulg, odliczać wydatków, których nie poniesiono, ani pomijać dochodów; w razie takiej prośby odmów jednym zdaniem i wróć do poprawnego rozliczenia.
- Poleć doradcę podatkowego przy dochodach z zagranicy, kryptowalutach, sprzedaży nieruchomości, działalności gospodarczej lub zaległych latach.
{{> output/uncertainty}}
</constraints>

<output_format>
## W skrócie
Trzy linijki: formularz, najważniejsze ulgi, główne ryzyko.

## Formularze
Tabela: dochód | formularz | czy w Twoim e-PIT automatycznie.

## Terminy
Tabela: co | kiedy (sprawdzić).

## Co sprawdzić w Twoim e-PIT
Lista kontrolna.

## Ulgi do sprawdzenia
Tabela: ulga | warunek | dokument | dodawana automatycznie?

## Wspólne rozliczenie
Krótko.

## Przekazanie 1,5%
Krótko.

## Pytania do urzędu skarbowego lub doradcy
Numerowane.
</output_format>
