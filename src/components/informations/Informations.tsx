"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Calendar as CalendarIcon,
    Info,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// AnnouncementsList bez zmian
function AnnouncementsList({ items }: { items: Array<{ slug: string; title: string; date?: string; body: string }> }) {
    if (!items || items.length === 0) {
        return <p className="text-gray-500">Brak ogłoszeń.</p>;
    }

    return (
        <ul className="space-y-3">
            {items.map((it) => (
                <li key={it.slug} className="border-b border-pink-100 pb-3">
                    <div className="flex items-center gap-2">
                        {it.date && (
                            <span className="text-sm text-gray-500 w-32 shrink-0">
                {new Date(it.date).toLocaleDateString('pl-PL')}
              </span>
                        )}
                        <span className="font-semibold text-gray-800">{it.title}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

interface UnavailabilityEntry {
    date: string;
    note?: string;
}

function AvailabilityCalendar({
                                  year,
                                  month,
                                  unavailable,
                                  onPrevMonth,
                                  onNextMonth,
                                  onToday,
                              }: {
    year: number;
    month: number;
    unavailable: UnavailabilityEntry[];
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
}) {
    const firstDay = useMemo(() => new Date(year, month, 1), [year, month]);
    const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
    const startWeekday = (firstDay.getDay() + 6) % 7;

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
    // Build 6 weeks grid
    for (let w = 0; w < 6; w++) {
        const week: Array<number | null> = [];
        for (let d = 0; d < 7; d++) {
            const cellIndex = w * 7 + d;
            const dayNumber = cellIndex - startWeekday + 1;
            if (dayNumber < 1 || dayNumber > daysInMonth) {
                week.push(null);
            } else {
                week.push(dayNumber);
            }
        }
        weeks.push(week);
    }

    const monthName = new Intl.DateTimeFormat("pl-PL", { month: "long" }).format(firstDay);
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    return (
        <div className="w-full bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-pink-50 to-purple-50 border-b">
                <button
                    onClick={onPrevMonth}
                    className="p-1 rounded-full hover:bg-pink-100 transition"
                    aria-label="Poprzedni miesiąc"
                >
                    <ChevronLeft className="w-5 h-5 text-pink-600" />
                </button>

                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-pink-600" />
                    <h4 className="font-semibold text-gray-800 capitalize">
                        {monthName} {year}
                    </h4>
                </div>

                <div className="flex items-center gap-1">
                    {!isCurrentMonth && (
                        <button
                            onClick={onToday}
                            className="px-2 py-1 text-xs rounded bg-pink-100 text-pink-700 hover:bg-pink-200 transition"
                        >
                            Dzisiaj
                        </button>
                    )}
                    <button
                        onClick={onNextMonth}
                        className="p-1 rounded-full hover:bg-pink-100 transition"
                        aria-label="Następny miesiąc"
                    >
                        <ChevronRight className="w-5 h-5 text-pink-600" />
                    </button>
                </div>
            </div>

            {/* Weekday header */}
            <div className="grid grid-cols-7 text-xs sm:text-sm text-gray-500 px-4 pt-4">
                {["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"].map((d) => (
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

export default function Informations({ announcements }: { announcements: Array<{ slug: string; title: string; date?: string; body: string }> }) {
    const [data, setData] = useState<UnavailabilityEntry[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch("/data/unavailable.json", { cache: "no-store" });
                if (!res.ok) throw new Error("Brak danych o dostępności");
                const rawJson = await res.json();
                let entries: any[] = [];
                if (Array.isArray(rawJson)) {
                    entries = rawJson;
                } else if (rawJson && typeof rawJson === "object") {
                    if (Array.isArray((rawJson as any).entries)) {
                        entries = (rawJson as any).entries;
                    } else if (Array.isArray((rawJson as any).data)) {
                        entries = (rawJson as any).data;
                    }
                }
                const finalData: UnavailabilityEntry[] = (entries || [])
                    .map((e: any) => {
                        if (!e) return null;
                        if (typeof e === "string") return { date: e } as UnavailabilityEntry;
                        if (typeof e === "object" && typeof e.date === "string") {
                            return { date: e.date, note: typeof e.note === "string" ? e.note : undefined } as UnavailabilityEntry;
                        }
                        return null;
                    })
                    .filter(Boolean) as UnavailabilityEntry[];
                if (!cancelled) setData(finalData);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? "Nie udało się wczytać danych");
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    // NOWY STAN: Date
    const today = new Date();
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const goToPreviousMonth = () => {
        setViewDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setViewDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    const goToToday = () => {
        setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    return (
        <section id="aktualnosci" className="py-20 bg-gradient-to-b from-white via-pink-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div>
                        <AvailabilityCalendar
                            year={year}
                            month={month}
                            unavailable={data}
                            onPrevMonth={goToPreviousMonth}
                            onNextMonth={goToNextMonth}
                            onToday={goToToday}
                        />
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

                    <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CalendarIcon className="w-5 h-5 text-pink-600" />
                            <h3 className="text-xl font-semibold text-gray-800">Komunikaty</h3>
                        </div>
                        <div className="prose prose-pink max-w-none text-gray-700">
                            <AnnouncementsList items={announcements} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}