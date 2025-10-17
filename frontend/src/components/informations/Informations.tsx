"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Calendar as CalendarIcon, Info, AlertCircle } from "lucide-react";

// Types for CMS-driven content (Decap CMS can write JSON/Markdown; we keep it flexible)
interface UnavailabilityEntry {
  date: string; // ISO date string, e.g. "2025-10-17"
  note?: string; // optional tooltip/description
}

// Simple calendar component that highlights unavailable dates
function AvailabilityCalendar({
  year,
  month, // 0-based (0=Jan)
  unavailable,
}: {
  year: number;
  month: number;
  unavailable: UnavailabilityEntry[];
}) {
  const firstDay = useMemo(() => new Date(year, month, 1), [year, month]);
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const startWeekday = (firstDay.getDay() + 6) % 7; // convert to Monday=0

  const unavailableByDay = useMemo(() => {
    const map = new Map<number, UnavailabilityEntry>();
    unavailable.forEach((u) => {
      const d = new Date(u.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        map.set(d.getDate(), u);
      }
    });
    return map;
  }, [unavailable, year, month]);

  const weeks: Array<Array<number | null>> = [];
  let currentDay = 1;

  // Build 6 weeks grid to keep layout consistent
  for (let w = 0; w < 6; w++) {
    const week: Array<number | null> = [];
    for (let d = 0; d < 7; d++) {
      const cellIndex = w * 7 + d;
      const dayNumber = cellIndex - startWeekday + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayNumber);
        currentDay++;
      }
    }
    weeks.push(week);
  }

  const monthName = new Intl.DateTimeFormat("pl-PL", { month: "long" }).format(firstDay);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-pink-50 to-purple-50 border-b">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-pink-600" />
          <h4 className="font-semibold text-gray-800 capitalize">
            {monthName} {year}
          </h4>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 text-xs sm:text-sm text-gray-500 px-4 pt-4">
        {[
          "Pon",
          "Wto",
          "Śro",
          "Czw",
          "Pią",
          "Sob",
          "Nie",
        ].map((d) => (
          <div key={d} className="text-center font-medium pb-2">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 px-4 pb-4">
        {weeks.flat().map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="h-10 sm:h-12" />;
          }
          const unavailableEntry = unavailableByDay.get(day);
          const isUnavailable = Boolean(unavailableEntry);
          const baseClass =
            "relative h-10 sm:h-12 rounded-lg flex items-center justify-center select-none transition";
          const availableClass =
            "bg-white hover:bg-pink-50 text-gray-700 border border-gray-100";
          const unavailableClass =
            "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200";

          return (
            <div
              key={idx}
              className={`${baseClass} ${isUnavailable ? unavailableClass : availableClass}`}
              title={unavailableEntry?.note || (isUnavailable ? "Niedostępne" : "Dostępne")}
            >
              <span className="text-sm font-semibold">{day}</span>
              {isUnavailable && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-6 py-3 bg-pink-50/60 border-t text-xs sm:text-sm text-gray-600 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-red-400" />
          <span>Dni niedostępne</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-gray-200 border border-gray-300" />
          <span>Dni dostępne</span>
        </div>
      </div>
    </div>
  );
}

export default function Informations() {
  // For now, attempt to fetch unavailable dates from a public JSON produced by Decap CMS build
  // e.g. public/data/unavailable.json with entries: [{ date: "2025-10-17", note: "Urlop" }]
  const [data, setData] = useState<UnavailabilityEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        // The path can be adjusted once Decap CMS is wired; we keep a safe fallback
        const res = await fetch("/data/unavailable.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Brak danych o dostępności");
        const json = (await res.json()) as UnavailabilityEntry[];
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Nie udało się wczytać danych");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Determine current month/year for calendar display
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return (
    <section id="aktualnosci" className="py-20 bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 mb-4">
            <Info className="w-4 h-4" />
            <span className="text-sm font-semibold">Nowości i komunikaty</span>
          </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Aktualności
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-xl">
            Tutaj znajdziesz najnowsze informacje o dostępności usług, urlopach i zmianach w harmonogramie
          </p>
        </div>

        {/* Content grid: Calendar + dynamic notes container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Calendar */}
          <div>
            <AvailabilityCalendar year={year} month={month} unavailable={data} />
            {error && (
              <div className="mt-4 flex items-start gap-3 text-red-700 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">
                  {error}. Kalendarz wyświetla się bez oznaczeń. Skonfiguruj Decap CMS, aby publikować plik
                  <code className="px-1">/public/data/unavailable.json</code>.
                </p>
              </div>
            )}
          </div>

          {/* Dynamic content container for Decap CMS-managed entries */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-pink-600" />
              <h3 className="text-xl font-semibold text-gray-800">Komunikaty</h3>
            </div>
            <div className="prose prose-pink max-w-none text-gray-700">
              {/* Placeholder area: Decap CMS can render Markdown into this container at build time */}
              <p className="mb-3">
                Ta sekcja może być zasilana treściami z Decap CMS (Markdown). Dodaj wpisy o zmianach w grafiku, urlopach
                lub ważnych informacjach dla klientów.
              </p>
              {data?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {data.map((u) => (
                    <li key={u.date}>
                      <span className="font-medium">{new Date(u.date).toLocaleDateString("pl-PL")}</span>
                      {u.note ? <span className="text-gray-600"> — {u.note}</span> : <span className="text-gray-600"> — Niedostępne</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Brak ogłoszeń na ten miesiąc.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
