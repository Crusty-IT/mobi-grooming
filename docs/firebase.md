# Konfiguracja CMS i Zarządzanie Treścią

**UWAGA**: Choć pierwotne założenia mogły sugerować użycie Firebase, obecna architektura projektu opiera się na **Decap CMS** (dawniej Netlify CMS) zintegrowanym z **Netlify Identity**. Poniżej znajduje się opis tej konfiguracji.

## Decap CMS (Zamiast Firebase)

Aplikacja wykorzystuje Decap CMS do zarządzania plikami Markdown i JSON bezpośrednio w repozytorium Git. Dzięki temu nie jest wymagana zewnętrzna baza danych typu Realtime Database.

### Konfiguracja (`public/admin/config.yml`)

Główne parametry konfiguracji:
-   **Backend**: `git-gateway` (umożliwia dostęp bez konta GitHub).
-   **Publish Mode**: `editorial_workflow` (pozwala na tworzenie wersji roboczych ogłoszeń).
-   **Media Folder**: `public/pictures/uploads` (miejsce zapisu nowych zdjęć).

### Kolekcje danych

1.  **Ogłoszenia (`announcements`)**:
    -   Ścieżka: `src/content/announcements`
    -   Format: Markdown z Frontmatter.
    -   Pola: Tytuł, Data publikacji, Treść (Markdown), Wyróżnienie.
2.  **Dostępność (`availability`)**:
    -   Ścieżka: `public/data/unavailable.json`
    -   Format: JSON.
    -   Struktura: Lista obiektów zawierających datę i opcjonalną notatkę.

## Integracja z Netlify

Aby system działał poprawnie, na platformie Netlify muszą być aktywowane następujące usługi:

1.  **Netlify Identity**:
    -   Włącz usługę w ustawieniach projektu na Netlify.
    -   W sekcji "Registration" ustaw "Invite only" (zalecane dla bezpieczeństwa).
    -   Włącz "External providers" (np. Google), jeśli chcesz.
2.  **Git Gateway**:
    -   W ustawieniach Identity znajdź sekcję "Services" i włącz "Git Gateway".
    -   Połącz go ze swoim repozytorium (np. na GitHub).

## Reguły bezpieczeństwa i dostęp

Dostęp do panelu administratora (`/admin`) jest chroniony przez Netlify Identity. Tylko zaproszeni użytkownicy z odpowiednimi uprawnieniami mogą edytować treść.

### Jak dodać administratora?
1.  Zaloguj się do panelu Netlify.
2.  Przejdź do zakładki **Identity**.
3.  Kliknij **Invite users** i wpisz adres e-mail.
4.  Użytkownik otrzyma zaproszenie z linkiem do ustawienia hasła.

## Instrukcja połączenia z własnym projektem

Jeśli chcesz przenieść ten projekt na własne konto:
1.  Zmień adres `auth_proxy` w `public/admin/config.yml` na swój adres URL Netlify:
    ```yaml
    auth_proxy: https://TWOJA-DOMENA.netlify.app/.netlify/identity
    ```
2.  Upewnij się, że plik `_redirects` w folderze `public/` zawiera:
    ```text
    /admin/* /admin/index.html 200
    ```
3.  Połącz repozytorium z nowym projektem na Netlify.
4.  Skonfiguruj Identity i Git Gateway zgodnie z opisem powyżej.
