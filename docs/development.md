# Przewodnik Dewelopera

Witaj w zespole deweloperskim Mobi Grooming! Ten dokument pomoże Ci zrozumieć konwencje i procesy stosowane w tym projekcie.

## Jak dodawać nowe funkcjonalności?

### Nowa sekcja na stronie
1.  Utwórz nowy folder w `src/components/`.
2.  Stwórz plik komponentu (np. `MySection.tsx`) i dodaj na początku `'use client'`.
3.  Zaimportuj i dodaj komponent w `src/components/dashboard/Dashboard.tsx`.
4.  Jeśli sekcja wymaga linku w nawigacji, zaktualizuj menu w `Dashboard.tsx`.

### Nowe pole w CMS
1.  Otwórz `public/admin/config.yml`.
2.  Znajdź odpowiednią kolekcję (np. `announcements`).
3.  Dodaj nowe pole do listy `fields` (np. `{ label: "Autor", name: "author", widget: "string" }`).
4.  Zaktualizuj typy TypeScript w miejscach, gdzie te dane są używane (np. w `src/app/page.tsx` oraz `src/components/informations/Informations.tsx`).

## Struktura kodu i konwencje

-   **TypeScript**: Obowiązkowe typowanie propsów i stanów. Unikaj używania typu `any`.
-   **Komponenty**: Stosujemy komponenty funkcyjne z Hookami.
-   **Nazewnictwo**:
    -   Foldery i pliki komponentów: `PascalCase` (np. `AvailabilityCalendar.tsx`).
    -   Zmienne i funkcje: `camelCase`.
    -   Stałe: `UPPER_SNAKE_CASE`.
-   **Stylizacja**: Wyłącznie **Tailwind CSS**. Unikaj pisania surowego CSS, chyba że jest to absolutnie konieczne (np. specyficzne animacje).

## Przepływ danych i zarządzanie stanem

-   **Stan globalny**: Ze względu na prostotę aplikacji, nie używamy Reduxa ani Context API do danych z CMS. Dane są pobierane w `page.tsx` (ogłoszenia) i przekazywane w dół lub pobierane lokalnie w komponencie (kalendarz).
-   **Zarządzanie stanem lokalnym**: `useState` i `useMemo` są wystarczające dla większości interakcji.
-   **Dane z CMS**: Pamiętaj, że zmiany w CMS są widoczne dopiero po przebudowaniu aplikacji na Netlify (CI/CD).

## Testowanie lokalne

1.  **Tryb deweloperski**:
    ```bash
    npm run dev
    ```
    Sprawdź responsywność w narzędziach deweloperskich przeglądarki (F12) dla różnych rozmiarów ekranu.

2.  **Symulacja produkcji**:
    Zawsze przed pushem sprawdź czy projekt się buduje:
    ```bash
    npm run build
    ```

3.  **Testowanie CMS**:
    Możesz uruchomić lokalny serwer Decap CMS, aby testować zmiany w konfiguracji `config.yml` bez wysyłania zmian do Git. Szczegóły znajdziesz w dokumentacji Decap CMS pod hasłem "Local Backend".

## Znane problemy i do zrobienia (Backlog)

-   [ ] **Optymalizacja obrazów**: Przejście na `next/image` dla lepszej wydajności. Obecnie używane są linki zewnętrzne do GitHub.
-   [ ] **Wielojęzyczność**: Dodanie obsługi i18n, jeśli salon planuje obsługę klientów zagranicznych.
-   [ ] **Testy**: Dodanie testów E2E (np. Playwright) dla kluczowych ścieżek użytkownika.
-   [ ] **SEO**: Rozbudowa metadanych dla poszczególnych sekcji.
