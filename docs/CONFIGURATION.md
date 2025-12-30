# Konfiguracja

Projekt Mobi Grooming konfiguruje się głównie poprzez pliki konfiguracyjne w repozytorium oraz ustawienia w panelu Netlify.

## 🌍 Zmienne środowiskowe

Projekt nie wymaga wielu zmiennych środowiskowych w runtime (ze względu na statyczny eksport), ale mogą być przydatne podczas builda:

| Zmienna | Opis | Wartość domyślna |
|---------|------|------------------|
| `NODE_ENV` | Środowisko pracy | `development` |
| `NEXT_PUBLIC_SITE_URL` | Adres URL strony | `https://mobi-grooming.pl` |

## 📂 Pliki konfiguracyjne

### 1. `next.config.ts`
Główna konfiguracja frameworka Next.js.
- **`output: 'export'`**: Włącza generowanie plików statycznych.
- **`images.unoptimized: true`**: Konieczne dla statycznego eksportu, ponieważ standardowa optymalizacja obrazów Next.js wymaga serwera Node.js.

### 2. `public/admin/config.yml`
Konfiguracja Netlify CMS.
- **`backend`**: Określa sposób połączenia z Git (zazwyczaj `git-gateway`).
- **`media_folder`**: Folder, do którego trafiają wgrywane zdjęcia (`public/pictures/uploads`).
- **`collections`**: Definicja pól i struktur danych dostępnych w panelu administratora.

### 3. `netlify.toml`
Konfiguracja procesu wdrażania na Netlify.
- **`publish`**: Katalog z gotową stroną (`out`).
- **`redirects`**: Reguły przekierowań (np. obsługa SPA).

### 4. `package.json`
Definiuje skrypty builda i zależności.

## 🛠️ Przykładowe konfiguracje dla środowisk

### Środowisko Deweloperskie (Local)
- Wykorzystuje `npm run dev`.
- Dane odczytywane są lokalnie z systemu plików.
- CMS może wymagać `npx netlify-cms-proxy-server` dla lokalnych testów zapisu.

### Środowisko Produkcyjne (Netlify)
- Automatyczny build po pushu do gałęzi `main`.
- Włączone Netlify Identity dla bezpieczeństwa panelu `/admin`.
- Aktywny SSL (HTTPS) zarządzany przez Netlify.

## 🔧 Jak zmienić konfigurację CMS?

Aby dodać nowe pole do ogłoszeń lub zmienić strukturę kalendarza:
1. Otwórz `public/admin/config.yml`.
2. Znajdź odpowiednią kolekcję w sekcji `collections`.
3. Dodaj nowy element do listy `fields`.
4. Zapisz i wypchnij zmiany (Push). CMS automatycznie zaktualizuje interfejs po kolejnym buildzie.

---
[Wróć do strony głównej](../README.md)
