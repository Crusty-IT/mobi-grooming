# Komponenty React

Dokumentacja komponentów React użytych w aplikacji Mobi Grooming. Większość komponentów to **Client Components** (z oznaczeniem `'use client'`), co pozwala na interaktywność po stronie przeglądarki.

## Lista komponentów

### 1. Dashboard
- **Plik**: `src/components/dashboard/Dashboard.tsx`
- **Opis**: Główny komponent strony głównej. Integruje nawigację, sekcję powitalną (Hero), statystyki oraz wszystkie pozostałe sekcje tematyczne.
- **Props**:
  - `announcements`: Tablica obiektów zawierających ogłoszenia (slug, title, date, body).
- **Zależności**: `Informations`, `Opinions`, `Certificates`, `Gallery`, `lucide-react`.

### 2. Informations
- **Plik**: `src/components/informations/Informations.tsx`
- **Opis**: Sekcja wyświetlająca interaktywny kalendarz dostępności oraz listę ogłoszeń.
- **Funkcjonalność**:
  - Pobieranie danych o dostępności z `/data/unavailable.json`.
  - Przełączanie miesięcy w kalendarzu.
  - Wyświetlanie legendy dostępności.
- **Props**:
  - `announcements`: Lista ogłoszeń przekazywana z `Dashboard`.
- **Sub-komponenty**: `AvailabilityCalendar`, `AnnouncementsList`.

### 3. Gallery
- **Plik**: `src/components/gallery/Gallery.tsx`
- **Opis**: Sekcja z portfolio salonu. Prezentuje zdjęcia prac.
- **Funkcjonalność**:
  - Poziome przewijanie zdjęć (Slider).
  - Modal z powiększonym zdjęciem po kliknięciu.
  - Możliwość zoomowania (skalowania) i przesuwania zdjęcia w modalu.
- **Zależności**: `lucide-react`.

### 4. Certificates
- **Plik**: `src/components/certificates/Certificates.tsx`
- **Opis**: Sekcja prezentująca certyfikaty i dyplomy.
- **Funkcjonalność**:
  - Podobna do galerii (Slider + Modal z zoomem).
  - Obsługa klawiatury (Escape do zamknięcia, strzałki do nawigacji).
- **Zależności**: `lucide-react`.

### 5. Opinions
- **Plik**: `src/components/opinions/Opinions.tsx`
- **Opis**: Karuzela z opiniami klientów.
- **Funkcjonalność**:
  - Wyświetlanie gwiazdek (ocena).
  - Płynne przewijanie opinii (Snap scrolling).
  - Automatyczne ukrywanie/pokazywanie strzałek nawigacyjnych w zależności od pozycji przewinięcia.
- **Dane**: Statyczna lista `testimonials` zdefiniowana w pliku.

## Zależności między komponentami

```text
App (page.tsx) [Server Component]
└── Dashboard [Client Component]
    ├── Navbar (wbudowany w Dashboard)
    ├── Hero (wbudowany w Dashboard)
    ├── Services (wbudowany w Dashboard)
    ├── Informations
    │   ├── AvailabilityCalendar
    │   └── AnnouncementsList
    ├── Certificates
    ├── Gallery
    ├── Opinions
    └── Footer (wbudowany w Dashboard)
```

## Wspólne konwencje
- **Stylizacja**: Wykorzystanie Tailwind CSS bezpośrednio w klasach `className`.
- **Ikony**: Wszystkie ikony pochodzą z biblioteki `lucide-react`.
- **Responsywność**: Standardowe breakpointy Tailwind (`sm:`, `md:`, `lg:`).
- **Obrazy**: Wykorzystanie standardowych tagów `<img>` (często z linkami do surowych plików z GitHub, co warto zoptymalizować w przyszłości przy użyciu `next/image`).
