# Instrukcja Instalacji

Ten dokument przeprowadzi Cię przez proces instalacji i konfiguracji środowiska lokalnego dla projektu Mobi Grooming.

## 📋 Wymagania wstępne

Zanim zaczniesz, upewnij się, że masz zainstalowane następujące narzędzia:

- **Node.js**: Wersja 20.x lub nowsza (zalecana wersja LTS).
- **npm**: Zazwyczaj instalowany razem z Node.js.
- **Git**: Do klonowania repozytorium.
- **Visual Studio Code**: (Zalecane) z rozszerzeniami dla React i TypeScript.

## 🛠️ Krok po kroku setup

### 1. Klonowanie repozytorium
Pobierz kod źródłowy na swój komputer:
```bash
git clone https://github.com/twoj-uzytkownik/mobi-grooming.git
cd mobi-grooming
```

### 2. Instalacja zależności
Uruchom poniższą komendę w katalogu głównym projektu:
```bash
npm install
```

### 3. Konfiguracja Netlify CLI (Opcjonalnie)
Jeśli chcesz testować funkcje CMS lokalnie lub symulować środowisko Netlify:
```bash
npm install -g netlify-cli
netlify login
```

### 4. Uruchomienie serwera deweloperskiego
```bash
npm run dev
```
Aplikacja powinna być dostępna pod adresem `http://localhost:3000`.

## ⚙️ Konfiguracja środowiska

Projekt korzysta ze statycznego eksportu Next.js, więc większość konfiguracji znajduje się w plikach:
- `next.config.ts`: Konfiguracja Next.js (np. wyłączenie optymalizacji obrazów dla eksportu statycznego).
- `public/admin/config.yml`: Konfiguracja Netlify CMS (backend, kolekcje treści).
- `netlify.toml`: Konfiguracja builda i przekierowań na Netlify.

### Plik .env
Jeśli będziesz dodawać integracje zewnętrzne, utwórz plik `.env.local` w katalogu głównym:
```env
# Przykładowe zmienne (jeśli będą potrzebne)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔍 Troubleshooting instalacji

### Błąd: `Node version mismatch`
Upewnij się, że używasz Node.js 20+. Możesz użyć `nvm` do zmiany wersji:
```bash
nvm use 20
```

### Błąd: `npm install` zawiesza się lub rzuca błędy uprawnień
Spróbuj wyczyścić cache npm:
```bash
npm cache clean --force
```
Lub na Windowsie uruchom terminal jako Administrator.

### CMS nie działa lokalnie
Netlify CMS (Decap CMS) wymaga autoryzacji Git. Lokalnie możesz go przeglądać pod adresem `/admin/index.html`, ale do zapisu zmian zazwyczaj wymagane jest połączenie z Netlify Identity lub użycie `netlify dev` z odpowiednim proxy.

---
[Wróć do strony głównej](../README.md)
