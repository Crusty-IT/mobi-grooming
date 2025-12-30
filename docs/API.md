# API & Dane

Mobi Grooming jest aplikacją typu Static Site, co oznacza, że nie posiada klasycznego dynamicznego API REST/GraphQL w runtime. Zamiast tego, dane są pobierane z plików w trakcie procesu budowania lub bezpośrednio z plików statycznych przez klienta.

## 📂 Struktura danych

### 1. Ogłoszenia (Announcements)
Przechowywane w: `src/content/announcements/*.md`

**Format pliku:**
```markdown
---
title: "Tytuł ogłoszenia"
date: "2025-10-18 13:50"
featured: true
---
Treść ogłoszenia w formacie Markdown...
```

**Pobieranie (Build-time):**
Używane w `src/app/page.tsx` przez funkcję `getAnnouncements()`.

### 2. Kalendarz Dostępności
Przechowywany w: `public/data/unavailable.json`

**Format danych:**
```json
{
  "entries": [
    {
      "date": "2025-12-25",
      "note": "Boże Narodzenie"
    }
  ]
}
```

## 🛠️ "API" CMS (Netlify Identity)

Aplikacja integruje się z usługą Netlify Identity dla autoryzacji w panelu administratora.

- **Endpoint Auth**: `https://mobi-grooming.netlify.app/.netlify/identity`
- **Panel**: `/admin/index.html`

## 📡 Przykłady pobierania danych (Client-side)

Mimo że większość danych jest wstrzykiwana podczas builda, pliki JSON z katalogu `public` mogą być pobierane dynamicznie przez klienta.

### Przykład fetch (JavaScript):
```javascript
async function getUnavailableDates() {
  const response = await fetch('/data/unavailable.json');
  const data = await response.json();
  return data.entries;
}
```

### Przykład curl:
```bash
curl https://mobi-grooming.pl/data/unavailable.json
```

## ⚠️ Limity i Rate Limiting

- **Buildy**: Netlify ma limity minut buildów w darmowym planie (zazwyczaj 300 min/miesiąc). Każda zmiana w CMS zużywa te minuty.
- **API Identity**: Darmowy plan Netlify Identity pozwala na 1000 użytkowników (w tym przypadku zazwyczaj tylko 1 administrator).

## ❌ Kody błędów

W architekturze statycznej błędy zazwyczaj wynikają z braku pliku:
- **404 Not Found**: Plik z danymi (JSON/Markdown) nie istnieje lub ścieżka jest błędna.
- **200 OK**: Sukces (nawet jeśli lista danych jest pusta).

---
[Wróć do strony głównej](../README.md)
