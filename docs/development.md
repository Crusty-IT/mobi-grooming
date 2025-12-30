# Development Guide

Witaj w przewodniku dla programistów projektu Mobi Grooming!

## 💻 Setup środowiska deweloperskiego

1. Zainstaluj **Node.js 20+**.
2. Zainstaluj zależności: `npm install`.
3. Uruchom serwer deweloperski: `npm run dev`.
4. (Opcjonalnie) Uruchom Netlify Dev, aby testować przekierowania: `npx netlify dev`.

## 📂 Struktura projektu

- `src/app/`: App Router Next.js (strony i layouty).
- `src/components/`: Komponenty React (podzielone na sekcje Dashboardu).
  - `certificates/`: Sekcja certyfikatów.
  - `dashboard/`: Główny kontener i logika strony głównej.
  - `gallery/`: Komponent galerii zdjęć.
  - `informations/`: Informacje o salonie.
  - `opinions/`: Sekcja opinii klientów.
- `src/content/`: Pliki Markdown zarządzane przez CMS.
- `public/`: Statyczne zasoby (zdjęcia, ikony, dane JSON).

## 🎨 Coding Standards i Konwencje

- **TypeScript**: Używamy silnego typowania dla wszystkich komponentów i funkcji.
- **Komponenty**: Preferujemy komponenty funkcyjne z Hookami.
- **Stylizacja**: Wyłącznie Tailwind CSS. Unikamy pisania surowego CSS w plikach `.css`.
- **Nazewnictwo**: 
  - Komponenty: `PascalCase` (np. `DashboardCard.tsx`).
  - Funkcje/Zmienne: `camelCase`.
  - Pliki pomocnicze: `kebab-case`.

## 🔄 Proces developmentu

1. Utwórz nową gałąź (branch) dla swojej funkcjonalności: `git checkout -b feature/nowa-funkcja`.
2. Wprowadź zmiany.
3. Sprawdź, czy projekt się buduje: `npm run build`.
4. Zacommituj zmiany zgodnie z konwencją [Conventional Commits](https://www.conventionalcommits.org/).
5. Utwórz Pull Request do gałęzi `main`.

## 🧪 Jak uruchomić testy

Obecnie projekt koncentruje się na warstwie wizualnej. Aby dodać i uruchomić testy (np. Vitest lub Jest), należy:
1. Zainstalować odpowiednie pakiety.
2. Dodać skrypt `"test": "vitest"` w `package.json`.
3. Uruchomić: `npm test`.

## ✨ Jak dodać nową funkcjonalność

### Przykład: Dodanie nowej sekcji "Usługi"
1. Utwórz katalog `src/components/services/`.
2. Stwórz plik `Services.tsx` z komponentem React.
3. Zaimportuj i dodaj `<Services />` w `src/components/dashboard/Dashboard.tsx`.
4. Jeśli sekcja ma być edytowalna w CMS:
   - Dodaj nową kolekcję w `public/admin/config.yml`.
   - Stwórz odpowiedni folder na dane w `src/content/`.
   - Zaktualizuj logikę pobierania danych w `src/app/page.tsx`.

---
[Wróć do strony głównej](../README.md)
