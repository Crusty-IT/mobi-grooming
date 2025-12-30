# Architektura Aplikacji

## Struktura folderów i plików

Projekt jest zbudowany w oparciu o **Next.js 15** z wykorzystaniem **App Router**. Poniżej znajduje się opis kluczowych katalogów:

```text
mobi-grooming/
├── public/                 # Pliki statyczne dostępne publicznie
│   ├── admin/              # Konfiguracja Decap CMS (index.html, config.yml)
│   ├── data/               # Dane JSON zarządzane przez CMS (np. unavailable.json)
│   └── pictures/           # Zasoby graficzne (logo, zdjęcia galerii, certyfikaty)
├── src/
│   ├── app/                # Główna logika routingu i layoutów (Next.js App Router)
│   │   ├── globals.css     # Globalne style Tailwind CSS
│   │   ├── layout.tsx      # Główny layout aplikacji
│   │   └── page.tsx        # Główna strona (Home) - Server Component
│   ├── components/         # Komponenty React (Client Components)
│   │   ├── certificates/   # Sekcja certyfikatów
│   │   ├── dashboard/      # Główny widok (Landing Page)
│   │   ├── gallery/        # Sekcja galerii zdjęć
│   │   ├── informations/   # Sekcja aktualności i kalendarza
│   │   └── opinions/       # Sekcja opinii klientów
│   └── content/            # Treść Markdown (ogłoszenia) zarządzana przez CMS
├── scripts/                # Skrypty pomocnicze (PowerShell)
├── netlify.toml            # Konfiguracja deploymentu na Netlify
├── package.json            # Zależności i skrypty npm
└── tsconfig.json           # Konfiguracja TypeScript
```

## Główne komponenty i ich przeznaczenie

1.  **Dashboard (`src/components/dashboard/Dashboard.tsx`)**: Centralny komponent typu "Landing Page". Agreguje wszystkie pozostałe sekcje i odpowiada za nawigację oraz ogólny układ strony.
2.  **Informations (`src/components/informations/Informations.tsx`)**: Odpowiada za wyświetlanie listy ogłoszeń oraz interaktywnego kalendarza dostępności. Pobiera dane z plików Markdown oraz JSON.
3.  **Gallery (`src/components/gallery/Gallery.tsx`)**: Prezentuje zdjęcia prac salonu w formie responsywnej siatki z możliwością powiększania.
4.  **Certificates (`src/components/certificates/Certificates.tsx`)**: Wyświetla certyfikaty i dyplomy potwierdzające kwalifikacje groomera.
5.  **Opinions (`src/components/opinions/Opinions.tsx`)**: Sekcja z opiniami klientów, budująca zaufanie do marki.

## Schemat przepływu danych

1.  **Treść Statyczna/Markdown**: 
    - Podczas budowania (Build Time) w `src/app/page.tsx` (Server Component), ogłoszenia są czytane z plików `.md` w `src/content/announcements`.
    - Dane te są przekazywane jako props do komponentu `Dashboard`.
2.  **Dane Dynamiczne (Runtime)**:
    - Komponent `Informations` pobiera dane o dostępności (`unavailable.json`) bezpośrednio z serwera za pomocą `fetch` po stronie klienta (Client-side).
3.  **Zarządzanie Treścią (CMS)**:
    - Decap CMS w panelu administracyjnym komunikuje się z API Netlify (Git-Gateway), aby zapisywać zmiany bezpośrednio w repozytorium Git (pliki `.md`, `.json` oraz obrazy).
    - Zmiana w repozytorium wyzwala nowy build na Netlify, aktualizując stronę.

## Integracje z zewnętrznymi serwisami

-   **Netlify Identity**: Obsługuje autoryzację do panelu administratora.
-   **Git-Gateway**: Umożliwia CMS-owi zapisywanie plików w repozytorium bez konieczności posiadania konta GitHub przez użytkownika końcowego.
-   **Google Maps**: Osadzona mapa w stopce strony (iframe) wskazująca lokalizację salonu.
-   **Social Media**: Integracja z Facebookiem i Instagramem poprzez linki bezpośrednie.
-   **Lucide React**: Biblioteka ikon wykorzystywana w całym interfejsie.
