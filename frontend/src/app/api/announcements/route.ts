import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface AnnouncementEntry {
  slug: string;
  title: string;
  date?: string;
  body: string;
}

export async function GET() {
  try {
    // Build absolute path to the announcements content directory
    const dir = path.join(process.cwd(), 'src', 'content', 'announcements');

    if (!fs.existsSync(dir)) {
      // If the directory doesn't exist yet, return empty list instead of 500
      return NextResponse.json({ entries: [] as AnnouncementEntry[] });
    }

    // Read all markdown files in the directory
    const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.md'));

    const entries: AnnouncementEntry[] = files.map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');

      let title = '';
      let date: string | undefined = undefined;
      let body = raw;

      // Very lightweight frontmatter extractor to avoid adding extra deps
      if (raw.startsWith('---')) {
        const endIdx = raw.indexOf('\n---', 3);
        if (endIdx !== -1) {
          const fm = raw.substring(3, endIdx).trim();
          body = raw.substring(endIdx + 4).trim();
          for (const line of fm.split('\n')) {
            const idx = line.indexOf(':');
            if (idx === -1) continue;
            const key = line.substring(0, idx).trim();
            const value = line.substring(idx + 1).trim().replace(/^['\"]|['\"]$/g, '');
            if (key === 'title') title = value;
            if (key === 'date') date = value;
          }
        }
      }

      return {
        slug: file.replace(/\.(md|markdown)$/i, ''),
        title: title || file,
        date,
        body,
      } as AnnouncementEntry;
    });

    // Sort by date desc if available, otherwise by filename desc
    entries.sort((a, b) => {
      if (a.date && b.date) return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      if (a.date) return -1;
      if (b.date) return 1;
      return a.slug > b.slug ? -1 : a.slug < b.slug ? 1 : 0;
    });

    return NextResponse.json({ entries });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ error: e?.message || 'Failed to load announcements' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
