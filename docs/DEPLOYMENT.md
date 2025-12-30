# Deployment

Projekt jest zoptymalizowany pod kątem platformy **Netlify**, ale może być hostowany na dowolnym serwerze obsługującym pliki statyczne (Vercel, GitHub Pages, Apache, Nginx).

## 🚀 Instrukcja Deploymentu na Netlify

### Automatyczny (Zalecany)
1. Połącz swoje repozytorium GitHub/GitLab z Netlify.
2. Skonfiguruj następujące ustawienia builda:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
3. Netlify automatycznie wykryje plik `netlify.toml` i zastosuje dodatkowe reguły.

### Manualny (CLI)
Jeśli chcesz wdrożyć stronę ręcznie z linii poleceń:
```bash
npm run build
netlify deploy --prod
```

## 🛠️ CI/CD Pipeline

Proces CI/CD jest zarządzany przez Netlify Build:
1. **Trigger**: Każdy Push do gałęzi `main`.
2. **Build**: Uruchomienie `next build`, który generuje statyczne pliki w folderze `out/`.
3. **Post-processing**: Optymalizacja obrazów (jeśli skonfigurowano w Netlify) i kompresja assetów.
4. **Deploy**: Rozesłanie plików do globalnej sieci CDN Netlify.

## 🖥️ Konfiguracja serwerów (Inne niż Netlify)

Jeśli hostujesz projekt na własnym serwerze (np. Nginx), upewnij się, że:
1. Serwujesz zawartość folderu `out/`.
2. Skonfigurowałeś obsługę fallbacków dla SPA (wszystkie ścieżki niebędące plikami powinny zwracać `index.html`).

**Przykład Nginx:**
```nginx
location / {
    try_files $uri $uri.html $uri/ /index.html;
}
```

## 📊 Monitoring i Logging

- **Netlify Analytics**: Podstawowe statystyki ruchu bez konieczności używania ciasteczek.
- **Netlify Build Logs**: Dostępne w panelu Netlify, pozwalają na debugowanie błędów budowania.
- **Logowanie CMS**: Historia zmian dostępna w zakładce "Workflow" w panelu administracyjnym oraz w historii commitów Git.

## 🔙 Rollback Procedures

Dzięki architekturze Git-based, powrót do poprzedniej wersji jest bardzo prosty:
1. **Przez Netlify UI**: Wybierz poprzedni udany "Production deploy" i kliknij "Publish deploy".
2. **Przez Git**: Wykonaj `git revert <commit_hash>` i wypchnij zmiany. System automatycznie przebuduje stronę w oparciu o poprzedni stan kodu i danych.

---
[Wróć do strony głównej](../README.md)
