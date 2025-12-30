# FAQ (Najczęściej Zadawane Pytania)

## 🛠️ Problemy Techniczne

### 1. Dlaczego zmiany wprowadzone w CMS nie są widoczne od razu?
Ponieważ strona jest statyczna, każda zmiana w CMS wyzwala nowy proces budowania (build) na serwerach Netlify. Zazwyczaj trwa to od 1 do 3 minut. Po zakończeniu builda strona odświeży się automatycznie.

### 2. Jak zalogować się do panelu administratora?
Panel dostępny jest pod adresem `/admin` (np. `mobi-grooming.pl/admin`). Musisz posiadać konto skonfigurowane w usłudze Netlify Identity.

### 3. Zapomniałem hasła do panelu CMS. Co robić?
Na ekranie logowania `/admin` skorzystaj z opcji "Forgot password". Otrzymasz instrukcje na e-mail powiązany z kontem administratora.

## 📝 Edycja Treści

### 4. Jak dodać nowe zdjęcie do galerii?
Obecnie zdjęcia w galerii są definiowane bezpośrednio w kodzie komponentu `Gallery.tsx` lub w konfiguracji CMS (jeśli została dodana kolekcja mediów). Aby dodać zdjęcie przez CMS, przejdź do odpowiedniej kolekcji i wybierz "Add Media".

### 5. Jak oznaczyć dzień jako wolny/zajęty w kalendarzu?
W CMS przejdź do sekcji "Kalendarz Dostępności". Dodaj nową datę do listy "Dni Niedostępne". Zapisz zmiany.

### 6. Czy mogę formatować tekst w ogłoszeniach?
Tak, edytor w CMS obsługuje format Markdown. Możesz dodawać pogrubienia, listy, a nawet linki.

## 🚀 Deployment i Hosting

### 7. Czy mogę przenieść stronę na inny hosting?
Tak, strona po wygenerowaniu (`npm run build`) znajduje się w folderze `out/`. Możesz skopiować te pliki na dowolny serwer (np. Hostinger, darmowy GitHub Pages), ale będziesz musiał samodzielnie skonfigurować backend dla CMS (np. przesiadka na inny headless CMS lub edycja plików ręcznie).

### 8. Dlaczego moje zdjęcia są duże i wolno się ładują?
Upewnij się, że przed wgraniem zdjęcia do CMS optymalizujesz je (np. zmniejszasz rozdzielczość do max 1920px i używasz formatu WebP lub JPEG). Next.js w trybie `export` nie optymalizuje zdjęć automatycznie w locie.

---
[Wróć do strony głównej](../README.md)
