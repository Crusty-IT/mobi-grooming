# Mobi Grooming Salon

Kompleksowa witryna internetowa dla salonu pielęgnacji psów "Mobi" w Stargardzie. Aplikacja umożliwia klientom zapoznanie się z ofertą, certyfikatami, opiniami oraz aktualnościami i dostępnością terminów.

## 🚀 O projekcie

Aplikacja została zbudowana w nowoczesnym stosie technologicznym, zapewniającym szybkość działania, responsywność (Mobile First) oraz łatwe zarządzanie treścią przez właściciela bez umiejętności programistycznych.

### Główne funkcjonalności:
- **Prezentacja usług**: Szczegółowy opis zabiegów wraz z cennikiem.
- **Dynamiczne aktualności**: System ogłoszeń zarządzany przez CMS.
- **Kalendarz dostępności**: Informacje o zajętych terminach i urlopach.
- **Galeria i Certyfikaty**: Wizualna prezentacja efektów pracy i kwalifikacji.
- **System opinii**: Wyświetlanie rekomendacji od zadowolonych klientów.
- **Panel administratora**: Łatwa edycja treści poprzez Decap CMS.

## 🛠 Technologie

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Język**: [TypeScript](https://www.typescriptlang.org/)
- **Stylizacja**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Ikony**: [Lucide React](https://lucide.dev/)
- **CMS**: [Decap CMS](https://decapcms.org/) (dawniej Netlify CMS)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 📋 Wymagania systemowe

- **Node.js**: wersja 20.x lub nowsza
- **npm**: wersja 10.x lub nowsza
- **System operacyjny**: Windows, macOS lub Linux

## ⚙️ Instalacja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone <url-repozytorium>
cd mobi-grooming
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Uruchomienie trybu deweloperskiego
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

### 4. Budowanie wersji produkcyjnej
```bash
npm run build
```

## 📂 Strukturę projektu

- `src/app/` - Główne ścieżki i layouty aplikacji (Next.js App Router).
- `src/components/` - Komponenty React podzielone na sekcje (Dashboard, Gallery, Opinions itp.).
- `src/content/` - Lokalna treść Markdown (np. ogłoszenia).
- `public/` - Pliki statyczne, obrazy oraz konfiguracja panelu administratora (`/admin`).
- `scripts/` - Skrypty pomocnicze (np. `run-dev.ps1`).

## 🌐 Deployment

Aplikacja jest skonfigurowana pod platformę **Netlify**. Plik `netlify.toml` zawiera niezbędne instrukcje dotyczące budowania i przekierowań. Każdy push do głównej gałęzi (main) powoduje automatyczne przebudowanie i wdrożenie aplikacji.

## 📖 Dokumentacja szczegółowa

Więcej informacji znajdziesz w folderze `docs/`:
- [Architektura](docs/architecture.md)
- [Komponenty](docs/components.md)
- [Konfiguracja CMS](docs/firebase.md)
- [Instrukcja instalacji](docs/setup.md)
- [Przewodnik dewelopera](docs/development.md)
