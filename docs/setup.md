# Instalacja i Konfiguracja

Ten dokument zawiera szczegółowe instrukcje dotyczące przygotowania środowiska lokalnego oraz konfiguracji aplikacji Mobi Grooming.

## Wymagania wstępne

Zanim zaczniesz, upewnij się, że masz zainstalowane następujące narzędzia:
-   **Node.js**: wersja 20.10.0 lub nowsza (zalecana wersja LTS).
-   **npm**: wersja 10.x lub nowsza (instalowana razem z Node.js).
-   **Git**: do klonowania repozytorium i zarządzania wersjami.

## Instalacja krok po kroku

1.  **Klonowanie repozytorium**:
    ```bash
    git clone <url-repozytorium>
    cd mobi-grooming
    ```

2.  **Instalacja zależności**:
    ```bash
    npm install
    ```
    To polecenie pobierze wszystkie niezbędne biblioteki wymienione w `package.json`, w tym Next.js, Tailwind CSS oraz Lucide React.

3.  **Weryfikacja instalacji**:
    Uruchom polecenie budowania, aby upewnić się, że wszystko jest poprawnie skonfigurowane:
    ```bash
    npm run build
    ```

## Zmienne środowiskowe

Obecnie aplikacja nie wymaga pliku `.env` do podstawowego działania, ponieważ większość konfiguracji (np. CMS) znajduje się w plikach statycznych (`public/admin/config.yml`). Jednak przy rozbudowie o funkcje serwerowe, należy utworzyć plik `.env.local` w katalogu głównym.

## Rozwiązywanie typowych problemów

### 1. Błąd `Module not found`
Jeśli po uruchomieniu `npm run dev` widzisz błąd braku modułu:
- Usuń folder `node_modules` i plik `package-lock.json`.
- Uruchom ponownie `npm install`.

### 2. Problemy z wersją Node.js
Jeśli otrzymujesz błędy składni w plikach konfiguracyjnych (np. `postcss.config.mjs`), sprawdź czy nie używasz zbyt starej wersji Node.js:
```bash
node -v
```
Wymagana jest wersja wspierająca moduły ESM (zalecana 20+).

### 3. Brak stylów Tailwind CSS
Upewnij się, że w pliku `src/app/globals.css` znajdują się odpowiednie dyrektywy Tailwind (w wersji 4 są one importowane inaczej):
```css
@import "tailwindcss";
```

### 4. Błąd `fetch` w kalendarzu (404)
Jeśli kalendarz dostępności wyświetla błąd ładowania danych, upewnij się, że plik `public/data/unavailable.json` istnieje i zawiera poprawny format JSON (przynajmniej pustą listę `{"entries": []}`).
