---
schema: 1
id: write-allegro-listing
kind: prompt
title: Oferta na Allegro
description: "Pisze ofertę produktu na Allegro: tytuł w limicie znaków, parametry, opis w sekcjach, informacje o dostawie i zwrotach oraz dane wymagane przez GPSR, naturalną polszczyzną."
category: copywriting
version: 1.0.0
status: incubating
lang: pl
stage: [build]
role: [founder]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [allegro, product-listing, gpsr, poland]
pairs_with:
  prompts: [write-marketplace-listing, write-product-description]
args:
  - name: produkt
    description: Co sprzedajesz - marka, model, kod producenta lub EAN, wymiary, waga, materiał, zastosowanie, zawartość zestawu, gwarancja, stan (nowy lub używany), dane producenta lub importera i informacje o bezpieczeństwie, jeśli je masz.
    type: text
    required: true
  - name: kategoria
    description: Kategoria na Allegro (na przykład "Dom i Ogród > Wyposażenie > Oświetlenie > Lampy biurkowe").
    type: string
    required: true
  - name: parametry
    description: Parametry, które już znasz albo które Allegro pokazuje dla tej kategorii (moc, pojemność, rozmiar, kolor, kompatybilność). Opcjonalnie.
    type: text
output_contract:
  format: markdown
  sections: [Tytuł, Parametry, Opis, Dostawa i zwroty, Dane producenta i bezpieczeństwo, Kontrola, Brakujące informacje]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Pierwsza wersja."}
---
<context>
Piszesz oferty dla sprzedawców na Allegro. Kupujący wpisują frazę w wyszukiwarkę, zawężają wyniki filtrami i porównują kilka ofert na telefonie. Tytuł i parametry decydują o tym, czy oferta w ogóle się pokaże, a opis i zdjęcia o tym, czy ktoś kupi bez dopytywania.

Najważniejsze zasady:
- Tytuł ma limit znaków (obecnie 75; sprawdź w formularzu wystawiania, bo zasady się zmieniają). Kolejność: rodzaj produktu, marka, model, najważniejsza cecha, po której ludzie filtrują (rozmiar, moc, pojemność, kolor). Bez wykrzykników, CAPS LOCKA, słów "okazja", "hit", "promocja" i bez powtarzania słów.
- Parametry zasilają filtry. Puste lub błędne parametry wycinają ofertę z wyników i powodują zwroty. Wypełniaj wyłącznie prawdziwymi danymi.
- Opis buduje się z sekcji (tekst i zdjęcie). Dobra kolejność: do czego służy i dla kogo, najważniejsze cechy, specyfikacja, zawartość zestawu, sposób użycia lub montażu, gwarancja.
- W opisie nie wolno podawać danych kontaktowych, linków ani zachęcać do zakupu poza Allegro.
- Konsument kupujący na odległość ma co do zasady 14 dni na odstąpienie od umowy; sprzedawca odpowiada też za zgodność towaru z umową. Warunki zwrotów i gwarancji podawaj tylko takie, jakie sprzedawca faktycznie stosuje.
- Od grudnia 2024 r. unijne rozporządzenie GPSR wymaga w ofertach produktów konsumenckich m.in. danych producenta (a dla spoza UE osoby odpowiedzialnej w UE) oraz informacji o bezpieczeństwie i ostrzeżeń. Allegro ma na to osobne pola. Szczegóły sprawdź w aktualnych wymaganiach Allegro i przepisach.
</context>

<task>
Przygotuj ofertę na Allegro dla tego produktu.

<produkt>
{{produkt}}
</produkt>

Kategoria: {{kategoria}}

{{#parametry}}
<parametry>
{{parametry}}
</parametry>
{{/parametry}}

1. Jeśli brakuje rodzaju produktu, marki lub modelu albo kluczowych wymiarów czy parametrów technicznych, zapytaj o nie w jednej wiadomości i zakończ.
2. Napisz trzy warianty tytułu z liczbą znaków; zaznacz rekomendowany.
3. Przygotuj tabelę parametrów typowych dla kategorii {{kategoria}}, wypełnioną tylko podanymi danymi; braki oznacz "do uzupełnienia".
4. Napisz opis w sekcjach z nagłówkami, z krótkim tekstem i propozycją zdjęcia do każdej sekcji.
5. Napisz krótkie bloki o dostawie, zwrotach i gwarancji na podstawie danych sprzedawcy; czego nie podano, zostaw jako [do uzupełnienia].
6. Wypisz dane producenta i informacje o bezpieczeństwie potrzebne według GPSR, z tym, co już jest, i tym, czego brakuje.
7. Przed oddaniem sprawdź: limit znaków w tytule, brak kontaktów i linków, brak twierdzeń bez pokrycia, spójność parametrów z opisem.
</task>

<constraints>
- Nie wymyślaj parametrów, certyfikatów (CE, atesty), gwarancji ani czasu dostawy.
- Nie używaj nazw marek konkurencji, także w porównaniach ("jak marka X").
- Bez określeń "najlepszy", "nr 1", "oryginalny" bez dowodu i bez obietnic zdrowotnych.
- Polszczyzna naturalna i rzeczowa, zwracaj się do kupującego bezpośrednio, ale bez przesadnej familiarności.
</constraints>

<output_format>
## Tytuł
Trzy warianty z liczbą znaków, rekomendowany oznaczony.

## Parametry
Tabela: Parametr | Wartość.

## Opis
Sekcje: nagłówek, tekst, propozycja zdjęcia.

## Dostawa i zwroty
Gotowe bloki tekstu.

## Dane producenta i bezpieczeństwo
Pole | Stan (jest lub brak) | Wartość.

## Kontrola
Co sprawdzono i co usunięto.

## Brakujące informacje
Lista braków. "Brak" jeśli wszystko jest.
</output_format>
