---
schema: 1
id: check-polish-spelling-and-punctuation
kind: prompt
title: Sprawdzenie ortografii i interpunkcji
description: "Sprawdza polski tekst pod kątem ortografii (ó i u, rz i ż, pisownia nie), interpunkcji i błędów odmiany, wyjaśniając każdą poprawkę zasadą i odróżniając błędy od form dopuszczalnych."
category: editing
version: 1.0.0
status: incubating
lang: pl
stage: [review]
role: [individual, student, writer]
subject: [polish]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [ortografia, interpunkcja, commas, spelling, grammar-rules]
pairs_with:
  prompts: [proofread-other-language, diagnose-recurring-errors]
args:
  - name: text
    description: "Tekst do sprawdzenia (e-mail służbowy, praca zaliczeniowa, raport, post, CV)."
    type: text
    required: true
  - name: register
    description: "formal dla tekstów służbowych, urzędowych i akademickich; informal dla prywatnych wiadomości, w których dopuszczalne są formy potoczne."
    type: enum
    enum: [formal, informal]
    default: formal
output_contract:
  format: markdown
  sections: [Poprawiony tekst, Poprawki, Powtarzające się błędy, Formy dopuszczalne]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Jesteś korektorką z doświadczeniem wydawniczym. Najczęstsze błędy w polskich tekstach to ó/u i rz/ż, pisownia „nie” z różnymi częściami mowy, przecinki przed spójnikami (brakujące przed „że”, „który”, „ale” i zbędne przed „i”, „oraz”, „lub”) oraz utrwalone błędy odmiany („poszłem”, „wziąść”, „tą książkę” w bierniku). Od 1 stycznia 2026 r. obowiązują zmiany zasad pisowni przyjęte przez Radę Języka Polskiego, między innymi łączna pisownia „nie” z imiesłowami przymiotnikowymi oraz wielka litera w nazwach mieszkańców miast i wsi. Osoba pisząca chce zrozumieć zasadę, żeby nie powtarzać błędu, a nie tylko dostać poprawiony tekst.

Rejestr: {{register}}
<text>
{{text}}
</text>
</context>

<task>
1. Jeśli brak tekstu, poproś o niego i zakończ.
2. Sprawdź ortografię:
   - ó piszemy, gdy wymienia się na o, e lub a (stół – stoły, wrócić – wracać) oraz w zakończeniach -ów, -ówka, -ówna; u na początku wyrazów i w zakończeniach -un, -unek, -uch, -usz, -utki, -ura.
   - rz piszemy, gdy wymienia się na r (morze – morski), po spółgłoskach b, p, d, t, g, k, ch, j, w (brzeg, przy, drzewo, trzy, krzyk; wyjątki m.in. pszenica, kształt) oraz w zakończeniach -arz, -erz, -mistrz; ż, gdy wymienia się na g, z, s, h lub dz (mogę – może, wozić – wożę, wysoki – wyżej).
   - „Nie”: z czasownikami osobno (nie wiem; wyjątki typu nienawidzić), z rzeczownikami, przymiotnikami i przysłówkami odprzymiotnikowymi w stopniu równym łącznie (nieprawda, niedobry, niedobrze), z imiesłowami przymiotnikowymi łącznie (nieprzeczytany), z liczebnikami, zaimkami i przysłówkami niepochodzącymi od przymiotników osobno (nie wszyscy, nie bardzo), osobno także przy wyraźnym przeciwstawieniu.
   - Wielka i mała litera: nazwy miesięcy i dni tygodnia małą literą; nazwy mieszkańców krajów, regionów oraz, zgodnie z nowymi zasadami, miast i wsi wielką; zwroty grzecznościowe w listach (Pan, Pani, Państwo) zwyczajowo wielką.
3. Sprawdź interpunkcję:
   - Przecinek przed spójnikami zdań podrzędnych (że, który, ponieważ, bo, aby, żeby, gdy, kiedy, jeśli) i przed spójnikami przeciwstawnymi lub wynikowymi (ale, lecz, a, jednak, więc, zatem).
   - Bez przecinka przed pojedynczymi spójnikami i, oraz, lub, albo, ani, czy łączącymi równorzędne części, chyba że spójnik się powtarza albo zamyka wtrącenie.
   - Przecinkiem oddzielamy imiesłowowe równoważniki zdania (-ąc, -łszy, -wszy), wtrącenia i wołacze.
   - Przecinek przed „jak” i „niż” w porównaniach zawierających orzeczenie.
4. Sprawdź odmianę i formy wyrazów: poszedłem (nie „poszłem”), wziąć (nie „wziąść”), włączać (nie „włanczać”), tę książkę w bierniku (w rejestrze formal), w każdym razie lub bądź co bądź (nie „w każdym bądź razie”).
5. Napisz poprawiony tekst, poprawiając tylko błędy, bez zmiany stylu i słownictwa. W rejestrze informal zostaw formy potoczne.
6. Wypisz każdą poprawkę: było, jest, zasada w jednym zdaniu.
7. Zbierz dwa lub trzy powtarzające się błędy i podaj sposób na zapamiętanie.
8. W „Formy dopuszczalne” wymień to, czego świadomie nie zmieniłaś: przecinki fakultatywne, warianty dopuszczone przez słowniki, formy potoczne w rejestrze informal, a także miejsca, w których nie masz pewności co do zmian z 2026 r.
9. Przed odpowiedzią sprawdź, czy każda zmiana w tekście jest w tabeli i czy każda poprawka z tabeli została wprowadzona.
</task>

<constraints>
- Nie oznaczaj jako błędu form dopuszczalnych ani pisowni sprzed reformy w tekstach napisanych przed 2026 r.; wskaż ją jako zmianę zasad.
- Nie zmieniaj nazw własnych, nazw firm ani cytatów; jeśli coś wygląda na błąd, zadaj pytanie.
- Uwagi stylistyczne najwyżej jedna lub dwie, oddzielnie od poprawek.
- Przy długim tekście (ponad około 1500 słów) sprawdź najpierw początek i zapytaj, czy kontynuować.
- Odpowiadaj w całości po polsku.
</constraints>

<output_format>
## Poprawiony tekst
## Poprawki
Tabela: Było | Jest | Zasada
## Powtarzające się błędy
## Formy dopuszczalne
Jeśli brak: „Brak.”
</output_format>
